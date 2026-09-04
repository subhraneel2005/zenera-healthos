"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function getThemeVars() {
  if (typeof document === "undefined") return null;
  const isDark = document.documentElement.classList.contains("dark");
  return {
    primaryColor: isDark ? "#1e293b" : "#f3f4f6",
    primaryBorderColor: isDark ? "#94a3b8" : "#000000",
    primaryTextColor: isDark ? "#f1f5f9" : "#000000",
    lineColor: isDark ? "#94a3b8" : "#000000",
    secondaryColor: isDark ? "#334155" : "#e5e7eb",
    secondaryBorderColor: isDark ? "#94a3b8" : "#000000",
    secondaryTextColor: isDark ? "#f1f5f9" : "#000000",
    tertiaryColor: isDark ? "#1e293b" : "#f9fafb",
    tertiaryBorderColor: isDark ? "#94a3b8" : "#000000",
    tertiaryTextColor: isDark ? "#f1f5f9" : "#000000",
    background: isDark ? "#0a0a0a" : "#ffffff",
    mainBkg: isDark ? "#0a0a0a" : "#ffffff",
    nodeBorder: isDark ? "#94a3b8" : "#000000",
    clusterBkg: isDark ? "#1e293b" : "#f9fafb",
    clusterBorder: isDark ? "#94a3b8" : "#000000",
    nodeTextColor: isDark ? "#f1f5f9" : "#000000",
    edgeLabelBackground: isDark ? "#0a0a0a" : "#ffffff",
    titleColor: isDark ? "#f1f5f9" : "#000000",
  };
}

export default function Mermaid({
  chart,
  caption,
}: {
  chart: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const vars = getThemeVars();
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        fontFamily: "var(--font-sans), sans-serif",
        themeVariables: {
          ...vars,
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "15px",
        },
        flowchart: { curve: "linear", htmlLabels: true, padding: 14, nodeSpacing: 36, rankSpacing: 48 },
        sequence: { useMaxWidth: true },
      });
      initialized = true;
    }

    let active = true;
    const render = async () => {
      try {
        const { svg } = await mermaid.render(
          `mmd-${Math.random().toString(36).slice(2)}`,
          chart
        );
        if (active && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (active) setError(true);
      }
    };
    render();
    return () => {
      active = false;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-auto rounded-lg border bg-background p-3 font-mono text-xs">
        {chart}
      </pre>
    );
  }

  return (
    <figure className="mermaid-host" ref={ref} role="img" aria-label={caption ?? "Architecture diagram"}>
      <figcaption className="sr-only">{caption ?? "Architecture diagram"}</figcaption>
    </figure>
  );
}
