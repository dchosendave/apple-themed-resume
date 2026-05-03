<div class="bg-layer" aria-hidden="true">
    <div class="ambient-grid"></div>
    <div class="ambient-wash ambient-wash-top"></div>
    <div class="ambient-wash ambient-wash-bottom"></div>
</div>

<style>
    .bg-layer {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        background:
            linear-gradient(
                135deg,
                color-mix(in srgb, var(--ios-bg) 94%, var(--ios-blue)) 0%,
                var(--ios-bg) 42%,
                color-mix(in srgb, var(--ios-bg) 92%, var(--lowie-warm)) 100%
            );
    }

    .ambient-grid,
    .ambient-wash {
        position: absolute;
        inset: 0;
    }

    .ambient-grid {
        opacity: 0.28;
        background-image:
            linear-gradient(
                color-mix(in srgb, var(--ios-blue) 14%, transparent) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                color-mix(in srgb, var(--ios-blue) 10%, transparent) 1px,
                transparent 1px
            );
        background-size: 72px 72px;
        mask-image: linear-gradient(
            180deg,
            transparent 0%,
            rgb(7 10 8) 18%,
            rgb(7 10 8) 72%,
            transparent 100%
        );
    }

    .ambient-wash {
        opacity: 0.9;
        transition: opacity 0.3s ease;
    }

    .ambient-wash-top {
        background: linear-gradient(
            160deg,
            color-mix(in srgb, var(--ios-blue) 18%, transparent) 0%,
            transparent 46%
        );
    }

    .ambient-wash-bottom {
        background: linear-gradient(
            18deg,
            color-mix(in srgb, var(--lowie-warm) 12%, transparent) 0%,
            transparent 44%
        );
    }
</style>
