<script lang="ts">
    import { stats } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { countUp } from "$lib/actions/countUp";
</script>

<div class="stats-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Key Metrics</p>
    <div class="stats-grid">
        {#each stats as stat (stat.label)}
            <div class="stat-card">
                <span class="stat-value" use:countUp={stat.value}></span>
                <span class="stat-label">{stat.label}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .stats-tile {
        padding: 22px 24px;
        display: flex;
        flex-direction: column;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .stat-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 14px;
        background: color-mix(in srgb, var(--ios-chip-bg) 92%, transparent);
        border: 1px solid var(--ios-glass-border);
        border-radius: 18px;
    }

    .stat-value {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--ios-blue);
        letter-spacing: -0.02em;
        line-height: 1;
    }

    .stat-label {
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        line-height: 1.45;
    }

    @media (max-width: 768px) {
        .stats-tile {
            padding: 20px 20px;
        }

        .stats-grid {
            gap: 8px;
        }

        .stat-card {
            padding: 13px;
        }
    }

    @media (max-width: 420px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }

        .stat-card {
            gap: 6px;
        }
    }
</style>
