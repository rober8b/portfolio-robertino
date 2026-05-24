import type { ReactNode } from "react";

type BuildNoteTileProps = {
  label?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Small framed mono tile that holds a tactile build-fact like
 * "Built in 3 weeks" or "Custom CMS · Resend · ISR".
 * Designed to overlap case scene compositions at the corner.
 */
export function BuildNoteTile({ label = "build.note", children, className }: BuildNoteTileProps) {
  return (
    <div
      className={`glass relative overflow-hidden rounded-md border border-[var(--border-glass)] px-3 py-2 backdrop-blur ${className ?? ""}`}
    >
      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
        {label}
      </p>
      <p className="mt-1 font-mono text-[0.75rem] leading-snug text-[var(--ink)]">{children}</p>
    </div>
  );
}
