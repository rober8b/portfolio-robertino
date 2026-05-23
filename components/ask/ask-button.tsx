"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useAskPalette } from "@/components/ask/ask-palette-provider";

export function AskButton() {
  const { toggle } = useAskPalette();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ask my portfolio"
      className="glass ask-pulse inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Sparkles size={14} strokeWidth={1.75} className="text-[var(--amber)]" />
      <span className="hidden sm:inline">Ask</span>
      <kbd className="hidden rounded border border-[var(--border-glass-dark)] bg-[var(--surface-glass)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--ink-soft)] sm:inline">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  );
}
