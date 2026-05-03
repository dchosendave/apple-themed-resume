<script lang="ts">
    import { skills } from "$lib/data/skills";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import TechBadge from "$lib/components/portfolio/shared/TechBadge.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    const skillGroups = Object.entries(skills);
    const skillCount = skillGroups.reduce(
        (total, [, items]) => total + items.length,
        0,
    );
    const skillSummaries: Record<string, string> = {
        Backend: "APIs, business rules, authentication, and production fixes.",
        Frontend: "Interfaces that sit close to real workflows and data entry.",
        Databases: "Schema work, reporting queries, migration checks, and archives.",
        Tooling: "Release support, source control, API testing, and container basics.",
    };
</script>

<PortfolioCard class="flex flex-col gap-5 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
            <p class="apple-section-title mb-1">Full-Stack Loadout</p>
            <p class="max-w-[35ch] text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                Tools grouped by the kind of work they support, not just the logo list.
            </p>
        </div>
        <span class="apple-chip shrink-0 px-2.5 py-1 text-[0.66rem]">
            {skillCount}
        </span>
    </div>

    <div class="flex flex-col">
        {#each skillGroups as [category, items], index (category)}
            <section class="grid gap-2.5 py-3 first:pt-0 last:pb-0 sm:gap-3">
                <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                        <span
                            class="text-[0.72rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-secondary)]"
                        >
                            {category}
                        </span>
                        <p class="mt-1 text-[0.7rem] leading-[1.45] [color:var(--ios-text-tertiary)]">
                            {skillSummaries[category]}
                        </p>
                    </div>
                    <span class="apple-chip shrink-0 px-2 py-[3px] text-[0.6rem]">
                        {items.length}
                    </span>
                </div>

                <div class="flex flex-wrap gap-1.5">
                    {#each items as skill (skill.name)}
                        <TechBadge tech={skill.name} variant="skill" />
                    {/each}
                </div>
            </section>

            {#if index < skillGroups.length - 1}
                <Separator class="[background-color:var(--ios-separator)]" />
            {/if}
        {/each}
    </div>
</PortfolioCard>
