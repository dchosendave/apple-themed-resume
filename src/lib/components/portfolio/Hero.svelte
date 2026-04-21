<script lang="ts">
    import {
        personalInfo,
        professionalFocus,
    } from "$lib/data/personal-information";
    import { avatarCommand } from "$lib/stores/avatar-command.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import { reveal } from "$lib/actions/reveal";

    type RecruiterPrompt = "email" | "linkedin" | "github";

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;
    let avatarMode = $derived(avatarCommand.mode);
    let commandModeActive = $derived(avatarMode !== "idle");
    let searchModeActive = $derived(avatarMode === "searching");
    let recruiterPrompt = $state<RecruiterPrompt | null>(null);
    let avatarAriaLabel = $derived(
        searchModeActive
            ? "Profile photo, search mode active"
            : commandModeActive
                ? "Profile photo, command mode active"
                : "Profile photo"
    );
    let recruiterPromptVisible = $derived(
        recruiterPrompt !== null && !commandModeActive
    );
    let recruiterPromptLabel = $derived(
        recruiterPrompt === "email"
            ? "Email"
            : recruiterPrompt === "linkedin"
                ? "LinkedIn"
                : recruiterPrompt === "github"
                    ? "GitHub"
                    : ""
    );
    let recruiterPromptMessage = $derived(
        recruiterPrompt === "email"
            ? "Happy to chat about roles, systems, or product ideas. Email works best."
            : recruiterPrompt === "linkedin"
                ? "Want the full story behind my work? Let's connect on LinkedIn."
                : recruiterPrompt === "github"
                    ? "A few public builds live here if you want to see how I think in code."
                    : ""
    );

    const emailHref = `mailto:${personalInfo.email}`;
    const iconChipClass =
        "inline-flex size-[34px] items-center justify-center rounded-full border [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)] no-underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";
    const interactiveIconChipClass = `${iconChipClass} cursor-pointer hover:scale-[1.08] hover:[background:var(--ios-stat-bg)] hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)]`;
    const copiedIconChipClass = `${iconChipClass} cursor-pointer border-[#30d158] bg-[rgba(48,209,88,0.12)] text-[#30d158]`;
    const plainIconChipClass = `${iconChipClass} cursor-default`;
    const primaryCtaClass =
        "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full bg-[var(--ios-blue)] px-4 py-2 text-[0.8rem] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[var(--ios-blue-hover)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] dark:hover:shadow-[0_4px_16px_rgba(10,132,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";
    const secondaryCtaClass =
        "inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-[0.8rem] font-medium [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-primary)] no-underline transition-all duration-200 hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";

    function copyEmail(e: MouseEvent) {
        if (e.button !== 0) return;
        e.preventDefault();
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            emailCopied = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => (emailCopied = false), 2000);
        });
    }

    function showRecruiterPrompt(prompt: RecruiterPrompt) {
        recruiterPrompt = prompt;
    }

    function clearRecruiterPrompt(prompt: RecruiterPrompt) {
        if (recruiterPrompt === prompt) {
            recruiterPrompt = null;
        }
    }
</script>

<div
    class="flex flex-col gap-4 overflow-hidden rounded-[24px] border px-[18px] py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[24px] transition-[background,border-color,box-shadow,transform] duration-300 [background:var(--ios-glass)] [border-color:var(--ios-glass-border)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:gap-[18px] sm:px-6 sm:py-[22px]"
    use:reveal
