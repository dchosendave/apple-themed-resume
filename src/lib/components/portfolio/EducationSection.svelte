<script lang="ts">
    import { education } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
</script>

<div class="education-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Education & Certification</p>
    <div class="edu-list">
        {#each education as item (item.degree)}
            <div class="edu-row">
                <span class="edu-icon">{item.icon}</span>
                <div class="edu-info">
                    <span class="edu-degree">{item.degree}</span>
                    <span class="edu-school">{item.school}</span>
                </div>
                <span class="edu-period">{item.period}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .education-tile {
        padding: 22px 24px;
    }

    .edu-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .edu-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 14px;
        border: 1px solid var(--ios-glass-border);
        border-radius: 18px;
        background: color-mix(in srgb, var(--ios-chip-bg) 92%, transparent);
    }

    .edu-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
        padding-top: 2px;
    }

    .edu-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .edu-degree {
        font-size: 0.84rem;
        font-weight: 600;
        color: var(--ios-text-primary);
        line-height: 1.4;
    }

    .edu-school {
        font-size: 0.76rem;
        color: var(--ios-text-secondary);
        line-height: 1.45;
    }

    .edu-period {
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 4px 10px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        .education-tile {
            padding: 20px 18px;
        }

        .edu-row {
            flex-wrap: wrap;
            padding: 11px 12px;
        }

        .edu-period {
            margin-left: 2rem;
        }
    }
</style>
