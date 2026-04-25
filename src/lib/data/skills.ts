import type { Skill } from "$lib/types/skill";

export const skills: Record<string, Skill[]> = {
    Backend: [
        { name: "C#", level: "expert" },
        { name: ".NET", level: "expert" },
        { name: "Node.js", level: "proficient" },
        { name: "VB.NET", level: "proficient" },
        { name: "PHP", level: "familiar" }
    ],
    Frontend: [
        { name: "JavaScript", level: "proficient" },
        { name: "TypeScript", level: "proficient" },
        { name: "Angular", level: "proficient" },
        { name: "SvelteKit", level: "familiar" },
        { name: "Alpine.js", level: "familiar" },
        { name: "jQuery", level: "proficient" }
    ],
    Databases: [
        { name: "MS SQL", level: "expert" },
        { name: "PostgreSQL", level: "proficient" },
        { name: "Oracle SQL", level: "proficient" },
        { name: "MySQL", level: "familiar" }
    ],
    Tooling: [
        { name: "Git", level: "proficient" },
        { name: "GitHub", level: "proficient" },
        { name: "Postman", level: "proficient" },
        { name: "QuestPDF", level: "proficient" },
        { name: "RDLC", level: "proficient" },
        { name: "Docker", level: "expert" },
        { name: "Production Support", level: "expert" }
    ]
};