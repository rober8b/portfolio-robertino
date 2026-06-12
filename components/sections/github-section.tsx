import type { GithubActivity } from "@/lib/github/types";
import { HeatmapToggle } from "@/components/github/heatmap-toggle";
import { CurrentlyBuildingCard } from "@/components/github/currently-building";
import { GithubStat } from "@/components/github/github-stat";
import { GithubSetupNeeded } from "@/components/github/github-setup-needed";
import { GithubSectionHeader } from "@/components/github/github-section-header";
import { CommitLogStrip } from "@/components/github/commit-log-strip";
import { LiveRuntimePanel } from "@/components/hero/live-runtime-panel";

type GithubSectionProps = {
  activity: GithubActivity | null;
};

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return k >= 10 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`;
  }
  return n.toString();
}

export function GithubSection({ activity }: GithubSectionProps) {
  return (
    <section id="github" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <GithubSectionHeader />

        {!activity ? (
          <div className="mt-16">
            <GithubSetupNeeded />
          </div>
        ) : (
          <div className="mt-16 space-y-10">
            <div className="grid items-stretch gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
              <LiveRuntimePanel activity={activity} />

              <div className="flex flex-col justify-between gap-8">
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <GithubStat
                    label="contribuciones · año"
                    value={activity.calendar.totalContributions}
                  />
                  <GithubStat
                    label="streak actual"
                    value={activity.streak.current}
                    hint={activity.streak.current === 1 ? "día" : "días"}
                    highlight={activity.streak.current > 0}
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

                <BreakdownStrip
                  commits={activity.breakdown.commits}
                  pullRequests={activity.breakdown.pullRequests}
                  issues={activity.breakdown.issues}
                  restricted={activity.breakdown.restricted}
                />
              </div>
            </div>

            <HeatmapToggle calendar={activity.calendar} />

            {activity.breakdown.restricted > 0 ? (
              <p className="font-mono text-[0.65rem] tracking-[0.05em] text-[var(--ink-soft)] opacity-60">
                incluye actividad en repos privados ·{" "}
                <span className="text-[var(--accent)] opacity-90">
                  {activity.breakdown.restricted} contribs
                </span>
              </p>
            ) : null}

            {activity.recentCommits.length > 0 ? (
              <CommitLogStrip commits={activity.recentCommits} />
            ) : null}

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

type BreakdownStripProps = {
  commits: number;
  pullRequests: number;
  issues: number;
  restricted: number;
};

function BreakdownStrip({ commits, pullRequests, issues, restricted }: BreakdownStripProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-[0.7rem] tracking-tight text-[var(--ink-soft)]">
      <span>
        <span className="text-[var(--accent)] opacity-90">commits</span>{" "}
        <span className="tabular-nums text-[var(--ink)]">{formatCount(commits)}</span>
      </span>
      <span aria-hidden className="opacity-40">·</span>
      <span>
        <span className="text-[var(--accent)] opacity-90">PRs</span>{" "}
        <span className="tabular-nums text-[var(--ink)]">{formatCount(pullRequests)}</span>
      </span>
      <span aria-hidden className="opacity-40">·</span>
      <span>
        <span className="text-[var(--accent)] opacity-90">issues</span>{" "}
        <span className="tabular-nums text-[var(--ink)]">{formatCount(issues)}</span>
      </span>
      {restricted > 0 ? (
        <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--accent)] px-1.5 py-0.5 text-[0.6rem] tracking-[0.08em] text-[var(--accent)] uppercase">
          privados incluidos
        </span>
      ) : null}
    </div>
  );
}
