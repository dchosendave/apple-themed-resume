<script lang="ts">
    import { experience } from "$lib/data/experience";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import ExperienceCategoryDetails from "$lib/components/portfolio/experience/ExperienceCategoryDetails.svelte";
    import { WeightWave } from "$lib/motion-core";

    const timelineEntries = experience.map((job, index) => ({
        ...job,
        order: (index + 1).toString().padStart(2, "0"),
        focusCount: job.categories.length,
    }));

    let activeCategories = $state(
        Object.fromEntries(
            timelineEntries.map((job) => [job.company, job.categories[0]?.title ?? ""])
        ) as Record<string, string>
    );
</script>

<PortfolioCard class="lowie-card-glow flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
            <p class="apple-section-title mb-1">
                <WeightWave baseWeight={600} hoverWeight={800} influenceRadius={4}>Work Timeline</WeightWave>
            </p>
        </div>
        <span class="apple-chip shrink-0 px-2.5 py-1 text-[0.66rem]">
            {timelineEntries.length}
            {timelineEntries.length === 1 ? " chapter" : " chapters"}
        </span>
    </div>

    <ol class="grid gap-3">
        {#each timelineEntries as job, index (job.company)}
            <li
                class={[
                    "rounded-[22px] border p-4 transition-[background,border-color] duration-200 sm:p-5 [background:color-mix(in_srgb,var(--ios-chip-bg)_74%,transparent)] [border-color:var(--ios-glass-border)]",
                    index === 0 &&
                        "[background:color-mix(in_srgb,var(--ios-chip-bg)_60%,var(--ios-stat-bg))] [border-color:color-mix(in_srgb,var(--ios-blue)_22%,var(--ios-glass-border))]",
                ]}
            >
                <article class="space-y-4">
                    <div
                        class="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-start sm:justify-between [border-color:var(--ios-separator)]"
                    >
                        <div class="flex min-w-0 gap-3 sm:gap-4">
                            <span
                                class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-[0.66rem] font-semibold [background:color-mix(in_srgb,var(--ios-glass)_72%,transparent)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                            >
                                {job.order}
                            </span>

                            <div class="min-w-0 space-y-2">
                                <div class="space-y-1.5">
                                    {#if index === 0}
                                        <p class="text-[0.62rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-tertiary)]">
                                            Current role
                                        </p>
                                    {/if}
                                    <h2
                                        class="text-[1rem] font-semibold leading-[1.3] [color:var(--ios-text-primary)]"
                                    >
                                        {job.company}
                                    </h2>
                                    <p class="text-[0.84rem] font-semibold [color:var(--ios-blue)]">
                                        {job.role}
                                    </p>
                                </div>

                                {#if job.highlights && job.highlights.length > 0}
                                    <div class="flex flex-wrap gap-2 pt-0.5">
                                        {#each job.highlights as highlight (highlight)}
                                            <span class="apple-chip px-[11px] py-[4px] text-[0.68rem]">
                                                {highlight}
                                            </span>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-2 sm:max-w-[11rem] sm:flex-col sm:items-end">
                            <span
                                class="apple-chip self-start px-[11px] py-[4px] text-[0.68rem] whitespace-nowrap sm:self-auto"
                            >
                                {job.period}
                            </span>
                            <span class="apple-badge text-[0.62rem]">
                                {job.focusCount}
                                {job.focusCount === 1 ? " track" : " tracks"}
                            </span>
                        </div>
                    </div>

                    {#if job.categories.length > 1}
                        <Tabs.Root bind:value={activeCategories[job.company]} class="gap-3">
                            <Tabs.List
                                class="no-scrollbar min-w-full justify-start overflow-x-auto rounded-[16px] border p-1 [background:color-mix(in_srgb,var(--ios-glass)_58%,transparent)] [border-color:var(--ios-glass-border)]"
                            >
                                {#each job.categories as category (category.title)}
                                    <Tabs.Trigger
                                        value={category.title}
                                        class="h-8 min-w-[5.25rem] shrink-0 rounded-[12px] px-3 text-[0.72rem] font-semibold [color:var(--ios-text-secondary)] hover:[color:var(--ios-text-primary)] focus-visible:[box-shadow:0_0_0_2px_color-mix(in_srgb,var(--ios-blue)_22%,transparent)] data-[state=active]:[background:var(--ios-blue)] data-[state=active]:[color:var(--ios-bg)] data-[state=active]:shadow-[0_10px_24px_color-mix(in_srgb,var(--ios-blue)_20%,transparent)]"
                                    >
                                        {category.tabTitle ?? category.title}
                                    </Tabs.Trigger>
                                {/each}
                            </Tabs.List>

                            {#each job.categories as category (category.title)}
                                <Tabs.Content value={category.title} class="mt-0">
                                    <ExperienceCategoryDetails {category} class="shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
                                </Tabs.Content>
                            {/each}
                        </Tabs.Root>
                    {:else}
                        {#each job.categories as category (category.title)}
                            <ExperienceCategoryDetails {category} class="shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]" />
                        {/each}
                    {/if}
                </article>
            </li>
        {/each}
    </ol>
</PortfolioCard>
