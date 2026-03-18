"use server";

import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "../firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { headers } from "next/headers";
import { sendWelcomeEmail } from "../utils/email";

/* =========================
   STEP 1 — PERSONAL INFO
========================= */
export async function saveStep1(formData: FormData) {
  try {
    let userIp = "Unknown";
    let country = "Unknown";

    try {
      const headersList = await headers();
      // Try multiple headers to get the real IP
      const forwardedFor = headersList.get("x-forwarded-for");
      if (forwardedFor) {
        userIp = forwardedFor.split(",")[0].trim();
      } else {
        userIp = headersList.get("x-real-ip") || "Unknown";
      }

      // If IP is known, attempt to fetch geolocation
      if (userIp !== "Unknown" && userIp !== "127.0.0.1" && userIp !== "::1") {
        try {
          const geoRes = await fetch(`https://ipapi.co/${userIp}/json/`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            country = geoData.country_name || geoData.country || "Unknown";
          }
        } catch (geoError) {
          console.warn("⚠️ [saveStep1] Geolocation fetch failed:", geoError);
        }
      }
    } catch (hError) {
      console.warn("⚠️ [saveStep1] Could not retrieve headers:", hError);
    }

    const data = {
      username: formData.get("username")?.toString() || "",
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      referredBy: formData.get("referredBy")?.toString() || null,
      step: 1,
      ipAddress: userIp,
      detectedCountry: country, // Store initial auto-detected country
      createdAt: new Date(),
    };

    // Validation
    if (!data.username || !data.fullName || !data.email) {
      throw new Error("Missing required fields");
    }

    // Check if adminDb is initialized
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized. Check Vercel env vars.");
    }

    const docRef = await adminDb.collection("registration_steps").add(data);

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Registration Step 1 Error:", error);
    return { success: false, error: error.message || "An error occurred" };
  }
}

/* =========================
   STEP 2 — LOCATION
========================= */
export async function saveStep2(formData: FormData) {
  try {
    const registrationId = formData.get("rid") as string;
    const country = formData.get("country");

    if (!registrationId) {
      throw new Error("Registration ID missing");
    }

    if (!country) {
      throw new Error("Country missing");
    }

    // Check if adminDb is initialized
    if (!adminDb) {
      throw new Error("Firebase Admin not initialized. Check Vercel env vars.");
    }

    await adminDb.collection("registration_steps").doc(registrationId).update({
      country: country,
      step: 2,
    });

    return { success: true, rid: registrationId };
  } catch (error: any) {
    console.error("Registration Step 2 Error:", error);
    return { success: false, error: error.message || "An error occurred" };
  }
}

/* =========================
   STEP 3 — COMPLETE REGISTRATION
========================= */
export async function completeRegistration(formData: FormData) {
  const rid = formData.get("rid") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms");

  // 🛑 VALIDATIONS
  if (!rid) throw new Error("Invalid registration session");
  if (!terms) throw new Error("You must accept the terms");
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (!adminDb || !adminAuth) {
    throw new Error(
      "Firebase Admin not initialized. Check .env.local and restart the server.",
    );
  }

  // 🔹 FETCH TEMP REGISTRATION DATA
  const ref = adminDb.collection("registration_steps").doc(rid);
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Registration not found");
  }

  const data = snapshot.data() as {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    detectedCountry: string;
    referredBy: string | null;
    ipAddress: string;
  };

  try {
    // 🔐 CREATE AUTH USER (ADMIN SDK)
    const user = await adminAuth.createUser({
      email: data.email,
      password,
      displayName: data.fullName,
      emailVerified: false,
    });

    // 👤 CREATE USER PROFILE
    await adminDb
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || "",
        country: data.country, // User-selected country
        detectedCountry: data.detectedCountry || "Unknown", // Real location based on IP
        referredBy: data.referredBy || null,
        ipAddress: data.ipAddress || "Unknown",
        mode: "demo",
        balanceDemo: 10000,
        balanceLive: 0,
        usdtBalance: 0,
        totalTrades: 0,
        activeTrades: 0,
        totalPnL: 0,
        role: "user",
        status: "active",
        createdAt: new Date(),
      });

    // 💰 IF REFERRED, ADD REWARD (EXAMPLE: $5)
    if (data.referredBy) {
      const rewardAmount = 5.0; // Standard signup reward

      // Update Referrer Balance
      await adminDb
        .collection("users")
        .doc(data.referredBy)
        .update({
          usdtBalance: FieldValue.increment(rewardAmount),
        });

      // Log Reward Transaction
      await adminDb.collection("referralRewards").add({
        userId: data.referredBy,
        referredUserId: user.uid,
        referredUserEmail: data.email,
        amount: rewardAmount,
        type: "signup",
        timestamp: new Date(),
      });
    }

    // 📧 SEND WELCOME EMAIL
    try {
      await sendWelcomeEmail(data.email, data.fullName);
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
    }

    // 🧹 CLEAN TEMP REGISTRATION DATA
    await ref.delete();

    // 🔑 GENERATE CUSTOM TOKEN FOR AUTO-LOGIN
    const token = await adminAuth.createCustomToken(user.uid);

    return { success: true, token };
  } catch (error: any) {
    console.error("Registration error:", error);
    // Return the error message instead of throwing
    return { success: false, error: error.message || "Registration failed" };
  }
}
