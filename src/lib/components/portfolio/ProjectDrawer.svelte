<script lang="ts">
    import XIcon from "@lucide/svelte/icons/x";
    import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
    import LockKeyholeIcon from "@lucide/svelte/icons/lock-keyhole";
    import type { Project } from "$lib/types/project";
    import { getIcon } from "$lib/utils/techIcons";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    let { project, onclose }: { project: Project | null; onclose: () => void } = $props();

    let viewportWidth = $state(0);

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen) {
            onclose();
        }
    }
</script>

<svelte:window bind:innerWidth={viewportWidth} />

{#if project}
    <Sheet.Root open={true} onOpenChange={handleOpenChange}>
        <Sheet.Content
            side={viewportWidth <= 600 ? "bottom" : "right"}
            showCloseButton={false}
            class="apple-panel-surface gap-0 p-0 data-[side=bottom]:h-[85dvh] data-[side=bottom]:rounded-t-[24px] data-[side=right]:h-[100dvh] data-[side=right]:w-full data-[side=right]:max-w-[30rem]"
        >
            <div class="flex h-full flex-col">
                <div class="flex items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-7">
                    <div class="min-w-0 space-y-3">
                        <div class="flex flex-wrap items-center gap-2">
                            <Sheet.Title
                                class="text-xl font-semibold tracking-[-0.02em] [color:var(--ios-text-primary)]"
                            >
                                {project.name}
                            </Sheet.Title>
                            <span class="apple-badge">{project.category}</span>
                        </div>

                        <Sheet.Description
                            class="max-w-prose text-sm leading-6 [color:var(--ios-text-secondary)]"
                        >
                            {project.description}
                        </Sheet.Description>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon-sm"
                        class="apple-icon-button size-9 rounded-full"
                        onclick={onclose}
                        aria-label="Close project details"
                    >
                        <XIcon class="size-4" />
                    </Button>
                </div>

                <Separator class="[background-color:var(--ios-separator)]" />

                <div class="flex-1 overflow-y-auto px-6 py-5 sm:px-7">
                    {#if project.problem || project.solution || project.impact}
                        <div class="grid gap-4">
                            {#if project.problem}
                                <section class="apple-card-inner space-y-2 p-4">
                                    <p class="apple-section-title mb-0">Problem</p>
                                    <p class="text-sm leading-6 [color:var(--ios-text-primary)]">
                                        {project.problem}
                                    </p>
                                </section>
                            {/if}

                            {#if project.solution}
                                <section class="apple-card-inner space-y-2 p-4">
                                    <p class="apple-section-title mb-0">Solution</p>
                                    <p class="text-sm leading-6 [color:var(--ios-text-primary)]">
                                        {project.solution}
                                    </p>
                                </section>
                            {/if}

                            {#if project.impact}
                                <section class="apple-card-inner space-y-2 p-4">
                                    <p class="apple-section-title mb-0">Impact</p>
                                    <p class="text-sm leading-6 [color:var(--ios-text-primary)]">
                                        {project.impact}
                                    </p>
                                </section>
                            {/if}
                        </div>
                    {/if}

                    <section class="mt-5 space-y-3">
                        <p class="apple-section-title mb-0">Tech Stack</p>
                        <div class="flex flex-wrap gap-2">
                            {#each project.stack as tech (tech)}
                                {@const icon = getIcon(tech)}
                                <span class="apple-badge text-[0.66rem]">
                                    {#if icon}
                                        <img src={icon} alt={tech} class="tech-icon" />
                                    {/if}
                                    {tech}
                                </span>
                            {/each}
                        </div>
                    </section>
                </div>

                <Separator class="[background-color:var(--ios-separator)]" />

                <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-7">
                    {#if project.url}
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="apple-button-primary"
                        >
                            View Project
                            <ExternalLinkIcon class="size-4" />
                        </a>
                    {:else}
                        <span class="apple-chip">
                            <LockKeyholeIcon class="size-3.5" />
                            Internal and confidential
                        </span>
                    {/if}
                </div>
            </div>
        </Sheet.Content>
    </Sheet.Root>
{/if}
