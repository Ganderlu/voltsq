"use client";

import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Chip,
  Tooltip,
  CircularProgress,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  ArrowUpRight,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Wallet,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useAuth();
  const [userInfoById, setUserInfoById] = useState<
    Record<string, { fullName: string; email: string }>
  >({});

  useEffect(() => {
    return onSnapshot(collection(db, "withdrawals"), (snap) => {
      setWithdrawals(
        (snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[]).sort(
          (a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
          },
        ),
      );
    });
  }, []);

  useEffect(() => {
    const userIds = Array.from(
      new Set(
        withdrawals
          .map((w) => w.userId)
          .filter((id: any) => typeof id === "string" && id.length > 0),
      ),
    ) as string[];

    const missing = userIds.filter((id) => !userInfoById[id]);
    if (missing.length === 0) return;

    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        missing.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            const data = snap.exists() ? (snap.data() as any) : null;
            const fullName =
              (data?.fullName || data?.username || "").toString().trim() ||
              "Investor";
            const email = (data?.email || "").toString().trim();
            return [uid, { fullName, email }] as const;
          } catch {
            return [uid, { fullName: "Investor", email: "" }] as const;
          }
        }),
      );

      if (cancelled) return;
      setUserInfoById((prev) => {
        const next = { ...prev };
        for (const [uid, info] of entries) next[uid] = info;
        return next;
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [withdrawals, userInfoById]);

  const approveWithdraw = async (w: any) => {
    try {
      setLoadingAction(w.id);
      if (!currentUser) throw new Error("Not signed in");
      const token = await currentUser.getIdToken(true);

      const res = await fetch("/api/admin/withdrawals/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ withdrawalId: w.id }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Failed to approve withdrawal");
      }

      if (json?.emailSent === false) {
        alert(
          "Withdrawal approved, but the approval email could not be sent. Please check RESEND_API_KEY and try again.",
        );
      }
    } catch (err: any) {
      alert(err.message || "Failed to approve withdrawal");
    } finally {
      setLoadingAction(null);
    }
  };

  const rejectWithdraw = async (id: string) => {
    try {
      setLoadingAction(id);
      await updateDoc(doc(db, "withdrawals", id), {
        status: "rejected",
        processedAt: new Date(),
      });
    } catch (err: any) {
      alert(err.message || "Failed to reject withdrawal");
    } finally {
      setLoadingAction(null);
    }
  };

  const filteredWithdrawals = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return withdrawals;
    return withdrawals.filter((w) => {
      const u = userInfoById[w.userId] || { fullName: "", email: "" };
      return `${w.userId} ${w.id} ${w.userEmail || ""} ${u.email} ${u.fullName}`
        .toLowerCase()
        .includes(q);
    });
  }, [withdrawals, search, userInfoById]);

  return (
    <Box
      sx={{
        p: { xs: 0, md: 1 },
        bgcolor: "transparent",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
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
            <ArrowUpRight size={28} color="#ef4444" /> Withdrawal Requests
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Review and process capital withdrawal requests from platform
            members.
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by User ID or Request ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="var(--muted-foreground)" />
              </InputAdornment>
            ),
            sx: { bgcolor: "rgba(255,255,255,0.02)", borderRadius: 3 },
          }}
        />
      </Paper>

      {/* Content */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "var(--card)",
          border: "1px solid",
          borderColor: "var(--border)",
          borderRadius: 4,
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <Box sx={{ minWidth: 720 }}>
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Investor
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Date Requested
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredWithdrawals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--muted-foreground)" }}
                    >
                      No withdrawal requests found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredWithdrawals.map((w) => (
                  <TableRow
                    key={w.id}
                    sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "rgba(239, 68, 68, 0.1)",
                            color: "#ef4444",
                          }}
                        >
                          <User size={16} />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            sx={{ color: "var(--foreground)" }}
                          >
                            {(
                              userInfoById[w.userId]?.fullName ||
                              w.userEmail?.split("@")?.[0] ||
                              "Investor"
                            )
                              .toString()
                              .toUpperCase()}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "var(--muted-foreground)" }}
                          >
                            {w.userEmail ||
                              userInfoById[w.userId]?.email ||
                              "—"}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight="800"
                        sx={{ color: "#ef4444" }}
                      >
                        -$
                        {Number(w.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Calendar size={14} color="var(--muted-foreground)" />
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          {w.createdAt?.toDate?.().toLocaleString() || "N/A"}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={w.status}
                        size="small"
                        icon={
                          w.status === "approved" ? (
                            <CheckCircle2 size={12} />
                          ) : w.status === "rejected" ? (
                            <XCircle size={12} />
                          ) : (
                            <Clock size={12} />
                          )
                        }
                        sx={{
                          bgcolor:
                            w.status === "approved"
                              ? "rgba(34, 197, 94, 0.1)"
                              : w.status === "rejected"
                                ? "rgba(239, 68, 68, 0.1)"
                                : "rgba(234, 179, 8, 0.1)",
                          color:
                            w.status === "approved"
                              ? "#22c55e"
                              : w.status === "rejected"
                                ? "#ef4444"
                                : "#eab308",
                          fontWeight: 800,
                          fontSize: "0.65rem",
                          textTransform: "uppercase",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {w.status === "pending" ? (
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button
                            size="small"
                            variant="contained"
                            disabled={loadingAction === w.id}
                            onClick={() => approveWithdraw(w)}
                            sx={{
                              bgcolor: "#22c55e",
                              "&:hover": { bgcolor: "#16a34a" },
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 700,
                            }}
                          >
                            {loadingAction === w.id ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            disabled={loadingAction === w.id}
                            onClick={() => rejectWithdraw(w.id)}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 700,
                            }}
                          >
                            {loadingAction === w.id ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </Stack>
                      ) : (
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--muted-foreground)" }}
                        >
                          Processed
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
