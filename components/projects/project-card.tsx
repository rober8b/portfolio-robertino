"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Disc, Calendar, Rocket, Pizza, Database, Cpu } from "lucide-react";
import Image from "next/image";
import { useMode } from "@/components/mode/mode-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { StatusBadge } from "@/components/projects/status-badge";
import { StackChip } from "@/components/projects/stack-chip";
import type { Project } from "@/lib/site-data";

function TechStackIconMini({ slug }: { slug: string }) {
  if (slug === "ruedalista") {
    return <Database size={18} className="text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" />;
  }
  return <Cpu size={18} className="text-zinc-400" />;
}

// Custom theme maps for Otros Trabajos cards
const CARD_THEMES: Record<string, { borderClass: string; glow: string; Icon: React.ComponentType<any> }> = {
  ruedalista: {
    borderClass: "group-hover:border-[oklch(0.78_0.16_70/0.4)] group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)]",
    glow: "radial-gradient(circle at 85% 85%, oklch(0.78_0.16_70/0.06) 0%, transparent 60%)",
    Icon: Disc,
  },
  "dental-app": {
    borderClass: "group-hover:border-[oklch(0.7_0.12_200/0.4)] group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.06)]",
    glow: "radial-gradient(circle at 85% 85%, oklch(0.7_0.12_200/0.06) 0%, transparent 60%)",
    Icon: Calendar,
  },
  "pizza-block": {
    borderClass: "group-hover:border-[oklch(0.65_0.22_35/0.4)] group-hover:shadow-[0_20px_40px_rgba(239,68,68,0.06)]",
    glow: "radial-gradient(circle at 85% 85%, oklch(0.65_0.22_35/0.06) 0%, transparent 60%)",
    Icon: Pizza,
  },
  xplora: {
    borderClass: "group-hover:border-[oklch(0.62_0.18_290/0.4)] group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.06)]",
    glow: "radial-gradient(circle at 85% 85%, oklch(0.62_0.18_290/0.06) 0%, transparent 60%)",
    Icon: Rocket,
  },
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { mode } = useMode();
  const primaryLink = project.links.demo ?? project.links.repo ?? project.links.manifesto;

  const theme = CARD_THEMES[project.slug] || {
    borderClass: "group-hover:border-[var(--ink-soft)]",
    glow: "radial-gradient(circle at 85% 85%, var(--highlight-cool) 0%, transparent 60%)",
    Icon: Rocket,
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="grow"
      className={`group glass relative flex h-full flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] ${theme.borderClass}`}
    >
      {/* Pixel-corner accent — appears on hover */}
      <div
        aria-hidden
        className="pixel-frame pointer-events-none absolute inset-0 rounded-3xl text-[var(--accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Specular Edge Highlighting */}
      <CardSpecular />

      {/* Custom Themed Glow Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: theme.glow }}
      />

      {/* Large Floating Decorative Stack Icon */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-4 text-[var(--ink-soft)] opacity-[0.03] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-[0.07]"
      >
        <theme.Icon size={130} strokeWidth={1} />
      </div>

      <div className="relative flex items-center justify-between gap-3 z-10">
        <StatusBadge status={project.status} mode={mode} />
        <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
          {project.year}
        </span>
      </div>

      {/* Visual Header (Screenshot or Placeholder) */}
      <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-glass-dark)] bg-black/10 z-10 group-hover:border-[var(--border-glass)] transition-colors duration-500">
        {project.image ? (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={project.image}
              alt={`Captura de ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Specular overlay reflection */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-50" />
          </div>
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-black/30 backdrop-blur-md p-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 mb-2">
              <TechStackIconMini slug={project.slug} />
            </div>
            <span className="font-mono text-[0.5rem] tracking-wider text-[var(--ink-soft)] uppercase px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
              En Carga
            </span>
          </div>
        )}
      </div>

      <h3 className="relative mt-4 font-display text-2xl font-semibold text-balance z-10">
        {project.name}
      </h3>

      <p className="relative mt-2 text-sm text-[var(--ink-soft)] z-10">{project.tagline[mode]}</p>

      <p className="relative mt-4 text-sm leading-relaxed text-[var(--ink)] z-10">
        {project.description[mode]}
      </p>

      {/* Staggered Tech Tags in secondary card */}
      <div className="relative mt-5 flex flex-wrap gap-1.5 z-10">
        {project.stack.slice(0, 5).map((tech) => (
          <StackChip key={tech}>{tech.toLowerCase()}</StackChip>
        ))}
        {project.stack.length > 5 && (
          <StackChip className="opacity-60">+{project.stack.length - 5}</StackChip>
        )}
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
          {project.industry.split(" · ").slice(0, 2).join(" · ")}
        </span>
        {primaryLink && (
          <a
            href={primaryLink}
            target={primaryLink.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor="reticle"
            className="group/visit inline-flex items-center gap-1.5 rounded-full border border-[var(--border-glass-dark)] bg-[var(--surface-elev)] px-4 py-2 text-xs font-semibold text-[var(--ink)] shadow-[0_2px_8px_-4px_oklch(0.22_0.025_30/0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-[var(--accent)] hover:text-white hover:shadow-[0_10px_24px_-8px_var(--accent-glow)]"
            aria-label={`Abrir ${project.name}`}
          >
            {project.links.repo === primaryLink ? (
              <>
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Ver repo</span>
              </>
            ) : (
              <>
                <span>Visitar sitio</span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
                />
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
