<script lang="ts">
    import { slide } from "svelte/transition";
    import { projects } from "$lib/data/resume";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";

    let expanded: boolean[] = $state(projects.map(() => false));

    function toggle(index: number) {
        expanded[index] = !expanded[index];
    }
</script>

<section class="projects-section">
    <div class="page-container">
        <p class="section-title">Featured Projects</p>

        <div class="projects-list">
            {#each projects as project, i (project.name)}
                <div class="project-card glass-card">
                    <div class="project-header">
                        <div>
                            <h2 class="project-name">{project.name}</h2>
                            <p class="project-tagline">{project.tagline}</p>
                        </div>
                        <span class="project-category">{project.category}</span>
                    </div>

                    <div class="project-stack-row">
                        {#each project.stack as tech (tech)}
                            <span class="stack-chip">{tech}</span>
                        {/each}
                    </div>

                    <button
                        class="toggle-btn"
                        onclick={() => toggle(i)}
                    >
                        <span>{expanded[i] ? 'Hide Details' : 'View Details'}</span>
                        <ChevronDown
                            size={14}
                            class="chevron {expanded[i] ? 'chevron-up' : ''}"
                        />
                    </button>

                    {#if expanded[i]}
                        <div class="project-detail" transition:slide={{ duration: 250 }}>
                            <p class="project-description">{project.description}</p>
                            <div class="project-impact">
                                <span class="impact-label">Impact</span>
                                <p class="impact-text">{project.impact}</p>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .projects-section {
        padding: 0 0 32px;
    }

    .projects-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .project-card {
        padding: 20px 24px;
    }

    .project-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
    }

    .project-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        margin-bottom: 4px;
    }

    .project-tagline {
        font-size: 0.82rem;
        line-height: 1.5;
        color: var(--ios-text-secondary);
    }

    .project-category {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ios-blue);
        white-space: nowrap;
        padding: 4px 10px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        border-radius: 100px;
        flex-shrink: 0;
    }

    .project-stack-row {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 14px;
    }

    .stack-chip {
        display: inline-flex;
        padding: 2px 9px;
        border-radius: 100px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--ios-blue);
        letter-spacing: 0.02em;
    }

    .toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--ios-blue);
        padding: 0;
        transition: opacity 0.15s ease;
    }

    .toggle-btn:hover {
        opacity: 0.75;
    }

    :global(.chevron) {
        transition: transform 0.25s ease;
    }

    :global(.chevron-up) {
        transform: rotate(180deg);
    }

    .project-detail {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--ios-separator);
    }

    .project-description {
        font-size: 0.85rem;
        line-height: 1.65;
        color: var(--ios-text-primary);
        margin-bottom: 14px;
    }

    .project-impact {
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        border-radius: 12px;
        padding: 14px 18px;
    }

    .impact-label {
        display: block;
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ios-blue);
        margin-bottom: 6px;
        opacity: 0.85;
    }

    .impact-text {
        font-size: 0.85rem;
        line-height: 1.55;
        color: var(--ios-text-primary);
    }

    @media (max-width: 600px) {
        .project-header {
            flex-direction: column;
        }
    }
</style>
