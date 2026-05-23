"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Calendar, Mail, MapPin, Sparkles } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { CONTACTS, PROFILE } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const HEADER = {
  dev: {
    eyebrow: "contacto · disponible",
    title: (
      <>
        Hablamos por mail, <br className="hidden sm:inline" />
        agendamos en Cal, o me ping en GitHub.
      </>
    ),
    description:
      "Si querés colaborar en algo agéntico, sumarme a un proyecto o solo charlar sobre LATAM tech, escribime.",
  },
  client: {
    eyebrow: "contacto · contestá en el día",
    title: (
      <>
        ¿Arrancamos? <br className="hidden sm:inline" />
        Mandame un WhatsApp.
      </>
    ),
    description:
      "Te respondo en el día. Charlamos qué necesitás, te mando presupuesto sin compromiso, y arrancamos cuando vos quieras.",
  },
} as const;

export function ContactSection() {
  const { mode } = useMode();
  const copy = HEADER[mode];

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-3xl"
        >
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]">
            {copy.description}
          </p>
        </motion.header>

        <div className="mt-16 grid gap-6 lg:grid-cols-[5fr_4fr]">
          <PrimaryCard mode={mode} />
          <ChannelsList mode={mode} />
        </div>
      </div>
    </section>
  );
}

function PrimaryCard({ mode }: { mode: "dev" | "client" }) {
  if (mode === "client") {
    const wa = CONTACTS.whatsapp
      ? `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(CONTACTS.whatsappPrefill.client)}`
      : null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        whileHover={{ y: -2 }}
        className="glass group/card relative flex flex-col justify-between overflow-hidden rounded-lg p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_oklch(0.62_0.18_145/0.55)] lg:p-10"
      >
        <SpecularBackdrop />
        <div className="relative">
          <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
            primer mensaje
          </p>
          <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            WhatsApp directo.
          </h3>
          <p className="mt-3 max-w-prose-tight text-base text-[var(--ink-soft)]">
            Sin formulario, sin filtros. Te respondo personalmente.
          </p>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-3">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[oklch(0.62_0.18_145)] px-6 py-3.5 text-base font-medium text-white shadow-[0_12px_28px_-12px_oklch(0.62_0.18_145/0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_oklch(0.62_0.18_145/0.75)]"
            >
              <span className="shimmer-overlay absolute inset-0" />
              <WhatsappIcon className="relative h-4 w-4" />
              <span className="relative">Escribime ahora</span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : (
            <DisabledCta label="Esperando número de WhatsApp" />
          )}
          <a
            href={`mailto:${CONTACTS.email}`}
            className="glass inline-flex items-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={14} strokeWidth={1.75} />
            o mandame mail
          </a>
        </div>

        <AskTeaser className="relative mt-6" mode={mode} />
      </motion.div>
    );
  }

  // Dev mode
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      whileHover={{ y: -2 }}
      className="glass relative flex flex-col justify-between overflow-hidden rounded-lg p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_oklch(0.22_0.025_30/0.4)] lg:p-10"
    >
      <SpecularBackdrop />
      <div className="relative">
        <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
          primer mensaje
        </p>
        <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          Mail o booking.
        </h3>
        <p className="mt-3 max-w-prose-tight text-base text-[var(--ink-soft)]">
          Para colaboración, side-projects o consulting agéntico — mail directo. Para una llamada
          específica, agendá un slot.
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${CONTACTS.email}`}
           className="group inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-6 py-3.5 text-base font-medium text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Mail size={16} strokeWidth={1.75} />
          {CONTACTS.email}
          <ArrowUpRight
            size={16}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        {CONTACTS.cal ? (
          <a
            href={CONTACTS.cal}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Calendar size={14} strokeWidth={1.75} />
            agendar 30 min
          </a>
        ) : (
          <DisabledCta label="Cal.com — esperando link" />
        )}
      </div>

      <AskTeaser className="relative mt-6" mode={mode} />
    </motion.div>
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
  const channels: Array<{
    Icon: IconComponent;
    label: string;
    value: string;
    href: string | null;
    hint?: string;
  }> = [
    {
      Icon: GithubIcon,
      label: "GitHub",
      value: `@${PROFILE.handle}`,
      href: CONTACTS.github,
    },
    {
      Icon: LinkedinIcon,
      label: "LinkedIn",
      value: CONTACTS.linkedin ? "robertino-barbuto" : "pendiente",
      href: CONTACTS.linkedin || null,
    },
    {
      Icon: TwitterIcon,
      label: mode === "dev" ? "X" : "X / Twitter",
      value: CONTACTS.twitter ? `@${PROFILE.handle}` : "pendiente",
      href: CONTACTS.twitter || null,
    },
    {
      Icon: WhatsappIcon,
      label: "WhatsApp",
      value: CONTACTS.whatsapp ? `+${CONTACTS.whatsapp}` : "pendiente",
      href: CONTACTS.whatsapp
        ? `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(CONTACTS.whatsappPrefill[mode])}`
        : null,
    },
    {
      Icon: Calendar,
      label: "Cal.com",
      value: CONTACTS.cal ? "30 min call" : "pendiente",
      href: CONTACTS.cal || null,
      hint: "videollamada",
    },
  ];

  return (
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_EXPO }}
      className="divide-y divide-[var(--border-glass-dark)] overflow-hidden rounded-lg border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] backdrop-blur"
    >
      <li className="px-6 py-4 sm:px-7">
        <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
          <MapPin size={11} strokeWidth={1.75} />
          {PROFILE.location}
        </p>
      </li>
      {channels.map(({ Icon, label, value, href, hint }) => (
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
                {hint ?? "pendiente"}
              </span>
            </div>
          )}
        </li>
      ))}
    </motion.ul>
  );
}

function DisabledCta({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-dashed border-[var(--border-glass-dark)] px-5 py-3.5 text-sm text-[var(--ink-soft)] opacity-70",
      )}
    >
      {label}
    </span>
  );
}

function SpecularBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 0%, var(--specular), transparent 60%)",
      }}
    />
  );
}
