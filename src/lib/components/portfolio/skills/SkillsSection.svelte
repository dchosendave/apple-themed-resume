<script lang="ts">
    import { skills } from "$lib/data/skills";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import TechBadge from "$lib/components/portfolio/shared/TechBadge.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    const skillGroups = Object.entries(skills);
</script>

<PortfolioCard class="flex flex-col gap-5 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <p
        class="text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Full-Stack Loadout
    </p>

    <div class="flex flex-col">
        {#each skillGroups as [category, items], index (category)}
            <section class="grid gap-2.5 py-3 first:pt-0 last:pb-0 sm:gap-3">
                <div class="flex items-center justify-between gap-3">
                    <span
                        class="text-[0.72rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-secondary)]"
                    >
                        {category}
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
