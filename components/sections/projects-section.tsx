"use client";

import { motion } from "motion/react";
import { useMode } from "@/components/mode/mode-provider";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { ProjectCard } from "@/components/projects/project-card";
import { PROJECTS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="mt-20 space-y-24 md:space-y-32">
          {featured.map((project, index) => (
            <FeaturedProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-24 pt-4">
            <div
              aria-hidden
              className="divider-dots mb-16 text-[var(--ink-soft)] opacity-60"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 flex items-end justify-between gap-6"
            >
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                {mode === "dev" ? "More builds" : "Otros trabajos"}
              </h3>
              <p className="nums-tabular font-mono text-xs tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
                {others.length.toString().padStart(2, "0")} · piezas
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
              {others.map((project, index) => (
                <div
                  key={project.slug}
                  className={cn(
                    "lg:col-span-6",
                    // Bento rhythm: pair 1 = 7/5, pair 2 = 5/7
                    index === 0 && "lg:col-span-7",
                    index === 1 && "lg:col-span-5",
                    index === 2 && "lg:col-span-5",
                    index === 3 && "lg:col-span-7",
                  )}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
