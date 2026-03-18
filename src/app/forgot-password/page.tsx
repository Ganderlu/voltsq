"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-card shadow-2xl p-6 sm:p-8">
        {/* Back to Login */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

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

        {!success ? (
          <>
            <h1 className="text-center text-2xl font-semibold text-foreground mb-1">
              Forgot Password?
            </h1>
            <p className="text-center text-sm text-muted-foreground mb-8">
              No worries, we'll send you reset instructions.
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-foreground">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 mt-6 transition-all"
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              We've sent a password reset link to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="w-full rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-all mb-4"
            >
              Try another email
            </button>
            <Link
              href="/login"
              className="block w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
            >
              Back to login
            </Link>
          </div>
        )}

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
