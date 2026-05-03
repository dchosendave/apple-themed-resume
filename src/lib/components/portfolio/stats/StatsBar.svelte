<script lang="ts">
    import CoffeeIcon from "@lucide/svelte/icons/coffee";
    import Gamepad2Icon from "@lucide/svelte/icons/gamepad-2";
    import Music2Icon from "@lucide/svelte/icons/music-2";
    import SparklesIcon from "@lucide/svelte/icons/sparkles";
    import { stats } from "$lib/data/stats";
    import { countUp } from "$lib/actions/countUp";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";

    const proofDetails = new Map([
        [
            "Systems Built & Enhanced",
            {
                signal: "Build range",
                note: "Client-facing portals, internal tools, and workflow fixes carried into real use.",
            },
        ],
        [
            "Production Deployments",
            {
                signal: "Release rhythm",
                note: "Careful releases inside legacy-heavy environments where small mistakes are expensive.",
            },
        ],
        [
            "Legacy Systems Supported",
            {
                signal: "Stability work",
                note: "Older stacks kept dependable while new fixes, requirements, and investigations moved.",
            },
        ],
        [
            "Modules Documented",
            {
                signal: "Handoff care",
                note: "Code-aligned documentation for maintenance, onboarding, and recovery work.",
            },
        ],
    ]);

    const proofStats = stats.map((stat) => {
        const detail = proofDetails.get(stat.label);

        return {
            ...stat,
            signal: detail?.signal ?? "Proof",
            note: detail?.note ?? "",
        };
    });

    const labNotes = [
        {
            label: "Fuel",
            note: "Usually two coffees a day, timed suspiciously close to production edge cases.",
            icon: CoffeeIcon,
            iconClass: "[color:var(--lowie-coffee)]",
        },
        {
            label: "Soundtrack",
            note: "Hands All Over by Maroon 5 is still the steady-focus album.",
            icon: Music2Icon,
            iconClass: "[color:var(--ios-blue)]",
        },
        {
            label: "Off-hours",
            note: "Story-heavy RPGs keep me curious about pacing, systems, and user flow.",
            icon: Gamepad2Icon,
            iconClass: "[color:var(--ios-blue)]",
        },
        {
            label: "Current mode",
            note: "Strengthening fundamentals on purpose because tools change fast.",
            icon: SparklesIcon,
            iconClass: "[color:var(--lowie-warm)]",
        },
    ] as const;
</script>

<PortfolioCard class="lowie-card-glow flex flex-col gap-4 overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <section class="relative z-[1]" aria-labelledby="proof-ledger-title">
        <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
                <p id="proof-ledger-title" class="apple-section-title mb-1">Proof Ledger</p>
                <p class="max-w-[34ch] text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                    Delivery breadth, release rhythm, legacy ownership, and handoff care.
                </p>
            </div>
            <span class="apple-chip shrink-0 px-2.5 py-1 text-[0.66rem]">4 signals</span>
        </div>

        <ol
            class="mt-3 rounded-[20px] border px-4 [background:color-mix(in_srgb,var(--ios-chip-bg)_78%,transparent)] [border-color:var(--ios-glass-border)]"
        >
            {#each proofStats as stat, index (stat.label)}
                <li
                    class={[
                        "flex items-start gap-3 py-3",
                        index > 0 && "border-t [border-color:var(--ios-glass-border)]",
                    ]}
                >
                    <span
                        class="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-[0.66rem] font-semibold [background:color-mix(in_srgb,var(--ios-glass)_72%,transparent)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                    >
                        {(index + 1).toString().padStart(2, "0")}
                    </span>

                    <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <p
                                    class="text-[0.82rem] font-semibold leading-[1.4] [color:var(--ios-text-primary)]"
                                >
                                    {stat.label}
                                </p>
                                <p
                                    class="mt-1 max-w-[28ch] text-[0.72rem] leading-[1.5] [color:var(--ios-text-secondary)]"
                                >
                                    {stat.note}
                                </p>
                            </div>

                            <div class="shrink-0 text-right">
                                <span
                                    class="block text-[1.22rem] font-extrabold leading-none tracking-normal [color:var(--ios-blue)]"
                                    use:countUp={stat.value}
                                ></span>
                                <span
                                    class="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-tertiary)]"
                                >
                                    {stat.signal}
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            {/each}
        </ol>
    </section>

    <section
        class="relative z-[1] rounded-[20px] border p-4 [background:color-mix(in_srgb,var(--ios-chip-bg)_72%,transparent)] [border-color:var(--ios-glass-border)]"
        aria-labelledby="now-brewing-title"
    >
        <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
                <p id="now-brewing-title" class="apple-section-title mb-1">Working Style</p>
                <p class="max-w-[34ch] text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                    Small habits around the work, what keeps me steady, and what I am sharpening next.
                </p>
            </div>
            <span class="lowie-warm-chip shrink-0 px-2.5 py-1">Taguig, PH</span>
        </div>

        <div class="mt-3 grid gap-0">
            {#each labNotes as item, index (item.label)}
                <div
                    class={[
                        "flex items-start gap-3 py-3",
                        index > 0 && "border-t [border-color:var(--ios-glass-border)]",
                    ]}
                >
                    <span
                        class="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border [background:color-mix(in_srgb,var(--ios-glass)_72%,transparent)] [border-color:var(--ios-chip-border)]"
                    >
                        <item.icon class={["size-3.5", item.iconClass]} />
                    </span>

                    <div class="min-w-0">
                        <p
                            class="text-[0.68rem] font-semibold uppercase tracking-[0.08em] [color:var(--ios-text-tertiary)]"
                        >
                            {item.label}
                        </p>
                        <p
                            class="mt-1 text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]"
                        >
                            {item.note}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</PortfolioCard>
