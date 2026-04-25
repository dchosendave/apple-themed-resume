<script lang="ts">
    import CheckIcon from "@lucide/svelte/icons/check";
    import MailIcon from "@lucide/svelte/icons/mail";
    import { personalInfo } from "$lib/data/personal-information";
    import ContactIconLink from "$lib/components/portfolio/shared/ContactIconLink.svelte";
    import GithubMark from "$lib/components/portfolio/shared/GithubMark.svelte";
    import LinkedinMark from "$lib/components/portfolio/shared/LinkedinMark.svelte";

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;

    const emailHref = `mailto:${personalInfo.email}`;

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

<footer class="col-span-full py-[14px]">
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
        <span class="text-[0.75rem] font-semibold [color:var(--ios-text-primary)]">
            {personalInfo.name}
        </span>

        <span class="text-[0.75rem] opacity-50 [color:var(--ios-text-secondary)]">
            &middot;
        </span>

        <div class="flex items-center gap-1.5">
            <ContactIconLink
                href={emailHref}
                size="sm"
                variant={emailCopied ? "copied" : "default"}
                onclick={copyEmail}
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
                size="sm"
                external
                title="LinkedIn"
                label="Open LinkedIn profile"
            >
                <LinkedinMark class="size-3.5" />
            </ContactIconLink>

            <ContactIconLink
                href={personalInfo.github}
                size="sm"
                external
                title="GitHub"
                label="Open GitHub profile"
            >
                <GithubMark class="size-3.5" />
            </ContactIconLink>
        </div>

        <span class="text-[0.75rem] opacity-50 [color:var(--ios-text-secondary)]">
            &middot;
        </span>

        <span class="text-[0.68rem] opacity-70 [color:var(--ios-text-secondary)]">
            &copy; {new Date().getFullYear()} Built with Svelte
        </span>
    </div>
</footer>
