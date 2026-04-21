<script lang="ts">
    import { personalInfo } from "$lib/data/personal-information";

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;

    function copyEmail(e: MouseEvent) {
        if (e.button !== 0) return;
        e.preventDefault();
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            emailCopied = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => (emailCopied = false), 2000);
        });
    }
</script>

<footer class="contact-bar">
    <div class="bar-inner">
        <span class="footer-name">{personalInfo.name}</span>
        <span class="footer-sep">·</span>
        <div class="footer-links">
            <a
                href="mailto:{personalInfo.email}"
                class="footer-icon"
                class:footer-icon-copied={emailCopied}
                onclick={copyEmail}
                title={emailCopied ? "✓ Copied" : "Copy email"}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" class="footer-icon" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" class="footer-icon" title="GitHub">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
        <span class="footer-sep">·</span>
        <span class="footer-copy">© {new Date().getFullYear()} Built with SvelteKit</span>
    </div>
</footer>

<style>
    .contact-bar {
        grid-column: 1 / -1;
        padding: 14px 0;
    }

    .bar-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .footer-name {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--ios-text-primary);
    }

    .footer-sep {
        font-size: 0.75rem;
        color: var(--ios-text-secondary);
        opacity: 0.5;
    }

    .footer-links {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .footer-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .footer-icon:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
        transform: scale(1.08);
    }

    .footer-icon-copied {
        background: rgba(48, 209, 88, 0.12) !important;
        border-color: #30d158 !important;
        color: #30d158 !important;
    }

    .footer-copy {
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
        opacity: 0.7;
    }
</style>
