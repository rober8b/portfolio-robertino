"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01<>{}[]()/\\|+-=*#@$%&?!:;.,_";
const FONT_SIZE = 14;
const COL_WIDTH = 10;
const FPS = 30;

type AsciiRainProps = {
  className?: string;
  height?: number;
};

export function AsciiRain({ className, height = 200 }: AsciiRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.font = `${FONT_SIZE}px JetBrains Mono, ui-monospace, monospace`;
    ctx.textBaseline = "top";

    const cols = Math.floor(rect.width / COL_WIDTH);
    const drops: number[] = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * (rect.height / FONT_SIZE))
    );

    const draw = () => {
      // semi-transparent black wash for trail
      ctx.fillStyle = "oklch(0.11 0.014 35 / 0.12)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "oklch(0.74 0.25 33)"; // accent persimmon
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(ch, i * COL_WIDTH, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > rect.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // initial static frame
    ctx.fillStyle = "oklch(0.11 0.014 35)";
    ctx.fillRect(0, 0, rect.width, rect.height);
    draw();

    if (reducedMotion) return;

    const frameInterval = 1000 / FPS;
    let last = performance.now();
    const loop = (now: number) => {
      if (!runningRef.current) {
        rafRef.current = null;
        return;
      }
      if (now - last >= frameInterval) {
        draw();
        last = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!runningRef.current) {
            runningRef.current = true;
            last = performance.now();
            rafRef.current = requestAnimationFrame(loop);
          }
        } else {
          runningRef.current = false;
        }
      },
      { threshold: 0.1 }
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      runningRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full ${className ?? ""}`}
      style={{ height, background: "oklch(0.11 0.014 35)" }}
      aria-label="ascii rain animation"
      role="img"
    />
  );
}
