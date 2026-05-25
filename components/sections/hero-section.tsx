"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { useMode } from "@/components/mode/mode-provider";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import { MicroGrid } from "@/components/ambient/micro-grid";
import { BootSequence } from "@/components/ambient/boot-sequence";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { PROFILE } from "@/lib/site-data";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

type ModeCopy = {
  eyebrow: string;
  words: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; Icon: IconComponent };
  askPrompt: string;
};

const COPY: Record<"dev" | "client", ModeCopy> = {
  dev: {
    eyebrow: "freelance · buenos aires · disponible",
    words: ["AI", "Builder", "y", "Web", "Developer"],
    primaryCta: { label: "Ver Marketplace agéntico", href: "#projects" },
    secondaryCta: { label: "github.com/rober8b", href: PROFILE.github, Icon: GithubIcon },
    askPrompt: "o preguntale directo al asistente",
  },
  client: {
    eyebrow: "freelance · buenos aires · agendá una llamada",
    words: ["Te", "armo", "tu", "web,", "tu", "tienda", "online", "o", "tu", "app."],
    primaryCta: { label: "Pedí presupuesto por WhatsApp", href: "#contact" },
    secondaryCta: { label: "Ver casos", href: "#projects", Icon: ArrowUpRight },
    askPrompt: "o preguntá lo que necesites al asistente",
  },
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO },
  }),
};

type HeroSectionProps = {
  runtimePanel?: ReactNode;
};

export function HeroSection({ runtimePanel }: HeroSectionProps = {}) {
  const { mode } = useMode();
  const { setOpen } = useAskPalette();
  const copy = COPY[mode];

  return (
    <section className="zone-drench relative flex items-center overflow-hidden px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-16">
      <DrenchAmbient />
      <BottomGradient />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <motion.div
          key={`hero-text-${mode}`}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          <motion.div custom={0} variants={wordVariants} className="mb-4">
            <RuntimeBadge label="./rober8b · connected" tone="ok" pulse />
          </motion.div>

          <motion.p
            custom={0}
            variants={wordVariants}
            className="font-mono text-xs tracking-[0.08em] text-[var(--drench-text-soft)] uppercase"
          >
            <ScrambleText text={copy.eyebrow} trigger="mount" />
          </motion.p>

          <h1 className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-semibold text-balance">
            {copy.words.map((word, i) => (
              <motion.span
                key={`${mode}-${i}-${word}`}
                custom={i + 1}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            custom={copy.words.length + 1}
            variants={wordVariants}
            className="mt-8 max-w-[44ch] text-lg text-[var(--drench-text)] sm:text-xl"
          >
            {PROFILE.tagline[mode]}
          </motion.p>

          <motion.div
            custom={copy.words.length + 2}
            variants={wordVariants}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={copy.primaryCta.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[var(--drench-text)] px-5 py-3 text-sm font-medium text-[var(--drench-bg)] transition-transform duration-300 hover:-translate-y-0.5"
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
              className="glass inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-[var(--drench-text)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <copy.secondaryCta.Icon size={16} strokeWidth={1.75} />
              {copy.secondaryCta.label}
            </a>
          </motion.div>

          <motion.button
            custom={copy.words.length + 3}
            variants={wordVariants}
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-6 inline-flex w-fit items-center gap-2 text-sm text-[var(--drench-text-soft)] transition-colors hover:text-[var(--drench-text)]"
          >
            <Sparkles size={14} strokeWidth={1.75} className="text-[var(--amber)]" />
            <span className="underline-offset-4 group-hover:underline">{copy.askPrompt}</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="relative"
        >
          {runtimePanel ?? <HeroGlassCard />}
          <BootSequence />
        </motion.div>
      </div>
    </section>
  );
}

function HeroGlassCard() {
  return (
    <div>
      <div className="glass-strong relative flex aspect-[5/6] flex-col justify-between overflow-hidden rounded-lg p-7 lg:p-8">
        <SpecularDrift />
        <div className="relative">
          <span className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--drench-text-soft)] uppercase">
            {PROFILE.handle}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--drench-text)]">
            {PROFILE.name}
          </h2>
          <p className="mt-2 text-sm text-[var(--drench-text-soft)]">{PROFILE.location}</p>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } },
          }}
          className="relative grid grid-cols-2 gap-2 font-mono text-[0.65rem] tracking-tight"
        >
          {PROFILE.stack.slice(0, 10).map((tech) => (
            <motion.li
              key={tech}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
              }}
              className="rounded-md border border-[var(--drench-border)] bg-[var(--drench-glass-bg)] px-2 py-1 text-[var(--drench-text-soft)] backdrop-blur"
            >
              {tech.toLowerCase()}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-[var(--drench-text)]">
      {/* Warm radial top-left — keeps the persimmon punch */}
      <div
        className="absolute top-[-20%] left-[-10%] h-[70vh] w-[70vh] rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
        }}
      />
      {/* Bright sun-flare middle-right — was the only depth move; kept */}
      <div
        className="absolute right-[-15%] bottom-[-5%] h-[55vh] w-[55vh] rounded-full opacity-45 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
        }}
      />
      {/* Burnt-umber dark radial bottom-right — adds nighttime depth instead of more orange */}
      <div
        className="absolute right-[-20%] bottom-[-25%] h-[80vh] w-[80vh] rounded-full opacity-55 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.18 0.07 30) 0%, transparent 60%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* 16x16 micro-grid replaces the old dot pattern */}
      <MicroGrid size={16} opacity={0.05} />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-48 z-[5]"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, oklch(0.55 0.22 32) 55%, var(--surface) 100%)",
      }}
    />
  );
}
