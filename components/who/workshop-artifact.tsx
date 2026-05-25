import type { WorkshopArtifact as Artifact } from "@/lib/site-data";

type WorkshopArtifactProps = {
  artifact: Artifact;
  tilt?: number;
};

export function WorkshopArtifact({ artifact, tilt = 0 }: WorkshopArtifactProps) {
  return (
    <div
      className="glass relative overflow-hidden rounded-md border border-[var(--border-glass)] backdrop-blur"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <header className="flex items-center gap-1.5 border-b border-[var(--border-glass)] bg-[var(--surface-elevated)] px-3 py-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.7_0.2_30)]" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.85_0.18_85)]" />
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:oklch(0.78_0.15_140)]" />
        <span className="ml-2 truncate font-mono text-[0.55rem] tracking-tight text-[var(--ink-soft)] opacity-70">
          {artifact.title}
        </span>
        <span className="ml-auto font-mono text-[0.5rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-50">
          {artifact.kind}
        </span>
      </header>

      {artifact.kind === "code" ? (
        <pre className="overflow-x-auto px-3 py-3 font-mono text-[0.62rem] leading-relaxed text-[var(--ink)] [scrollbar-width:thin]">
          {artifact.body}
        </pre>
      ) : null}

      {artifact.kind === "note" ? (
        <div className="px-4 py-3">
          <p className="font-mono text-[0.7rem] leading-relaxed text-[var(--ink-soft)]">
            {artifact.body}
          </p>
        </div>
      ) : null}

      {artifact.kind === "diagram" ? (
        <pre className="overflow-x-auto px-3 py-3 font-mono text-[0.62rem] leading-tight text-[var(--ink)] [scrollbar-width:thin]">
          {artifact.body}
        </pre>
      ) : null}
    </div>
  );
}
