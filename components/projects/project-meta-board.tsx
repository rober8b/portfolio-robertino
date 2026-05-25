import type { Project } from "@/lib/site-data";

type Mode = "dev" | "client";

export function ProjectMetaBoard({ project, mode }: { project: Project; mode: Mode }) {
  const rows: Array<[string, string]> = [
    ["Status", project.statusLabel[mode]],
    ["Year", project.year],
    ["Industry", project.industry],
  ];

  if (project.client) {
    rows.push(["Client", project.client]);
  }

  return (
    <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-6 lg:p-8">
      <SpecularBackdrop />
      <dl className="relative grid gap-3 font-mono text-[0.65rem] tracking-[0.06em] uppercase">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3">
            <dt className="text-[var(--ink-soft)] opacity-60">{label}</dt>
            <dd className="text-[var(--ink)]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-8">
        <p className="font-mono text-[0.6rem] tracking-[0.12em] text-[var(--ink-soft)] uppercase opacity-60">
          Stack
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-1.5 font-mono text-[0.65rem]">
          {project.stack.slice(0, 8).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-[var(--border-glass)] bg-[var(--surface-glass)] px-2 py-1 text-[var(--ink-soft)] backdrop-blur"
            >
              {tech.toLowerCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SpecularBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-50"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 20% 0%, var(--specular), transparent 60%)",
      }}
    />
  );
}
