<script lang="ts">
    import { projects } from "$lib/data/projects";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";
    import ProjectDrawer from "$lib/components/portfolio/ProjectDrawer.svelte";
    import type { Project } from "$lib/types/project";

    let selectedProject = $state<Project | null>(null);
</script>

<div
    class="overflow-hidden rounded-[24px] border px-[18px] py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-6 sm:py-[22px]"
    use:reveal
>
    <p
        class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Featured Projects
    </p>

    <div class="grid grid-cols-1 gap-3 min-[901px]:grid-cols-2">
        {#each projects as project (project.name)}
            <button
                class="group/project relative flex w-full flex-col gap-2.5 rounded-[18px] border px-4 py-[15px] text-left [font:inherit] transition-[background,border-color,transform,box-shadow] duration-150 [background:var(--ios-chip-bg)] [border-color:var(--ios-glass-border)] hover:-translate-y-px hover:[background:color-mix(in_srgb,var(--ios-chip-bg)_80%,var(--ios-stat-bg))] hover:[border-color:color-mix(in_srgb,var(--ios-blue)_35%,transparent)] hover:shadow-[0_16px_28px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)] sm:px-[18px] sm:py-4"
                onclick={() => selectedProject = project}
                aria-label="View {project.name} case study"
                type="button"
            >
                <div class="flex items-start justify-between gap-2">
                    <h2
                        class="text-[0.94rem] font-bold leading-[1.2] [color:var(--ios-text-primary)]"
                    >
                        {project.name}
                    </h2>

                    <span
                        class="shrink-0 whitespace-nowrap rounded-full border px-[7px] py-[2px] text-[0.66rem] font-semibold uppercase tracking-[0.04em] [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]"
                    >
                        {project.category}
                    </span>
                </div>

                <p class="flex-1 text-[0.8rem] leading-[1.6] [color:var(--ios-text-secondary)]">
                    {project.description}
                </p>

                <div class="mt-auto flex items-center justify-between gap-2">
                    <div class="flex flex-wrap gap-[5px]">
                        {#each project.stack as tech (tech)}
                            {@const icon = getIcon(tech)}
                            <span
                                class="inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[0.68rem] font-semibold tracking-[0.02em] [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]"
                            >
                                {#if icon}
                                    <img
                                        src={icon}
                                        alt={tech}
                                        class="block size-3 shrink-0 object-contain"
                                    />
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
                            class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--ios-blue)] text-white transition-all duration-200 hover:scale-[1.08] hover:bg-[var(--ios-blue-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]"
                            title="View project"
                            onclick={(e) => e.stopPropagation()}
                            aria-label="Open project link"
                        >
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
                        <span
                            class="inline-flex size-7 shrink-0 items-center justify-center rounded-full border [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                            title="Internal - Confidential"
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                    {/if}
                </div>

                <span
                    class="mt-auto translate-y-0.5 text-[0.68rem] opacity-[0.72] transition-[opacity,transform] duration-150 group-hover/project:translate-y-0 group-hover/project:opacity-100 [color:var(--ios-blue)]"
                >
                    Click for case study
                </span>
            </button>
        {/each}
    </div>
</div>

<ProjectDrawer project={selectedProject} onclose={() => selectedProject = null} />
