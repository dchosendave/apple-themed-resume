/**
 * Svelte action: countUp
 *
 * Parses a stat string like "3M+" or "300+" into a numeric target + suffix,
 * then animates the node's text content from 0 → target using an ease-out
 * curve driven by requestAnimationFrame.
 *
 * Fires once when the element enters the viewport (IntersectionObserver).
 * Respects prefers-reduced-motion: if true, shows final value immediately.
 */

const DURATION = 1200; // ms

function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/** Split "3M+" → { num: 3, suffix: "M+" }, "300+" → { num: 300, suffix: "+" } */
function parse(value: string): { num: number; suffix: string } {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return { num: 0, suffix: value };
    return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function countUp(node: HTMLElement, value: string) {
    const { num, suffix } = parse(value);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
        node.textContent = value;
        return;
    }

    // Start at 0 until visible
    node.textContent = `0${suffix}`;

    function animate() {
        const start = performance.now();

        function frame(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / DURATION, 1);
            const current = Math.round(easeOut(progress) * num);
            node.textContent = `${current}${suffix}`;
            if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animate();
                observer.disconnect();
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
