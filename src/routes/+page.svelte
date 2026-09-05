<script lang="ts">
    import PortfolioStory from "$lib/components/portfolio/PortfolioStory.svelte";
    import CommandPalette from "$lib/components/portfolio/command-center/CommandPalette.svelte";
    import AmbientBackground from "$lib/components/portfolio/shared/AmbientBackground.svelte";
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
<PortfolioStory pulse={data.githubPulse} />
<CommandPalette />
