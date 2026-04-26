import { env } from "$env/dynamic/private";
import { personalInfo } from "$lib/data/personal-information";
import type {
    GitHubActivity,
    GitHubActivityAccent,
    GitHubContributionDay,
    GitHubContributionWeek,
    GitHubPulseData,
    GitHubRepositoryContribution,
} from "$lib/types/github-pulse";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_API_ENDPOINT = "https://api.github.com";
const CACHE_TTL_MS = 1000 * 60 * 30;
const CONTRIBUTION_WINDOW_DAYS = 30;
const RECENT_ACTIVITY_LIMIT = 5;

const CONTRIBUTIONS_QUERY = `
query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    login
    url
    contributionsCollection(from: $from, to: $to) {
      restrictedContributionsCount
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalRepositoryContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays {
            date
            weekday
            contributionCount
            contributionLevel
            color
          }
        }
      }
      commitContributionsByRepository(maxRepositories: 8) {
        contributions {
          totalCount
        }
        repository {
          nameWithOwner
          url
          primaryLanguage {
            name
            color
          }
        }
      }
      pullRequestContributionsByRepository(maxRepositories: 8) {
        contributions {
          totalCount
        }
        repository {
          nameWithOwner
          url
          primaryLanguage {
            name
            color
          }
        }
      }
      pullRequestReviewContributionsByRepository(maxRepositories: 8) {
        contributions {
          totalCount
        }
        repository {
          nameWithOwner
          url
          primaryLanguage {
            name
            color
          }
        }
      }
      issueContributionsByRepository(maxRepositories: 8) {
        contributions {
          totalCount
        }
        repository {
          nameWithOwner
          url
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}
`;

type Fetch = typeof fetch;

interface GitHubLanguageNode {
    name: string;
    color: string;
}

interface GitHubRepositoryNode {
    nameWithOwner: string;
    url: string;
    primaryLanguage: GitHubLanguageNode | null;
}

interface GitHubContributionByRepository {
    contributions: {
        totalCount: number;
    };
    repository: GitHubRepositoryNode;
}

interface GitHubContributionCalendarResponse {
    totalContributions: number;
    weeks: GitHubContributionWeek[];
}

interface GitHubContributionsCollectionResponse {
    restrictedContributionsCount: number;
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
    totalRepositoryContributions: number;
    totalRepositoriesWithContributedCommits: number;
    contributionCalendar: GitHubContributionCalendarResponse;
    commitContributionsByRepository: GitHubContributionByRepository[];
    pullRequestContributionsByRepository: GitHubContributionByRepository[];
    pullRequestReviewContributionsByRepository: GitHubContributionByRepository[];
    issueContributionsByRepository: GitHubContributionByRepository[];
}

interface GitHubGraphQLResponse {
    data?: {
        user: {
            login: string;
            url: string;
            contributionsCollection: GitHubContributionsCollectionResponse;
        } | null;
    };
    errors?: { message: string }[];
}

interface GitHubRestEvent {
    id: string;
    type: string;
    repo: {
        name: string;
    };
    payload: {
        action?: string;
        ref?: string;
        ref_type?: string;
        size?: number;
        commits?: { sha: string; message: string }[];
        pull_request?: {
            html_url: string;
            title: string;
            number: number;
            merged?: boolean;
        };
        issue?: {
            html_url: string;
            title: string;
            number: number;
        };
        release?: {
            html_url: string;
            name: string | null;
            tag_name: string;
        };
    };
    created_at: string;
}

let pulseCache: { expiresAt: number; data: GitHubPulseData } | null = null;

