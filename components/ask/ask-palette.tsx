"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Loader2, MessageCircle, Search, Sparkles } from "lucide-react";
import faqIndex from "@/lib/ask/faq-index.json";
import { embedQuery } from "@/lib/ask/embedder";
import { rankFaq } from "@/lib/ask/search";
import {
  COMMANDS,
  isCommandQuery,
  rankCommands,
  runCommand,
  type CommandEntry,
} from "@/lib/ask/commands";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import { useMode } from "@/components/mode/mode-provider";
import type { AskMatch, FaqIndex } from "@/lib/ask/types";
import { cn } from "@/lib/utils";

const INDEX = faqIndex as unknown as FaqIndex;
const MATCH_THRESHOLD = 0.45;

const SUGGESTIONS = {
  dev: [
    "¿Qué stack usás?",
    "¿Qué es el Marketplace agéntico?",
    "¿Tenés casos de ecommerce con MercadoPago?",
    "¿Cuánto cobrás por un proyecto?",
  ],
  client: [
    "¿Podés hacerme una tienda online?",
    "¿Cuánto cuesta una página web?",
    "¿Cuánto tarda un proyecto?",
    "¿Cómo te contacto?",
  ],
} as const;

type Stage = "idle" | "loading" | "ready" | "empty";

export function AskPalette() {
  const { open, setOpen } = useAskPalette();
  const { mode, setMode } = useMode();
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<AskMatch[]>([]);
  const [commands, setCommands] = useState<CommandEntry[]>(COMMANDS);
  const [stage, setStage] = useState<Stage>("idle");
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const seq = useRef(0);

  const indexEmpty = INDEX.entries.length === 0;
  const isCommandMode = isCommandQuery(query);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setMatches([]);
      setSelectedFaqId(null);
      setStage("idle");
      setCommands(COMMANDS);
    }
  }, [open]);

  useEffect(() => {
    setCommands(rankCommands(query, mode));
  }, [query, mode]);

  useEffect(() => {
    if (!open || indexEmpty) return;
    if (isCommandMode) {
      setStage("idle");
      setMatches([]);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setMatches([]);
      setStage("idle");
      return;
    }

    const ticket = ++seq.current;
    setStage("loading");
    const handle = setTimeout(async () => {
      try {
        const vector = await embedQuery(trimmed);
        if (ticket !== seq.current) return;
        const top = rankFaq(vector, INDEX, { topK: 4 });
        const filtered = top.filter((m) => m.score >= MATCH_THRESHOLD);
        setMatches(filtered);
        setStage(filtered.length > 0 ? "ready" : "empty");
        setSelectedFaqId(filtered[0]?.entry.id ?? null);
      } catch (err) {
        console.error("ask palette embed error", err);
        setStage("empty");
        setMatches([]);
      }
    }, 240);

    return () => clearTimeout(handle);
  }, [query, open, indexEmpty, isCommandMode]);

  const activeSuggestions = SUGGESTIONS[mode];
  const selectedMatch = useMemo(
    () => matches.find((m) => m.entry.id === selectedFaqId) ?? matches[0] ?? null,
    [matches, selectedFaqId],
  );

  function executeCommand(cmd: CommandEntry) {
    runCommand(cmd.action, { setMode, close: () => setOpen(false) });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ask-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 sm:pt-32"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, oklch(0.22 0.022 40 / 0.35), oklch(0.22 0.022 40 / 0.55))",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl"
          >
            <header className="flex items-center gap-3 border-b border-[var(--border-glass-dark)] px-5 py-4">
              <Sparkles size={16} strokeWidth={1.75} className="text-[var(--accent)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isCommandMode
                    ? "comando · navegar / cambiar modo / abrir contacto"
                    : mode === "dev"
                      ? "Preguntá o tipeá > para comandos"
                      : "Preguntame lo que quieras o tipeá > para comandos"
                }
                className="flex-1 bg-transparent text-base text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] placeholder:opacity-60"
                autoComplete="off"
                spellCheck={false}
              />
              {stage === "loading" && (
                <Loader2
                  size={16}
                  strokeWidth={1.75}
                  className="animate-spin text-[var(--ink-soft)]"
                />
              )}
              <kbd className="hidden rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--ink-soft)] sm:inline">
                Esc
              </kbd>
            </header>

            <div className="max-h-[60vh] overflow-y-auto">
              {isCommandMode ? (
                <CommandsList commands={commands} onPick={executeCommand} />
              ) : indexEmpty ? (
                <EmptyIndexState />
              ) : stage === "idle" ? (
                <IdleState
                  suggestions={activeSuggestions}
                  onPick={(s) => setQuery(s)}
                  mode={mode}
                  commands={commands.slice(0, 5)}
                  onCommand={executeCommand}
                />
              ) : stage === "ready" ? (
                <ResultsList
                  matches={matches}
                  selectedId={selectedMatch?.entry.id ?? null}
                  onSelect={setSelectedFaqId}
                  mode={mode}
                  answer={selectedMatch?.entry.answers[mode] ?? ""}
                />
              ) : (
                <NoMatchState mode={mode} />
              )}
            </div>

            <footer className="flex items-center justify-between border-t border-[var(--border-glass-dark)] px-5 py-2.5 font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-70">
              <span>
                {isCommandMode ? "modo comando" : "respuesta sin generación · escrita por rober"}
              </span>
              <span>
                tipeá <span className="rounded border border-[var(--border-glass-dark)] px-1">{">"}</span> para comandos
              </span>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmptyIndexState() {
  return (
    <div className="px-6 py-10 text-sm text-[var(--ink-soft)]">
      <p className="font-mono text-xs tracking-[0.08em] uppercase opacity-60">FAQ index vacío</p>
      <p className="mt-3 leading-relaxed">
        Todavía no se generaron las embeddings. Llená{" "}
        <code className="rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1 py-0.5 font-mono text-xs">
          content/portfolio-faq.md
        </code>{" "}
        y corré <code>pnpm build:faq</code>.
      </p>
    </div>
  );
}

