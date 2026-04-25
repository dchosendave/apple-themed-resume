<script lang="ts">
    let {
        name,
        title,
        focus,
    }: {
        name: string;
        title: string;
        focus: string;
    } = $props();
</script>

<div class="min-w-0 flex-1 max-w-[56ch]">
    <div class="mb-2 flex flex-wrap items-baseline gap-3">
        <h1
            class="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] [color:var(--ios-text-primary)]"
        >
            {name}
        </h1>
        <span
            class="whitespace-nowrap rounded-full border px-[10px] py-1 text-[0.72rem] font-semibold [background:var(--ios-stat-bg)] [border-color:color-mix(in_srgb,var(--ios-blue)_25%,transparent)] [color:var(--ios-blue)]"
        >
            {title}
        </span>
    </div>

    <p
        class="max-w-[58ch] text-[0.84rem] leading-[1.6] [color:var(--ios-text-secondary)] sm:text-[0.9rem] sm:leading-[1.65]"
    >
        {focus}
    </p>
</div>
