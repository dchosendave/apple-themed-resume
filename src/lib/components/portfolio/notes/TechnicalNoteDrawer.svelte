<script lang="ts">
    import XIcon from "@lucide/svelte/icons/x";
    import type { TechnicalNote } from "$lib/types/technical-note";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";

    let { note, onclose }: {
        note: TechnicalNote | null;
        onclose: () => void;
    } = $props();

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen) onclose();
    }
</script>

{#if note}
    <Dialog.Root open={true} onOpenChange={handleOpenChange}>
        <Dialog.Content
            showCloseButton={false}
            class="apple-panel-surface max-h-[88dvh] w-[min(44rem,calc(100vw-1.5rem))] max-w-none! gap-0 overflow-hidden rounded-[24px]! p-0 sm:max-w-none!"
        >
            <div class="flex max-h-[88dvh] flex-col">
                <Dialog.Header class="flex-row items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-7">
                    <div class="min-w-0 space-y-3">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="apple-badge">{note.category}</span>
                            <span class="apple-chip text-[0.68rem]">{note.readTime}</span>
                        </div>

                        <Dialog.Title class="text-xl font-semibold leading-tight tracking-[-0.02em] [color:var(--ios-text-primary)]">
                            {note.title}
                        </Dialog.Title>

                        <Dialog.Description class="max-w-prose text-sm leading-6 [color:var(--ios-text-secondary)]">
                            {note.summary}
                        </Dialog.Description>
                    </div>

                    <Button variant="ghost" size="icon-sm" class="apple-icon-button size-9 rounded-full" onclick={onclose} aria-label="Close technical note">
                        <XIcon class="size-4" />
                    </Button>
                </Dialog.Header>

                <Separator class="[background-color:var(--ios-separator)]" />

                <div class="flex-1 overflow-y-auto px-6 py-5 sm:px-7">
                    <div class="grid gap-4">
                        {#each note.sections as section (section.title)}
                            <section class="apple-card-inner space-y-2 p-4">
                                <p class="apple-section-title mb-0 text-[0.74rem]">
                                    {section.title}
                                </p>
                                <p class="text-[0.84rem] leading-6 [color:var(--ios-text-primary)]">
                                    {section.body}
                                </p>
                            </section>
                        {/each}
                    </div>

                    <div class="mt-5 flex flex-wrap gap-2">
                        {#each note.tags as tag (tag)}
                            <span class="apple-badge text-[0.64rem]">{tag}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </Dialog.Content>
    </Dialog.Root>
{/if}
