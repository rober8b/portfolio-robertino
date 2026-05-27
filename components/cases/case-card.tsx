"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { Scanlines } from "@/components/ambient/scanlines";
import { ScrambleText } from "@/components/primitives/scramble-text";
import type { Project } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";
import CaseImageIcon from '@/components/icons/CaseImageIcon';

type CaseCardProps = {
  project: Project;
  priority?: boolean;
};

export function CaseCard({ project, priority = false }: CaseCardProps) {
  const { mode } = useMode();
  const detailHref = project.links.manifesto ?? `/work/${project.slug}`;
  const halftone = project.asciiHalftone;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeOutExpo }}
      className="case-card group relative grid aspect-[4/5] grid-rows-[3fr_2fr] overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a]"
    >
      <div className="relative overflow-hidden bg-[#0a0a0a]">
        {halftone ? (
          <Image
            src={halftone}
            alt={`${project.name} — ASCII halftone`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="case-card-halftone object-cover object-center"
            priority={priority}
          />
        ) : (
          <CaseImageIcon projectId={project.name} />
        )}
        <Scanlines opacity={0.04} blend="overlay" />
      </div>

      <div className="relative z-10 flex flex-col gap-2 bg-[#0a0a0a] p-4 sm:p-5">
        <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)]">
          <span aria-hidden className="text-[#ff4000] opacity-90">●</span>
          <span className="truncate">{project.statusLabel[mode]}</span>
          <span aria-hidden className="opacity-40">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
          <ScrambleText text={project.name} trigger="hover" />
        </h3>

        <p className="line-clamp-2 text-sm leading-snug text-[oklch(0.78_0.012_40)]">
          {project.tagline[mode]}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-[oklch(1_0_0/0.14)] px-1.5 py-0.5 font-mono text-[0.6rem] tracking-tight text-[oklch(0.72_0.012_40)]"
            >
              {tech.toLowerCase()}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-white underline-offset-2 transition-colors duration-200 group-hover:text-[#ff4000]"
          >
            caso completo
            <ArrowUpRight size={12} strokeWidth={1.75} />
          </Link>
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.65rem] text-[oklch(0.72_0.012_40)] underline-offset-2 transition-colors duration-200 hover:text-[#ff4000] hover:underline"
            >
              live ↗
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

// function HalftonePlaceholder({ path }: { path: string }) {
//   return (
//     <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a]">
//       <span
//         aria-hidden
//         className="font-mono text-6xl font-semibold text-[#ff4000] sm:text-7xl"
//       >
//         ?
//       </span>
//       <span className="font-mono text-[0.65rem] tracking-[0.1em] text-[oklch(0.72_0.012_40)] opacity-70">
//         {path}
//       </span>
//     </div>
//   );
// }
