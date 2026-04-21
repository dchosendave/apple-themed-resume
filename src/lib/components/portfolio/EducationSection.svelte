<script lang="ts">
    import { education } from "$lib/data/education";
    import { reveal } from "$lib/actions/reveal";
</script>

<div
    class="overflow-hidden rounded-[24px] border px-[18px] py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-6 sm:py-[22px]"
    use:reveal
>
    <p
        class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Education & Certification
    </p>

    <div class="flex flex-col gap-2 sm:gap-[10px]">
        {#each education as item (item.degree)}
            <div
                class="flex flex-wrap items-start gap-3 rounded-[18px] border px-3 py-[11px] sm:flex-nowrap sm:px-[14px] sm:py-3 [background:color-mix(in_srgb,var(--ios-chip-bg)_92%,transparent)] [border-color:var(--ios-glass-border)]"
            >
                <span class="shrink-0 pt-0.5 text-[1.2rem]">{item.icon}</span>

                <div class="min-w-0 flex-1">
                    <div class="text-[0.84rem] font-semibold leading-[1.4] [color:var(--ios-text-primary)]">
                        {item.degree}
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
</div>
