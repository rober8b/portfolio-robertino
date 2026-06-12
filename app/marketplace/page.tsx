import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/brand-icons";
import { SiteFooter } from "@/components/sections/site-footer";
import { CONTACTS } from "@/lib/site-data";
import { MANIFESTO } from "@/lib/marketplace-manifesto";

export const metadata: Metadata = {
  title: "Manifesto del Marketplace agéntico",
  description:
    "Squads de IA verticales para ecommerce LATAM. WhatsApp, MercadoPago y contexto local en el core. Construido por Robertino Barbuto en 2026.",
  openGraph: {
    title: "Marketplace agéntico — Manifesto",
    description:
      "Squads de IA verticales para ecommerce LATAM. WhatsApp, MercadoPago y contexto local en el core.",
    type: "article",
  },
};

const waEarlyAccess = CONTACTS.whatsapp
  ? `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(
      "Hola Rober, quería sumarme a la lista de early access del marketplace agéntico.",
    )}`
  : null;

export default function MarketplaceManifesto() {
  return (
    <main className="relative bg-[#0a0a0a] text-white">
      <BackLink />
      <Hero />
      <Thesis />
      <Squads />
      <Defensibility />
      <Moat />
      <Pivot />
      <Team />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-40 inline-flex items-center gap-2 rounded-lg border border-[oklch(1_0_0/0.14)] bg-[#0a0a0a] px-3 py-2 text-sm text-white transition-colors duration-300 hover:border-[#ff4000] hover:text-[#ff4000]"
    >
      <ArrowLeft size={14} strokeWidth={1.75} />
      <span className="hidden sm:inline">portfolio</span>
    </Link>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:min-h-screen lg:px-8">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-[#ff4000] opacity-90">
          {MANIFESTO.hero.eyebrow} · {MANIFESTO.status}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-display font-semibold text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] tracking-[-0.04em]">
          {MANIFESTO.hero.claim}
        </h1>
        <p className="mt-8 max-w-prose-tight text-lg leading-relaxed text-[oklch(0.86_0.01_40)] sm:text-xl">
          {MANIFESTO.hero.sub}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {waEarlyAccess ? (
            <a
              href={waEarlyAccess}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#ff4000] px-6 py-3.5 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" />
              Pedir early access
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : (
            <a
              href={`mailto:${CONTACTS.email}?subject=Early access marketplace agéntico`}
              className="group inline-flex items-center gap-2 rounded-lg bg-[#ff4000] px-6 py-3.5 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Mail size={16} strokeWidth={1.75} />
              Pedir early access
            </a>
          )}
          <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
            equipo de 4 · {MANIFESTO.year}
          </span>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#ff4000] opacity-90">
            tesis · 3 decisiones core
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl">
            Lo que decidimos en el papel <br className="hidden sm:inline" />
            antes de escribir una línea.
          </h2>
        </header>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {MANIFESTO.thesis.map((item, i) => (
            <div
              key={item.heading}
              className="relative overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-[#ff4000] lg:p-8"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">{item.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[oklch(0.86_0.01_40)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Squads() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#ff4000] opacity-90">
            squads del launch · 2 verticales
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl">
            Dos squads. <br className="hidden sm:inline" />
            Outcome medible en ambos.
          </h2>
          <p className="mt-6 max-w-prose-tight text-lg text-[oklch(0.86_0.01_40)]">
            Empezamos con los dolores más concretos del ecommerce LATAM. Cada squad reporta su
            propia métrica de éxito en plata o SKUs, no en tokens.
          </p>
        </header>

        <div className="mt-16 space-y-10">
          {MANIFESTO.squads.map((squad, i) => (
            <div
              key={squad.name}
              className={`grid items-stretch gap-6 lg:gap-10 ${
                i % 2 === 1 ? "lg:grid-cols-[3fr_5fr]" : "lg:grid-cols-[5fr_3fr]"
              }`}
            >
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                  squad {i + 1} · {squad.status}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                  {squad.name}
                </h3>
                <p className="mt-2 text-lg text-[oklch(0.86_0.01_40)]">{squad.tagline}</p>
                <p className="mt-6 max-w-prose-tight text-base leading-relaxed text-white">
                  {squad.what}
                </p>
              </div>

              <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-8">
                <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                  outcome metric
                </p>
                <p className="font-display text-4xl font-semibold text-balance text-[#ff4000] lg:text-5xl">
                  {squad.outcomeMetric}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                  facturable por unidad · sin abono fijo
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Defensibility() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.12em] uppercase text-[#ff4000] opacity-90">
            defensibilidad · por qué aguantamos
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl">
            {MANIFESTO.defensibility.headline}
          </h2>
        </header>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {MANIFESTO.defensibility.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-[#ff4000] lg:p-8"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#ff4000] opacity-90">
                vector · {pillar.title.toLowerCase()}
              </p>
              <div className="mt-4 space-y-3">
                <p className="text-sm leading-relaxed text-[oklch(0.72_0.012_40)]">
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase opacity-80">
                    ellos
                  </span>
                  <br />
                  {pillar.them}
                </p>
                <p className="text-base leading-relaxed text-white">
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                    nosotros
                  </span>
                  <br />
                  {pillar.us}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Moat() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#ff4000] opacity-90">
          moat · construido en producción
        </p>
        <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {MANIFESTO.moat.headline}
        </h2>
        <p className="mt-8 text-lg leading-[1.7] text-[oklch(0.86_0.01_40)] lg:text-xl">
          {MANIFESTO.moat.body}
        </p>
      </div>
    </section>
  );
}

function Pivot() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_5fr]">
        <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#ff4000] opacity-90">
          historia · cómo llegamos acá
        </p>
        <div>
          <h3 className="text-balance font-display text-2xl font-semibold text-white sm:text-3xl">
            {MANIFESTO.pivot.headline}
          </h3>
          <p className="mt-4 max-w-prose-tight leading-relaxed text-[oklch(0.86_0.01_40)]">
            {MANIFESTO.pivot.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] uppercase text-[#ff4000] opacity-90">
            equipo · 4 personas
          </p>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold sm:text-4xl">
            Pocas manos. Mucha calle.
          </h2>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {MANIFESTO.team.map((member) => (
            <li
              key={member.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-5 transition-colors duration-300 hover:border-[#ff4000]"
            >
              <span className="font-display text-xl font-semibold text-white">{member.name}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
                {member.role}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-2">
          {MANIFESTO.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[oklch(1_0_0/0.14)] bg-[#0a0a0a] px-2.5 py-1 font-mono text-[0.65rem] text-[oklch(0.86_0.01_40)]"
            >
              {tech.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-[oklch(1_0_0/0.08)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-[#ff4000] opacity-90">
          early access · acceso limitado
        </p>
        <h2 className="mt-6 text-balance font-display font-semibold text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
          Si tenés un ecommerce LATAM <br className="hidden sm:inline" />
          y querés ser de los primeros, escribime.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[oklch(0.86_0.01_40)] sm:text-lg">
          Estoy hablando uno a uno con dueños de tiendas en Tiendanube y Shopify para validar
          Catalog Crew y Recovery Operator antes del launch público. No es lista de espera de
          marketing, es onboarding manual con quien quiera probar.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {waEarlyAccess && (
            <a
              href={waEarlyAccess}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#ff4000] px-6 py-3.5 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
          <a
            href={`mailto:${CONTACTS.email}?subject=Early access marketplace agéntico&body=${encodeURIComponent(
              "Hola Rober, vi el manifesto del marketplace agéntico y me gustaría sumarme al early access. Te cuento un poco sobre mi tienda:",
            )}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[oklch(1_0_0/0.14)] px-6 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:border-[#ff4000] hover:text-[#ff4000]"
          >
            <Mail size={16} strokeWidth={1.75} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
