"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "next-themes";

export default function LiveChartSection() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";
  
  // Construct the URL for the TradingView Widget
  const chartUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=BINANCE%3ABTCUSDT&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=${theme === "light" ? "f1f3f6" : "131722"}&studies=[]&theme=${theme}&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=BINANCE%3ABTCUSDT`;

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
          <iframe
            id="tradingview_chart"
            src={chartUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
        </Box>
      </Container>
    </Box>
  );
}
