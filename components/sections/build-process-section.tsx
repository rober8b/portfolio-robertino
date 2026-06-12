"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Compass, Network, Repeat, Rocket, Gauge } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { easeOutExpo } from "@/lib/motion/variants";

type Step = {
  id: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const STEPS: Record<"dev" | "client", Step[]> = {
  dev: [
    {
      id: "01",
      title: "strategy",
      body: "Audit del problema real (no el síntoma). Mapeamos stakeholders, definimos el caso de uso, identificamos la deuda existente.",
      Icon: Compass,
    },
    {
      id: "02",
      title: "architecture",
      body: "Stack según restricciones reales, no hype. Data model documentado. Decisiones que sobreviven al equipo.",
      Icon: Network,
    },
    {
      id: "03",
      title: "rapid iteration",
      body: "Sprints semanales, demos cortas, ajustes con feedback real. Cliente con acceso al deploy desde el día uno.",
      Icon: Repeat,
    },
    {
      id: "04",
      title: "deploy",
      body: "Vercel + CI/CD + rollback plan. Sin downtime para el cliente final. Migraciones DNS sin drama.",
      Icon: Rocket,
    },
    {
      id: "05",
      title: "optimize",
      body: "Core Web Vitals, server timing, SEO técnico, A11y revisado. Cleanup de deuda pre-prod.",
      Icon: Gauge,
    },
  ],
  client: [
    {
      id: "01",
      title: "estrategia",
      body: "Entendemos qué necesitás. Mapeamos el problema real, no el síntoma. Definimos qué hace el sitio.",
      Icon: Compass,
    },
    {
      id: "02",
      title: "arquitectura",
      body: "Definimos qué construir, y qué NO. Stack según tu caso, no según la tendencia del mes.",
      Icon: Network,
    },
    {
      id: "03",
      title: "iteración rápida",
      body: "Te muestro avances cada semana. Cambios sin sorpresas, sin facturas extra a fin de mes.",
      Icon: Repeat,
    },
    {
      id: "04",
      title: "deploy",
      body: "Subimos a producción. Te dejo todo configurado: dominio, formularios, analítica y backups.",
      Icon: Rocket,
    },
    {
      id: "05",
      title: "optimización",
      body: "Velocidad, SEO, accesibilidad. Que rinda en buscadores y en celulares (donde está tu cliente).",
      Icon: Gauge,
    },
  ],
};

const HEADER = {
  dev: {
    eyebrow: "build.process · how",
    title: (
      <>
        Cinco pasos. <br className="hidden sm:inline" />
        Sin magia.
      </>
    ),
    description:
      "Así es como pasa una idea de tu cabeza a producción. Cada fase es chequeable; cada decisión queda escrita.",
  },
  client: {
    eyebrow: "proceso · paso a paso",
    title: (
      <>
        Cinco pasos. <br className="hidden sm:inline" />
        Cero misterio.
      </>
    ),
    description:
      "Así trabajamos desde la primera charla hasta que tu sitio está en producción y posicionado.",
  },
} as const;

export function BuildProcessSection() {
  const { mode } = useMode();
  const reduced = useReducedMotion();
  const copy = HEADER[mode];
  const steps = STEPS[mode];

  return (
    <section id="process" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: easeOutExpo }}
        className="mx-auto max-w-6xl"
      >
        <AsciiHeading
          command="build.process"
          title={copy.title}
          description={copy.description}
        />

        {/* Rail — fills accent on first scroll-in */}
        <div className="relative mt-16">
          <div className="absolute inset-x-0 top-[1.4rem] hidden h-px bg-[var(--border-glass)] lg:block" />
          <motion.div
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: easeOutExpo }}
            className="absolute inset-x-0 top-[1.4rem] hidden h-px origin-left bg-[var(--accent)] lg:block"
          />

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: easeOutExpo }}
                className="relative"
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-glass)] bg-[var(--surface)]">
                  <step.Icon className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <p className="mt-4 nums-tabular inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
                  <span aria-hidden className="opacity-60">[</span>
                  <span className="text-[var(--accent)]">{step.id}</span>
                  <span aria-hidden className="opacity-60">]</span>
                  <span>{step.title}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
