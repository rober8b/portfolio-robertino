"use client";

import { motion } from "motion/react";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { AsciiFrame } from "@/components/primitives/ascii-frame";
import { useMode } from "@/components/mode/mode-provider";
import { easeOutExpo } from "@/lib/motion/variants";

const HEADER = {
  dev: {
    title: "Feedback en cola.",
    description:
      "Real testimonials únicamente. Cuando termine los próximos sprints con clientes y colaboradores, los logs entran acá. Sin reseñas de relleno.",
  },
  client: {
    title: "Testimonios pendientes.",
    description:
      "Prefiero mostrarte clientes reales y feedback verificable. Estoy recolectando — los voy a publicar acá cuando estén listos.",
  },
} as const;

const QUEUE: ReadonlyArray<{ id: string; body: string }> = [
  { id: "001", body: "TODO · primer testimonio · pendiente confirmar" },
  { id: "002", body: "TODO · feedback de proyecto · pendiente" },
  { id: "003", body: "TODO · slot reservado · open" },
];

export function FeedbackLogSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section
      id="feedback"
      className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AsciiHeading
          eyebrow="feedback.log · pending"
          title={copy.title}
          description={copy.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mt-12"
        >
          <AsciiFrame label="testimonials.queue" tone="amber" innerClassName="p-5 sm:p-7">
            <ul className="grid gap-2.5 font-mono text-[0.78rem] leading-relaxed">
              {QUEUE.map((row) => (
                <li
                  key={row.id}
                  className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-3"
                >
                  <span className="text-[var(--accent)] opacity-90">&gt;</span>
                  <span className="nums-tabular text-[var(--ink-soft)] opacity-70">
                    [{row.id}]
                  </span>
                  <span className="text-[var(--ink-soft)]">{row.body}</span>
                </li>
              ))}
              <li className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-3 pt-2">
                <span className="text-[var(--ink-soft)] opacity-70">$</span>
                <span aria-hidden />
                <span
                  className="inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle"
                  aria-hidden
                />
              </li>
            </ul>
          </AsciiFrame>
        </motion.div>
      </div>
    </section>
  );
}
