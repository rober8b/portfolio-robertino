import { cn } from "@/lib/utils";
import type { ContributionCalendar } from "@/lib/github/types";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DAY_LABELS = ["Lun", "Mié", "Vie"];

const LEVEL_TOKEN = ["--gh-0", "--gh-1", "--gh-2", "--gh-3", "--gh-4"] as const;

function levelFor(count: number, threshold: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  const t = count / Math.max(1, threshold);
  if (t < 0.25) return 1;
  if (t < 0.55) return 2;
  if (t < 0.85) return 3;
  return 4;
}

export function ContributionHeatmap({
  calendar,
  className,
}: {
  calendar: ContributionCalendar;
  className?: string;
}) {
  const maxPerDay = calendar.weeks.reduce((max, w) => {
    for (const d of w.days) if (d.count > max) max = d.count;
    return max;
  }, 1);
  const threshold = Math.max(4, Math.floor(maxPerDay * 0.6));
  const monthLabels = computeMonthLabels(calendar);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="inline-flex flex-col gap-2">
        <div className="ml-7 grid font-mono text-[0.6rem] tracking-[0.05em] text-[var(--ink-soft)] uppercase opacity-60">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(0, 1fr))`,
              columnGap: "3px",
            }}
          >
            {monthLabels.map((label, i) => (
              <span key={`m-${i}`} className="h-3 leading-none">
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="grid grid-rows-7 gap-[3px] py-[1px] font-mono text-[0.6rem] tracking-[0.05em] text-[var(--ink-soft)] uppercase opacity-60">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={`d-${i}`} className="flex h-3 items-center">
                {i === 1 || i === 3 || i === 5 ? DAY_LABELS[(i - 1) / 2] : ""}
              </span>
            ))}
          </div>

          <div
            role="grid"
            aria-label={`Contribuciones de GitHub — ${calendar.totalContributions} en el año`}
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
          >
            {calendar.weeks.flatMap((week, weekIdx) =>
              week.days.map((day) => {
                const lvl = levelFor(day.count, threshold);
                return (
                  <span
                    key={day.date}
                    role="gridcell"
                    title={`${day.date} · ${day.count} contribuci${day.count === 1 ? "ón" : "ones"}`}
                    className="h-3 w-3 rounded-[3px] transition-transform duration-200 hover:scale-125"
                    style={{
                      backgroundColor: `var(${LEVEL_TOKEN[lvl]})`,
                      outline: "1px solid var(--gh-border)",
                      outlineOffset: "-1px",
                    }}
                    data-week={weekIdx}
                  />
                );
              }),
            )}
          </div>
        </div>

        <div className="ml-7 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.05em] text-[var(--ink-soft)] uppercase opacity-60">
          <span>menos</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className="h-3 w-3 rounded-[3px]"
              style={{
                backgroundColor: `var(${LEVEL_TOKEN[level]})`,
                outline: "1px solid var(--gh-border)",
                outlineOffset: "-1px",
              }}
            />
          ))}
          <span>más</span>
        </div>
      </div>
    </div>
  );
}

function computeMonthLabels(calendar: ContributionCalendar): string[] {
  const labels: (string | null)[] = [];
  let lastMonth = -1;
  for (const week of calendar.weeks) {
    const firstDay = week.days[0];
    if (!firstDay) {
      labels.push(null);
      continue;
    }
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push(MONTHS[month]);
      lastMonth = month;
    } else {
      labels.push(null);
    }
  }
  return labels.map((l) => l ?? "");
}
