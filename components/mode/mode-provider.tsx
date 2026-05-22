"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "dev" | "client";

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggle: () => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);
const STORAGE_KEY = "rober.mode";

function readInitialMode(): Mode {
  if (typeof window === "undefined") return "client";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dev" || stored === "client") return stored;
  return "client";
}

function applyStoredTheme() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem("rober.theme");
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("client");

  useEffect(() => {
    setModeState(readInitialMode());
    applyStoredTheme();
  }, []);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.dataset.mode = next;
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === "dev" ? "client" : "dev");
  }, [mode, setMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.mode = mode;
    }
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode must be used within ModeProvider");
  }
  return ctx;
}
