"use client";

import { cn } from "@/lib/utils";

/**
 * "rober8b" signature in figlet "Standard" style.
 * Uses ONLY plain ASCII (space, _, |, (, ), /, \, ') — these are guaranteed
 * 1ch wide in any monospace font, so the art never misaligns. Box-drawing
 * chars like ╔═╗ render with slightly different metrics in JetBrains Mono
 * and break the composition.
 */

const SIG_BIG = String.raw`                _                   ___    _
  _ __    ___  | |__    ___  _ __  ( _ )  | |__
 | '__|  / _ \ | '_ \  / _ \| '__| / _ \/\| '_ \
 | |    | (_) || |_) ||  __/| |   | (_>  <| |_) |
 |_|     \___/ |_.__/  \___||_|    \___/\/|_.__/  `;

const SIG_SMALL = String.raw`./rober8b // freelance dev // buenos aires`;

type Props = {
  variant?: "big" | "small";
  className?: string;
};

export function AsciiSignature({ variant = "big", className }: Props) {
  const art = variant === "big" ? SIG_BIG : SIG_SMALL;
  return (
    <pre
      aria-label="rober8b"
      role="img"
      className={cn(
        "pointer-events-none m-0 inline-block w-full max-w-full overflow-x-auto whitespace-pre text-current leading-[1.05] select-none",
        // Force JetBrains Mono explicitly — `font-mono` token, never `font-sans`
        "font-mono",
        variant === "big"
          ? "text-[clamp(0.55rem,1.55vw,1rem)] tracking-tight"
          : "text-[clamp(0.6rem,2vw,0.875rem)]",
        className,
      )}
      style={{
        fontVariantLigatures: "none",
        fontFeatureSettings: '"liga" 0, "calt" 0',
      }}
    >
      {art}
    </pre>
  );
}
