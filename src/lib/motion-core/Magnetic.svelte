<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	let {
		duration = 1,
		ease = 'elastic.out(1, 0.3)',
		strength = 0.35,
		class: className = '',
		children,
	}: {
		duration?: number;
		ease?: string;
		strength?: number;
		class?: string;
		children?: Snippet;
	} = $props();

	let container: HTMLElement;

	onMount(() => {
		const el = container;

		function onMouseMove(e: MouseEvent) {
			const rect = el.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = (e.clientX - cx) * strength;
			const dy = (e.clientY - cy) * strength;
			gsap.to(el, { x: dx, y: dy, duration, ease });
		}

		function onMouseLeave() {
			gsap.to(el, { x: 0, y: 0, duration, ease });
		}

		el.addEventListener('mousemove', onMouseMove);
		el.addEventListener('mouseleave', onMouseLeave);

		return () => {
			el.removeEventListener('mousemove', onMouseMove);
			el.removeEventListener('mouseleave', onMouseLeave);
		};
	});
</script>

<div bind:this={container} class="magnetic-wrapper {className}">
	{@render children?.()}
</div>

<style>
	.magnetic-wrapper {
		display: inline-block;
	}
</style>
