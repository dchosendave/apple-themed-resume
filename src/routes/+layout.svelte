<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme.svelte";
	import "../app.css";

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<div class="portfolio-root" class:dark={theme.isDark}>
	{@render children()}
</div>

<style>
	.portfolio-root {
		min-height: 100vh;
		background-color: var(--ios-bg);
		color: var(--ios-text-primary);
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>
