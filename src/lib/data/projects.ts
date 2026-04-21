import type { Project } from "$lib/types/project";

export const projects: Project[] = [
    {
        name: "PEMI ClientEase",
        description: "Self-service investor portal automating account creation and updates — replaced manual back-office workflows.",
        category: "Client-Facing",
        stack: ["Angular", ".NET Web API", "PostgreSQL", "QuestPDF"],
        url: "https://www.philequity.net/portal/",
        problem: "Investor account creation and updates were handled entirely through manual back-office operations, creating bottlenecks, delays, and a high risk of data entry errors.",
        solution: "Built a full-stack self-service portal end-to-end — sole developer on backend API design, data modeling, business logic, frontend integration, and PDF report generation using QuestPDF.",
        impact: "Fully replaced manual back-office workflows for investor account management. Live in production at Philequity, serving real investors."
    },
    {
        name: "LOI Generator",
        description: "Automated Letter of Intent generation from database records — improved accuracy for an 8-person department.",
        category: "Internal Tool",
        stack: ["Alpine.js", "ASP.NET MVC", "Oracle SQL", "RDLC"],
        problem: "An 8-person operations team manually drafted Letters of Intent, cross-checking transaction records from a legacy Oracle database — a slow, error-prone process prone to discrepancies.",
        solution: "Designed and built an in-house system integrated with the legacy Oracle database that automates transaction counter-checks, approval validation, and LOI document generation.",
        impact: "Eliminated manual LOI drafting for the team, improving accuracy and reducing turnaround time on a daily operational workflow."
    },
    {
        name: "Report Generator",
        description: "Centralized IAM module with RBAC and dynamic permissions — replaced manual SQL-based user provisioning.",
        category: "Internal Tool",
        stack: ["HTML/CSS/jQuery", "ASP.NET Web Forms", "MS SQL", "RDLC"],
        problem: "User access to internal reports was managed ad hoc via direct SQL changes, with no centralized interface for provisioning, role assignment, or password management.",
        solution: "Designed and implemented core access-control modules including user account management, RBAC, password recovery and enforcement, and dynamic role-driven navigation.",
        impact: "Replaced fragile manual SQL-based provisioning with a proper IAM system, improving security posture and reducing admin overhead for the internal reporting platform."
    },
    {
        name: "Dave Delivers",
        description: "Experimental macOS-inspired portfolio with CLI, desktop sim, and interactive easter eggs.",
        category: "Personal",
        stack: ["SvelteKit", "Turso SQLite", "TailwindCSS"],
        url: "https://dave-delivers.vercel.app/",
        problem: "A static PDF resume doesn't reflect how a developer actually thinks or builds. Wanted a portfolio that itself demonstrates frontend craft, creativity, and product sensibility.",
        solution: "Built a macOS-inspired interactive portfolio with a simulated desktop environment, a working CLI interface, easter eggs, and a persistent SQLite backend via Turso.",
        impact: "A living showcase of skills beyond what a resume communicates — used as a conversation starter in job applications and technical interviews."
    }
];