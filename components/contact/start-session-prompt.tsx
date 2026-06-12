"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/brand-icons";
import { CONTACTS } from "@/lib/site-data";
import { easeOutExpo } from "@/lib/motion/variants";

type Mode = "dev" | "client";
type State = "idle" | "accepted" | "aborted";

const COPY: Record<Mode, {
  command: string;
  systemLines: string[];
  prompt: string;
  acceptedLine: string;
  abortedLine: string;
}> = {
  dev: {
    command: "$ start_session --with=rober8b --mode=collab",
    systemLines: ["> matching channels...", "> ready."],
    prompt: "initialize collaboration? [Y/n]:",
    acceptedLine: "> session initialized. canales abiertos abajo.",
    abortedLine: "> session aborted. catch you next time.",
  },
  client: {
    command: "$ start_session --with=rober8b --mode=client",
    systemLines: ["> conectando canales...", "> listo."],
    prompt: "¿arrancamos? [Y/n]:",
    acceptedLine: "> sesión activa. elegí cómo escribirme abajo.",
    abortedLine: "> sesión cancelada. cuando quieras, escribime.",
  },
};

export function StartSessionPrompt({ mode }: { mode: Mode }) {
  const [state, setState] = useState<State>("idle");
  const reduced = useReducedMotion();
  const copy = COPY[mode];

  const accept = useCallback(() => setState("accepted"), []);
  const abort = useCallback(() => setState("aborted"), []);
  const reset = useCallback(() => setState("idle"), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (state !== "idle") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      if (k === "y" || k === "enter") {
        e.preventDefault();
        accept();
      } else if (k === "n" || k === "escape") {
        e.preventDefault();
        abort();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, accept, abort]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a]">
      {/* terminal title bar — Mac dots conservados, fondo dark */}
      <header className="flex items-center gap-1.5 border-b border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
        <span className="ml-2 font-mono text-[0.6rem] tracking-tight text-[oklch(0.72_0.012_40)] opacity-80">
          rober8b@portfolio · /contact
        </span>
      </header>

      <div className="space-y-1.5 px-5 py-6 font-mono text-[0.8rem] leading-relaxed sm:px-7 sm:py-8">
        <p className="text-[#ff4000]">{copy.command}</p>
        {copy.systemLines.map((line) => (
          <p key={line} className="text-[oklch(0.72_0.012_40)] opacity-80">{line}</p>
        ))}

        {state === "idle" ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
            <span className="text-white">{copy.prompt}</span>
            <span aria-hidden className="inline-block h-3.5 w-1.5 animate-pulse bg-[var(--amber)] align-middle" />
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={accept}
                className="inline-flex items-center gap-1 rounded-sm bg-[#ff4000] px-2.5 py-1 text-[0.7rem] font-medium text-white transition-transform hover:-translate-y-0.5"
                aria-label="Aceptar"
              >
                <span className="font-mono">Y</span>
              </button>
              <button
                type="button"
                onClick={abort}
                className="inline-flex items-center gap-1 rounded-sm border border-[oklch(1_0_0/0.14)] px-2.5 py-1 text-[0.7rem] text-[oklch(0.72_0.012_40)] transition-colors hover:text-white"
                aria-label="Cancelar"
              >
                <span className="font-mono">n</span>
              </button>
            </div>
          </div>
        ) : null}

        {state === "accepted" ? (
          <p className="pt-2 text-[#ff4000]">{copy.acceptedLine}</p>
        ) : null}

        {state === "aborted" ? (
          <div className="flex items-center justify-between pt-2">
            <p className="text-[oklch(0.72_0.012_40)] opacity-80">{copy.abortedLine}</p>
            <button
              type="button"
              onClick={reset}
              className="font-mono text-[0.65rem] text-[oklch(0.72_0.012_40)] underline-offset-2 hover:text-[#ff4000] hover:underline"
            >
              reintentar
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {state === "accepted" ? (
          <motion.div
            key="channels"
            initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="overflow-hidden border-t border-[oklch(1_0_0/0.08)]"
          >
            <ExpandedChannels mode={mode} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ExpandedChannels({ mode }: { mode: Mode }) {
  const wa = CONTACTS.whatsapp
    ? `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(CONTACTS.whatsappPrefill[mode])}`
    : null;

  const primary = mode === "client"
    ? { href: wa, label: "WhatsApp directo", Icon: WhatsappIcon, tone: "green" as const }
    : { href: `mailto:${CONTACTS.email}`, label: CONTACTS.email, Icon: Mail, tone: "ink" as const };

  return (
    <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
      {primary.href ? (
        <a
          href={primary.href}
          target={primary.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className={`group inline-flex items-center justify-between gap-2 rounded-md px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
            primary.tone === "green"
              ? "bg-[oklch(0.62_0.18_145)] text-white"
              : "bg-[#ff4000] text-white"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <primary.Icon className="h-4 w-4" />
            {primary.label}
          </span>
          <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}

      {CONTACTS.cal ? (
        <a
          href={CONTACTS.cal}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between gap-2 rounded-md border border-[oklch(1_0_0/0.14)] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff4000] hover:text-[#ff4000]"
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" strokeWidth={1.75} />
            agendar 30 min
          </span>
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </a>
      ) : null}

      {mode === "dev" && wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-between gap-2 rounded-md border border-[oklch(1_0_0/0.14)] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff4000] hover:text-[#ff4000] sm:col-span-2"
        >
          <span className="inline-flex items-center gap-2">
            <WhatsappIcon className="h-4 w-4" />
            o WhatsApp directo
          </span>
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </a>
      ) : null}

      {mode === "client" ? (
        <a
          href={`mailto:${CONTACTS.email}`}
          className="inline-flex items-center justify-between gap-2 rounded-md border border-[oklch(1_0_0/0.14)] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-[#ff4000] hover:text-[#ff4000] sm:col-span-2"
        >
          <span className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            o mandame mail
          </span>
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </a>
      ) : null}
    </div>
  );
}
