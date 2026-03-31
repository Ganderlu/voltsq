import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/app/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { sendAdminWithdrawalRequestEmail } from "@/app/utils/email";

function getBearerToken(authHeader: string | null) {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function getAdminNotifyEmails() {
  const raw =
    process.env.ADMIN_NOTIFY_EMAILS ||
    process.env.ADMIN_EMAILS ||
    process.env.ADMIN_EMAIL ||
    "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
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
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded?.uid;
    const email = decoded?.email || "";
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as {
      asset?: string;
      amount?: number;
      fee?: number;
      receiveAmount?: number;
      address?: string;
    };

    const amount = Number(body.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const address = (body.address || "").toString().trim();
    if (address.length < 10) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const asset = (body.asset || "USDT").toString();
    const fee = Number(body.fee || 0);
    const receiveAmount = Number(body.receiveAmount || 0);

    const userSnap = await adminDb.doc(`users/${uid}`).get();
    const userData = userSnap.exists ? (userSnap.data() as any) : null;
    const fullName =
      (userData?.fullName || userData?.username || "").toString().trim() || "";
    const userEmail = (email || userData?.email || "").toString().trim();

    const createdAt = new Date();
    const docRef = await adminDb.collection("withdrawals").add({
      userId: uid,
      userEmail,
      asset,
      amount,
      fee: Number.isFinite(fee) ? fee : 0,
      receiveAmount: Number.isFinite(receiveAmount) ? receiveAmount : 0,
      address,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });

    const adminEmails = getAdminNotifyEmails();
    if (adminEmails.length > 0) {
      const emailRes = await sendAdminWithdrawalRequestEmail({
        toEmails: adminEmails,
        investorEmail: userEmail,
        investorName: fullName,
        withdrawalId: docRef.id,
        amount,
        asset,
        address,
        createdAtISO: createdAt.toISOString(),
      });

      if (emailRes.success) {
        await docRef.update({
          adminNotifiedAt: new Date(),
          adminNotifiedProvider: "resend",
        });
      } else {
        await docRef.update({
          adminNotifiedError: String(
            (emailRes as any)?.error?.message || (emailRes as any)?.error || "Email failed",
          ).slice(0, 500),
        });
      }
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

