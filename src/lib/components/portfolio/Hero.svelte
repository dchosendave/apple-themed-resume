<script lang="ts">
    import { personalInfo, professionalFocus } from "$lib/data/resume";
    import ThemeToggle from "./ThemeToggle.svelte";
    import { reveal } from "$lib/actions/reveal";

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;

    // Easter egg: avatar click counter
    let avatarClicks = $state(0);
    let easterEggActive = $state(false);
    let easterEggDismissing = $state(false);
    let wobbling = $state(false);
    let easterEggTimer: ReturnType<typeof setTimeout>;

    function copyEmail(e: MouseEvent) {
        if (e.button !== 0) return;
        e.preventDefault();
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            emailCopied = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => (emailCopied = false), 2000);
        });
    }

    function handleAvatarClick() {
        avatarClicks++;
        if (avatarClicks >= 2) {
            wobbling = true;
            easterEggActive = true;
            easterEggDismissing = false;
            avatarClicks = 0;
            setTimeout(() => (wobbling = false), 600);
            clearTimeout(easterEggTimer);
            easterEggTimer = setTimeout(() => {
                easterEggDismissing = true;
                setTimeout(() => {
                    easterEggActive = false;
                    easterEggDismissing = false;
                }, 300);
            }, 3000);
        }
    }
</script>

<div class="hero-tile glass-card bento-tile" use:reveal>
    <!-- Top bar: availability + theme toggle -->
    <div class="top-bar">
        <span class="availability-pill">
            <span class="pulse-dot"></span>
            Open to opportunities
        </span>
        <ThemeToggle />
    </div>

    <div class="hero-body">
        <!-- Avatar with easter egg -->
        <div class="avatar-wrap">
            <button
                class="avatar-btn"
                class:wobble={wobbling}
                onclick={handleAvatarClick}
                aria-label="Profile photo"
                type="button"
            >
                <div class="avatar">
                    <img
                        src="/solo-picture.jpg"
                        alt="Lowie Dave Dichoson"
                        class="avatar-photo"
                    />
                </div>
                <div class="avatar-ring"></div>
            </button>
            {#if easterEggActive}
                <div class="easter-egg-toast" class:toast-dismiss={easterEggDismissing}>
                    🎉 You found me! Thanks for clicking around.
                </div>
            {/if}
        </div>

        <!-- Identity -->
        <div class="identity">
            <div class="name-row">
                <h1 class="name">{personalInfo.name}</h1>
                <span class="title-badge">{personalInfo.title}</span>
            </div>
            <p class="focus">{professionalFocus}</p>
        </div>
    </div>

    <!-- Contact icons + CTAs -->
    <div class="action-bar">
        <div class="contact-icons">
            <a
                href="mailto:{personalInfo.email}"
                class="icon-chip"
                class:icon-chip-copied={emailCopied}
                onclick={copyEmail}
                title={emailCopied ? "Copied!" : "Copy email"}
            >
                {#if emailCopied}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {:else}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                {/if}
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" class="icon-chip" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" class="icon-chip" title="GitHub">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <span class="icon-chip icon-chip-plain" title={personalInfo.location}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </span>
        </div>

        <div class="cta-row">
            <a href={personalInfo.resumePdf} download class="btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Resume
            </a>
            <a href="mailto:{personalInfo.email}" class="btn-secondary">Get in Touch</a>
        </div>
    </div>
</div>

<style>
    .hero-tile {
        padding: 18px 22px;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .availability-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 3px 12px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--ios-text-secondary);
        letter-spacing: 0.01em;
    }

    .pulse-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #30d158;
        box-shadow: 0 0 6px #30d15880;
        animation: pulse 2s ease-in-out infinite;
        flex-shrink: 0;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
    }

    .hero-body {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    /* Avatar */
    .avatar-wrap {
        position: relative;
        flex-shrink: 0;
    }

    .avatar-btn {
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
        transition: transform 0.15s ease;
    }

    .avatar-btn:hover {
        transform: scale(1.03);
    }

    .avatar-btn.wobble {
        animation: wobble 0.6s ease-in-out;
    }

    .avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        background: var(--ios-chip-bg);
    }

    .avatar-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
    }

    .avatar-ring {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid var(--ios-blue);
        opacity: 0.3;
    }

    .easter-egg-toast {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: var(--ios-glass);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--ios-glass-border);
        border-radius: 12px;
        padding: 8px 14px;
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-primary);
        white-space: nowrap;
        z-index: 10;
        animation: toast-in 0.3s ease forwards;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .toast-dismiss {
        animation: toast-out 0.3s ease forwards;
    }

    /* Identity */
    .identity {
        flex: 1;
        min-width: 0;
    }

    .name-row {
        display: flex;
        align-items: baseline;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 6px;
    }

    .name {
        font-size: clamp(1.25rem, 2.5vw, 1.6rem);
        font-weight: 800;
        color: var(--ios-text-primary);
        line-height: 1.1;
        letter-spacing: -0.02em;
        white-space: nowrap;
    }

    .title-badge {
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--ios-blue);
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        padding: 2px 9px;
        border-radius: 100px;
        white-space: nowrap;
    }

    .focus {
        font-size: 0.78rem;
        line-height: 1.55;
        color: var(--ios-text-secondary);
        max-width: 520px;
    }

    /* Action bar */
    .action-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-top: 1px solid var(--ios-separator);
        padding-top: 12px;
    }

    .contact-icons {
        display: flex;
        gap: 6px;
    }

    .icon-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .icon-chip:hover:not(.icon-chip-plain) {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
        transform: scale(1.08);
    }

    .icon-chip-copied {
        background: rgba(48, 209, 88, 0.12) !important;
        border-color: #30d158 !important;
        color: #30d158 !important;
    }

    .icon-chip-plain {
        cursor: default;
    }

    .cta-row {
        display: flex;
        gap: 6px;
    }

    .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 7px 16px;
        border-radius: 100px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.75rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .btn-primary:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 16px color-mix(in srgb, var(--ios-blue) 35%, transparent);
    }

    .btn-secondary {
        display: inline-flex;
        align-items: center;
        padding: 7px 16px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-primary);
        font-size: 0.75rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .btn-secondary:hover {
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    @media (max-width: 600px) {
        .hero-body {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
        }

        .action-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .avatar {
            width: 64px;
            height: 64px;
        }
    }
</style>
