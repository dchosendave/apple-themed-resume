<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		duration = 20,
		repeat = 4,
		gap = 12,
		reversed = false,
		class: className = '',
		children,
	}: {
		duration?: number;
		repeat?: number;
		gap?: number;
		reversed?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div class="marquee-outer {className}">
	<div
		class="marquee-track"
		class:reversed
		style="--duration:{duration}s; --gap:{gap}px; --repeat:{repeat}"
	>
		{#each Array(repeat) as _, i (i)}
			<div class="marquee-set">
				{@render children?.()}
			</div>
		{/each}
	</div>
</div>

<style>
	.marquee-outer {
		overflow: hidden;
		width: 100%;
	}

	.marquee-track {
		display: flex;
		width: max-content;
		gap: var(--gap);
		animation: marquee-scroll var(--duration) linear infinite;
		will-change: transform;
	}

	.marquee-track.reversed {
		animation-direction: reverse;
	}

	.marquee-set {
		display: flex;
		gap: var(--gap);
		flex-shrink: 0;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% / var(--repeat)));
		}
	}
</style>
