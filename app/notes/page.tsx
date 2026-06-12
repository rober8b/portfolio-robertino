import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { SiteFooter } from "@/components/sections/site-footer";
import { NOTES } from "@/lib/notes/data";

export const metadata: Metadata = {
  title: "Notas · rober8b",
  description: "Procesos, decisiones de stack, lecciones de proyectos.",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <FloatingNav />

      <article className="relative px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#notes"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft size={12} strokeWidth={1.75} />
            volver al home
          </Link>

          <h1 className="mt-10 font-display text-5xl font-semibold leading-tight text-[var(--ink)] sm:text-6xl">
            notes
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)]">
            Procesos, decisiones de stack, lecciones de proyectos. Sin imágenes — solo el texto.
          </p>

          <ol className="mt-12 divide-y divide-[var(--border-glass)] border-y border-[var(--border-glass)]">
            {NOTES.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group grid gap-3 py-6 transition-colors hover:bg-[var(--surface-elev)] sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-6 sm:px-2"
                >
                  <time
                    dateTime={note.date}
                    className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase"
                  >
                    {formatDate(note.date)}
                  </time>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-semibold text-[var(--ink)]">{note.title}</h2>
                    <p className="mt-1 max-w-[60ch] text-sm text-[var(--ink-soft)]">{note.dek}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-[var(--ink-soft)] group-hover:text-[var(--accent)]">
                    leer
                    <ArrowUpRight size={11} strokeWidth={1.75} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
