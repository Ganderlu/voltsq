"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "next-themes";

export default function LiveChartSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error // TradingView is a global variable from the script
      if (typeof window.TradingView !== "undefined") {
        // @ts-expect-error
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: resolvedTheme === "light" ? "light" : "dark",
          style: "1",
          locale: "en",
          toolbar_bg: resolvedTheme === "light" ? "#f1f3f6" : "#131722",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_advanced_chart",
        });
      }
    };

    containerRef.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: "linear-gradient(to right, var(--foreground), var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Real-Time Market Data
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--muted-foreground)", maxWidth: "800px", mx: "auto" }}
          >
            Stay ahead with our live charts. Monitor global crypto markets and track price movements with professional-grade analysis tools.
          </Typography>
        </Box>

        <Box
          sx={{
            height: { xs: "400px", md: "600px" },
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid var(--border)",
            bgcolor: resolvedTheme === "light" ? "#f1f3f6" : "#131722",
          }}
        >
          <div
            id="tradingview_advanced_chart"
            ref={containerRef}
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
