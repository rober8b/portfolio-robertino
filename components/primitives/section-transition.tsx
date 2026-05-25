"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionTransitionProps = {
  command: string;
  divider?: "dots" | "dashes" | "none";
  charDelay?: number;
  className?: string;
};

const DEFAULT_CHAR_DELAY_MS = 28;

export function SectionTransition({
  command,
  divider = "dots",
  charDelay = DEFAULT_CHAR_DELAY_MS,
  className,
}: SectionTransitionProps) {
  const reducedMotion = useReducedMotion();
  // SSR + initial paint show the full command. The client-side effect decides
  // whether to replay it character-by-character (only for elements that enter
  // the viewport from off-screen).
  const [typed, setTyped] = useState<string>(command);
  const [done, setDone] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    let timeoutId: number | undefined;
    let cleanup: (() => void) | undefined;

    // Defer one tick so SSR paint commits before we touch state.
    const setup = window.setTimeout(() => {
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        // Element is already on screen at hydration — leave the full text in
        // place; no jarring re-type on arrival.
        return;
      }

      // Element is below the fold. Reset to empty and set up an IO trigger
      // that types the command out when the user scrolls past it.
      setTyped("");
      setDone(false);

      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            obs.disconnect();
            let i = 0;
            const tick = () => {
              i++;
              if (i >= command.length) {
                setTyped(command);
                setDone(true);
                return;
              }
              setTyped(command.slice(0, i));
              timeoutId = window.setTimeout(tick, charDelay);
            };
            timeoutId = window.setTimeout(tick, charDelay);
            break;
          }
        },
        { threshold: 0.4 },
      );
      obs.observe(node);
      cleanup = () => obs.disconnect();
    }, 0);

    return () => {
      window.clearTimeout(setup);
      if (timeoutId) window.clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [command, charDelay, reducedMotion]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
        <span className="text-[var(--accent)] opacity-90">&gt;</span>
        <span
          className="inline-block h-1.5 w-1.5 animate-pulse bg-[var(--amber)]"
          style={{ borderRadius: "1px" }}
        />
        <span className="truncate" aria-label={command}>
          {typed}
        </span>
        <span
          className={cn(
            "ml-1 inline-block h-3 w-1.5 align-middle bg-[var(--accent)]",
            done ? "animate-pulse" : "opacity-90",
          )}
        />
      </p>
      {divider !== "none" ? (
        <div
          className={cn(
            "mt-4 text-[var(--ink-soft)] opacity-40",
            divider === "dots" && "divider-dots",
          )}
          style={
            divider === "dashes"
              ? {
                  height: "1px",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 12px)",
                }
              : undefined
          }
        />
      ) : null}
    </div>
  );
}
