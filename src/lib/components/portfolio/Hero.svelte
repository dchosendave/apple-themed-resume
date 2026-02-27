<script lang="ts">
    import { personalInfo, professionalFocus } from "$lib/data/resume";
    import ThemeToggle from "./ThemeToggle.svelte";

    let emailCopied = $state(false);
    let copyTimer: ReturnType<typeof setTimeout>;

    function copyEmail(e: MouseEvent) {
        // If it's a right-click or middle-click, let the browser handle href
        if (e.button !== 0) return;
        e.preventDefault();
        navigator.clipboard.writeText(personalInfo.email).then(() => {
            emailCopied = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => (emailCopied = false), 2000);
        });
    }
</script>

<section class="hero">
    <div class="page-container hero-inner">
        <!-- Avatar -->
        <div class="avatar-wrap">
            <div class="avatar">
                <img
                    src="/solo-picture.jpg"
                    alt="Lowie Dave Dichoson"
                    class="avatar-photo"
                />
            </div>
            <div class="avatar-ring"></div>
        </div>

        <!-- Identity -->
        <div class="identity">
            <div class="top-row">
                <span class="availability-pill">
                    <span class="pulse-dot"></span>
                    Open for opportunities
                </span>
                <ThemeToggle />
            </div>
            <div class="name-row">
                <h1 class="name">{personalInfo.name}</h1>
                <span class="title-badge">{personalInfo.title}</span>
            </div>
            <p class="focus">{professionalFocus}</p>

            <!-- Contact + CTAs in one row -->
            <div class="action-row">
                <div class="contact-chips">
                    <a
                        href="mailto:{personalInfo.email}"
                        class="chip chip-email"
                        class:chip-copied={emailCopied}
                        onclick={copyEmail}
                        title="Click to copy email"
                    >
                        <span class="chip-emoji"
                            >{emailCopied ? "✓" : "✉️"}</span
                        >
                        {emailCopied ? "Copied!" : personalInfo.email}
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="chip"
                    >
                        <span class="chip-emoji">🔗</span>
                        LinkedIn
                    </a>
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="chip"
                    >
                        <span class="chip-emoji">🐱</span>
                        GitHub
                    </a>
                    <span class="chip chip-plain">
                        <span class="chip-emoji">📍</span>
                        {personalInfo.location}
                    </span>
                </div>

                <div class="cta-row">
                    <a
                        href={personalInfo.resumePdf}
                        download
                        class="btn-primary"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            ><path
                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                            /><polyline points="7 10 12 15 17 10" /><line
                                x1="12"
                                y1="15"
                                x2="12"
                                y2="3"
                            /></svg
                        >
                        Download Resume
                    </a>
                    <a href="mailto:{personalInfo.email}" class="btn-secondary"
                        >Get in Touch</a
                    >
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .hero {
        padding-top: 32px;
        padding-bottom: 28px;
    }

    .hero-inner {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    /* Avatar */
    .avatar-wrap {
        position: relative;
        flex-shrink: 0;
    }

    .avatar {
        width: 90px;
        height: 90px;
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
        inset: -5px;
        border-radius: 50%;
        border: 2px solid var(--ios-blue);
        opacity: 0.3;
    }

    /* Identity */
    .identity {
        flex: 1;
        min-width: 0;
    }

    /* Top row: availability pill + theme toggle aligned horizontally */
    .top-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
    }

    /* Availability pill */
    .availability-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 4px 14px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--ios-text-secondary);
        letter-spacing: 0.01em;
    }

    .pulse-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #30d158;
        box-shadow: 0 0 6px #30d15880;
        animation: pulse 2s ease-in-out infinite;
        flex-shrink: 0;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(0.85);
        }
    }

    .name-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 8px;
    }

    .name {
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 800;
        color: var(--ios-text-primary);
        line-height: 1.1;
        letter-spacing: -0.02em;
        white-space: nowrap;
    }

    .title-badge {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--ios-blue);
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        padding: 3px 10px;
        border-radius: 100px;
        white-space: nowrap;
    }

    .focus {
        font-size: 0.85rem;
        line-height: 1.65;
        color: var(--ios-text-secondary);
        margin-bottom: 16px;
        max-width: 560px;
    }

    .action-row {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }

    /* Contact chips */
    .contact-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 11px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .chip:hover:not(.chip-plain) {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    .chip-copied {
        background: rgba(48, 209, 88, 0.12) !important;
        border-color: #30d158 !important;
        color: #30d158 !important;
        transition: all 0.2s ease;
    }

    .chip-plain {
        cursor: default;
    }

    .chip-emoji {
        font-size: 0.85em;
        color: initial;
        line-height: 1;
    }

    /* CTAs */
    .cta-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 18px;
        border-radius: 100px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.8rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .btn-primary:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
        box-shadow: 0 6px 20px
            color-mix(in srgb, var(--ios-blue) 35%, transparent);
    }

    .btn-secondary {
        display: inline-flex;
        align-items: center;
        padding: 8px 18px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-primary);
        font-size: 0.8rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .btn-secondary:hover {
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    /* Responsive */
    @media (max-width: 600px) {
        .hero-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
        }

        .action-row {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
