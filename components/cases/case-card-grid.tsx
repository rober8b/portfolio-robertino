"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/site-data";
import { useMode } from "@/components/mode/mode-provider";
import { Scanlines } from "@/components/ambient/scanlines";
import { easeOutExpo } from "@/lib/motion/variants";

type CaseCardGridProps = {
  project: Project;
};

function pickMedia(media: ProjectMedia[] | undefined, role: ProjectMedia["role"]) {
  return media?.find((m) => m.role === role);
}

export function CaseCardGrid({ project }: CaseCardGridProps) {
  const { mode } = useMode();
  const hero = pickMedia(project.media, "hero");
  const detailHref = project.links.manifesto ?? `/work/${project.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeOutExpo }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[var(--surface-elevated)] transition-colors duration-300 hover:border-[var(--accent-soft)]"
    >
      {/* UI crop with browser-frame top stripe */}
      <div className="relative">
        <div className="flex items-center gap-1.5 border-b border-[var(--border-glass)] bg-[var(--surface)] px-3 py-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
          <span className="ml-2 truncate font-mono text-[0.55rem] tracking-tight text-[var(--ink-soft)] opacity-70">
            {hostname(project.links.demo) || project.slug}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
          {hero ? (
            <Image
              src={hero.src}
              alt={hero.alt ?? project.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-[var(--ink-soft)]">
              sin captura
            </div>
          )}
          <Scanlines opacity={0.05} blend="overlay" />
        </div>
      </div>

      {/* Mini-bento body: title + tagline + 3-cell footer */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
          <span>{project.statusLabel[mode]}</span>
          <span aria-hidden className="opacity-40">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-tight text-[var(--ink)]">
          {project.name}
        </h3>

        <p className="text-sm text-[var(--ink-soft)]">{project.tagline[mode]}</p>

        {/* 3-cell asymmetric mini-bento footer */}
        <div className="mt-auto grid grid-cols-[2fr_1fr] gap-2 pt-3">
          <div className="rounded-md border border-[var(--border-glass)] px-2.5 py-1.5">
            <p className="font-mono text-[0.5rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
              industry
            </p>
            <p className="truncate font-mono text-[0.65rem] text-[var(--ink)]">{project.industry}</p>
          </div>
          <div className="rounded-md border border-[var(--border-glass)] px-2.5 py-1.5">
            <p className="font-mono text-[0.5rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
              stack
            </p>
            <p className="truncate font-mono text-[0.65rem] text-[var(--ink)]">{project.stack[0]?.toLowerCase()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-[var(--ink)] underline-offset-2 group-hover:underline"
          >
            caso completo
            <ArrowUpRight size={12} strokeWidth={1.75} />
          </Link>
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.65rem] text-[var(--ink-soft)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
            >
              live ↗
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function hostname(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
