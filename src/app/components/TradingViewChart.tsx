"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMarketStore } from "@/store/useMarketStore";
import { Box, CircularProgress } from "@mui/material";

export default function TradingViewChart() {
  const { resolvedTheme } = useTheme();
  const { symbol } = useMarketStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box 
        sx={{ 
          width: "100%", 
          height: { xs: "400px", md: "600px" }, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          bgcolor: "var(--card)",
          borderRadius: "16px"
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  const theme = resolvedTheme === "light" ? "light" : "dark";
  
  // Construct the URL for the TradingView Widget
  // We use the widget embed URL which is highly reliable
  const chartUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${encodeURIComponent(symbol)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=${theme === "light" ? "f1f3f6" : "131722"}&studies=[]&theme=${theme}&style=1&timezone=Etc%2FUTC&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${encodeURIComponent(symbol)}`;

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "400px", md: "600px" },
        bgcolor: "var(--card)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        position: "relative"
      }}
    >
      <iframe
        id="tradingview_chart"
        src={chartUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </Box>
  );
}
