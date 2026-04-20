<script lang="ts">
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonStarIcon from "@lucide/svelte/icons/moon-star";
    import { Button } from "$lib/components/ui/button/index.js";
    import { theme } from "$lib/stores/theme.svelte";

    let toggleLabel = $derived(
        theme.isDark ? "Switch to light theme" : "Switch to dark theme"
    );
</script>

<Button
    variant="ghost"
    size="icon"
    class="apple-icon-button size-9 rounded-full"
    onclick={theme.toggle}
    aria-label={toggleLabel}
    title={toggleLabel}
>
    {#if theme.isDark}
        <SunIcon class="size-4" />
    {:else}
        <MoonStarIcon class="size-4" />
    {/if}
</Button>
