"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { NOTES } from "@/lib/notes/data";
import { easeOutExpo } from "@/lib/motion/variants";

const HEADER = {
  dev: {
    eyebrow: "notes · ideas",
    title: (
      <>
        Notas cortas. <br className="hidden sm:inline" />
        Decisiones escritas.
      </>
    ),
    description:
      "Procesos, decisiones de stack, lecciones de proyectos. Sin temporada de fotos profesionales — solo el texto.",
  },
  client: {
    eyebrow: "notas · ideas",
    title: (
      <>
        Cómo pienso. <br className="hidden sm:inline" />
        En texto corto.
      </>
    ),
    description:
      "Notas cortas sobre cómo trabajo, cómo armo proyectos y por qué tomo las decisiones que tomo.",
  },
} as const;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

export function NotesSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section id="notes" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: easeOutExpo }}
        >
          <AsciiHeading
            command="ls ./notes"
            title={copy.title}
            description={copy.description}
          />
        </motion.div>

        {/* MOBILE list — divider rows, easy to tap */}
        <ol className="mt-16 divide-y divide-[var(--border-glass)] border-y border-[var(--border-glass)] lg:hidden">
          {NOTES.map((note, i) => (
            <motion.li
              key={note.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.06 * i, ease: easeOutExpo }}
            >
              <Link
                href={`/notes/${note.slug}`}
                className="group grid gap-3 py-7 transition-colors hover:bg-[var(--surface-elev)] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-8 sm:px-2"
              >
                <div className="flex items-baseline gap-3 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  <span aria-hidden className="opacity-40">·</span>
                  <span>{note.readTime}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-semibold leading-snug text-[var(--ink)] sm:text-3xl">
                    {note.title}
                  </h3>
                  <p className="mt-1 font-mono text-[0.65rem] tracking-tight text-[var(--ink-soft)] opacity-60">
                    ~/notes/{note.slug}.md
                  </p>
                  <p className="mt-2 max-w-[65ch] text-base text-[var(--ink-soft)]">{note.dek}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-[var(--border-glass)] px-1.5 py-0.5 font-mono text-[0.6rem] tracking-tight text-[var(--ink-soft)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-[var(--ink-soft)] group-hover:text-[var(--accent)]">
                  leer
                  <ArrowUpRight size={12} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>

        {/* DESKTOP file tree */}
        <div className="mt-16 hidden lg:block">
          <p className="mb-6 font-mono text-[0.8rem] tracking-tight text-[var(--ink-soft)]">
            <span className="text-[var(--accent)] opacity-90">~/notes/</span>
          </p>

          <ol className="font-mono text-[0.78rem]">
            {NOTES.map((note, i) => {
              const isLast = i === NOTES.length - 1;
              const branch = isLast ? "└──" : "├──";
              const trunk = isLast ? "   " : "│  ";
              return (
                <motion.li
                  key={note.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.06 * i, ease: easeOutExpo }}
                >
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group block py-3 transition-colors hover:bg-[var(--surface-elev)]"
                  >
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3">
                      <span className="select-none text-[var(--ink-soft)] opacity-60">{branch}</span>
                      <div className="min-w-0">
                        <p className="flex items-baseline gap-3">
                          <span className="text-[var(--accent)] opacity-90">{note.slug}.md</span>
                          <span className="text-[var(--ink-soft)] opacity-60">
                            [{formatDate(note.date)} · {note.readTime}]
                          </span>
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--ink)]">
                          {note.title}
                        </h3>
                        <p className="mt-1 max-w-[65ch] font-sans text-base text-[var(--ink-soft)]">
                          {note.dek}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {note.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-sm border border-[var(--border-glass)] px-1.5 py-0.5 text-[0.65rem] tracking-tight text-[var(--ink-soft)]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[0.7rem] text-[var(--ink-soft)] group-hover:text-[var(--accent)]">
                        leer
                        <ArrowUpRight size={12} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    {!isLast ? (
                      <p className="mt-2 select-none text-[var(--ink-soft)] opacity-40">
                        {trunk}
                      </p>
                    ) : null}
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
