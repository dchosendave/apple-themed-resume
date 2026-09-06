<script lang="ts">
    import { onMount } from "svelte";
    import LogoCarousel from "$lib/motion-core/logo-carousel/LogoCarousel.svelte";
    import Frontend from "./toolkit-logos/Frontend.svelte";
    import Backend from "./toolkit-logos/Backend.svelte";
    import Databases from "./toolkit-logos/Databases.svelte";
    import Tooling from "./toolkit-logos/Tooling.svelte";

    const logos = [
        { name: "Frontend", id: 0, component: Frontend },
        { name: "Backend", id: 1, component: Backend },
        { name: "Databases", id: 2, component: Databases },
        { name: "Tooling", id: 3, component: Tooling },
    ];
    let pageHidden = $state(false);
    let paused = $state(false);
    let hovering = $state(false);
    let focused = $state(false);
    let reduced = $state(true);
    let visible = $state(false);
    let element: HTMLDivElement;

    onMount(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            reduced = query.matches;
        };
        update();
        query.addEventListener("change", update);
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        observer.observe(element);
        const updateVisibility = () => {
            pageHidden = document.hidden;
        };
        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);
        return () => {
            document.removeEventListener("visibilitychange", updateVisibility);
            observer.disconnect();
            query.removeEventListener("change", update);
        };
    });
</script>

<div
    class="carousel"
    role="group"
    aria-label="Toolkit highlights"
    bind:this={element}
    onpointerenter={() => (hovering = true)}
    onpointerleave={() => (hovering = false)}
    onfocusin={() => (focused = true)}
    onfocusout={() => (focused = false)}
>
    <div class="logos">
        <LogoCarousel
            {logos}
            columnCount={1}
            shuffle={false}
            cycleInterval={1500}
            paused={paused ||
                hovering ||
                focused ||
                reduced ||
                !visible ||
                pageHidden}
            class="toolkit-logo-carousel"
        />
    </div>
    {#if !reduced}
        <button
            type="button"
            aria-label={paused
                ? "Resume toolkit animation"
                : "Pause toolkit animation"}
            aria-pressed={paused}
            onclick={() => (paused = !paused)}
        >
            {paused ? "Resume" : "Pause"}
        </button>
    {/if}
</div>

<style>
    .carousel {
        margin-bottom: 28px;
    }
    .logos {
        border-block: 1px solid var(--ios-glass-border);
    }
    .logos :global(.toolkit-logo-carousel) {
        width: 100%;
        gap: 0;
    }
    .logos :global(.toolkit-logo-carousel > div) {
        flex: 1;
        min-width: 0;
        height: 230px;
        margin: 0;
    }
    button {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0 0 auto;
        padding: 8px;
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
        cursor: pointer;
    }
    button:hover {
        color: var(--ios-blue);
    }
    button:focus-visible {
        outline: 2px solid var(--ios-blue);
        outline-offset: 2px;
        border-radius: 4px;
    }
</style>
