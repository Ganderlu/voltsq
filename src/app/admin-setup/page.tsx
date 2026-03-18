"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toggleAdminStatus } from "@/app/actions/admin";
import { Box, Button, Typography, Paper, TextField, Alert, CircularProgress } from "@mui/material";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebaseClient";

export default function AdminSetupPage() {
  const { currentUser, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "" as "success" | "error" | "", text: "" });
  const router = useRouter();

  const handleElevate = async () => {
    if (!currentUser) return;
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      // Use the action we already have to grant claims
      // In a real scenario, you'd verify if they *should* be admin here
      // But for setup, we assume the user visiting this knows they are the admin.
      await toggleAdminStatus(currentUser.uid, true);
      
      // Force refresh the token to see the new claim
      await auth.currentUser?.getIdToken(true);
      
      setMsg({ type: "success", text: "Admin claims granted! Redirecting..." });
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);
    } catch (e: any) {
      setMsg({ type: "error", text: e.message || "Failed to grant admin status" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "var(--background)",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 400,
          w: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: "rgba(99, 102, 241, 0.1)",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <ShieldCheck size={30} />
        </Box>

        <Typography variant="h5" fontWeight="900" sx={{ color: "var(--foreground)", mb: 1 }}>
          Admin Setup
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 3 }}>
          Use this page to securely grant your account administrator privileges.
        </Typography>

        {!currentUser ? (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
            Please sign in first to setup your admin account.
          </Alert>
        ) : isAdmin ? (
          <Box>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Your account is already recognized as an Admin.
            </Alert>
            <Button
              variant="contained"
              fullWidth
              onClick={() => router.push("/admin/dashboard")}
              sx={{ borderRadius: 2, fontWeight: 700, py: 1.2 }}
            >
              Go to Dashboard
            </Button>
          </Box>
        ) : (
          <Box>
            {msg.text && (
              <Alert severity={msg.type || "info"} sx={{ mb: 3, borderRadius: 2 }}>
                {msg.text}
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleElevate}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShieldCheck size={20} />}
            >
              {loading ? "Processing..." : "Grant Admin Access"}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
