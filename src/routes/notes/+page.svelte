<script lang="ts">
    import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
    import AmbientBackground from "$lib/components/portfolio/shared/AmbientBackground.svelte";
    import CommandPalette from "$lib/components/portfolio/command-center/CommandPalette.svelte";
    import ContactFooter from "$lib/components/portfolio/contact/ContactFooter.svelte";
    import TechnicalNotesSection from "$lib/components/portfolio/notes/TechnicalNoteSection.svelte";
</script>

<svelte:head>
    <title>Field Notes | Lowie Dichoson</title>
    <meta
        name="description"
        content="Technical field notes from Lowie Dave Dichoson on production systems, access control, data migration, and legacy enterprise work."
    />
</svelte:head>

<AmbientBackground />

<main class="notes-layout">
    <section class="notes-hero apple-card bento-tile">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <a href="/" class="apple-chip notes-back">
                <ArrowLeftIcon class="size-3.5" />
                Home
            </a>

            <span class="lowie-warm-chip px-2.5 py-1 text-[0.66rem]">
                Production memos
            </span>
        </div>

        <div class="mt-7 max-w-[68ch]">
            <p class="apple-section-title mb-2">Field Notes</p>
            <h1
                class="text-[2rem] font-extrabold leading-[1.05] tracking-normal [color:var(--ios-text-primary)] sm:text-[2.5rem]"
            >
                Notes from systems work that had to stay dependable.
            </h1>
            <p
                class="mt-4 max-w-[62ch] text-[0.95rem] leading-[1.7] [color:var(--ios-text-secondary)]"
            >
                Short technical writeups on the messy middle of engineering:
                database assumptions, access control, legacy constraints, and
                the checks that keep production changes calm.
            </p>
        </div>
    </section>

    <TechnicalNotesSection variant="page" />

    <ContactFooter />
</main>

<CommandPalette />

<style>
    .notes-layout {
        position: relative;
        z-index: 1;
        display: grid;
        gap: clamp(12px, 1.5vw, 18px);
        max-width: 1120px;
        margin: 0 auto;
        padding: clamp(18px, 2.4vw, 30px) clamp(16px, 2.6vw, 30px) 0;
    }

    .notes-hero {
        padding: clamp(18px, 2.4vw, 28px);
    }

    .notes-back {
        text-decoration: none;
    }

    @media (max-width: 768px) {
        .notes-layout {
            padding: 18px 18px 0;
        }

        .notes-hero {
            padding: 18px;
        }
    }
</style>
