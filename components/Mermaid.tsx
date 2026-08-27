"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

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
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        fontFamily: "var(--font-heading), sans-serif",
        themeVariables: {
          fontFamily: "var(--font-heading), sans-serif",
          fontSize: "15px",
          primaryColor: "#FFD23F",
          primaryBorderColor: "#000000",
          primaryTextColor: "#000000",
          lineColor: "#000000",
          secondaryColor: "#74B9FF",
          secondaryBorderColor: "#000000",
          secondaryTextColor: "#000000",
          tertiaryColor: "#FF6B6B",
          tertiaryBorderColor: "#000000",
          tertiaryTextColor: "#000000",
          background: "#fffdf5",
          mainBkg: "#fffdf5",
          nodeBorder: "#000000",
          clusterBkg: "#ffffff",
          clusterBorder: "#000000",
          nodeTextColor: "#000000",
          edgeLabelBackground: "#ffffff",
          titleColor: "#000000",
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
      <pre className="neo-sm overflow-auto bg-white p-3 font-mono text-xs">
        {chart}
      </pre>
    );
  }

  return (
    <figure className="mermaid-host" ref={ref} aria-label={caption ?? "Architecture diagram"}>
      <figcaption className="sr-only">{caption ?? "Architecture diagram"}</figcaption>
    </figure>
  );
}
