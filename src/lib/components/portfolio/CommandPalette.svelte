<script lang="ts">
    import { onMount } from 'svelte';
    import { personalInfo } from '$lib/data/resume';
    import { trapFocus } from '$lib/actions/trapFocus';

    let open = $state(false);
    let activeIndex = $state(0);
    let listRef = $state<HTMLUListElement | null>(null);

    type Action = { label: string; category: string; run: () => void };

    const actions: Action[] = [
        {
            label: 'Hero',
            category: 'Navigate',
            run: () => document.getElementById('tile-hero')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            label: 'Experience',
            category: 'Navigate',
            run: () => document.getElementById('tile-experience')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            label: 'Skills',
            category: 'Navigate',
            run: () => document.getElementById('tile-skills')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            label: 'Projects',
            category: 'Navigate',
            run: () => document.getElementById('tile-projects')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            label: 'Education',
            category: 'Navigate',
            run: () => document.getElementById('tile-education')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            label: 'Copy Email',
            category: 'Contact',
            run: () => navigator.clipboard.writeText(personalInfo.email)
        },
        {
            label: 'Download Resume',
            category: 'Contact',
            run: () => {
                const a = document.createElement('a');
                a.href = personalInfo.resumePdf;
                a.download = '';
                a.click();
            }
        },
        {
            label: 'Open LinkedIn',
            category: 'Contact',
            run: () => window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer')
        },
        {
            label: 'Open GitHub',
            category: 'Contact',
            run: () => window.open(personalInfo.github, '_blank', 'noopener,noreferrer')
        },
    ];

    function execute(index: number) {
        actions[index].run();
        close();
    }

    function close() {
        open = false;
        document.body.style.overflow = '';
    }

    // Scroll active item into view on arrow key navigation
    $effect(() => {
        if (open && listRef) {
            const item = listRef.children[activeIndex] as HTMLElement | undefined;
            item?.scrollIntoView({ block: 'nearest' });
        }
    });

    onMount(() => {
        function handleKeydown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                open = true;
                activeIndex = 0;
                document.body.style.overflow = 'hidden';
                return;
            }

            if (!open) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = (activeIndex + 1) % actions.length;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = (activeIndex - 1 + actions.length) % actions.length;
            } else if (e.key === 'Enter') {
                e.preventDefault();
                execute(activeIndex);
            } else if (e.key === 'Escape') {
                close();
            }
        }

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

{#if open}
    <!-- Backdrop -->
    <div
        class="palette-backdrop"
        role="presentation"
        onclick={close}
    ></div>

    <!-- Modal -->
    <div
        class="palette-modal glass-card"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        use:trapFocus
    >
        <!-- Header -->
        <div class="palette-header">
            <span class="palette-title">Quick Actions</span>
            <kbd class="palette-kbd">⌘K</kbd>
        </div>

        <!-- Actions list -->
        <ul
            class="palette-list"
            role="listbox"
            bind:this={listRef}
        >
            {#each actions as action, i}
                <li
                    role="option"
                    aria-selected={i === activeIndex}
                    class="palette-item"
                    class:active={i === activeIndex}
                    onclick={() => execute(i)}
                    onmouseenter={() => activeIndex = i}
                >
                    <span class="item-category">{action.category}</span>
                    <span class="item-label">{action.label}</span>
                </li>
            {/each}
        </ul>

        <!-- Footer hint -->
        <div class="palette-footer">
            <span>↑↓ navigate</span>
            <span>·</span>
            <span>Enter select</span>
            <span>·</span>
            <span>Esc close</span>
        </div>
    </div>
{/if}

<style>
    .palette-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 600;
    }

    .palette-modal {
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
        width: min(520px, 90vw);
        max-height: 420px;
        z-index: 601;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        animation: palette-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .palette-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px 10px;
        border-bottom: 1px solid var(--ios-separator);
        flex-shrink: 0;
    }

    .palette-title {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ios-text-secondary);
    }

    .palette-kbd {
        font-size: 0.65rem;
        font-weight: 600;
        color: var(--ios-text-tertiary);
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 6px;
        padding: 2px 6px;
        font-family: inherit;
    }

    .palette-list {
        list-style: none;
        overflow-y: auto;
        flex: 1;
        padding: 6px;
    }

    .palette-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.1s ease;
        user-select: none;
    }

    .palette-item.active {
        background: var(--ios-blue);
    }

    .item-category {
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ios-text-tertiary);
        min-width: 56px;
        flex-shrink: 0;
        transition: color 0.1s ease;
    }

    .palette-item.active .item-category {
        color: rgba(255, 255, 255, 0.65);
    }

    .item-label {
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--ios-text-primary);
        transition: color 0.1s ease;
    }

    .palette-item.active .item-label {
        color: #fff;
    }

    .palette-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        padding: 8px 16px;
        border-top: 1px solid var(--ios-separator);
        font-size: 0.62rem;
        color: var(--ios-text-tertiary);
        flex-shrink: 0;
    }
</style>
