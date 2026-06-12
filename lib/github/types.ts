export type ContributionDay = {
  date: string;
  count: number;
  weekday: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

export type StreakInfo = {
  current: number;
  longest: number;
  latestActiveDate: string | null;
};

export type CurrentlyBuilding = {
  repo: string;
  url: string;
  description: string | null;
  language: string | null;
  languageColor: string | null;
  pushedAt: string;
  commitMessage: string | null;
  commitDate: string | null;
  commitOid: string | null;
};

export type CommitEntry = {
  sha: string;
  repo: string;
  url: string;
  message: string;
  date: string;
  language: string | null;
};

export type ContributionBreakdown = {
  commits: number;
  pullRequests: number;
  issues: number;
  /** Contribs in private repos that GitHub redacts from the public profile.
   *  When fetched with a PAT con scope repo, ya están incluidas en
   *  calendar.totalContributions; este número permite reportarlas explícito. */
  restricted: number;
};

export type GithubActivity = {
  login: string;
  fetchedAt: string;
  calendar: ContributionCalendar;
  streak: StreakInfo;
  currentlyBuilding: CurrentlyBuilding | null;
  recentCommits: CommitEntry[];
  topLanguage: string | null;
  breakdown: ContributionBreakdown;
  stale: boolean;
};
