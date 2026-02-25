<script lang="ts">
    import { experience } from "$lib/data/resume";
</script>

<section class="experience-section">
    <div class="page-container">
        <p class="section-title">Work Experience</p>

        {#each experience as job}
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
                {#each job.categories as category}
                    <div class="category glass-card">
                        <h3 class="category-title">{category.title}</h3>
                        <ul class="bullets">
                            {#each category.bullets as bullet}
                                <li class="bullet-item">
                                    <span class="bullet-dot"></span>
                                    <div class="bullet-content">
                                        <p class="bullet-text">{bullet.text}</p>
                                        {#if bullet.stack.length > 0}
                                            <div class="stack-row">
                                                {#each bullet.stack as tech}
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
        padding: 20px 24px;
    }

    .category-title {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ios-blue);
        margin-bottom: 14px;
        opacity: 0.85;
    }

    .bullets {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 14px;
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
