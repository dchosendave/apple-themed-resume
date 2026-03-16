<script lang="ts">
    import { stats } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { countUp } from "$lib/actions/countUp";
</script>

<div class="stats-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Key Metrics</p>
    <div class="stats-list">
        {#each stats as stat, i}
            <div class="stat-row">
                <span class="stat-value" use:countUp={stat.value}></span>
                <span class="stat-label">{stat.label}</span>
            </div>
            {#if i < stats.length - 1}
                <div class="stat-separator"></div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .stats-tile {
        padding: 18px 22px;
        display: flex;
        flex-direction: column;
    }

    .stats-list {
        display: flex;
        flex-direction: column;
        gap: 0;
        flex: 1;
    }

    .stat-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--ios-blue);
        letter-spacing: -0.02em;
        line-height: 1;
        min-width: 52px;
    }

    .stat-label {
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        line-height: 1.3;
    }

    .stat-separator {
        height: 1px;
        background: var(--ios-separator);
    }

    @media (max-width: 768px) {
        .stats-tile {
            padding: 16px 20px;
        }

        .stats-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .stat-separator {
            display: none;
        }

        .stat-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 4px;
            padding: 8px 0;
        }

        .stat-value {
            min-width: unset;
        }
    }
</style>
