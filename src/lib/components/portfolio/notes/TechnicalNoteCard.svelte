<script lang="ts">
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
    import ClockIcon from '@lucide/svelte/icons/clock';
    import type { TechnicalNote } from '$lib/types/technical-note';

    let { note, onselect, isOpening = false }: {
        note: TechnicalNote;
        onselect: (note: TechnicalNote) => void;
        isOpening?: boolean;
    } = $props();
</script>

<button
    class={[
        "field-note-card group/note relative flex w-full flex-col gap-2 overflow-hidden rounded-[18px] border px-3.5 py-3 text-left [background:color-mix(in_srgb,var(--ios-chip-bg)_92%,transparent)] [border-color:var(--ios-glass-border)] transition-[background,border-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:[background:color-mix(in_srgb,var(--ios-chip-bg)_78%,var(--ios-stat-bg))] hover:[border-color:color-mix(in_srgb,var(--ios-blue)_35%,transparent)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)] motion-reduce:transform-none motion-reduce:transition-colors",
        isOpening &&
            "field-note-card--opening [border-color:color-mix(in_srgb,var(--ios-blue)_50%,transparent)] shadow-[0_12px_28px_rgba(45,120,255,0.14)]"
    ]}
    onclick={() => onselect(note)}
    type="button"
    aria-label="Read note: {note.title}"
    aria-busy={isOpening ? "true" : undefined}
>
    {#if isOpening}
        <span class="field-note-card__wash" aria-hidden="true"></span>
    {/if}

    <div class="flex items-center justify-between gap-3">
        <span class="apple-badge text-[0.62rem]">{note.category}</span>
        <span class="inline-flex items-center gap-1 text-[0.66rem] [color:var(--ios-text-tertiary)]">
            <ClockIcon class="size-3" />
            {note.readTime}
        </span>
    </div>

    <div class="flex items-start justify-between gap-3">
        <h3 class="text-[0.84rem] font-semibold leading-[1.35] [color:var(--ios-text-primary)]">
            {note.title}
        </h3>
        <ArrowUpRightIcon class="mt-0.5 size-3.5 shrink-0 [color:var(--ios-blue)] opacity-70 transition-[opacity,transform] duration-150 group-hover/note:-translate-y-0.5 group-hover/note:translate-x-0.5 group-hover/note:opacity-100" />
    </div>

    <p class="text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
        {note.summary}
    </p>

    <div class="flex flex-wrap gap-1.5 pt-1">
        {#each note.tags.slice(0, 3) as tag (tag)}
            <span class="apple-chip px-2 py-[3px] text-[0.6rem]">{tag}</span>
        {/each}
    </div>
</button>

<style>
    .field-note-card {
        will-change: transform;
    }

    .field-note-card--opening {
        animation: field-note-press 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .field-note-card__wash {
        pointer-events: none;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background:
            radial-gradient(circle at 22% 20%, color-mix(in srgb, var(--ios-blue) 18%, transparent), transparent 42%),
            color-mix(in srgb, var(--ios-blue) 7%, transparent);
        animation: field-note-wash 140ms ease-out both;
    }

    @keyframes field-note-press {
        0% {
            transform: translateY(0) scale(1);
        }

        55% {
            transform: translateY(1px) scale(0.985);
        }

        100% {
            transform: translateY(0) scale(1);
        }
    }

    @keyframes field-note-wash {
        0% {
            opacity: 0;
        }

        38% {
            opacity: 1;
        }

        100% {
            opacity: 0.72;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .field-note-card,
        .field-note-card--opening,
        .field-note-card__wash {
            animation: none;
            will-change: auto;
        }

        .field-note-card__wash {
            opacity: 0;
        }
    }
</style>
