"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { StatusBadge } from "@/components/projects/status-badge";
import { StackChip } from "@/components/projects/stack-chip";
import type { Project } from "@/lib/site-data";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { mode } = useMode();
  const primaryLink = project.links.demo ?? project.links.repo ?? project.links.manifesto;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group glass relative flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
    >
      <CardSpecular />

      <div className="relative flex items-center justify-between gap-3">
        <StatusBadge status={project.status} mode={mode} />
        <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
          {project.year}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-semibold text-balance">
        {project.name}
      </h3>

      <p className="relative mt-2 text-sm text-[var(--ink-soft)]">{project.tagline[mode]}</p>

      <p className="relative mt-4 text-sm leading-relaxed text-[var(--ink)]">
        {project.description[mode]}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <StackChip key={tech}>{tech.toLowerCase()}</StackChip>
        ))}
        {project.stack.length > 5 && (
          <StackChip className="opacity-60">+{project.stack.length - 5}</StackChip>
        )}
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
          {project.industry.split(" · ").slice(0, 2).join(" · ")}
        </span>
        {primaryLink && (
          <a
            href={primaryLink}
            target={primaryLink.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
            aria-label={`Abrir ${project.name}`}
          >
            {project.links.repo === primaryLink ? (
              <>
                <GithubIcon className="h-3 w-3" /> repo
              </>
            ) : (
              <>
                visitar <ArrowUpRight size={12} strokeWidth={1.75} />
              </>
            )}
          </a>
        )}
      </div>
    </motion.article>
  );
}

function CardSpecular() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 0%, var(--specular), transparent 60%)",
      }}
    />
  );
}
