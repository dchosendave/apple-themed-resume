<script lang="ts">
    import { skills } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";
</script>

<div class="skills-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Skills & Stack</p>
    <div class="skills-grid">
        {#each Object.entries(skills) as [category, items]}
            <div class="skill-group">
                <span class="group-label">{category}</span>
                <div class="chip-row">
                    {#each items as skill}
                        {@const icon = getIcon(skill)}
                        <span class="skill-chip">
                            {#if icon}
                                <img src={icon} alt={skill} class="tech-icon" />
                            {/if}
                            {skill}
                        </span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .skills-tile {
        padding: 18px 22px;
    }

    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .skill-group {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--ios-separator);
    }

    .skill-group:first-child {
        padding-top: 0;
    }

    .skill-group:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .group-label {
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--ios-text-secondary);
        min-width: 70px;
        flex-shrink: 0;
        padding-top: 3px;
    }

    .chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .skill-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 9px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.7rem;
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
            gap: 6px;
        }

        .group-label {
            min-width: unset;
        }
    }
</style>
