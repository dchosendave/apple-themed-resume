<script lang="ts">
    import { exploring } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
</script>

<div class="exploring-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Currently Exploring</p>
    <div class="explore-list">
        {#each exploring as item}
            <div class="explore-row">
                <span class="explore-icon">{item.icon}</span>
                <div class="explore-info">
                    <span class="explore-label">{item.label}</span>
                    <span class="explore-note">{item.note}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .exploring-tile {
        padding: 18px 22px;
    }

    .explore-list {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .explore-row {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--ios-separator);
    }

    .explore-row:first-child {
        padding-top: 0;
    }

    .explore-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .explore-icon {
        font-size: 1rem;
        flex-shrink: 0;
        padding-top: 1px;
    }

    .explore-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .explore-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--ios-text-primary);
        line-height: 1.3;
    }

    .explore-note {
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
    }
</style>