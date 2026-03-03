import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp = null;

try {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : null;

  console.log("🔥 [Firebase Admin] Env Check:");
  console.log(
    "   Service Account →",
    serviceAccount ? "✅ LOADED" : "❌ MISSING",
  );

  if (serviceAccount && serviceAccount.project_id) {
    console.log("   Project ID →", serviceAccount.project_id);
  }

  if (serviceAccount && getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    adminApp = getApps()[0] || null;
  }

  if (adminApp) {
    console.log("✅ Firebase Admin SDK Initialized Successfully");
  } else {
    console.error("❌ Firebase Admin failed to initialize (No App)");
  }
} catch (error) {
  console.error("❌ Firebase Admin Initialization Error:", error);
}

export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminDb = adminApp ? getFirestore(adminApp) : null;
