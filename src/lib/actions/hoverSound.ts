import { browser } from '$app/environment';
import { sound } from '$lib/stores/sound.svelte';

export function playHoverSound(event: PointerEvent) {
    if (!browser || event.pointerType !== 'mouse') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    sound.play('hover');
}

export function hoverSound(node: HTMLElement) {
    node.addEventListener('pointerenter', playHoverSound);

    return {
        destroy() {
            node.removeEventListener('pointerenter', playHoverSound);
        },
    };
}
