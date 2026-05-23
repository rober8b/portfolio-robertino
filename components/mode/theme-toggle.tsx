"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeChoice = "auto" | "dark" | "light";
const STORAGE_KEY = "rober.theme";
const CYCLE: ThemeChoice[] = ["auto", "dark", "light"];

function readInitial(): ThemeChoice {
  if (typeof window === "undefined") return "auto";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "auto";
}

function apply(choice: ThemeChoice) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  if (choice === "auto") {
    root.removeAttribute("data-theme");
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    root.setAttribute("data-theme", choice);
    window.localStorage.setItem(STORAGE_KEY, choice);
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [choice, setChoice] = useState<ThemeChoice>("auto");

  useEffect(() => {
    setChoice(readInitial());
  }, []);

  const cycle = () => {
    const next = CYCLE[(CYCLE.indexOf(choice) + 1) % CYCLE.length];
    setChoice(next);
    apply(next);
  };

  const Icon = choice === "dark" ? Moon : choice === "light" ? Sun : Laptop;
  const label =
    choice === "dark"
      ? "Cambiar a tema claro"
      : choice === "light"
        ? "Cambiar a tema automático"
        : "Cambiar a tema oscuro";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={cn(
        "glass inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={choice}
          initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex"
        >
          <Icon size={14} strokeWidth={1.75} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
