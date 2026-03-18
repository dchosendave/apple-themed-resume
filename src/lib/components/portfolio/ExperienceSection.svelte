<script lang="ts">
    import { slide } from "svelte/transition";
    import { experience } from "$lib/data/resume";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { reveal } from "$lib/actions/reveal";
    import { getIcon } from "$lib/utils/techIcons";

    // All categories start collapsed to keep the tile compact
    let open: boolean[][] = $state(
        experience.map((job) => job.categories.map(() => false)),
    );

    function toggle(ji: number, ci: number) {
        open[ji][ci] = !open[ji][ci];
    }
</script>

<div class="experience-tile glass-card bento-tile" use:reveal>
    <p class="section-title">Work Experience</p>

    {#each experience as job, ji (job.company)}
        <!-- Inline job header -->
        <div class="job-header">
            <div class="job-info">
                <h2 class="company">{job.company}</h2>
                <span class="role">{job.role}</span>
                {#if job.highlights && job.highlights.length > 0}
                    <div class="highlights-row">
                        {#each job.highlights as highlight}
                            <span class="highlight-chip">{highlight}</span>
                        {/each}
                    </div>
                {/if}
            </div>
            <span class="period">{job.period}</span>
        </div>

        <div class="categories">
            {#each job.categories as category, ci (category.title)}
                <div class="category glass-card-inner">
                    <button
                        class="category-toggle"
                        onclick={() => toggle(ji, ci)}
                        aria-expanded={open[ji][ci]}
                    >
                        <h3 class="category-title">{category.title}</h3>
                        <ChevronDown
                            size={14}
                            class="chevron {open[ji][ci] ? 'chevron-up' : ''}"
                        />
                    </button>

                    {#if open[ji][ci]}
                        <ul class="bullets" transition:slide={{ duration: 200 }}>
                            {#each category.bullets as bullet (bullet.text)}
                                <li class="bullet-item">
                                    <span class="bullet-dot"></span>
                                    <div class="bullet-content">
                                        <p class="bullet-text">{bullet.text}</p>
                                        {#if bullet.stack.length > 0}
                                            <div class="stack-row">
                                                {#each bullet.stack as tech (tech)}
                                                    {@const icon = getIcon(tech)}
                                                    <span class="stack-chip">
                                                        {#if icon}
                                                            <img src={icon} alt={tech} class="tech-icon" />
                                                        {/if}
                                                        {tech}
                                                    </span>
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .experience-tile {
        padding: 18px 22px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .job-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--ios-separator);
    }

    .job-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .company {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--ios-text-primary);
    }

    .role {
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--ios-blue);
    }

    .period {
        font-size: 0.68rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 3px 9px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        flex-shrink: 0;
    }

    .highlights-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 6px;
    }

    .highlight-chip {
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--ios-text-secondary);
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        padding: 2px 8px;
    }

    .categories {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .category {
        overflow: hidden;
    }

    .category-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px 14px;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        gap: 8px;
    }

    .category-toggle:hover .category-title {
        color: var(--ios-blue);
        opacity: 1;
    }

    .category-title {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ios-blue);
        opacity: 0.85;
        transition: opacity 0.15s ease;
        margin: 0;
    }

    :global(.chevron) {
        color: var(--ios-text-secondary);
        flex-shrink: 0;
        transition: transform 0.25s ease;
    }

    :global(.chevron-up) {
        transform: rotate(180deg);
    }

    .bullets {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0 14px 14px;
        border-top: 1px solid var(--ios-separator);
        padding-top: 10px;
    }

    .bullet-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }

    .bullet-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--ios-blue);
        flex-shrink: 0;
        margin-top: 6px;
        opacity: 0.7;
    }

    .bullet-content {
        flex: 1;
    }

    .bullet-text {
        font-size: 0.78rem;
        line-height: 1.55;
        color: var(--ios-text-primary);
        margin-bottom: 6px;
    }

    .stack-row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .stack-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 100px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        font-size: 0.65rem;
        font-weight: 600;
        color: var(--ios-blue);
        letter-spacing: 0.02em;
    }

    .tech-icon {
        width: 12px;
        height: 12px;
        object-fit: contain;
        flex-shrink: 0;
        display: block;
    }

    @media (max-width: 600px) {
        .job-header {
            flex-direction: column;
        }
    }
</style>
