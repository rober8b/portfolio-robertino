"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

import { Cpu, Atom, Database, Zap, Sparkles } from "lucide-react";

// Custom background styles based on project slug
const MOCKUP_THEMES: Record<string, { gradient: string; glow: string }> = {
  marketplace: {
    gradient: "from-[oklch(0.25_0.08_30)] via-[oklch(0.35_0.12_32)] to-[oklch(0.15_0.03_30)]",
    glow: "bg-[oklch(0.66_0.22_33/0.3)]",
  },
  "aredes-asociados": {
    gradient: "from-[oklch(0.18_0.04_240)] via-[oklch(0.24_0.06_230)] to-[oklch(0.12_0.02_240)]",
    glow: "bg-[oklch(0.55_0.15_240/0.25)]",
  },
  "leiza-page": {
    gradient: "from-[oklch(0.28_0.04_140)] via-[oklch(0.35_0.06_145)] to-[oklch(0.18_0.02_140)]",
    glow: "bg-[oklch(0.62_0.18_145/0.25)]",
  },
};

function TechStackIcon({ slug }: { slug: string }) {
  if (slug === "marketplace") {
    return (
      <div className="relative">
        <Cpu size={36} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" strokeWidth={1.5} />
        <Sparkles size={14} className="absolute -top-1 -right-1 text-amber-300 animate-bounce" />
      </div>
    );
  }
  if (slug === "leiza-page") {
    return (
      <div className="relative animate-spin-slow">
        <Atom size={40} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <div className="relative">
      <Database size={36} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" strokeWidth={1.5} />
      <Zap size={14} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
    </div>
  );
}

export function ProjectMockup({ project }: { project: Project }) {
  const theme = MOCKUP_THEMES[project.slug] || {
    gradient: "from-zinc-900 via-zinc-800 to-black",
    glow: "bg-white/10",
  };

  const reduced = useReducedMotion();

  // Mouse tracking for beautiful 3D tilt effect (disabled if prefers-reduced-motion is true)
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [8, -8]);
  const rotateY = useTransform(x, [0, 400], [-8, 8]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl p-6 sm:p-10",
        "bg-gradient-to-br border border-[var(--border-glass-dark)] shadow-xl transition-shadow duration-500 hover:shadow-2xl",
        theme.gradient,
      )}
      style={{ perspective: 1200 }}
    >
      {/* Decorative Glow Ambient Backdrop */}
      <div
        aria-hidden
        className={cn(
          "absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full blur-3xl opacity-40 transition-transform duration-700 group-hover/mockup:scale-110",
          theme.glow,
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute -bottom-[10%] -right-[10%] h-[60%] w-[60%] rounded-full blur-3xl opacity-40 transition-transform duration-700 group-hover/mockup:scale-110",
          theme.glow,
        )}
      />

      {/* Grid Texturing Overlay */}
      <div
        aria-hidden
        className="bg-dot-pattern absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />

      {/* 3D Tilted Mockup Frame */}
      <motion.div
        style={
          reduced
            ? {}
            : {
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }
        }
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {project.image ? (
          <div className="relative w-[90%] h-[90%] overflow-hidden rounded-2xl border border-[var(--border-glass)] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover/mockup:scale-[1.02] group-hover/mockup:shadow-[0_32px_64px_-10px_rgba(0,0,0,0.6)]">
            <Image
              src={project.image}
              alt={`Mockup de ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover/mockup:scale-105"
              priority
            />
            {/* Glossy Reflection overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-60 transition-opacity group-hover/mockup:opacity-80"
            />
            {/* Hover overlay shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-black/5 opacity-100 transition-opacity group-hover/mockup:opacity-0"
            />
          </div>
        ) : (
          <div className="relative flex h-[90%] w-[90%] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-glass-dark)] bg-black/50 backdrop-blur-xl p-6 text-center shadow-[0_24px_50px_-15px_rgba(0,0,0,0.6)]">
            {/* Tech Stack Logo Symbol Container */}
            <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-5 transition-transform duration-500 hover:scale-105">
              {/* Radial gradient background light inside the logo box */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 opacity-50" />
              <TechStackIcon slug={project.slug} />
            </div>

            {/* Title / Badging */}
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center self-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-0.5 font-mono text-[0.6rem] tracking-wider text-[var(--ink-soft)] uppercase border border-white/5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {project.status === "building" ? "En Desarrollo" : "En Carga"}
              </span>
              <h4 className="font-display text-base font-semibold text-white/95 mt-1.5">
                {project.name}
              </h4>
              <p className="text-[0.7rem] max-w-[200px] text-[var(--ink-soft)] opacity-75 leading-relaxed mt-1">
                Sandbox agéntico local sin URL pública activa.
              </p>
            </div>

            {/* Micro-board: core stack items */}
            <div className="mt-5 flex flex-wrap justify-center gap-1.5 max-w-[260px]">
              {project.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="rounded bg-white/[0.02] border border-white/5 px-1.5 py-0.5 font-mono text-[0.55rem] text-white/50 tracking-tight uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
