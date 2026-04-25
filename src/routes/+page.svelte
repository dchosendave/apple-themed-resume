<script lang="ts">
    import StatsBar from "$lib/components/portfolio/stats/StatsBar.svelte";
    import SkillsSection from "$lib/components/portfolio/skills/SkillsSection.svelte";
    import TechnicalNotesSection from "$lib/components/portfolio/notes/TechnicalNoteSection.svelte";
    import ExperienceSection from "$lib/components/portfolio/experience/ExperienceSection.svelte";
    import ProjectsSection from "$lib/components/portfolio/projects/ProjectsSection.svelte";
    import EducationSection from "$lib/components/portfolio/education/EducationSection.svelte";
    import ContactFooter from "$lib/components/portfolio/contact/ContactFooter.svelte";
    import CommandPalette from "$lib/components/portfolio/command-center/CommandPalette.svelte";
    import Hero from "$lib/components/portfolio/hero/Hero.svelte";
</script>

<svelte:head>
    <title>Lowie Dichoson | Full-Stack Product Developer</title>
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

<!-- Global ambient light fixed across the whole page -->
<div class="bg-layer" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
</div>

<main class="portfolio-layout">
    <section class="portfolio-main-column">
        <div id="tile-hero"><Hero /></div>
        <div id="tile-experience"><ExperienceSection /></div>
        <div id="tile-projects"><ProjectsSection /></div>
    </section>

    <aside class="portfolio-side-column">
        <div id="tile-stats"><StatsBar /></div>
        <div id="tile-skills"><SkillsSection /></div>
        <div id="tile-notes"><TechnicalNotesSection /></div>
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
        grid-template-columns: minmax(0, 3fr) minmax(320px, 2fr);
        gap: 16px;
        align-items: start;
        max-width: 1240px;
        margin: 0 auto;
        padding: 28px 28px 0;
    }

    .portfolio-main-column,
    .portfolio-side-column {
        display: grid;
        gap: 16px;
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

    /* Fixed ambient layer spans the viewport and persists on scroll. */
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

    /* Top-right forest glow */
    .blob-1 {
        width: 550px;
        height: 550px;
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--ios-blue) 34%, transparent),
            transparent 70%
        );
        top: -160px;
        right: -160px;
    }

    /* Bottom-left warm coffee glow */
    .blob-2 {
        width: 450px;
        height: 450px;
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--ios-blue) 24%, transparent),
            transparent 70%
        );
        bottom: -100px;
        left: -120px;
    }

    /* Center subtle mint glow */
    .blob-3 {
        width: 600px;
        height: 600px;
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--ios-blue) 12%, transparent),
            transparent 70%
        );
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
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
