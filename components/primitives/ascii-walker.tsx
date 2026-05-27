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
  const [currentFrame, setCurrentFrame] = useState(1);
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

  // Cycle through frames.
  useEffect(() => {
    if (reducedMotion) {
      setCurrentFrame(1);
      return;
    }

    const id = window.setInterval(() => {
      setCurrentFrame((f) => (f === TOTAL_FRAMES ? 1 : f + 1));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [reducedMotion, intervalMs]);

  return (
    <div className={`relative h-48 w-48 sm:h-56 sm:w-56 ${className ?? ""}`}>
      {Array.from({ length: TOTAL_FRAMES }).map((_, idx) => {
        const frameNum = idx + 1;
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
              visibility: frameNum === currentFrame ? "visible" : "hidden",
            }}
          />
        );
      })}
    </div>
  );
}
