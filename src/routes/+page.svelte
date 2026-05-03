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
    import GitHubPulseSection from "$lib/components/portfolio/github/GitHubPulseSection.svelte";
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

<!-- Global ambient light fixed across the whole page -->
<div class="bg-layer" aria-hidden="true">
    <div class="ambient-grid"></div>
    <div class="ambient-wash ambient-wash-top"></div>
    <div class="ambient-wash ambient-wash-bottom"></div>
</div>

<main class="portfolio-layout">
    <section class="portfolio-main-column">
        <div id="tile-hero"><Hero /></div>
        <div id="tile-experience"><ExperienceSection /></div>
        <div id="tile-projects"><ProjectsSection /></div>
        <div id="tile-education"><EducationSection /></div>
    </section>

    <aside class="portfolio-side-column">
        <div id="tile-stats"><StatsBar /></div>
        <div id="tile-github">
            <GitHubPulseSection pulse={data.githubPulse} />
        </div>
        <div id="tile-skills"><SkillsSection /></div>
        <div id="tile-notes"><TechnicalNotesSection /></div>
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

    /* Fixed ambient layer spans the viewport and persists on scroll. */
    .bg-layer {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        background:
            linear-gradient(
                135deg,
                color-mix(in srgb, var(--ios-bg) 94%, var(--ios-blue)) 0%,
                var(--ios-bg) 42%,
                color-mix(in srgb, var(--ios-bg) 92%, var(--lowie-warm)) 100%
            );
    }

    .ambient-grid,
    .ambient-wash {
        position: absolute;
        inset: 0;
    }

    .ambient-grid {
        opacity: 0.28;
        background-image:
            linear-gradient(
                color-mix(in srgb, var(--ios-blue) 14%, transparent) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                color-mix(in srgb, var(--ios-blue) 10%, transparent) 1px,
                transparent 1px
            );
        background-size: 72px 72px;
        mask-image: linear-gradient(
            180deg,
            transparent 0%,
            rgb(7 10 8) 18%,
            rgb(7 10 8) 72%,
            transparent 100%
        );
    }

    .ambient-wash {
        opacity: 0.9;
        transition: opacity 0.3s ease;
    }

    .ambient-wash-top {
        background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--ios-blue) 18%, transparent) 0%,
            transparent 46%
        );
    }

    .ambient-wash-bottom {
        background: linear-gradient(
            18deg,
            color-mix(in srgb, var(--lowie-warm) 12%, transparent) 0%,
            transparent 44%
        );
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
