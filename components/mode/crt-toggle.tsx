"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rober8b.crt-mode";
const ATTR = "data-crt";

export function CrtToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  // Hydrate from localStorage post-mount (defer state mutation off the
  // effect body so the React 19 rule stays happy).
  useEffect(() => {
    const id = window.setTimeout(() => {
      let stored = false;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        stored = false;
      }
      if (stored) {
        setEnabled(true);
        document.documentElement.setAttribute(ATTR, "on");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    if (next) {
      document.documentElement.setAttribute(ATTR, "on");
    } else {
      document.documentElement.removeAttribute(ATTR);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Apagar modo CRT" : "Encender modo CRT"}
      title={enabled ? "Apagar modo CRT" : "Modo CRT"}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[0.65rem] tracking-tight transition-colors",
        enabled
          ? "bg-[var(--accent)] text-[var(--drench-text)]"
          : "border border-[var(--border-glass-dark)] text-[var(--ink-soft)] hover:text-[var(--ink)]",
        className,
      )}
    >
      <span aria-hidden>{enabled ? "▓" : "░"}</span>
    </button>
  );
}
