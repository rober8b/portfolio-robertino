export type ExperimentMeta = {
  slug: string;
  title: string;
  version: string;
  date: string;
  blurb: string;
};

export const EXPERIMENTS: ExperimentMeta[] = [
  {
    slug: "terminal-toy",
    title: "terminal.toy",
    version: "v0.1",
    date: "2026-05",
    blurb: "10 comandos: whoami, ls projects, cat manifesto, gh status, clear, help...",
  },
  {
    slug: "hermes-agent",
    title: "hermes.agent",
    version: "v0.1",
    date: "2026-05",
    blurb: "simulación de mi agente personal de organización. click avanza al próximo comando.",
  },
  {
    slug: "refract-sandbox",
    title: "liquid.refract",
    version: "v0.1",
    date: "2026-05",
    blurb: "el mismo filtro SVG del sistema de glass, con slider para tunear la deformación.",
  },
];
