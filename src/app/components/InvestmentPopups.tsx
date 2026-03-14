"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, Slide, Avatar, Stack } from "@mui/material";
import { TrendingUp } from "lucide-react";

const names = [
  "James", "Sarah", "Marcus", "Elena", "David", "Sofia", "Michael", "Emma", 
  "Liam", "Olivia", "Noah", "Ava", "William", "Isabella", "Ethan", "Mia",
  "Alexander", "Charlotte", "Daniel", "Amelia", "Henry", "Evelyn", "Sebastian"
];

const countries = [
  "USA", "UK", "Germany", "France", "Canada", "Australia", "Singapore", 
  "Japan", "UAE", "Switzerland", "Netherlands", "Norway", "Sweden"
];

const amounts = [
  "$250", "$500", "$1,200", "$2,500", "$5,000", "$750", "$3,000", 
  "$10,000", "$15,000", "$20,000", "$4,500", "$8,200", "$12,500"
];

export default function InvestmentPopups() {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState({ name: "", amount: "", country: "" });

  const showNotification = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    setCurrentData({ name, amount, country });
    setOpen(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  };

  useEffect(() => {
    // Initial delay before first popup
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 5000);

    // Set interval for subsequent popups (every 20-40 seconds)
    const interval = setInterval(() => {
      showNotification();
    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 20, md: 30 },
        left: { xs: 20, md: 30 },
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            p: 2,
            borderRadius: "16px",
            bgcolor: "var(--card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: 2,
            maxWidth: "320px",
            pointerEvents: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: "var(--primary)", 
              width: 45, 
              height: 45,
              boxShadow: "0 0 15px var(--primary)"
            }}
          >
            <TrendingUp size={24} color="#fff" />
          </Avatar>
          
          <Stack spacing={0.2}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "var(--foreground)" }}>
              {currentData.name} from {currentData.country}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--muted-foreground)", display: "block" }}>
              just invested <span style={{ color: "var(--primary)", fontWeight: 800 }}>{currentData.amount}</span>
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.65rem", opacity: 0.6 }}>
              {Math.floor(Math.random() * 59) + 1} seconds ago
            </Typography>
          </Stack>
        </Paper>
      </Slide>
    </Box>
  );
}
