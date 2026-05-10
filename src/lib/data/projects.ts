import type { Project } from "$lib/types/project";

export const projects: Project[] = [
    {
        name: "PEMI ClientEase",
        description:
            "Self-service investor portal that replaced manual back-office account creation and update workflows.",
        category: "Client-Facing",
        signal: "Live investor portal",
        role: "Backend owner",
        stack: ["Angular", ".NET Web API", "PostgreSQL", "QuestPDF"],
        url: "https://www.philequity.net/portal/",
        problem:
            "Investor account creation and updates were handled through manual back-office operations, creating bottlenecks, delays, and a high risk of data entry errors.",
        solution:
            "Built a full-stack self-service portal. I owned backend API design, data modeling, business logic, frontend integration, and PDF report generation using QuestPDF.",
        impact:
            "Replaced manual back-office workflows for investor account management. Live in production at Philequity, serving real investors.",
    },
    {
        name: "LOI Generator",
        description:
            "Automated Letter of Intent generation from database records for an 8-person operations team.",
        category: "Internal Tool",
        signal: "Daily ops workflow",
        role: "Full-stack builder",
        stack: ["Alpine.js", "ASP.NET MVC", "Oracle SQL", "RDLC"],
        problem:
            "An 8-person operations team manually drafted Letters of Intent and cross-checked transaction records from a legacy Oracle database, which made the workflow slow and discrepancy-prone.",
        solution:
            "Designed and built an in-house system integrated with the legacy Oracle database that automates transaction checks, approval validation, and LOI document generation.",
        impact:
            "Removed manual LOI drafting from the team's daily workflow and made transaction validation reproducible.",
    },
    {
        name: "Report Generator",
        description:
            "Centralized IAM module with RBAC and dynamic permissions, replacing manual SQL-based provisioning.",
        category: "Internal Tool",
        signal: "Access control repair",
        role: "Module owner",
        stack: ["HTML/CSS/jQuery", "ASP.NET Web Forms", "MS SQL", "RDLC"],
        problem:
            "User access to internal reports was managed ad hoc through direct SQL changes, with no centralized interface for provisioning, role assignment, or password management.",
        solution:
            "Designed and implemented core access-control modules including user account management, RBAC, password recovery and enforcement, and dynamic role-driven navigation.",
        impact:
            "Replaced ad-hoc SQL provisioning with a reviewable IAM workflow. Role assignments, password rules, and access changes now happen through the application instead of direct database edits.",
    },
    {
        name: "Dave Delivers",
        description:
            "Experimental macOS-inspired portfolio with CLI, desktop sim, and interactive easter eggs.",
        category: "Personal",
        signal: "Craft showcase",
        role: "Product-minded build",
        stack: ["SvelteKit", "Turso SQLite", "TailwindCSS"],
        url: "https://dave-delivers.vercel.app/",
        problem:
            "A static PDF resume does not reflect how a developer actually thinks or builds. I wanted a portfolio that demonstrates frontend craft, creativity, and product sensibility.",
        solution:
            "Built a macOS-inspired interactive portfolio with a simulated desktop environment, a working CLI interface, easter eggs, and a persistent SQLite backend via Turso.",
        impact:
            "A living showcase of frontend craft beyond what a static resume can communicate, used as a conversation starter in job applications and interviews.",
    },
    {
        name: "Algorithm Visualized",
        description: "A web app that visualizes common algorithms and data structures with interactive demos.",
        category: "Personal",
        signal: "Craft showcase",
        role: "Software Developer",
        stack: ["React", "TailwindCSS"],
        url: "https://github.com/dchosendave/algorithm-visualized",
    }
];
