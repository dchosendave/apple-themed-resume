<script lang="ts" module>
    import { type VariantProps, tv } from "tailwind-variants";

    export const badgeVariants = tv({
        base: "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-none [&>svg]:pointer-events-none [&>svg]:size-3",
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                destructive: "border-transparent bg-destructive text-white",
                outline: "text-foreground border-border",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    });

    export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn, type WithElementRef } from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        variant = "default",
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
        variant?: BadgeVariant;
        children?: Snippet;
    } = $props();
</script>

<span
    bind:this={ref}
    data-slot="badge"
    class={cn(badgeVariants({ variant }), className)}
    {...restProps}
>
    {@render children?.()}
</span>
