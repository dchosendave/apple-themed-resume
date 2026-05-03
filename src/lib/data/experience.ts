import type { Experience } from "$lib/types/experience";

export const experience: Experience[] = [
    {
        company: "Vantage Financial Corporation",
        role: "Analyst Programmer",
        period: "Aug 2023 - Present",
        highlights: [
            "Solo Backend Developer",
            "Financial Systems",
            "Cross-team Liaison",
        ],
        categories: [
            {
                title: "System Development",
                tabTitle: "Development",
                bullets: [
                    {
                        text: "Owned backend delivery for a client-facing investor portal, including data modeling, API design, business logic, frontend integration, and PDF report generation.",
                        stack: [
                            "Angular",
                            ".NET Web API",
                            "PostgreSQL",
                            "QuestPDF",
                        ],
                    },
                    {
                        text: "Built an internal tool on top of a legacy Oracle database, automating transaction checks and approval validation for an 8-person operations workflow.",
                        stack: [
                            "Alpine.js",
                            "ASP.NET MVC",
                            "Oracle SQL",
                            "RDLC",
                        ],
                    },
                    {
                        text: "Implemented access-control modules for an internal reporting system, including user management, RBAC, password recovery, password policy enforcement, and role-driven navigation.",
                        stack: [
                            "HTML/CSS/jQuery",
                            "ASP.NET Web Forms",
                            "MS SQL",
                            "RDLC",
                        ],
                    },
                ],
            },
            {
                title: "Data Management",
                tabTitle: "Data",
                bullets: [
                    {
                        text: "Resolved a data type issue in transaction archiving, enabling 3M+ records from 2021 to 2024 to move from production to archive safely.",
                        stack: ["MS SQL"],
                    },
                    {
                        text: "Added audit logging across rollback, retrieval, processing, and settlement flows, with soft deletion for traceability and root-cause analysis.",
                        stack: ["ASP.NET Web Forms", "VB.NET", "MS SQL"],
                    },
                ],
            },
            {
                title: "Production Support",
                tabTitle: "Support",
                bullets: [
                    {
                        text: "Maintained 4 legacy production systems while designing 1 internal web app and building the backend API and schema for 1 client-facing application.",
                        stack: [],
                    },
                    {
                        text: "Maintained continuous delivery with 60+ production deployments over roughly 2 years, including new rollouts, enhancements, and fixes.",
                        stack: [],
                    },
                ],
            },
            {
                title: "System Analysis",
                tabTitle: "Analysis",
                bullets: [
                    {
                        text: "Translated requirements across settlement, accounting, sales, and operations into technical specifications and system implementations.",
                        stack: [],
                    },
                    {
                        text: "Reverse-engineered legacy codebases into maintainable documentation, supporting a docs-as-code initiative across 300+ system modules.",
                        stack: [],
                    },
                ],
            },
        ],
    },
    {
        company: "EastWest Banking Corporation",
        role: "Software QA Tester Intern",
        period: "Apr 2023 - Jul 2023",
        highlights: [
            "Manual & Automated Testing",
            "Bug Documentation",
            "Cross-team Collaboration",
        ],
        categories: [
            {
                title: "Testing & Quality Assurance",
                bullets: [
                    {
                        text: "Conducted manual and automated testing of banking software, identifying bugs and documenting issues clearly enough for development handoff.",
                        stack: [],
                    },
                    {
                        text: "Collaborated with development teams to verify requirements, test fixes, and keep quality standards visible across the delivery cycle.",
                        stack: [],
                    },
                ],
            },
        ],
    },
    {
        company: "University of Makati",
        role: "Computer Science Student",
        period: "Aug 2019 - Aug 2023",
        highlights: [
            "BS Computer Science",
            "Unity 2D Thesis Game",
            "Application Development Major",
        ],
        categories: [
            {
                title: "Thesis Project: Educational Game Development",
                bullets: [
                    {
                        text: "Designed and developed a 2D educational game in Unity and C#, applying pathfinding and gameplay pacing for preschool learning flows.",
                        stack: ["Unity", "C#", "Pathfinding Algorithms"],
                    },
                ],
            },
        ],
    },
];
