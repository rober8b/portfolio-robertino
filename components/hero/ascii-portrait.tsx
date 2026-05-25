"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AsciiPortraitProps = {
  src: string;
  size: number;
  alt?: string;
  cols?: number;
  rows?: number;
  className?: string;
};

// Light → dark luminance ramp. Spaces map to highlights, @ maps to shadows.
const CHAR_RAMP = " .'\":-~+*#%@";

const DEFAULT_COLS = 56;
const DEFAULT_ROWS = 36;

export function AsciiPortrait({
  src,
  size,
  alt = "",
  cols = DEFAULT_COLS,
  rows = DEFAULT_ROWS,
  className,
}: AsciiPortraitProps) {
  const [grid, setGrid] = useState<string>(() =>
    Array.from({ length: rows }, () => " ".repeat(cols)).join("\n"),
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      try {
        await img.decode();
      } catch {
        return;
      }
      if (cancelled) return;

      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }
      const canvas = canvasRef.current;
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.clearRect(0, 0, cols, rows);
      ctx.drawImage(img, 0, 0, cols, rows);
      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, cols, rows).data;
      } catch {
        // Cross-origin taint — bail silently, keep the blank grid.
        return;
      }

      const ramp = CHAR_RAMP;
      const rampMax = ramp.length - 1;
      const lines: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3] / 255;
          // Premultiply alpha against white background.
          const rr = r * a + 255 * (1 - a);
          const gg = g * a + 255 * (1 - a);
          const bb = b * a + 255 * (1 - a);
          const lum = (0.299 * rr + 0.587 * gg + 0.114 * bb) / 255;
          // Invert so dark pixels pick higher-density chars.
          const density = 1 - lum;
          const charIdx = Math.max(0, Math.min(rampMax, Math.round(density * rampMax)));
          line += ramp[charIdx];
        }
        lines.push(line);
      }
      if (!cancelled) setGrid(lines.join("\n"));
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [src, cols, rows]);

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl bg-[var(--drench-bg-deeper)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <pre
        aria-hidden
        className="pointer-events-none m-0 select-none whitespace-pre font-mono text-[var(--drench-text)]"
        style={{
          // Letter is ~0.6:1 (w:h). Scale to fit cols within size.
          fontSize: `${size / cols / 0.6}px`,
          lineHeight: 0.92,
          letterSpacing: 0,
          fontVariantLigatures: "none",
          fontFeatureSettings: '"liga" 0, "calt" 0',
        }}
      >
        {grid}
      </pre>
    </div>
  );
}
