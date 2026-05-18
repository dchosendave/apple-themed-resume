<script lang="ts">
    import { projects } from "$lib/data/projects";
    import PortfolioCard from "$lib/components/portfolio/shared/PortfolioCard.svelte";
    import ProjectCard from "$lib/components/portfolio/projects/ProjectCard.svelte";
    import ProjectDrawer from "$lib/components/portfolio/projects/ProjectDrawer.svelte";
    import type { Project } from "$lib/types/project";
    import { WeightWave } from "$lib/motion-core";

    let selectedProject = $state<Project | null>(null);
</script>

<PortfolioCard class="lowie-card-glow overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <div class="mb-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
            <p class="apple-section-title mb-1">
                <WeightWave baseWeight={600} hoverWeight={800} influenceRadius={4}>Case Files</WeightWave>
            </p>
            <p class="max-w-[44ch] text-[0.76rem] leading-[1.5] [color:var(--ios-text-secondary)]">
                Production systems and personal builds, framed by problem, ownership, and impact.
            </p>
        </div>
        <span class="apple-chip shrink-0 px-2.5 py-1 text-[0.66rem]">
            {projects.length} files
        </span>
    </div>

    <div class="grid grid-cols-1 gap-3 min-[901px]:grid-cols-2">
        {#each projects as project (project.name)}
            <ProjectCard {project} onselect={(p) => (selectedProject = p)} />
        {/each}
    </div>
</PortfolioCard>

<ProjectDrawer project={selectedProject} onclose={() => (selectedProject = null)} />
