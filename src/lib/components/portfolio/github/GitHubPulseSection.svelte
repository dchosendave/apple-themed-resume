<script lang="ts">
    import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
    import GitCommitHorizontalIcon from "@lucide/svelte/icons/git-commit-horizontal";
    import GitPullRequestIcon from "@lucide/svelte/icons/git-pull-request";
    import RadioIcon from "@lucide/svelte/icons/radio";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import GithubMark from "$lib/components/portfolio/shared/GithubMark.svelte";
    import GitHubContributionGrid from "$lib/components/portfolio/github/GitHubContributionGrid.svelte";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import type {
        GitHubPulseData,
        GitHubRepositoryContribution,
    } from "$lib/types/github-pulse";

    let { pulse }: { pulse: GitHubPulseData } = $props();

    const numberFormatter = new Intl.NumberFormat("en-US");
    const compactFormatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    });

    const hasContributionCalendar = $derived(pulse.calendar.weeks.length > 0);
    const totalLabel = $derived(
        hasContributionCalendar ? "Contributions" : "Public Events",
    );
    const fetchedLabel = $derived(formatDate(pulse.fetchedAt));
    const rangeLabel = $derived(`${pulse.rangeDays} days`);
    const latestActivity = $derived(pulse.recentActivity[0] ?? null);
    const primaryMetric = $derived(
        hasContributionCalendar
            ? pulse.totals.contributions
            : pulse.recentActivity.length,
    );
    const strongestRepoTotal = $derived(
        Math.max(...pulse.topRepositories.map((repo) => repo.total), 1),
    );

    function formatNumber(value: number) {
        return value >= 1000
            ? compactFormatter.format(value)
            : numberFormatter.format(value);
    }

    function formatDate(value: string) {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        }).format(new Date(value));
    }

    function getRepositoryShortName(nameWithOwner: string) {
        return nameWithOwner.split("/").at(-1) ?? nameWithOwner;
    }

    function getRepoBarWidth(repo: GitHubRepositoryContribution) {
        return `${Math.max((repo.total / strongestRepoTotal) * 100, 8)}%`;
    }

    function formatActivityPhrase(title: string) {
        return title.replace(/^\w/, (letter) => letter.toLowerCase());
    }
</script>

