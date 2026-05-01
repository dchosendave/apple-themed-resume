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
    <h1
        class="text-[clamp(1.7rem,3.2vw,2.3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] [color:var(--ios-text-primary)]"
    >
        {name}
    </h1>

    <div class="mt-3 flex flex-wrap items-center gap-2.5">
        <span class="apple-badge text-[0.68rem] sm:text-[0.72rem]">
            {title}
        </span>
    </div>

    <p
        class="mt-3 max-w-[60ch] text-[0.88rem] leading-[1.68] [color:var(--ios-text-secondary)] sm:text-[0.95rem] sm:leading-[1.72]"
    >
        {focus}
    </p>
</div>
