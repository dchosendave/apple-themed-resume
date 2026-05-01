<script lang="ts">
    import { onMount } from "svelte";
    import { personalInfo, professionalFocus } from "$lib/data/personal-information";
    import type {
        ContactPrompt,
        RecruiterPrompt,
        VisitPrompt,
    } from "$lib/types/recruiter-prompt";
    import HeroAvatar from "./HeroAvatar.svelte";
    import HeroContactActions from "./HeroContactActions.svelte";
    import HeroIdentity from "./HeroIdentity.svelte";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import ThemeToggle from "$lib/components/portfolio/shared/ThemeToggle.svelte";

    let recruiterPrompt = $state<RecruiterPrompt | null>(null);
    let visitRevealTimer: ReturnType<typeof setTimeout> | undefined;
    let visitHideTimer: ReturnType<typeof setTimeout> | undefined;
    const heroLocation = personalInfo.location
        .replace(" City", "")
        .replace(", Philippines", ", PH");

    function getVisitPrompt(hour: number): VisitPrompt {
        if (hour >= 5 && hour < 12) return "visit-morning";
        if (hour >= 12 && hour < 17) return "visit-afternoon";
        if (hour >= 17 && hour < 22) return "visit-evening";
        return "visit-late";
    }

    function isVisitPrompt(prompt: RecruiterPrompt | null) {
        return prompt?.startsWith("visit-") === true;
    }

    function showVisitGreeting() {
        if (recruiterPrompt !== null) return;

        recruiterPrompt = getVisitPrompt(new Date().getHours());

        visitHideTimer = setTimeout(() => {
            if (isVisitPrompt(recruiterPrompt)) {
                recruiterPrompt = null;
            }
        }, 5200);
    }

    function showRecruiterPrompt(prompt: ContactPrompt) {
        if (visitHideTimer) {
            clearTimeout(visitHideTimer);
        }

        recruiterPrompt = prompt;
    }

    function clearRecruiterPrompt(prompt: ContactPrompt) {
        if (recruiterPrompt === prompt) {
            recruiterPrompt = null;
        }
    }

    onMount(() => {
        visitRevealTimer = setTimeout(showVisitGreeting, 1100);

        return () => {
            if (visitRevealTimer) clearTimeout(visitRevealTimer);
            if (visitHideTimer) clearTimeout(visitHideTimer);
        };
    });
</script>

<PortfolioCard
    class="flex flex-col gap-5 overflow-hidden px-[18px] py-5 sm:gap-6 sm:px-6 sm:py-[22px]"
>
    <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
            <span class="apple-chip px-[13px] py-[5px] text-[0.7rem]">
                <span
                    class="size-1.5 shrink-0 rounded-full bg-[var(--ios-blue)] shadow-[0_0_8px_color-mix(in_srgb,var(--ios-blue)_55%,transparent)]"
                ></span>
                Open to opportunities
            </span>

            <span class="lowie-warm-chip px-2.5 py-[5px]" title={personalInfo.location}>
                {heroLocation}
            </span>
        </div>

        <ThemeToggle />
    </div>

    <div
        class="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-6"
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
