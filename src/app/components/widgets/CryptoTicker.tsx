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

    const widgetDiv = document.createElement("div");
    widgetDiv.style.height = "62px";
    widgetDiv.style.width = "100%";
    widgetDiv.style.backgroundColor = resolvedTheme === "light" ? "#FFFFFF" : "#0f172a";
    widgetDiv.style.overflow = "hidden";
    
    const iframe = document.createElement("iframe");
    iframe.src = `https://widget.coinlib.io/widget/v1/ticker?theme=${resolvedTheme === "light" ? "light" : "dark"}`;
    iframe.width = "100%";
    iframe.height = "40px";
    iframe.scrolling = "auto";
    iframe.marginWidth = "0";
    iframe.marginHeight = "0";
    iframe.frameBorder = "0";
    iframe.style.border = "0";
    iframe.style.lineHeight = "14px";

    containerRef.current.appendChild(widgetDiv);
    widgetDiv.appendChild(iframe);
  }, [resolvedTheme]);

  return (
    <div className="w-full border-b border-border bg-background py-2">
      <div ref={containerRef} />
    </div>
  );
}
