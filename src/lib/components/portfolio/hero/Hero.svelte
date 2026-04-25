<script lang="ts">
    import { personalInfo, professionalFocus } from "$lib/data/personal-information";
    import type { RecruiterPrompt } from "$lib/types/recruiter-prompt";
    import HeroAvatar from "./HeroAvatar.svelte";
    import HeroContactActions from "./HeroContactActions.svelte";
    import HeroIdentity from "./HeroIdentity.svelte";
    import PortfolioCard from "../shared/PortfolioCard.svelte";
    import ThemeToggle from "../shared/ThemeToggle.svelte";

    let recruiterPrompt = $state<RecruiterPrompt | null>(null);

    function showRecruiterPrompt(prompt: RecruiterPrompt) {
        recruiterPrompt = prompt;
    }

    function clearRecruiterPrompt(prompt: RecruiterPrompt) {
        if (recruiterPrompt === prompt) {
            recruiterPrompt = null;
        }
    }
</script>

<PortfolioCard
    class="flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:gap-[18px] sm:px-6 sm:py-[22px]"
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
        <HeroAvatar prompt={recruiterPrompt} />
        <HeroIdentity
            name={personalInfo.name}
            title={personalInfo.title}
            focus={professionalFocus}
        />
    </div>

    <HeroContactActions
        showPrompt={showRecruiterPrompt}
        clearPrompt={clearRecruiterPrompt}
    />
</PortfolioCard>
