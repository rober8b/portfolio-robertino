import { ArrowUpRight, Flame, GitCommit } from "lucide-react";
import type { CurrentlyBuilding } from "@/lib/github/types";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "ahora mismo";
  if (mins < 60) return `hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "ayer";
  if (days < 7) return `hace ${days} días`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `hace ${weeks} semana${weeks === 1 ? "" : "s"}`;
  const months = Math.floor(days / 30);
  return `hace ${months} mes${months === 1 ? "" : "es"}`;
}

function isRecent(iso: string, days = 7): boolean {
  return Date.now() - new Date(iso).getTime() < days * 24 * 60 * 60_000;
}

export function CurrentlyBuildingCard({ data }: { data: CurrentlyBuilding }) {
  const recent = isRecent(data.pushedAt, 7);
  const heading = recent ? "Currently building" : "Last push";

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noreferrer"
      className="glass group relative flex flex-col gap-4 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.1em] text-[var(--ink-soft)] uppercase">
          {recent ? (
            <Flame size={12} strokeWidth={1.75} className="text-[var(--accent)]" />
          ) : (
            <GitCommit size={12} strokeWidth={1.75} />
          )}
          {heading}
        </span>
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="text-[var(--ink-soft)] opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      </div>

      <div>
        <h4 className="font-display text-xl font-semibold text-[var(--ink)]">{data.repo}</h4>
        {data.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-[var(--ink-soft)]">{data.description}</p>
        )}
      </div>

      {data.commitMessage && (
        <p className="text-balance font-mono text-xs leading-relaxed text-[var(--ink-soft)]">
          <span className="opacity-50">›</span> {data.commitMessage}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 font-mono text-[0.65rem] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
        <span className="inline-flex items-center gap-1.5">
          {data.language && (
            <>
              {data.languageColor && (
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: data.languageColor }}
                />
              )}
              {data.language}
            </>
          )}
        </span>
        <span>{timeAgo(data.pushedAt)}</span>
      </div>
    </a>
  );
}
