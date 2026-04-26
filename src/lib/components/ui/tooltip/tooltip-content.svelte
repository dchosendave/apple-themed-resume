<script lang="ts">
    import { Tooltip as TooltipPrimitive } from "bits-ui";
    import type { ComponentProps, Snippet } from "svelte";
    import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
    import TooltipPortal from "./tooltip-portal.svelte";

    let {
        ref = $bindable(null),
        class: className,
        sideOffset = 6,
        portalProps,
        children,
        ...restProps
    }: WithoutChildrenOrChild<TooltipPrimitive.ContentProps> & {
        portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
        children?: Snippet;
    } = $props();
</script>

<TooltipPortal {...portalProps}>
    <TooltipPrimitive.Content
        bind:ref
        data-slot="tooltip-content"
        {sideOffset}
        class={cn(
            "bg-foreground text-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 z-50 max-w-64 rounded-lg px-2.5 py-1.5 text-xs leading-4 shadow-md",
            className,
        )}
        {...restProps}
    >
        {@render children?.()}
    </TooltipPrimitive.Content>
</TooltipPortal>
