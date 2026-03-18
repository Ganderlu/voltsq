"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebaseClient";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Settings, Shield, Save, Video, Upload, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

type SystemSettings = {
  maintenance?: boolean;
  tradingEnabled?: boolean;
  investmentsEnabled?: boolean;
  depositsEnabled?: boolean;
  withdrawalsEnabled?: boolean;
  companyName?: string;
  supportEmail?: string;
  landingVideoUrl?: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    maintenance: false,
    tradingEnabled: true,
    investmentsEnabled: true,
    depositsEnabled: true,
    withdrawalsEnabled: true,
    companyName: "voltsq",
    supportEmail: "support@example.com",
  });
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({
    open: false,
    msg: "",
    severity: "success",
  });

  useEffect(() => {
    const ref = doc(db, "system", "settings");
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setSettings((prev) => ({ ...prev, ...(snap.data() as any) }));
      }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const ref = doc(db, "system", "settings");
      await setDoc(ref, settings, { merge: true });
      setSnackbar({ open: true, msg: "Settings saved", severity: "success" });
    } catch (e: any) {
      setSnackbar({
        open: true,
        msg: e.message || "Failed to save settings",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 0, md: 1 },
        bgcolor: "transparent",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              color: "var(--foreground)",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Settings size={28} color="#3b82f6" /> System Settings
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Configure platform features and company metadata.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={save}
          disabled={saving}
          startIcon={<Save size={16} />}
          sx={{ borderRadius: 2.5, fontWeight: 800 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="800"
              sx={{
                color: "var(--foreground)",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Shield size={18} /> Feature Toggles
            </Typography>
            <Stack spacing={1.5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!settings.maintenance}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        maintenance: e.target.checked,
                      }))
                    }
                  />
                }
                label="Maintenance Mode"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={!!settings.tradingEnabled}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        tradingEnabled: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Trading"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={!!settings.investmentsEnabled}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        investmentsEnabled: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Investments"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={!!settings.depositsEnabled}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        depositsEnabled: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Deposits"
                sx={{ color: "var(--foreground)" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={!!settings.withdrawalsEnabled}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        withdrawalsEnabled: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Withdrawals"
                sx={{ color: "var(--foreground)" }}
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="800"
              sx={{ color: "var(--foreground)", mb: 2 }}
            >
              Organization
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Company Name"
                value={settings.companyName || ""}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, companyName: e.target.value }))
                }
              />
              <TextField
                fullWidth
                label="Support Email"
                type="email"
                value={settings.supportEmail || ""}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, supportEmail: e.target.value }))
                }
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "var(--card)",
              border: "1px solid",
              borderColor: "var(--border)",
              borderRadius: 4,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="800"
              sx={{
                color: "var(--foreground)",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Video size={18} /> Landing Page Video
            </Typography>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "var(--background)",
                border: "2px dashed",
                borderColor: "var(--border)",
                textAlign: "center",
              }}
            >
              {settings.landingVideoUrl ? (
                <Stack spacing={2} alignItems="center">
                  <Box
                    component="video"
                    src={settings.landingVideoUrl}
                    controls
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      borderRadius: 2,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  />
                  <Stack direction="row" spacing={2}>
                    <CldUploadWidget
                      uploadPreset="voltsq_videos"
                      onSuccess={(result: any) => {
                        setSettings((prev) => ({
                          ...prev,
                          landingVideoUrl: result.info.secure_url,
                        }));
                      }}
                    >
                      {({ open }) => (
                        <Button
                          variant="outlined"
                          startIcon={<Upload size={16} />}
                          onClick={() => open()}
                          sx={{ borderRadius: 2, textTransform: "none" }}
                        >
                          Change Video
                        </Button>
                      )}
                    </CldUploadWidget>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2 size={16} />}
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          landingVideoUrl: "",
                        }))
                      }
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={2} alignItems="center" py={4}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: "rgba(37, 99, 235, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    <Video size={30} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      No Landing Video Set
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--muted-foreground)" }}
                    >
                      Upload a high-quality video for your landing page
                    </Typography>
                  </Box>
                  <CldUploadWidget
                    uploadPreset="voltsq_videos"
                    onSuccess={(result: any) => {
                      setSettings((prev) => ({
                        ...prev,
                        landingVideoUrl: result.info.secure_url,
                      }));
                    }}
                  >
                    {({ open }) => (
                      <Button
                        variant="contained"
                        startIcon={<Upload size={16} />}
                        onClick={() => open()}
                        sx={{
                          mt: 1,
                          borderRadius: 2.5,
                          px: 4,
                          py: 1.2,
                          fontWeight: 700,
                          textTransform: "none",
                        }}
                      >
                        Upload Video
                      </Button>
                    )}
                  </CldUploadWidget>
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={save}
          disabled={saving}
          startIcon={<Save size={16} />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 800,
            px: 4,
            py: 1.5,
            boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 3 }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
