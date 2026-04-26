<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { cn } from "$lib/utils.js";
    import type {
        GitHubContributionDay,
        GitHubContributionLevel,
        GitHubContributionWeek,
    } from "$lib/types/github-pulse";

    let { weeks }: { weeks: GitHubContributionWeek[] } = $props();

    const visibleDays = $derived(
        weeks.flatMap((week) => week.contributionDays).slice(-30),
    );
    const gridLabel = $derived(
        `${visibleDays.length} days of GitHub contributions`,
    );

    function getSquareClass(level: GitHubContributionLevel) {
        return cn(
            "group/day relative flex min-h-9 flex-col justify-between overflow-hidden rounded-[12px] border px-2 py-1.5 text-left transition-[transform,background,border-color,box-shadow] duration-150",
            level === "NONE" &&
                "[background:color-mix(in_srgb,var(--ios-chip-bg)_68%,transparent)] [border-color:var(--ios-chip-border)]",
            level === "FIRST_QUARTILE" &&
                "[background:color-mix(in_srgb,var(--lowie-mint)_24%,var(--ios-chip-bg))] [border-color:color-mix(in_srgb,var(--lowie-mint)_24%,transparent)]",
            level === "SECOND_QUARTILE" &&
                "[background:color-mix(in_srgb,var(--lowie-mint)_44%,var(--ios-chip-bg))] [border-color:color-mix(in_srgb,var(--lowie-mint)_34%,transparent)]",
            level === "THIRD_QUARTILE" &&
                "[background:color-mix(in_srgb,var(--ios-blue)_54%,var(--lowie-mint))] [border-color:color-mix(in_srgb,var(--ios-blue)_42%,transparent)] shadow-[0_8px_18px_color-mix(in_srgb,var(--ios-blue)_10%,transparent)]",
            level === "FOURTH_QUARTILE" &&
                "[background:linear-gradient(135deg,color-mix(in_srgb,var(--ios-blue)_86%,#06150b),color-mix(in_srgb,var(--ios-blue)_68%,#0b2a15))] [border-color:color-mix(in_srgb,var(--ios-blue)_54%,transparent)] shadow-[0_10px_22px_color-mix(in_srgb,var(--ios-blue)_16%,transparent)]",
        );
    }

    function getCountClass(day: GitHubContributionDay) {
        return cn(
            "text-[0.72rem] font-extrabold leading-none",
            day.contributionCount > 0
                ? "[color:var(--ios-text-primary)]"
                : "[color:var(--ios-text-tertiary)]",
            day.contributionLevel === "FOURTH_QUARTILE" && "text-white",
        );
    }

    function getDayClass(day: GitHubContributionDay) {
        return cn(
            "text-[0.56rem] font-semibold leading-none",
            day.contributionLevel === "FOURTH_QUARTILE"
                ? "text-white/78"
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

        return `${formattedDate}: ${count} ${count === 1 ? "contribution" : "contributions"}`;
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
                <Tooltip.Root>
                    <Tooltip.Trigger tabindex={-1}>
                        {#snippet child({ props })}
                            <button
                                {...props}
                                class={getSquareClass(day.contributionLevel)}
                                aria-label={formatContributionLabel(day)}
                                title={formatContributionLabel(day)}
                                type="button"
                            >
                                <span class={getDayClass(day)}>
                                    {formatDayNumber(day.date)}
                                </span>
                                <span class={getCountClass(day)}>
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
