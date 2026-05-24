import type { RuntimeTerminalLine } from "@/lib/runtime/data";

type RuntimeTerminalProps = {
  lines: RuntimeTerminalLine[];
};

export function RuntimeTerminal({ lines }: RuntimeTerminalProps) {
  return (
    <ul className="relative grid gap-1.5 font-mono text-[0.7rem] leading-relaxed">
      {lines.map((line, i) => (
        <li key={`${line.prompt}-${i}`} className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
          <span className="text-[var(--drench-text-soft)] opacity-70">{line.prompt}</span>
          {line.href ? (
            <a
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className="truncate text-[var(--drench-text)] underline-offset-2 hover:underline"
            >
              {line.body}
            </a>
          ) : (
            <span className="truncate text-[var(--drench-text)]">{line.body}</span>
          )}
        </li>
      ))}
      <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
        <span className="text-[var(--drench-text-soft)] opacity-70">$</span>
        <span className="inline-block h-3 w-1.5 animate-pulse bg-[var(--amber)] align-middle" aria-hidden />
      </li>
    </ul>
  );
}
