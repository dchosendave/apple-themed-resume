<script lang="ts">
    import Slideshow from "$lib/motion-core/slideshow/Slideshow.svelte";
    import { hoverSound } from "$lib/actions/hoverSound";
    import { sound } from "$lib/stores/sound.svelte";

    const loadout = [
        { name: "MSI MAG 256F", detail: "24-inch · 1080p · 180 Hz monitor", src: "/msi-mag-256f.jpg", alt: "MSI MAG 256F gaming monitor" },
        { name: "AULA F87", detail: "Mechanical keyboard", src: "/aula-f87-keyboard.jpg", alt: "AULA F87 mechanical keyboard" },
        { name: "Attack Shark X3 Max", detail: "Wireless mouse", src: "/attackshark-x3-max.jpg", alt: "Attack Shark X3 Max wireless mouse" },
    ];

    let activeIndex = $state(0);

    function selectSlide(index: number) {
        activeIndex = index;
        sound.play("open");
    }
</script>

<section class="loadout" aria-labelledby="loadout-title">
    <div class="loadout-heading">
        <div>
            <p class="eyebrow">Current loadout</p>
            <h3 id="loadout-title">On my desk.</h3>
        </div>
        <span class="slide-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(loadout.length).padStart(2, "0")}
        </span>
    </div>

    <div class="loadout-stage" use:hoverSound>
        <Slideshow
            images={loadout.map(({ src, alt }) => ({ src, alt }))}
            imageFit="cover"
            onChange={selectSlide}
        />
    </div>

    <div class="loadout-caption">
        <div>
            <strong>{loadout[activeIndex].name}</strong>
            <span>{loadout[activeIndex].detail}</span>
        </div>
        <p>Supporting gear · North Bayou monitor arm · Mi Monitor Light Bar</p>
    </div>
</section>

<style>
    .loadout { margin-top: 38px; padding-top: 24px; border-top: 1px solid var(--ios-glass-border); }
    .loadout-heading, .loadout-caption { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; }
    .eyebrow { color: var(--ios-blue); font-size: .65rem; font-weight: 650; letter-spacing: .1em; text-transform: uppercase; }
    h3 { margin-top: 6px; color: var(--ios-text-primary); font-size: 1.05rem; font-weight: 650; }
    .slide-count { color: var(--ios-text-secondary); font-variant-numeric: tabular-nums; font-size: .68rem; }
    .loadout-stage { height: clamp(250px, 36vw, 390px); margin-top: 16px; overflow: hidden; border: 1px solid var(--ios-glass-border); border-radius: 20px; background: oklch(.95 .008 145); }
    .loadout-stage :global(img) { object-position: center; }
    .loadout-caption { align-items: flex-start; margin-top: 14px; }
    .loadout-caption strong, .loadout-caption span { display: block; }
    .loadout-caption strong { color: var(--ios-text-primary); font-size: .82rem; font-weight: 650; }
    .loadout-caption span, .loadout-caption p { margin-top: 4px; color: var(--ios-text-secondary); font-size: .66rem; line-height: 1.6; }
    .loadout-caption p { max-width: 34ch; margin-top: 0; text-align: right; }

    @media (max-width: 560px) {
        .loadout-stage { height: 270px; }
        .loadout-caption { display: block; }
        .loadout-caption p { margin-top: 12px; text-align: left; }
    }
</style>
