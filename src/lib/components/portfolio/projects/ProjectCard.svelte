<script lang="ts">
    import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
    import LockKeyholeIcon from "@lucide/svelte/icons/lock-keyhole";
    import type { Project } from "$lib/types/project";
    import TechBadge from "../shared/TechBadge.svelte";

    let {
        project,
        onselect,
    }: {
        project: Project;
        onselect: (project: Project) => void;
    } = $props();
</script>

<article
    class="group/project relative flex w-full flex-col gap-2.5 rounded-[18px] border px-4 py-[15px] text-left transition-[background,border-color,transform,box-shadow] duration-150 [background:var(--ios-chip-bg)] [border-color:var(--ios-glass-border)] hover:-translate-y-px hover:[background:color-mix(in_srgb,var(--ios-chip-bg)_80%,var(--ios-stat-bg))] hover:[border-color:color-mix(in_srgb,var(--ios-blue)_35%,transparent)] hover:shadow-[0_16px_28px_rgba(15,23,42,0.1)] sm:px-[18px] sm:py-4"
>
    <button
        class="absolute inset-0 z-0 cursor-pointer rounded-[18px] border-0 bg-transparent p-0 [font:inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]"
        onclick={() => onselect(project)}
        aria-label="View {project.name} case study"
        type="button"
    ></button>

    <div class="relative z-[1] flex items-start justify-between gap-2">
        <h2 class="text-[0.94rem] font-bold leading-[1.2] [color:var(--ios-text-primary)]">
            {project.name}
        </h2>

        <span
            class="shrink-0 whitespace-nowrap rounded-full border px-[7px] py-[2px] text-[0.66rem] font-semibold uppercase tracking-[0.04em] [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]"
        >
            {project.category}
        </span>
    </div>

    <p class="relative z-[1] flex-1 text-[0.8rem] leading-[1.6] [color:var(--ios-text-secondary)]">
        {project.description}
    </p>

    <div class="relative z-[1] mt-auto flex items-center justify-between gap-2">
        <div class="flex flex-wrap gap-[5px]">
            {#each project.stack as tech (tech)}
                <TechBadge {tech} variant="project" />
            {/each}
        </div>

        {#if project.url}
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--ios-blue)] text-white transition-all duration-200 hover:scale-[1.08] hover:bg-[var(--ios-blue-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)] dark:text-[#071008]"
                title="View project"
                aria-label="Open project link"
            >
                <ExternalLinkIcon class="size-3" />
            </a>
        {:else}
            <span
                class="inline-flex size-7 shrink-0 items-center justify-center rounded-full border [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                title="Internal - Confidential"
            >
                <LockKeyholeIcon class="size-2.5" />
            </span>
        {/if}
    </div>

    <span
        class="relative z-[1] mt-auto translate-y-0.5 text-[0.68rem] opacity-[0.72] transition-[opacity,transform] duration-150 group-hover/project:translate-y-0 group-hover/project:opacity-100 [color:var(--ios-blue)]"
    >
        Click for case study
    </span>
</article>
