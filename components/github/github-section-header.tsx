import { GithubIcon } from "@/components/icons/brand-icons";
import { AsciiHeading } from "@/components/primitives/ascii-heading";
import { RuntimeBadge } from "@/components/primitives/runtime-badge";

export function GithubSectionHeader() {
  return (
    <div className="max-w-3xl space-y-4">
      <RuntimeBadge
        label={
          <span className="inline-flex items-center gap-1.5">
            system.status · live
            <span aria-hidden className="opacity-40">·</span>
            <GithubIcon className="h-3 w-3" /> @rober8b
          </span>
        }
        tone="ok"
        pulse
      />
      <AsciiHeading
        title={
          <>
            Lo que vengo construyendo
            <br className="hidden sm:inline" />
            <span className="text-[var(--ink-soft)]"> en código abierto.</span>
          </>
        }
        description="Actividad real de GitHub, traída directo de la API. Cacheada por hora. Sin maquillaje: si hay una semana muerta, se ve."
      />
    </div>
  );
}
