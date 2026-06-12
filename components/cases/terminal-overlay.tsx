type TerminalLine = {
  prompt?: string;
  body: string;
  tone?: "default" | "muted" | "accent";
};

type TerminalOverlayProps = {
  title?: string;
  lines: TerminalLine[];
  className?: string;
};

const TONE_CLASS: Record<NonNullable<TerminalLine["tone"]>, string> = {
  default: "text-[var(--ink)]",
  muted: "text-[var(--ink-soft)] opacity-70",
  accent: "text-[var(--accent)]",
};

/**
 * Mono terminal-style tile used inside case scenes (e.g., showing a
 * deploy log fragment, a build command, an env diff).
 */
export function TerminalOverlay({ title = "rober8b@localhost", lines, className }: TerminalOverlayProps) {
  return (
    <div className={`glass overflow-hidden rounded-md border border-[var(--border-glass)] backdrop-blur ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 border-b border-[var(--border-glass)] bg-[var(--surface-elev)] px-2.5 py-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
        <span className="ml-2 font-mono text-[0.55rem] tracking-tight text-[var(--ink-soft)] opacity-70">
          {title}
        </span>
      </div>
      <pre className="overflow-x-auto px-3 py-2 font-mono text-[0.65rem] leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={TONE_CLASS[line.tone ?? "default"]}>
            {line.prompt ? (
              <span className="text-[var(--accent)] opacity-80">{line.prompt} </span>
            ) : null}
            {line.body}
          </div>
        ))}
      </pre>
    </div>
  );
}
