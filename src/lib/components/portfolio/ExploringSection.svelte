<script lang="ts">
    import { exploring } from "$lib/data/currently-exploring";
    import { reveal } from "$lib/actions/reveal";
</script>

<div
    class="overflow-hidden rounded-[24px] border px-[18px] py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-6 sm:py-[22px]"
    use:reveal
>
    <p
        class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Currently Exploring
    </p>

    <div class="flex flex-col gap-2 sm:gap-[10px]">
        {#each exploring as item (item.label)}
            <div
                class="flex items-start gap-3 rounded-[18px] border px-3 py-[11px] sm:px-[14px] sm:py-3 [background:color-mix(in_srgb,var(--ios-chip-bg)_92%,transparent)] [border-color:var(--ios-glass-border)]"
            >
                <span class="shrink-0 pt-0.5 text-[1.15rem]">{item.icon}</span>

                <div class="flex flex-col gap-px">
                    <span
                        class="text-[0.84rem] font-semibold leading-[1.3] [color:var(--ios-text-primary)]"
                    >
                        {item.label}
                    </span>
                    <span
                        class="text-[0.76rem] leading-[1.45] [color:var(--ios-text-secondary)]"
                    >
                        {item.note}
                    </span>
                </div>
            </div>
        {/each}
    </div>
</div>
