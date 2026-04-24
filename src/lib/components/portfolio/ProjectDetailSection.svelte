<script lang="ts">
    let {
        title,
        body,
    }: {
        title: string;
        body?: string;
    } = $props();
</script>

{#if body}
    <section class="apple-card-inner space-y-2 p-4">
        <p class="apple-section-title mb-0">{title}</p>
        <p class="text-sm leading-6 [color:var(--ios-text-primary)]">
            {body}
        </p>
    </section>
{/if}
