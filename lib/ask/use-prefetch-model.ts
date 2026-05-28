"use client";

import { useEffect, useCallback, useRef } from "react";
import { prefetchSemanticModel } from "./search";

export function usePrefetchModel() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. requestIdleCallback(cb, { timeout: 5000 }) después de mount de la página
  useEffect(() => {
    if (typeof window === "undefined") return;

    const trigger = () => {
      // Trigger the prefetch in idle background
      prefetchSemanticModel();
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(trigger, { timeout: 5000 });
      return () => {
        (window as any).cancelIdleCallback(handle);
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const handle = setTimeout(trigger, 3000);
      return () => clearTimeout(handle);
    }
  }, []);

  // 2. onMouseEnter del trigger de Ask AI sostenido > 100ms
  const handleMouseEnter = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      prefetchSemanticModel();
      timerRef.current = null;
    }, 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 3. Apertura del modal vía Ctrl+K (manual trigger)
  const triggerManualPrefetch = useCallback(() => {
    prefetchSemanticModel();
  }, []);

  return {
    handleMouseEnter,
    handleMouseLeave,
    triggerManualPrefetch,
  };
}
