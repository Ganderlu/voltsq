"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Box } from "@mui/material";

export default function DashboardTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BINANCE:BTCUSDT", title: "BTC" },
        { proName: "BINANCE:ETHUSDT", title: "ETH" },
        { proName: "BINANCE:SOLUSDT", title: "SOL" },
        { proName: "BINANCE:BNBUSDT", title: "BNB" },
        { proName: "BINANCE:XRPUSDT", title: "XRP" },
        { proName: "BINANCE:ADAUSDT", title: "ADA" },
      ],
      showSymbolLogo: true,
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        "& .tradingview-widget-container": {
          width: "100%",
        },
      }}
    >
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </Box>
  );
}
