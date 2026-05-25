"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { revealUp, withReducedMotion } from "@/lib/motion/variants";

type AsciiHeadingProps = {
  eyebrow?: string;
  command?: string;
  title: ReactNode;
  description?: ReactNode;
  frame?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function AsciiHeading({
  eyebrow,
  command,
  title,
  description,
  frame = false,
  align = "left",
  className,
}: AsciiHeadingProps) {
  const reduced = useReducedMotion();
  const variants = withReducedMotion(reduced ?? false, revealUp());

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {command ? (
        <p className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] text-[var(--ink-soft)]">
          <span className="text-[var(--accent)] opacity-90">$</span>
          <span>{command}</span>
          <span
            aria-hidden
            className="inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle"
          />
        </p>
      ) : eyebrow ? (
        <p
          className={cn(
            "font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase",
            frame && "inline-flex items-center gap-1.5 border border-[var(--border-glass)] px-2 py-0.5",
          )}
        >
          {frame ? (
            <>
              <span aria-hidden className="opacity-60">
                [
              </span>
              <span>{eyebrow}</span>
              <span aria-hidden className="opacity-60">
                ]
              </span>
            </>
          ) : (
            eyebrow
          )}
        </p>
      ) : null}

      <h2 className="mt-5 font-display text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
