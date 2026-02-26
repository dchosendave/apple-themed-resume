<script lang="ts">
    import { slide } from "svelte/transition";
    import { experience } from "$lib/data/resume";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";

    // Build a flat array of open states indexed by [jobIdx][catIdx].
    // First category of first job starts expanded.
    let open: boolean[][] = $state(
        experience.map((job) => job.categories.map(() => true)),
    );

    function toggle(ji: number, ci: number) {
        open[ji][ci] = !open[ji][ci];
    }
</script>

<section class="experience-section">
    <div class="page-container">
        <p class="section-title">Work Experience</p>

        {#each experience as job, ji (job.company)}
            <div class="job-header glass-card">
                <div class="job-title-row">
                    <div>
                        <h2 class="company">{job.company}</h2>
                        <p class="role">{job.role}</p>
                    </div>
                    <span class="period">{job.period}</span>
                </div>
            </div>

            <div class="categories">
                {#each job.categories as category, ci (category.title)}
                    <div class="category glass-card">
                        <!-- Always-visible accordion header -->
                        <button
                            class="category-toggle"
                            onclick={() => toggle(ji, ci)}
                            aria-expanded={open[ji][ci]}
                        >
                            <h3 class="category-title">{category.title}</h3>
                            <ChevronDown
                                size={15}
                                class="chevron {open[ji][ci]
                                    ? 'chevron-up'
                                    : ''}"
                            />
                        </button>

                        {#if open[ji][ci]}
                            <ul
                                class="bullets"
                                transition:slide={{ duration: 240 }}
                            >
                                {#each category.bullets as bullet (bullet.text)}
                                    <li class="bullet-item">
                                        <span class="bullet-dot"></span>
                                        <div class="bullet-content">
                                            <p class="bullet-text">
                                                {bullet.text}
                                            </p>
                                            {#if bullet.stack.length > 0}
                                                <div class="stack-row">
                                                    {#each bullet.stack as tech (tech)}
                                                        <span class="stack-chip"
                                                            >{tech}</span
                                                        >
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
</section>

<style>
    .experience-section {
        padding: 0 0 32px;
    }

    .job-header {
        padding: 20px 24px;
        margin-bottom: 12px;
    }

    .job-title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }

    .company {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--ios-text-primary);
        margin-bottom: 2px;
    }

    .role {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--ios-blue);
    }

    .period {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 4px 10px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        flex-shrink: 0;
    }

    .categories {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 10px;
    }

    .category {
        padding: 0;
        overflow: hidden;
    }

    /* Accordion toggle row */
    .category-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 16px 24px;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        gap: 12px;
    }

    .category-toggle:hover .category-title {
        color: var(--ios-blue);
        opacity: 1;
    }

    .category-title {
        font-size: 0.75rem;
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
        gap: 14px;
        padding: 0 24px 20px;
        border-top: 1px solid var(--ios-separator);
        padding-top: 16px;
    }

    .bullet-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }

    .bullet-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--ios-blue);
        flex-shrink: 0;
        margin-top: 7px;
        opacity: 0.7;
    }

    .bullet-content {
        flex: 1;
    }

    .bullet-text {
        font-size: 0.85rem;
        line-height: 1.65;
        color: var(--ios-text-primary);
        margin-bottom: 8px;
    }

    .stack-row {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .stack-chip {
        display: inline-flex;
        padding: 2px 9px;
        border-radius: 100px;
        background: var(--ios-stat-bg);
        border: 1px solid color-mix(in srgb, var(--ios-blue) 25%, transparent);
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--ios-blue);
        letter-spacing: 0.02em;
    }

    @media (max-width: 600px) {
        .job-title-row {
            flex-direction: column;
        }
    }
</style>
