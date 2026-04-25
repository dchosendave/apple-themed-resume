<script lang="ts">
    import Hero from "$lib/components/portfolio/Hero.svelte";
    import StatsBar from "$lib/components/portfolio/StatsBar.svelte";
    import SkillsSection from "$lib/components/portfolio/SkillsSection.svelte";
    import TechnicalNotesSection from "$lib/components/portfolio/TechnicalNoteSection.svelte";
    import ExperienceSection from "$lib/components/portfolio/ExperienceSection.svelte";
    import ProjectsSection from "$lib/components/portfolio/ProjectsSection.svelte";
    import EducationSection from "$lib/components/portfolio/EducationSection.svelte";
    import ContactFooter from "$lib/components/portfolio/ContactFooter.svelte";
    import CommandPalette from "$lib/components/portfolio/CommandPalette.svelte";
</script>

<svelte:head>
    <title>Lowie Dichoson | Full-Stack Product Developer</title>
    <meta
        name="description"
        content="Full-stack product developer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Lowie Dave Dichoson | Full-Stack Product Developer" />
    <meta
        property="og:description"
        content="Full-stack product developer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />
    <meta property="og:url" content="https://dave-delivers.vercel.app/" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Lowie Dave Dichoson | Full-Stack Product Developer" />
    <meta
        name="twitter:description"
        content="Full-stack product developer with experience designing production systems, building APIs, and managing complex data workflows in financial applications."
    />
</svelte:head>

<!-- Global ambient light fixed across the whole page -->
<div class="bg-layer" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
</div>

<main class="bento-grid">
    <!-- Row 1: Hero (3fr) + Stats (2fr) -->
    <div id="tile-hero" class="tile-hero"><Hero /></div>
    <div class="tile-stats"><StatsBar /></div>

    <!-- Row 2: Experience (3fr) + Skills (2fr) -->
    <div id="tile-experience" class="tile-experience"><ExperienceSection /></div>
    <div class="tile-right-col-2">
        <div id="tile-skills" class="tile-skills"><SkillsSection /></div>
        <div id="tile-notes" class="tile-exploring"><TechnicalNotesSection /></div>
    </div>

    <!-- Row 3: Projects (3fr) + Education (2fr) -->
    <div id="tile-projects" class="tile-projects"><ProjectsSection /></div>
    <div id="tile-education" class="tile-education"><EducationSection /></div>

    <!-- Row 4: Full-width footer -->
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

    .tile-hero,
    .tile-stats,
    .tile-experience,
    .tile-projects,
    .tile-education {
        display: flex;
    }

    .tile-hero > :global(*),
    .tile-stats > :global(*),
    .tile-experience > :global(*),
    .tile-projects > :global(*),
    .tile-education > :global(*) {
        flex: 1;
        min-width: 0;
    }

    .tile-right-col-2 {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-self: start;
    }

    .tile-skills,
    .tile-exploring {
        display: flex;
    }

    .tile-skills > :global(*),
    .tile-exploring > :global(*) {
        flex: 1;
        min-width: 0;
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
        background: radial-gradient(circle, color-mix(in srgb, var(--ios-blue) 34%, transparent), transparent 70%);
        top: -160px;
        right: -160px;
    }

    /* Bottom-left warm coffee glow */
    .blob-2 {
        width: 450px;
        height: 450px;
        background: radial-gradient(circle, color-mix(in srgb, var(--lowie-coffee) 24%, transparent), transparent 70%);
        bottom: -100px;
        left: -120px;
    }

    /* Center subtle mint glow */
    .blob-3 {
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, color-mix(in srgb, var(--lowie-mint) 12%, transparent), transparent 70%);
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

        .tile-right-col-2 {
            gap: 12px;
        }
    }
</style>
