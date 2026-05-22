import "server-only";

import type {
  ContributionCalendar,
  ContributionDay,
  CurrentlyBuilding,
  GithubActivity,
  StreakInfo,
} from "@/lib/github/types";

const GH_LOGIN = "rober8b";
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const CACHE_REVALIDATE_SECONDS = 60 * 60; // 1 hour
const CACHE_TAG = `github:user:${GH_LOGIN}`;

const QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
      repositories(
        first: 5
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          name
          description
          url
          pushedAt
          primaryLanguage {
            name
            color
          }
          defaultBranchRef {
            target {
              ... on Commit {
                messageHeadline
                committedDate
                oid
              }
            }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              weekday: number;
            }>;
          }>;
        };
      };
      repositories: {
        nodes: Array<{
          name: string;
          description: string | null;
          url: string;
          pushedAt: string;
          primaryLanguage: { name: string; color: string } | null;
          defaultBranchRef: {
            target: {
              messageHeadline?: string;
              committedDate?: string;
              oid?: string;
            };
          } | null;
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export async function fetchGithubActivity(): Promise<GithubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "rober8b-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GH_LOGIN } }),
      next: { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAG] },
    });

    if (!res.ok) {
      console.error(`GitHub API ${res.status}: ${await res.text()}`);
      return null;
    }

    const payload = (await res.json()) as GraphQLResponse;
    if (payload.errors?.length) {
      console.error("GitHub GraphQL errors:", payload.errors);
      return null;
    }
    if (!payload.data) return null;

    const calendar = transformCalendar(payload.data.user.contributionsCollection.contributionCalendar);
    const streak = computeStreak(calendar);
    const currentlyBuilding = transformCurrentlyBuilding(payload.data.user.repositories.nodes);
    const topLanguage = pickTopLanguage(payload.data.user.repositories.nodes);

    return {
      login: GH_LOGIN,
      fetchedAt: new Date().toISOString(),
      calendar,
      streak,
      currentlyBuilding,
      topLanguage,
      stale: false,
    };
  } catch (err) {
    console.error("Failed to fetch GitHub activity:", err);
    return null;
  }
}

function transformCalendar(raw: NonNullable<GraphQLResponse["data"]>["user"]["contributionsCollection"]["contributionCalendar"]): ContributionCalendar {
  return {
    totalContributions: raw.totalContributions,
    weeks: raw.weeks.map((w) => ({
      days: w.contributionDays.map(
        (d): ContributionDay => ({
          date: d.date,
          count: d.contributionCount,
          weekday: d.weekday,
        }),
      ),
    })),
  };
}

function computeStreak(calendar: ContributionCalendar): StreakInfo {
  const flat: ContributionDay[] = calendar.weeks.flatMap((w) => w.days);
  flat.sort((a, b) => a.date.localeCompare(b.date));

  let current = 0;
  let longest = 0;
  let running = 0;
  let latestActiveDate: string | null = null;

  const today = new Date().toISOString().slice(0, 10);
  let pastToday = false;

  for (const day of flat) {
    if (day.date > today) continue;
    if (day.count > 0) {
      running += 1;
      latestActiveDate = day.date;
      if (running > longest) longest = running;
    } else {
      running = 0;
    }
  }

  // Re-walk from end to compute "current" streak
  for (let i = flat.length - 1; i >= 0; i--) {
    const day = flat[i];
    if (day.date > today) continue;
    if (!pastToday) pastToday = true;
    if (day.count > 0) {
      current += 1;
    } else {
      break;
    }
  }

  return { current, longest, latestActiveDate };
}

function transformCurrentlyBuilding(
  nodes: NonNullable<GraphQLResponse["data"]>["user"]["repositories"]["nodes"],
): CurrentlyBuilding | null {
  const node = nodes[0];
  if (!node) return null;
  const target = node.defaultBranchRef?.target;
  return {
    repo: node.name,
    url: node.url,
    description: node.description,
    language: node.primaryLanguage?.name ?? null,
    languageColor: node.primaryLanguage?.color ?? null,
    pushedAt: node.pushedAt,
    commitMessage: target?.messageHeadline ?? null,
    commitDate: target?.committedDate ?? null,
    commitOid: target?.oid ?? null,
  };
}

function pickTopLanguage(
  nodes: NonNullable<GraphQLResponse["data"]>["user"]["repositories"]["nodes"],
): string | null {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    const name = node.primaryLanguage?.name;
    if (!name) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [name, count] of counts) {
    if (count > bestCount) {
      best = name;
      bestCount = count;
    }
  }
  return best;
}
