export type GitHubPulseStatus = "ready" | "public-events" | "unavailable";

export type GitHubContributionLevel =
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";

export type GitHubActivityAccent =
    | "commit"
    | "pull-request"
    | "review"
    | "issue"
    | "release"
    | "repo"
    | "other";

export interface GitHubContributionDay {
    date: string;
    weekday: number;
    contributionCount: number;
    contributionLevel: GitHubContributionLevel;
    color: string;
}

export interface GitHubContributionWeek {
    firstDay: string;
    contributionDays: GitHubContributionDay[];
}

export interface GitHubRepositoryContribution {
    nameWithOwner: string;
    url: string;
    languageName: string | null;
    languageColor: string | null;
    total: number;
    commits: number;
    pullRequests: number;
    reviews: number;
    issues: number;
}

export interface GitHubActivity {
    id: string;
    type: string;
    accent: GitHubActivityAccent;
    title: string;
    repo: string;
    url: string;
    createdAt: string;
}

export interface GitHubPulseTotals {
    contributions: number;
    commits: number;
    pullRequests: number;
    reviews: number;
    issues: number;
    repositoriesCreated: number;
    repositoriesTouched: number;
    restrictedContributions: number;
}

export interface GitHubPulseCalendar {
    totalContributions: number;
    activeDays: number;
    activeWeeks: number;
    busiestDay: GitHubContributionDay | null;
    weeks: GitHubContributionWeek[];
}

export interface GitHubPulseData {
    username: string;
    profileUrl: string;
    fetchedAt: string;
    rangeDays: number;
    status: GitHubPulseStatus;
    message: string | null;
    totals: GitHubPulseTotals;
    calendar: GitHubPulseCalendar;
    topRepositories: GitHubRepositoryContribution[];
    recentActivity: GitHubActivity[];
}
