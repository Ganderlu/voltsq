"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAuth } from "@/context/AuthContext";
import { isAdmin } from "../utils/isAdmin";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [adminAllowed, setAdminAllowed] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!currentUser) {
        setAdminAllowed(false);
        return;
      }
      const ok = await isAdmin(currentUser.uid);
      if (!cancelled) setAdminAllowed(ok);
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  useEffect(() => {
    const isLogin = pathname === "/login";
    if (adminAllowed === false && !isLogin) {
      router.replace("/login");
    }
  }, [adminAllowed, pathname, router]);

  const sidebarDisabled = useMemo(() => {
    const isLogin = pathname === "/login";
    return isLogin || adminAllowed === false || adminAllowed === null;
  }, [pathname, adminAllowed]);

  return (
    <Box display="flex" minHeight="100vh" bgcolor="var(--background)">
      <Sidebar open={open} onClose={() => setOpen(false)} disabled={sidebarDisabled} />
      <Box flex={1}>
        <Header onMenu={() => setOpen(true)} />
        <Box p={{ xs: 2, md: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
