<script lang="ts">
    import { SplitReveal, TextLoop } from "$lib/motion-core";

    let {
        name,
        title,
        focus,
    }: {
        name: string;
        title: string;
        focus: string;
    } = $props();

    const proofSignals = [
        "Financial workflows",
        "APIs + reporting",
        "Legacy-safe delivery",
    ];

    const titleLoop = $derived([title, "Full-Stack Developer", "API Builder", "Systems Designer"]);
</script>

<div class="min-w-0 flex-1 max-w-[56ch]">
    <h1
        class="text-[1.9rem] font-extrabold leading-[1.05] tracking-normal [color:var(--ios-text-primary)] sm:text-[2.25rem]"
    >
            {name}
    </h1>

    <div class="mt-3 flex flex-wrap items-center gap-2.5">
        <span class="apple-badge text-[0.68rem] sm:text-[0.72rem]">
            <TextLoop texts={titleLoop} interval={2800} />
        </span>
    </div>

    <div class="mt-3 flex flex-wrap gap-2" aria-label="Core proof signals">
        {#each proofSignals as signal (signal)}
            <span class="apple-chip px-[11px] py-[4px] text-[0.68rem]">
                {signal}
            </span>
        {/each}
    </div>

    <SplitReveal mode="words" delay={0.35} class="mt-4">
        <p
            class="max-w-[62ch] text-[0.9rem] leading-[1.68] [color:var(--ios-text-secondary)] sm:text-[0.95rem] sm:leading-[1.72]"
        >
            {focus}
        </p>
    </SplitReveal>
</div>
