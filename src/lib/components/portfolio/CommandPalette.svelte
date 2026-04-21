<script lang="ts">
    import { onDestroy } from "svelte";
    import { personalInfo } from "$lib/data/personal-information";
    import * as Command from "$lib/components/ui/command/index.js";
    import { avatarCommand } from "$lib/stores/avatar-command.svelte";

    type Action = {
        value: string;
        label: string;
        category: string;
        meta: string;
        keywords: string[];
        run: () => void;
    };

    type ActionGroup = {
        label: string;
        actions: Action[];
    };

    let open = $state(false);
    let search = $state("");

    $effect(() => {
        avatarCommand.syncFromPalette(open, search);
    });

    onDestroy(() => {
        avatarCommand.reset();
    });

    const dialogSurfaceClass =
        "top-1/2! w-[min(36rem,calc(100vw-1.5rem))] max-w-none -translate-y-1/2! overflow-hidden rounded-[1.5rem]! border p-0 ring-0 [background:color-mix(in_srgb,var(--ios-glass)_92%,transparent)] [border-color:var(--ios-glass-border)] shadow-[0_20px_60px_rgba(15,23,42,0.2)] backdrop-blur-[28px] dark:shadow-[0_24px_64px_rgba(0,0,0,0.4)]";
    const sectionTitleClass =
        "text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]";
    const hotkeyChipClass =
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[0.68rem] font-semibold tracking-[0.01em] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]";
    const commandGroupClass =
        "px-1 py-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-[0.68rem] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.08em] **:[[cmdk-group-heading]]:[color:var(--ios-text-secondary)]";
    const commandItemClass =
        "rounded-[18px] px-3 py-3 text-[0.84rem] transition-[background,color,transform] duration-150 data-[selected=true]:[background:var(--ios-blue)] data-[selected=true]:text-white data-[selected=true]:[&_svg]:text-white";
    const commandCategoryClass =
        "inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.08em] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-blue)] group-data-[selected=true]/command-item:bg-[rgba(255,255,255,0.18)] group-data-[selected=true]/command-item:[border-color:rgba(255,255,255,0.22)] group-data-[selected=true]/command-item:text-white";
    const footerHintClass =
        "text-[0.68rem] [color:var(--ios-text-tertiary)]";

    function scrollToTile(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(personalInfo.email);
        } catch {
            window.location.href = `mailto:${personalInfo.email}`;
        }
    }

    function downloadResume() {
        const link = document.createElement("a");
        link.href = personalInfo.resumePdf;
        link.download = "";
        link.click();
    }

    const actionGroups: ActionGroup[] = [
        {
            label: "Navigate",
            actions: [
                {
                    value: "hero",
                    label: "Jump to hero section",
                    category: "Navigate",
                    meta: "Hero",
                    keywords: ["intro", "top", "hero", "profile"],
                    run: () => scrollToTile("tile-hero")
                },
                {
                    value: "experience",
                    label: "Jump to work experience",
                    category: "Navigate",
                    meta: "Work",
                    keywords: ["experience", "work", "career", "resume"],
                    run: () => scrollToTile("tile-experience")
                },
                {
                    value: "skills",
                    label: "Jump to skills section",
                    category: "Navigate",
                    meta: "Skills",
                    keywords: ["skills", "stack", "tools", "tech"],
                    run: () => scrollToTile("tile-skills")
                },
                {
                    value: "projects",
                    label: "Jump to featured projects",
                    category: "Navigate",
                    meta: "Projects",
                    keywords: ["projects", "portfolio", "case study"],
                    run: () => scrollToTile("tile-projects")
                },
                {
                    value: "education",
                    label: "Jump to education",
                    category: "Navigate",
                    meta: "Education",
                    keywords: ["education", "certifications", "school"],
                    run: () => scrollToTile("tile-education")
                }
            ]
        },
        {
            label: "Contact",
            actions: [
                {
                    value: "copy-email",
                    label: "Copy email address",
                    category: "Contact",
                    meta: "Copy",
                    keywords: ["email", "mail", "copy", "contact"],
                    run: copyEmail
                },
                {
                    value: "download-resume",
                    label: "Download resume PDF",
                    category: "Contact",
                    meta: "PDF",
                    keywords: ["resume", "cv", "download", "pdf"],
                    run: downloadResume
                },
                {
                    value: "open-linkedin",
                    label: "Open LinkedIn profile",
                    category: "Contact",
                    meta: "Open",
                    keywords: ["linkedin", "profile", "social"],
                    run: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer")
                },
                {
                    value: "open-github",
                    label: "Open GitHub profile",
                    category: "Contact",
                    meta: "Open",
                    keywords: ["github", "code", "repositories"],
                    run: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer")
                }
            ]
        }
    ];

    function execute(action: Action) {
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
    title="Quick actions"
    description="Search sections, links, and resume actions."
    showCloseButton={false}
    label="Quick actions"
    loop
    class={dialogSurfaceClass}
>
    <div
        class="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 [border-color:var(--ios-separator)]"
    >
        <div class="min-w-0">
            <p class={[sectionTitleClass, "mb-1"]}>Quick Actions</p>
            <p class="text-sm leading-5 [color:var(--ios-text-secondary)]">
                Jump between sections, copy contact details, or open external links.
            </p>
        </div>
        <kbd class={hotkeyChipClass}>Cmd/Ctrl K</kbd>
    </div>

    <Command.Input
        bind:value={search}
        placeholder="Search sections, actions, and links..."
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
                            {action.category.slice(0, 2)}
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
