<script lang="ts">
    import { education } from "$lib/data/education";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import { WeightWave } from "$lib/motion-core";
</script>

<PortfolioCard class="lowie-card-glow overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="mb-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
            <p class="apple-section-title mb-1">
                <WeightWave baseWeight={600} hoverWeight={800} influenceRadius={4}>Credentials</WeightWave>
            </p>
            <p class="max-w-[42ch] text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                Formal background and database credential behind the production work.
            </p>
        </div>
        <span class="apple-chip shrink-0 px-2.5 py-1 text-[0.66rem]">
            {education.length}
        </span>
    </div>

    <div class="flex flex-col gap-2 sm:gap-[10px]">
        {#each education as item (item.degree)}
            <div
                class="flex flex-wrap items-start gap-3 rounded-[18px] border px-3 py-[11px] sm:flex-nowrap sm:px-[14px] sm:py-3 [background:color-mix(in_srgb,var(--ios-chip-bg)_82%,transparent)] [border-color:var(--ios-glass-border)]"
            >
                <span
                    class="inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-[0.68rem] font-bold [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_24%,transparent)] [color:var(--ios-blue)]"
                >
                    {item.icon}
                </span>

                <div class="min-w-0 flex-1">
                    <div class="text-[0.84rem] font-semibold leading-[1.4] [color:var(--ios-text-primary)]">
                        {item.degree}
                    </div>
                    <div class="text-[0.72rem] leading-[1.45] [color:var(--ios-text-tertiary)]">
                        {item.major}
                    </div>
                    <div class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]">
                        {item.school}
                    </div>
                </div>

                <span
                    class="ml-8 shrink-0 rounded-full border px-[10px] py-1 text-[0.72rem] font-medium whitespace-nowrap sm:ml-0 [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                >
                    {item.period}
                </span>
            </div>
        {/each}
    </div>
</PortfolioCard>
