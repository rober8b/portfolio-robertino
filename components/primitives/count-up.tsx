"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Props = {
  to: number;
  duration?: number; // seconds
  className?: string;
  format?: (n: number) => string;
  startOnView?: boolean;
};

const DEFAULT_FORMAT = (n: number) => Math.round(n).toLocaleString("es-AR");

export function CountUp({
  to,
  duration = 1.4,
  className,
  format = DEFAULT_FORMAT,
  startOnView = true,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced || !startOnView ? to : 0);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!startOnView || !inView) return;

    const start = performance.now();
    const totalMs = duration * 1000;
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / totalMs);
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(to * eased);
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, to, duration, reduced, startOnView]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {format(value)}
    </span>
  );
}
