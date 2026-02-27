<script lang="ts">
    import { stats } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { countUp } from "$lib/actions/countUp";
</script>

<section class="stats-section">
    <div class="page-container">
        <div class="stats-grid glass-card" use:reveal>
            {#each stats as stat, i}
                <div class="stat-item">
                    <span class="stat-value" use:countUp={stat.value}></span>
                    <span class="stat-label">{stat.label}</span>
                </div>
                {#if i < stats.length - 1}
                    <div class="stat-divider"></div>
                {/if}
            {/each}
        </div>
    </div>
</section>

<style>
    .stats-section {
        padding: 0 0 32px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        align-items: center;
        padding: 20px 32px;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        grid-column: span 1;
    }

    .stat-value {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--ios-blue);
        letter-spacing: -0.02em;
        line-height: 1;
    }

    .stat-label {
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        text-align: center;
        line-height: 1.3;
    }

    .stat-divider {
        width: 1px;
        height: 40px;
        background: var(--ios-separator);
        justify-self: center;
    }

    @media (max-width: 600px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 20px;
        }

        .stat-divider {
            display: none;
        }

        .stat-item:last-child {
            grid-column: span 2;
        }
    }
</style>
