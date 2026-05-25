export type ExperimentMeta = {
  slug: string;
  title: string;
  version: string;
  date: string;
  blurb: string;
};

export const EXPERIMENTS: ExperimentMeta[] = [
  {
    slug: "ascii-rain",
    title: "ascii.rain",
    version: "v0.1",
    date: "2026-05",
    blurb: "matrix de glifos en canvas, 30fps, capada cuando sale de viewport.",
  },
  {
    slug: "refract-sandbox",
    title: "liquid.refract",
    version: "v0.1",
    date: "2026-05",
    blurb: "el mismo filtro SVG del sistema de glass, con slider para tunear la deformación.",
  },
  {
    slug: "terminal-toy",
    title: "terminal.toy",
    version: "v0.1",
    date: "2026-05",
    blurb: "10 comandos: whoami, ls projects, cat manifesto, gh status, clear, help...",
  },
];
