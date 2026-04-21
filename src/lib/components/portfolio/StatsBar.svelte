<script lang="ts">
    import { stats } from "$lib/data/stats";
    import { reveal } from "$lib/actions/reveal";
    import { countUp } from "$lib/actions/countUp";
</script>

<div
    class="flex flex-col overflow-hidden rounded-[24px] border px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:px-6 md:py-[22px]"
    use:reveal
>
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
</div>
