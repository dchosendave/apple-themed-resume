<script lang="ts">
    import CoffeeIcon from "@lucide/svelte/icons/coffee";
    import Gamepad2Icon from "@lucide/svelte/icons/gamepad-2";
    import Music2Icon from "@lucide/svelte/icons/music-2";
    import SparklesIcon from "@lucide/svelte/icons/sparkles";
    import { stats } from "$lib/data/stats";
    import { countUp } from "$lib/actions/countUp";
    import PortfolioCard from "../shared/PortfolioCard.svelte";
</script>

<PortfolioCard class="lowie-card-glow flex flex-col overflow-hidden px-5 py-5 md:px-6 md:py-[22px]">
    <p
        class="relative z-[1] mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Key Metrics
    </p>

    <div class="relative z-[1] grid grid-cols-1 gap-2 min-[421px]:grid-cols-2 md:gap-[10px]">
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

    <section
        class="relative z-[1] mt-4 rounded-[20px] border p-4 [background:color-mix(in_srgb,var(--ios-chip-bg)_72%,transparent)] [border-color:var(--ios-glass-border)]"
        aria-labelledby="now-brewing-title"
    >
        <div class="mb-3 flex items-center justify-between gap-3">
            <p
                id="now-brewing-title"
                class="text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
            >
                Now Brewing
            </p>
            <span class="lowie-warm-chip px-2.5 py-1">Taguig, PH</span>
        </div>

        <div class="grid gap-2">
            <div class="flex items-start gap-2.5">
                <CoffeeIcon class="mt-0.5 size-3.5 shrink-0 [color:var(--lowie-coffee)]" />
                <p class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]">
                    Product ideas shaped over quiet coffee and production notes.
                </p>
            </div>
            <div class="flex items-start gap-2.5">
                <Music2Icon class="mt-0.5 size-3.5 shrink-0 [color:var(--ios-blue)]" />
                <p class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]">
                    Interface rhythm: compact, calm, and easy to scan.
                </p>
            </div>
            <div class="flex items-start gap-2.5">
                <Gamepad2Icon class="mt-0.5 size-3.5 shrink-0 [color:var(--ios-blue)]" />
                <p class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]">
                    Playful command interactions without losing recruiter clarity.
                </p>
            </div>
            <div class="flex items-start gap-2.5">
                <SparklesIcon class="mt-0.5 size-3.5 shrink-0 [color:var(--lowie-warm)]" />
                <p class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]">
                    A macOS-style portfolio tuned for full-stack product work.
                </p>
            </div>
        </div>
    </section>
</PortfolioCard>
