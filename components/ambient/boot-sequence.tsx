"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const BOOT_LINES: ReadonlyArray<{ prompt: string; body: string; tone?: "ok" | "muted" }> = [
  { prompt: ">", body: "booting rober8b.runtime" },
  { prompt: ">", body: "loading systems..." },
  { prompt: ">", body: "mounting /portfolio" },
  { prompt: ">", body: "experiments online" },
  { prompt: ">", body: "github activity synced" },
  { prompt: ">", body: "runtime stable · ready", tone: "ok" },
];

const STORAGE_KEY = "rober8b.booted";
const LINE_STAGGER_MS = 120;
const HOLD_AFTER_MS = 200;
const FADE_MS = 280;
const REDUCED_HOLD_MS = 400;

type Phase = "idle" | "playing" | "fading" | "done";

type BootSequenceProps = {
  className?: string;
};

export function BootSequence({ className }: BootSequenceProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealedCount, setRevealedCount] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    let skip: (() => void) | undefined;

    const start = window.setTimeout(() => {
      let alreadyBooted = false;
      try {
        alreadyBooted = window.sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        alreadyBooted = false;
      }
      if (alreadyBooted) {
        setPhase("done");
        return;
      }

      setPhase("playing");

      const schedule = (fn: () => void, delay: number) => {
        const id = window.setTimeout(fn, delay);
        timeouts.current.push(id);
      };

      const clearAll = () => {
        for (const id of timeouts.current) window.clearTimeout(id);
        timeouts.current = [];
      };

      const finish = () => {
        clearAll();
        setPhase("fading");
        window.setTimeout(() => {
          setPhase("done");
          try {
            window.sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* sessionStorage unavailable */
          }
        }, FADE_MS);
      };

      if (reducedMotion) {
        setRevealedCount(BOOT_LINES.length);
        schedule(finish, REDUCED_HOLD_MS);
      } else {
        BOOT_LINES.forEach((_, index) => {
          schedule(() => setRevealedCount(index + 1), index * LINE_STAGGER_MS);
        });
        schedule(finish, BOOT_LINES.length * LINE_STAGGER_MS + HOLD_AFTER_MS);
      }

      skip = () => finish();
      window.addEventListener("click", skip, { once: true });
      window.addEventListener("keydown", skip, { once: true });
    }, 0);

    return () => {
      window.clearTimeout(start);
      for (const id of timeouts.current) window.clearTimeout(id);
      timeouts.current = [];
      if (skip) {
        window.removeEventListener("click", skip);
        window.removeEventListener("keydown", skip);
      }
    };
  }, [reducedMotion]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-20 flex items-end overflow-hidden bg-[var(--drench-bg)]/85 backdrop-blur-sm transition-opacity",
        phase === "fading" ? "opacity-0" : "opacity-100",
        className,
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <ul className="grid w-full gap-1.5 p-6 font-mono text-[0.72rem] leading-relaxed sm:p-7">
        {BOOT_LINES.slice(0, revealedCount).map((line, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-2"
            style={{
              animation: reducedMotion
                ? undefined
                : "reveal-up 0.32s var(--ease-out-expo) both",
            }}
          >
            <span className="text-[var(--drench-text-soft)] opacity-70">
              {line.prompt}
            </span>
            <span
              className={cn(
                "text-[var(--drench-text)]",
                line.tone === "ok" && "text-[var(--amber)]",
              )}
            >
              {line.body}
            </span>
          </li>
        ))}
        {revealedCount < BOOT_LINES.length ? (
          <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
            <span className="text-[var(--drench-text-soft)] opacity-70">$</span>
            <span
              className="inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle"
              aria-hidden
            />
          </li>
        ) : null}
      </ul>
    </div>
  );
}
