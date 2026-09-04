import {
    GetParameterCommand,
    SSMClient,
} from "@aws-sdk/client-ssm";
import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_API_ENDPOINT = "https://api.github.com";
const CONTRIBUTION_WINDOW_DAYS = 30;
const RECENT_ACTIVITY_LIMIT = 5;

const ssm = new SSMClient({});
const s3 = new S3Client({});

const username = process.env.GITHUB_USERNAME;
const tokenParameter = process.env.GITHUB_TOKEN_PARAMETER;
const cacheBucket = process.env.CACHE_BUCKET;
const cacheObjectKey = process.env.CACHE_OBJECT_KEY;

const CONTRIBUTIONS_QUERY = `
    query PortfolioContributions(
        $login: String!
        $from: DateTime!
        $to: DateTime!
    ) {
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
                    contributions { totalCount }
                    repository {
                        nameWithOwner
                        url
                        primaryLanguage { name color }
                    }
                }
                pullRequestContributionsByRepository(maxRepositories: 8) {
                    contributions { totalCount }
                    repository {
                        nameWithOwner
                        url
                        primaryLanguage { name color }
                    }
                }
                pullRequestReviewContributionsByRepository(maxRepositories: 8) {
                    contributions { totalCount }
                    repository {
                        nameWithOwner
                        url
                        primaryLanguage { name color }
                    }
                }
                issueContributionsByRepository(maxRepositories: 8) {
                    contributions { totalCount }
                    repository {
                        nameWithOwner
                        url
                        primaryLanguage { name color }
                    }
                }
            }
        }
    }
`;

function assertConfiguration() {
    const missing = [
        ["GITHUB_USERNAME", username],
        ["GITHUB_TOKEN_PARAMETER", tokenParameter],
        ["CACHE_BUCKET", cacheBucket],
        ["CACHE_OBJECT_KEY", cacheObjectKey],
    ]
        .filter(([, value]) => !value)
        .map(([name]) => name);

    if (missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
}

async function getGitHubToken() {
    const response = await ssm.send(
        new GetParameterCommand({
            Name: tokenParameter,
            WithDecryption: true,
        }),
    );
    const token = response.Parameter?.Value;

    if (!token) {
        throw new Error("GitHub token parameter has no value");
    }

    return token;
}

function getContributionWindow() {
    const to = new Date();
    const from = new Date(
        Date.UTC(
            to.getUTCFullYear(),
            to.getUTCMonth(),
            to.getUTCDate(),
        ),
    );
    from.setUTCDate(from.getUTCDate() - (CONTRIBUTION_WINDOW_DAYS - 1));
    return { from, to };
}

async function fetchGitHubPulse() {
    const token = await getGitHubToken();
    const { from, to } = getContributionWindow();
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "apple-themed-resume",
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
    const graphqlPayload = await response.json();

    if (!response.ok || graphqlPayload.errors?.length) {
        const message = graphqlPayload.errors
            ?.map((error) => error.message)
            .join(", ");
        throw new Error(message || `GitHub returned HTTP ${response.status}`);
    }

    const user = graphqlPayload.data?.user;
    if (!user) {
        throw new Error(`GitHub user "${username}" was not found`);
    }

    const collection = user.contributionsCollection;
    const weeks = trimContributionWeeks(
        collection.contributionCalendar.weeks,
        from,
        to,
    );
    const allDays = weeks.flatMap((week) => week.contributionDays);
    const recentActivity = await fetchRecentActivity(token);

    return {
        username: user.login,
        profileUrl: user.url,
        fetchedAt: new Date().toISOString(),
        rangeDays: CONTRIBUTION_WINDOW_DAYS,
        status: "ready",
        message: null,
        totals: {
            contributions:
                collection.contributionCalendar.totalContributions,
            commits: collection.totalCommitContributions,
            pullRequests: collection.totalPullRequestContributions,
            reviews: collection.totalPullRequestReviewContributions,
            issues: collection.totalIssueContributions,
            repositoriesCreated: collection.totalRepositoryContributions,
            repositoriesTouched:
                collection.totalRepositoriesWithContributedCommits,
            restrictedContributions: collection.restrictedContributionsCount,
        },
        calendar: {
            totalContributions: allDays.reduce(
                (total, day) => total + day.contributionCount,
                0,
            ),
            activeDays: allDays.filter((day) => day.contributionCount > 0)
                .length,
            activeWeeks: weeks.filter((week) =>
                week.contributionDays.some(
                    (day) => day.contributionCount > 0,
                ),
            ).length,
            busiestDay: getBusiestDay(allDays),
            weeks,
        },
        topRepositories: buildTopRepositories(collection),
        recentActivity,
    };
}

function trimContributionWeeks(weeks, from, to) {
    const firstDay = from.toISOString().slice(0, 10);
    const lastDay = to.toISOString().slice(0, 10);

    return weeks
        .map((week) => ({
            ...week,
            contributionDays: week.contributionDays.filter(
                (day) => day.date >= firstDay && day.date <= lastDay,
            ),
        }))
        .filter((week) => week.contributionDays.length > 0);
}

function getBusiestDay(days) {
    return days.reduce((busiest, day) => {
        if (!busiest || day.contributionCount > busiest.contributionCount) {
            return day;
        }
        return busiest;
    }, null);
}

function buildTopRepositories(collection) {
    const repositories = new Map();
    addRepositoryContributions(
        repositories,
        collection.commitContributionsByRepository,
        "commits",
    );
    addRepositoryContributions(
        repositories,
        collection.pullRequestContributionsByRepository,
        "pullRequests",
    );
    addRepositoryContributions(
        repositories,
        collection.pullRequestReviewContributionsByRepository,
        "reviews",
    );
    addRepositoryContributions(
        repositories,
        collection.issueContributionsByRepository,
        "issues",
    );

    return [...repositories.values()]
        .sort((a, b) => b.total - a.total)
        .slice(0, 4);
}

function addRepositoryContributions(repositories, source, kind) {
    for (const item of source) {
        const key = item.repository.nameWithOwner;
        const existing = repositories.get(key) ?? {
            nameWithOwner: key,
            url: item.repository.url,
            languageName: item.repository.primaryLanguage?.name ?? null,
            languageColor: item.repository.primaryLanguage?.color ?? null,
            total: 0,
            commits: 0,
            pullRequests: 0,
            reviews: 0,
            issues: 0,
        };

        existing[kind] += item.contributions.totalCount;
        existing.total += item.contributions.totalCount;
        repositories.set(key, existing);
    }
}

async function fetchRecentActivity(token) {
    const response = await fetch(
        `${GITHUB_API_ENDPOINT}/users/${username}/events/public?per_page=30`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "User-Agent": "apple-themed-resume",
            },
        },
    );

    if (!response.ok) {
        return [];
    }

    const events = await response.json();
    return events
        .map(mapGitHubEvent)
        .filter(Boolean)
        .slice(0, RECENT_ACTIVITY_LIMIT);
}

