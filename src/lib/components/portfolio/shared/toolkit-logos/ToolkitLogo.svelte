<script lang="ts">
    let { name, icon, class: className = '' }: { name: string; icon: string; class?: string } = $props();
</script>

<div class={className}>
    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${icon}/${icon}-original.svg`} alt="" width="34" height="34" loading="lazy" onerror={(event) => ((event.currentTarget as HTMLImageElement).style.visibility = 'hidden')} />
    <span>{name}</span>
</div>

<style>
    div { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    img { object-fit: contain; flex-shrink: 0; }
    span { font-size: 0.72rem; color: var(--ios-text-secondary); white-space: nowrap; }
</style>
