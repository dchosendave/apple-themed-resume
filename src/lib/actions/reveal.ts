/**
 * Lightweight scroll-reveal Svelte action.
 * Adds `.visible` when the element enters the viewport (fires once).
 * Respects prefers-reduced-motion automatically via CSS.
 */
export function reveal(node: HTMLElement, { delay = 0 }: { delay?: number } = {}) {
    node.style.setProperty('--reveal-delay', `${delay}ms`);
    node.classList.add('reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                node.classList.add('visible');
                observer.disconnect();
            }
        },
        { threshold: 0.1 }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
