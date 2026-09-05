<script lang="ts">
    import { onDestroy } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import type { ClassValue } from "svelte/elements";
    import { technicalNotes } from "$lib/data/technical-notes";
    import type { TechnicalNote } from "$lib/types/technical-note";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import TechnicalNoteCard from "$lib/components/portfolio/notes/TechnicalNoteCard.svelte";
    import TechnicalNoteDrawer from "$lib/components/portfolio/notes/TechnicalNoteDrawer.svelte";
    import { sound } from "$lib/stores/sound.svelte";

    const NOTE_OPEN_DELAY_MS = 140;
    const reduceMotion = new MediaQuery("prefers-reduced-motion: reduce", false);

    let {
        variant = "compact",
        class: className,
    }: {
        variant?: "compact" | "page" | "teaser";
        class?: ClassValue;
    } = $props();

    const teaserNotes = $derived(variant === "teaser" ? technicalNotes.slice(0, 1) : technicalNotes);
    const remainingCount = $derived(technicalNotes.length - teaserNotes.length);

    let selectedNote = $state<TechnicalNote | null>(null);
    let openingNoteSlug = $state<string | null>(null);
    let openNoteTimer: ReturnType<typeof setTimeout> | null = null;

    function clearOpenNoteTimer() {
        if (!openNoteTimer) return;

        clearTimeout(openNoteTimer);
        openNoteTimer = null;
    }

    function openNote(note: TechnicalNote) {
        sound.play('open');
        clearOpenNoteTimer();
        openingNoteSlug = note.slug;

        if (reduceMotion.current) {
            selectedNote = note;
            openingNoteSlug = null;
            return;
        }

        openNoteTimer = setTimeout(() => {
            selectedNote = note;
            openingNoteSlug = null;
            openNoteTimer = null;
        }, NOTE_OPEN_DELAY_MS);
    }

    function closeNote() {
        if (selectedNote) sound.play('close');
        clearOpenNoteTimer();
        openingNoteSlug = null;
        selectedNote = null;
    }

    onDestroy(clearOpenNoteTimer);
</script>

<PortfolioCard
    class={[
        "lowie-card-glow flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]",
        variant === "page" && "gap-5",
        className,
    ]}
>
    <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
            <p class="apple-section-title mb-1">Field Notes</p>
            <p
                class={[
                    "text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]",
                    variant === "page" && "max-w-[58ch]",
                ]}
            >
                {#if variant === "page"}
                    Technical memos from production work, written around the tradeoffs, risks, and lessons behind the portfolio proof.
                {:else if variant === "teaser"}
                    A featured memo from production work — the rest live on the field notes page.
                {:else}
                    Short technical memos on systems, tradeoffs, and production lessons.
                {/if}
            </p>
        </div>

        <span class="apple-chip shrink-0 text-[0.64rem]">
            {technicalNotes.length} memos
        </span>
    </div>

    <div
        class={[
            variant === "page"
                ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-2.5",
        ]}
    >
        {#each teaserNotes as note, index (note.slug)}
            <TechnicalNoteCard
                {note}
                order={(index + 1).toString().padStart(2, "0")}
                isOpening={openingNoteSlug === note.slug}
                onselect={openNote}
            />
        {/each}
    </div>

    {#if variant === "teaser" && remainingCount > 0}
        <a
            href="/notes"
            class="apple-chip self-start px-3 py-1.5 text-[0.7rem] font-semibold no-underline transition-[background,border-color] duration-150 hover:[background:color-mix(in_srgb,var(--ios-blue)_14%,var(--ios-chip-bg))] hover:[border-color:color-mix(in_srgb,var(--ios-blue)_38%,var(--ios-chip-border))]"
        >
            Read all {technicalNotes.length} memos →
        </a>
    {/if}
</PortfolioCard>

<TechnicalNoteDrawer note={selectedNote} onclose={closeNote} />
