"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { CaseCard } from "@/components/cases/case-card";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { PROJECTS } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";

const VISIBLE_COUNT = 6;

const HEADER_COPY = {
  dev: {
    eyebrow: "selected work · 2024–2026",
    title: (
      <>
        Sistemas en producción <br className="hidden sm:inline" />
        y un manifesto en construcción.
      </>
    ),
    description:
      "Ecommerce, landings premium y un SaaS agéntico. Cada proyecto con stack visible, decisiones documentadas y código accesible.",
  },
  client: {
    eyebrow: "casos · 2024–2026",
    title: (
      <>
        Sitios reales, <br className="hidden sm:inline" />
        funcionando para gente real.
      </>
    ),
    description:
      "Le armé webs y tiendas a clínicas, brokers de seguros, terapeutas, comercios. Cada uno trabaja directo conmigo, sin intermediarios.",
  },
} as const;

export function ProjectsSection() {
  const { mode } = useMode();
  const copy = HEADER_COPY[mode];
  const [expanded, setExpanded] = useState(false);

  const visible = PROJECTS.slice(0, VISIBLE_COUNT);
  const rest = PROJECTS.slice(VISIBLE_COUNT);
  const hasMore = rest.length > 0;

  return (
    <section id="projects" className="relative px-4 py-4 sm:px-6 md:py-2 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AsciiHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((project, i) => (
            <CaseCard key={project.slug} project={project} priority={i === 0} />
          ))}
          <AnimatePresence initial={false}>
            {expanded
              ? rest.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: easeOutExpo }}
                  >
                    <CaseCard project={project} />
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>

        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glass)] bg-[var(--surface-elev)] px-5 py-2.5 font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase transition-colors duration-300 hover:border-[#ff4000] hover:text-[#ff4000]"
            >
              {expanded ? "− ocultar" : `+ ver todos (${rest.length} más)`}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
