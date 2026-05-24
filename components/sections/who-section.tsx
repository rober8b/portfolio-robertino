"use client";

import { motion } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { WorkshopArtifact } from "@/components/who/workshop-artifact";
import { MANIFESTO, PRINCIPLES, WORKSHOP_ARTIFACTS } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";

const HEADER = {
  dev: {
    eyebrow: "who · rober8b",
    title: (
      <>
        Como pienso. <br className="hidden sm:inline" />
        Como construyo.
      </>
    ),
    description:
      "Lo importante no es el stack — es como decidís que decisión tomar. Esto es como pienso, donde laburo y que principios uso para no escribir software que se rompe.",
  },
  client: {
    eyebrow: "quien soy · rober8b",
    title: (
      <>
        Como trabajo. <br className="hidden sm:inline" />
        Como te respondo.
      </>
    ),
    description:
      "Vas a trabajar conmigo, directo. Esto es como armo los proyectos, como te comunico avances y que reglas sigo para que no haya sorpresas a mitad de camino.",
  },
} as const;

const TILTS = [-1.5, 1.2, -0.8];

export function WhoSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];
  const manifesto = MANIFESTO[mode];

  return (
    <section id="who" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]">
            {copy.description}
          </p>
        </motion.header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[5fr_4fr_3fr] lg:gap-12">
          {/* MANIFESTO */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="max-w-[60ch] space-y-2"
          >
            <p className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
              ./manifesto.md
            </p>
            <div className="mt-3 space-y-2 text-lg leading-snug text-[var(--ink)]">
              {manifesto.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </motion.div>

          {/* WORKSHOP ARTIFACTS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOutExpo }}
            className="space-y-5"
          >
            <p className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
              ./workshop/
            </p>
            <div className="space-y-4">
              {WORKSHOP_ARTIFACTS.map((a, i) => (
                <WorkshopArtifact key={a.title} artifact={a} tilt={TILTS[i] ?? 0} />
              ))}
            </div>
          </motion.div>

          {/* PRINCIPLES */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.16, ease: easeOutExpo }}
          >
            <p className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
              ./principles
            </p>
            <ol className="mt-3 font-mono text-[0.85rem]">
              {PRINCIPLES.map((p, i) => (
                <li key={p.id} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 py-2">
                  <span className="text-[var(--ink-soft)] opacity-70">{p.id}</span>
                  <span className="text-[var(--ink)]">{p.label}</span>
                  {i < PRINCIPLES.length - 1 ? (
                    <span aria-hidden className="divider-dots col-span-2 mt-2 text-[var(--ink-soft)] opacity-40" />
                  ) : null}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
