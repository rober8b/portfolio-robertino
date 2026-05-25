import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { SiteFooter } from "@/components/sections/site-footer";
import { AsciiRain } from "@/components/experiments/ascii-rain";
import { RefractSandbox } from "@/components/experiments/refract-sandbox";
import { TerminalToy } from "@/components/experiments/terminal-toy";
import { EXPERIMENTS } from "@/lib/experiments/data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return EXPERIMENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = EXPERIMENTS.find((e) => e.slug === slug);
  if (!exp) return { title: "Lab · rober8b" };
  return {
    title: `${exp.title} · lab · rober8b`,
    description: exp.blurb,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const exp = EXPERIMENTS.find((e) => e.slug === slug);
  if (!exp) notFound();

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <FloatingNav />

      <article className="relative px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#lab"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft size={12} strokeWidth={1.75} />
            volver al lab
          </Link>

          <div className="mt-10 flex items-baseline justify-between gap-3 font-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
            <span>experiment · {exp.slug}</span>
            <span>
              {exp.version} · {exp.date}
            </span>
          </div>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-balance text-[var(--ink)] sm:text-6xl lg:text-7xl">
            {exp.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--ink-soft)]">{exp.blurb}</p>

          <div className="mt-12 overflow-hidden rounded-lg border border-[var(--border-glass)]">
            {exp.slug === "ascii-rain" ? <AsciiRain height={520} /> : null}
            {exp.slug === "refract-sandbox" ? <RefractSandbox height={520} /> : null}
            {exp.slug === "terminal-toy" ? <TerminalToy height={520} /> : null}
          </div>

          <NextExperimentTail currentSlug={slug} />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

function NextExperimentTail({ currentSlug }: { currentSlug: string }) {
  const idx = EXPERIMENTS.findIndex((e) => e.slug === currentSlug);
  const next = EXPERIMENTS[(idx + 1) % EXPERIMENTS.length];
  return (
    <div className="mt-20 border-t border-[var(--border-glass)] pt-10">
      <Link
        href={`/lab/${next.slug}`}
        className="group inline-flex items-baseline gap-3 font-display text-2xl font-semibold text-[var(--ink)] sm:text-3xl"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
          siguiente experimento
        </span>
        <span className="border-b-2 border-transparent transition-colors group-hover:border-[var(--accent)]">
          {next.title}
        </span>
      </Link>
    </div>
  );
}
