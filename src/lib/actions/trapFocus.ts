const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function trapFocus(node: HTMLElement) {
    function handleKeydown(e: KeyboardEvent) {
        if (e.key !== 'Tab') return;

        const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    node.addEventListener('keydown', handleKeydown);

    // Focus the first focusable element on mount
    const first = node.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
        }
    };
}
