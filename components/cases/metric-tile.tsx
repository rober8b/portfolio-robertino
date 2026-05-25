type MetricTileProps = {
  label: string;
  value: string;
  hint?: string;
  className?: string;
};

export function MetricTile({ label, value, hint, className }: MetricTileProps) {
  return (
    <div className={`glass rounded-md border border-[var(--border-glass)] px-3 py-2 backdrop-blur ${className ?? ""}`}>
      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-70">
        {label}
      </p>
      <p className="nums-tabular mt-0.5 font-mono text-xl font-medium text-[var(--ink)]">{value}</p>
      {hint ? (
        <p className="font-mono text-[0.55rem] tracking-[0.05em] text-[var(--ink-soft)] uppercase opacity-60">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
