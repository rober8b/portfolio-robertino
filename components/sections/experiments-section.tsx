"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { HermesAgent } from "@/components/experiments/hermes-agent";
import { SecondBrainGraph } from "@/components/experiments/second-brain-graph";
import { TerminalToy } from "@/components/experiments/terminal-toy";
import { Scanlines } from "@/components/ambient/scanlines";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { EXPERIMENTS } from "@/lib/experiments/data";
import { easeOutExpo } from "@/lib/motion/variants";

const HEADER = {
  dev: {
    eyebrow: "experiments · playground",
    title: (
      <>
        Cosas raras que <br className="hidden sm:inline" />
        funcionan.
      </>
    ),
    description:
      "Toys de canvas, filtros SVG, prompts interactivos. No son demos — son código que corre en el navegador, ahora mismo.",
  },
  client: {
    eyebrow: "lab · juguetes",
    title: (
      <>
        Pequeñas cosas <br className="hidden sm:inline" />
        que me divierten.
      </>
    ),
    description:
      "No son productos. Son experimentos sueltos que uso para probar ideas — y que me recuerdan por qué empecé a programar.",
  },
} as const;

export function ExperimentsSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section id="lab" className="relative px-4 py-4 sm:px-6 md:py-2 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AsciiHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {EXPERIMENTS.map((exp, i) => (
            <motion.article
              key={exp.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: easeOutExpo }}
              className="glass-strong relative flex flex-col overflow-hidden rounded-lg border border-[var(--border-glass)]"
            >
              <header className="flex items-center justify-between gap-2 border-b border-[var(--border-glass)] bg-[var(--surface-elevated)] px-4 py-2.5">
                <p className="font-mono text-[0.7rem] text-[var(--ink)]">
                  <span className="text-[var(--accent)]">$ </span>
                  {exp.title}
                </p>
                <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
                  {exp.version} · {exp.date}
                </p>
              </header>

              <div className="relative">
                {exp.slug === "terminal-toy" ? <TerminalToy height={240} /> : null}
                {exp.slug === "hermes-agent" ? <HermesAgent height={240} /> : null}
                {exp.slug === "second-brain-graph" ? <SecondBrainGraph height={240} /> : null}
                <Scanlines opacity={0.05} blend="overlay" />
              </div>

              <footer className="flex items-center justify-between gap-2 border-t border-[var(--border-glass)] px-4 py-3">
                <p className="line-clamp-2 text-[0.75rem] text-[var(--ink-soft)]">{exp.blurb}</p>
                <Link
                  href={`/lab/${exp.slug}`}
                  className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.65rem] text-[var(--ink)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
                  aria-label={`Abrir ${exp.title} a pantalla completa`}
                >
                  open full
                  <ArrowUpRight size={11} strokeWidth={1.75} />
                </Link>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
