<script lang="ts">
    import { onMount } from "svelte";

    const sections = [
        { id: "hero", label: "Intro" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "contact", label: "Contact" },
    ];

    let activeId = $state(sections[0].id);
    let scrollProgress = $state(0);

    onMount(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;

            // Mobile: fill progress bar
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            // Desktop: active section = deepest one whose top has passed
            // 30% down the viewport (works for sections of any height)
            const trigger = scrollTop + window.innerHeight * 0.3;
            let current = sections[0].id;
            for (const { id } of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= trigger) {
                    current = id;
                }
            }
            activeId = current;
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // run once on mount to set initial state

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<!-- Desktop: right-side dot navigation -->
<nav class="dot-nav" aria-label="Page sections">
    {#each sections as section (section.id)}
        <button
            class="dot-btn"
            class:active={activeId === section.id}
            aria-label="Go to {section.label}"
            aria-current={activeId === section.id ? "location" : undefined}
            onclick={() => scrollTo(section.id)}
        >
            <span class="dot"></span>
            <span class="dot-label">{section.label}</span>
        </button>
    {/each}
</nav>

<!-- Mobile: top scroll-progress bar -->
<div class="progress-bar" aria-hidden="true">
    <div class="progress-fill" style="width: {scrollProgress}%"></div>
</div>

<style>
    /* ── Desktop dot nav ────────────────────────────── */
    .dot-nav {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 14px;
        align-items: flex-end;
    }

    .dot-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 20px;
        transition: none;
    }

    .dot-label {
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        max-width: 0;
        overflow: hidden;
        opacity: 0;
        transition:
            max-width 0.25s ease,
            opacity 0.2s ease;
        pointer-events: none;
    }

    .dot-btn:hover .dot-label {
        max-width: 80px;
        opacity: 1;
    }

    .dot-btn.active .dot-label {
        max-width: 80px;
        opacity: 1;
        color: var(--ios-blue);
    }

    .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--ios-text-secondary);
        opacity: 0.35;
        flex-shrink: 0;
        transition:
            width 0.2s ease,
            height 0.2s ease,
            opacity 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
    }

    .dot-btn:hover .dot {
        opacity: 0.6;
        width: 8px;
        height: 8px;
    }

    .dot-btn.active .dot {
        background: var(--ios-blue);
        opacity: 1;
        width: 9px;
        height: 9px;
        box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--ios-blue) 25%, transparent);
    }

    /* ── Mobile progress bar ────────────────────────── */
    .progress-bar {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        z-index: 200;
        background: transparent;
    }

    .progress-fill {
        height: 100%;
        background: var(--ios-blue);
        transition: width 0.1s linear;
        border-radius: 0 2px 2px 0;
    }

    /* ── Responsive: swap modes ─────────────────────── */
    @media (max-width: 767px) {
        .dot-nav {
            display: none;
        }

        .progress-bar {
            display: block;
        }
    }

    /* ── Reduced motion ─────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
        .dot-label,
        .dot,
        .progress-fill {
            transition: none;
        }
    }
</style>
