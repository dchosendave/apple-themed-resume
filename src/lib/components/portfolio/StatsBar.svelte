<script lang="ts">
    import { stats } from "$lib/data/stats";
    import { countUp } from "$lib/actions/countUp";
    import PortfolioCard from "./PortfolioCard.svelte";
</script>

<PortfolioCard class="flex flex-col overflow-hidden px-5 py-5 md:px-6 md:py-[22px]">
    <p
        class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Key Metrics
    </p>

    <div class="grid grid-cols-1 gap-2 min-[421px]:grid-cols-2 md:gap-[10px]">
        {#each stats as stat (stat.label)}
            <div
                class="flex flex-col items-start gap-1.5 rounded-[18px] border p-[13px] min-[421px]:gap-2 md:p-[14px] [background:color-mix(in_srgb,var(--ios-chip-bg)_92%,transparent)] [border-color:var(--ios-glass-border)]"
            >
                <span
                    class="text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] [color:var(--ios-blue)]"
                    use:countUp={stat.value}
                ></span>
                <span
                    class="text-[0.82rem] font-medium leading-[1.45] [color:var(--ios-text-secondary)]"
                >
                    {stat.label}
                </span>
            </div>
        {/each}
    </div>
</PortfolioCard>
