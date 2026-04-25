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

    const visitGreetingKey = "lowie-visit-greeting-dismissed";

    let recruiterPrompt = $state<RecruiterPrompt | null>(null);
    let visitRevealTimer: ReturnType<typeof setTimeout> | undefined;
    let visitHideTimer: ReturnType<typeof setTimeout> | undefined;

    function getVisitPrompt(hour: number): VisitPrompt {
        if (hour >= 5 && hour < 12) return "visit-morning";
        if (hour >= 12 && hour < 17) return "visit-afternoon";
        if (hour >= 17 && hour < 22) return "visit-evening";
        return "visit-late";
    }

    function isVisitPrompt(prompt: RecruiterPrompt | null) {
        return prompt?.startsWith("visit-") === true;
    }

    function markVisitGreetingSeen() {
        try {
            sessionStorage.setItem(visitGreetingKey, "true");
        } catch {
            // Session storage can be unavailable in stricter browser modes.
        }
    }

    function showVisitGreeting() {
        if (recruiterPrompt !== null) return;

        recruiterPrompt = getVisitPrompt(new Date().getHours());
        markVisitGreetingSeen();

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
        try {
            if (sessionStorage.getItem(visitGreetingKey) === "true") {
                return;
            }
        } catch {
            // Treat unavailable session storage as a fresh visit.
        }

        visitRevealTimer = setTimeout(showVisitGreeting, 1100);

        return () => {
            if (visitRevealTimer) clearTimeout(visitRevealTimer);
            if (visitHideTimer) clearTimeout(visitHideTimer);
        };
    });
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
