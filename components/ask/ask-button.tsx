"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useAskPalette } from "@/components/ask/ask-palette-provider";
import { usePrefetchModel } from "@/lib/ask/use-prefetch-model";

export function AskButton() {
  const { toggle } = useAskPalette();
  const [isMac, setIsMac] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = usePrefetchModel();

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Ask my portfolio"
      className="inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.14)] px-3 py-1.5 text-sm text-white transition-colors duration-200 hover:border-[#ff4000] hover:text-[#ff4000]"
    >
      <Sparkles size={14} strokeWidth={1.75} className="text-[var(--amber)]" />
      <span className="hidden sm:inline">Ask</span>
      <kbd className="hidden rounded border border-[oklch(1_0_0/0.14)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[oklch(0.72_0.012_40)] sm:inline">
        {isMac ? "⌘" : "Ctrl"}K
      </kbd>
    </button>
  );
}
