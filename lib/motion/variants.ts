import type { Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

type RevealOptions = {
  duration?: number;
  delay?: number;
  distance?: number;
};

export function revealUp({ duration = 0.6, delay = 0, distance = 24 }: RevealOptions = {}): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: easeOutExpo },
    },
  };
}

export function revealLeft({ duration = 0.6, delay = 0, distance = 16 }: RevealOptions = {}): Variants {
  return {
    hidden: { opacity: 0, x: -distance },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration, delay, ease: easeOutExpo },
    },
  };
}

export function revealScaleIn({ duration = 0.5, delay = 0 }: Omit<RevealOptions, "distance"> = {}): Variants {
  return {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: easeOutExpo },
    },
  };
}

/** Parent variant that staggers children like terminal output. Pair with revealUp on each child. */
export function terminalLineByLine({
  staggerChildren = 0.06,
  delayChildren = 0.1,
}: { staggerChildren?: number; delayChildren?: number } = {}): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/**
 * Cinematic depth: subtle 3D translate intended for hover scenes on case cards.
 * Apply on the inner layered elements while the outer container handles the rotateX/Y.
 * Layer index drives Z-translation so foreground elements move more than background ones.
 */
export function cinematicDepth({
  layer = 0,
  duration = 0.45,
}: { layer?: number; duration?: number } = {}): Variants {
  const z = layer * 12;
  return {
    rest: { z: 0, transition: { duration, ease: easeOutExpo } },
    hover: { z, transition: { duration, ease: easeOutExpo } },
  };
}

/**
 * Reduced-motion safe wrapper. When `reduced` is true (from useReducedMotion()),
 * collapses any reveal variant to an instant fade — no translate, no scale.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   const variants = withReducedMotion(reduced, revealUp());
 */
export function withReducedMotion(reduced: boolean | null, variants: Variants): Variants {
  if (!reduced) return variants;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "linear" } },
  };
}
