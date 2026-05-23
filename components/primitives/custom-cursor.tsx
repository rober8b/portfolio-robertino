"use client";

import { useEffect, useRef } from "react";

/**
 * Terminal-style cursor: pixel block default, expands into 4-corner
 * bracket reticule on interactive elements. Hidden on touch + reduced-motion.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    if (!root) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      root.style.opacity = "0";
    };

    const tick = () => {
      x += (targetX - x) * 0.28;
      y += (targetY - y) * 0.28;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, [role='button']",
      );
      if (!target) {
        root.dataset.state = "default";
        return;
      }
      const explicit = target.dataset.cursor;
      if (explicit) {
        root.dataset.state = explicit;
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        root.dataset.state = "text";
      } else {
        root.dataset.state = "reticle";
      }
    };

    root.style.opacity = "0";
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden data-state="default">
      <span className="cursor-block" />
      <span className="cursor-bracket cursor-bracket-tl" />
      <span className="cursor-bracket cursor-bracket-tr" />
      <span className="cursor-bracket cursor-bracket-bl" />
      <span className="cursor-bracket cursor-bracket-br" />
      <span className="cursor-ibeam" />
    </div>
  );
}
