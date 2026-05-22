import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "@/components/icons/brand-icons";
import { Mail, MapPin } from "lucide-react";
import { CONTACTS, PROFILE } from "@/lib/site-data";

const NAV = [
  { label: "Hero", href: "#" },
  { label: "Proyectos", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contacto", href: "#contact" },
];

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
        <a
          href={`mailto:${CONTACTS.email}`}
          className="group block font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9] font-semibold tracking-[-0.04em]"
        >
          robertino<span className="opacity-50">.dev</span>
          <span className="block text-[0.4em] font-mono tracking-[0.05em] opacity-70 mt-3 group-hover:opacity-100 transition-opacity">
            {CONTACTS.email} →
          </span>
        </a>

        <div className="mt-16 grid gap-10 border-t border-[var(--border-glass)] pt-10 sm:grid-cols-3">
          <div className="space-y-3 text-sm">
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-60">
              navegación
            </p>
            <ul className="space-y-1.5">
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
            © {year} {PROFILE.name} · todos los derechos reservados
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
