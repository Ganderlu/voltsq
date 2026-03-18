"use client";

import { useState, useEffect, Suspense } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function verifyCode() {
      if (!oobCode) {
        setError("Invalid or missing reset link.");
        setVerifying(false);
        return;
      }

      try {
        const userEmail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(userEmail);
      } catch (err: any) {
        console.error("Code verification error:", err);
        setError("The reset link is invalid or has expired.");
      } finally {
        setVerifying(false);
      }
    }
    verifyCode();
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!oobCode) return;

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err: any) {
      console.error("Password confirm error:", err);
      setError("An error occurred. Please try again or request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground text-sm">Verifying reset link...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CheckCircle2 size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Password Updated
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="block w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <XCircle size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{error}</p>
        <Link
          href="/forgot-password"
          className="block w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
        >
          Try again
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl font-semibold text-foreground mb-1">
        New Password
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-8">
        Resetting password for <span className="font-medium text-foreground">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-foreground">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Min. 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-foreground">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Repeat your new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 mt-6 transition-all"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-card shadow-2xl p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-foreground font-semibold tracking-wide">
              Voltsq <span className="text-muted-foreground">INVEST</span>
            </span>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-10"><Loader2 className="animate-spin mx-auto text-primary" size={32} /></div>}>
          <ResetPasswordForm />
        </Suspense>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Need help? Contact our{" "}
          <Link
            href="/contact-us"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Support Team
          </Link>
        </p>
      </div>
    </div>
  );
}
