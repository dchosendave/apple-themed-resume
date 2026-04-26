<script lang="ts">
    import { Tooltip as TooltipPrimitive } from "bits-ui";

    let {
        open = $bindable(false),
        triggerId = $bindable(null),
        ...restProps
    }: TooltipPrimitive.RootProps = $props();
</script>

<TooltipPrimitive.Root bind:open bind:triggerId {...restProps} />
