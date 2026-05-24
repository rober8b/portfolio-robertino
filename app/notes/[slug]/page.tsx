import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { SiteFooter } from "@/components/sections/site-footer";
import { NoteBody } from "@/components/notes/note-body";
import { NOTES } from "@/lib/notes/data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = NOTES.find((n) => n.slug === slug);
  if (!note) return { title: "Nota · rober8b" };
  return {
    title: `${note.title} · notas · rober8b`,
    description: note.dek,
    openGraph: {
      title: note.title,
      description: note.dek,
      type: "article",
      publishedTime: note.date,
      tags: note.tags,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = NOTES.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();

  const note = NOTES[idx];
  const next = NOTES[(idx + 1) % NOTES.length];

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <FloatingNav />

      <article className="relative px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft size={12} strokeWidth={1.75} />
            todas las notas
          </Link>

          <div className="mt-10 flex flex-wrap items-baseline gap-3 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            <span aria-hidden className="opacity-40">·</span>
            <span>{note.readTime}</span>
            {note.tags.map((t) => (
              <span key={t} className="opacity-70">
                #{t}
              </span>
            ))}
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-balance text-[var(--ink)] sm:text-5xl">
            {note.title}
          </h1>

          <p className="mt-5 max-w-[60ch] text-xl text-[var(--ink-soft)]">{note.dek}</p>

          <div className="mt-12">
            <NoteBody blocks={note.body} />
          </div>

          <div className="mt-20 border-t border-[var(--border-glass)] pt-8">
            <Link
              href={`/notes/${next.slug}`}
              className="group inline-flex items-baseline gap-3 font-display text-2xl font-semibold text-[var(--ink)] sm:text-3xl"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
                siguiente
              </span>
              <span className="border-b-2 border-transparent transition-colors group-hover:border-[var(--accent)]">
                {next.title}
              </span>
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
