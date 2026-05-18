<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import type { Snippet } from 'svelte';

	let {
		scaleFactor = 0.05,
		offset = 10,
		topOffset = 20,
		scrollElement = null as string | HTMLElement | null,
		class: className = '',
		children,
	}: {
		scaleFactor?: number;
		offset?: number;
		topOffset?: number;
		scrollElement?: string | HTMLElement | null;
		class?: string;
		children?: Snippet;
	} = $props();

	let container: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scroller =
			typeof scrollElement === 'string'
				? (document.querySelector(scrollElement) ?? undefined)
				: (scrollElement ?? undefined);

		const cards = Array.from(
			container.querySelectorAll('[data-card-stack-item]')
		) as HTMLElement[];

		cards.forEach((card, i) => {
			card.style.top = `${topOffset + i * offset}px`;
		});

		const triggers: ScrollTrigger[] = [];

		cards.slice(0, -1).forEach((card, j) => {
			const maxCardsAbove = cards.length - 1 - j;
			const tween = gsap.fromTo(
				card,
				{ scale: 1 },
				{
					scale: 1 - scaleFactor * maxCardsAbove,
					immediateRender: false,
					scrollTrigger: {
						trigger: cards[j + 1],
						start: 'top bottom',
						end: `top top+=${topOffset + (cards.length - 1) * offset}`,
						scrub: true,
						scroller,
					},
				}
			);
			if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
		});

		return () => triggers.forEach((t) => t.kill());
	});
</script>

<div bind:this={container} class={className}>
	{@render children?.()}
</div>
