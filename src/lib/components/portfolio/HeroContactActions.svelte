<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import DownloadIcon from "@lucide/svelte/icons/download";
    import MailIcon from "@lucide/svelte/icons/mail";
    import MapPinIcon from "@lucide/svelte/icons/map-pin";
    import { personalInfo } from "$lib/data/personal-information";
    import type { RecruiterPrompt } from "$lib/types/recruiter-prompt";
    import ContactIconLink from "./ContactIconLink.svelte";
    import GithubMark from "./GithubMark.svelte";
    import LinkedinMark from "./LinkedinMark.svelte";

    let {
        showPrompt,
        clearPrompt,
    }: {
        showPrompt: (prompt: RecruiterPrompt) => void;
        clearPrompt: (prompt: RecruiterPrompt) => void;
    } = $props();

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;

    const emailHref = `mailto:${personalInfo.email}`;
    const primaryCtaClass =
        "inline-flex items-center gap-[5px] whitespace-nowrap rounded-full bg-[var(--ios-blue)] px-4 py-2 text-[0.8rem] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[var(--ios-blue-hover)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] dark:hover:shadow-[0_4px_16px_rgba(10,132,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";
    const secondaryCtaClass =
        "inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-[0.8rem] font-medium [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-primary)] no-underline transition-all duration-200 hover:[border-color:var(--ios-blue)] hover:[color:var(--ios-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ios-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ios-bg)]";
    const locationChipClass =
        "inline-flex size-[34px] cursor-default items-center justify-center rounded-full border [background:var(--ios-chip-bg)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]";

    function copyEmail(e: MouseEvent) {
        if (e.button !== 0) return;
        e.preventDefault();
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            emailCopied = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => (emailCopied = false), 2000);
        });
    }
</script>

<div
    class="flex flex-col items-start gap-3 border-t pt-4 [border-color:var(--ios-separator)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
>
    <div class="flex flex-wrap gap-2">
        <ContactIconLink
            href={emailHref}
            variant={emailCopied ? "copied" : "default"}
            onclick={copyEmail}
            onpointerenter={() => showPrompt("email")}
            onpointerleave={() => clearPrompt("email")}
            onfocus={() => showPrompt("email")}
            onblur={() => clearPrompt("email")}
            title={emailCopied ? "Copied!" : "Copy email"}
            label={emailCopied ? "Email copied" : "Copy email address"}
        >
            {#if emailCopied}
                <CheckIcon class="size-3.5" />
            {:else}
                <MailIcon class="size-3.5" />
            {/if}
        </ContactIconLink>

        <ContactIconLink
            href={personalInfo.linkedin}
            external
            onpointerenter={() => showPrompt("linkedin")}
            onpointerleave={() => clearPrompt("linkedin")}
            onfocus={() => showPrompt("linkedin")}
            onblur={() => clearPrompt("linkedin")}
            title="LinkedIn"
            label="Open LinkedIn profile"
        >
            <LinkedinMark class="size-3.5" />
        </ContactIconLink>

        <ContactIconLink
            href={personalInfo.github}
            external
            onpointerenter={() => showPrompt("github")}
            onpointerleave={() => clearPrompt("github")}
            onfocus={() => showPrompt("github")}
            onblur={() => clearPrompt("github")}
            title="GitHub"
            label="Open GitHub profile"
        >
            <GithubMark class="size-3.5" />
        </ContactIconLink>

        <span class={locationChipClass} title={personalInfo.location}>
            <MapPinIcon class="size-3.5" />
            <span class="sr-only">{personalInfo.location}</span>
        </span>
    </div>

    <div class="flex flex-wrap gap-2">
        <a href={personalInfo.resumePdf} download class={primaryCtaClass}>
            <DownloadIcon class="size-3.5" />
            Resume
        </a>

        <a href={emailHref} class={secondaryCtaClass}>Get in Touch</a>
    </div>
</div>
