"use client";

import { motion } from "motion/react";
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "@/components/icons/brand-icons";
import { Mail, MapPin } from "lucide-react";
import { CONTACTS, PROFILE } from "@/lib/site-data";
import { AsciiSignature } from "@/components/primitives/ascii-signature";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";
import { PixelAvatar } from "@/components/hero/pixel-avatar";
import { easeOutExpo } from "@/lib/motion/variants";

const NAV = [
  { label: "Hero", href: "#" },
  { label: "Quién", href: "#who" },
  { label: "Casos", href: "#projects" },
  { label: "Proceso", href: "#process" },
  { label: "GitHub", href: "#github" },
  { label: "Lab", href: "#lab" },
  { label: "Notas", href: "#notes" },
  { label: "Contacto", href: "#contact" },
];

const SITE_VERSION = "v2.0.0";

function ScrambleEmail({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="relative inline-block py-1 text-[var(--drench-text-soft)] hover:text-[var(--drench-text)] transition-colors group/email"
    >
      <span className="relative z-10">
        <ScrambleText text={email} trigger="hover" />
      </span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current scale-x-0 group-hover/email:scale-x-100 origin-left transition-transform duration-500 ease-out" />
    </a>
  );
}

function LiveDataStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-4 sm:gap-4">
      <RuntimeBadge label="uptime · 99.9%" tone="ok" pulse />
      <RuntimeBadge label="last deploy · today" tone="muted" />
      <RuntimeBadge label="region · BA" tone="muted" />
      <RuntimeBadge label={`build · ${SITE_VERSION}`} tone="muted" />
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  const socials: Array<{
    Icon: typeof GithubIcon;
    label: string;
    href: string;
  }> = [];

  if (CONTACTS.github) socials.push({ Icon: GithubIcon, label: "GitHub", href: CONTACTS.github });
  if (CONTACTS.linkedin)
    socials.push({ Icon: LinkedinIcon, label: "LinkedIn", href: CONTACTS.linkedin });
  if (CONTACTS.twitter) socials.push({ Icon: TwitterIcon, label: "X", href: CONTACTS.twitter });
  if (CONTACTS.whatsapp)
    socials.push({
      Icon: WhatsappIcon,
      label: "WhatsApp",
      href: `https://wa.me/${CONTACTS.whatsapp}`,
    });

  return (
    <footer className="zone-drench relative overflow-hidden">
      <FooterAmbient />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32">
        <p className="mb-4 font-mono text-[0.65rem] tracking-[0.18em] uppercase opacity-60">
          [ system.session.end ]
        </p>

        <div className="flex items-start gap-5">
          <div className="shrink-0 pt-1">
            <PixelAvatar size={56} />
          </div>

          <a
            href={`mailto:${CONTACTS.email}`}
            aria-label={`Mandarme un email a ${CONTACTS.email}`}
            className="group min-w-0 block"
            data-cursor="reticle"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: easeOutExpo }}
            >
              <AsciiSignature
                variant="big"
                className="text-[var(--drench-text)] transition-opacity duration-300 group-hover:opacity-90"
              />
            </motion.div>
            <p className="mt-2 font-mono text-xs tracking-[0.1em] text-[var(--drench-text-soft)] uppercase opacity-70">
              robertino.dev · ./rober8b
            </p>
          </a>
        </div>

        <div className="mt-6 max-w-prose-tight font-mono text-sm tracking-[0.04em] opacity-70 sm:text-base">
          <ScrambleEmail email={CONTACTS.email} />
        </div>

        <div className="mt-10 border-y border-[var(--border-glass)] py-5">
          <LiveDataStrip />
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div className="space-y-3 text-sm">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-60">
              navegación
            </p>
            <ul className="grid grid-cols-2 gap-y-1.5 sm:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[var(--drench-text-soft)] transition-colors hover:text-[var(--drench-text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-60">
              canales directos
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="inline-flex items-center gap-2 text-[var(--drench-text-soft)] transition-colors hover:text-[var(--drench-text)]"
                >
                  <Mail size={13} strokeWidth={1.75} />
                  {CONTACTS.email}
                </a>
              </li>
              {socials.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--drench-text-soft)] transition-colors hover:text-[var(--drench-text)]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                </li>
              ))}
              {socials.length === 0 && (
                <li className="font-mono text-[0.65rem] text-[var(--drench-text-soft)] opacity-60">
                  más canales pendientes
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-60">
              construido con
            </p>
            <ul className="space-y-1.5 text-[var(--drench-text-soft)]">
              <li>Next.js 16 · Tailwind v4</li>
              <li>shadcn/ui · motion · OKLCH</li>
              <li>Liquid Glass system</li>
              <li>
                <a
                  href="https://github.com/rober8b/portfolio-robertino"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  open source on github →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border-glass)] pt-6 font-mono text-[0.65rem] tracking-[0.08em] uppercase opacity-70 sm:flex-row sm:items-center">
          <p className="inline-flex items-center gap-2">
            <MapPin size={11} strokeWidth={1.75} />
            {PROFILE.location}
          </p>
          <p>
            © {year} {PROFILE.name} · {SITE_VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute top-[-30%] right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--drench-bg-deeper) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-40%] left-[-15%] h-[70vh] w-[70vh] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 50) 0%, transparent 70%)",
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
  );
}
