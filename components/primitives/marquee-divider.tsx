"use client";

import { useReducedMotion } from "motion/react";

type Props = {
  items?: string[];
  speed?: number;
};

const DEFAULTS = [
  "FREELANCE",
  "BUENOS AIRES",
  "NEXT.JS",
  "TYPESCRIPT",
  "MASTRA",
  "MERCADOPAGO",
  "2026",
];

export function MarqueeDivider({ items = DEFAULTS, speed = 32 }: Props) {
  const reduced = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden border-y border-[var(--border-glass-dark)] py-3"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="flex shrink-0 gap-12 font-mono text-[0.7rem] tracking-[0.25em] text-[var(--ink-soft)] uppercase whitespace-nowrap will-change-transform"
        style={
          reduced
            ? undefined
            : {
                animation: `marquee ${speed}s linear infinite`,
              }
        }
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12">
            <span>{item}</span>
            <span className="opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
