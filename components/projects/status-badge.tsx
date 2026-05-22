import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/site-data";

type Mode = "dev" | "client";

const LABEL: Record<ProjectStatus, Record<Mode, string>> = {
  live: { dev: "Production", client: "En vivo" },
  building: { dev: "Building", client: "En construcción" },
  prototype: { dev: "Prototype", client: "Prototipo" },
  qa: { dev: "QA", client: "En carga" },
};

const TONE: Record<ProjectStatus, string> = {
  live: "before:bg-emerald-400",
  building: "before:bg-[var(--accent)]",
  prototype: "before:bg-amber-400",
  qa: "before:bg-sky-400",
};

export function StatusBadge({
  status,
  mode,
  className,
}: {
  status: ProjectStatus;
  mode: Mode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border border-[var(--border-glass)] bg-[var(--surface-glass)] px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase backdrop-blur",
        "before:relative before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
        status === "live" && "before:animate-pulse",
        TONE[status],
        className,
      )}
    >
      {LABEL[status][mode]}
    </span>
  );
}
