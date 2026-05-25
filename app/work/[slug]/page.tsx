import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { SiteFooter } from "@/components/sections/site-footer";
import { CaseStudy } from "@/components/cases/case-study";
import { PROJECTS } from "@/lib/site-data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Caso no encontrado · rober8b" };

  return {
    title: `${project.name} · caso · rober8b`,
    description: project.tagline.dev,
    openGraph: {
      title: `${project.name} · rober8b`,
      description: project.tagline.dev,
      images: project.media?.[0]?.src ? [project.media[0].src] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <FloatingNav />
      <CaseStudy project={project} index={index} next={next} />
      <SiteFooter />
    </main>
  );
}