>
    <div class="flex flex-wrap items-center justify-between gap-3">
        <span
            class="inline-flex items-center gap-[7px] rounded-full border px-[13px] py-[5px] text-[0.72rem] font-semibold tracking-[0.01em] [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
        >
            <span
                class="size-1.5 shrink-0 animate-pulse rounded-full bg-[#30d158] shadow-[0_0_6px_#30d15880]"
            ></span>
            Open to opportunities
        </span>

        <ThemeToggle />
    </div>

    <div
        class="flex flex-col items-start gap-[14px] sm:flex-row sm:items-center sm:gap-[22px]"
    >
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
                            commandModeActive &&
                                "scale-[1.03] brightness-[1.02] saturate-[1.1]",
                            searchModeActive &&
                                "scale-[1.05] contrast-[1.08]",
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
                            commandModeActive
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0",
                            searchModeActive
                                ? "animate-pulse [border-color:rgba(194,228,255,0.76)]"
                                : "[border-color:rgba(255,255,255,0.4)]",
                        ]}
                    ></div>

                    <div
                        aria-hidden="true"
                        class={[
                            "pointer-events-none absolute inset-x-[18%] bottom-[12%] z-[2] rounded-full border px-2 py-1 text-center text-[0.45rem] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 motion-reduce:transition-none",
                            commandModeActive
                                ? "translate-y-0 opacity-100"
                                : "translate-y-2 opacity-0",
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
                            searchModeActive
                                ? "animate-pulse bg-white"
                                : "bg-[var(--ios-blue)]",
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
            <div
                aria-hidden={!recruiterPromptVisible}
                class={[
                    "pointer-events-none absolute left-1/2 top-full z-[4] mt-3 w-[min(17rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[22px] border px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur-[22px] transition-[opacity,transform] duration-200 motion-reduce:transition-none [background:color-mix(in_srgb,var(--ios-glass)_96%,transparent)] [border-color:var(--ios-glass-border)] sm:left-full sm:top-1/2 sm:mt-0 sm:ml-4 sm:w-64 sm:-translate-x-0 sm:-translate-y-1/2",
                    recruiterPromptVisible
                        ? "translate-y-0 opacity-100 sm:translate-y-0"
                        : "translate-y-1 opacity-0 sm:translate-y-1",
                ]}
            >
                <span
                    aria-hidden="true"
                    class="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border [background:color-mix(in_srgb,var(--ios-glass)_96%,transparent)] [border-color:var(--ios-glass-border)] sm:left-0 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                ></span>

                <p
                    class="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] [color:var(--ios-blue)]"
                >
                    {recruiterPromptLabel}
                </p>
                <p class="text-[0.78rem] leading-[1.5] [color:var(--ios-text-primary)]">
                    {recruiterPromptMessage}
                </p>
            </div>
        </div>

        <div class="min-w-0 flex-1 max-w-[56ch]">
            <div class="mb-2 flex flex-wrap items-baseline gap-3">
                <h1
                    class="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] [color:var(--ios-text-primary)]"
                >
                    {personalInfo.name}
                </h1>
                <span
                    class="whitespace-nowrap rounded-full border px-[10px] py-1 text-[0.72rem] font-semibold [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]"
                >
                    {personalInfo.title}
                </span>
            </div>

            <p
                class="max-w-[58ch] text-[0.84rem] leading-[1.6] [color:var(--ios-text-secondary)] sm:text-[0.9rem] sm:leading-[1.65]"
            >
                {professionalFocus}
            </p>
        </div>
    </div>

    <div
        class="flex flex-col items-start gap-3 border-t pt-4 [border-color:var(--ios-separator)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
        <div class="flex flex-wrap gap-2">
            <a
                href={emailHref}
                class={emailCopied
                    ? copiedIconChipClass
                    : interactiveIconChipClass}
                onclick={copyEmail}
                onpointerenter={() => showRecruiterPrompt("email")}
                onpointerleave={() => clearRecruiterPrompt("email")}
                onfocus={() => showRecruiterPrompt("email")}
                onblur={() => clearRecruiterPrompt("email")}
                title={emailCopied ? "Copied!" : "Copy email"}
                aria-label={emailCopied ? "Email copied" : "Copy email address"}
            >
                {#if emailCopied}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                {:else}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                {/if}
            </a>

            <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class={interactiveIconChipClass}
                onpointerenter={() => showRecruiterPrompt("linkedin")}
                onpointerleave={() => clearRecruiterPrompt("linkedin")}
                onfocus={() => showRecruiterPrompt("linkedin")}
                onblur={() => clearRecruiterPrompt("linkedin")}
                title="LinkedIn"
                aria-label="Open LinkedIn profile"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            </a>

            <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                class={interactiveIconChipClass}
                onpointerenter={() => showRecruiterPrompt("github")}
                onpointerleave={() => clearRecruiterPrompt("github")}
                onfocus={() => showRecruiterPrompt("github")}
                onblur={() => clearRecruiterPrompt("github")}
                title="GitHub"
                aria-label="Open GitHub profile"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                </svg>
            </a>

            <span class={plainIconChipClass} title={personalInfo.location}>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                <span class="sr-only">{personalInfo.location}</span>
            </span>
        </div>

        <div class="flex flex-wrap gap-2">
            <a href={personalInfo.resumePdf} download class={primaryCtaClass}>
                <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
            </a>

            <a href={emailHref} class={secondaryCtaClass}>Get in Touch</a>
        </div>
    </div>
</div>
