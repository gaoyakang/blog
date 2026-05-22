"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface MermaidChartProps {
  chart?: string;
  children?: ReactNode;
}

function resolveChart(chart?: string, children?: ReactNode): string {
  if (typeof chart === "string" && chart.trim()) return chart.trim();

  if (typeof children === "string" && children.trim()) return children.trim();

  function extractText(node: ReactNode): string {
    if (node === null || node === undefined) return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (typeof node === "object") {
      if ("props" in node) {
        return extractText((node as { props: { children?: ReactNode } }).props.children);
      }
      if ("children" in node) {
        return extractText((node as { children?: ReactNode }).children);
      }
    }
    return "";
  }

  const text = extractText(children);
  if (text.trim()) return text.trim();

  return "";
}

export function MermaidChart({ chart, children }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  
  const testSource = `flowchart LR
    A[Write MDX] --> B[Build Site]
    B --> C{Publish}
    C --> D[Readers]`;
  
  const source = resolveChart(chart, children) || testSource;

  useEffect(() => {
    if (!source) return;

    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      const isLight = document.documentElement.classList.contains("light");

      const themeVariables = isLight ? {
        // 浅色主题变量
        primaryColor: "#374151",
        primaryTextColor: "#1f2937",
        primaryBorderColor: "#d1d5db",
        lineColor: "#9ca3af",
        secondaryColor: "#e5e7eb",
        tertiaryColor: "#f3f4f6",
        noteBkgColor: "#fff3cd",
        noteTextColor: "#856404",
        errorBkgColor: "#f8d7da",
        errorTextColor: "#721c24",
      } : {
        // 深色主题变量
        primaryColor: "#e5e7eb",
        primaryTextColor: "#f9fafb",
        primaryBorderColor: "#374151",
        lineColor: "#6b7280",
        secondaryColor: "#374151",
        tertiaryColor: "#1f2937",
        noteBkgColor: "#4a3728",
        noteTextColor: "#fcd34d",
        errorBkgColor: "#451a1a",
        errorTextColor: "#fca5a5",
      };

      mermaid.initialize({
        startOnLoad: false,
        theme: isLight ? "neutral" : "dark",
        themeVariables,
        securityLevel: "loose",
      });

      if (cancelled || !containerRef.current) return;

      const { svg } = await mermaid.render(`mermaid-${id}`, source);
      containerRef.current.innerHTML = svg;
    }

    render().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [source, id]);

  if (!source) {
    return (
      <p className="my-8 text-sm text-[var(--text-secondary)]">
        Mermaid diagram source is empty.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 flex justify-center overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 [&_svg]:max-w-full"
      aria-label="Diagram"
    />
  );
}
