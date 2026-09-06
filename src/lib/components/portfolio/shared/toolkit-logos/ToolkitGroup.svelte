<script lang="ts">
    import { skills } from "$lib/data/skills";
    import ToolkitLogo from "./ToolkitLogo.svelte";

    let { group }: { group: string } = $props();
    const icons: Record<string, string> = {
        "JavaScript": "javascript", "TypeScript": "typescript", "Angular": "angular",
        "Svelte": "svelte", "Alpine.js": "alpinejs", "jQuery": "jquery",
        "C#": "csharp", ".NET": "dotnetcore", "Node.js": "nodejs",
        "VB.NET": "dotnetcore", "PHP": "php", "MS SQL": "microsoftsqlserver",
        "PostgreSQL": "postgresql", "Oracle SQL": "oracle", "MySQL": "mysql",
        "Cloud Firestore": "firebase",
        "Git": "git", "GitHub": "github", "Docker": "docker", "Postman": "postman",
    };
</script>

<div class="group">
    <p>{group}</p>
    <div class="grid">
        {#each skills[group] as skill (skill.name)}
            <ToolkitLogo name={skill.name} icon={icons[skill.name]} />
        {/each}
    </div>
</div>

<style>
    .group { width: 100%; padding: 16px 0; }
    p { margin-bottom: 18px; font-size: 0.72rem; font-weight: 600; color: var(--ios-blue); }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px 8px; }
</style>
