<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import { reveal } from "$lib/actions/reveal";

    let {
        children,
        class: className,
    }: {
        children: Snippet;
        class?: ClassValue;
    } = $props();
</script>

<div class={["apple-card bento-tile", className]} use:reveal>
    {@render children()}
</div>
