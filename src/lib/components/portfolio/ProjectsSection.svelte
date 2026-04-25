<script lang="ts">
    import { projects } from "$lib/data/projects";
    import PortfolioCard from "./PortfolioCard.svelte";
    import ProjectCard from "./ProjectCard.svelte";
    import ProjectDrawer from "$lib/components/portfolio/ProjectDrawer.svelte";
    import type { Project } from "$lib/types/project";

    let selectedProject = $state<Project | null>(null);
</script>

<PortfolioCard class="overflow-hidden px-[18px] py-5 sm:px-6 sm:py-[22px]">
    <p
        class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] [color:var(--ios-blue)]"
    >
        Product Case Files
    </p>

    <div class="grid grid-cols-1 gap-3 min-[901px]:grid-cols-2">
        {#each projects as project (project.name)}
            <ProjectCard {project} onselect={(nextProject) => selectedProject = nextProject} />
        {/each}
    </div>
</PortfolioCard>

<ProjectDrawer project={selectedProject} onclose={() => selectedProject = null} />
