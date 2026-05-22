import { fetchGithubActivity } from "@/lib/github/client";
import { ContributionHeatmap } from "@/components/github/contribution-heatmap";
import { CurrentlyBuildingCard } from "@/components/github/currently-building";
import { GithubStat } from "@/components/github/github-stat";
import { GithubSetupNeeded } from "@/components/github/github-setup-needed";
import { GithubIcon } from "@/components/icons/brand-icons";

export async function GithubSection() {
  const activity = await fetchGithubActivity();

  return (
    <section id="github" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-[var(--ink-soft)] uppercase">
            <GithubIcon className="h-3 w-3" /> github · @rober8b · live
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Lo que vengo construyendo
            <br className="hidden sm:inline" />
            <span className="text-[var(--ink-soft)]"> en código abierto.</span>
          </h2>
          <p className="mt-6 max-w-prose-tight text-lg text-[var(--ink-soft)]">
            Actividad real de GitHub, traída directo de la API. Cacheada por hora. Sin maquillaje:
            si hay una semana muerta, se ve.
          </p>
        </header>

        {!activity ? (
          <div className="mt-16">
            <GithubSetupNeeded />
          </div>
        ) : (
          <div className="mt-16 space-y-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <GithubStat
                label="contribuciones · año"
                value={activity.calendar.totalContributions.toLocaleString("es-AR")}
              />
              <GithubStat
                label="streak actual"
                value={activity.streak.current}
                hint={activity.streak.current === 1 ? "día" : "días"}
              />
              <GithubStat
                label="streak más larga"
                value={activity.streak.longest}
                hint={activity.streak.longest === 1 ? "día" : "días"}
              />
              <GithubStat
                label="top language"
                value={activity.topLanguage ?? "—"}
              />
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8">
              <ContributionHeatmap calendar={activity.calendar} />
            </div>

            {activity.currentlyBuilding && (
              <div className="grid gap-6 md:grid-cols-2">
                <CurrentlyBuildingCard data={activity.currentlyBuilding} />
                <div className="flex flex-col justify-center gap-3 px-4 text-sm text-[var(--ink-soft)]">
                  <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-60">
                    nota técnica
                  </p>
                  <p className="leading-relaxed">
                    Esta sección hace fetch GraphQL al GitHub API en el server, cachea por hora
                    con tag invalidable, y renderiza desde un Server Component. Sin JS extra en
                    el cliente para esto.
                  </p>
                  <p className="font-mono text-[0.65rem] tracking-[0.05em] opacity-50">
                    última lectura · {new Date(activity.fetchedAt).toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
