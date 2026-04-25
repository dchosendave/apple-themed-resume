<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { getIcon } from "$lib/utils/techIcons";

    type TechBadgeVariant = "badge" | "project" | "skill";

    let {
        tech,
        variant = "badge",
        class: className,
    }: {
        tech: string;
        variant?: TechBadgeVariant;
        class?: ClassValue;
    } = $props();

    const variantClasses: Record<TechBadgeVariant, string> = {
        badge: "apple-badge text-[0.64rem]",
        project:
            "inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[0.68rem] font-semibold tracking-[0.02em] [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]",
        skill:
            "inline-flex items-center gap-[5px] rounded-full border px-[10px] py-[5px] text-[0.76rem] font-medium transition-all duration-150 [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-primary)] hover:[background:var(--ios-stat-bg)] hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)]",
    };

    let icon = $derived(getIcon(tech));
</script>

<span class={[variantClasses[variant], className]}>
    {#if icon}
        <img src={icon} alt={tech} class="tech-icon" />
    {/if}
    {tech}
</span>
