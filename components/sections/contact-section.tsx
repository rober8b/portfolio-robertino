"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Mail, MapPin, Sparkles } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import { GithubIcon } from "@/components/icons/brand-icons";
import { StartSessionPrompt } from "@/components/contact/start-session-prompt";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { AsciiFrame } from "@/components/primitives/ascii-frame";
import { CONTACTS, PROFILE } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const HEADER = {
  dev: {
    eyebrow: "$ start_session · available",
    title: (
      <>
        Empezamos a construir <br className="hidden sm:inline" />
        juntos.
      </>
    ),
    description:
      "Colaboración técnica, side-projects, consulting agéntico, o solo charlar sobre LATAM tech — abrí la sesión y elegí canal.",
  },
  client: {
    eyebrow: "$ start_session · contestá en el día",
    title: (
      <>
        Arrancamos cuando <br className="hidden sm:inline" />
        vos quieras.
      </>
    ),
    description:
      "Hablamos qué necesitás, te mando presupuesto sin compromiso, y arrancamos. Sin formularios, sin filtros, sin intermediarios.",
  },
} as const;

export function ContactSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AsciiHeading
          command={mode === "dev" ? "start_session · available" : "start_session · contestá en el día"}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[5fr_4fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <StartSessionPrompt mode={mode} />
            <AskTeaser className="mt-4 px-1" mode={mode} />
          </motion.div>

          <ChannelsList mode={mode} />
        </div>
      </div>
    </section>
  );
}

function AskTeaser({ className, mode }: { className?: string; mode: "dev" | "client" }) {
  const { setOpen } = useAskPalette();
  const label =
    mode === "dev"
      ? "¿Dudas técnicas? Preguntale al asistente del portfolio."
      : "¿Tenés dudas? Preguntale al asistente, responde al toque.";
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group inline-flex items-center gap-2 text-xs text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]",
        className,
      )}
    >
      <Sparkles size={13} strokeWidth={1.75} className="text-[var(--amber)]" />
      <span className="underline-offset-4 group-hover:underline">{label}</span>
      <ArrowUpRight
        size={12}
        strokeWidth={1.75}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}

function ChannelsList({ mode }: { mode: "dev" | "client" }) {
  // Brief said: simplified to 3 lines (email, GitHub, calendar). Mode-aware for primary.
  const channels: Array<{
    Icon: IconComponent;
    label: string;
    value: string;
    href: string | null;
  }> = [
    {
      Icon: Mail,
      label: mode === "dev" ? "Mail directo" : "Mail",
      value: CONTACTS.email,
      href: `mailto:${CONTACTS.email}`,
    },
    {
      Icon: GithubIcon,
      label: "GitHub",
      value: `@${PROFILE.handle}`,
      href: CONTACTS.github,
    },
    {
      Icon: Calendar,
      label: "Cal.com",
      value: CONTACTS.cal ? "30 min call" : "pendiente",
      href: CONTACTS.cal || null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.05, ease: easeOutExpo }}
      className="h-fit"
    >
      <AsciiFrame label="direct.channels" tone="accent" innerClassName="p-0">
        <ul className="divide-y divide-[var(--border-glass-dark)]">
          <li className="px-6 py-4 sm:px-7">
        <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
          <MapPin size={11} strokeWidth={1.75} />
          {PROFILE.location}
        </p>
      </li>
          {channels.map(({ Icon, label, value, href }) => (
            <li key={label}>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[oklch(0.99_0.005_55/0.5)] sm:px-7"
                >
                  <span className="flex min-w-0 items-center gap-3 text-sm text-[var(--ink)]">
                    <Icon size={15} strokeWidth={1.75} className="shrink-0 text-[var(--ink-soft)]" />
                    <span className="truncate font-medium">{label}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[0.7rem] text-[var(--ink-soft)]">
                    <span className="truncate">{value}</span>
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.75}
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-7">
                  <span className="flex min-w-0 items-center gap-3 text-sm text-[var(--ink-soft)]">
                    <Icon size={15} strokeWidth={1.75} className="shrink-0 opacity-40" />
                    <span className="truncate font-medium opacity-70">{label}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-40">
                    {value}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </AsciiFrame>
    </motion.div>
  );
}
