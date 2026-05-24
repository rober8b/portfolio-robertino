import type { ReactNode } from "react";

type DeviceFrameKind = "browser" | "mobile" | "terminal" | "card" | "none";

type DeviceFrameProps = {
  kind: DeviceFrameKind;
  url?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function DeviceFrame({ kind, url, title, children, className }: DeviceFrameProps) {
  if (kind === "none") {
    return <div className={className}>{children}</div>;
  }

  const isMobile = kind === "mobile";
  const isBrowser = kind === "browser";
  const isTerminal = kind === "terminal";

  return (
    <div
      className={`relative overflow-hidden border border-[var(--border-glass)] bg-[var(--surface)] shadow-lg ${
        isMobile ? "rounded-[1.4rem]" : "rounded-md"
      } ${className ?? ""}`}
    >
      {(isBrowser || isTerminal) && (
        <div className="flex items-center gap-1.5 border-b border-[var(--border-glass)] bg-[var(--surface-elevated)] px-3 py-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
          <div className="ml-2 flex-1 truncate font-mono text-[0.6rem] tracking-tight text-[var(--ink-soft)]">
            {isTerminal ? title ?? "rober8b@localhost" : url ?? ""}
          </div>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
