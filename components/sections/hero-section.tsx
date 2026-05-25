"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { useMode } from "@/components/mode/mode-provider";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import { BootSequence } from "@/components/ambient/boot-sequence";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { AsciiTorus } from "@/components/hero/ascii-torus";
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

export function HeroSection() {
  const { mode } = useMode();
  const { setOpen } = useAskPalette();
  const copy = COPY[mode];

  return (
    <section className="zone-night relative flex items-center overflow-hidden px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
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
              className="group inline-flex items-center gap-2 rounded-lg border border-[#ff4000] px-5 py-3 text-sm font-medium text-[#ff4000] transition-colors duration-300 hover:bg-[#ff4000] hover:text-[#0a0a0a]"
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
              className="group inline-flex items-center gap-2 rounded-lg border border-[#ff4000] px-5 py-3 text-sm font-medium text-[#ff4000] transition-colors duration-300 hover:bg-[#ff4000] hover:text-[#0a0a0a]"
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }}
          className="relative flex items-center justify-center"
        >
          <AsciiTorus className="block w-full" />
          <BootSequence />
        </motion.div>
      </div>
    </section>
  );
}
