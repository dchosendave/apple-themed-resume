import type { Project } from "$lib/types/project";

export const projects: Project[] = [
    {
        name: "Philequity ClientEase",
        description:
            "Digital investor onboarding, giving new investors an alternative to delivering paper forms or visiting the head office.",
        category: "Client-Facing",
        role: "Backend owner",
        stack: ["Angular", ".NET Web API", "PostgreSQL", "QuestPDF"],
        url: "https://www.philequity.net/portal/",
    },
    {
        name: "LOI Generator",
        description:
            "Automated Letter of Intent generation from database records for an 8-person operations team.",
        category: "Internal Tool",
        role: "Full-stack builder",
        stack: ["Alpine.js", "ASP.NET MVC", "Oracle SQL", "RDLC"],
    },
    {
        name: "Report Generator",
        description:
            "Centralized IAM module with RBAC and dynamic permissions, replacing manual SQL-based provisioning.",
        category: "Internal Tool",
        role: "Module owner",
        stack: ["HTML/CSS/jQuery", "ASP.NET Web Forms", "MS SQL", "RDLC"],
    },
    {
        name: "Dave Delivers",
        description:
            "Experimental macOS-inspired portfolio with CLI, desktop sim, and interactive easter eggs.",
        category: "Personal",
        role: "Product-minded build",
        stack: ["SvelteKit", "Turso SQLite", "TailwindCSS"],
        url: "https://dave-delivers.vercel.app/",
    },
    {
        name: "Hamin Macro Recorder",
        description:
            "A Windows desktop app for building, recording, and triggering skill and potion combos in MU Online.",
        category: "Personal",
        role: "Creator",
        stack: ["Tauri 2", "React 19", "TypeScript", "Rust"],
        url: "https://github.com/dchosendave/combo-macro-recorder/releases",
    },
    {
        name: "Algorithm Visualized",
        description: "A web app that visualizes common algorithms and data structures with interactive demos.",
        category: "Personal",
        role: "Software Developer",
        stack: ["React", "TailwindCSS"],
        url: "https://github.com/dchosendave/algorithm-visualized",
    }
];
