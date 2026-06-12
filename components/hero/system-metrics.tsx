import type { RuntimeMetric } from "@/lib/runtime/data";

type SystemMetricsProps = {
  metrics: RuntimeMetric[];
};

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--border-glass)] pt-4 font-mono text-[0.6rem] sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex min-w-0 flex-col gap-1">
          <dt className="truncate tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)] opacity-80">
            {m.label}
          </dt>
          <dd className="nums-tabular truncate text-sm font-medium text-white sm:text-base">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
