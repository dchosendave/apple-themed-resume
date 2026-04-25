<script lang="ts">
    import { onDestroy } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import { avatarCommand } from "$lib/stores/avatar-command.svelte";
    import {
        createCommandActionGroups,
        type CommandAction,
    } from "$lib/components/portfolio/command-center/commandActions";

    let open = $state(false);
    let search = $state("");

    $effect(() => {
        avatarCommand.syncFromPalette(open, search);
    });

    onDestroy(() => {
        avatarCommand.reset();
    });

    const dialogSurfaceClass =
        "top-1/2! w-[min(36rem,calc(100vw-1.5rem))] max-w-none -translate-y-1/2! overflow-hidden rounded-[1.5rem]! border p-0 ring-0 [background:color-mix(in_srgb,var(--ios-glass)_92%,transparent)] [border-color:var(--ios-glass-border)] shadow-[0_20px_60px_rgba(18,31,20,0.22)] backdrop-blur-[28px] dark:shadow-[0_24px_64px_rgba(0,0,0,0.45)]";
    const sectionTitleClass =
        "text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]";
    const hotkeyChipClass =
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[0.68rem] font-semibold tracking-[0.01em] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]";
    const commandGroupClass =
        "px-1 py-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-[0.68rem] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.08em] **:[[cmdk-group-heading]]:[color:var(--ios-text-secondary)]";
    const commandItemClass =
        "rounded-[18px] px-3 py-3 text-[0.84rem] transition-[background,color,transform] duration-150 data-[selected=true]:[background:var(--ios-blue)] data-[selected=true]:text-white data-[selected=true]:[&_svg]:text-white dark:data-[selected=true]:text-[#071008] dark:data-[selected=true]:[&_svg]:text-[#071008]";
    const commandCategoryClass =
        "inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-blue)] group-data-[selected=true]/command-item:bg-[rgba(255,255,255,0.18)] group-data-[selected=true]/command-item:[border-color:rgba(255,255,255,0.22)] group-data-[selected=true]/command-item:text-white";
    const footerHintClass =
        "text-[0.68rem] [color:var(--ios-text-tertiary)]";

    const actionGroups = createCommandActionGroups();

    function execute(action: CommandAction) {
        handleOpenChange(false);
        action.run();
    }

    function handleOpenChange(nextOpen: boolean) {
        open = nextOpen;

        if (!nextOpen) {
            search = "";
        }
    }

    function handleWindowKeydown(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            handleOpenChange(!open);
        }
    }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<Command.Dialog
    {open}
    onOpenChange={handleOpenChange}
    title="Command Center"
    description="Search sections, links, and resume actions."
    showCloseButton={false}
    label="Command Center"
    loop
    class={dialogSurfaceClass}
>
    <div
        class="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 [border-color:var(--ios-separator)]"
    >
        <div class="min-w-0">
            <p class={[sectionTitleClass, "mb-1"]}>Command Center</p>
            <p class="text-sm leading-5 [color:var(--ios-text-secondary)]">
                Spotlight-style shortcuts for sections, case files, and contact actions.
            </p>
        </div>
        <kbd class={hotkeyChipClass}>Cmd/Ctrl K</kbd>
    </div>

    <Command.Input
        bind:value={search}
        placeholder="Search LowieOS..."
        class="px-1 pb-1 text-[0.85rem]"
    />

    <Command.List class="max-h-88 px-2 pb-2">
        <Command.Empty class="px-4 py-10 text-center text-sm [color:var(--ios-text-secondary)]">
            No quick action matches that search.
        </Command.Empty>

        {#each actionGroups as group, groupIndex (group.label)}
            <Command.Group heading={group.label} class={commandGroupClass}>
                {#each group.actions as action (action.value)}
                    <Command.Item
                        value={action.value}
                        keywords={action.keywords}
                        onSelect={() => execute(action)}
                        class={commandItemClass}
                    >
                        <span
                            class={commandCategoryClass}
                        >
                            {action.category === "Navigate" ? "Go" : "Act"}
                        </span>

                        <div class="min-w-0 grow">
                            <div class="truncate text-[0.84rem] font-medium text-inherit">
                                {action.label}
                            </div>
                        </div>

                        <Command.Shortcut
                            class="text-[0.62rem] group-data-[selected=true]/command-item:text-[rgba(255,255,255,0.72)]"
                        >
                            {action.meta}
                        </Command.Shortcut>
                    </Command.Item>
                {/each}
            </Command.Group>

            {#if groupIndex < actionGroups.length - 1}
                <Command.Separator class="mx-2 my-1 [background:var(--ios-separator)]" />
            {/if}
        {/each}
    </Command.List>

    <div
        class="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 border-t px-4 py-3 [border-color:var(--ios-separator)]"
    >
        <span class={footerHintClass}>Arrow keys to navigate</span>
        <span class={footerHintClass}>Enter to run</span>
        <span class={footerHintClass}>Esc to close</span>
    </div>
</Command.Dialog>
