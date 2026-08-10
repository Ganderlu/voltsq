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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebaseClient";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  Settings,
  Shield,
  Save,
  Video,
  Upload,
  Trash2,
  Wallet,
  Plus,
  X,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

type WalletEntry = {
  network: string;
  address: string;
};

type WalletConfig = {
  name: string;
  icon: string;
  wallets: WalletEntry[];
};

type SystemSettings = {
  maintenance?: boolean;
  tradingEnabled?: boolean;
  investmentsEnabled?: boolean;
  depositsEnabled?: boolean;
  withdrawalsEnabled?: boolean;
  companyName?: string;
  supportEmail?: string;
  landingVideoUrl?: string;
  walletAddresses?: Record<string, WalletEntry[]>;
};

const DEFAULT_WALLETS: Record<string, WalletConfig> = {
  bitcoin: {
    name: "Bitcoin",
    icon: "BTC",
    wallets: [{ network: "BTC", address: "" }],
  },
  ethereum: {
    name: "Ethereum",
    icon: "ETH",
    wallets: [{ network: "ERC20", address: "" }],
  },
  "bnb smart chain": {
    name: "BNB Smart Chain",
    icon: "BNB",
    wallets: [{ network: "BEP20", address: "" }],
  },
  tron: {
    name: "TRON",
    icon: "TRX",
    wallets: [{ network: "TRC20", address: "" }],
  },
  usdt: {
    name: "USDT",
    icon: "USDT",
    wallets: [
      { network: "TRC20", address: "" },
      { network: "ERC20", address: "" },
    ],
  },
  solana: {
    name: "Solana",
    icon: "SOL",
    wallets: [{ network: "SOL", address: "" }],
  },
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
    walletAddresses: Object.fromEntries(
      Object.entries(DEFAULT_WALLETS).map(([key, val]) => [key, val.wallets]),
    ),
  });
  const [saving, setSaving] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    msg: string;
    severity: "success" | "error";
  }>({
    open: false,
    msg: "",
    severity: "success",
  });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    const ref = doc(db, "system", "settings");
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        setSettings((prev) => {
          const mergedWallets = { ...prev.walletAddresses };
          if (data?.walletAddresses) {
            Object.entries(data.walletAddresses).forEach(([k, v]) => {
              mergedWallets[k] = v as WalletEntry[];
            });
          }
          return { ...prev, ...data, walletAddresses: mergedWallets };
        });
      }
    });
  }, []);

  const updateWalletAddress = (
    assetKey: string,
    idx: number,
    field: "network" | "address",
    value: string,
  ) => {
    setSettings((prev) => {
      const wallets = prev.walletAddresses ? { ...prev.walletAddresses } : {};
      const assetWallets = [...(wallets[assetKey] || [])];
      if (assetWallets[idx]) {
        assetWallets[idx] = { ...assetWallets[idx], [field]: value };
      }
      wallets[assetKey] = assetWallets;
      return { ...prev, walletAddresses: wallets };
    });
  };

  const addWallet = (assetKey: string) => {
    setSettings((prev) => {
      const wallets = prev.walletAddresses ? { ...prev.walletAddresses } : {};
      const assetWallets = [...(wallets[assetKey] || [])];
      assetWallets.push({ network: "", address: "" });
      wallets[assetKey] = assetWallets;
      return { ...prev, walletAddresses: wallets };
    });
  };

  const removeWallet = (assetKey: string, idx: number) => {
    setSettings((prev) => {
      const wallets = prev.walletAddresses ? { ...prev.walletAddresses } : {};
      const assetWallets = [...(wallets[assetKey] || [])];
      assetWallets.splice(idx, 1);
      wallets[assetKey] = assetWallets;
      return { ...prev, walletAddresses: wallets };
    });
  };

  const copyAddress = async (address: string, key: string) => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      setSnackbar({ open: true, msg: "Copy failed", severity: "error" });
    }
  };

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
                    {!cloudName ? (
                      <Typography variant="caption" color="error">
                        Cloudinary Cloud Name not set in env vars.
                      </Typography>
                    ) : (
                      <CldUploadWidget
                        uploadPreset="voltsq_videos"
                        onSuccess={(result: any) => {
                          if (result?.info?.secure_url) {
                            setSettings((prev) => ({
                              ...prev,
                              landingVideoUrl: result.info.secure_url,
                            }));
                          }
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
                    )}
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
                  {!cloudName ? (
                    <Typography variant="caption" color="error">
                      Cloudinary Cloud Name not set in env vars.
                    </Typography>
                  ) : (
                    <CldUploadWidget
                      uploadPreset="voltsq_videos"
                      onSuccess={(result: any) => {
                        if (result?.info?.secure_url) {
                          setSettings((prev) => ({
                            ...prev,
                            landingVideoUrl: result.info.secure_url,
                          }));
                        }
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
                  )}
                </Stack>
              )}
            </Box>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="800"
                sx={{
                  color: "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Wallet size={18} /> Deposit Wallet Addresses
              </Typography>
              <Chip
                label={
                  Object.values(settings.walletAddresses || {})
                    .flat()
                    .filter((w) => w.address.trim()).length + " configured"
                }
                size="small"
                sx={{
                  bgcolor: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                  fontWeight: 700,
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              />
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "var(--muted-foreground)", mb: 3 }}
            >
              Configure wallet addresses for each cryptocurrency. Changes will
              be reflected immediately on the user deposit pages.
            </Typography>

            <Stack spacing={2}>
              {Object.entries(DEFAULT_WALLETS).map(([assetKey, config]) => {
                const wallets =
                  settings.walletAddresses?.[assetKey] || config.wallets;
                return (
                  <Accordion
                    key={assetKey}
                    disableGutters
                    sx={{
                      bgcolor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 3,
                      "&:before": { display: "none" },
                      "&.Mui-expanded": { borderRadius: 3, mt: 0 },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDown size={18} />}
                      sx={{
                        px: 2.5,
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        width="100%"
                      >
                        <Chip
                          label={config.icon}
                          size="small"
                          sx={{
                            bgcolor: "rgba(99, 102, 241, 0.1)",
                            color: "primary.main",
                            fontWeight: 900,
                            minWidth: 48,
                            justifyContent: "center",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={800}
                            sx={{ color: "var(--foreground)" }}
                          >
                            {config.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "var(--muted-foreground)" }}
                          >
                            {wallets.filter((w) => w.address.trim()).length} of{" "}
                            {wallets.length} addresses set
                          </Typography>
                        </Box>
                        <Box sx={{ ml: "auto" }}>
                          {wallets.filter((w) => w.address.trim()).length >
                          0 ? (
                            <Chip
                              label="Active"
                              size="small"
                              sx={{
                                bgcolor: "rgba(34, 197, 94, 0.1)",
                                color: "#22c55e",
                                fontWeight: 700,
                                border: "none",
                              }}
                            />
                          ) : (
                            <Chip
                              label="Not Set"
                              size="small"
                              sx={{
                                bgcolor: "rgba(239, 68, 68, 0.1)",
                                color: "#ef4444",
                                fontWeight: 700,
                                border: "none",
                              }}
                            />
                          )}
                        </Box>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                      <Divider sx={{ mb: 2.5, borderColor: "var(--border)" }} />
                      <Stack spacing={2}>
                        {wallets.map((wallet, idx) => (
                          <Stack
                            key={idx}
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            alignItems={{ md: "flex-start" }}
                            sx={{
                              p: 2,
                              borderRadius: 2.5,
                              bgcolor: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <TextField
                              size="small"
                              label="Network"
                              value={wallet.network}
                              onChange={(e) =>
                                updateWalletAddress(
                                  assetKey,
                                  idx,
                                  "network",
                                  e.target.value,
                                )
                              }
                              sx={{
                                width: { md: 140 },
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              label="Wallet Address"
                              value={wallet.address}
                              onChange={(e) =>
                                updateWalletAddress(
                                  assetKey,
                                  idx,
                                  "address",
                                  e.target.value,
                                )
                              }
                              placeholder={`Enter ${config.name} wallet address`}
                              sx={{
                                flex: 1,
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                              InputProps={{
                                endAdornment: wallet.address ? (
                                  <Tooltip title="Copy address">
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        copyAddress(
                                          wallet.address,
                                          `${assetKey}-${idx}`,
                                        )
                                      }
                                      sx={{ ml: 1 }}
                                    >
                                      {copiedKey === `${assetKey}-${idx}` ? (
                                        <Check size={16} color="#22c55e" />
                                      ) : (
                                        <Copy size={16} />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                ) : null,
                              }}
                            />
                            <Tooltip title="Remove this wallet">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeWallet(assetKey, idx)}
                                sx={{
                                  border: "1px solid rgba(239, 68, 68, 0.3)",
                                  height: 40,
                                  width: 40,
                                  "&:hover": {
                                    bgcolor: "rgba(239, 68, 68, 0.1)",
                                  },
                                }}
                              >
                                <X size={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        ))}
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Plus size={14} />}
                          onClick={() => addWallet(assetKey)}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            alignSelf: "flex-start",
                          }}
                        >
                          Add Network Address
                        </Button>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
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
