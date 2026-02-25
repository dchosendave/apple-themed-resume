<script lang="ts">
	import NavBar from "$lib/components/portfolio/NavBar.svelte";
	import Hero from "$lib/components/portfolio/Hero.svelte";
	import StatsBar from "$lib/components/portfolio/StatsBar.svelte";
	import SkillsSection from "$lib/components/portfolio/SkillsSection.svelte";
	import ExperienceSection from "$lib/components/portfolio/ExperienceSection.svelte";
	import EducationSection from "$lib/components/portfolio/EducationSection.svelte";
	import ContactFooter from "$lib/components/portfolio/ContactFooter.svelte";
</script>

<svelte:head>
	<title>Lowie Dave Dichoson · Portfolio</title>
</svelte:head>

<NavBar />

<main>
	<Hero />
	<StatsBar />
	<SkillsSection />
	<ExperienceSection />
	<EducationSection />
	<ContactFooter />
</main>

<style>
	main {
		width: 100%;
	}
</style>
