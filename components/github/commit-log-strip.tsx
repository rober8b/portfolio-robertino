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
    <div className="overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a]">
      <header className="flex items-center gap-1.5 border-b border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
        <span className="inline-block h-2 w-2 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
        <span className="ml-2 font-mono text-[0.6rem] tracking-tight text-[oklch(0.72_0.012_40)] opacity-80">
          $ git log --oneline --all --since=2w
        </span>
      </header>

      <ul className="divide-y divide-[oklch(1_0_0/0.06)]">
        {commits.map((c) => (
          <li key={`${c.sha}-${c.repo}`}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 px-4 py-2 font-mono text-[0.72rem] transition-colors hover:bg-[oklch(1_0_0/0.04)]"
            >
              <span className="text-[#ff4000] opacity-90">{c.sha}</span>
              <span className="truncate text-white">
                <span className="mr-2 text-[oklch(0.72_0.012_40)] opacity-80">{c.repo}</span>
                {c.message}
              </span>
              <span className="text-[0.65rem] text-[oklch(0.72_0.012_40)] opacity-70">
                {relative(c.date)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
