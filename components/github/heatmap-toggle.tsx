"use client";

import { useState } from "react";
import { ContributionHeatmap } from "@/components/github/contribution-heatmap";
import { ContributionHeatmapAscii } from "@/components/github/contribution-heatmap-ascii";
import { cn } from "@/lib/utils";
import type { ContributionCalendar } from "@/lib/github/types";

type View = "squares" | "ascii";

const STORAGE_KEY = "rober8b.heatmap-view";

type HeatmapToggleProps = {
  calendar: ContributionCalendar;
};

export function HeatmapToggle({ calendar }: HeatmapToggleProps) {
  // Default to squares (familiar to GitHub users); persist user preference.
  const [view, setView] = useState<View>(() => {
    if (typeof window === "undefined") return "squares";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored === "ascii" ? "ascii" : "squares";
    } catch {
      return "squares";
    }
  });

  const switchTo = (next: View) => {
    setView(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage unavailable */
    }
  };

  return (
    <div
      className="overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a]"
      style={{
        ["--ink" as string]: "oklch(0.96 0.008 50)",
        ["--ink-soft" as string]: "oklch(0.72 0.012 40)",
      }}
    >
      <header className="flex items-center justify-between gap-2 border-b border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[#ff4000]">
          contributions.year
        </span>
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => switchTo("squares")}
            className={cn(
              "font-mono text-[0.55rem] tracking-[0.18em] uppercase transition-colors",
              view === "squares"
                ? "text-[#ff4000]"
                : "text-[oklch(0.72_0.012_40)] hover:text-white",
            )}
            aria-pressed={view === "squares"}
          >
            [squares]
          </button>
          <button
            type="button"
            onClick={() => switchTo("ascii")}
            className={cn(
              "font-mono text-[0.55rem] tracking-[0.18em] uppercase transition-colors",
              view === "ascii"
                ? "text-[#ff4000]"
                : "text-[oklch(0.72_0.012_40)] hover:text-white",
            )}
            aria-pressed={view === "ascii"}
          >
            [ascii]
          </button>
        </span>
      </header>
      <div className="p-6 sm:p-8">
        {view === "squares" ? (
          <ContributionHeatmap calendar={calendar} />
        ) : (
          <ContributionHeatmapAscii calendar={calendar} />
        )}
      </div>
    </div>
  );
}
