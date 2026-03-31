import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/app/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { sendAdminDepositRequestEmail } from "@/app/utils/email";

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
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded?.uid;
    const email = decoded?.email || "";
    if (!uid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as {
      asset?: string;
      coin?: string;
      network?: string;
      address?: string;
      amount?: number;
      txHash?: string;
      proofUrl?: string;
    };

    const amount = Number(body.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const network = (body.network || "").toString().trim();
    const address = (body.address || "").toString().trim();
    const asset = ((body.asset || body.coin || "USDT") as string).toString();
    const txHash = (body.txHash || "").toString().trim();
    const proofUrl = (body.proofUrl || "").toString().trim();

    const userSnap = await adminDb.doc(`users/${uid}`).get();
    const userData = userSnap.exists ? (userSnap.data() as any) : null;
    const fullName =
      (userData?.fullName || userData?.username || "").toString().trim() || "";
    const userEmail = (email || userData?.email || "").toString().trim();

    const createdAt = new Date();
    const depositDoc: Record<string, any> = {
      userId: uid,
      userEmail,
      asset: asset.toUpperCase(),
      network,
      address,
      amount,
      txHash,
      proofUrl,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    };

    if (body.coin) {
      depositDoc.coin = body.coin;
    }

    const docRef = await adminDb.collection("deposits").add(depositDoc);

    const adminEmails = getAdminNotifyEmails();
    if (adminEmails.length > 0) {
      const emailRes = await sendAdminDepositRequestEmail({
        toEmails: adminEmails,
        investorEmail: userEmail,
        investorName: fullName,
        depositId: docRef.id,
        amount,
        asset: asset.toUpperCase(),
        network,
        txHash,
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
            (emailRes as any)?.error?.message ||
              (emailRes as any)?.error ||
              "Email failed",
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
