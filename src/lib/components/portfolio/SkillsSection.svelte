<script lang="ts">
    import { skills } from "$lib/data/skills";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";

    const skillGroups = Object.entries(skills);
    const skillChipClass =
        "inline-flex items-center gap-[5px] rounded-full border px-[10px] py-[5px] text-[0.76rem] font-medium transition-all duration-150 [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-primary)] hover:[background:var(--ios-stat-bg)] hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)]";
</script>

<div
    class="flex flex-col gap-5 overflow-hidden rounded-[24px] border px-[18px] py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:px-6 sm:py-[22px]"
    use:reveal
>
    <p
        class="text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Skills & Stack
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
                        {@const icon = getIcon(skill.name)}
                        <span class={skillChipClass}>
                            {#if icon}
                                <img
                                    src={icon}
                                    alt={skill.name}
                                    class="block size-[13px] shrink-0 object-contain"
                                />
                            {/if}
                            {skill.name}
                        </span>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</div>
