<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		style = '',
		children,
	}: {
		class?: string;
		style?: string;
		children?: Snippet;
	} = $props();
</script>

<div data-card-stack-item class="sticky {className}" {style} use:reveal>
	{@render children?.()}
</div>
