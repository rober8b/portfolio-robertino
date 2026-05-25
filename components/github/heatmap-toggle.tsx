"use client";

import { useState } from "react";
import { ContributionHeatmap } from "@/components/github/contribution-heatmap";
import { ContributionHeatmapAscii } from "@/components/github/contribution-heatmap-ascii";
import { AsciiFrame } from "@/components/primitives/ascii-frame";
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
    <AsciiFrame
      label="contributions.year"
      tone="accent"
      innerClassName="p-6 sm:p-8"
      headerSlot={
        <span className="pointer-events-auto inline-flex items-center gap-2">
          <span className="opacity-90">contributions.year</span>
          <span aria-hidden className="opacity-40">·</span>
          <button
            type="button"
            onClick={() => switchTo("squares")}
            className={cn(
              "font-mono text-[0.55rem] tracking-[0.18em] uppercase transition-opacity",
              view === "squares" ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
            aria-pressed={view === "squares"}
          >
            [squares]
          </button>
          <button
            type="button"
            onClick={() => switchTo("ascii")}
            className={cn(
              "font-mono text-[0.55rem] tracking-[0.18em] uppercase transition-opacity",
              view === "ascii" ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
            aria-pressed={view === "ascii"}
          >
            [ascii]
          </button>
        </span>
      }
    >
      {view === "squares" ? (
        <ContributionHeatmap calendar={calendar} />
      ) : (
        <ContributionHeatmapAscii calendar={calendar} />
      )}
    </AsciiFrame>
  );
}
