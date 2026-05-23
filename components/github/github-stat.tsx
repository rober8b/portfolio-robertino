export function GithubStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
        {label}
      </span>
      <span className="font-display text-2xl font-semibold text-[var(--ink)] tabular-nums sm:text-3xl">
        {value}
      </span>
      {hint && (
        <span className="font-mono text-[0.6rem] tracking-[0.05em] text-[var(--ink-soft)] opacity-60">
          {hint}
        </span>
      )}
    </div>
  );
}
