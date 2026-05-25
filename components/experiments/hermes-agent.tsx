"use client";

import { useEffect, useReducer, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Line = { kind: "prompt"; text: string } | { kind: "output"; text: string };

type Command = {
  prompt: string;
  outputs: string[];
};

const COMMANDS: Command[] = [
  {
    prompt: "hermes ingest --from inbox",
    outputs: ["processing 14 items... categorized 11, queued 3 for review."],
  },
  {
    prompt: "hermes summarize --today",
    outputs: [
      "3 sessions registered. focus:",
      "  marketplace recovery operator",
      "  aredes deploy · leiza qa",
    ],
  },
  {
    prompt: 'hermes recall "supabase vault"',
    outputs: [
      "4 notes matched. last edit: 2 days ago.",
      "linked to: vc-platform, encryption-arch.",
    ],
  },
  {
    prompt: "hermes draft --reply",
    outputs: ["drafted 2 responses. confidence: high (1), medium (1)."],
  },
  {
    prompt: "hermes status",
    outputs: [
      "agent online · uptime 47d",
      "last sync 12s ago · runtime stable.",
    ],
  },
];

const TYPE_INTERVAL_MS = 18;
const OUTPUT_STAGGER_MS = 60;
const COMMAND_PAUSE_MS = 2200;
const OUTPUT_HOLD_MS = 350;

type State = {
  commandIndex: number;
  lines: Line[];
  typingPromptUpTo: number;
};

type Action =
  | { type: "typed-char" }
  | { type: "prompt-done" }
  | { type: "push-output"; text: string }
  | { type: "advance" }
  | { type: "reset"; commandIndex: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "typed-char":
      return { ...state, typingPromptUpTo: state.typingPromptUpTo + 1 };
    case "prompt-done": {
      const cmd = COMMANDS[state.commandIndex];
      const promptLine: Line = { kind: "prompt", text: cmd.prompt };
      return {
        ...state,
        typingPromptUpTo: cmd.prompt.length,
        lines: [...state.lines, promptLine],
      };
    }
    case "push-output":
      return {
        ...state,
        lines: [...state.lines, { kind: "output", text: action.text }],
      };
    case "advance":
      return state;
    case "reset":
      return {
        commandIndex: action.commandIndex,
        lines: [],
        typingPromptUpTo: 0,
      };
  }
}

const INITIAL: State = { commandIndex: 0, lines: [], typingPromptUpTo: 0 };

type HermesAgentProps = {
  height?: number;
  className?: string;
};

export function HermesAgent({ height = 240, className }: HermesAgentProps) {
  const reducedMotion = useReducedMotion();
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const stateRef = useRef(state);
  stateRef.current = state;
  const timeoutsRef = useRef<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const sched = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        if (pausedRef.current) {
          sched(fn, 300);
          return;
        }
        fn();
      }, delay);
      timeoutsRef.current.push(id);
      return id;
    };

    const runCommand = (commandIndex: number) => {
      dispatch({ type: "reset", commandIndex });

      if (reducedRef.current) {
        const cmd = COMMANDS[commandIndex];
        sched(() => {
          dispatch({ type: "prompt-done" });
          cmd.outputs.forEach((out, i) => {
            sched(() => dispatch({ type: "push-output", text: out }), i * 30);
          });
          sched(() => {
            const next = (commandIndex + 1) % COMMANDS.length;
            runCommand(next);
          }, COMMAND_PAUSE_MS);
        }, 30);
        return;
      }

      const cmd = COMMANDS[commandIndex];
      const promptLen = cmd.prompt.length;

      const typeNext = (i: number) => {
        if (i >= promptLen) {
          dispatch({ type: "prompt-done" });
          cmd.outputs.forEach((out, k) => {
            sched(
              () => dispatch({ type: "push-output", text: out }),
              k * OUTPUT_STAGGER_MS,
            );
          });
          sched(
            () => {
              const next = (commandIndex + 1) % COMMANDS.length;
              runCommand(next);
            },
            cmd.outputs.length * OUTPUT_STAGGER_MS + OUTPUT_HOLD_MS + COMMAND_PAUSE_MS,
          );
          return;
        }
        dispatch({ type: "typed-char" });
        sched(() => typeNext(i + 1), TYPE_INTERVAL_MS);
      };
      sched(() => typeNext(0), 30);
    };

    runCommand(0);

    return () => {
      for (const id of timeoutsRef.current) window.clearTimeout(id);
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.lines, state.typingPromptUpTo]);

  const handleClick = () => {
    for (const id of timeoutsRef.current) window.clearTimeout(id);
    timeoutsRef.current = [];
    const next = (stateRef.current.commandIndex + 1) % COMMANDS.length;
    const cmd = COMMANDS[next];
    dispatch({ type: "reset", commandIndex: next });
    const sched = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };
    const promptLen = cmd.prompt.length;
    const typeNext = (i: number) => {
      if (i >= promptLen) {
        dispatch({ type: "prompt-done" });
        cmd.outputs.forEach((out, k) => {
          sched(
            () => dispatch({ type: "push-output", text: out }),
            k * OUTPUT_STAGGER_MS,
          );
        });
        return;
      }
      dispatch({ type: "typed-char" });
      sched(() => typeNext(i + 1), TYPE_INTERVAL_MS);
    };
    sched(() => typeNext(0), 30);
  };

  const currentCmd = COMMANDS[state.commandIndex];
  const promptTyped = currentCmd.prompt.slice(0, state.typingPromptUpTo);
  const isTyping = state.typingPromptUpTo < currentCmd.prompt.length;
  const showCursor = isTyping || state.lines.length > 0;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Hermes agent demo — click para avanzar"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`flex cursor-pointer flex-col overflow-hidden bg-[#0a0a0a] font-mono text-[0.72rem] leading-relaxed ${className ?? ""}`}
      style={{ height }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 [scrollbar-width:thin]">
        {state.lines.map((line, i) =>
          line.kind === "prompt" ? (
            <p key={i} className="text-[#ff4000]">
              <span className="opacity-80">$ </span>
              <span>{line.text}</span>
            </p>
          ) : (
            <p key={i} className="text-[oklch(0.96_0.008_50)]">
              {line.text}
            </p>
          ),
        )}
        {isTyping ? (
          <p className="text-[#ff4000]">
            <span className="opacity-80">$ </span>
            <span>{promptTyped}</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle"
            />
          </p>
        ) : showCursor ? (
          <p>
            <span className="text-[#ff4000] opacity-80">$ </span>
            <span
              aria-hidden
              className="inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle"
            />
          </p>
        ) : null}
      </div>
    </div>
  );
}
