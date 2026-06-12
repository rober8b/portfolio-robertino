"use client";

import { motion } from "motion/react";
import { ModeToggle } from "@/components/mode/mode-toggle";
import { AskButton } from "@/components/ask/ask-button";

export function FloatingNav() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-[oklch(1_0_0/0.14)] bg-[#0a0a0a] p-1.5">
        <ModeToggle className="border-none bg-transparent" />
        <div
          aria-hidden
          className="h-5 w-px bg-[oklch(1_0_0/0.08)]"
        />
        <AskButton />
      </div>
    </motion.nav>
  );
}
