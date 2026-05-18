<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import type { Snippet } from 'svelte';

	let {
		hoverTarget = null as HTMLElement | null,
		scrambleDuration = 0.6,
		stagger = 0.03,
		cycles = 12,
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%',
		class: className = '',
		children,
	}: {
		hoverTarget?: HTMLElement | null;
		scrambleDuration?: number;
		stagger?: number;
		cycles?: number;
		characters?: string;
		class?: string;
		children?: Snippet;
	} = $props();

	let container: HTMLElement;
	let spans: HTMLElement[] = [];
	let originals: string[] = [];
	let running = false;

	function splitIntoChars() {
		const text = container.textContent ?? '';
		container.innerHTML = '';
		spans = [];
		originals = [];
		[...text].forEach((char) => {
			const span = document.createElement('span');
			span.style.display = 'inline-block';
			span.textContent = char;
			container.appendChild(span);
			spans.push(span);
			originals.push(char);
		});
	}

	function scramble() {
		if (running) return;
		running = true;

		let completed = 0;
		const total = spans.filter((_, i) => !/\s/.test(originals[i])).length;

		spans.forEach((span, i) => {
			const orig = originals[i];
			if (/\s/.test(orig)) return;

			let tick = 0;
			const totalTicks = Math.round((cycles * (1 + i * stagger)) / 0.016);

			gsap.to(
				{},
				{
					duration: scrambleDuration + i * stagger,
					onUpdate() {
						tick++;
						if (tick % 3 === 0) {
							span.textContent = characters[Math.floor(Math.random() * characters.length)];
						}
					},
					onComplete() {
						span.textContent = orig;
						completed++;
						if (completed >= total) running = false;
					},
				}
			);
		});
	}

	onMount(() => {
		splitIntoChars();
		const target = hoverTarget ?? container;
		target.addEventListener('mouseenter', scramble);
		return () => target.removeEventListener('mouseenter', scramble);
	});
</script>

<span bind:this={container} class={className}>
	{@render children?.()}
</span>
