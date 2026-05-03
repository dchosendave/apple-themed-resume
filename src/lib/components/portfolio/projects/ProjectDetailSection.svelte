<script lang="ts">
    let {
        title,
        body,
        order,
    }: {
        title: string;
        body?: string;
        order?: string;
    } = $props();
</script>

{#if body}
    <section class="apple-card-inner p-4">
        <div class="flex gap-3">
            {#if order}
                <span
                    class="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-semibold [background:color-mix(in_srgb,var(--ios-glass)_72%,transparent)] [border-color:var(--ios-chip-border)] [color:var(--ios-text-secondary)]"
                >
                    {order}
                </span>
            {/if}

            <div class="min-w-0 space-y-2">
                <p class="apple-section-title mb-0">{title}</p>
                <p class="text-sm leading-6 [color:var(--ios-text-primary)]">
                    {body}
                </p>
            </div>
        </div>
    </section>
{/if}
