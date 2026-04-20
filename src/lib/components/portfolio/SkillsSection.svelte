<script lang="ts">
    import { skills } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";
    import type { SkillLevel } from "$lib/types/skill";

    function dotFilled(level: SkillLevel | undefined, dot: 1 | 2 | 3): boolean {
        if (!level) return false;
        if (dot === 1) return true;
        if (dot === 2) return level === 'proficient' || level === 'expert';
        return level === 'expert';
    }
</script>

<div class="skills-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Skills & Stack</p>
    <div class="skills-grid">
        {#each Object.entries(skills) as [category, items] (category)}
            <div class="skill-group">
                <span class="group-label">{category}</span>
                <div class="chip-row">
                    {#each items as skill (skill.name)}
                        {@const icon = getIcon(skill.name)}
                        <span class="skill-chip">
                            {#if icon}
                                <img src={icon} alt={skill.name} class="tech-icon" />
                            {/if}
                            {skill.name}
                            <span class="proficiency-dots" aria-label="proficiency level">
                                <span class="dot" class:filled={dotFilled(skill.level, 1)}></span>
                                <span class="dot" class:filled={dotFilled(skill.level, 2)}></span>
                                <span class="dot" class:filled={dotFilled(skill.level, 3)}></span>
                            </span>
                        </span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .skills-tile {
        padding: 22px 24px;
    }

    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .skill-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px;
        border: 1px solid var(--ios-glass-border);
        border-radius: 18px;
        background: color-mix(in srgb, var(--ios-chip-bg) 92%, transparent);
    }

    .group-label {
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        color: var(--ios-text-secondary);
        text-transform: uppercase;
    }

    .chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .skill-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.76rem;
        font-weight: 500;
        color: var(--ios-text-primary);
        transition: all 0.15s ease;
    }

    .skill-chip:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    .proficiency-dots {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        margin-left: 4px;
    }

    .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--ios-separator);
        transition: background 0.15s ease;
    }

    .filled {
        background: var(--ios-blue);
    }

    .skill-chip:hover .dot.filled {
        background: var(--ios-blue);
    }

    .skill-chip:hover .dot:not(.filled) {
        background: color-mix(in srgb, var(--ios-blue) 30%, transparent);
    }

    @media (max-width: 600px) {
        .skills-tile {
            padding: 20px 18px;
        }

        .skills-grid {
            gap: 10px;
        }

        .skill-group {
            gap: 8px;
            padding: 12px;
        }
    }
</style>
