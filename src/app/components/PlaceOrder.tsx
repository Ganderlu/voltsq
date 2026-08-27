"use client";

import { useState } from "react";
import { useMarketStore } from "@/store/useMarketStore";
import { ASSETS } from "../constants/assets";
import { placeTrade } from "../dashboard/trades/actions";
import { useAuth } from "@/context/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Chip,
  MenuItem,
  CircularProgress,
  Divider,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Zap,
  ShieldCheck,
  ChevronRight,
  Wallet,
} from "lucide-react";

export default function PlaceOrder() {
  const { symbol } = useMarketStore();
  const { currentUser } = useAuth();
  const stats = useUserStats();
  const [direction, setDirection] = useState<"call" | "put">("call");
  const [amount, setAmount] = useState(10);
  const [duration, setDuration] = useState(60); // seconds (1 min)
  const [loading, setLoading] = useState(false);

  // Parse symbol to get asset name (e.g. "BTC")
  const assetName = symbol.replace("BINANCE:", "").replace("USDT", "");
  const assetInfo = ASSETS.find((a) => a.symbol === assetName);
  const payoutStr = assetInfo?.payout || "85%";
  const payout = parseFloat(payoutStr) / 100;

  // Get current available balance from Firestore via useUserStats
  // LIVE mode = stats.balance (= usdtBalance), DEMO mode = balanceDemo
  const mode = stats.mode || "demo";
  const availableBalance =
    mode === "demo" ? stats.balanceDemo || 0 : stats.balance || 0;

  const isInsufficient = amount > availableBalance;

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const handleTrade = async () => {
    if (loading) return;
    if (!currentUser) {
      alert("Please log in to trade");
      return;
    }
    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (isInsufficient) {
      alert(
        `Insufficient balance. Available: $${availableBalance.toLocaleString()}. Required: $${amount}`,
      );
      return;
    }
    setLoading(true);

    try {
      const tickerSymbol = `${assetName}USDT`;
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${tickerSymbol}`,
      );
      const data = await res.json();
      const price = parseFloat(data.price);

      if (!price) throw new Error("Failed to fetch price");

      await placeTrade({
        uid: currentUser.uid,
        asset: assetName,
        direction,
        amount,
        duration,
        payout,
        price,
      });
    } catch (err: any) {
      alert(err.message || "Failed to place trade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2.5, bgcolor: "var(--card)", borderRadius: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="700"
          sx={{ color: "#ffffff" }}
        >
          Place Order
        </Typography>
        <Chip
          label={`${assetName}/USDT ${payoutStr}`}
          size="small"
          sx={{
            bgcolor: "rgba(99, 102, 241, 0.1)",
            color: "primary.main",
            fontWeight: "700",
            fontSize: "0.7rem",
            fontFamily: "monospace",
          }}
        />
      </Stack>

      {/* Available Balance Card */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2.5,
          bgcolor: "rgba(99, 102, 241, 0.06)",
          border: "1px solid rgba(99, 102, 241, 0.18)",
          borderRadius: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: "rgba(99, 102, 241, 0.15)",
                color: "#6366f1",
                display: "flex",
              }}
            >
              <Wallet size={18} />
            </Box>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--muted-foreground)",
                  fontWeight: "600",
                  display: "block",
                  lineHeight: 1.2,
                }}
              >
                {mode === "demo" ? "Demo Balance" : "Available Balance"}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="800"
                sx={{
                  color: "#6366f1",
                  lineHeight: 1.3,
                  fontFamily: "monospace",
                }}
              >
                $
                {availableBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Stack>
          <Chip
            label={mode === "demo" ? "DEMO" : "LIVE"}
            size="small"
            sx={{
              height: 22,
              bgcolor:
                mode === "live"
                  ? "rgba(34, 197, 94, 0.12)"
                  : "rgba(234, 179, 8, 0.12)",
              color: mode === "live" ? "#22c55e" : "#eab308",
              fontWeight: "900",
              fontSize: "0.62rem",
              letterSpacing: 0.8,
            }}
          />
        </Stack>
      </Paper>

      {isInsufficient && amount > 0 && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 3,
            "& .MuiAlert-message": {
              fontSize: "0.8rem",
              fontWeight: 600,
            },
          }}
        >
          Insufficient balance. You need ${amount.toLocaleString()} but have $
          {availableBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
          .
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Direction */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "var(--muted-foreground)",
              fontWeight: "600",
              mb: 1,
              display: "block",
            }}
          >
            SELECT DIRECTION
          </Typography>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                onClick={() => setDirection("call")}
                variant={direction === "call" ? "contained" : "outlined"}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: direction === "call" ? "#22c55e" : "transparent",
                  borderColor: "#22c55e",
                  color: direction === "call" ? "#ffffff" : "#22c55e",
                  "&:hover": {
                    bgcolor:
                      direction === "call"
                        ? "#16a34a"
                        : "rgba(34, 197, 94, 0.05)",
                    borderColor: "#22c55e",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  transition: "all 0.2s",
                }}
              >
                <TrendingUp size={18} />
                <Typography variant="caption" fontWeight="800">
                  CALL
                </Typography>
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                onClick={() => setDirection("put")}
                variant={direction === "put" ? "contained" : "outlined"}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: direction === "put" ? "#ef4444" : "transparent",
                  borderColor: "#ef4444",
                  color: direction === "put" ? "#ffffff" : "#ef4444",
                  "&:hover": {
                    bgcolor:
                      direction === "put"
                        ? "#dc2626"
                        : "rgba(239, 68, 68, 0.05)",
                    borderColor: "#ef4444",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  transition: "all 0.2s",
                }}
              >
                <TrendingDown size={18} />
                <Typography variant="caption" fontWeight="800">
                  PUT
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Amount */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="caption"
              sx={{ color: "var(--muted-foreground)", fontWeight: "600" }}
            >
              INVESTMENT AMOUNT
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#22c55e", fontWeight: "700" }}
            >
              Profit: +${(amount * payout).toFixed(2)}
            </Typography>
          </Stack>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            error={isInsufficient}
            helperText={
              isInsufficient ? "Exceeds available balance" : undefined
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={16} color="var(--muted-foreground)" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    variant="text"
                    onClick={() =>
                      setAmount(Number(availableBalance.toFixed(2)))
                    }
                    disabled={availableBalance <= 0}
                    sx={{
                      minWidth: "auto",
                      p: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: "800",
                      color: "#6366f1",
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                      },
                      minHeight: "auto",
                    }}
                  >
                    MAX
                  </Button>
                </InputAdornment>
              ),
              sx: {
                bgcolor: isInsufficient
                  ? "rgba(239, 68, 68, 0.03)"
                  : "rgba(255,255,255,0.03)",
                borderRadius: 2.5,
                "& fieldset": {
                  borderColor: isInsufficient ? "#ef4444" : "var(--border)",
                },
                "& input": { color: "#ffffff", fontWeight: "700" },
              },
            }}
          />

          {/* Quick Amount Buttons */}
          <Grid container spacing={1} sx={{ mt: 1.5 }}>
            {quickAmounts.map((q) => {
              const disabledQ = q > availableBalance;
              return (
                <Grid size={{ xs: 4, sm: 4 }} key={q}>
                  <Button
                    fullWidth
                    size="small"
                    variant={amount === q ? "contained" : "outlined"}
                    onClick={() => setAmount(q)}
                    disabled={disabledQ}
                    sx={{
                      py: 0.7,
                      borderRadius: 2,
                      fontSize: "0.75rem",
                      fontWeight: "800",
                      borderColor: "var(--border)",
                      color:
                        amount === q ? "#ffffff" : "var(--muted-foreground)",
                      bgcolor: amount === q ? "#6366f1" : "transparent",
                      "&:hover": {
                        borderColor: disabledQ ? "var(--border)" : "#6366f1",
                        bgcolor:
                          amount === q ? "#6366f1" : "rgba(99, 102, 241, 0.08)",
                        color: disabledQ ? undefined : "#6366f1",
                      },
                    }}
                  >
                    ${q}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Duration */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "var(--muted-foreground)",
              fontWeight: "600",
              mb: 1,
              display: "block",
            }}
          >
            EXPIRY DURATION
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Clock size={16} color="var(--muted-foreground)" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 2.5,
                "& fieldset": { borderColor: "var(--border)" },
                "& .MuiSelect-select": {
                  color: "#ffffff",
                  fontWeight: "600",
                },
              },
            }}
          >
            <MenuItem value={60}>1 Minute</MenuItem>
            <MenuItem value={300}>5 Minutes</MenuItem>
            <MenuItem value={900}>15 Minutes</MenuItem>
            <MenuItem value={1800}>30 Minutes</MenuItem>
            <MenuItem value={3600}>1 Hour</MenuItem>
          </TextField>
        </Box>

        <Divider sx={{ borderColor: "var(--border)" }} />

        {/* Order Summary */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "rgba(255,255,255,0.02)",
            borderRadius: 3,
            border: "1px solid var(--border)",
          }}
        >
          <Stack spacing={1.2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}
              >
                Stake
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", fontWeight: "700" }}
              >
                ${amount.toLocaleString()}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{ color: "var(--muted-foreground)", fontWeight: 500 }}
              >
                Payout ({payoutStr})
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#22c55e", fontWeight: "700" }}
              >
                +${(amount * payout).toFixed(2)}
              </Typography>
            </Stack>
            <Divider sx={{ borderColor: "var(--border)", my: 0.5 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
              >
                Potential Return
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#22c55e", fontWeight: "900" }}
              >
                ${(amount + amount * payout).toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Button
          fullWidth
          variant="contained"
          onClick={handleTrade}
          disabled={loading || isInsufficient || amount <= 0}
          startIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <Zap size={18} />
            )
          }
          sx={{
            py: 1.5,
            borderRadius: 3,
            bgcolor: "primary.main",
            fontWeight: "800",
            fontSize: "0.95rem",
            boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.39)",
            "&:hover": { bgcolor: "primary.dark" },
            "&:disabled": {
              bgcolor: "rgba(99, 102, 241, 0.3)",
              color: "rgba(255,255,255,0.5)",
            },
            textTransform: "none",
          }}
        >
          {loading
            ? "EXECUTING..."
            : isInsufficient
              ? "INSUFFICIENT BALANCE"
              : `PLACE ${direction.toUpperCase()} — $${amount}`}
        </Button>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <ShieldCheck size={12} color="var(--muted-foreground)" />
          <Typography
            variant="caption"
            sx={{ color: "var(--muted-foreground)" }}
          >
            Secure instant execution • Balance deducted from Firestore
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
