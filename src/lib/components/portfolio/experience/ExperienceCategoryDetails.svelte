<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import type { ExperienceCategory } from "$lib/types/experience-category";
    import TechBadge from "$lib/components/portfolio/shared/TechBadge.svelte";

    let {
        category,
        class: className,
    }: {
        category: ExperienceCategory;
        class?: ClassValue;
    } = $props();
</script>

<div class={["apple-card-inner overflow-hidden", className]}>
    <div class="flex min-w-0 items-center justify-between gap-3 px-4 py-4">
        <p class="apple-section-title mb-0 text-[0.74rem] leading-[1.35]">
            {category.title}
        </p>

        <span class="apple-chip shrink-0 px-[11px] py-[4px] text-[0.62rem]">
            {category.bullets.length}
            {category.bullets.length === 1 ? " note" : " notes"}
        </span>
    </div>

    <ol class="border-t [border-color:var(--ios-separator)]">
        {#each category.bullets as bullet, index (bullet.text)}
            <li
                class={[
                    "flex gap-3 px-4 py-4 sm:gap-4",
                    index > 0 && "border-t [border-color:var(--ios-separator)]",
                ]}
            >
                <span
                    class="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-semibold [background:color-mix(in_srgb,var(--ios-glass)_72%,transparent)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                >
                    {(index + 1).toString().padStart(2, "0")}
                </span>

                <div class="min-w-0">
                    <p
                        class="max-w-[62ch] text-[0.84rem] leading-[1.75] [color:var(--ios-text-primary)]"
                    >
                        {bullet.text}
                    </p>

                    {#if bullet.stack.length > 0}
                        <div class="mt-3 flex flex-wrap gap-2">
                            {#each bullet.stack as tech (tech)}
                                <TechBadge {tech} />
                            {/each}
                        </div>
                    {/if}
                </div>
            </li>
        {/each}
    </ol>
</div>
