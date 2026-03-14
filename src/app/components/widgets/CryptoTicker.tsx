"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CryptoTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BITSTAMP:USDTUSD", title: "Tether USDT" },
        { proName: "BITSTAMP:BNBUSD", title: "BNB" },
        { proName: "BITSTAMP:SOLUSD", title: "Solana" },
        { proName: "BITSTAMP:ADAUSD", title: "Cardano" },
        { proName: "BITSTAMP:XRPUSD", title: "XRP" },
        { proName: "BITSTAMP:DOGEUSD", title: "Dogecoin" },
        { proName: "BITSTAMP:LTCUSD", title: "Litecoin" },
      ],
      showSymbolLogo: true,
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });

    // Clear previous widget before adding new one
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="w-full border-b border-border bg-background">
      <div ref={containerRef} />
    </div>
  );
}
