<script lang="ts">
    import { education } from "$lib/data/resume";
</script>

<section class="education-section">
    <div class="page-container">
        <p class="section-title">Education & Certification</p>
        <div class="edu-grid">
            {#each education as item}
                <div class="edu-card glass-card">
                    <span class="edu-icon">{item.icon}</span>
                    <div class="edu-info">
                        <h3 class="edu-degree">{item.degree}</h3>
                        <p class="edu-major">{item.major}</p>
                        <p class="edu-school">{item.school}</p>
                    </div>
                    <span class="edu-period">{item.period}</span>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .education-section {
        padding: 0 0 32px;
    }

    .edu-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .edu-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 18px 24px;
    }

    .edu-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .edu-info {
        flex: 1;
    }

    .edu-degree {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--ios-text-primary);
        margin-bottom: 2px;
    }

    .edu-major {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--ios-blue);
        margin-bottom: 2px;
    }

    .edu-school {
        font-size: 0.75rem;
        color: var(--ios-text-secondary);
    }

    .edu-period {
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--ios-text-secondary);
        white-space: nowrap;
        padding: 3px 10px;
        background: var(--ios-chip-bg);
        border: 1px solid var(--ios-chip-border);
        border-radius: 100px;
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        .edu-card {
            flex-wrap: wrap;
        }

        .edu-period {
            margin-left: auto;
        }
    }
</style>
