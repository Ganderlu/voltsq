"use client";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, isAdmin, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    
    const isLogin = pathname === "/login";
    if (!currentUser || (!isAdmin && !isLogin)) {
      router.replace("/login");
    }
  }, [currentUser, isAdmin, loading, pathname, router]);

  const sidebarDisabled = useMemo(() => {
    const isLogin = pathname === "/login";
    return isLogin || !isAdmin;
  }, [pathname, isAdmin]);

  if (loading) return null; // Or a loading spinner

  return (
    <Box display="flex" height="100vh" bgcolor="var(--background)" sx={{ overflow: "hidden" }}>
      <Sidebar open={open} onClose={() => setOpen(false)} disabled={sidebarDisabled} />
      <Box flex={1} display="flex" flexDirection="column" sx={{ overflow: "hidden" }}>
        <Header onMenu={() => setOpen(true)} />
        <Box flex={1} sx={{ overflowY: "auto", p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
