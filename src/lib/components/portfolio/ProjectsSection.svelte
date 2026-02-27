<script lang="ts">
    import { projects } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
</script>

<section class="projects-section">
    <div class="page-container">
        <p class="section-title">Featured Projects</p>

        <div class="projects-list">
            {#each projects as project, i (project.name)}
                <div
                    class="project-card glass-card"
                    use:reveal={{ delay: i * 60 }}
                >
                    <!-- Header: name + badges -->
                    <div class="project-header">
                        <h2 class="project-name">{project.name}</h2>
                        <div class="project-badges">
                            {#if project.role}
                                <span class="project-role">{project.role}</span>
                            {/if}
                            <span class="project-category"
                                >{project.category}</span
                            >
                        </div>
                    </div>

                    <!-- Stack -->
                    <div class="project-stack-row">
                        {#each project.stack as tech (tech)}
                            <span class="stack-chip">{tech}</span>
                        {/each}
                    </div>

                    <!-- Body: description + impact -->
                    <div class="project-body">
                        <p class="project-description">{project.description}</p>
                        <div class="impact-row">
                            <span class="impact-arrow">→</span>
                            <p class="impact-text">{project.impact}</p>
                        </div>
                    </div>

                    <!-- Always-visible link / confidential badge -->
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
                                    width="12"
                                    height="12"
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
                                    <line x1="10" y1="14" x2="21" y2="3" />
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
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Internal · Confidential
                            </span>
                        {/if}
                    </div>
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
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .project-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }

    .project-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        line-height: 1.25;
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

    .project-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .project-description {
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--ios-text-secondary);
    }

    .impact-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }

    .impact-arrow {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--ios-blue);
        flex-shrink: 0;
        line-height: 1.6;
    }

    .impact-text {
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--ios-text-primary);
        font-weight: 500;
    }

    .project-footer {
        display: flex;
        align-items: center;
        padding-top: 2px;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 14px;
        border-radius: 100px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.74rem;
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

    @media (max-width: 600px) {
        .project-header {
            flex-direction: column;
        }
    }
</style>
