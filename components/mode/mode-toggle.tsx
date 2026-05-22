"use client";

import { motion } from "motion/react";
import { Code2, MessageCircle } from "lucide-react";
import { useMode, type Mode } from "@/components/mode/mode-provider";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Mode; label: string; sub: string; Icon: typeof Code2 }[] = [
  { value: "client", label: "Cliente", sub: "qué te puedo construir", Icon: MessageCircle },
  { value: "dev", label: "Dev", sub: "stack y sistemas", Icon: Code2 },
];

export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useMode();

  return (
    <div
      role="radiogroup"
      aria-label="Modo de visualización"
      className={cn(
        "glass relative inline-flex items-center rounded-full p-1 text-sm",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, sub, Icon }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} — ${sub}`}
            onClick={() => setMode(value)}
            className={cn(
              "relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-300",
              isActive ? "text-[var(--surface)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="mode-toggle-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--ink)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon size={14} strokeWidth={1.75} />
            <span className="font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
