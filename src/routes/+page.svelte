<script lang="ts">
    import StatsBar from "$lib/components/portfolio/stats/StatsBar.svelte";
    import SkillsSection from "$lib/components/portfolio/skills/SkillsSection.svelte";
    import ExperienceSection from "$lib/components/portfolio/experience/ExperienceSection.svelte";
    import ProjectsSection from "$lib/components/portfolio/projects/ProjectsSection.svelte";
    import EducationSection from "$lib/components/portfolio/education/EducationSection.svelte";
    import ContactFooter from "$lib/components/portfolio/contact/ContactFooter.svelte";
    import CommandPalette from "$lib/components/portfolio/command-center/CommandPalette.svelte";
    import AmbientBackground from "$lib/components/portfolio/shared/AmbientBackground.svelte";
    import Hero from "$lib/components/portfolio/hero/Hero.svelte";
    import GitHubPulseSection from "$lib/components/portfolio/github/GitHubPulseSection.svelte";
    import TechnicalNoteSection from "$lib/components/portfolio/notes/TechnicalNoteSection.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Lowie Dichoson | Software Engineer</title>
    <meta
        name="description"
        content="Full-stack product developer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta
        property="og:title"
        content="Lowie Dave Dichoson | Software Engineer"
    />
    <meta
        property="og:description"
        content="Software engineer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />
    <meta property="og:url" content="https://dave-delivers.vercel.app/" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta
        name="twitter:title"
        content="Lowie Dave Dichoson | Software Engineer"
    />
    <meta
        name="twitter:description"
        content="Software Engineer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />
</svelte:head>

<AmbientBackground />

<main class="portfolio-layout">
    <section class="portfolio-main-column">
        <div id="tile-hero"><Hero /></div>
        <div id="tile-experience"><ExperienceSection /></div>
        <div id="tile-projects"><ProjectsSection /></div>
        <div id="tile-notes-teaser"><TechnicalNoteSection variant="teaser" /></div>
        
    </section>

    <aside class="portfolio-side-column">
        <div id="tile-stats"><StatsBar /></div>
        <div id="tile-github">
            <GitHubPulseSection pulse={data.githubPulse} />
        </div>
        <div id="tile-skills"><SkillsSection /></div>
        <div id="tile-education"><EducationSection /></div>
    </aside>

    <ContactFooter />
</main>

<CommandPalette />

<style>
    main {
        position: relative;
        z-index: 1;
        padding-top: 12px;
        padding-bottom: 18px;
    }
    .portfolio-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.48fr) minmax(320px, 0.9fr);
        gap: clamp(12px, 1.6vw, 18px);
        align-items: start;
        max-width: 1260px;
        margin: 0 auto;
        padding: clamp(18px, 2.4vw, 30px) clamp(16px, 2.6vw, 30px) 0;
    }

    .portfolio-main-column,
    .portfolio-side-column {
        display: grid;
        gap: clamp(12px, 1.4vw, 18px);
        align-content: start;
    }

    .portfolio-layout > :global(footer),
    .portfolio-layout > :last-child {
        grid-column: 1 / -1;
    }

    @media (max-width: 900px) {
        .portfolio-layout {
            grid-template-columns: 1fr;
            padding: 18px 18px 0;
            gap: 12px;
        }
    }

    @media (max-width: 768px) {
        main {
            padding-top: 8px;
            padding-bottom: 16px;
        }
    }

    @media (max-width: 600px) {
        main {
            padding-top: 6px;
            padding-bottom: 14px;
        }
    }
</style>
