import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Code2,
  GitBranch,
  Home,
  Mail,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/icons/brand-icons";
import { CONTACTS } from "@/lib/site-data";
import type { Mode } from "@/components/mode/mode-provider";

export type CommandAction =
  | { kind: "navigate"; href: string; external?: boolean }
  | { kind: "scroll"; anchor: string }
  | { kind: "switch-mode"; to: Mode }
  | { kind: "theme"; to: "light" | "dark" | "auto" };

export type CommandEntry = {
  id: string;
  label: string;
  group: "navegar" | "modo" | "tema" | "contacto" | "secreto";
  keywords: string[];
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;
  action: CommandAction;
  hint?: string;
};

export const COMMANDS: CommandEntry[] = [
  // Navegación
  {
    id: "go-home",
    label: "Ir al inicio",
    group: "navegar",
    keywords: ["home", "inicio", "hero", "top", "arriba"],
    Icon: Home,
    action: { kind: "navigate", href: "/" },
  },
  {
    id: "go-projects",
    label: "Ir a proyectos",
    group: "navegar",
    keywords: ["proyectos", "projects", "casos", "work", "trabajo"],
    Icon: Briefcase,
    action: { kind: "scroll", anchor: "projects" },
  },
  {
    id: "go-github",
    label: "Ir a GitHub Activity",
    group: "navegar",
    keywords: ["github", "actividad", "heatmap", "commits", "code"],
    Icon: GitBranch,
    action: { kind: "scroll", anchor: "github" },
  },
  {
    id: "go-contact",
    label: "Ir a Contacto",
    group: "navegar",
    keywords: ["contacto", "contact", "hablar", "escribir"],
    Icon: Mail,
    action: { kind: "scroll", anchor: "contact" },
  },
  {
    id: "go-manifesto",
    label: "Manifesto del Marketplace",
    group: "navegar",
    keywords: ["manifesto", "marketplace", "agentic", "saas", "leer"],
    Icon: Sparkles,
    action: { kind: "navigate", href: "/marketplace" },
    hint: "long-read",
  },

  // Modo
  {
    id: "mode-dev",
    label: "Modo Dev",
    group: "modo",
    keywords: ["dev", "developer", "tecnico", "tech", "code"],
    Icon: Code2,
    action: { kind: "switch-mode", to: "dev" },
    hint: "stack y sistemas",
  },
  {
    id: "mode-client",
    label: "Modo Cliente",
    group: "modo",
    keywords: ["cliente", "client", "negocio", "business", "pyme"],
    Icon: MessageCircle,
    action: { kind: "switch-mode", to: "client" },
    hint: "qué te puedo construir",
  },

  // Tema
  {
    id: "theme-light",
    label: "Tema claro",
    group: "tema",
    keywords: ["claro", "light", "dia", "blanco"],
    Icon: Sun,
    action: { kind: "theme", to: "light" },
  },
  {
    id: "theme-dark",
    label: "Tema oscuro",
    group: "tema",
    keywords: ["oscuro", "dark", "noche", "negro"],
    Icon: Moon,
    action: { kind: "theme", to: "dark" },
  },
  {
    id: "theme-auto",
    label: "Tema sistema (auto)",
    group: "tema",
    keywords: ["auto", "sistema", "system"],
    Icon: User,
    action: { kind: "theme", to: "auto" },
  },

  // Contacto directo
  {
    id: "open-email",
    label: "Mandarme un mail",
    group: "contacto",
    keywords: ["mail", "email", "correo", "escribir"],
    Icon: Mail,
    action: { kind: "navigate", href: `mailto:${CONTACTS.email}`, external: false },
    hint: CONTACTS.email,
  },
  {
    id: "open-github",
    label: "Abrir GitHub @rober8b",
    group: "contacto",
    keywords: ["github", "repo", "open source", "rober8b"],
    Icon: GithubIcon,
    action: { kind: "navigate", href: CONTACTS.github, external: true },
  },
  ...(CONTACTS.linkedin
    ? ([
        {
          id: "open-linkedin",
          label: "Abrir LinkedIn",
          group: "contacto",
          keywords: ["linkedin", "profesional", "cv"],
          Icon: LinkedinIcon,
          action: { kind: "navigate", href: CONTACTS.linkedin, external: true },
        },
      ] as CommandEntry[])
    : []),
  ...(CONTACTS.twitter
    ? ([
        {
          id: "open-twitter",
          label: "Abrir X / Twitter",
          group: "contacto",
          keywords: ["twitter", "x", "tweet", "social"],
          Icon: TwitterIcon,
          action: { kind: "navigate", href: CONTACTS.twitter, external: true },
        },
      ] as CommandEntry[])
    : []),
  ...(CONTACTS.whatsapp
    ? ([
        {
          id: "open-whatsapp",
          label: "WhatsApp ahora",
          group: "contacto",
          keywords: ["whatsapp", "wa", "wpp", "mensaje", "chat"],
          Icon: WhatsappIcon,
          action: {
            kind: "navigate",
            href: `https://wa.me/${CONTACTS.whatsapp}`,
            external: true,
          },
        },
      ] as CommandEntry[])
    : []),
  ...(CONTACTS.cal
    ? ([
        {
          id: "open-cal",
          label: "Reservar 30 min · Cal.com",
          group: "contacto",
          keywords: ["cal", "calendar", "reunion", "meeting", "agendar", "discovery"],
          Icon: Calendar,
          action: { kind: "navigate", href: CONTACTS.cal, external: true },
        },
      ] as CommandEntry[])
    : []),
];

const COMMAND_PREFIX = /^[>/]/;

export function isCommandQuery(raw: string): boolean {
  return COMMAND_PREFIX.test(raw.trim());
}

export function rankCommands(query: string, mode: Mode): CommandEntry[] {
  const cleaned = query.trim().replace(COMMAND_PREFIX, "").toLowerCase();
  if (!cleaned) return COMMANDS;

  return COMMANDS.map((cmd) => {
    const haystack = `${cmd.label} ${cmd.keywords.join(" ")}`.toLowerCase();
    let score = 0;
    for (const term of cleaned.split(/\s+/)) {
      if (!term) continue;
      if (haystack.includes(term)) score += 2;
      if (cmd.id.toLowerCase().includes(term)) score += 1;
    }
    // Modo-aware boost: in cliente mode push contact commands up
    if (mode === "client" && cmd.group === "contacto") score += 0.5;
    return { cmd, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.cmd);
}

export function runCommand(
  action: CommandAction,
  ctx: { setMode: (m: Mode) => void; close: () => void },
) {
  switch (action.kind) {
    case "navigate": {
      if (typeof window === "undefined") return;
      if (action.external) {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = action.href;
      }
      ctx.close();
      return;
    }
    case "scroll": {
      if (typeof window === "undefined") return;
      const el = document.getElementById(action.anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = `/#${action.anchor}`;
      }
      ctx.close();
      return;
    }
    case "switch-mode": {
      ctx.setMode(action.to);
      ctx.close();
      return;
    }
    case "theme": {
      if (typeof window === "undefined") return;
      const root = document.documentElement;
      if (action.to === "auto") {
        root.removeAttribute("data-theme");
        window.localStorage.removeItem("rober.theme");
      } else {
        root.setAttribute("data-theme", action.to);
        window.localStorage.setItem("rober.theme", action.to);
      }
      ctx.close();
      return;
    }
  }
}

export function loadInitialTheme() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem("rober.theme");
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }
}
