<script lang="ts">
    import { avatarCommand } from "$lib/stores/avatar-command.svelte";
    import { theme } from "$lib/stores/theme.svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import type { RecruiterPrompt } from "$lib/types/recruiter-prompt";
    import RecruiterPromptBubble from "$lib/components/portfolio/hero/RecruiterPrompt.svelte";

    let { prompt }: { prompt: RecruiterPrompt | null } = $props();

    let avatarMode = $derived(avatarCommand.mode);
    let commandModeActive = $derived(avatarMode !== "idle");
    let searchModeActive = $derived(avatarMode === "searching");
    let promptVisible = $derived(prompt !== null && !commandModeActive);
    let avatarAriaLabel = $derived(
        searchModeActive
            ? "Profile photo, search mode active"
            : commandModeActive
                ? "Profile photo, command mode active"
                : "Profile photo"
    );
</script>

<div class="relative shrink-0">
    <button
        class={[
            "relative rounded-full border-0 bg-transparent p-0 transition-[transform,filter] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]",
            commandModeActive && "scale-[1.03] -translate-y-0.5",
            searchModeActive && "scale-[1.05]",
        ]}
        aria-label={avatarAriaLabel}
        type="button"
    >
        <Avatar.Root
            size="lg"
            class="relative z-[1] size-24 overflow-hidden rounded-full [background:var(--ios-chip-bg)] shadow-[0_16px_36px_rgba(15,23,42,0.18)] data-[size=lg]:size-24 sm:size-32 sm:data-[size=lg]:size-32 dark:shadow-[0_18px_42px_rgba(0,0,0,0.38)]"
        >
            <Avatar.Fallback class="absolute inset-0 font-semibold tracking-[0.02em]">
                LD
            </Avatar.Fallback>

            <img
                src="/3d-image-light.png"
                alt=""
                aria-hidden="true"
                class={[
                    "absolute inset-0 block size-full object-cover object-[center_top] transition-[opacity,transform,filter] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
                    theme.isDark ? "opacity-0" : "opacity-100",
                    commandModeActive && "scale-[1.03] brightness-[1.02] saturate-[1.1]",
                    searchModeActive && "scale-[1.05] contrast-[1.08]",
                ]}
            />

            <img
                src="/3d-image-dark.png"
                alt=""
                aria-hidden="true"
                class={[
                    "absolute inset-0 block size-full object-cover object-[center_top] transition-[opacity,transform,filter] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
                    theme.isDark ? "opacity-100" : "opacity-0",
                    commandModeActive && "scale-[1.03] brightness-[1.02] saturate-[1.1]",
                    searchModeActive && "scale-[1.05] contrast-[1.08]",
                ]}
            />

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 motion-reduce:transition-none",
                    commandModeActive
                        ? "opacity-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.06)_38%,rgba(183,228,199,0.24)_100%)]"
                        : "opacity-0",
                ]}
            ></div>

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-0 rounded-full mix-blend-screen transition-opacity duration-300 motion-reduce:transition-none",
                    commandModeActive ? "opacity-100" : "opacity-0",
                    searchModeActive
                        ? "bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_5px)]"
                        : "bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,transparent_52%)]",
                ]}
            ></div>

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-[14%] rounded-full border transition-all duration-300 motion-reduce:transition-none",
                    commandModeActive ? "scale-100 opacity-100" : "scale-95 opacity-0",
                    searchModeActive
                        ? "animate-pulse [border-color:rgba(183,228,199,0.76)]"
                        : "[border-color:rgba(255,255,255,0.4)]",
                ]}
            ></div>

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-x-[20%] bottom-[10%] z-[2] rounded-full border px-2 py-1 text-center text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 motion-reduce:transition-none sm:text-[0.58rem]",
                    commandModeActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    searchModeActive
                        ? "border-[rgba(183,228,199,0.45)] bg-[rgba(47,70,53,0.52)]"
                        : "border-[rgba(255,255,255,0.2)] bg-[rgba(47,70,53,0.32)]",
                ]}
            >
                {searchModeActive ? "Search" : "Cmd"}
            </div>
        </Avatar.Root>

        <div
            aria-hidden="true"
            class={[
                "pointer-events-none absolute inset-[-4px] rounded-full border-2 transition-all duration-300 motion-reduce:transition-none",
                commandModeActive
                    ? "opacity-90 shadow-[0_0_22px_rgba(183,228,199,0.28)]"
                    : "opacity-30",
                searchModeActive
                    ? "border-[rgba(183,228,199,0.88)]"
                    : "border-[var(--ios-blue)]",
            ]}
        ></div>

        <span
            aria-hidden="true"
            class={[
                "pointer-events-none absolute -right-1 -top-1 z-[3] inline-flex items-center gap-1 rounded-full border px-2 py-[5px] text-[0.5rem] font-semibold uppercase tracking-[0.12em] shadow-[0_10px_24px_rgba(15,23,42,0.16)] backdrop-blur-md transition-all duration-300 motion-reduce:transition-none",
                commandModeActive
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-1 scale-90 opacity-0",
                searchModeActive
                    ? "border-[rgba(183,228,199,0.32)] bg-[rgba(47,70,53,0.88)] text-white"
                    : "border-[rgba(183,228,199,0.22)] bg-[rgba(255,255,255,0.76)] [color:var(--ios-blue)] dark:bg-[rgba(11,19,13,0.78)]",
            ]}
        >
            <span
                class={[
                    "size-1.5 rounded-full",
                    searchModeActive ? "animate-pulse bg-white" : "bg-[var(--ios-blue)]",
                ]}
            ></span>
            {searchModeActive ? "Scan" : "Cmd"}
        </span>
    </button>

    <span class="sr-only" aria-live="polite">
        {searchModeActive
            ? "Command palette search is active."
            : commandModeActive
                ? "Command palette is open."
                : "Command palette is closed."}
    </span>

    <RecruiterPromptBubble {prompt} visible={promptVisible} />
</div>
