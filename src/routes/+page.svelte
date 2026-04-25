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

        /* Ambient motion tuned to stay calm but visibly alive. */
        --blob-x-start: 0px;
        --blob-y-start: 0px;
        --blob-x-end: 24px;
        --blob-y-end: -18px;
        --blob-scale-start: 1;
        --blob-scale-end: 1.05;
        --blob-rest-x: var(--blob-x-start);
        --blob-rest-y: var(--blob-y-start);
        --blob-rest-scale: var(--blob-scale-start);
        --blob-drift-duration: 24s;
        --blob-pulse-duration: 20s;
        --blob-delay: 0s;

        animation:
            blob-drift var(--blob-drift-duration) ease-in-out infinite alternate,
            blob-pulse var(--blob-pulse-duration) ease-in-out infinite;
        animation-delay: var(--blob-delay);
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

        --blob-x-start: -24px;
        --blob-y-start: 16px;
        --blob-x-end: 34px;
        --blob-y-end: -26px;
        --blob-scale-start: 0.97;
        --blob-scale-end: 1.07;
        --blob-rest-x: 5px;
        --blob-rest-y: -5px;
        --blob-rest-scale: 1.02;
        --blob-drift-duration: 22s;
        --blob-pulse-duration: 20s;
        --blob-delay: -6s;
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

        --blob-x-start: -28px;
        --blob-y-start: 18px;
        --blob-x-end: 30px;
        --blob-y-end: -20px;
        --blob-scale-start: 0.95;
        --blob-scale-end: 1.05;
        --blob-rest-x: 1px;
        --blob-rest-y: -1px;
        --blob-rest-scale: 1;
        --blob-drift-duration: 26s;
        --blob-pulse-duration: 22s;
        --blob-delay: -12s;
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

        --blob-x-start: calc(-50% - 24px);
        --blob-y-start: -14px;
        --blob-x-end: calc(-50% + 28px);
        --blob-y-end: 14px;
        --blob-scale-start: 0.98;
        --blob-scale-end: 1.06;
        --blob-rest-x: -50%;
        --blob-rest-y: 0px;
        --blob-rest-scale: 1.02;
        --blob-drift-duration: 28s;
        --blob-pulse-duration: 24s;
        --blob-delay: -18s;
    }

    @media (prefers-reduced-motion: no-preference) {
        .blob {
            will-change: transform, opacity;
        }
    }

    @keyframes blob-drift {
        0% {
            transform: translate3d(var(--blob-x-start), var(--blob-y-start), 0)
                scale(var(--blob-scale-start));
        }
        100% {
            transform: translate3d(var(--blob-x-end), var(--blob-y-end), 0)
                scale(var(--blob-scale-end));
        }
    }

    @keyframes blob-pulse {
        0%,
        100% {
            opacity: 0.72;
        }
        50% {
            opacity: 0.94;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .blob {
            animation: none;
            will-change: auto;
            transform: translate3d(var(--blob-rest-x), var(--blob-rest-y), 0)
                scale(var(--blob-rest-scale));
            opacity: 0.86;
        }
    }

    @media (max-width: 768px) {
        .blob {
            filter: blur(72px);
        }

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
