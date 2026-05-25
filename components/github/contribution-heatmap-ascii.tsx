import { cn } from "@/lib/utils";
import type { ContributionCalendar } from "@/lib/github/types";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DAY_LABELS = ["Lun", "Mié", "Vie"];

const LEVEL_GLYPH = [" ", "·", "░", "▒", "█"] as const;
const LEVEL_TONE = [
  "text-[var(--ink-soft)] opacity-40",
  "text-[var(--gh-1)]",
  "text-[var(--gh-2)]",
  "text-[var(--gh-3)]",
  "text-[var(--gh-4)]",
] as const;

function levelFor(count: number, threshold: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  const t = count / Math.max(1, threshold);
  if (t < 0.25) return 1;
  if (t < 0.55) return 2;
  if (t < 0.85) return 3;
  return 4;
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

export function ContributionHeatmapAscii({
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

  // Build a 7-row × N-col grid: row = weekday, col = week.
  const rows: Array<Array<{ key: string; glyph: string; tone: string; title: string }>> = Array.from(
    { length: 7 },
    () => [],
  );

  calendar.weeks.forEach((week) => {
    // Each week may have 1..7 days. Fill missing rows with a blank.
    for (let row = 0; row < 7; row++) {
      const day = week.days[row];
      if (!day) {
        rows[row].push({ key: `blank-${row}-${rows[row].length}`, glyph: " ", tone: "opacity-0", title: "" });
        continue;
      }
      const lvl = levelFor(day.count, threshold);
      rows[row].push({
        key: day.date,
        glyph: LEVEL_GLYPH[lvl],
        tone: LEVEL_TONE[lvl],
        title: `${day.date} · ${day.count} contribuci${day.count === 1 ? "ón" : "ones"}`,
      });
    }
  });

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="inline-flex flex-col gap-2 font-mono text-[0.62rem] leading-[1]">
        {/* Month labels */}
        <div className="ml-7 grid text-[var(--ink-soft)] tracking-[0.05em] uppercase opacity-60">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(0, 1ch))`,
              columnGap: "5px",
            }}
          >
            {monthLabels.map((label, i) => (
              <span key={`m-${i}`} className="h-3 truncate leading-none">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-2">
          <div className="grid grid-rows-7 gap-[2px] text-[var(--ink-soft)] tracking-[0.05em] uppercase opacity-60">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={`d-${i}`} className="flex h-3 items-center">
                {i === 1 || i === 3 || i === 5 ? DAY_LABELS[(i - 1) / 2] : ""}
              </span>
            ))}
          </div>

          <div
            role="grid"
            aria-label={`Contribuciones de GitHub (ASCII) — ${calendar.totalContributions} en el año`}
            className="grid grid-rows-7 gap-y-[2px]"
            style={{
              gridTemplateColumns: `repeat(${calendar.weeks.length}, 1ch)`,
              columnGap: "5px",
              gridAutoFlow: "column",
            }}
          >
            {rows.flatMap((row) =>
              row.map((cell) => (
                <span
                  key={cell.key}
                  role="gridcell"
                  title={cell.title}
                  className={cn("inline-block h-3 w-[1ch] text-center", cell.tone)}
                  aria-hidden={!cell.title}
                >
                  {cell.glyph}
                </span>
              )),
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="ml-7 flex items-center gap-2 text-[var(--ink-soft)] tracking-[0.05em] uppercase opacity-60">
          <span>menos</span>
          {LEVEL_GLYPH.map((g, i) => (
            <span key={i} className={cn("inline-block w-[1ch] text-center", LEVEL_TONE[i])}>
              {g === " " ? "·" : g}
            </span>
          ))}
          <span>más</span>
        </div>
      </div>
    </div>
  );
}
