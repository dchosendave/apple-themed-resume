<script lang="ts">
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import { projects } from "$lib/data/projects";
    import ProjectDrawer from "$lib/components/portfolio/projects/ProjectDrawer.svelte";
    import type { Project } from "$lib/types/project";
    let selectedProject = $state<Project | null>(null);

    const questions = [
        { question: "What backend work have you owned?", names: ["PEMI ClientEase"], answer: "For PEMI ClientEase, I owned backend API design, data modeling, business logic, frontend integration, and PDF reporting. The investor portal replaced manual account workflows." },
        { question: "How have you improved day-to-day operations?", names: ["LOI Generator", "Report Generator"], answer: "I automated Letter of Intent generation for an eight-person operations team and built access-control modules that replaced direct SQL provisioning with application-managed roles and permissions." },
        { question: "What do you build outside work?", names: ["Dave Delivers", "Algorithm Visualized"], answer: "I explore interactive frontend experiences through my portfolio and algorithm visualizations. This portfolio is also where I am learning AWS through a working GitHub activity integration." },
    ];
</script>

<PortfolioCard class="px-[18px] py-5 sm:px-6">
    <section aria-labelledby="experience-guide-title">
        <p class="apple-section-title">A few good questions</p>
        <h2 id="experience-guide-title" class="text-xl font-bold tracking-tight">Explore my experience</h2>
        <p class="mt-2 text-sm [color:var(--ios-text-secondary)]">Short answers, with the work behind them.</p>
        <div class="mt-5">
            {#each questions as item}
                <details class="border-t py-4 [border-color:var(--ios-glass-border)]">
                    <summary class="cursor-pointer rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ios-blue)]">{item.question}</summary>
                    <p class="mt-3 max-w-[65ch] text-sm leading-relaxed [color:var(--ios-text-secondary)]">{item.answer}</p>
                    <ul class="mt-3 flex flex-wrap gap-2" aria-label="Related projects">
                        {#each projects.filter((project) => item.names.includes(project.name)) as project}
                            <li><button type="button" class="apple-chip inline-flex cursor-pointer px-3 py-2 text-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ios-blue)]" onclick={() => selectedProject = project}>{project.name}</button></li>
                        {/each}
                    </ul>
                </details>
            {/each}
        </div>
    </section>
</PortfolioCard>

<ProjectDrawer project={selectedProject} onclose={() => selectedProject = null} />
