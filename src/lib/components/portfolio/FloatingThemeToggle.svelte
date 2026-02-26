<script lang="ts">
    import { theme } from "$lib/stores/theme.svelte";
</script>

<button
    onclick={theme.toggle}
    class="floating-toggle"
    aria-label="Toggle theme"
>
    {#if theme.isDark}
        <!-- Sun icon -->
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    {:else}
        <!-- Moon icon -->
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    {/if}
</button>

<style>
    .floating-toggle {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--ios-nav-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--ios-separator);
        color: var(--ios-text-primary);
        cursor: pointer;
        box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.12),
            0 1px 4px rgba(0, 0, 0, 0.08);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .floating-toggle:hover {
        transform: scale(1.1);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
        box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.18),
            0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .floating-toggle:active {
        transform: scale(0.95);
    }

    @media (max-width: 480px) {
        .floating-toggle {
            bottom: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
        }
    }
</style>