export async function getGitHubPulse(apiFetch: Fetch): Promise<GitHubPulseData> {
    const username = getGitHubUsername(personalInfo.github);
    const token = getGitHubToken();

    if (pulseCache && pulseCache.expiresAt > Date.now()) {
        return pulseCache.data;
    }

    const data = token
        ? await fetchGraphQLPulse(apiFetch, username, token).catch(() =>
              fetchPublicEventsPulse(apiFetch, username, token, "Contribution graph is temporarily unavailable."),
          )
        : await fetchPublicEventsPulse(apiFetch, username, null, "Showing recent public activity.");

    pulseCache = {
        data,
        expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return data;
}

function getGitHubUsername(profileUrl: string) {
    try {
        const parsedUrl = new URL(profileUrl);
        return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? profileUrl;
    } catch {
        return profileUrl.replace(/^@/, "");
    }
}

function getGitHubToken() {
    return env.GITHUB_TOKEN ?? env.GH_TOKEN ?? env.GITHUB_PAT ?? env.PRIVATE_GITHUB_TOKEN ?? null;
}

async function fetchGraphQLPulse(apiFetch: Fetch, username: string, token: string): Promise<GitHubPulseData> {
    const to = new Date();
    const from = getContributionWindowStart(to);

    const response = await apiFetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            query: CONTRIBUTIONS_QUERY,
            variables: {
                login: username,
                from: from.toISOString(),
                to: to.toISOString(),
            },
        }),
    });

    const payload = (await response.json()) as GitHubGraphQLResponse;

    if (!response.ok || payload.errors?.length || !payload.data?.user) {
        throw new Error(payload.errors?.[0]?.message ?? "GitHub GraphQL request failed.");
    }

    const collection = payload.data.user.contributionsCollection;
    const weeks = trimContributionWeeks(collection.contributionCalendar.weeks, from, to);
    const allDays = weeks.flatMap((week) => week.contributionDays);
    const activeDays = allDays.filter((day) => day.contributionCount > 0).length;
    const activeWeeks = weeks.filter((week) =>
        week.contributionDays.some((day) => day.contributionCount > 0),
    ).length;
    const busiestDay = getBusiestDay(allDays);
    const topRepositories = buildTopRepositories(collection);
    const recentActivity = await fetchRecentActivity(apiFetch, username, token);

    return {
        username: payload.data.user.login,
        profileUrl: payload.data.user.url,
        fetchedAt: new Date().toISOString(),
        rangeDays: CONTRIBUTION_WINDOW_DAYS,
        status: "ready",
        message: null,
        totals: {
            contributions: collection.contributionCalendar.totalContributions,
            commits: collection.totalCommitContributions,
            pullRequests: collection.totalPullRequestContributions,
            reviews: collection.totalPullRequestReviewContributions,
            issues: collection.totalIssueContributions,
            repositoriesCreated: collection.totalRepositoryContributions,
            repositoriesTouched: collection.totalRepositoriesWithContributedCommits,
            restrictedContributions: collection.restrictedContributionsCount,
        },
        calendar: {
            totalContributions: allDays.reduce((sum, day) => sum + day.contributionCount, 0),
            activeDays,
            activeWeeks,
            busiestDay,
            weeks,
        },
        topRepositories,
        recentActivity,
    };
}

async function fetchPublicEventsPulse(
    apiFetch: Fetch,
    username: string,
    token: string | null,
    message: string,
): Promise<GitHubPulseData> {
    const recentActivity = await fetchRecentActivity(apiFetch, username, token);

    return {
        username,
        profileUrl: `https://github.com/${username}`,
        fetchedAt: new Date().toISOString(),
        rangeDays: CONTRIBUTION_WINDOW_DAYS,
        status: recentActivity.length > 0 ? "public-events" : "unavailable",
        message,
        totals: {
            contributions: recentActivity.length,
            commits: recentActivity.filter((activity) => activity.accent === "commit").length,
            pullRequests: recentActivity.filter((activity) => activity.accent === "pull-request").length,
            reviews: recentActivity.filter((activity) => activity.accent === "review").length,
            issues: recentActivity.filter((activity) => activity.accent === "issue").length,
            repositoriesCreated: 0,
            repositoriesTouched: new Set(recentActivity.map((activity) => activity.repo)).size,
            restrictedContributions: 0,
        },
        calendar: {
            totalContributions: 0,
            activeDays: 0,
            activeWeeks: 0,
            busiestDay: null,
            weeks: [],
        },
        topRepositories: buildTopRepositoriesFromEvents(recentActivity),
        recentActivity,
    };
}

function getContributionWindowStart(to: Date) {
    const from = new Date(
        Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate(), 0, 0, 0, 0),
    );
    from.setUTCDate(from.getUTCDate() - (CONTRIBUTION_WINDOW_DAYS - 1));
    return from;
}

function trimContributionWeeks(weeks: GitHubContributionWeek[], from: Date, to: Date) {
    const fromDay = toDateKey(from);
    const toDay = toDateKey(to);

    return weeks
        .map((week) => ({
            ...week,
            contributionDays: week.contributionDays.filter(
                (day) => day.date >= fromDay && day.date <= toDay,
            ),
        }))
        .filter((week) => week.contributionDays.length > 0);
}

function toDateKey(date: Date) {
    return date.toISOString().slice(0, 10);
}

async function fetchRecentActivity(apiFetch: Fetch, username: string, token: string | null) {
    const response = await apiFetch(
        `${GITHUB_API_ENDPOINT}/users/${username}/events/public?per_page=30`,
        {
            headers: {
                accept: "application/vnd.github+json",
                ...(token ? { authorization: `Bearer ${token}` } : {}),
            },
        },
    );

    if (!response.ok) {
        return [];
    }

    const events = (await response.json()) as GitHubRestEvent[];
    return events.map(mapRestEvent).filter(Boolean).slice(0, RECENT_ACTIVITY_LIMIT) as GitHubActivity[];
}

