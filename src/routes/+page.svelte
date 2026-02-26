<script lang="ts">
	import Hero from "$lib/components/portfolio/Hero.svelte";
	import StatsBar from "$lib/components/portfolio/StatsBar.svelte";
	import SkillsSection from "$lib/components/portfolio/SkillsSection.svelte";
	import ExperienceSection from "$lib/components/portfolio/ExperienceSection.svelte";
	import ProjectsSection from "$lib/components/portfolio/ProjectsSection.svelte";
	import EducationSection from "$lib/components/portfolio/EducationSection.svelte";
	import ContactFooter from "$lib/components/portfolio/ContactFooter.svelte";
</script>

<svelte:head>
	<title>Get to know Lowie</title>
</svelte:head>

<!-- Global ambient blobs — fixed so they persist across the whole page on scroll -->
<div class="bg-layer" aria-hidden="true">
	<div class="blob blob-1"></div>
	<div class="blob blob-2"></div>
	<div class="blob blob-3"></div>
</div>

<main>
	<Hero />
	<StatsBar />
	<SkillsSection />
	<ExperienceSection />
	<ProjectsSection />
	<EducationSection />
	<ContactFooter />
</main>

<style>
	main {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	/* Fixed blob layer — spans full viewport, persists on scroll */
	.bg-layer {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		pointer-events: none;
	}

	/* Top-right blue glow */
	.blob-1 {
		width: 550px;
		height: 550px;
		background: radial-gradient(circle, #007aff55, transparent 70%);
		top: -160px;
		right: -160px;
	}

	/* Bottom-left purple glow */
	.blob-2 {
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, #5e5ce640, transparent 70%);
		bottom: -100px;
		left: -120px;
	}

	/* Center subtle blue — ties the page together */
	.blob-3 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, #007aff18, transparent 70%);
		top: 40%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
