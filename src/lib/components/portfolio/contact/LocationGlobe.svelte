<script lang="ts">
    import { onMount } from "svelte";
    import Globe from "$lib/motion-core/globe/Globe.svelte";
    import type { GlobeMarker } from "$lib/motion-core/globe/types";

    const taguig: [number, number] = [14.5176, 121.0509];
    const markers: GlobeMarker[] = [
        {
            location: taguig,
            label: "Taguig",
            color: "#e9b949",
            size: 0.075,
        },
    ];

    let canRenderGlobe = $state(false);
    let reduceMotion = $state(true);

    onMount(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const canvas = document.createElement("canvas");
        canRenderGlobe = Boolean(
            canvas.getContext("webgl2") || canvas.getContext("webgl"),
        );

        const updateMotionPreference = () => {
            reduceMotion = motionQuery.matches;
        };
        updateMotionPreference();
        motionQuery.addEventListener("change", updateMotionPreference);

        return () => {
            motionQuery.removeEventListener("change", updateMotionPreference);
        };
    });
</script>

<aside class="location-card" aria-label="Lowie is based in Taguig City, Philippines">
    <div class="globe-stage">
        {#if canRenderGlobe}
            <Globe
                scale={1.12}
                offsetY={0.02}
                pointCount={12000}
                pointSize={0.045}
                landPointColor="#9bcfae"
                fresnelConfig={{
                    color: "#111b15",
                    rimColor: "#78ad8c",
                    rimPower: 6.5,
                    rimIntensity: 1.2,
                }}
                atmosphereConfig={{
                    color: "#78ad8c",
                    scale: 1.08,
                    power: 13,
                    coefficient: 0.92,
                    intensity: 0.75,
                }}
                autoRotate={!reduceMotion}
                lockedPolarAngle={false}
                {markers}
                focusOn={taguig}
            />
        {:else}
            <div class="globe-fallback" aria-hidden="true">
                <span></span>
            </div>
        {/if}
    </div>
    <div class="location-caption">
        <span class="location-dot" aria-hidden="true"></span>
        <div>
            <strong>Taguig City, Philippines</strong>
            <span>14.52° N · 121.05° E</span>
        </div>
    </div>
</aside>

<style>
    .location-card {
        min-width: 0;
    }

    .globe-stage {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        min-height: 280px;
        overflow: hidden;
        cursor: grab;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--lowie-mint) 8%, transparent) 0 38%,
            transparent 70%
        );
    }

    .globe-stage:active {
        cursor: grabbing;
    }

    .globe-fallback {
        display: grid;
        width: 100%;
        height: 100%;
        place-items: center;
    }

    .globe-fallback span {
        width: 72%;
        aspect-ratio: 1;
        border: 1px solid color-mix(in srgb, var(--ios-blue) 38%, transparent);
        border-radius: 50%;
        background:
            linear-gradient(90deg, transparent 49.7%, color-mix(in srgb, var(--ios-blue) 18%, transparent) 50%, transparent 50.3%),
            linear-gradient(transparent 49.7%, color-mix(in srgb, var(--ios-blue) 18%, transparent) 50%, transparent 50.3%);
        box-shadow: 0 0 48px color-mix(in srgb, var(--ios-blue) 12%, transparent);
    }

    .location-caption {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        width: fit-content;
        margin: -8px auto 0;
        color: var(--ios-text-secondary);
        font-size: 0.72rem;
        line-height: 1.5;
    }

    .location-caption strong,
    .location-caption span {
        display: block;
    }

    .location-caption strong {
        color: var(--ios-text-primary);
        font-weight: 600;
    }

    .location-dot {
        width: 6px;
        height: 6px;
        margin-top: 5px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: #e9b949;
        box-shadow: 0 0 12px rgba(233, 185, 73, 0.55);
    }

    @media (max-width: 760px) {
        .globe-stage {
            width: min(100%, 340px);
            min-height: 0;
            margin: 0 auto;
        }
    }
</style>
