<script lang="ts">
    import { Tooltip as TooltipPrimitive } from "bits-ui";
    import type { Snippet } from "svelte";

    let {
        children,
        delayDuration = 180,
        skipDelayDuration = 120,
        ...restProps
    }: TooltipPrimitive.ProviderProps & { children?: Snippet } = $props();
</script>

<TooltipPrimitive.Provider {delayDuration} {skipDelayDuration} {...restProps}>
    {@render children?.()}
</TooltipPrimitive.Provider>
