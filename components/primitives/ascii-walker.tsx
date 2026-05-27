"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiWalkerProps {
  className?: string;
  /** ms between frames. ~180–200ms gives a paced trot. */
  intervalMs?: number;
}

const TOTAL_FRAMES = 8;

/**
 * Preloads every frame into the browser cache so the first animation cycle
 * doesn't flicker while images are still being fetched.
 */
function preloadFrames(): void {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = `/walker/frame-${i}.png`;
  }
}

export function AsciiWalker({
  className,
  intervalMs = 120, // lowered from 180ms for a more fluid, faster frame rate (~8 fps)
}: AsciiWalkerProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const preloaded = useRef(false);

  // Pre-load all frames once on mount.
  useEffect(() => {
    if (!preloaded.current) {
      preloadFrames();
      preloaded.current = true;
    }
  }, []);

  // Respect prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const durationMs = TOTAL_FRAMES * intervalMs;

  return (
    <div className={`relative h-48 w-48 sm:h-56 sm:w-56 ${className ?? ""}`}>
      <style>{`
        @keyframes walk-frame-blink {
          0% { opacity: 1; }
          12.5% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      {Array.from({ length: TOTAL_FRAMES }).map((_, idx) => {
        const frameNum = idx + 1;
        const delayMs = idx * intervalMs;
        return (
          <div
            key={frameNum}
            aria-hidden={frameNum !== 1}
            className="absolute inset-0"
            style={{
              backgroundColor: "#ff4000",
              maskImage: `url('/walker/frame-${frameNum}.png')`,
              WebkitMaskImage: `url('/walker/frame-${frameNum}.png')`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              imageRendering: "pixelated",
              opacity: reducedMotion ? (frameNum === 1 ? 1 : 0) : 0,
              animation: reducedMotion 
                ? 'none' 
                : `walk-frame-blink ${durationMs}ms step-end infinite`,
              animationDelay: reducedMotion ? '0ms' : `${delayMs}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
