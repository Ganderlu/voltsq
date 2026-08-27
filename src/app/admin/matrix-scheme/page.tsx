"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  Grid,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseClient";
import { useEffect, useState } from "react";
import {
  Grid3X3,
  Search,
  User,
  Calendar,
  TrendingUp,
  Award,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";

type UserProfile = {
  fullName?: string;
  username?: string;
  email?: string;
};

type EnrollmentWithUser = {
  id: string;
  userId: string;
  planTitle: string;
  amount: number;
  commission: number;
  status: string;
  createdAt: Date;
  userProfile?: UserProfile | null;
};

// Lightweight helper: build a string-color from user id for Avatar
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

function getInitials(name: string, fallbackUid?: string) {
  if (!name) {
    return fallbackUid ? fallbackUid.slice(0, 2).toUpperCase() : "U";
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getUserDisplayName(
  row: EnrollmentWithUser,
  opts: { includeUid?: boolean } = {},
) {
  const p = row.userProfile;
  const name = p?.fullName || p?.username;
  if (name) {
    if (opts.includeUid) {
      return {
        primary: name,
        secondary: p?.email || row.userId,
      };
    }
    return { primary: name, secondary: p?.email };
  }
  // Fallback — if no user profile exists, show the UID as primary
  if (opts.includeUid) {
    return { primary: row.userId, secondary: undefined };
  }
  return { primary: row.userId, secondary: undefined };
}

export default function AdminMatrixSchemePage() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Cache of userIds already fetched to avoid re-fetching the same user many times
  const profileCacheRef: Record<string, UserProfile | null> = {};

  useEffect(() => {
    let cancelled = false;

    const q = query(
      collection(db, "matrixEnrollments"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, async (snap) => {
      const raw = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as EnrollmentWithUser[];

      // Collect userIds not yet cached
      const missingUids = Array.from(
        new Set(
          raw
            .map((r) => r.userId)
            .filter((uid) => uid && !(uid in profileCacheRef)),
        ),
      );

      // Batch fetch missing user profiles
      const missingProfiles = await Promise.all(
        missingUids.map(async (uid) => {
          try {
            const snap = await getDoc(doc(db, "users", uid));
            if (snap.exists()) {
              const d = snap.data() as UserProfile;
              const p: UserProfile = {
                fullName: d.fullName,
                username: d.username,
                email: d.email,
              };
              profileCacheRef[uid] = p;
              return [uid, p] as const;
            } else {
              profileCacheRef[uid] = null;
              return [uid, null] as const;
            }
          } catch {
            profileCacheRef[uid] = null;
            return [uid, null] as const;
          }
        }),
      );
      // Store into cache (already done above, this just ensures no unused warning)
      void missingProfiles;

      if (cancelled) return;

      // Attach userProfile to each row
      const joined = raw.map((r) => ({
        ...r,
        userProfile: r.userId ? profileCacheRef[r.userId] ?? null : null,
      }));

      setEnrollments(joined);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const filteredEnrollments = enrollments.filter((e) => {
    const display = getUserDisplayName(e, { includeUid: true });
    return (
      `${e.planTitle} ${display.primary} ${display.secondary || ""} ${e.id} ${e.userId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "var(--background)",
        minHeight: "100vh",
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
            <Grid3X3 size={28} color="#eab308" /> Matrix Scheme
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Monitor multi-level network enrollments and aggregate commission
            distributions.
          </Typography>
        </Box>
      </Stack>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(234, 179, 8, 0.1)",
                  color: "#eab308",
                }}
              >
                <Award size={20} />
              </Box>
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                }}
              >
                Total Enrollments
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ color: "var(--foreground)" }}
            >
              {enrollments.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                }}
              >
                <CheckCircle2 size={20} />
              </Box>
              <Typography
                variant="caption"
                fontWeight="700"
                sx={{
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                }}
              >
                Active Plans
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight="900" sx={{ color: "#22c55e" }}>
              {
                enrollments.filter((e) => e.status === "active" || !e.status)
                  .length
              }
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filter */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by plan, investor name, email, or ID..."
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

      {/* ============ MOBILE CARDS ============ */}
      {isMobile ? (
        <Stack spacing={2}>
          {filteredEnrollments.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: "center",
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 4,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "var(--muted-foreground)" }}
              >
                No matrix enrollments found.
              </Typography>
            </Paper>
          ) : (
            filteredEnrollments.map((row) => {
              const display = getUserDisplayName(row);
              const avatarColor = stringToColor(row.userId || row.id);
              const initials = getInitials(
                display.primary,
                row.userId || row.id,
              );
              return (
                <Card
                  key={row.id}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    bgcolor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor:
                            display.primary && !/^[A-Za-z0-9]{10,}$/.test(display.primary)
                              ? "rgba(234, 179, 8, 0.12)"
                              : "rgba(99,102,241,0.12)",
                          color:
                            display.primary && !/^[A-Za-z0-9]{10,}$/.test(display.primary)
                              ? "#eab308"
                              : avatarColor,
                          fontSize: "0.85rem",
                          fontWeight: "800",
                        }}
                      >
                        {display.primary && !/^[A-Za-z0-9]{10,}$/.test(display.primary) ? (
                          getInitials(display.primary)
                        ) : (
                          <User size={18} />
                        )}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight="800"
                          sx={{ color: "var(--foreground)" }}
                        >
                          {display.primary}
                        </Typography>
                        {display.secondary && (
                          <Typography
                            variant="caption"
                            sx={{ color: "var(--muted-foreground)" }}
                          >
                            {display.secondary}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                    <Chip
                      label={row.status || "active"}
                      size="small"
                      icon={
                        row.status === "active" || !row.status ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )
                      }
                      sx={{
                        bgcolor:
                          row.status === "active" || !row.status
                            ? "rgba(34, 197, 94, 0.1)"
                            : "rgba(255, 255, 255, 0.05)",
                        color:
                          row.status === "active" || !row.status
                            ? "#22c55e"
                            : "var(--muted-foreground)",
                        fontWeight: 800,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                      }}
                    />
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        Plan
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="800"
                        sx={{ color: "var(--foreground)" }}
                      >
                        {row.planTitle}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        Amount
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="800"
                        sx={{ color: "#eab308" }}
                      >
                        ${row.amount?.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        Commission
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="800"
                        sx={{ color: "#22c55e" }}
                      >
                        +${row.commission?.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--muted-foreground)" }}
                      >
                        Enrolled
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: "var(--foreground)" }}
                      >
                        {row.createdAt?.toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              );
            })
          )}
        </Stack>
      ) : (
        /* ============ DESKTOP TABLE ============ */
        <Paper
          elevation={0}
          sx={{
            bgcolor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Enrollment Date
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Investor
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Plan Package
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Commission
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--muted-foreground)" }}
                    >
                      No matrix enrollments found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnrollments.map((row) => {
                  const display = getUserDisplayName(row);
                  const avatarColor = stringToColor(row.userId || row.id);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" } }}
                    >
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Calendar size={14} color="var(--muted-foreground)" />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--foreground)" }}
                            >
                              {row.createdAt?.toLocaleDateString()}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "var(--muted-foreground)" }}
                            >
                              {row.createdAt?.toLocaleTimeString()}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              bgcolor:
                                display.primary &&
                                !/^[A-Za-z0-9]{10,}$/.test(display.primary)
                                  ? "rgba(234, 179, 8, 0.12)"
                                  : "rgba(99,102,241,0.12)",
                              color:
                                display.primary &&
                                !/^[A-Za-z0-9]{10,}$/.test(display.primary)
                                  ? "#eab308"
                                  : avatarColor,
                              fontSize: "0.8rem",
                              fontWeight: "800",
                            }}
                          >
                            {display.primary &&
                            !/^[A-Za-z0-9]{10,}$/.test(display.primary) ? (
                              getInitials(display.primary)
                            ) : (
                              <User size={16} />
                            )}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight="700"
                              sx={{ color: "var(--foreground)", lineHeight: 1.3 }}
                            >
                              {display.primary}
                            </Typography>
                            {display.secondary ? (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "var(--muted-foreground)",
                                  lineHeight: 1.3,
                                }}
                              >
                                {display.secondary}
                              </Typography>
                            ) : row.userProfile ? null : (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "rgba(100,116,139,0.8)",
                                  lineHeight: 1.3,
                                  fontFamily: "monospace",
                                }}
                              >
                                UID: {row.userId?.slice(0, 14)}
                                {row.userId && row.userId.length > 14 ? "…" : ""}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="800"
                          sx={{ color: "var(--foreground)" }}
                        >
                          {row.planTitle}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="800"
                          sx={{ color: "#eab308" }}
                        >
                          ${row.amount?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="800"
                          sx={{ color: "#22c55e" }}
                        >
                          +${row.commission?.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.status || "active"}
                          size="small"
                          icon={
                            row.status === "active" || !row.status ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <Clock size={12} />
                            )
                          }
                          sx={{
                            bgcolor:
                              row.status === "active" || !row.status
                                ? "rgba(34, 197, 94, 0.1)"
                                : "rgba(255, 255, 255, 0.05)",
                            color:
                              row.status === "active" || !row.status
                                ? "#22c55e"
                                : "var(--muted-foreground)",
                            fontWeight: 800,
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
