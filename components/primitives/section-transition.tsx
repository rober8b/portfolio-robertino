import { cn } from "@/lib/utils";

type SectionTransitionProps = {
  command: string;
  divider?: "dots" | "dashes" | "none";
  className?: string;
};

export function SectionTransition({
  command,
  divider = "dots",
  className,
}: SectionTransitionProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
        <span className="text-[var(--accent)] opacity-90">&gt;</span>
        <span
          className="inline-block h-1.5 w-1.5 animate-pulse bg-[var(--amber)]"
          style={{ borderRadius: "1px" }}
        />
        <span className="truncate">{command}</span>
        <span
          className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-[var(--accent)] align-middle"
        />
      </p>
      {divider !== "none" ? (
        <div
          className={cn(
            "mt-4 text-[var(--ink-soft)] opacity-40",
            divider === "dots" && "divider-dots",
          )}
          style={
            divider === "dashes"
              ? {
                  height: "1px",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 12px)",
                }
              : undefined
          }
        />
      ) : null}
    </div>
  );
}
