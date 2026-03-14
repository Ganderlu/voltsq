"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "next-themes";

export default function MarketOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: "660",
      tabs: [
        {
          title: "Cryptocurrencies",
          symbols: [
            { s: "BINANCE:BTCUSDT" },
            { s: "BINANCE:ETHUSDT" },
            { s: "BINANCE:BNBUSDT" },
            { s: "BINANCE:SOLUSDT" },
            { s: "BINANCE:ADAUSDT" },
            { s: "BINANCE:XRPUSDT" },
            { s: "BINANCE:DOTUSDT" },
            { s: "BINANCE:DOGEUSDT" },
            { s: "BINANCE:MATICUSDT" },
          ],
        },
      ],
    });

    // Clear previous widget before adding new one
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <Box sx={{ bgcolor: "var(--background)", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: "var(--primary)", fontWeight: 700, letterSpacing: 2 }}
          >
            MARKET OVERVIEW
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mt: 1,
              mb: 2,
              background: "linear-gradient(to right, var(--foreground), var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Real-Time Crypto Market
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "var(--muted-foreground)", maxWidth: "800px", mx: "auto" }}
          >
            Track the world's leading digital assets with live price data, market trends, and professional analysis tools.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid var(--border)",
            bgcolor: resolvedTheme === "light" ? "#ffffff" : "var(--card)",
            p: { xs: 1, md: 3 },
          }}
        >
          <div ref={containerRef} className="tradingview-widget-container" />
        </Box>
      </Container>
    </Box>
  );
}
