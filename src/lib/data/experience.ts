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
                        text: "Built an internal tool on top of a legacy Oracle database, automating transaction checks and approval validation for an 8-person operations workflow. Picked Alpine.js to keep the stack lean — no SPA build on top of ASP.NET MVC.",
                        stack: [
                            "Alpine.js",
                            "ASP.NET MVC",
                            "Oracle SQL",
                            "RDLC",
                        ],
                    },
                    {
                        text: "Implemented access-control modules for an internal reporting system, including user management, RBAC, password recovery, password policy enforcement, and role-driven navigation. Built in-house rather than integrating a third-party IAM into the existing Web Forms app.",
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
                        text: "Built backend API and schema for one client-facing application and designed one internal web app, while keeping four legacy production systems stable.",
                        stack: [],
                    },
                    {
                        text: "Shipped 60+ production deployments over roughly 2 years, spanning new rollouts, enhancements, and fixes.",
                        stack: [],
                    },
                ],
            },
            {
                title: "System Analysis",
                tabTitle: "Analysis",
                bullets: [
                    {
                        text: "Designed APIs and workflows that settlement, accounting, sales, and operations teams could agree on and ship against.",
                        stack: [],
                    },
                    {
                        text: "Documented 300+ system modules from legacy codebases as part of a docs-as-code initiative, giving the team a reliable reference for handoff, onboarding, and audit work.",
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
                        text: "Wrote bug reports and reproduction steps clear enough for development handoff, and verified fixes against the original requirements.",
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
