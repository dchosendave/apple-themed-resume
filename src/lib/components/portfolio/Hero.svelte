<script lang="ts">
    import { personalInfo, professionalFocus } from "$lib/data/resume";
</script>

<section class="hero">
    <!-- Ambient background blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="page-container hero-inner">
        <!-- Avatar -->
        <div class="avatar-wrap">
            <div class="avatar">
                <span class="avatar-initials">LDD</span>
            </div>
            <div class="avatar-ring"></div>
        </div>

        <!-- Identity -->
        <div class="identity">
            <p class="greeting">Hello, I'm</p>
            <h1 class="name">{personalInfo.name}</h1>
            <p class="title">{personalInfo.title}</p>
            <p class="focus">{professionalFocus}</p>

            <!-- Contact chips -->
            <div class="contact-chips">
                <a href="mailto:{personalInfo.email}" class="chip">
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        ><rect x="2" y="4" width="20" height="16" rx="2" /><path
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
                        width="13"
                        height="13"
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
                <span class="chip chip-location">
                    <svg
                        width="13"
                        height="13"
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

            <!-- CTAs -->
            <div class="cta-row">
                <a href={personalInfo.resumePdf} download class="btn-primary">
                    <svg
                        width="15"
                        height="15"
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
                <a href="mailto:{personalInfo.email}" class="btn-secondary">
                    Get in Touch
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding-top: 56px;
        overflow: hidden;
    }

    /* ambient gradient blobs */
    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.18;
        pointer-events: none;
    }

    .blob-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, #007aff, transparent);
        top: -100px;
        right: -100px;
    }

    .blob-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, #5e5ce6, transparent);
        bottom: -50px;
        left: -100px;
        opacity: 0.12;
    }

    .hero-inner {
        display: flex;
        align-items: center;
        gap: 56px;
        padding-top: 48px;
        padding-bottom: 48px;
    }

    /* Avatar */
    .avatar-wrap {
        position: relative;
        flex-shrink: 0;
    }

    .avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--ios-blue) 0%, #5e5ce6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }

    .avatar-initials {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        letter-spacing: 0.05em;
    }

    .avatar-ring {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px solid var(--ios-blue);
        opacity: 0.3;
    }

    /* Identity text */
    .identity {
        flex: 1;
    }

    .greeting {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        margin-bottom: 6px;
        letter-spacing: 0.02em;
    }

    .name {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        color: var(--ios-text-primary);
        line-height: 1.1;
        margin-bottom: 6px;
        letter-spacing: -0.02em;
    }

    .title {
        font-size: 1rem;
        font-weight: 500;
        color: var(--ios-blue);
        margin-bottom: 14px;
    }

    .focus {
        font-size: 0.9rem;
        line-height: 1.7;
        color: var(--ios-text-secondary);
        max-width: 520px;
        margin-bottom: 22px;
    }

    /* Contact chips */
    .contact-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 24px;
    }

    .chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .chip:hover:not(.chip-location) {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    .chip-location {
        cursor: default;
    }

    /* CTA buttons */
    .cta-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 10px 22px;
        border-radius: 100px;
        background: var(--ios-blue);
        color: #fff;
        font-size: 0.875rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .btn-primary:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
        box-shadow: 0 8px 24px
            color-mix(in srgb, var(--ios-blue) 35%, transparent);
    }

    .btn-secondary {
        display: inline-flex;
        align-items: center;
        padding: 10px 22px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        color: var(--ios-text-primary);
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .btn-secondary:hover {
        border-color: var(--ios-blue);
        color: var(--ios-blue);
        transform: translateY(-1px);
    }

    /* Responsive */
    @media (max-width: 640px) {
        .hero-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
            padding-top: 32px;
        }

        .avatar {
            width: 100px;
            height: 100px;
        }

        .avatar-initials {
            font-size: 1.5rem;
        }
    }
</style>
