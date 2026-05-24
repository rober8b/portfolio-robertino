import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Corners = "round" | "square";
type Tone = "ink" | "accent" | "amber";

type AsciiFrameProps = {
  children: ReactNode;
  corners?: Corners;
  tone?: Tone;
  label?: string;
  className?: string;
  innerClassName?: string;
};

const CORNER_GLYPHS: Record<Corners, [string, string, string, string]> = {
  round: ["╭", "╮", "╰", "╯"], // ╭ ╮ ╰ ╯
  square: ["┌", "┐", "└", "┘"], // ┌ ┐ └ ┘
};

const TONE_COLOR: Record<Tone, string> = {
  ink: "text-[var(--ink-soft)] opacity-50",
  accent: "text-[var(--accent)] opacity-70",
  amber: "text-[var(--amber)] opacity-80",
};

export function AsciiFrame({
  children,
  corners = "round",
  tone = "ink",
  label,
  className,
  innerClassName,
}: AsciiFrameProps) {
  const [tl, tr, bl, br] = CORNER_GLYPHS[corners];
  const color = TONE_COLOR[tone];

  return (
    <div className={cn("relative", className)}>
      {/* Top border — split around optional label */}
      {label ? (
        <div className={cn("pointer-events-none absolute inset-x-3 top-0 flex items-center gap-2", color)}>
          <span className="h-px flex-1 bg-current opacity-50" aria-hidden />
          <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase opacity-90">
            {label}
          </span>
          <span className="h-px flex-1 bg-current opacity-50" aria-hidden />
        </div>
      ) : (
        <span
          className={cn("pointer-events-none absolute inset-x-3 top-0 h-px bg-current opacity-50", color)}
          aria-hidden
        />
      )}

      {/* Side borders */}
      <span
        className={cn("pointer-events-none absolute inset-y-3 left-0 w-px bg-current opacity-50", color)}
        aria-hidden
      />
      <span
        className={cn("pointer-events-none absolute inset-y-3 right-0 w-px bg-current opacity-50", color)}
        aria-hidden
      />

      {/* Bottom border */}
      <span
        className={cn("pointer-events-none absolute inset-x-3 bottom-0 h-px bg-current opacity-50", color)}
        aria-hidden
      />

      {/* Corner glyphs */}
      <span className={cn("pointer-events-none absolute -top-2 -left-1 font-mono text-base leading-none", color)} aria-hidden>
        {tl}
      </span>
      <span className={cn("pointer-events-none absolute -top-2 -right-1 font-mono text-base leading-none", color)} aria-hidden>
        {tr}
      </span>
      <span className={cn("pointer-events-none absolute -bottom-2 -left-1 font-mono text-base leading-none", color)} aria-hidden>
        {bl}
      </span>
      <span className={cn("pointer-events-none absolute -bottom-2 -right-1 font-mono text-base leading-none", color)} aria-hidden>
        {br}
      </span>

      <div className={cn("p-5 sm:p-6", innerClassName)}>{children}</div>
    </div>
  );
}
