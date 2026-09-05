<script lang="ts">
    import type { GitHubPulseData } from "$lib/types/github-pulse";
    import { hoverSound } from '$lib/actions/hoverSound';
    import { sound } from '$lib/stores/sound.svelte';
    let { pulse }: { pulse: GitHubPulseData } = $props();
    const updated = $derived(new Date(pulse.fetchedAt));
    const validDate = $derived(Number.isFinite(updated.getTime()));
    const recent = $derived(pulse.recentActivity.filter((activity) => {
        const age = updated.getTime() - new Date(activity.createdAt).getTime();
        return age >= 0 && age <= 30 * 86400000;
    }).slice(0, 3));
    const activityDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
</script>

<section aria-labelledby="currently-building-title" class="relative z-[1] border-t pt-4 [border-color:var(--ios-glass-border)]">
    <h2 id="currently-building-title" class="text-lg font-bold tracking-tight">Currently building</h2>
    <p class="mt-1 text-xs leading-relaxed [color:var(--ios-text-secondary)]">Recent public work, captured in the latest activity snapshot.</p>
    {#if pulse.status === 'unavailable'}
        <p class="mt-3 text-sm [color:var(--ios-text-secondary)]">The activity snapshot is temporarily unavailable.</p>
    {:else}
        {#if recent.length}
            <ol class="mt-5 border-b [border-color:var(--ios-glass-border)]">
                {#each recent as activity (activity.id)}
                    <li class="grid min-w-0 grid-cols-[1fr_auto] gap-4 border-t py-3 [border-color:var(--ios-glass-border)]">
                        <div class="min-w-0">
                            <a href={activity.url} target="_blank" rel="noopener noreferrer" use:hoverSound onclick={() => sound.play('confirm')} class="block break-words text-sm font-semibold no-underline hover:[color:var(--ios-blue)]">{activity.repo.split('/').at(-1)} <span aria-hidden="true">↗</span></a>
                            <p class="mt-1 text-xs [color:var(--ios-text-secondary)]">{activity.title}</p>
                        </div>
                        <time datetime={activity.createdAt} class="pt-0.5 text-[0.65rem] [color:var(--ios-text-tertiary)]">{activityDate.format(new Date(activity.createdAt))}</time>
                    </li>
                {/each}
            </ol>
        {:else}
            <p class="mt-3 text-sm [color:var(--ios-text-secondary)]">No recent public updates in this snapshot. Browse my projects for completed work.</p>
        {/if}
    {/if}
    {#if validDate && pulse.status !== 'unavailable'}
        <p class="mt-4 text-[0.65rem] [color:var(--ios-text-tertiary)]">Updated <time datetime={pulse.fetchedAt}>{updated.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time></p>
    {/if}
</section>
