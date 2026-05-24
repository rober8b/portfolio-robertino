"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Trigger = "mount" | "inView" | "hover";

type ScrambleTextProps = {
  text: string;
  trigger?: Trigger;
  glyphs?: string;
  delay?: number;
  className?: string;
};

const DEFAULT_GLYPHS = "X01X01#_@?/\\-$%+*=";

export function ScrambleText({
  text,
  trigger = "mount",
  glyphs = DEFAULT_GLYPHS,
  delay = 0,
  className,
}: ScrambleTextProps) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);

  // React 19 idiom: adjust display when text prop changes, without an effect.
  const [trackedText, setTrackedText] = useState(text);
  if (trackedText !== text) {
    setTrackedText(text);
    setDisplay(text);
  }

  // Same pattern: when reduced-motion flips on, freeze on the final text.
  const [trackedReduced, setTrackedReduced] = useState(reducedMotion);
  if (trackedReduced !== reducedMotion) {
    setTrackedReduced(reducedMotion);
    if (reducedMotion) setDisplay(text);
  }

  useEffect(() => {
    if (reducedMotion) return;

    let timeoutId: number | undefined;
    let cleanup: (() => void) | undefined;

    const play = () => {
      const queue = text.split("").map(() => {
        const start = Math.floor(Math.random() * 8);
        const end = start + Math.floor(Math.random() * 12) + 8;
        return { start, end };
      });
      const glyphArr = glyphs.split("");
      const total = text.length;
      let frame = 0;

      const tick = () => {
        let complete = 0;
        const result = text.split("").map((char, index) => {
          if (frame >= queue[index].end) {
            complete++;
            return char;
          }
          if (frame >= queue[index].start) {
            return glyphArr[Math.floor(Math.random() * glyphArr.length)];
          }
          return text[index];
        });
        setDisplay(result.join(""));
        frame++;
        if (complete < total) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const cancel = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    if (trigger === "mount") {
      timeoutId = window.setTimeout(play, delay);
    } else if (trigger === "hover" && hovered) {
      timeoutId = window.setTimeout(play, delay);
    } else if (trigger === "inView") {
      const node = ref.current;
      if (node) {
        const obs = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                timeoutId = window.setTimeout(play, delay);
                obs.disconnect();
                break;
              }
            }
          },
          { threshold: 0.5 },
        );
        obs.observe(node);
        cleanup = () => obs.disconnect();
      }
    }

    return () => {
      cancel();
      if (timeoutId) window.clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [trigger, text, glyphs, delay, hovered, reducedMotion]);

  const handlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => {
            setHovered(false);
            setDisplay(text);
          },
        }
      : {};

  return (
    <span ref={ref} className={cn("inline-block", className)} {...handlers}>
      {display}
    </span>
  );
}
