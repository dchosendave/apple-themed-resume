<script lang="ts">
    import { education } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
</script>

<div class="education-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Education & Certification</p>
    <div class="edu-list">
        {#each education as item}
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
        padding: 18px 22px;
    }

    .edu-list {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .edu-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--ios-separator);
    }

    .edu-row:first-child {
        padding-top: 0;
    }

    .edu-row:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .edu-icon {
        font-size: 1.1rem;
        flex-shrink: 0;
    }

    .edu-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .edu-degree {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--ios-text-primary);
        line-height: 1.3;
    }

    .edu-school {
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
    }

    .edu-period {
        font-size: 0.65rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 2px 8px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        flex-shrink: 0;
    }
</style>