function mapRestEvent(event: GitHubRestEvent): GitHubActivity | null {
    const repoUrl = `https://github.com/${event.repo.name}`;
    const fallbackUrl = event.payload.pull_request?.html_url ?? event.payload.issue?.html_url ?? repoUrl;

    switch (event.type) {
        case "PushEvent": {
            const commitCount = event.payload.size ?? event.payload.commits?.length ?? 0;
            const branch = event.payload.ref?.split("/").at(-1);
            const title =
                commitCount > 0
                    ? `Pushed ${formatCount(commitCount, "commit")}${branch ? ` to ${branch}` : ""}`
                    : `Pushed${branch ? ` to ${branch}` : ""}`;

            return {
                id: event.id,
                type: "Push",
                accent: "commit",
                title,
                repo: event.repo.name,
                url: repoUrl,
                createdAt: event.created_at,
            };
        }
        case "PullRequestEvent": {
            const pullRequest = event.payload.pull_request;
            const action = pullRequest?.merged ? "Merged" : toTitleCase(event.payload.action ?? "Updated");

            return {
                id: event.id,
                type: "Pull request",
                accent: "pull-request",
                title: `${action} PR${pullRequest ? ` #${pullRequest.number}` : ""}`,
                repo: event.repo.name,
                url: pullRequest?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        }
        case "PullRequestReviewEvent":
            return {
                id: event.id,
                type: "Review",
                accent: "review",
                title: "Reviewed a pull request",
                repo: event.repo.name,
                url: event.payload.pull_request?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        case "IssuesEvent":
            return {
                id: event.id,
                type: "Issue",
                accent: "issue",
                title: `${toTitleCase(event.payload.action ?? "Updated")} issue${
                    event.payload.issue ? ` #${event.payload.issue.number}` : ""
                }`,
                repo: event.repo.name,
                url: event.payload.issue?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        case "IssueCommentEvent":
            return {
                id: event.id,
                type: "Issue comment",
                accent: "issue",
                title: "Commented on an issue",
                repo: event.repo.name,
                url: event.payload.issue?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        case "CreateEvent":
            return {
                id: event.id,
                type: "Create",
                accent: "repo",
                title: `Created ${event.payload.ref_type ?? "resource"}${event.payload.ref ? ` ${event.payload.ref}` : ""}`,
                repo: event.repo.name,
                url: repoUrl,
                createdAt: event.created_at,
            };
        case "ReleaseEvent":
            return {
                id: event.id,
                type: "Release",
                accent: "release",
                title: `Released ${event.payload.release?.name ?? event.payload.release?.tag_name ?? "a version"}`,
                repo: event.repo.name,
                url: event.payload.release?.html_url ?? repoUrl,
                createdAt: event.created_at,
            };
        default:
            return {
                id: event.id,
                type: event.type.replace(/Event$/, ""),
                accent: "other",
                title: event.type.replace(/Event$/, ""),
                repo: event.repo.name,
                url: fallbackUrl,
                createdAt: event.created_at,
            };
    }
}

function buildTopRepositories(collection: GitHubContributionsCollectionResponse) {
    const repositories = new Map<string, GitHubRepositoryContribution>();

    addRepositoryContribution(repositories, collection.commitContributionsByRepository, "commits");
    addRepositoryContribution(repositories, collection.pullRequestContributionsByRepository, "pullRequests");
    addRepositoryContribution(repositories, collection.pullRequestReviewContributionsByRepository, "reviews");
    addRepositoryContribution(repositories, collection.issueContributionsByRepository, "issues");

    return [...repositories.values()].sort((a, b) => b.total - a.total).slice(0, 4);
}

function addRepositoryContribution(
    repositories: Map<string, GitHubRepositoryContribution>,
    source: GitHubContributionByRepository[],
    kind: "commits" | "pullRequests" | "reviews" | "issues",
) {
    for (const item of source) {
        const key = item.repository.nameWithOwner;
        const existing =
            repositories.get(key) ??
            ({
                nameWithOwner: key,
                url: item.repository.url,
                languageName: item.repository.primaryLanguage?.name ?? null,
                languageColor: item.repository.primaryLanguage?.color ?? null,
                total: 0,
                commits: 0,
                pullRequests: 0,
                reviews: 0,
                issues: 0,
            } satisfies GitHubRepositoryContribution);

        existing[kind] += item.contributions.totalCount;
        existing.total += item.contributions.totalCount;
        repositories.set(key, existing);
    }
}

function buildTopRepositoriesFromEvents(activity: GitHubActivity[]) {
    const repositories = new Map<string, GitHubRepositoryContribution>();

    for (const item of activity) {
        const existing =
            repositories.get(item.repo) ??
            ({
                nameWithOwner: item.repo,
                url: `https://github.com/${item.repo}`,
                languageName: null,
                languageColor: null,
                total: 0,
                commits: 0,
                pullRequests: 0,
                reviews: 0,
                issues: 0,
            } satisfies GitHubRepositoryContribution);

        existing.total += 1;
        if (item.accent === "commit") existing.commits += 1;
        if (item.accent === "pull-request") existing.pullRequests += 1;
        if (item.accent === "review") existing.reviews += 1;
        if (item.accent === "issue") existing.issues += 1;
        repositories.set(item.repo, existing);
    }

    return [...repositories.values()].sort((a, b) => b.total - a.total).slice(0, 4);
}

function getBusiestDay(days: GitHubContributionDay[]) {
    return days.reduce<GitHubContributionDay | null>((busiest, day) => {
        if (!busiest || day.contributionCount > busiest.contributionCount) {
            return day;
        }

        return busiest;
    }, null);
}

function formatCount(value: number, singular: string) {
    return `${value} ${value === 1 ? singular : `${singular}s`}`;
}

function toTitleCase(value: string) {
    return value.replace(/^\w/, (letter) => letter.toUpperCase());
}
