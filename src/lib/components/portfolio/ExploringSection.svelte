<script lang="ts">
    import { exploring } from "$lib/data/currently-exploring";
    import { reveal } from "$lib/actions/reveal";
</script>

<div class="exploring-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Currently Exploring</p>
    <div class="explore-list">
        {#each exploring as item (item.label)}
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
        padding: 22px 24px;
    }

    .explore-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .explore-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 14px;
        border: 1px solid var(--ios-glass-border);
        border-radius: 18px;
        background: color-mix(in srgb, var(--ios-chip-bg) 92%, transparent);
    }

    .explore-icon {
        font-size: 1.15rem;
        flex-shrink: 0;
        padding-top: 2px;
    }

    .explore-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .explore-label {
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--ios-text-primary);
        line-height: 1.3;
    }

    .explore-note {
        font-size: 0.76rem;
        color: var(--ios-text-secondary);
        line-height: 1.45;
    }

    @media (max-width: 600px) {
        .exploring-tile {
            padding: 20px 18px;
        }

        .explore-list {
            gap: 8px;
        }

        .explore-row {
            padding: 11px 12px;
        }
    }
</style>
