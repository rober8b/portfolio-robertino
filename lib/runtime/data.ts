import type { GithubActivity } from "@/lib/github/types";
import { PROFILE, PROJECTS } from "@/lib/site-data";

export type RuntimeTerminalLine = {
  prompt: string;
  body: string;
  href?: string;
};

export type RuntimeMetric = {
  label: string;
  value: string;
};

export type RuntimeSnapshot = {
  terminal: RuntimeTerminalLine[];
  metrics: RuntimeMetric[];
  status: { label: string; tone: "ok" | "warn" };
};

function relativeTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "ahora";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}

function shortSha(oid: string | null | undefined): string {
  if (!oid) return "0000000";
  return oid.slice(0, 7);
}

export function buildRuntimeSnapshot(activity: GithubActivity | null): RuntimeSnapshot {
  const liveCount = PROJECTS.filter((p) => p.status === "live").length;
  const years = Math.max(1, new Date().getFullYear() - PROFILE.startedAt);

  const terminal: RuntimeTerminalLine[] = [];

  if (activity?.currentlyBuilding) {
    const cb = activity.currentlyBuilding;
    terminal.push({
      prompt: "$ git log -1",
      body: `${shortSha(cb.commitOid)} · ${cb.commitMessage ?? cb.repo} · ${relativeTime(cb.commitDate)}`,
      href: cb.url,
    });
    terminal.push({
      prompt: "$ active.repo",
      body: cb.repo,
      href: cb.url,
    });
  } else {
    terminal.push({ prompt: "$ git log -1", body: "github · offline" });
  }

  terminal.push({ prompt: "$ now.building", body: PROFILE.currentlyBuilding });
  terminal.push({ prompt: "$ system.uptime", body: "99.97% · region BA" });

  const metrics: RuntimeMetric[] = [
    { label: "years.building", value: String(years) },
    { label: "products.shipped", value: String(liveCount) },
    { label: "streak.days", value: activity ? String(activity.streak.current) : "—" },
    { label: "focus", value: PROFILE.currentFocus },
  ];

  return {
    terminal,
    metrics,
    status: activity
      ? { label: "connected · idle 00:12", tone: "ok" }
      : { label: "offline · cached", tone: "warn" },
  };
}
