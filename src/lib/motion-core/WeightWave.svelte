<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	let {
		baseWeight = 400,
		hoverWeight = 750,
		influenceRadius = 3,
		falloffPower = 1.5,
		duration = 0.9,
		ease = 'power3.out',
		class: className = '',
		children,
	}: {
		baseWeight?: number;
		hoverWeight?: number;
		influenceRadius?: number;
		falloffPower?: number;
		duration?: number;
		ease?: string;
		class?: string;
		children?: Snippet;
	} = $props();

	let container: HTMLElement;
	let charSpans: HTMLElement[] = [];

	function splitIntoChars() {
		const text = container.textContent ?? '';
		container.innerHTML = '';
		charSpans = [...text].map((char) => {
			const span = document.createElement('span');
			span.style.display = 'inline-block';
			span.style.fontWeight = String(baseWeight);
			span.textContent = char;
			container.appendChild(span);
			return span;
		});
	}

	function onMouseMove(e: MouseEvent) {
		const hovered = e.target as HTMLElement;
		const idx = charSpans.indexOf(hovered);
		if (idx < 0) return;

		charSpans.forEach((span, i) => {
			const dist = Math.abs(i - idx);
			const weight =
				dist === 0
					? hoverWeight
					: dist <= influenceRadius
						? baseWeight +
							(hoverWeight - baseWeight) *
								Math.pow(1 - dist / influenceRadius, falloffPower)
						: baseWeight;
			gsap.to(span, { fontWeight: weight, duration, ease });
		});
	}

	function onMouseLeave() {
		charSpans.forEach((span) => gsap.to(span, { fontWeight: baseWeight, duration, ease }));
	}

	onMount(() => {
		splitIntoChars();
		container.addEventListener('mousemove', onMouseMove);
		container.addEventListener('mouseleave', onMouseLeave);
		return () => {
			container.removeEventListener('mousemove', onMouseMove);
			container.removeEventListener('mouseleave', onMouseLeave);
		};
	});
</script>

<span bind:this={container} class={className}>
	{@render children?.()}
</span>
