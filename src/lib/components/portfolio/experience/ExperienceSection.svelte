<script lang="ts">
    import { experience } from "$lib/data/experience";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import ExperienceCategoryDetails from "$lib/components/portfolio/experience/ExperienceCategoryDetails.svelte";

    let activeCategories = $state(
        Object.fromEntries(
            experience.map((job) => [job.company, job.categories[0]?.title ?? ""])
        ) as Record<string, string>
    );
</script>

<PortfolioCard class="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
    <p class="apple-section-title">Work Timeline</p>

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

            {#if job.categories.length > 1}
                <Tabs.Root bind:value={activeCategories[job.company]} class="gap-3">
                    <Tabs.List
                        class="no-scrollbar min-w-full justify-start overflow-x-auto rounded-[16px] border p-1 [background:color-mix(in_srgb,var(--ios-chip-bg)_86%,transparent)] [border-color:var(--ios-glass-border)]"
                    >
                        {#each job.categories as category (category.title)}
                            <Tabs.Trigger
                                value={category.title}
                                class="h-8 shrink-0 rounded-[12px] px-3 text-[0.72rem] font-semibold [color:var(--ios-text-secondary)] hover:[color:var(--ios-text-primary)] data-[state=active]:[background:var(--ios-blue)] data-[state=active]:[color:#fff] data-[state=active]:shadow-[0_8px_18px_color-mix(in_srgb,var(--ios-blue)_20%,transparent)] dark:data-[state=active]:[color:#071008]"
                            >
                                {category.tabTitle ?? category.title}
                            </Tabs.Trigger>
                        {/each}
                    </Tabs.List>

                    {#each job.categories as category (category.title)}
                        <Tabs.Content value={category.title} class="mt-0">
                            <ExperienceCategoryDetails {category} />
                        </Tabs.Content>
                    {/each}
                </Tabs.Root>
            {:else}
                {#each job.categories as category (category.title)}
                    <ExperienceCategoryDetails {category} />
                {/each}
            {/if}
        </section>
    {/each}
</PortfolioCard>
