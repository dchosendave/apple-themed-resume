/** One-time entrance. Content remains visible without JS or animation support. */
export function enter(node: HTMLElement, delay = 0) {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    let observer: IntersectionObserver | undefined;
    const reveal = () => {
        observer?.disconnect();
        if (preference.matches || !node.animate) return;
        animation = node.animate(
            [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 540, delay, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' },
        );
    };
    const stop = () => {
        if (preference.matches) { observer?.disconnect(); animation?.cancel(); }
    };
    if (!preference.matches && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) reveal();
        }, { threshold: 0.06 });
        observer.observe(node);
    }
    preference.addEventListener('change', stop);
    const showOnFocus = () => { observer?.disconnect(); animation?.cancel(); };
    node.addEventListener('focusin', showOnFocus);
    return { destroy() {
        observer?.disconnect(); animation?.cancel();
        preference.removeEventListener('change', stop);
        node.removeEventListener('focusin', showOnFocus);
    } };
}
