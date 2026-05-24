import type { CommitEntry } from "@/lib/github/types";

function relative(date: string): string {
  const t = new Date(date).getTime();
  const diff = Math.max(0, Date.now() - t);
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "ahora";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  const mo = Math.floor(d / 30);
  return `${mo}mo`;
}

type CommitLogStripProps = {
  commits: CommitEntry[];
};

export function CommitLogStrip({ commits }: CommitLogStripProps) {
  if (commits.length === 0) return null;

  return (
    <div className="glass overflow-hidden rounded-lg border border-[var(--border-glass)] backdrop-blur">
      <header className="flex items-center gap-1.5 border-b border-[var(--border-glass)] bg-[var(--surface-elevated)] px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
        <span className="ml-2 font-mono text-[0.6rem] tracking-tight text-[var(--ink-soft)] opacity-70">
          $ git log --oneline --all --since=2w
        </span>
      </header>

      <ul className="divide-y divide-[var(--border-glass)]">
        {commits.map((c) => (
          <li key={`${c.sha}-${c.repo}`}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 px-4 py-2 font-mono text-[0.72rem] transition-colors hover:bg-[var(--surface-elevated)]"
            >
              <span className="text-[var(--accent)] opacity-80">{c.sha}</span>
              <span className="truncate text-[var(--ink)]">
                <span className="mr-2 text-[var(--ink-soft)] opacity-70">{c.repo}</span>
                {c.message}
              </span>
              <span className="text-[0.65rem] text-[var(--ink-soft)] opacity-70">
                {relative(c.date)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
