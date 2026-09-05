<script lang="ts">
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonStarIcon from "@lucide/svelte/icons/moon-star";
    import { Button } from "$lib/components/ui/button/index.js";
    import { theme } from "$lib/stores/theme.svelte";
    import { sound } from "$lib/stores/sound.svelte";
    import { playHoverSound } from "$lib/actions/hoverSound";

    let toggleLabel = $derived(
        theme.isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    sound.init();
</script>

<Button
    onpointerenter={playHoverSound}
    variant="ghost"
    size="icon"
    class="apple-icon-button size-11 rounded-full sm:size-9"
    onclick={() => {
        theme.toggle();
        sound.play('toggle');
    }}
    aria-label={toggleLabel}
    title={toggleLabel}
>
    {#if theme.isDark}
        <SunIcon class="size-4" />
    {:else}
        <MoonStarIcon class="size-4" />
    {/if}
</Button>
