"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/site-data";
import { useMode } from "@/components/mode/mode-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { DeviceFrame } from "@/components/cases/device-frame";
import { BuildNoteTile } from "@/components/cases/build-note-tile";
import { Scanlines } from "@/components/ambient/scanlines";
import { easeOutExpo } from "@/lib/motion/variants";

type ComposedFeaturedCaseProps = {
  project: Project;
  index: number;
  flipped?: boolean;
};

function pickMedia(media: ProjectMedia[] | undefined, role: ProjectMedia["role"]) {
  return media?.find((m) => m.role === role);
}

export function ComposedFeaturedCase({ project, index, flipped = false }: ComposedFeaturedCaseProps) {
  const { mode } = useMode();
  const hero = pickMedia(project.media, "hero");
  const mobile = pickMedia(project.media, "mobile");
  const number = String(index + 1).padStart(2, "0");
  const detailHref = project.links.manifesto ?? `/work/${project.slug}`;

  return (
    <article
      className="group relative grid items-center gap-10 lg:gap-14"
      style={{
        gridTemplateColumns: "minmax(0, 1fr)",
      }}
    >
      <div className="relative grid w-full gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* SCENE */}
        <div
          className={`relative ${flipped ? "lg:order-2" : "lg:order-1"}`}
          style={{ perspective: "1200px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="relative"
          >
            <div
              className="relative aspect-[4/3] w-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Primary device-framed hero */}
              {hero ? (
                <div
                  className="absolute top-0 left-0 w-[88%] origin-top-left transition-transform duration-500 group-hover:[transform:translateZ(20px)_rotateY(-2deg)]"
                  style={{ transform: "translateZ(0) rotateY(0deg)" }}
                >
                  <DeviceFrame kind="browser" url={hostname(project.links.demo)}>
                    <div className="relative aspect-[16/10] w-full bg-[var(--surface)]">
                      <Image
                        src={hero.src}
                        alt={hero.alt ?? project.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-top"
                        priority={index === 0}
                      />
                      <Scanlines opacity={0.04} blend="overlay" />
                    </div>
                  </DeviceFrame>
                </div>
              ) : null}

              {/* Floating mobile crop, when present */}
              {mobile ? (
                <div
                  className="absolute right-0 bottom-2 w-[28%] origin-bottom-right transition-transform duration-500 group-hover:[transform:translateZ(45px)_translateX(8px)]"
                  style={{ transform: "translateZ(0)" }}
                >
                  <DeviceFrame kind="mobile">
                    <div className="relative aspect-[9/19] w-full bg-[var(--surface)]">
                      <Image
                        src={mobile.src}
                        alt={mobile.alt ?? `${project.name} mobile`}
                        fill
                        sizes="(min-width: 1024px) 14vw, 30vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </DeviceFrame>
                </div>
              ) : null}

              {/* Corner build-note tile, when buildNotes exist (Phase B content fills these later) */}
              {project.buildNotes?.[0] ? (
                <div
                  className="absolute right-[-2%] top-[6%] hidden w-44 transition-transform duration-500 group-hover:[transform:translateZ(60px)_translateX(6px)] sm:block"
                  style={{ transform: "translateZ(0)" }}
                >
                  <BuildNoteTile>{project.buildNotes[0]}</BuildNoteTile>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* STORY */}
        <div className={`relative ${flipped ? "lg:order-1" : "lg:order-2"} flex flex-col gap-5`}>
          <div className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
            <span>{number}</span>
            <span aria-hidden className="h-px w-6 bg-[var(--ink-soft)] opacity-40" />
            <span>{project.statusLabel[mode]}</span>
            <span aria-hidden className="opacity-40">·</span>
            <span>{project.year}</span>
          </div>

          <h3 className="font-display text-3xl font-semibold leading-tight text-balance text-[var(--ink)] sm:text-4xl">
            {project.name}
          </h3>

          <p className="text-lg text-[var(--ink-soft)]">{project.tagline[mode]}</p>

          <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
            {project.description[mode]}
          </p>

          {project.highlights.length > 0 && mode === "dev" ? (
            <ul className="grid gap-1.5 border-t border-[var(--border-glass)] pt-4 font-mono text-[0.7rem] text-[var(--ink-soft)]">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2 leading-snug">
                  <span aria-hidden className="mt-1 inline-block h-1 w-1 bg-[var(--accent)]" />
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-[var(--border-glass)] px-2 py-0.5 font-mono text-[0.6rem] tracking-tight text-[var(--ink-soft)]"
              >
                {tech.toLowerCase()}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="group/cta inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <ExternalLink size={14} strokeWidth={1.75} />
                Live demo
                <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </a>
            ) : null}
            <Link
              href={detailHref}
              className="glass inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-[var(--ink)]"
            >
              Caso completo
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
            {project.links.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                repo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
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
