<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';

	let {
		texts = [] as string[],
		interval = 2000,
		class: className = '',
	}: {
		texts: string[];
		interval?: number;
		class?: string;
	} = $props();

	let current = $state(0);
	let inner: HTMLElement;
	let timer: ReturnType<typeof setInterval>;

	function advance() {
		if (!inner) return;
		const nextIndex = (current + 1) % texts.length;
		gsap.to(inner, {
			yPercent: -20,
			opacity: 0,
			filter: 'blur(4px)',
			duration: 0.28,
			ease: 'power2.in',
			onComplete: () => {
				current = nextIndex;
				gsap.fromTo(
					inner,
					{ yPercent: 20, opacity: 0, filter: 'blur(4px)' },
					{ yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.32, ease: 'power2.out' }
				);
			},
		});
	}

	onMount(() => {
		if (texts.length <= 1) return;
		timer = setInterval(advance, interval);
		return () => clearInterval(timer);
	});

	onDestroy(() => clearInterval(timer));
</script>

<span class="text-loop-outer {className}">
	<span bind:this={inner} class="text-loop-inner">
		{texts[current]}
	</span>
</span>

<style>
	.text-loop-outer {
		display: inline-block;
		overflow: hidden;
		vertical-align: bottom;
	}
	.text-loop-inner {
		display: inline-block;
	}
</style>