function mapGitHubEvent(event) {
    const repoUrl = `https://github.com/${event.repo.name}`;
    const pullRequest = event.payload.pull_request;
    const issue = event.payload.issue;
    const fallbackUrl = pullRequest?.html_url ?? issue?.html_url ?? repoUrl;

    switch (event.type) {
        case "PushEvent": {
            const commitCount =
                event.payload.size ?? event.payload.commits?.length ?? 0;
            const branch = event.payload.ref?.split("/").at(-1);
            return {
                id: event.id,
                type: "Push",
                accent: "commit",
                title:
                    commitCount > 0
                        ? `Pushed ${formatCount(commitCount, "commit")}${branch ? ` to ${branch}` : ""}`
                        : `Pushed${branch ? ` to ${branch}` : ""}`,
                repo: event.repo.name,
                url: repoUrl,
                createdAt: event.created_at,
            };
        }
        case "PullRequestEvent":
            return {
                id: event.id,
                type: "Pull request",
                accent: "pull-request",
                title: `${pullRequest?.merged ? "Merged" : toTitleCase(event.payload.action ?? "Updated")} PR${pullRequest ? ` #${pullRequest.number}` : ""}`,
                repo: event.repo.name,
                url: pullRequest?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        case "PullRequestReviewEvent":
            return {
                id: event.id,
                type: "Review",
                accent: "review",
                title: "Reviewed a pull request",
                repo: event.repo.name,
                url: pullRequest?.html_url ?? fallbackUrl,
                createdAt: event.created_at,
            };
        case "IssuesEvent":
        case "IssueCommentEvent":
            return {
                id: event.id,
                type:
                    event.type === "IssuesEvent" ? "Issue" : "Issue comment",
                accent: "issue",
                title:
                    event.type === "IssuesEvent"
                        ? `${toTitleCase(event.payload.action ?? "Updated")} issue${issue ? ` #${issue.number}` : ""}`
                        : "Commented on an issue",
                repo: event.repo.name,
                url: issue?.html_url ?? fallbackUrl,
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

function formatCount(value, singular) {
    return `${value} ${value === 1 ? singular : `${singular}s`}`;
}

function toTitleCase(value) {
    return value.replace(/^\w/, (letter) => letter.toUpperCase());
}

async function writeCache(payload) {
    await s3.send(
        new PutObjectCommand({
            Bucket: cacheBucket,
            Key: cacheObjectKey,
            Body: JSON.stringify(payload),
            ContentType: "application/json",
            CacheControl: "public, max-age=300, stale-while-revalidate=86400",
        }),
    );
}

async function readCache() {
    const response = await s3.send(
        new GetObjectCommand({
            Bucket: cacheBucket,
            Key: cacheObjectKey,
        }),
    );

    if (!response.Body) {
        throw new Error("GitHub pulse cache object has no body");
    }

    return JSON.parse(await response.Body.transformToString());
}

function isHttpRequest(event) {
    return Boolean(event?.requestContext?.http || event?.httpMethod);
}

function httpResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control":
                "public, max-age=300, stale-while-revalidate=86400",
            "access-control-allow-origin": "*",
        },
        body: JSON.stringify(body),
    };
}

export const handler = async (event = {}) => {
    assertConfiguration();

    if (isHttpRequest(event)) {
        try {
            return httpResponse(200, await readCache());
        } catch (error) {
            console.warn("Cache read failed; refreshing it", {
                error: error instanceof Error ? error.message : "Unknown error",
            });

            try {
                const payload = await fetchGitHubPulse();
                await writeCache(payload);
                return httpResponse(200, payload);
            } catch (refreshError) {
                console.error("GitHub pulse refresh failed", {
                    error:
                        refreshError instanceof Error
                            ? refreshError.message
                            : "Unknown error",
                });
                return httpResponse(502, {
                    message: "GitHub activity is temporarily unavailable.",
                });
            }
        }
    }

    const payload = await fetchGitHubPulse();
    await writeCache(payload);

    return {
        cached: true,
        username: payload.username,
        status: payload.status,
        totalContributions: payload.totals.contributions,
        fetchedAt: payload.fetchedAt,
    };
};
