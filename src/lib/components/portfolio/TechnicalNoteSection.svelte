<script lang="ts">
    import { technicalNotes } from "$lib/data/technical-notes";
    import type { TechnicalNote } from "$lib/types/technical-note";
    import PortfolioCard from "./PortfolioCard.svelte";
    import TechnicalNoteCard from "./TechnicalNoteCard.svelte";
    import TechnicalNoteDrawer from "./TechnicalNoteDrawer.svelte";

    let selectedNote = $state<TechnicalNote | null>(null);
</script>

<PortfolioCard class="flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="flex items-start justify-between gap-3">
        <div>
            <p class="apple-section-title mb-1">Technical Notes</p>
            <p class="text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                Short field notes on backend systems, data workflows, and production tradeoffs.
            </p>
        </div>

        <span class="apple-chip shrink-0 text-[0.64rem]">{technicalNotes.length}</span>
    </div>

    <div class="flex flex-col gap-2.5">
        {#each technicalNotes as note (note.slug)}
            <TechnicalNoteCard {note} onselect={(nextNote) => selectedNote = nextNote} />
        {/each}
    </div>
</PortfolioCard>

<TechnicalNoteDrawer note={selectedNote} onclose={() => selectedNote = null} />
