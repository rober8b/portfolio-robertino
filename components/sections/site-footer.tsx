import { CONTACTS, PROFILE } from "@/lib/site-data";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";

const NAV = [
  { label: "casos", href: "#projects" },
  { label: "testimonios", href: "#feedback" },
  { label: "proceso", href: "#process" },
  { label: "github", href: "#github" },
  { label: "lab", href: "#lab" },
  { label: "notas", href: "#notes" },
  { label: "contacto", href: "#contact" },
];

function shortSha(): string {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  if (sha && sha.length >= 7) return sha.slice(0, 7);
  return "dev";
}

function deployDate(): string {
  const ts = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP;
  if (!ts) return "—";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "—";
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const sha = shortSha();
  const deploy = deployDate();

  const channels: Array<{ label: string; href: string }> = [];
  if (CONTACTS.github) channels.push({ label: "github", href: CONTACTS.github });
  if (CONTACTS.twitter) channels.push({ label: "x", href: CONTACTS.twitter });
  if (CONTACTS.linkedin) channels.push({ label: "linkedin", href: CONTACTS.linkedin });
  if (CONTACTS.email) channels.push({ label: "email", href: `mailto:${CONTACTS.email}` });

  return (
    <footer className="relative border-t border-[oklch(1_0_0/0.08)] bg-[#0a0a0a]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">
          <div className="space-y-3">
            <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
              identidad
            </p>
            <div className="space-y-1">
              <p className="font-display text-base font-semibold text-white">
                {PROFILE.name}
              </p>
              <p className="font-mono text-[0.72rem] text-[oklch(0.86_0.01_40)]">
                freelance dev · {PROFILE.location.split(",")[0]}
              </p>
            </div>
            <div className="pt-2">
              <RuntimeBadge label="available · connected" tone="ok" pulse />
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
              navegación
            </p>
            <ul className="space-y-1.5 font-mono text-[0.78rem]">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[oklch(0.86_0.01_40)] transition-colors hover:text-[#ff4000]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
              contacto
            </p>
            <ul className="space-y-1.5 font-mono text-[0.78rem]">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-[oklch(0.86_0.01_40)] transition-colors hover:text-[#ff4000]"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[oklch(1_0_0/0.08)] pt-5 font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80 sm:flex-row sm:items-center">
          <p>
            © {year} {PROFILE.name}
          </p>
          <p className="inline-flex items-center gap-2">
            <span>v{sha}</span>
            <span aria-hidden className="opacity-40">·</span>
            <span>last deploy {deploy}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
