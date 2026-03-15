"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/app/components/notifications/NotificationBell";
import DashboardTicker from "./DashboardTicker";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        height: 72,
        px: { xs: 2, md: 5 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "var(--background)",
        borderBottom: "1px solid",
        borderColor: "var(--border)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 0, mr: 2 }}>
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "var(--muted-foreground)" }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <DashboardTicker />
        </Box>
      </Stack>

      <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center" sx={{ flexShrink: 0 }}>
        {/* <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{
              color: "var(--muted-foreground)",
              "&:hover": { color: "var(--foreground)", bgcolor: "var(--accent)" },
            }}
          >
            <Search size={20} />
          </IconButton>
          <NotificationBell />
        </Stack> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            ml: 1,
            pl: { xs: 1, md: 3 },
            borderLeft: "1px solid",
            borderColor: "var(--border)",
          }}
        >
          <Box textAlign="right" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={600} sx={{ color: "var(--foreground)" }}>
              {currentUser?.email?.split("@")[0] || "User"}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)" }}>
              Investor
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: 16,
              border: "2px solid",
              borderColor: "var(--border)",
            }}
          >
            {currentUser?.email?.[0].toUpperCase() || "U"}
          </Avatar>
        </Box>
      </Stack>
    </Box>
  );
}
