<script lang="ts">
    import { onMount } from "svelte";
    import { enter } from "$lib/actions/enter";
    import { hoverSound } from "$lib/actions/hoverSound";
    import { personalInfo } from "$lib/data/personal-information";
    import { outsideWork } from "$lib/data/about";
    import { projects } from "$lib/data/projects";
    import { experience } from "$lib/data/experience";
    import { education } from "$lib/data/education";
    import { skills } from "$lib/data/skills";
    import ThemeToggle from "./shared/ThemeToggle.svelte";
    import SoundToggle from "./shared/SoundToggle.svelte";
    import { sound } from "$lib/stores/sound.svelte";
    import CurrentlyBuilding from "./github/CurrentlyBuilding.svelte";
    import LoadoutRail from "./about/LoadoutRail.svelte";
    import LocationGlobe from "./contact/LocationGlobe.svelte";
    import type { GitHubPulseData } from "$lib/types/github-pulse";
    import WaterRipple from "$lib/motion-core/water-ripple/WaterRipple.svelte";

    let { pulse }: { pulse: GitHubPulseData } = $props();
    const emailHref = `mailto:${personalInfo.email}`;
    const academicEducation = education.filter(
        (item) => item.major !== "Certification",
    );
    const certifications = education.filter(
        (item) => item.major === "Certification",
    );
    let portraitRipple = $state(false);
    let portraitInView = $state(true);
    let portraitElement: HTMLElement;

    onMount(() => {
        const motionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const pointerQuery = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        );
        const updatePortraitMode = () =>
            (portraitRipple = !motionQuery.matches && pointerQuery.matches);
        updatePortraitMode();
        motionQuery.addEventListener("change", updatePortraitMode);
        pointerQuery.addEventListener("change", updatePortraitMode);
        const portraitObserver = new IntersectionObserver(
            ([entry]) => (portraitInView = entry.isIntersecting),
            { rootMargin: "120px 0px", threshold: 0.01 },
        );
        portraitObserver.observe(portraitElement);
        return () => {
            motionQuery.removeEventListener("change", updatePortraitMode);
            pointerQuery.removeEventListener("change", updatePortraitMode);
            portraitObserver.disconnect();
        };
    });
</script>

