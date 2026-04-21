<script lang="ts">
    import { personalInfo } from "$lib/data/personal-information";
    import * as Command from "$lib/components/ui/command/index.js";

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
    class="apple-panel-surface top-1/2! w-[min(36rem,calc(100vw-1.5rem))] max-w-none -translate-y-1/2! rounded-3xl! border p-0 ring-0"
>
    <div
        class="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5 border-(--ios-separator)"
    >
        <div class="min-w-0">
            <p class="apple-section-title mb-1">Quick Actions</p>
            <p class="text-sm leading-5 text-(--ios-text-secondary)">
                Jump between sections, copy contact details, or open external links.
            </p>
        </div>
        <kbd class="apple-chip shrink-0 text-[0.68rem]">Cmd/Ctrl K</kbd>
    </div>

    <Command.Input
        bind:value={search}
        placeholder="Search sections, actions, and links..."
        class="px-1 pb-1 text-[0.85rem]"
    />

    <Command.List class="max-h-88 px-2 pb-2">
        <Command.Empty class="px-4 py-10 text-center text-sm text-(--ios-text-secondary)">
            No quick action matches that search.
        </Command.Empty>

        {#each actionGroups as group, groupIndex (group.label)}
            <Command.Group heading={group.label} class="px-1 py-1">
                {#each group.actions as action (action.value)}
                    <Command.Item
                        value={action.value}
                        keywords={action.keywords}
                        onSelect={() => execute(action)}
                        class="apple-command-item rounded-[18px] px-3 py-3"
                    >
                        <span
                            class="apple-command-icon apple-chip h-8 min-w-8 justify-center px-2.5 text-[0.64rem] uppercase text-(--ios-blue)"
                        >
                            {action.category.slice(0, 2)}
                        </span>

                        <div class="min-w-0 grow">
                            <div class="truncate text-[0.84rem] font-medium text-inherit">
                                {action.label}
                            </div>
                        </div>

                        <Command.Shortcut class="text-[0.62rem]">{action.meta}</Command.Shortcut>
                    </Command.Item>
                {/each}
            </Command.Group>

            {#if groupIndex < actionGroups.length - 1}
                <Command.Separator class="mx-2 my-1 bg-(--ios-separator)" />
            {/if}
        {/each}
    </Command.List>

    <div
        class="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 border-t px-4 py-3 text-[0.68rem] border-(--ios-separator) text-(--ios-text-tertiary)"
    >
        <span>Arrow keys to navigate</span>
        <span>Enter to run</span>
        <span>Esc to close</span>
    </div>
</Command.Dialog>
