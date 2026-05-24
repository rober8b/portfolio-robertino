import type { GithubActivity } from "@/lib/github/types";
import { buildRuntimeSnapshot } from "@/lib/runtime/data";
import { PROFILE } from "@/lib/site-data";
import { Scanlines } from "@/components/ambient/scanlines";
import { AsciiGrain } from "@/components/ambient/ascii-grain";
import { RuntimeTerminal } from "@/components/hero/runtime-terminal";
import { SystemMetrics } from "@/components/hero/system-metrics";
import { IdentityAvatar } from "@/components/hero/identity-avatar";

type LiveRuntimePanelProps = {
  activity: GithubActivity | null;
};

export function LiveRuntimePanel({ activity }: LiveRuntimePanelProps) {
  const snapshot = buildRuntimeSnapshot(activity);
  const isOk = snapshot.status.tone === "ok";

  return (
    <div className="glass-strong relative flex aspect-[5/6] flex-col overflow-hidden rounded-lg p-5 sm:p-6 lg:p-7">
      <Scanlines opacity={0.05} blend="soft-light" />
      <AsciiGrain width={80} height={48} opacity={0.04} />
      <SpecularDrift />

      <header className="relative flex items-center gap-4">
        <IdentityAvatar />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--drench-text-soft)] uppercase">
            {PROFILE.handle}
          </span>
          <span className="truncate font-display text-base font-semibold text-[var(--drench-text)] sm:text-lg">
            {PROFILE.name}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.08em] text-[var(--drench-text-soft)] uppercase">
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 ${isOk ? "animate-pulse bg-[var(--amber)]" : "bg-[var(--drench-text-soft)]"}`}
              style={{ borderRadius: "1px" }}
            />
            {snapshot.status.label}
          </span>
        </div>
      </header>

      <div className="relative mt-5 flex-1">
        <RuntimeTerminal lines={snapshot.terminal} />
      </div>

      <div className="relative mt-4">
        <SystemMetrics metrics={snapshot.metrics} />
      </div>
    </div>
  );
}

function SpecularDrift() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 30% 10%, var(--specular), transparent 60%)",
      }}
    />
  );
}
