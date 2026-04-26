<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { cn } from "$lib/utils.js";
    import type {
        GitHubContributionDay,
        GitHubContributionWeek,
    } from "$lib/types/github-pulse";

    type ContributionIntensity = 0 | 1 | 2 | 3 | 4;

    let { weeks }: { weeks: GitHubContributionWeek[] } = $props();

    const visibleDays = $derived(
        weeks.flatMap((week) => week.contributionDays).slice(-30),
    );
    const maxVisibleContributionCount = $derived(
        visibleDays.reduce(
            (max, day) => Math.max(max, day.contributionCount),
            0,
        ),
    );
    const gridLabel = $derived(
        `${visibleDays.length} days of GitHub contributions`,
    );

    function getContributionIntensity(
        contributionCount: number,
    ): ContributionIntensity {
        if (contributionCount <= 0 || maxVisibleContributionCount <= 0) {
            return 0;
        }

        const secondThreshold = Math.max(
            2,
            maxVisibleContributionCount * 0.08,
        );
        const thirdThreshold = Math.max(
            3,
            maxVisibleContributionCount * 0.22,
        );
        const fourthThreshold = Math.max(
            5,
            maxVisibleContributionCount * 0.45,
        );

        if (contributionCount >= fourthThreshold) return 4;
        if (contributionCount >= thirdThreshold) return 3;
        if (contributionCount >= secondThreshold) return 2;
        return 1;
    }

    function getSquareClass(intensity: ContributionIntensity) {
        return cn(
            `contribution-day contribution-day--${intensity}`,
            "group/day relative flex min-h-9 flex-col justify-between overflow-hidden rounded-[12px] border px-2 py-1.5 text-left transition-[transform,background,border-color,box-shadow] duration-150",
        );
    }

    function getCountClass(
        day: GitHubContributionDay,
        intensity: ContributionIntensity,
    ) {
        return cn(
            "contribution-count",
            "text-[0.72rem] font-extrabold leading-none",
            day.contributionCount > 0
                ? "[color:var(--ios-text-primary)]"
                : "[color:var(--ios-text-tertiary)]",
            intensity === 4 && "contribution-count--strong",
        );
    }

    function getDayClass(intensity: ContributionIntensity) {
        return cn(
            "contribution-date",
            "text-[0.56rem] font-semibold leading-none",
            intensity === 4
                ? "contribution-date--strong"
                : "[color:var(--ios-text-tertiary)]",
        );
    }

    function formatDayNumber(date: string) {
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            timeZone: "UTC",
        }).format(new Date(`${date}T00:00:00Z`));
    }

    function formatRangeDate(date: string) {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        }).format(new Date(`${date}T00:00:00Z`));
    }

    function formatContributionLabel(day: GitHubContributionDay) {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        }).format(new Date(`${day.date}T00:00:00Z`));
        const count = day.contributionCount;

        if (count === 0){
            return `${formattedDate}: Busy sleeping 😴`;
        }
        else if (count <= 5)
        {
            return `${formattedDate}: ${count} only, a bit lazy 😌`;
        }
        else {
            return `${formattedDate}: ${count} contributions, I'm HIM! 🔥`;
        }
    }
</script>

