<script lang="ts">
    import { personalInfo } from "$lib/data/resume";
    import { reveal } from "$lib/actions/reveal";
</script>

<footer class="contact-footer">
    <div class="page-container footer-inner" use:reveal>
        <div class="footer-left">
            <p class="footer-name">{personalInfo.name}</p>
            <p class="footer-tagline">
                Available for Backend · Full-Stack · Financial Systems roles
            </p>
        </div>
        <div class="footer-links">
            <a href="mailto:{personalInfo.email}" class="footer-link">
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    ><rect x="2" y="4" width="20" height="16" rx="2" /><path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                    /></svg
                >
                Email
            </a>
            <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
            >
                <svg
                    width="15"
                    height="15"
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
            <a href={personalInfo.resumePdf} download class="footer-download">
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
                PDF Resume
            </a>
        </div>
    </div>
    <div class="footer-bar">
        <p class="footer-copy">
            © {new Date().getFullYear()} Lowie Dave Dichoson · Built with SvelteKit
        </p>
    </div>
</footer>

<style>
    .contact-footer {
        margin-top: 8px;
        border-top: 1px solid var(--ios-separator);
        padding-top: 24px;
        padding-bottom: 32px;
    }

    .footer-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .footer-name {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        margin-bottom: 4px;
    }

    .footer-tagline {
        font-size: 0.75rem;
        color: var(--ios-text-secondary);
    }

    .footer-links {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .footer-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 100px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .footer-link:hover {
        background: var(--ios-stat-bg);
        border-color: var(--ios-blue);
        color: var(--ios-blue);
    }

    .footer-download {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 100px;
        background: var(--ios-blue);
        border: 1px solid transparent;
        font-size: 0.78rem;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .footer-download:hover {
        background: var(--ios-blue-hover);
        transform: translateY(-1px);
    }

    .footer-bar {
        padding-top: 16px;
        border-top: 1px solid var(--ios-separator);
    }

    .footer-copy {
        font-size: 0.7rem;
        color: var(--ios-text-secondary);
        text-align: center;
    }
</style>
