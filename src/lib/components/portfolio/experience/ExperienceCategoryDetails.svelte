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

<div class={["apple-card-inner space-y-4 p-4", className]}>
    <div class="flex min-w-0 items-center justify-between gap-3">
        <p class="apple-section-title mb-0 text-[0.74rem]">
            {category.title}
        </p>

        <span class="apple-chip shrink-0 text-[0.62rem]">
            {category.bullets.length}
            {category.bullets.length === 1 ? "note" : "notes"}
        </span>
    </div>

    <ul class="space-y-4 border-t pt-4 [border-color:var(--ios-separator)]">
        {#each category.bullets as bullet (bullet.text)}
            <li class="flex gap-3.5">
                <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full [background:var(--ios-blue)]"
                ></span>

                <div class="min-w-0 space-y-2">
                    <p class="text-[0.84rem] leading-6 [color:var(--ios-text-primary)]">
                        {bullet.text}
                    </p>

                    {#if bullet.stack.length > 0}
                        <div class="flex flex-wrap gap-2">
                            {#each bullet.stack as tech (tech)}
                                <TechBadge {tech} />
                            {/each}
                        </div>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</div>
