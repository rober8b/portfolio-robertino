import { cn } from "@/lib/utils";

export function StackChip({
  children,
  className,
  size = "sm",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--border-glass)] bg-[var(--surface-glass)] font-mono text-[var(--ink-soft)] backdrop-blur",
        size === "sm" && "px-2 py-0.5 text-[0.65rem]",
        size === "md" && "px-2.5 py-1 text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
