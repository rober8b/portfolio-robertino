"use client";

import { motion, type Variants } from "motion/react";
import { GithubIcon } from "@/components/icons/brand-icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function GithubSectionHeader() {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="max-w-3xl"
    >
      <motion.p
        variants={itemVariants}
        className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase"
      >
        <GithubIcon className="h-3 w-3" /> github · @rober8b · live
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl"
      >
        Lo que vengo construyendo
        <br className="hidden sm:inline" />
        <span className="text-[var(--ink-soft)]"> en código abierto.</span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]"
      >
        Actividad real de GitHub, traída directo de la API. Cacheada por hora. Sin maquillaje: si
        hay una semana muerta, se ve.
      </motion.p>
    </motion.header>
  );
}
