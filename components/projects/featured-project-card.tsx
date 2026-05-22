"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { StatusBadge } from "@/components/projects/status-badge";
import { ProjectMetaBoard } from "@/components/projects/project-meta-board";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site-data";

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { mode } = useMode();
  const inverted = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      className={cn(
        "grid items-stretch gap-6 lg:gap-10",
        "lg:grid-cols-[5fr_3fr]",
        inverted && "lg:grid-cols-[3fr_5fr]",
      )}
    >
      <div className={cn("flex flex-col justify-between", inverted && "lg:order-2")}>
        <div>
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} mode={mode} />
            <span className="font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
              {project.year} · {project.industry.split(" · ")[0]}
            </span>
          </div>

          <h3 className="mt-5 text-balance font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>

          <p className="mt-4 max-w-prose-tight text-lg text-[var(--ink-soft)]">
            {project.tagline[mode]}
          </p>

          <p className="mt-6 max-w-prose-tight text-base leading-relaxed text-[var(--ink)]">
            {project.description[mode]}
          </p>

          {project.highlights.length > 0 && mode === "dev" && (
            <ul className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
              {project.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-3 shrink-0 bg-[var(--ink-soft)] opacity-50"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FeaturedCardActions project={project} mode={mode} />
      </div>

      <ProjectMetaBoard project={project} mode={mode} />
    </motion.article>
  );
}

function FeaturedCardActions({ project, mode }: { project: Project; mode: "dev" | "client" }) {
  const links = project.links;
  const hasAny = Boolean(links.demo || links.repo || links.manifesto);
  if (!hasAny) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          {mode === "dev" ? "Live demo" : "Ver en vivo"}
          <ExternalLink
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}
      {links.manifesto && (
        <a
          href={links.manifesto}
          className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          {mode === "dev" ? "Leer manifesto" : "Conocer la idea"}
          <ArrowUpRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}
      {links.repo && (
        <a
          href={links.repo}
          target="_blank"
          rel="noreferrer"
          className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          Repo
        </a>
      )}
    </div>
  );
}
