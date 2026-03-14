"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CryptoTicker() {
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
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div ref={containerRef} />
    </div>
  );
}
