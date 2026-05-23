"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ModeToggle } from "@/components/mode/mode-toggle";
import { AskButton } from "@/components/ask/ask-button";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scrolled styling threshold
    if (latest > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll down, show on scroll up
    const direction = latest - lastScrollY;
    if (latest > 150 && direction > 10) {
      setIsVisible(false);
    } else if (direction < -10) {
      setIsVisible(true);
    }
    
    setLastScrollY(latest);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-1.5 rounded-full border p-1.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          isScrolled
            ? "border-[var(--border-glass-dark)] bg-[var(--surface-glass)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            : "border-transparent bg-transparent shadow-none backdrop-blur-none",
        )}
      >
        <ModeToggle
          className={cn(
            "transition-[background-color,border-color,box-shadow] duration-500",
            isScrolled && "border-none bg-transparent shadow-none",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "mx-0.5 h-5 w-px bg-[var(--border-glass-dark)] transition-opacity duration-500",
            isScrolled ? "opacity-40" : "opacity-0",
          )}
        />
        <AskButton />
      </div>
    </motion.nav>
  );
}