function IdleState({
  suggestions,
  onPick,
  mode,
  commands,
  onCommand,
}: {
  suggestions: readonly string[];
  onPick: (q: string) => void;
  mode: "dev" | "client";
  commands: CommandEntry[];
  onCommand: (cmd: CommandEntry) => void;
}) {
  return (
    <div className="space-y-1 px-5 py-4">
      <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
        {mode === "dev" ? "Probá preguntar" : "Sugerencias"}
      </p>
      <ul className="space-y-0.5">
        {suggestions.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => onPick(s)}
              className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-glass)] hover:text-[var(--ink)]"
            >
              <span className="flex items-center gap-3">
                <Search
                  size={13}
                  strokeWidth={1.75}
                  className="opacity-40 group-hover:opacity-100"
                />
                {s}
              </span>
              <ArrowRight
                size={13}
                strokeWidth={1.75}
                className="opacity-0 transition-opacity group-hover:opacity-60"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="pt-3">
        <p className="mb-2 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
          comandos rápidos
        </p>
        <CommandsList commands={commands} onPick={onCommand} compact />
      </div>
    </div>
  );
}

function CommandsList({
  commands,
  onPick,
  compact,
}: {
  commands: CommandEntry[];
  onPick: (cmd: CommandEntry) => void;
  compact?: boolean;
}) {
  if (commands.length === 0) {
    return (
      <div className="px-5 py-8 text-sm text-[var(--ink-soft)]">
        Sin comandos que coincidan. Borrá el <code>{">"}</code> para volver a buscar en FAQ.
      </div>
    );
  }

  const grouped = commands.reduce<Record<string, CommandEntry[]>>((acc, cmd) => {
    acc[cmd.group] = acc[cmd.group] ? [...acc[cmd.group], cmd] : [cmd];
    return acc;
  }, {});

  const order: Array<CommandEntry["group"]> = ["navegar", "modo", "tema", "contacto", "secreto"];

  return (
    <div className={cn("space-y-3", compact ? "" : "px-5 py-4")}>
      {order
        .filter((g) => grouped[g]?.length)
        .map((group) => (
          <div key={group}>
            {!compact && (
              <p className="mb-1.5 px-3 font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-50">
                {group}
              </p>
            )}
            <ul className="space-y-0.5">
              {grouped[group].map((cmd) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    onClick={() => onPick(cmd)}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-glass)] hover:text-[var(--ink)]"
                  >
                    <span className="flex items-center gap-3">
                      <cmd.Icon
                        size={13}
                        strokeWidth={1.75}
                        className="opacity-50 group-hover:opacity-100"
                      />
                      <span>{cmd.label}</span>
                    </span>
                    {cmd.hint && (
                      <span className="font-mono text-[0.6rem] tracking-[0.05em] opacity-50">
                        {cmd.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function ResultsList({
  matches,
  selectedId,
  onSelect,
  mode,
  answer,
}: {
  matches: AskMatch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  mode: "dev" | "client";
  answer: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr]">
      <ul className="border-b border-[var(--border-glass-dark)] py-2 md:border-r md:border-b-0">
        {matches.map((m) => (
          <li key={m.entry.id}>
            <button
              type="button"
              onClick={() => onSelect(m.entry.id)}
              className={cn(
                "flex w-full flex-col gap-1 px-4 py-2.5 text-left text-sm transition-colors",
                m.entry.id === selectedId
                  ? "bg-[var(--surface-glass)] text-[var(--ink)]"
                  : "text-[var(--ink-soft)] hover:bg-[var(--surface-glass)] hover:text-[var(--ink)]",
              )}
            >
              <span className="line-clamp-2 leading-snug">{m.matchedQuestion}</span>
              <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase opacity-50">
                {m.entry.category} · {(m.score * 100).toFixed(0)}% match
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="space-y-4 px-5 py-4">
        <p className="text-sm leading-relaxed whitespace-pre-line text-[var(--ink)]">{answer}</p>
        <p className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase opacity-50">
          Modo {mode === "dev" ? "Dev" : "Cliente"}
        </p>
      </div>
    </div>
  );
}

function NoMatchState({ mode }: { mode: "dev" | "client" }) {
  return (
    <div className="px-6 py-8">
      <p className="text-sm leading-relaxed text-[var(--ink)]">
        {mode === "dev"
          ? "No tengo nada armado para esa pregunta. Si es algo técnico específico, mandame mensaje."
          : "No tengo una respuesta lista para eso. Mandame un WhatsApp y lo charlamos directo."}
      </p>
      <a
        href={mode === "dev" ? "mailto:robertinobarbuto@gmail.com" : "#contact"}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        <MessageCircle size={14} strokeWidth={1.75} />
        {mode === "dev" ? "Mandame mail" : "Escribime por WhatsApp"}
      </a>
    </div>
  );
}
