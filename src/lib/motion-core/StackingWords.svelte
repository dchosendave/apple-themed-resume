<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		start = 'top 90%',
		end = 'top 30%',
		scrub = 1.234,
		stagger = 0.21,
		ease = 'power3.out',
		scrollElement = null as string | HTMLElement | null,
		children,
	}: {
		class?: string;
		start?: string;
		end?: string;
		scrub?: boolean | number;
		stagger?: number;
		ease?: string;
		scrollElement?: string | HTMLElement | null;
		children?: Snippet;
	} = $props();

	let container: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scroller =
			typeof scrollElement === 'string'
				? (document.querySelector(scrollElement) ?? undefined)
				: (scrollElement ?? undefined);

		const paragraphs = Array.from(container.querySelectorAll('p'));

		const triggers: ScrollTrigger[] = [];

		paragraphs.forEach((para) => {
			const rawText = para.textContent ?? '';
			para.innerHTML = '';

			const words = rawText.trim().split(/\s+/);
			const wordEls: HTMLElement[] = words.map((word) => {
				const outer = document.createElement('span');
				outer.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:bottom';
				const inner = document.createElement('span');
				inner.style.display = 'inline-block';
				inner.textContent = word + ' ';
				outer.appendChild(inner);
				para.appendChild(outer);
				return inner;
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: para,
					start,
					end,
					scrub,
					scroller,
				},
			});

			tl.from(wordEls, {
				xPercent: 110,
				opacity: 0,
				duration: 1,
				stagger,
				ease,
			});

			triggers.push(tl.scrollTrigger as ScrollTrigger);
		});

		return () => {
			triggers.forEach((t) => t?.kill());
		};
	});
</script>

<div bind:this={container} class={className}>
	{@render children?.()}
</div>
