import type { RuntimeMetric } from "@/lib/runtime/data";

type SystemMetricsProps = {
  metrics: RuntimeMetric[];
};

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  return (
    <dl className="relative grid grid-cols-4 gap-x-3 gap-y-1 border-t border-[var(--drench-border)] pt-3 font-mono text-[0.6rem]">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-0.5">
          <dt className="tracking-[0.08em] text-[var(--drench-text-soft)] uppercase opacity-70">
            {m.label}
          </dt>
          <dd className="nums-tabular text-base font-medium text-[var(--drench-text)] sm:text-lg">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
