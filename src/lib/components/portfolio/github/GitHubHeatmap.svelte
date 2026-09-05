<script lang="ts">
    import type { GitHubContributionWeek, GitHubContributionLevel } from '$lib/types/github-pulse';

    let { weeks }: { weeks: GitHubContributionWeek[] } = $props();

    const levelClass: Record<GitHubContributionLevel, string> = {
        NONE: 'level-0',
        FIRST_QUARTILE: 'level-1',
        SECOND_QUARTILE: 'level-2',
        THIRD_QUARTILE: 'level-3',
        FOURTH_QUARTILE: 'level-4',
    };

    function label(date: string, count: number) {
        return `${count} ${count === 1 ? 'contribution' : 'contributions'} on ${new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'
        }).format(new Date(`${date}T00:00:00Z`))}`;
    }
</script>

{#if weeks.length}
    <div class="heatmap-wrap" aria-label="GitHub contributions over the last 30 days">
        <div class="heatmap" role="img">
            {#each weeks as week (week.firstDay)}
                <div class="week">
                    {#each week.contributionDays as day (day.date)}
                        <span class={['day', levelClass[day.contributionLevel]]} title={label(day.date, day.contributionCount)}></span>
                    {/each}
                </div>
            {/each}
        </div>
        <div class="legend" aria-hidden="true"><span>Quiet</span><i class="day level-0"></i><i class="day level-2"></i><i class="day level-4"></i><span>Busy</span></div>
    </div>
{/if}

<style>
    .heatmap-wrap { margin-top: 18px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; }
    .heatmap { display: flex; width: max-content; gap: 5px; }
    .week { display: grid; grid-template-rows: repeat(7, 11px); gap: 5px; }
    .day { display: block; width: 11px; height: 11px; border-radius: 3px; background: var(--ios-chip-bg); border: 1px solid var(--ios-glass-border); }
    .level-1 { background: color-mix(in srgb, var(--ios-blue) 28%, var(--ios-chip-bg)); }
    .level-2 { background: color-mix(in srgb, var(--ios-blue) 52%, var(--ios-chip-bg)); }
    .level-3 { background: color-mix(in srgb, var(--ios-blue) 76%, var(--ios-chip-bg)); }
    .level-4 { background: var(--ios-blue); }
    .legend { display: flex; align-items: center; justify-content: flex-end; gap: 5px; margin-top: 10px; font-size: .62rem; color: var(--ios-text-tertiary); }
</style>