{#if visibleDays.length > 0}
    <div>
        <div
            class="github-contribution-grid"
            role="img"
            aria-label={gridLabel}
        >
            {#each visibleDays as day (day.date)}
                {@const intensity = getContributionIntensity(
                    day.contributionCount,
                )}
                <Tooltip.Root>
                    <Tooltip.Trigger tabindex={-1}>
                        {#snippet child({ props })}
                            <button
                                {...props}
                                class={getSquareClass(intensity)}
                                aria-label={formatContributionLabel(day)}
                                title={formatContributionLabel(day)}
                                type="button"
                            >
                                <span class={getDayClass(intensity)}>
                                    {formatDayNumber(day.date)}
                                </span>
                                <span class={getCountClass(day, intensity)}>
                                    {day.contributionCount > 0
                                        ? day.contributionCount
                                        : ""}
                                </span>
                            </button>
                        {/snippet}
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {formatContributionLabel(day)}
                    </Tooltip.Content>
                </Tooltip.Root>
            {/each}
        </div>

        <div class="mt-2 flex items-center justify-between gap-3 text-[0.62rem] font-medium [color:var(--ios-text-tertiary)]">
            <span>{formatRangeDate(visibleDays[0].date)}</span>
            <span>{formatRangeDate(visibleDays[visibleDays.length - 1].date)}</span>
        </div>
    </div>
{:else}
    <div
        class="github-contribution-placeholder"
        aria-label="GitHub contribution calendar unavailable"
        role="img"
    >
        {#each Array.from({ length: 112 }) as _, index (index)}
            <span
                class={[
                    "block size-[9px] rounded-[2px] border sm:size-2.5",
                    index % 11 === 0 || index % 17 === 0
                        ? "[background:color-mix(in_srgb,var(--lowie-mint)_34%,transparent)] [border-color:color-mix(in_srgb,var(--lowie-mint)_24%,transparent)]"
                        : "[background:color-mix(in_srgb,var(--ios-chip-bg)_76%,transparent)] [border-color:var(--ios-chip-border)]",
                ]}
            ></span>
        {/each}
    </div>
{/if}

<style>
    .github-contribution-grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 6px;
    }

    .github-contribution-grid :global([data-slot="tooltip-trigger"]) {
        cursor: default;
        font: inherit;
    }

    .github-contribution-grid :global([data-slot="tooltip-trigger"]:hover) {
        transform: translateY(-1px) scale(1.015);
    }

    .contribution-day {
        background: var(--contribution-bg);
        border-color: var(--contribution-border);
        box-shadow: var(--contribution-shadow, none);
    }

    .contribution-day--0 {
        --contribution-bg: color-mix(
            in srgb,
            var(--ios-chip-bg) 68%,
            transparent
        );
        --contribution-border: var(--ios-chip-border);
    }

    .contribution-day--1 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-mint) 24%,
            var(--ios-chip-bg)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 24%,
            transparent
        );
    }

    .contribution-day--2 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-mint) 44%,
            var(--ios-chip-bg)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 34%,
            transparent
        );
    }

    .contribution-day--3 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-forest) 54%,
            var(--lowie-mint)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-forest) 42%,
            transparent
        );
        --contribution-shadow: 0 8px 18px
            color-mix(in srgb, var(--lowie-forest) 10%, transparent);
    }

    .contribution-day--4 {
        --contribution-bg: linear-gradient(
            135deg,
            color-mix(in srgb, var(--lowie-forest) 86%, #06150b),
            color-mix(in srgb, var(--lowie-forest) 68%, #0b2a15)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-forest) 54%,
            transparent
        );
        --contribution-shadow: 0 10px 22px
            color-mix(in srgb, var(--lowie-forest) 16%, transparent);
    }

    .contribution-count--strong,
    .contribution-date--strong {
        color: rgb(255 255 255 / 0.9);
    }

    :global(.dark) .contribution-day--1 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-mint) 16%,
            var(--ios-chip-bg)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 22%,
            transparent
        );
    }

    :global(.dark) .contribution-day--2 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-mint) 30%,
            var(--ios-chip-bg)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 30%,
            transparent
        );
    }

    :global(.dark) .contribution-day--3 {
        --contribution-bg: color-mix(
            in srgb,
            var(--lowie-mint) 48%,
            #071008
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 44%,
            transparent
        );
        --contribution-shadow: 0 8px 18px
            color-mix(in srgb, var(--lowie-mint) 12%, transparent);
    }

    :global(.dark) .contribution-day--4 {
        --contribution-bg: linear-gradient(
            135deg,
            color-mix(in srgb, var(--lowie-mint) 92%, #ffffff),
            color-mix(in srgb, var(--lowie-mint) 82%, #ffffff)
        );
        --contribution-border: color-mix(
            in srgb,
            var(--lowie-mint) 68%,
            transparent
        );
        --contribution-shadow: 0 10px 24px
            color-mix(in srgb, var(--lowie-mint) 18%, transparent);
    }

    :global(.dark) .contribution-day--4 .contribution-count,
    :global(.dark) .contribution-day--4 .contribution-date {
        color: #071008;
    }

    @media (max-width: 420px) {
        .github-contribution-grid {
            gap: 5px;
        }
    }

    .github-contribution-placeholder {
        display: grid;
        grid-template-columns: repeat(16, minmax(9px, 1fr));
        gap: 3px;
        min-width: 220px;
        opacity: 0.76;
    }
</style>
