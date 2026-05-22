"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { useMode } from "@/components/mode/mode-provider";
import { PROFILE } from "@/lib/site-data";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

type ModeCopy = {
  eyebrow: string;
  claim: React.ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; Icon: IconComponent };
};

const COPY: Record<"dev" | "client", ModeCopy> = {
  dev: {
    eyebrow: "freelance · buenos aires · disponible",
    claim: (
      <>
        Construyo software web
        <br /> y sistemas agénticos
        <br /> para LATAM.
      </>
    ),
    primaryCta: { label: "Ver Marketplace agéntico", href: "#projects" },
    secondaryCta: { label: "github.com/rober8b", href: PROFILE.github, Icon: GithubIcon },
  },
  client: {
    eyebrow: "freelance · buenos aires · agendá una llamada",
    claim: (
      <>
        Te armo tu web,
        <br /> tu tienda online
        <br /> o tu app.
      </>
    ),
    primaryCta: { label: "Pedí presupuesto por WhatsApp", href: "#contact" },
    secondaryCta: { label: "Ver casos", href: "#projects", Icon: ArrowUpRight },
  },
};

export function HeroSection() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="zone-drench relative flex min-h-dvh items-center overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <DrenchAmbient />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.div
          key={`hero-text-${mode}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="font-mono text-xs tracking-[0.08em] text-[var(--ink-soft)] uppercase">
            {copy.eyebrow}
          </p>
          <h1 className="mt-6 font-semibold text-balance">{copy.claim}</h1>
          <p className="mt-8 max-w-[44ch] text-lg text-[var(--ink-soft)]">
            {PROFILE.tagline[mode]}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={copy.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {mode === "client" ? <MessageCircle size={16} strokeWidth={1.75} /> : null}
              {copy.primaryCta.label}
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={copy.secondaryCta.href}
              target={copy.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <copy.secondaryCta.Icon size={16} strokeWidth={1.75} />
              {copy.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        <HeroGlassCard />
      </div>
    </section>
  );
}

function HeroGlassCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl p-8"
    >
      <SpecularDrift />
      <div className="relative">
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
          {PROFILE.handle}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">
          {PROFILE.name}
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">{PROFILE.location}</p>
      </div>

      <div className="relative grid grid-cols-2 gap-2 font-mono text-[0.65rem] tracking-tight">
        {PROFILE.stack.slice(0, 10).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-[var(--border-glass)] bg-[var(--surface-glass)] px-2 py-1 text-[var(--ink-soft)] backdrop-blur"
          >
            {tech.toLowerCase()}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SpecularDrift() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 30% 10%, var(--specular), transparent 60%)",
        animation: "specular-drift 8s cubic-bezier(0.25,1,0.5,1) infinite alternate",
      }}
    />
  );
}

function DrenchAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[-20%] left-[-10%] h-[70vh] w-[70vh] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute right-[-15%] bottom-[-20%] h-[65vh] w-[65vh] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--drench-text) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
