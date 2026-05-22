"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Mail, MapPin } from "lucide-react";
import { useMode } from "@/components/mode/mode-provider";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { CONTACTS, PROFILE } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

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
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 lg:p-10"
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
              className="group inline-flex items-center gap-2 rounded-full bg-[oklch(0.62_0.18_145)] px-6 py-3.5 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" />
              Escribime ahora
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : (
            <DisabledCta label="Esperando número de WhatsApp" />
          )}
          <a
            href={`mailto:${CONTACTS.email}`}
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={14} strokeWidth={1.75} />
            o mandame mail
          </a>
        </div>
      </motion.div>
    );
  }

  // Dev mode
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 lg:p-10"
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
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-base font-medium text-[var(--surface)] transition-transform duration-300 hover:-translate-y-0.5"
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
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Calendar size={14} strokeWidth={1.75} />
            agendar 30 min
          </a>
        ) : (
          <DisabledCta label="Cal.com — esperando link" />
        )}
      </div>
    </motion.div>
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
      transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="divide-y divide-[var(--border-glass-dark)] overflow-hidden rounded-3xl border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] backdrop-blur"
    >
      <li className="px-5 py-3">
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
              className="group flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-[oklch(0.99_0.005_55/0.5)]"
            >
              <span className="flex items-center gap-3 text-sm text-[var(--ink)]">
                <Icon size={16} strokeWidth={1.75} className="text-[var(--ink-soft)]" />
                <span className="font-medium">{label}</span>
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.7rem] text-[var(--ink-soft)]">
                {value}
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.75}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
            </a>
          ) : (
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
                <Icon size={16} strokeWidth={1.75} className="opacity-40" />
                <span className="font-medium opacity-70">{label}</span>
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-40">
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
        "inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--border-glass-dark)] px-5 py-3.5 text-sm text-[var(--ink-soft)] opacity-70",
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
