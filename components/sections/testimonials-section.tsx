"use client";

import { motion } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { AsciiAvatar } from "@/components/testimonials/ascii-avatar";
import { easeOutExpo } from "@/lib/motion/variants";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Necesitaba un sistema de turnos que no fuera un quilombo. Rober me lo armó en dos semanas, lo cargué con mi calendario y ahora las pacientes reservan solas por WhatsApp. Cero llamadas perdidas.",
    name: "Carolina",
    role: "Odontóloga",
  },
  {
    quote:
      "Lo recomendé a tres clientes míos. Los tres me agradecieron después. Rober no te vende humo, te entrega lo que necesitás y desaparece hasta la próxima.",
    name: "Francisco",
    role: "Marketing Specialist",
  },
  {
    quote:
      "Tenía una tienda online que cargaba en 8 segundos. Rober la migró a Next.js y ahora carga en 1. Las ventas subieron porque la gente no se va antes de comprar.",
    name: "Lucas",
    role: "Dueño de PyME",
  },
  {
    quote:
      "Buscaba renovar el sitio del estudio sin que parezca de banco. Quedó moderno, serio, y se carga al toque. Lo manejo yo desde un panel sin tocar código.",
    name: "Martín",
    role: "Abogado",
  },
];

const HEADER = {
  dev: {
    eyebrow: "feedback.real · n=4",
    title: (
      <>
        Lo que dicen <br className="hidden sm:inline" />
        los que ya laburaron conmigo.
      </>
    ),
    description:
      "Testimonios reales de clientes con quienes trabajé directo. Sin agencia, sin filtros, sin guion.",
  },
  client: {
    eyebrow: "testimonios · reales",
    title: (
      <>
        Lo que dicen <br className="hidden sm:inline" />
        los que ya laburaron conmigo.
      </>
    ),
    description:
      "Personas que me contrataron para resolver un problema concreto y se lo entregué. Trato directo, sin intermediarios.",
  },
} as const;

export function TestimonialsSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section
      id="feedback"
      className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AsciiHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid gap-5 sm:gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: easeOutExpo }}
              className="relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-6 sm:p-7"
            >
              <header className="flex items-center gap-4">
                <AsciiAvatar seed={t.name} size={56} />
                <div className="flex min-w-0 flex-col">
                  <span className="font-display text-base font-semibold text-white">
                    {t.name}
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                    {t.role}
                  </span>
                </div>
              </header>

              <blockquote className="relative text-[0.95rem] italic leading-relaxed text-[oklch(0.92_0.01_50)]">
                <span aria-hidden className="absolute -left-1 -top-1 font-mono text-2xl not-italic leading-none text-[#ff4000] opacity-70">
                  "
                </span>
                <span className="block pl-5">{t.quote}</span>
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
