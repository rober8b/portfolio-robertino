import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "ok" | "muted" | "warn" | "accent";

type RuntimeBadgeProps = {
  label: ReactNode;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
};

const TONE_DOT: Record<Tone, string> = {
  ok: "bg-[var(--amber)]",
  muted: "bg-[var(--ink-soft)] opacity-70",
  warn: "bg-[var(--accent)]",
  accent: "bg-[var(--accent)]",
};

const TONE_TEXT: Record<Tone, string> = {
  ok: "text-[var(--ink)]",
  muted: "text-[var(--ink-soft)]",
  warn: "text-[var(--accent)]",
  accent: "text-[var(--accent)]",
};

export function RuntimeBadge({
  label,
  tone = "ok",
  pulse = false,
  className,
}: RuntimeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 border border-[var(--border-glass)] bg-[var(--surface-glass)] px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.18em] uppercase backdrop-blur",
        TONE_TEXT[tone],
        className,
      )}
      style={{ borderRadius: "2px" }}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-1.5 w-1.5",
          TONE_DOT[tone],
          pulse && "animate-pulse",
        )}
        style={{ borderRadius: "1px" }}
      />
      <span>{label}</span>
    </span>
  );
}
