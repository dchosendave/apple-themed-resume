<script lang="ts">
    import { skills } from "$lib/data/resume";
</script>

<section class="skills-section">
    <div class="page-container">
        <p class="section-title">Skills & Stack</p>
        <div class="skills-grid glass-card">
            {#each Object.entries(skills) as [category, items]}
                <div class="skill-group">
                    <span class="group-label">{category}</span>
                    <div class="chip-row">
                        {#each items as skill}
                            <span class="skill-chip">{skill}</span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .skills-section {
        padding: 0 0 32px;
    }

    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 0;
        overflow: hidden;
    }

    .skill-group {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 16px 24px;
        border-bottom: 1px solid var(--ios-separator);
    }

    .skill-group:last-child {
        border-bottom: none;
    }

    .group-label {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--ios-text-secondary);
        min-width: 130px;
        flex-shrink: 0;
        padding-top: 4px;
    }

    .chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .skill-chip {
        display: inline-flex;
        align-items: center;
        padding: 4px 11px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--ios-text-primary);
        transition: all 0.15s ease;
    }

    .skill-chip:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    @media (max-width: 600px) {
        .skill-group {
            flex-direction: column;
            gap: 10px;
        }

        .group-label {
            min-width: unset;
        }
    }
</style>