<PortfolioCard class="lowie-card-glow flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="relative z-[1] flex items-start justify-between gap-3">
        <div class="min-w-0">
            <div class="mb-1.5 flex flex-wrap items-center gap-2">
                <GithubMark class="size-4 [color:var(--ios-blue)]" />
                <p class="apple-section-title mb-0">GitHub Pulse</p>
            </div>
            <p class="text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                Contribution rhythm, recent public work, and repos touched.
            </p>
        </div>

        <a
            href={pulse.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="apple-icon-button size-8 shrink-0"
            aria-label="Open GitHub profile"
            title="Open GitHub profile"
        >
            <ExternalLinkIcon class="size-3.5" />
        </a>
    </div>

    <div class="relative z-[1] grid grid-cols-2 gap-2">
        <div class="rounded-[18px] border p-3 [background:color-mix(in_srgb,var(--ios-chip-bg)_88%,transparent)] [border-color:var(--ios-glass-border)]">
            <span class="block text-[1.45rem] font-extrabold leading-none tracking-[-0.02em] [color:var(--ios-blue)]">
                {formatNumber(primaryMetric)}
            </span>
            <span class="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-secondary)]">
                {totalLabel}
            </span>
        </div>

        <div class="rounded-[18px] border p-3 [background:color-mix(in_srgb,var(--ios-chip-bg)_88%,transparent)] [border-color:var(--ios-glass-border)]">
            <span class="block text-[1.45rem] font-extrabold leading-none tracking-[-0.02em] [color:var(--ios-blue)]">
                {formatNumber(
                    hasContributionCalendar
                        ? pulse.calendar.activeWeeks
                        : pulse.totals.repositoriesTouched,
                )}
            </span>
            <span class="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-secondary)]">
                {hasContributionCalendar ? "Active Weeks" : "Repos Seen"}
            </span>
        </div>
    </div>

    <section class="relative z-[1] rounded-[20px] border p-3.5 [background:color-mix(in_srgb,var(--ios-chip-bg)_66%,transparent)] [border-color:var(--ios-glass-border)]">
        <div class="mb-3 flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-2">
                <RadioIcon class="size-3.5 shrink-0 [color:var(--ios-blue)]" />
                <p class="truncate text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]">
                    Contribution Map
                </p>
            </div>
            <Badge
                variant="outline"
                class="rounded-full border px-2 py-0.5 text-[0.62rem] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
            >
                {hasContributionCalendar ? rangeLabel : "Public feed"}
            </Badge>
        </div>

        {#if latestActivity}
            <p
                class="mb-3 rounded-[16px] border px-3 py-2 text-[0.74rem] leading-[1.5] [background:color-mix(in_srgb,var(--ios-glass)_56%,transparent)] [border-color:var(--ios-glass-border)] [color:var(--ios-text-secondary)]"
            >
                I last worked on
                <a
                    href={latestActivity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-semibold [color:var(--ios-text-primary)] hover:[color:var(--ios-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]"
                >
                    {latestActivity.repo}
                </a>
                and {formatActivityPhrase(latestActivity.title)}
                <span class="whitespace-nowrap [color:var(--ios-text-tertiary)]">
                    on {formatDate(latestActivity.createdAt)}.
                </span>
            </p>
        {/if}

        <GitHubContributionGrid weeks={pulse.calendar.weeks} />

        {#if pulse.message}
            <p class="mt-2 text-[0.68rem] leading-[1.45] [color:var(--ios-text-tertiary)]">
                {pulse.message}
            </p>
        {/if}
    </section>

    <div class="relative z-[1] grid gap-4">
        <section class="grid gap-2.5">
            <div class="flex items-center justify-between gap-3">
                <p class="text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]">
                    Repo Signal
                </p>
                <Badge
                    variant="outline"
                    class="rounded-full border px-2 py-0.5 text-[0.62rem] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                >
                    Updated {fetchedLabel}
                </Badge>
            </div>

            {#if pulse.topRepositories.length > 0}
                <div class="grid gap-2">
                    {#each pulse.topRepositories as repo (repo.nameWithOwner)}
                        <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group/repo rounded-[16px] border p-3 transition-[background,border-color,transform] duration-150 [background:var(--ios-chip-bg)] [border-color:var(--ios-glass-border)] hover:-translate-y-px hover:[background:color-mix(in_srgb,var(--ios-chip-bg)_82%,var(--ios-stat-bg))] hover:[border-color:color-mix(in_srgb,var(--ios-blue)_34%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]"
                        >
                            <div class="flex items-start justify-between gap-3">
                                <div class="min-w-0">
                                    <p class="truncate text-[0.8rem] font-semibold [color:var(--ios-text-primary)]">
                                        {getRepositoryShortName(
                                            repo.nameWithOwner,
                                        )}
                                    </p>
                                    <p class="truncate text-[0.67rem] [color:var(--ios-text-tertiary)]">
                                        {repo.nameWithOwner}
                                    </p>
                                </div>

                                <Badge
                                    variant="outline"
                                    class="rounded-full px-2 py-0.5 text-[0.62rem] [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_22%,transparent)] [color:var(--ios-blue)]"
                                >
                                    {formatNumber(repo.total)}
                                </Badge>
                            </div>

                            <div class="mt-2.5 h-1.5 overflow-hidden rounded-full [background:color-mix(in_srgb,var(--ios-chip-bg)_72%,transparent)]">
                                <span
                                    class="block h-full rounded-full [background:linear-gradient(90deg,var(--ios-blue),var(--lowie-warm))]"
                                    style={`width: ${getRepoBarWidth(repo)}`}
                                ></span>
                            </div>

                            <div class="mt-2 flex flex-wrap items-center gap-2">
                                {#if repo.languageName}
                                    <span class="inline-flex items-center gap-1.5 text-[0.66rem] [color:var(--ios-text-secondary)]">
                                        <span
                                            class="size-2 rounded-full"
                                            style={`background: ${repo.languageColor ?? "var(--ios-blue)"}`}
                                        ></span>
                                        {repo.languageName}
                                    </span>
                                {/if}

                                <span class="inline-flex items-center gap-1 text-[0.66rem] [color:var(--ios-text-tertiary)]">
                                    <GitCommitHorizontalIcon class="size-3" />
                                    {formatNumber(repo.commits)}
                                </span>
                                <span class="inline-flex items-center gap-1 text-[0.66rem] [color:var(--ios-text-tertiary)]">
                                    <GitPullRequestIcon class="size-3" />
                                    {formatNumber(repo.pullRequests)}
                                </span>
                            </div>
                        </a>
                    {/each}
                </div>
            {:else}
                <p class="rounded-[16px] border p-3 text-[0.76rem] [background:var(--ios-chip-bg)] [border-color:var(--ios-glass-border)] [color:var(--ios-text-secondary)]">
                    Repo activity is quiet right now.
                </p>
            {/if}
        </section>
    </div>
</PortfolioCard>
