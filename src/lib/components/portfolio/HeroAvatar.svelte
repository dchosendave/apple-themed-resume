<script lang="ts">
    import { avatarCommand } from "$lib/stores/avatar-command.svelte";
    import type { RecruiterPrompt } from "$lib/types/recruiter-prompt";
    import RecruiterPromptBubble from "./RecruiterPrompt.svelte";

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
        <div
            class="relative z-[1] size-[68px] overflow-hidden rounded-full [background:var(--ios-chip-bg)] sm:size-[78px]"
        >
            <img
                src="/solo-picture.jpg"
                alt="Lowie Dave Dichoson"
                class={[
                    "block size-full object-cover object-[center_top] transition-[transform,filter] duration-300 motion-reduce:transform-none motion-reduce:transition-none",
                    commandModeActive && "scale-[1.03] brightness-[1.02] saturate-[1.1]",
                    searchModeActive && "scale-[1.05] contrast-[1.08]",
                ]}
            />

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 motion-reduce:transition-none",
                    commandModeActive
                        ? "opacity-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.06)_38%,rgba(10,132,255,0.24)_100%)]"
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
                        ? "animate-pulse [border-color:rgba(194,228,255,0.76)]"
                        : "[border-color:rgba(255,255,255,0.4)]",
                ]}
            ></div>

            <div
                aria-hidden="true"
                class={[
                    "pointer-events-none absolute inset-x-[18%] bottom-[12%] z-[2] rounded-full border px-2 py-1 text-center text-[0.45rem] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 motion-reduce:transition-none",
                    commandModeActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    searchModeActive
                        ? "border-[rgba(194,228,255,0.45)] bg-[rgba(10,132,255,0.42)]"
                        : "border-[rgba(255,255,255,0.2)] bg-[rgba(10,132,255,0.22)]",
                ]}
            >
                {searchModeActive ? "Search" : "Cmd"}
            </div>
        </div>

        <div
            aria-hidden="true"
            class={[
                "pointer-events-none absolute inset-[-4px] rounded-full border-2 transition-all duration-300 motion-reduce:transition-none",
                commandModeActive
                    ? "opacity-90 shadow-[0_0_22px_rgba(10,132,255,0.28)]"
                    : "opacity-30",
                searchModeActive
                    ? "border-[rgba(157,214,255,0.88)]"
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
                    ? "border-[rgba(194,228,255,0.32)] bg-[rgba(10,132,255,0.78)] text-white"
                    : "border-[rgba(10,132,255,0.22)] bg-[rgba(255,255,255,0.76)] [color:var(--ios-blue)] dark:bg-[rgba(7,17,34,0.78)]",
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
