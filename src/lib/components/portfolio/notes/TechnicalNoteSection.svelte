<script lang="ts">
    import { onDestroy } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import type { ClassValue } from "svelte/elements";
    import { technicalNotes } from "$lib/data/technical-notes";
    import type { TechnicalNote } from "$lib/types/technical-note";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import TechnicalNoteCard from "$lib/components/portfolio/notes/TechnicalNoteCard.svelte";
    import TechnicalNoteDrawer from "$lib/components/portfolio/notes/TechnicalNoteDrawer.svelte";

    const NOTE_OPEN_DELAY_MS = 140;
    const reduceMotion = new MediaQuery("prefers-reduced-motion: reduce", false);

    let {
        variant = "compact",
        class: className,
    }: {
        variant?: "compact" | "page";
        class?: ClassValue;
    } = $props();

    let selectedNote = $state<TechnicalNote | null>(null);
    let openingNoteSlug = $state<string | null>(null);
    let openNoteTimer: ReturnType<typeof setTimeout> | null = null;

    function clearOpenNoteTimer() {
        if (!openNoteTimer) return;

        clearTimeout(openNoteTimer);
        openNoteTimer = null;
    }

    function openNote(note: TechnicalNote) {
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
        clearOpenNoteTimer();
        openingNoteSlug = null;
        selectedNote = null;
    }

    onDestroy(clearOpenNoteTimer);
</script>

<PortfolioCard
    class={[
        "flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]",
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
                {variant === "page"
                    ? "Technical memos from production work, written around the tradeoffs, risks, and lessons behind the portfolio proof."
                    : "Short technical memos on systems, tradeoffs, and production lessons."}
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
        {#each technicalNotes as note, index (note.slug)}
            <TechnicalNoteCard
                {note}
                order={(index + 1).toString().padStart(2, "0")}
                isOpening={openingNoteSlug === note.slug}
                onselect={openNote}
            />
        {/each}
    </div>
</PortfolioCard>

<TechnicalNoteDrawer note={selectedNote} onclose={closeNote} />
