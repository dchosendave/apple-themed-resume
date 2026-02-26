<script lang="ts">
    import { slide, fly } from "svelte/transition";
    import { projects } from "$lib/data/resume";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";

    const INITIAL_COUNT = 2;

    let showAll = $state(false);
    let expanded: boolean[] = $state(projects.map(() => false));

    const visibleProjects = $derived(
        showAll ? projects : projects.slice(0, INITIAL_COUNT),
    );
    const hiddenCount = projects.length - INITIAL_COUNT;

    function toggle(index: number) {
        expanded[index] = !expanded[index];
    }
</script>

<section class="projects-section">
    <div class="page-container">
        <p class="section-title">Featured Projects</p>

        <div class="projects-list">
            {#each visibleProjects as project, i (project.name)}
                <div
                    class="project-card glass-card"
                    transition:fly={{ y: 16, duration: 260 }}
                >
                    <div class="project-header">
                        <div>
                            <h2 class="project-name">{project.name}</h2>
                            <p class="project-tagline">{project.tagline}</p>
                        </div>
                        <div class="project-badges">
                            {#if project.role}
                                <span class="project-role">{project.role}</span>
                            {/if}
                            <span class="project-category"
                                >{project.category}</span
                            >
                        </div>
                    </div>

                    <div class="project-stack-row">
                        {#each project.stack as tech (tech)}
                            <span class="stack-chip">{tech}</span>
                        {/each}
                    </div>

                    <button class="toggle-btn" onclick={() => toggle(i)}>
                        <span
                            >{expanded[i]
                                ? "Hide Details"
                                : "View Details"}</span
                        >
                        <ChevronDown
                            size={14}
                            class="chevron {expanded[i] ? 'chevron-up' : ''}"
                        />
                    </button>

                    {#if expanded[i]}
                        <div
                            class="project-detail"
                            transition:slide={{ duration: 250 }}
                        >
                            <p class="project-description">
                                {project.description}
                            </p>
                            <div class="project-impact">
                                <span class="impact-label">Impact</span>
                                <p class="impact-text">{project.impact}</p>
                            </div>
                            <div class="project-footer">
                                {#if project.url}
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-link"
                                    >
                                        View Project
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                            />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line
                                                x1="10"
                                                y1="14"
                                                x2="21"
                                                y2="3"
                                            />
                                        </svg>
                                    </a>
                                {:else}
                                    <span class="internal-badge">
                                        <svg
                                            width="11"
                                            height="11"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <rect
                                                x="3"
                                                y="11"
                                                width="18"
                                                height="11"
                                                rx="2"
                                                ry="2"
                                            />
                                            <path
                                                d="M7 11V7a5 5 0 0 1 10 0v4"
                                            />
                                        </svg>
                                        Internal · Confidential
                                    </span>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        {#if !showAll && hiddenCount > 0}
            <div class="show-more-row">
                <button class="show-more-btn" onclick={() => (showAll = true)}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Show {hiddenCount} more {hiddenCount === 1
                        ? "project"
                        : "projects"}
                </button>
            </div>
        {/if}
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

    .project-badges {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        flex-wrap: wrap;
        justify-content: flex-end;
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

    .project-role {
        font-size: 0.68rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 4px 10px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
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

    .project-footer {
        margin-top: 14px;
        display: flex;
        align-items: center;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 14px;
        border-radius: 100px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.75rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .project-link:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 16px
            color-mix(in srgb, var(--ios-blue) 35%, transparent);
    }

    .internal-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        letter-spacing: 0.01em;
    }

    /* Show more button */
    .show-more-row {
        margin-top: 12px;
        display: flex;
        justify-content: center;
    }

    .show-more-btn {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 9px 20px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-secondary);
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .show-more-btn:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    @media (max-width: 600px) {
        .project-header {
            flex-direction: column;
        }
    }
</style>
