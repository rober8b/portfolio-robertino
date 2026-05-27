"use client";

import { motion } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { WorkshopArtifact } from "@/components/who/workshop-artifact";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { AsciiFrame } from "@/components/primitives/ascii-frame";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";
import { MANIFESTO, PRINCIPLES, WORKSHOP_ARTIFACTS } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";
import { AsciiWalker } from "@/components/primitives/ascii-walker";

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
    <section id="who" className="relative px-4 py-4 sm:px-6 md:py-2 lg:px-8">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: easeOutExpo }}
        className="mx-auto max-w-6xl"
      >
        <AsciiHeading
          eyebrow={copy.eyebrow}
          frame
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[5fr_4fr_3fr] lg:gap-12">
          {/* MANIFESTO */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="max-w-[60ch] space-y-2"
          >
            <RuntimeBadge label="./manifesto.md" tone="muted" />
            <div className="mt-3 space-y-2 text-lg leading-snug text-[var(--ink)]">
              {manifesto.map((line, index) => (
                <div key={line} className="space-y-2">
                  <p>{line}</p>
                  {index === 5 && (
                    <div className="flex justify-center pb-2 pt-12 sm:justify-start sm:pl-2">
                      <AsciiWalker />
                    </div>
                  )}
                </div>
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
            <RuntimeBadge label="./workshop/" tone="muted" />
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
            <RuntimeBadge label="./principles" tone="muted" />
            <AsciiFrame label="principles" tone="ink" className="mt-3" innerClassName="p-4 sm:p-5">
              <ol className="font-mono text-[0.85rem]">
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
            </AsciiFrame>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
