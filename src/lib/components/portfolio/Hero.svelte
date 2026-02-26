<script lang="ts">
    import { personalInfo, professionalFocus } from "$lib/data/resume";
    import ThemeToggle from "./ThemeToggle.svelte";
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
                    <a href="mailto:{personalInfo.email}" class="chip">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            ><rect
                                x="2"
                                y="4"
                                width="20"
                                height="16"
                                rx="2"
                            /><path
                                d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                            /></svg
                        >
                        {personalInfo.email}
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="chip"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            ><path
                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                            /><rect x="2" y="9" width="4" height="12" /><circle
                                cx="4"
                                cy="4"
                                r="2"
                            /></svg
                        >
                        LinkedIn
                    </a>
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="chip"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            ><path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.854 2.807 1.326 3.492.102.107-.779.415-1.325.755-1.645-.673-1.218-1.354-1.464-1.758-.486-.195-.996-.36-1.535-.461-1.578-.317-3.144-.771-3.144-3.493 0-.791.281-1.437.749-1.942-.074-.184-.321-1.042.074-2.014 0 0 1.046-.324 3.441 1.234.995-.278 2.063-.417 3.126-.422 1.063.005 2.131.144 3.126.422 2.405-1.558 3.467-1.234 3.467-1.234.396 1.072.149 1.829.075 2.014.468.505.748 1.151.748 1.942 0 2.722-1.567 3.177-3.149 3.485.248.28.465.813.465 1.645v2.23c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            /></svg
                        >
                        GitHub
                    </a>
                    <span class="chip chip-plain">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            ><path
                                d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                            /><circle cx="12" cy="10" r="3" /></svg
                        >
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

    .chip-plain {
        cursor: default;
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
