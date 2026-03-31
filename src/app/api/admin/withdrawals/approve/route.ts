import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/app/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { sendWithdrawalApprovedEmail } from "@/app/utils/email";

function getBearerToken(authHeader: string | null) {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

async function isAdminUid(uid: string) {
  if (!adminDb) return false;

  const [userSnap, adminSnap] = await Promise.all([
    adminDb.doc(`users/${uid}`).get(),
    adminDb.doc(`admins/${uid}`).get(),
  ]);

  if (adminSnap.exists) return true;
  if (!userSnap.exists) return false;

  const user = userSnap.data() as any;
  return user?.role === "admin";
}

export async function POST(req: Request) {
  try {
    if (!adminDb || !adminAuth) {
      return NextResponse.json(
        { error: "Server is not configured (Firebase Admin not initialized)." },
        { status: 500 },
      );
    }

    const token = getBearerToken(req.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded?.uid;
    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let allowed = !!decoded.admin;
    if (!allowed) {
      allowed = await isAdminUid(uid);
      if (allowed) {
        try {
          const userRecord = await adminAuth.getUser(uid);
          const existing = userRecord.customClaims || {};
          if (!existing.admin) {
            await adminAuth.setCustomUserClaims(uid, {
              ...existing,
              admin: true,
            });
          }
        } catch {
          // Best-effort: even if claim update fails, allow action based on DB role.
        }
      }
    }

    if (!allowed) {
      return NextResponse.json(
        { error: "Forbidden: admin permission required." },
        { status: 403 },
      );
    }

    const body = (await req.json()) as { withdrawalId?: string };
    const withdrawalId = body.withdrawalId?.trim();
    if (!withdrawalId) {
      return NextResponse.json(
        { error: "Missing withdrawalId" },
        { status: 400 },
      );
    }

    const adb = adminDb;

    const txResult = await adb.runTransaction(async (tx) => {
      const withdrawalRef = adb.doc(`withdrawals/${withdrawalId}`);
      const withdrawalSnap = await tx.get(withdrawalRef);
      if (!withdrawalSnap.exists) {
        throw new Error("Withdrawal not found");
      }

      const withdrawal = withdrawalSnap.data() as any;
      const status = withdrawal.status || "unknown";
      if (status !== "pending") {
        return {
          alreadyProcessed: true,
          status,
          userEmail: withdrawal.userEmail || null,
          approvedEmailSentAt: withdrawal.approvedEmailSentAt || null,
        };
      }

      const userId = withdrawal.userId as string | undefined;
      if (!userId) throw new Error("Withdrawal has no userId");

      const userRef = adb.doc(`users/${userId}`);
      const userSnap = await tx.get(userRef);
      if (!userSnap.exists) throw new Error("User not found");

      const userData = userSnap.data() as any;
      const amount = Number(withdrawal.amount || 0);
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid withdrawal amount");
      }

      const balance = Number(userData.usdtBalance || 0);
      if (!Number.isFinite(balance)) throw new Error("Invalid user balance");
      if (balance < amount) throw new Error("Insufficient balance");

      tx.update(userRef, {
        usdtBalance: FieldValue.increment(-amount),
      });

      tx.update(withdrawalRef, {
        status: "approved",
        processedAt: new Date(),
        approvedBy: uid,
      });

      const notifRef = adb.collection("notifications").doc();
      tx.set(notifRef, {
        userId,
        type: "withdrawal-approved",
        title: "Withdrawal Approved",
        message: `Your $${amount} withdrawal was approved.`,
        read: false,
        createdAt: new Date(),
      });

      return {
        alreadyProcessed: false,
        status: "approved",
        userId,
        userEmail: withdrawal.userEmail || userData.email || null,
        fullName: userData.fullName || userData.username || "",
        amount,
        asset: withdrawal.asset || "USDT",
        receiveAmount:
          typeof withdrawal.receiveAmount === "number"
            ? withdrawal.receiveAmount
            : undefined,
        address: withdrawal.address || "",
        approvedEmailSentAt: withdrawal.approvedEmailSentAt || null,
      };
    });

    if (txResult.alreadyProcessed) {
      return NextResponse.json({
        success: true,
        status: txResult.status,
        emailSent: !!txResult.approvedEmailSentAt,
      });
    }

    const approved = txResult as {
      userEmail: string | null;
      fullName: string;
      amount: number;
      asset: string;
      receiveAmount?: number;
      address: string;
    };

    const toEmail = approved.userEmail;
    if (!toEmail) {
      return NextResponse.json({
        success: true,
        status: "approved",
        emailSent: false,
        emailError: "User email not found",
      });
    }

    const withdrawalRef = adb.doc(`withdrawals/${withdrawalId}`);

    const emailResult = await sendWithdrawalApprovedEmail({
      toEmail,
      fullName: approved.fullName,
      withdrawalId,
      amount: approved.amount,
      asset: approved.asset,
      receiveAmount: approved.receiveAmount,
      address: approved.address,
      processedAtISO: new Date().toISOString(),
    });

    if (emailResult.success) {
      await withdrawalRef.update({
        approvedEmailSentAt: new Date(),
        approvedEmailProvider: "resend",
      });
      return NextResponse.json({
        success: true,
        status: "approved",
        emailSent: true,
      });
    }

    await withdrawalRef.update({
      approvedEmailError: String(
        (emailResult as any)?.error?.message ||
          (emailResult as any)?.error ||
          "Email failed",
      ).slice(0, 500),
    });

    return NextResponse.json({
      success: true,
      status: "approved",
      emailSent: false,
      emailError: "Email failed to send",
    });
  } catch (error) {
    return NextResponse.json(
      { error: safeErrorMessage(error) },
      { status: 500 },
    );
  }
}
