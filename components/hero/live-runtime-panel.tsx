import type { GithubActivity } from "@/lib/github/types";
import { buildRuntimeSnapshot } from "@/lib/runtime/data";
import { PROFILE } from "@/lib/site-data";
import { RuntimeTerminal } from "@/components/hero/runtime-terminal";
import { SystemMetrics } from "@/components/hero/system-metrics";
import { IdentityAvatar } from "@/components/hero/identity-avatar";

type LiveRuntimePanelProps = {
  activity: GithubActivity | null;
};

const BIO =
  "Desarrollador full-stack senior con más de 6 años de experiencia, " +
  "especializado en arquitecturas web de gran escala y aplicaciones " +
  "intensivas en datos. Actualmente enfocado en plataformas de e-commerce " +
  "complejas y sistemas de agentes inteligentes, siendo pionero en el " +
  'concepto de "marketplace agéntico". Mantengo un fuerte compromiso con ' +
  "el código abierto, la arquitectura limpia, y en mi tiempo libre " +
  "desarrollo herramientas especializadas explorando la intersección " +
  "entre la IA y las interfaces de usuario.";

export function LiveRuntimePanel({ activity }: LiveRuntimePanelProps) {
  const snapshot = buildRuntimeSnapshot(activity);
  const isOk = snapshot.status.tone === "ok";

  return (
    <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-[var(--border-glass)] bg-[#0a0a0a] p-5 sm:p-6">
      <header className="flex items-center gap-4">
        <IdentityAvatar size={88} />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[oklch(0.72_0.012_40)]">
            {PROFILE.handle}
          </span>
          <span className="truncate font-display text-base font-semibold text-white sm:text-lg">
            {PROFILE.name}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[oklch(0.72_0.012_40)]">
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 ${isOk ? "animate-pulse bg-[var(--amber)]" : "bg-[oklch(0.72_0.012_40)]"}`}
              style={{ borderRadius: "1px" }}
            />
            {snapshot.status.label}
          </span>
        </div>
      </header>

      <p className="text-[0.78rem] leading-relaxed text-[oklch(0.86_0.01_40)]">
        {BIO}
      </p>

      <div className="flex-1">
        <RuntimeTerminal lines={snapshot.terminal} />
      </div>

      <SystemMetrics metrics={snapshot.metrics} />
    </div>
  );
}
