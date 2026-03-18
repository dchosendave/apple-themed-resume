<script lang="ts">
    import type { Project } from "$lib/types/project";
    import { getIcon } from "$lib/utils/techIcons";
    import { trapFocus } from "$lib/actions/trapFocus";

    let { project, onclose }: { project: Project | null; onclose: () => void } = $props();

    // Body scroll lock
    $effect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    });

    // Escape key to close
    $effect(() => {
        if (!project) return;
        function handleKeydown(e: KeyboardEvent) {
            if (e.key === 'Escape') onclose();
        }
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

{#if project}
    <!-- Backdrop -->
    <div
        class="drawer-backdrop"
        role="presentation"
        onclick={onclose}
    ></div>

    <!-- Panel -->
    <div
        class="drawer-panel glass-card"
        role="dialog"
        aria-modal="true"
        aria-label="{project.name} case study"
        use:trapFocus
    >
        <!-- Header -->
        <div class="drawer-header">
            <div class="drawer-title-row">
                <h2 class="drawer-name">{project.name}</h2>
                <span class="drawer-category">{project.category}</span>
            </div>
            <button class="drawer-close" onclick={onclose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>

        <p class="drawer-description">{project.description}</p>

        <!-- Case study sections -->
        {#if project.problem || project.solution || project.impact}
            <div class="case-study">
                {#if project.problem}
                    <div class="case-section">
                        <span class="case-label">Problem</span>
                        <p class="case-text">{project.problem}</p>
                    </div>
                {/if}
                {#if project.solution}
                    <div class="case-section">
                        <span class="case-label">Solution</span>
                        <p class="case-text">{project.solution}</p>
                    </div>
                {/if}
                {#if project.impact}
                    <div class="case-section">
                        <span class="case-label">Impact</span>
                        <p class="case-text">{project.impact}</p>
                    </div>
                {/if}
            </div>
        {/if}

        <hr class="drawer-divider" />

        <!-- Stack -->
        <div class="drawer-stack-section">
            <span class="case-label">Tech Stack</span>
            <div class="drawer-stack-row">
                {#each project.stack as tech (tech)}
                    {@const icon = getIcon(tech)}
                    <span class="stack-chip">
                        {#if icon}
                            <img src={icon} alt={tech} class="tech-icon" />
                        {/if}
                        {tech}
                    </span>
                {/each}
            </div>
        </div>

        <!-- Footer -->
        <div class="drawer-footer">
            {#if project.url}
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-primary drawer-btn"
                    onclick={(e) => e.stopPropagation()}
                >
                    View Project
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
            {:else}
                <span class="internal-notice">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    Internal · Confidential
                </span>
            {/if}
        </div>
    </div>
{/if}

<style>
    .drawer-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        z-index: 499;
        animation: fade-in 0.25s ease forwards;
    }

    .drawer-panel {
        position: fixed;
        top: 0;
        right: 0;
        height: 100dvh;
        width: min(480px, 100vw);
        z-index: 500;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
        overflow-y: auto;
        border-radius: 20px 0 0 20px;
        border-right: none;
        animation: slide-in 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    .drawer-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }

    .drawer-title-row {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .drawer-name {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        line-height: 1.2;
    }

    .drawer-category {
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ios-blue);
        padding: 2px 8px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        border-radius: 100px;
        align-self: flex-start;
    }

    .drawer-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-secondary);
        cursor: pointer;
        flex-shrink: 0;
        transition: all 0.15s ease;
    }

    .drawer-close:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    .drawer-description {
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--ios-text-secondary);
    }

    .case-study {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .case-section {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .case-label {
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ios-blue);
    }

    .case-text {
        font-size: 0.8rem;
        line-height: 1.65;
        color: var(--ios-text-primary);
    }

    .drawer-divider {
        border: none;
        border-top: 1px solid var(--ios-separator);
        margin: 0;
    }

    .drawer-stack-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .drawer-stack-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .stack-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 9px;
        border-radius: 100px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        font-size: 0.65rem;
        font-weight: 600;
        color: var(--ios-blue);
        letter-spacing: 0.02em;
    }

    .tech-icon {
        width: 11px;
        height: 11px;
        object-fit: contain;
        flex-shrink: 0;
        display: block;
    }

    .drawer-footer {
        margin-top: auto;
        padding-top: 8px;
    }

    .btn-primary.drawer-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 20px;
        border-radius: 12px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.82rem;
        font-weight: 600;
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn-primary.drawer-btn:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
    }

    .internal-notice {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        color: var(--ios-text-secondary);
        padding: 8px 14px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 12px;
    }

    @keyframes slide-in {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Mobile: bottom sheet */
    @media (max-width: 600px) {
        .drawer-panel {
            top: auto;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100vw;
            height: 85vh;
            border-radius: 20px 20px 0 0;
            animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }

        @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
    }
</style>
