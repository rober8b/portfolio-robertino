"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/site-data";
import { useMode } from "@/components/mode/mode-provider";
import { DeviceFrame } from "@/components/cases/device-frame";
import { BuildNoteTile } from "@/components/cases/build-note-tile";
import { MetricTile } from "@/components/cases/metric-tile";
import { TerminalOverlay } from "@/components/cases/terminal-overlay";
import { Scanlines } from "@/components/ambient/scanlines";
import { GithubIcon } from "@/components/icons/brand-icons";
import { easeOutExpo } from "@/lib/motion/variants";

type CaseStudyProps = {
  project: Project;
  index: number;
  next: Project;
};

function pickMedia(media: ProjectMedia[] | undefined, role: ProjectMedia["role"]) {
  return media?.find((m) => m.role === role);
}

export function CaseStudy({ project, index, next }: CaseStudyProps) {
  const { mode } = useMode();
  const hero = pickMedia(project.media, "hero");
  const mobile = pickMedia(project.media, "mobile");
  const uiCrop = pickMedia(project.media, "ui-crop");
  const terminal = pickMedia(project.media, "terminal");
  const number = String(index + 1).padStart(2, "0");
  const total = String(9).padStart(2, "0");

  return (
    <article className="relative pb-24">
      {/* Header band */}
      <header className="relative px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft size={12} strokeWidth={1.75} />
            volver al índice
          </Link>

          <div className="mt-10 flex items-center gap-4 font-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
            <span className="nums-tabular">
              caso {number}/{total}
            </span>
            <span aria-hidden className="h-px w-10 bg-[var(--ink-soft)] opacity-40" />
            <span>{project.statusLabel[mode]}</span>
            <span aria-hidden className="opacity-40">·</span>
            <span>{project.year}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-balance text-[var(--ink)] sm:text-6xl lg:text-7xl"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
            className="mt-6 max-w-2xl text-lg text-[var(--ink-soft)] sm:text-xl"
          >
            {project.tagline[mode]}
          </motion.p>
        </div>
      </header>

      {/* Hero crop, browser-framed and slightly tilted */}
      {hero ? (
        <section className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <DeviceFrame kind="browser" url={hostname(project.links.demo)}>
                <div className="relative aspect-[16/10] w-full bg-[var(--surface)]">
                  <Image
                    src={hero.src}
                    alt={hero.alt ?? project.name}
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                  <Scanlines opacity={0.04} blend="overlay" />
                </div>
              </DeviceFrame>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Description + sidebar of meta */}
      <section className="relative px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[2fr_1fr] lg:gap-14">
          <div className="space-y-6 text-base leading-relaxed text-[var(--ink-soft)]">
            <p className="text-lg">{project.description[mode]}</p>

            {project.highlights.length > 0 ? (
              <ul className="grid gap-2 border-t border-[var(--border-glass)] pt-6 font-mono text-[0.8rem]">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 leading-snug">
                    <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 bg-[var(--accent)]" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="space-y-4">
            <MetaRow label="cliente" value={project.client ?? "—"} />
            <MetaRow label="industria" value={project.industry} />
            <MetaRow label="año" value={project.year} />
            <MetaRow label="estado" value={project.statusLabel[mode]} />

            <div className="border-t border-[var(--border-glass)] pt-4">
              <p className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
                stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm border border-[var(--border-glass)] px-2 py-0.5 font-mono text-[0.65rem] tracking-tight text-[var(--ink)]"
                  >
                    {tech.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-glass)] pt-4">
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--surface)] transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink size={13} strokeWidth={1.75} />
                  live
                </a>
              ) : null}
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  repo
                </a>
              ) : null}
              {project.links.manifesto ? (
                <Link
                  href={project.links.manifesto}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  manifesto
                  <ArrowUpRight size={12} strokeWidth={1.75} />
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* Layered crops row: mobile + ui-crop + terminal (only renders cells that exist) */}
      {(mobile || uiCrop || terminal || project.buildNotes?.length || project.metrics?.length) ? (
        <section className="relative mt-16 px-4 sm:mt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-3">
              {mobile ? (
                <div className="md:col-span-1">
                  <DeviceFrame kind="mobile">
                    <div className="relative aspect-[9/19] w-full bg-[var(--surface)]">
                      <Image
                        src={mobile.src}
                        alt={mobile.alt ?? `${project.name} mobile`}
                        fill
                        sizes="(min-width: 768px) 25vw, 60vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </DeviceFrame>
                </div>
              ) : null}

              <div className="md:col-span-2 grid gap-5">
                {uiCrop ? (
                  <DeviceFrame kind="browser" url={uiCrop.caption}>
                    <div className="relative aspect-[16/10] w-full bg-[var(--surface)]">
                      <Image
                        src={uiCrop.src}
                        alt={uiCrop.alt ?? `${project.name} UI fragment`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </DeviceFrame>
                ) : null}

                {terminal ? (
                  <DeviceFrame kind="terminal" title={terminal.caption}>
                    <div className="relative aspect-[16/8] w-full bg-[var(--surface)]">
                      <Image
                        src={terminal.src}
                        alt={terminal.alt ?? `${project.name} terminal fragment`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </DeviceFrame>
                ) : null}

                {project.buildNotes?.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.buildNotes.map((note) => (
                      <BuildNoteTile key={note}>{note}</BuildNoteTile>
                    ))}
                  </div>
                ) : null}

                {project.metrics?.length ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.metrics.map((m) => (
                      <MetricTile key={m.label} label={m.label} value={m.value} hint={m.hint} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Sample deploy log — composed inline, not asset-dependent */}
            <div className="mt-10 max-w-2xl">
              <TerminalOverlay
                title={`rober8b@${project.slug}`}
                lines={[
                  { prompt: "$", body: `next build --turbopack` },
                  { prompt: ">", body: `Route: ${hostname(project.links.demo) || project.slug}`, tone: "muted" },
                  { prompt: ">", body: `Status: ${project.statusLabel[mode]}`, tone: "muted" },
                  { prompt: ">", body: `Year: ${project.year}`, tone: "muted" },
                  { prompt: "$", body: `vercel deploy --prod`, tone: "accent" },
                ]}
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Next case tail */}
      <section className="relative mt-24 border-t border-[var(--border-glass)] px-4 pt-12 sm:mt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-baseline gap-3 font-display text-3xl font-semibold text-[var(--ink)] sm:text-4xl"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
              siguiente caso
            </span>
            <span className="border-b-2 border-transparent transition-colors group-hover:border-[var(--accent)]">
              {next.name}
            </span>
            <ArrowUpRight
              size={20}
              strokeWidth={1.75}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 font-mono text-[0.7rem]">
      <span className="tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">{label}</span>
      <span className="truncate text-right text-[var(--ink)]">{value}</span>
    </div>
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
