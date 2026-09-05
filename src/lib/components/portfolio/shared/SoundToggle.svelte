<script lang="ts">
    import Volume2Icon from '@lucide/svelte/icons/volume-2';
    import VolumeXIcon from '@lucide/svelte/icons/volume-x';
    import { Button } from '$lib/components/ui/button/index.js';
    import { sound } from '$lib/stores/sound.svelte';
    import { playHoverSound } from '$lib/actions/hoverSound';

    sound.init();
    const label = $derived(sound.enabled ? 'Turn interaction sounds off' : 'Turn interaction sounds on');
</script>

<Button
    onpointerenter={playHoverSound}
    variant="ghost"
    size="icon"
    class="apple-icon-button size-11 rounded-full sm:size-9"
    onclick={sound.toggle}
    aria-label={label}
    aria-pressed={sound.enabled}
    title={label}
>
    {#if sound.enabled}
        <Volume2Icon class="size-4" />
    {:else}
        <VolumeXIcon class="size-4" />
    {/if}
</Button>
