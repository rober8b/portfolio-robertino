import type { WorkshopArtifact as Artifact } from "@/lib/site-data";
import { AsciiFrame } from "@/components/primitives/ascii-frame";

type WorkshopArtifactProps = {
  artifact: Artifact;
  tilt?: number;
};

const KIND_PROMPT: Record<Artifact["kind"], string> = {
  code: "$ cat",
  note: "$ less",
  diagram: "$ tree",
};

export function WorkshopArtifact({ artifact, tilt = 0 }: WorkshopArtifactProps) {
  const lang = artifact.kind === "code" ? artifact.lang : null;
  const kindBadge = lang ? `${artifact.kind} · ${lang}` : artifact.kind;

  return (
    <div className="relative" style={{ transform: `rotate(${tilt}deg)` }}>
      <AsciiFrame
        style="dashed"
        tone="ink"
        corners="square"
        headerSlot={
          <>
            <span className="text-[var(--accent)] opacity-90">
              {KIND_PROMPT[artifact.kind]}
            </span>
            <span className="truncate text-[var(--ink)] opacity-90">
              {artifact.title}
            </span>
            <span className="ml-2 text-[var(--ink-soft)] opacity-60">
              · {kindBadge}
            </span>
          </>
        }
        innerClassName="p-3 sm:p-4"
      >
        {artifact.kind === "code" ? (
          <pre className="overflow-x-auto font-mono text-[0.62rem] leading-relaxed text-[var(--ink)] [scrollbar-width:thin]">
            {artifact.body}
          </pre>
        ) : null}

        {artifact.kind === "note" ? (
          <p className="font-mono text-[0.7rem] leading-relaxed text-[var(--ink-soft)]">
            {artifact.body}
          </p>
        ) : null}

        {artifact.kind === "diagram" ? (
          <pre className="overflow-x-auto font-mono text-[0.62rem] leading-tight text-[var(--ink)] [scrollbar-width:thin]">
            {artifact.body}
          </pre>
        ) : null}
      </AsciiFrame>
    </div>
  );
}
