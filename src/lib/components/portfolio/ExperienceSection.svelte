<script lang="ts">
    import { experience } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<div class="apple-card bento-tile flex flex-col gap-4 px-5 py-4 sm:px-6" use:reveal>
    <p class="apple-section-title">Work Experience</p>

    {#each experience as job (job.company)}
        <section class="space-y-3">
            <div
                class="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-start sm:justify-between [border-color:var(--ios-separator)]"
            >
                <div class="space-y-1.5">
                    <div class="text-[0.96rem] font-semibold [color:var(--ios-text-primary)]">
                        {job.company}
                    </div>
                    <div class="text-[0.8rem] font-medium [color:var(--ios-blue)]">{job.role}</div>

                    {#if job.highlights && job.highlights.length > 0}
                        <div class="flex flex-wrap gap-2 pt-1">
                            {#each job.highlights as highlight (highlight)}
                                <span class="apple-chip text-[0.66rem]">{highlight}</span>
                            {/each}
                        </div>
                    {/if}
                </div>

                <span class="apple-chip self-start text-[0.68rem] whitespace-nowrap">
                    {job.period}
                </span>
            </div>

            <Accordion.Root type="multiple" class="gap-2">
                {#each job.categories as category (category.title)}
                    <Accordion.Item
                        value={category.title}
                        class="apple-card-inner overflow-hidden border-none"
                    >
                        <Accordion.Trigger
                            class="gap-3 rounded-none border-none px-4 py-3 text-left hover:no-underline"
                        >
                            <span class="apple-section-title mb-0 flex-1 text-left text-[0.7rem]">
                                {category.title}
                            </span>
                        </Accordion.Trigger>

                        <Accordion.Content class="px-4 pb-4">
                            <ul class="space-y-4 border-t pt-4 [border-color:var(--ios-separator)]">
                                {#each category.bullets as bullet (bullet.text)}
                                    <li class="flex gap-3">
                                        <span
                                            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full [background:var(--ios-blue)]"
                                        ></span>

                                        <div class="min-w-0 space-y-2">
                                            <p
                                                class="text-[0.79rem] leading-6 [color:var(--ios-text-primary)]"
                                            >
                                                {bullet.text}
                                            </p>

                                            {#if bullet.stack.length > 0}
                                                <div class="flex flex-wrap gap-2">
                                                    {#each bullet.stack as tech (tech)}
                                                        {@const icon = getIcon(tech)}
                                                        <span class="apple-badge text-[0.64rem]">
                                                            {#if icon}
                                                                <img
                                                                    src={icon}
                                                                    alt={tech}
                                                                    class="tech-icon"
                                                                />
                                                            {/if}
                                                            {tech}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {/if}
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                {/each}
            </Accordion.Root>
        </section>
    {/each}
</div>
