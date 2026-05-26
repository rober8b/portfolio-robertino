"use client";

import { useEffect, useRef, useState } from "react";
import { MANIFESTO, PROFILE, PROJECTS } from "@/lib/site-data";

type LogEntry =
  | { kind: "prompt"; text: string }
  | { kind: "output"; text: string; tone?: "default" | "accent" | "muted" | "error" };

const HELP_TEXT = [
  "comandos disponibles:",
  "  whoami           → identidad",
  "  ls projects      → lista de proyectos",
  "  cat <slug>       → descripción del proyecto",
  "  cat manifesto    → manifesto",
  "  gh status        → focus actual",
  "  now              → fecha + región",
  "  echo <text>      → repite el input",
  "  theme            → muestra el tema actual",
  "  clear            → limpia el log",
  "  help             → este mensaje",
].join("\n");

const WELCOME: LogEntry[] = [
  { kind: "output", text: "rober8b@portfolio · /lab/terminal", tone: "muted" },
  { kind: "output", text: 'tip — escribí "help" para ver los comandos.', tone: "muted" },
];

function runCommand(raw: string): LogEntry[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
      return [{ kind: "output", text: HELP_TEXT }];

    case "whoami":
      return [
        { kind: "output", text: `${PROFILE.name} · ${PROFILE.handle}`, tone: "accent" },
        { kind: "output", text: PROFILE.location, tone: "muted" },
      ];

    case "ls": {
      if (rest[0] === "projects" || rest[0] === "projects/") {
        return [{ kind: "output", text: PROJECTS.map((p) => p.slug).join("\n") }];
      }
      return [{ kind: "output", text: "argumento esperado: projects", tone: "error" }];
    }

    case "cat": {
      if (!arg) return [{ kind: "output", text: "uso: cat <slug | manifesto>", tone: "error" }];
      if (arg === "manifesto") {
        return [{ kind: "output", text: MANIFESTO.dev.join("\n") }];
      }
      const project = PROJECTS.find((p) => p.slug === arg);
      if (!project) {
        return [{ kind: "output", text: `no encontrado: ${arg}`, tone: "error" }];
      }
      return [
        { kind: "output", text: `# ${project.name}`, tone: "accent" },
        { kind: "output", text: project.tagline.dev, tone: "muted" },
        { kind: "output", text: project.description.dev },
      ];
    }

    case "gh": {
      if (rest[0] === "status") {
        return [
          { kind: "output", text: `focus       · ${PROFILE.currentFocus}` },
          { kind: "output", text: `building    · ${PROFILE.currentlyBuilding}` },
          { kind: "output", text: `since       · ${PROFILE.startedAt}` },
        ];
      }
      return [{ kind: "output", text: "uso: gh status", tone: "error" }];
    }

    case "now": {
      const now = new Date();
      return [
        {
          kind: "output",
          text: `${now.toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })} · BA AR`,
        },
      ];
    }

    case "echo":
      return [{ kind: "output", text: arg }];

    case "theme":
      return [{ kind: "output", text: "tema actual: sunset persimmon (oklch 0.74 0.25 33)", tone: "accent" }];

    case "clear":
      return [{ kind: "output", text: "__CLEAR__" }];

    default:
      return [
        {
          kind: "output",
          text: `comando no encontrado: ${cmd}. escribí "help".`,
          tone: "error",
        },
      ];
  }
}

const TONE_CLASS: Record<NonNullable<Extract<LogEntry, { kind: "output" }>["tone"]>, string> = {
  default: "text-white",
  accent: "text-[#ff4000]",
  muted: "text-[oklch(0.72_0.012_40)] opacity-80",
  error: "text-[color:oklch(0.62_0.22_25)]",
};

type TerminalToyProps = {
  height?: number;
  className?: string;
};

export function TerminalToy({ height = 240, className }: TerminalToyProps) {
  const [log, setLog] = useState<LogEntry[]>(WELCOME);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    const next: LogEntry[] = [...log, { kind: "prompt", text: value }];
    const result = runCommand(value);
    setInput("");
    if (result.some((r) => r.kind === "output" && r.text === "__CLEAR__")) {
      setLog([]);
      return;
    }
    setLog([...next, ...result]);
  };

  return (
    <div
      className={`flex flex-col overflow-hidden bg-[#0a0a0a] font-mono text-[0.72rem] ${className ?? ""}`}
      style={{ height }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed [scrollbar-width:thin]">
        {log.map((entry, i) =>
          entry.kind === "prompt" ? (
            <p key={i}>
              <span className="text-[#ff4000] opacity-90">$ </span>
              <span className="text-white">{entry.text}</span>
            </p>
          ) : (
            <pre
              key={i}
              className={`whitespace-pre-wrap break-words font-mono ${TONE_CLASS[entry.tone ?? "default"]}`}
            >
              {entry.text}
            </pre>
          )
        )}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2">
        <span aria-hidden className="text-[#ff4000] opacity-90">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder='escribí "help"'
          className="flex-1 bg-transparent text-white outline-none placeholder:text-[oklch(0.72_0.012_40)] placeholder:opacity-60"
          autoComplete="off"
          spellCheck={false}
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}
