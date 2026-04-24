<script lang="ts">
    import { experience } from "$lib/data/experience";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import PortfolioCard from "./PortfolioCard.svelte";
    import TechBadge from "./TechBadge.svelte";

    let openCategories = $state(
        Object.fromEntries(
            experience.map((job, index) => [
                job.company,
                index === 0 ? (job.categories[0]?.title ?? "") : ""
            ])
        ) as Record<string, string>
    );
</script>

<PortfolioCard class="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
    <p class="apple-section-title">Work Experience</p>

    {#each experience as job (job.company)}
        <section class="space-y-4">
            <div
                class="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-start sm:justify-between [border-color:var(--ios-separator)]"
            >
                <div class="space-y-2">
                    <div class="text-[1rem] font-semibold [color:var(--ios-text-primary)]">
                        {job.company}
                    </div>
                    <div class="text-[0.86rem] font-medium [color:var(--ios-blue)]">{job.role}</div>

                    {#if job.highlights && job.highlights.length > 0}
                        <div class="flex flex-wrap gap-2 pt-1">
                            {#each job.highlights as highlight (highlight)}
                                <span class="apple-chip text-[0.68rem]">{highlight}</span>
                            {/each}
                        </div>
                    {/if}
                </div>

                <span class="apple-chip self-start text-[0.7rem] whitespace-nowrap">
                    {job.period}
                </span>
            </div>

            <Accordion.Root
                type="single"
                bind:value={openCategories[job.company]}
                class="gap-3"
            >
                {#each job.categories as category (category.title)}
                    <Accordion.Item
                        value={category.title}
                        class="apple-card-inner overflow-hidden border-none"
                    >
                        <Accordion.Trigger
                            class="gap-4 rounded-none border-none px-4 py-3.5 text-left hover:no-underline"
                        >
                            <div class="flex min-w-0 flex-1 items-center justify-between gap-3">
                                <span class="apple-section-title mb-0 text-left text-[0.74rem]">
                                    {category.title}
                                </span>
                                <span class="apple-chip shrink-0 text-[0.62rem]">
                                    {category.bullets.length}
                                    {category.bullets.length === 1 ? "note" : "notes"}
                                </span>
                            </div>
                        </Accordion.Trigger>

                        <Accordion.Content class="px-4 pb-4">
                            <ul class="space-y-4 border-t pt-4 [border-color:var(--ios-separator)]">
                                {#each category.bullets as bullet (bullet.text)}
                                    <li class="flex gap-3.5">
                                        <span
                                            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full [background:var(--ios-blue)]"
                                        ></span>

                                        <div class="min-w-0 space-y-2">
                                            <p
                                                class="text-[0.84rem] leading-6 [color:var(--ios-text-primary)]"
                                            >
                                                {bullet.text}
                                            </p>

                                            {#if bullet.stack.length > 0}
                                                <div class="flex flex-wrap gap-2">
                                                    {#each bullet.stack as tech (tech)}
                                                        <TechBadge {tech} />
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
</PortfolioCard>
