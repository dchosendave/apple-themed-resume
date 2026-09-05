<script lang="ts">
    import type { GitHubPulseData } from "$lib/types/github-pulse";
    let { pulse }: { pulse: GitHubPulseData } = $props();
    const updated = $derived(new Date(pulse.fetchedAt));
    const validDate = $derived(Number.isFinite(updated.getTime()));
    const recent = $derived(pulse.recentActivity.filter((activity) => {
        const age = updated.getTime() - new Date(activity.createdAt).getTime();
        return age >= 0 && age <= 30 * 86400000;
    }).slice(0, 3));
</script>

<section aria-labelledby="currently-building-title" class="relative z-[1] border-t pt-4 [border-color:var(--ios-glass-border)]">
    <h2 id="currently-building-title" class="text-lg font-bold tracking-tight">Currently building</h2>
    <p class="mt-1 text-xs leading-relaxed [color:var(--ios-text-secondary)]">Recent public work, captured in the latest activity snapshot.</p>
    {#if pulse.status === 'unavailable'}
        <p class="mt-3 text-sm [color:var(--ios-text-secondary)]">The activity snapshot is temporarily unavailable.</p>
    {:else if recent.length}
        <ol class="mt-3 grid gap-3">
            {#each recent as activity (activity.id)}
                <li class="min-w-0">
                    <a href={activity.url} target="_blank" rel="noopener noreferrer" class="block break-words text-sm font-semibold underline decoration-[var(--ios-glass-border)] underline-offset-4 hover:[color:var(--ios-blue)]">{activity.repo.split('/').at(-1)}</a>
                    <p class="mt-1 text-xs [color:var(--ios-text-secondary)]">{activity.title}</p>
                </li>
            {/each}
        </ol>
    {:else}
        <p class="mt-3 text-sm [color:var(--ios-text-secondary)]">No recent public updates in this snapshot. Browse my projects for completed work.</p>
    {/if}
    {#if validDate && pulse.status !== 'unavailable'}
        <p class="mt-4 text-xs [color:var(--ios-text-tertiary)]">Snapshot updated <time datetime={pulse.fetchedAt}>{updated.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })} UTC</time></p>
    {/if}
</section>