<div class="story-site">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header class="site-header">
        <a
            href="#tile-hero"
            class="wordmark"
            aria-label="Lowie, back to introduction"
            >lowie<span aria-hidden="true">.</span></a
        >
        <nav aria-label="Main navigation">
            <a href="#about" use:hoverSound onclick={() => sound.play("open")}
                >About</a
            >
            <a
                href="#tile-projects"
                use:hoverSound
                onclick={() => sound.play("open")}>Work</a
            >
            <a
                href={emailHref}
                use:hoverSound
                onclick={() => sound.play("confirm")}
                >Say hello <span aria-hidden="true">↗</span></a
            >
        </nav>
        <div class="header-controls" aria-label="Display and sound preferences">
            <SoundToggle />
            <ThemeToggle />
        </div>
    </header>

    <main id="main-content">
        <section
            id="tile-hero"
            class="introduction"
            aria-labelledby="intro-title"
        >
            <div class="intro-copy" use:enter={80}>
                <!-- <p class="eyebrow">Lowie Dave Dichoson · Software engineer</p> -->
                <h1 id="intro-title">
                    Hi, I’m Lowie.<br /><span
                        >I like making<br class="desktop-break" /> things easier.</span
                    >
                </h1>
                <p class="intro-description">
                    For the person filling out a form. The team doing the same
                    task every day. The next developer opening the code.
                </p>
                <p class="muted intro-footnote">
                    I build financial software and internal tools in {personalInfo.location}.
                </p>
                <div class="intro-actions">
                    <a
                        href="#tile-projects"
                        class="primary-link"
                        use:hoverSound
                        onclick={() => sound.play("open")}
                        >Take a look at my work <span aria-hidden="true"
                            >↘</span
                        ></a
                    >
                    <a
                        href={personalInfo.resumePdf}
                        download
                        class="text-link"
                        use:hoverSound
                        onclick={() => sound.play("confirm")}
                        >Download resume <span aria-hidden="true">↓</span></a
                    >
                </div>
            </div>
            <figure bind:this={portraitElement} class="portrait" use:enter={180}>
                <a
                    class="portrait-image"
                    href="/solo-picture-beach.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View the full beach photograph in a new tab"
                >
                    {#if portraitRipple && portraitInView}
                        <WaterRipple
                            src="/solo-picture-beach.jpeg"
                            brushSize={40}
                            class="portrait-canvas"
                        />
                        <span class="sr-only"
                            >Lowie standing beside the ocean at sunset</span
                        >
                    {:else}
                        <img
                            src="/solo-picture-beach.jpeg"
                            alt="Lowie standing beside the ocean at sunset"
                            width="2890"
                            height="3854"
                            fetchpriority="high"
                        />
                    {/if}
                </a>
                <figcaption>
                    <span class="small-dot" aria-hidden="true"></span>Based in
                    Taguig, Philippines
                </figcaption>
            </figure>
        </section>

        <section id="about" class="about-section" aria-labelledby="about-title">
            <div class="section-intro" use:enter>
                <p class="eyebrow">Away from the keyboard</p>
                <h2 id="about-title">A little more me.</h2>
            </div>
            <div class="about-copy" use:enter={80}>
                {#if outsideWork.placeholder}<span class="draft-label"
                        >Personal note coming soon</span
                    >{/if}
                <p class="personal-note">{outsideWork.text}</p>
                <dl class="personal-details">
                    <div>
                        <dt>On repeat</dt>
                        <dd>
                            Hands All Over<br /><span class="muted"
                                >Maroon 5</span
                            >
                        </dd>
                    </div>
                    <div>
                        <dt>Player two</dt>
                        <dd>
                            It Takes Two with my girlfriend<br /><span
                                class="muted"
                                >Also: Valorant, MU Online, Little Nightmares &
                                Stardew Valley</span
                            >
                        </dd>
                    </div>
                </dl>
                <LoadoutRail />
            </div>
        </section>

        <section
            id="tile-projects"
            class="work-section"
            aria-labelledby="work-title"
        >
            <div class="section-heading" use:enter>
                <div>
                    <p class="eyebrow">Selected work</p>
                    <h2 id="work-title">Things I’ve helped build.</h2>
                </div>
                <p class="section-aside">
                    Work that serves a purpose.<br />Projects that follow a
                    curiosity.
                </p>
            </div>
            <div class="project-list">
                {#each projects as project, index (project.name)}
                    <article class="project-row" use:enter>
                        <span class="project-number" aria-hidden="true"
                            >{String(index + 1).padStart(2, "0")}</span
                        >
                        <span class="project-identity"
                            ><span class="project-category"
                                >{project.category}</span
                            ><span class="project-title">{project.name}</span
                            ><span class="project-role">{project.role}</span
                            ></span
                        >
                        <span class="project-description"
                            >{project.description}<span class="project-stack"
                                >{project.stack.slice(0, 3).join(" / ")}</span
                            ></span
                        >
                        {#if project.url}
                            <a
                                class="project-link"
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                use:hoverSound
                                onclick={() => sound.play("confirm")}
                                aria-label={`Visit ${project.name}`}
                                >Visit <span aria-hidden="true">↗</span></a
                            >
                        {:else}
                            <span class="project-private">Private</span>
                        {/if}
                    </article>
                {/each}
            </div>
        </section>

        <section
            id="tile-experience"
            class="path-section"
            aria-labelledby="path-title"
        >
            <div class="section-intro">
                <p class="eyebrow">Along the way</p>
                <h2 id="path-title">My path into<br />engineering.</h2>
                <p class="muted path-note">
                    Financial systems, production work, and the people who rely
                    on both.
                </p>
            </div>
            <div>
                <ol class="career-list">
                    {#each experience as job (job.company)}
                        <li>
                            <p class="period">{job.period}</p>
                            <h3>{job.role}</h3>
                            <p class="company">{job.company}</p>
                            <details class="career-details">
                                <summary>{job.disclosureLabel}</summary>
                                {#each job.categories as category}
                                    <h4>{category.title}</h4>
                                    <ul>
                                        {#each category.bullets as bullet}<li>
                                                {bullet.text}
                                            </li>{/each}
                                    </ul>
                                {/each}
                            </details>
                        </li>
                    {/each}
                </ol>
                <div id="tile-education" class="education-list">
                    <div class="education-group">
                        <h3>Education</h3>
                        {#each academicEducation as item}<p>
                                {item.degree}<span
                                    >{item.major} · {item.school} · {item.period}</span
                                >
                            </p>{/each}
                    </div>
                    <div class="education-group">
                        <h3>Certifications</h3>
                        {#each certifications as item}<p>
                                {item.degree}<span
                                    >{item.school} · {item.period}</span
                                >
                            </p>{/each}
                    </div>
                </div>
            </div>
        </section>

        <section
            id="tile-skills"
            class="tools-section"
            aria-labelledby="tools-title"
        >
            <div>
                <p class="eyebrow">In the toolkit</p>
                <h2 id="tools-title">What I work with.</h2>
            </div>
            <dl class="tools-list">
                {#each Object.entries(skills) as [group, entries]}<div>
                        <dt>{group}</dt>
                        <dd>
                            {entries.map((entry) => entry.name).join(" · ")}
                        </dd>
                    </div>{/each}
            </dl>
        </section>

        <section class="lately-section" aria-labelledby="lately-title">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Still figuring things out</p>
                    <h2 id="lately-title">On my desk lately.</h2>
                </div>
            </div>
            <div class="lately-columns">
                <div class="learning-note">
                    <h3>Learning AWS by building here.</h3>
                    <p>
                        I’m using this portfolio to explore AWS services. GitHub
                        activity gives me a real feature to work with as I
                        learn.
                    </p>
                    <a
                        class="text-link"
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        use:hoverSound
                        onclick={() => sound.play("confirm")}
                        >Find me on GitHub ↗</a
                    >
                </div>
                <div id="tile-github"><CurrentlyBuilding {pulse} /></div>
            </div>
        </section>

        <section
            id="contact"
            class="contact-section"
            aria-labelledby="contact-title"
        >
            <div class="contact-copy" use:enter>
                <p class="eyebrow">Thanks for stopping by</p>
                <h2 id="contact-title">Something on your mind?</h2>
                <p>
                    A role, a project, or a shared interest. I’d like to hear
                    about it.
                </p>
                <a
                    class="contact-email"
                    href={emailHref}
                    use:hoverSound
                    onclick={() => sound.play("confirm")}
                    >Let’s talk <span aria-hidden="true">↗</span></a
                >
            </div>
            <div class="contact-location" use:enter={100}>
                <LocationGlobe />
            </div>
        </section>
    </main>
    <footer>
        <span
            >Lowie Dave Dichoson <span class="muted"
                >© {new Date().getFullYear()}</span
            ></span
        >
        <div>
            <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer">LinkedIn ↗</a
            ><a href="#tile-hero">Back to top ↑</a>
        </div>
    </footer>
</div>

<style>
    .story-site {
        position: relative;
        z-index: 1;
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 clamp(22px, 5vw, 64px);
    }
    .intro-copy,
    .about-copy,
    .path-section > div,
    .lately-columns > div {
        min-width: 0;
    }
    .story-site :global([id]) {
        scroll-margin-top: 32px;
    }
    .story-site :global(a:focus-visible),
    .story-site :global(button:focus-visible),
    .story-site :global(summary:focus-visible) {
        outline: 2px solid var(--ios-blue);
        outline-offset: 6px;
        border-radius: 4px;
    }
    .skip-link {
        position: absolute;
        top: 8px;
        left: 8px;
        transform: translateY(-160%);
        z-index: 20;
        background: var(--ios-bg);
        padding: 12px;
    }
    .skip-link:focus {
        transform: none;
    }
    .site-header {
        display: flex;
        align-items: center;
        gap: 26px;
        padding: 26px 0;
        border-bottom: 1px solid var(--ios-glass-border);
    }
    .header-controls {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .wordmark {
        margin-right: auto;
        font-size: 1.7rem;
        font-weight: 800;
        letter-spacing: -0.08em;
        text-decoration: none;
    }
    .wordmark span {
        color: var(--ios-blue);
    }
    nav {
        display: flex;
        gap: clamp(14px, 3vw, 32px);
        font-size: 0.82rem;
    }
    nav a,
    footer a {
        text-decoration: none;
        color: var(--ios-text-secondary);
    }
    nav a:hover,
    footer a:hover {
        color: var(--ios-blue);
    }
    .introduction {
        display: grid;
        grid-template-columns: 0.8fr 1.35fr;
        grid-template-areas: "portrait introduction";
        align-items: center;
        gap: clamp(32px, 5vw, 72px);
        padding: clamp(60px, 9vw, 112px) 0 clamp(64px, 9vw, 110px);
    }
    .intro-copy {
        grid-area: introduction;
    }
    .eyebrow {
        color: var(--ios-blue);
        font-size: 0.7rem;
        font-weight: 650;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
    h1 {
        font-size: clamp(2.9rem, 5.3vw, 4.6rem);
        line-height: 1.08;
        letter-spacing: -0.055em;
        font-weight: 750;
        margin: 23px 0;
    }
    h1 span {
        color: var(--ios-text-secondary);
    }
    .intro-description {
        font-size: clamp(1rem, 1.55vw, 1.12rem);
        line-height: 1.75;
        max-width: 43ch;
    }
    .muted,
    .intro-footnote {
        color: var(--ios-text-secondary);
    }
    .intro-footnote {
        font-size: 0.84rem;
        line-height: 1.7;
        max-width: 48ch;
        margin-top: 18px;
    }
    .intro-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 24px;
        margin-top: 30px;
    }
    .primary-link {
        display: inline-flex;
        align-items: center;
        gap: 16px;
        padding: 13px 18px;
        border-radius: 999px;
        color: var(--ios-bg);
        background: var(--ios-blue);
        font-size: 0.8rem;
        font-weight: 650;
        text-decoration: none;
    }
    .primary-link:hover {
        background: var(--ios-blue-hover);
    }
    .text-link {
        font-size: 0.8rem;
        color: var(--ios-text-primary);
        text-underline-offset: 5px;
    }
    .portrait {
        min-width: 0;
        grid-area: portrait;
    }
    .portrait-image {
        display: block;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        border-radius: 28px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-glass-border);
    }
    .portrait-image :global(.portrait-canvas) {
        height: 100%;
        width: 100%;
    }
    .portrait img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 38% 100%;
        display: block;
        transform: scale(1.6);
        transform-origin: 38% 100%;
        filter: brightness(1.08);
    }
    figcaption {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 16px;
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
    }
    .small-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--lowie-warm);
    }
    h2 {
        font-size: clamp(1.8rem, 3.1vw, 2.65rem);
        font-weight: 700;
        line-height: 1.16;
        letter-spacing: -0.04em;
        margin-top: 12px;
    }
    .about-section,
    .path-section,
    .tools-section {
        display: grid;
        grid-template-columns: 0.8fr 1.35fr;
        gap: clamp(32px, 7vw, 90px);
        padding: clamp(44px, 7vw, 80px) 0;
        border-top: 1px solid var(--ios-glass-border);
    }
    .draft-label {
        display: inline-block;
        color: var(--ios-text-secondary);
        border: 1px dashed var(--ios-glass-border);
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 0.68rem;
        margin-bottom: 14px;
    }
    .personal-note {
        font-size: clamp(1.05rem, 1.8vw, 1.3rem);
        line-height: 1.8;
        max-width: 48ch;
    }
    .personal-details {
        display: flex;
        flex-wrap: wrap;
        gap: 24px 60px;
        margin-top: 30px;
    }
    .personal-details dt {
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
        margin-bottom: 8px;
    }
    .personal-details dd {
        font-size: 0.88rem;
        line-height: 1.7;
    }
    .work-section,
    .lately-section {
        padding: clamp(44px, 7vw, 80px) 0;
        border-top: 1px solid var(--ios-glass-border);
    }
    .section-heading {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 28px;
        margin-bottom: 36px;
    }
    .section-aside {
        font-size: 0.78rem;
        line-height: 1.7;
        color: var(--ios-text-secondary);
    }
    .project-row {
        display: grid;
        grid-template-columns: 26px 1fr 1.1fr 58px;
        gap: 24px;
        align-items: start;
        width: 100%;
        padding: 30px 8px;
        border-top: 1px solid var(--ios-glass-border);
        transition: background 0.2s ease-out;
    }
    .project-row:hover {
        background: var(--ios-chip-bg);
    }
    .primary-link {
        transition:
            transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
            background-color 180ms ease-out;
    }
    .primary-link:hover {
        transform: translateY(-2px);
    }
    .primary-link:active {
        transform: translateY(0) scale(0.98);
    }
    .text-link,
    .contact-email {
        transition: color 180ms ease-out;
    }
    .text-link:hover,
    .contact-email:hover {
        color: var(--ios-blue-hover);
    }
    .project-number {
        font-size: 0.68rem;
        color: var(--ios-text-secondary);
        padding-top: 4px;
    }
    .project-identity,
    .project-description {
        display: block;
        min-width: 0;
    }
    .project-category {
        display: block;
        font-size: 0.66rem;
        color: var(--ios-blue);
        margin-bottom: 8px;
    }
    .project-title {
        display: block;
        font-size: clamp(1.15rem, 2vw, 1.5rem);
        font-weight: 650;
        letter-spacing: -0.025em;
    }
    .project-role {
        display: block;
        font-size: 0.73rem;
        margin-top: 6px;
        color: var(--ios-text-secondary);
    }
    .project-description {
        font-size: 0.86rem;
        line-height: 1.75;
        color: var(--ios-text-secondary);
    }
    .project-stack {
        display: block;
        margin-top: 12px;
        font-size: 0.68rem;
        color: var(--ios-blue);
    }
    .project-link,
    .project-private {
        justify-self: end;
        padding-top: 2px;
        font-size: 0.7rem;
    }
    .project-link {
        display: inline-flex;
        gap: 5px;
        color: var(--ios-blue);
        text-underline-offset: 5px;
    }
    .project-link span {
        transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .project-link:is(:hover, :focus-visible) span {
        transform: translate(2px, -2px);
    }
    .project-private {
        color: var(--ios-text-secondary);
    }
    .path-note {
        margin-top: 20px;
        font-size: 0.88rem;
        line-height: 1.8;
        max-width: 28ch;
    }
    .career-list > li {
        padding-bottom: 28px;
        margin-bottom: 28px;
        border-bottom: 1px solid var(--ios-glass-border);
    }
    .period {
        color: var(--ios-blue);
        font-size: 0.7rem;
        margin-bottom: 10px;
    }
    h3 {
        font-size: 1.1rem;
        font-weight: 650;
        line-height: 1.4;
    }
    .company {
        color: var(--ios-text-secondary);
        font-size: 0.88rem;
        margin-top: 5px;
    }
    .career-details {
        margin-top: 18px;
        font-size: 0.82rem;
        line-height: 1.8;
        color: var(--ios-text-secondary);
    }
    summary {
        cursor: pointer;
        width: fit-content;
        color: var(--ios-text-primary);
    }
    h4 {
        color: var(--ios-text-primary);
        margin-top: 20px;
        font-weight: 650;
    }
    .career-details ul {
        list-style: disc;
        padding-left: 18px;
    }
    .career-details li {
        margin-top: 9px;
    }
    .education-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: clamp(24px, 5vw, 56px);
    }
    .education-list h3 {
        font-size: 0.82rem;
        margin-bottom: 18px;
    }
    .education-list p {
        font-size: 0.83rem;
        margin-top: 14px;
    }
    .education-list span {
        display: block;
        font-size: 0.72rem;
        color: var(--ios-text-secondary);
        margin-top: 5px;
    }
    .tools-list > div {
        display: grid;
        grid-template-columns: 85px 1fr;
        gap: 16px;
        margin-bottom: 16px;
        font-size: 0.82rem;
        line-height: 1.8;
    }
    .tools-list dt {
        color: var(--ios-blue);
    }
    .tools-list dd {
        color: var(--ios-text-secondary);
    }
    .lately-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(28px, 6vw, 80px);
    }
    .learning-note > p {
        margin: 12px 0 18px;
        color: var(--ios-text-secondary);
        font-size: 0.88rem;
        line-height: 1.8;
        max-width: 48ch;
    }
    .contact-section {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
        align-items: center;
        gap: clamp(36px, 8vw, 100px);
        padding: clamp(48px, 8vw, 90px) 0;
        border-top: 1px solid var(--ios-glass-border);
    }
    .contact-copy > p:not(.eyebrow) {
        color: var(--ios-text-secondary);
        font-size: 0.9rem;
        margin-top: 18px;
        line-height: 1.7;
        max-width: 42ch;
    }
    .contact-email {
        display: inline-flex;
        gap: 36px;
        margin-top: 26px;
        font-size: 1.25rem;
        color: var(--ios-blue);
        text-underline-offset: 8px;
    }
    footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 24px;
        border-top: 1px solid var(--ios-glass-border);
        padding: 24px 0 34px;
        font-size: 0.7rem;
    }
    footer > span > span {
        margin-left: 10px;
    }
    footer > div {
        display: flex;
        gap: 22px;
    }
    @media (max-width: 760px) {
        .introduction {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "introduction" "portrait";
            gap: 36px;
            padding-top: 48px;
        }
        .intro-copy {
            max-width: 560px;
        }
        h1 {
            font-size: clamp(2.8rem, 9vw, 4.3rem);
        }
        .desktop-break {
            display: none;
        }
        .portrait {
            width: min(80%, 320px);
            justify-self: start;
        }
        .portrait-image {
            border-radius: 24px;
        }
        .about-section,
        .path-section,
        .tools-section {
            grid-template-columns: minmax(0, 1fr);
            gap: 28px;
        }
        .section-heading {
            display: block;
        }
        .section-aside {
            margin-top: 16px;
        }
        .project-row {
            grid-template-columns: 20px 1fr auto;
            gap: 12px;
            padding: 24px 0;
        }
        .project-description {
            grid-column: 2 / 4;
        }
        .project-link,
        .project-private {
            grid-column: 3;
            grid-row: 1;
        }
        .lately-columns {
            grid-template-columns: minmax(0, 1fr);
        }
        .contact-section {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
        }
        .contact-location {
            width: min(100%, 380px);
        }
        .path-note {
            max-width: 48ch;
        }
        .education-list {
            grid-template-columns: minmax(0, 1fr);
            gap: 32px;
        }
    }
    @media (max-width: 380px) {
        .site-header {
            gap: 12px;
        }
        nav {
            gap: 12px;
            font-size: 0.73rem;
        }
        .wordmark {
            font-size: 1.5rem;
        }
        .tools-list > div {
            grid-template-columns: 1fr;
            gap: 3px;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .project-row,
        .project-link span,
        .primary-link,
        .text-link,
        .contact-email {
            transition: none;
        }
        .project-link:is(:hover, :focus-visible) span,
        .primary-link:is(:hover, :active) {
            transform: none;
        }
    }
</style>
