<script lang="ts">
    import { skills } from "$lib/data/skills";
    import PortfolioCard from "../shared/PortfolioCard.svelte";
    import TechBadge from "../shared/TechBadge.svelte";

    const skillGroups = Object.entries(skills);
</script>

<PortfolioCard class="flex flex-col gap-5 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <p
        class="text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Full-Stack Loadout
    </p>

    <div class="flex flex-col gap-[14px]">
        {#each skillGroups as [category, items] (category)}
            <section
                class="flex flex-col gap-2 rounded-[18px] border p-3 sm:gap-[10px] sm:p-[14px] [background:color-mix(in_srgb,var(--ios-chip-bg)_92%,transparent)] [border-color:var(--ios-glass-border)]"
            >
                <span
                    class="text-[0.72rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-secondary)]"
                >
                    {category}
                </span>

                <div class="flex flex-wrap gap-1.5">
                    {#each items as skill (skill.name)}
                        <TechBadge tech={skill.name} variant="skill" />
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</PortfolioCard>
