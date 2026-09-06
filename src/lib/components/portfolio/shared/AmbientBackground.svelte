<script lang="ts">
    import { onMount } from "svelte";

    let layer: HTMLDivElement;

    onMount(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        let frame = 0;

        const trackPointer = (event: PointerEvent) => {
            if (motionQuery.matches || !pointerQuery.matches || frame) return;
            frame = requestAnimationFrame(() => {
                layer.style.setProperty("--signal-x", `${(event.clientX / innerWidth) * 100}%`);
                layer.style.setProperty("--signal-y", `${(event.clientY / innerHeight) * 100}%`);
                frame = 0;
            });
        };

        window.addEventListener("pointermove", trackPointer, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", trackPointer);
        };
    });
</script>

<div class="bg-layer" aria-hidden="true" bind:this={layer}>
    <div class="ambient-sky"></div>
    <div class="ambient-afterglow"></div>
    <div class="ambient-sea"></div>
    <div class="ambient-reflection"></div>
    <div class="ambient-horizon"></div>
    <div class="ambient-signal"></div>
</div>

<style>
    .bg-layer {
        --signal-x: 68%;
        --signal-y: 22%;
        --horizon: 61%;
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
        background: var(--ios-bg);
    }

    .bg-layer > div {
        position: absolute;
        inset: 0;
    }

    .ambient-sky {
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--ios-blue) 3%, transparent) 0%,
            transparent 34%,
            color-mix(in srgb, var(--lowie-warm) 5%, transparent) var(--horizon),
            transparent 72%
        );
    }

    .ambient-afterglow {
        inset: 18% -8% 20% 18% !important;
        opacity: 0.6;
        background: radial-gradient(
            ellipse 48% 24% at 66% 61%,
            color-mix(in srgb, var(--lowie-warm) 13%, transparent) 0%,
            color-mix(in srgb, var(--lowie-warm) 5%, transparent) 38%,
            transparent 76%
        );
        filter: blur(22px);
        animation: afterglow-drift 20s ease-in-out infinite alternate;
    }

    .ambient-sea {
        top: var(--horizon) !important;
        background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--ios-blue) 7%, transparent),
            color-mix(in srgb, var(--ios-blue) 3%, transparent) 44%,
            transparent 100%
        );
        mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 100%);
    }

    .ambient-reflection {
        top: calc(var(--horizon) + 1.5%) !important;
        left: 37% !important;
        right: -12% !important;
        bottom: -12% !important;
        opacity: 0.36;
        background:
            repeating-linear-gradient(
                178deg,
                transparent 0 20px,
                color-mix(in srgb, var(--lowie-warm) 8%, transparent) 21px 22px,
                transparent 23px 37px
            ),
            radial-gradient(
                ellipse 28% 84% at 52% 0%,
                color-mix(in srgb, var(--lowie-warm) 9%, transparent),
                transparent 72%
            );
        mask-image: linear-gradient(100deg, transparent 4%, black 43%, transparent 94%);
        transform-origin: 50% 0;
        animation: water-drift 14s ease-in-out infinite alternate;
    }

    .ambient-horizon {
        top: var(--horizon) !important;
        bottom: auto !important;
        height: 1px;
        opacity: 0.42;
        background: linear-gradient(
            90deg,
            transparent 3%,
            color-mix(in srgb, var(--ios-blue) 8%, transparent) 28%,
            color-mix(in srgb, var(--lowie-warm) 11%, transparent) 68%,
            transparent 96%
        );
        filter: blur(0.4px);
    }

    .ambient-signal {
        opacity: 0.2;
        background: radial-gradient(
            circle 250px at var(--signal-x) var(--signal-y),
            color-mix(in srgb, var(--ios-blue) 10%, transparent),
            transparent 74%
        );
    }

    @keyframes afterglow-drift {
        from { transform: translate3d(-10px, 2px, 0) scale(0.985); }
        to { transform: translate3d(14px, -4px, 0) scale(1.025); }
    }

    @keyframes water-drift {
        from { transform: translate3d(-14px, -2px, 0) scaleX(0.98) scaleY(0.995); }
        to { transform: translate3d(18px, 5px, 0) scaleX(1.025) scaleY(1.01); }
    }

    @media (max-width: 720px) {
        .bg-layer { --horizon: 67%; }
        .ambient-afterglow { inset-inline: -20% !important; }
        .ambient-reflection { left: 18% !important; }
    }

    @media (prefers-reduced-motion: reduce) {
        .ambient-afterglow,
        .ambient-reflection { animation: none; }

        .ambient-signal { display: none; }
    }
</style>
