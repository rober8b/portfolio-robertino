import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Corners = "round" | "square" | "heavy" | "double";
type Tone = "ink" | "accent" | "amber";
type Style = "solid" | "dashed" | "double" | "heavy";

type AsciiFrameProps = {
  children: ReactNode;
  corners?: Corners;
  tone?: Tone;
  style?: Style;
  label?: string;
  headerSlot?: ReactNode;
  className?: string;
  innerClassName?: string;
};

const CORNER_GLYPHS: Record<Corners, [string, string, string, string]> = {
  round: ["╭", "╮", "╰", "╯"],
  square: ["┌", "┐", "└", "┘"],
  heavy: ["┏", "┓", "┗", "┛"],
  double: ["╔", "╗", "╚", "╝"],
};

const TONE_COLOR: Record<Tone, string> = {
  ink: "text-[var(--ink-soft)] opacity-50",
  accent: "text-[var(--accent)] opacity-70",
  amber: "text-[var(--amber)] opacity-80",
};

// Per-side line rendering. `solid` uses a 1px bg-current rule; the rest use
// CSS gradients so the dash/double/heavy patterns scale perfectly without
// fighting whitespace.
function lineStyle(style: Style, axis: "x" | "y"): React.CSSProperties {
  switch (style) {
    case "solid":
      return {};
    case "dashed":
      return {
        backgroundImage:
          axis === "x"
            ? "repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 10px)"
            : "repeating-linear-gradient(0deg, currentColor 0 6px, transparent 6px 10px)",
      };
    case "double":
      return {
        backgroundImage:
          axis === "x"
            ? "linear-gradient(currentColor, currentColor), linear-gradient(currentColor, currentColor)"
            : "linear-gradient(currentColor, currentColor), linear-gradient(currentColor, currentColor)",
        backgroundSize:
          axis === "x" ? "100% 1px, 100% 1px" : "1px 100%, 1px 100%",
        backgroundPosition:
          axis === "x" ? "0 0, 0 3px" : "0 0, 3px 0",
        backgroundRepeat: "no-repeat",
      };
    case "heavy":
      // 2px solid by stacking 2 gradients offset by 1px
      return {
        backgroundImage:
          "linear-gradient(currentColor, currentColor), linear-gradient(currentColor, currentColor)",
        backgroundSize:
          axis === "x" ? "100% 1px, 100% 1px" : "1px 100%, 1px 100%",
        backgroundPosition:
          axis === "x" ? "0 0, 0 1px" : "0 0, 1px 0",
        backgroundRepeat: "no-repeat",
      };
  }
}

const SIDE_THICKNESS_X = "h-px"; // height of horizontal rules (line lives in a fixed-height span)
const SIDE_THICKNESS_Y = "w-px"; // width of vertical rules
const HEAVY_PAD_X = "h-0.5";
const HEAVY_PAD_Y = "w-0.5";

export function AsciiFrame({
  children,
  corners = "round",
  tone = "ink",
  style = "solid",
  label,
  headerSlot,
  className,
  innerClassName,
}: AsciiFrameProps) {
  const [tl, tr, bl, br] = CORNER_GLYPHS[corners];
  const color = TONE_COLOR[tone];

  // Heavy needs extra vertical room so the 2px stacked rules don't clip.
  const xClass = style === "heavy" || style === "double" ? HEAVY_PAD_X : SIDE_THICKNESS_X;
  const yClass = style === "heavy" || style === "double" ? HEAVY_PAD_Y : SIDE_THICKNESS_Y;

  const solidBg = style === "solid";
  const xLineStyle = lineStyle(style, "x");
  const yLineStyle = lineStyle(style, "y");

  return (
    <div className={cn("relative", className)}>
      {/* Top border — split around optional label/headerSlot */}
      {label || headerSlot ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-3 top-0 flex items-center gap-2",
            color,
          )}
        >
          <span
            className={cn("flex-1", xClass, solidBg && "bg-current opacity-50")}
            style={solidBg ? undefined : xLineStyle}
            aria-hidden
          />
          {headerSlot ? (
            <span className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.18em] uppercase opacity-90">
              {headerSlot}
            </span>
          ) : (
            <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase opacity-90">
              {label}
            </span>
          )}
          <span
            className={cn("flex-1", xClass, solidBg && "bg-current opacity-50")}
            style={solidBg ? undefined : xLineStyle}
            aria-hidden
          />
        </div>
      ) : (
        <span
          className={cn(
            "pointer-events-none absolute inset-x-3 top-0",
            xClass,
            solidBg && "bg-current opacity-50",
            color,
          )}
          style={solidBg ? undefined : xLineStyle}
          aria-hidden
        />
      )}

      {/* Side borders */}
      <span
        className={cn(
          "pointer-events-none absolute inset-y-3 left-0",
          yClass,
          solidBg && "bg-current opacity-50",
          color,
        )}
        style={solidBg ? undefined : yLineStyle}
        aria-hidden
      />
      <span
        className={cn(
          "pointer-events-none absolute inset-y-3 right-0",
          yClass,
          solidBg && "bg-current opacity-50",
          color,
        )}
        style={solidBg ? undefined : yLineStyle}
        aria-hidden
      />

      {/* Bottom border */}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-3 bottom-0",
          xClass,
          solidBg && "bg-current opacity-50",
          color,
        )}
        style={solidBg ? undefined : xLineStyle}
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
