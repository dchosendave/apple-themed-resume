<script lang="ts">
    import type { RecruiterPrompt as RecruiterPromptType } from "$lib/types/recruiter-prompt";

    let {
        prompt,
        visible,
    }: {
        prompt: RecruiterPromptType | null;
        visible: boolean;
    } = $props();

    let label = $derived(
        prompt === "email"
            ? "Email"
            : prompt === "linkedin"
                ? "LinkedIn"
                : prompt === "github"
                    ? "GitHub"
                    : prompt
                        ? "Lowie"
                        : ""
    );

    let message = $derived(
        prompt === "email"
            ? "Email works best for roles, systems questions, or a quick first conversation."
            : prompt === "linkedin"
                ? "LinkedIn has the longer work trail if you want more context before reaching out."
                : prompt === "github"
                    ? "Public builds live here if you want to inspect how I think in code."
                    : prompt === "visit-morning"
                        ? "Coffee first?"
                        : prompt === "visit-afternoon"
                            ? "Good timing."
                            : prompt === "visit-evening"
                                ? "Late too? Same."
                                : prompt === "visit-late"
                                    ? "Quiet hours, huh?"
                                    : ""
    );
</script>

<div
    aria-hidden={!visible}
    class={[
        "pointer-events-none absolute left-1/2 top-full z-[4] mt-3 w-[min(17rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[22px] border px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.12)] backdrop-blur-[22px] transition-[opacity,transform] duration-200 motion-reduce:transition-none [background:color-mix(in_srgb,var(--ios-glass)_96%,transparent)] [border-color:var(--ios-glass-border)] sm:left-full sm:top-1/2 sm:mt-0 sm:ml-4 sm:w-64 sm:-translate-x-0 sm:-translate-y-1/2",
        visible ? "translate-y-0 opacity-100 sm:translate-y-0" : "translate-y-1 opacity-0 sm:translate-y-1",
    ]}
>
    <span
        aria-hidden="true"
        class="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border [background:color-mix(in_srgb,var(--ios-glass)_96%,transparent)] [border-color:var(--ios-glass-border)] sm:left-0 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
    ></span>

    <p class="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] [color:var(--ios-blue)]">
        {label}
    </p>
    <p class="text-[0.78rem] leading-[1.5] [color:var(--ios-text-primary)]">
        {message}
    </p>
</div>
