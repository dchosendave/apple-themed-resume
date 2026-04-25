<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";

    type IconLinkSize = "sm" | "md";
    type IconLinkVariant = "default" | "copied";

    let {
        href,
        label,
        title = label,
        external = false,
        download = undefined,
        size = "md",
        variant = "default",
        class: className,
        onclick,
        onpointerenter,
        onpointerleave,
        onfocus,
        onblur,
        children,
    }: {
        href: string;
        label: string;
        title?: string;
        external?: boolean;
        download?: boolean | string;
        size?: IconLinkSize;
        variant?: IconLinkVariant;
        class?: ClassValue;
        onclick?: (event: MouseEvent) => void;
        onpointerenter?: () => void;
        onpointerleave?: () => void;
        onfocus?: () => void;
        onblur?: () => void;
        children: Snippet;
    } = $props();

    const baseClass =
        "inline-flex items-center justify-center rounded-full border no-underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";
    const defaultClass =
        "cursor-pointer [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)] hover:scale-[1.08] hover:[background:var(--ios-stat-bg)] hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)]";
    const copiedClass =
        "cursor-pointer border-[#30d158] bg-[rgba(48,209,88,0.12)] text-[#30d158]";

    let sizeClass = $derived(size === "sm" ? "size-7" : "size-[34px]");
    let stateClass = $derived(variant === "copied" ? copiedClass : defaultClass);
</script>

<a
    {href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    {download}
    class={[baseClass, sizeClass, stateClass, className]}
    {title}
    aria-label={label}
    {onclick}
    {onpointerenter}
    {onpointerleave}
    {onfocus}
    {onblur}
>
    {@render children()}
</a>
