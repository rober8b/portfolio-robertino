"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { StatusBadge } from "@/components/projects/status-badge";
import { StackChip } from "@/components/projects/stack-chip";
import { ProjectMockup } from "@/components/projects/project-mockup";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      className={cn(
        "grid items-center gap-8 lg:gap-12",
        "lg:grid-cols-[1.15fr_1fr]",
        inverted && "lg:grid-cols-[1fr_1.15fr]",
      )}
    >
      {/* IMAGE / MOCKUP COLUMN */}
      <div className={cn("relative group/mockup overflow-hidden rounded-3xl", inverted ? "lg:order-2" : "lg:order-1")}>
        <ProjectMockup project={project} />
      </div>

      {/* INFO COLUMN */}
      <div className={cn("flex flex-col justify-between gap-6", inverted ? "lg:order-1" : "lg:order-2")}>
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="nums-tabular font-mono text-[0.65rem] tracking-[0.12em] text-[var(--accent)] uppercase"
            >
              {String(index + 1).padStart(2, "0")} ·
            </span>
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

          {/* Compact Metadata Board */}
          <div className="mt-6 border-t border-[var(--border-glass-dark)] pt-6">
            <ProjectMetaBoardCompact project={project} mode={mode} />
          </div>

          {/* Staggered Tech Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
            className="mt-6 flex flex-wrap gap-1.5"
          >
            {project.stack.slice(0, 8).map((tech) => (
              <motion.div
                key={tech}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
              >
                <StackChip size="sm">{tech.toLowerCase()}</StackChip>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <FeaturedCardActions project={project} mode={mode} />
      </div>
    </motion.article>
  );
}

function ProjectMetaBoardCompact({ project, mode }: { project: Project; mode: "dev" | "client" }) {
  const items = [
    { label: "Status", value: project.statusLabel[mode] },
    { label: "Year", value: project.year },
    { label: "Industry", value: project.industry.split(" · ").slice(0, 2).join(" · ") },
  ];
  if (project.client) {
    items.push({ label: "Client", value: project.client });
  }

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-[0.65rem] tracking-[0.06em] uppercase">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="text-[var(--ink-soft)] opacity-60">{item.label}</span>
          <span className="font-semibold text-[var(--ink)]">{item.value}</span>
        </div>
      ))}
    </div>
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
