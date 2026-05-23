import { CountUp } from "@/components/primitives/count-up";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  /** Highlight as a punchy amber stat (e.g. streak) */
  highlight?: boolean;
};

export function GithubStat({ label, value, hint, highlight }: Props) {
  const isNumber = typeof value === "number";

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
        {label}
      </span>
      <span
        className="font-display text-4xl font-semibold tabular-nums sm:text-5xl lg:text-6xl"
        style={{ color: highlight ? "var(--amber)" : "var(--ink)" }}
      >
        {isNumber ? <CountUp to={value} /> : value}
      </span>
      {hint && (
        <span className="font-mono text-[0.6rem] tracking-[0.05em] text-[var(--ink-soft)] opacity-60">
          {hint}
        </span>
      )}
    </div>
  );
}
