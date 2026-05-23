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
    <main className="relative">
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
      className="glass fixed top-6 left-6 z-40 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--ink)] transition-transform duration-300 hover:-translate-x-0.5"
      style={{ color: "oklch(0.99 0.008 55)" }}
    >
      <ArrowLeft size={14} strokeWidth={1.75} />
      <span className="hidden sm:inline">portfolio</span>
    </Link>
  );
}

function Hero() {
  return (
    <section className="zone-drench relative flex min-h-[80vh] items-end overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:min-h-screen lg:px-8">
      <HeroAmbient />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
          {MANIFESTO.hero.eyebrow} · {MANIFESTO.status}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-display font-semibold text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] tracking-[-0.04em]">
          {MANIFESTO.hero.claim}
        </h1>
        <p className="mt-8 max-w-prose-tight text-lg leading-relaxed sm:text-xl">
          {MANIFESTO.hero.sub}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {waEarlyAccess ? (
            <a
              href={waEarlyAccess}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--drench-text)] px-6 py-3.5 text-base font-medium text-[var(--drench-bg)] transition-transform duration-300 hover:-translate-y-0.5"
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
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--drench-text)] px-6 py-3.5 text-base font-medium text-[var(--drench-bg)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Mail size={16} strokeWidth={1.75} />
              Pedir early access
            </a>
          )}
          <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase opacity-70">
            equipo de 4 · {MANIFESTO.year}
          </span>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
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
              className="glass relative overflow-hidden rounded-lg p-6 lg:p-8"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
                {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold">{item.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Squads() {
  return (
    <section className="border-t border-[var(--border-glass-dark)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
            squads del launch · 2 verticales
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl">
            Dos squads. <br className="hidden sm:inline" />
            Outcome medible en ambos.
          </h2>
          <p className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]">
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
                <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
                  squad {i + 1} · {squad.status}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  {squad.name}
                </h3>
                <p className="mt-2 text-lg text-[var(--ink-soft)]">{squad.tagline}</p>
                <p className="mt-6 max-w-prose-tight text-base leading-relaxed text-[var(--ink)]">
                  {squad.what}
                </p>
              </div>

              <div className="glass relative flex flex-col justify-between gap-6 overflow-hidden rounded-lg p-8">
                <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
                  outcome metric
                </p>
                <p className="font-display text-4xl font-semibold text-balance lg:text-5xl">
                  {squad.outcomeMetric}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-60">
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
    <section className="zone-drench relative overflow-hidden px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--drench-text) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
            defensibilidad · por qué aguantamos
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl">
            {MANIFESTO.defensibility.headline}
          </h2>
        </header>

        <div className="mt-16 grid gap-2 sm:grid-cols-2">
          {MANIFESTO.defensibility.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative rounded-lg border border-[var(--drench-border)] bg-[var(--drench-glass-bg)] p-6 backdrop-blur lg:p-8"
            >
              <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-70">
                vector · {pillar.title.toLowerCase()}
              </p>
              <div className="mt-4 space-y-3">
                <p className="text-sm leading-relaxed opacity-75">
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase opacity-60">
                    ellos
                  </span>
                  <br />
                  {pillar.them}
                </p>
                <p className="text-base leading-relaxed">
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase opacity-60">
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
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
          moat · construido en producción
        </p>
        <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {MANIFESTO.moat.headline}
        </h2>
        <p className="mt-8 text-lg leading-[1.7] text-[var(--ink)] lg:text-xl">
          {MANIFESTO.moat.body}
        </p>
      </div>
    </section>
  );
}

function Pivot() {
  return (
    <section className="border-t border-[var(--border-glass-dark)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_5fr]">
        <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
          historia · cómo llegamos acá
        </p>
        <div>
          <h3 className="text-balance font-display text-2xl font-semibold sm:text-3xl">
            {MANIFESTO.pivot.headline}
          </h3>
          <p className="mt-4 max-w-prose-tight leading-relaxed text-[var(--ink-soft)]">
            {MANIFESTO.pivot.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="border-t border-[var(--border-glass-dark)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
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
              className="glass flex items-center justify-between gap-4 rounded-lg p-5"
            >
              <span className="font-display text-xl font-semibold">{member.name}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-70">
                {member.role}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-2">
          {MANIFESTO.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--ink-soft)] backdrop-blur"
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
    <section className="zone-drench relative overflow-hidden px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-[-30%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
          early access · acceso limitado
        </p>
        <h2 className="mt-6 text-balance font-display font-semibold text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
          Si tenés un ecommerce LATAM <br className="hidden sm:inline" />
          y querés ser de los primeros, escribime.
        </h2>
        <p className="mt-6 text-base leading-relaxed opacity-85 sm:text-lg">
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
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--drench-text)] px-6 py-3.5 text-base font-medium text-[var(--drench-bg)] transition-transform duration-300 hover:-translate-y-0.5"
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
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--drench-border)] bg-[var(--drench-glass-bg)] px-6 py-3.5 text-base font-medium text-[var(--drench-text)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={16} strokeWidth={1.75} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute top-[-20%] left-[-10%] h-[80vh] w-[80vh] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute right-[-15%] bottom-[10%] h-[65vh] w-[65vh] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--drench-text) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
