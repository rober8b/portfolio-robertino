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

export type GithubActivity = {
  login: string;
  fetchedAt: string;
  calendar: ContributionCalendar;
  streak: StreakInfo;
  currentlyBuilding: CurrentlyBuilding | null;
  topLanguage: string | null;
  stale: boolean;
};
