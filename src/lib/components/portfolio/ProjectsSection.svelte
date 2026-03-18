<script lang="ts">
    import { projects } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";
    import ProjectDrawer from "$lib/components/portfolio/ProjectDrawer.svelte";
    import type { Project } from "$lib/types/project";

    let selectedProject = $state<Project | null>(null);
</script>

<div class="projects-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Featured Projects</p>

    <div class="projects-grid">
        {#each projects as project (project.name)}
            <button
                class="project-card glass-card-inner"
                onclick={() => selectedProject = project}
                aria-label="View {project.name} case study"
            >
                <div class="project-header">
                    <h2 class="project-name">{project.name}</h2>
                    <span class="project-category">{project.category}</span>
                </div>

                <p class="project-description">{project.description}</p>

                <div class="project-footer">
                    <div class="project-stack-row">
                        {#each project.stack as tech (tech)}
                            {@const icon = getIcon(tech)}
                            <span class="stack-chip">
                                {#if icon}
                                    <img src={icon} alt={tech} class="tech-icon" />
                                {/if}
                                {tech}
                            </span>
                        {/each}
                    </div>

                    {#if project.url}
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-link"
                            title="View project"
                            onclick={(e) => e.stopPropagation()}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                    {:else}
                        <span class="internal-badge" title="Internal · Confidential">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </span>
                    {/if}
                </div>

                <span class="card-hint">Click for case study</span>
            </button>
        {/each}
    </div>
</div>

<ProjectDrawer project={selectedProject} onclose={() => selectedProject = null} />

<style>
    .projects-tile {
        padding: 18px 22px;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    .project-card {
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        /* Reset button defaults */
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-glass-border);
        border-radius: 14px;
        text-align: left;
        cursor: pointer;
        font: inherit;
        width: 100%;
        transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        position: relative;
    }

    .project-card:hover {
        background: color-mix(in srgb, var(--ios-chip-bg) 80%, var(--ios-stat-bg));
        border-color: color-mix(in srgb, var(--ios-blue) 35%, transparent);
        transform: translateY(-1px);
    }

    .project-card:hover .card-hint {
        opacity: 1;
    }

    .card-hint {
        font-size: 0.6rem;
        color: var(--ios-blue);
        opacity: 0;
        transition: opacity 0.15s ease;
        margin-top: auto;
    }

    .project-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
    }

    .project-name {
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        line-height: 1.2;
    }

    .project-category {
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ios-blue);
        white-space: nowrap;
        padding: 2px 7px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        border-radius: 100px;
        flex-shrink: 0;
    }

    .project-description {
        font-size: 0.72rem;
        line-height: 1.5;
        color: var(--ios-text-secondary);
        flex: 1;
    }

    .project-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: auto;
    }

    .project-stack-row {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
    }

    .stack-chip {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 1px 7px;
        border-radius: 100px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        font-size: 0.6rem;
        font-weight: 600;
        color: var(--ios-blue);
        letter-spacing: 0.02em;
    }

    .tech-icon {
        width: 11px;
        height: 11px;
        object-fit: contain;
        flex-shrink: 0;
        display: block;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--ios-blue);
        color: #fff;
        flex-shrink: 0;
        transition: all 0.2s ease;
    }

    .project-link:hover {
        background: var(--ios-blue-hover);
        transform: scale(1.08);
    }

    .internal-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-secondary);
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
