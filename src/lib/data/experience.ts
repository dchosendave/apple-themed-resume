import type { Experience } from "$lib/types/experience";

export const experience: Experience[] = [
    {
        company: "Vantage Financial Corp.",
        role: "Analyst Programmer",
        period: "August 2023 – Present",
        highlights: ["Solo Backend Developer", "Financial Systems", "Cross-team Liaison"],
        categories: [
            {
                title: "System Development",
                bullets: [
                    {
                        text: "Solely responsible for end-to-end backend development of a client-facing system, including data modeling, API design and implementation, business logic, frontend integration, and PDF report generation.",
                        stack: ["Angular", ".NET Web API", "PostgreSQL", "QuestPDF"]
                    },
                    {
                        text: "Designed and implemented an in-house system integrated with a legacy Oracle database, automating manual transaction counter-checks and approval validation, improving accuracy and efficiency for an 8-person team.",
                        stack: ["Alpine.js", "ASP.NET MVC", "Oracle SQL", "RDLC"]
                    },
                    {
                        text: "Designed and implemented core access-control modules for an internal report-generation system, including user account management, RBAC, password recovery and enforcement, and dynamic role-driven navigation.",
                        stack: ["HTML/CSS/jQuery", "ASP.NET Web Forms", "MS SQL", "RDLC"]
                    }
                ]
            },
            {
                title: "Database & Data Management",
                bullets: [
                    {
                        text: "Identified and resolved a data type issue in the transaction archiving process, enabling the successful migration of 3M+ transaction records (2021–2024) from production to archive and reducing production database load.",
                        stack: ["MS SQL"]
                    },
                    {
                        text: "Enhanced a transaction settlement system by implementing end-to-end audit logging across multi-step settlement workflows (rollback, data retrieval, processing, and settlement), introducing soft-deletion for traceability and root-cause analysis.",
                        stack: ["ASP.NET Web Forms", "VB.NET", "MS SQL"]
                    }
                ]
            },
            {
                title: "Production Support & System Analysis",
                bullets: [
                    {
                        text: "Maintained and supported 4 legacy production systems, solely designed and developed 1 internal web application, and solely built the backend API and database schema for 1 client-facing application.",
                        stack: []
                    },
                    {
                        text: "Maintained continuous delivery with 60+ production deployments over ~2 years, including new system rollouts, enhancements, and fixes.",
                        stack: []
                    },
                    {
                        text: "Acted as a technical liaison, translating business requirements across settlement, accounting, sales, and operations into clear technical specifications and system implementations.",
                        stack: []
                    },
                    {
                        text: "Analyzed and reverse-engineered legacy codebases to produce maintainable, code-aligned documentation, supporting a docs-as-code initiative spanning 300+ system modules.",
                        stack: []
                    }
                ]
            }
        ]
    },
    {
        company: "EastWest Banking Corporation",
        role: "Software QA Tester Intern",
        period: "April 2023 – July 2023",
        highlights: ["Manual & Automated Testing", "Bug Documentation", "Cross-team Collaboration"],
        categories: [
            {
                title: "Testing & Quality Assurance",
                bullets: [
                    {
                        text: "Conducted manual and automated testing of software applications, identifying and documenting bugs and issues.",
                        stack: []
                    },
                    {
                        text: "Collaborated with development teams to ensure quality standards and compliance with project requirements.",
                        stack: []
                    }
                ]
            }
        ]
    },
    {
        company: "University of Makati",
        role: "Computer Science Student",
        period: "August 2019 – August 2023",
        highlights: ["BS Computer Science", "Unity 2D Thesis Game", "Application Development Major"],
        categories: [
            {
                title: "Thesis Project: Educational Game Development",
                bullets: [
                    {
                        text: "Designed and developed a 2D game using Unity and C#, implementing educational gameplay mechanics targeting pre-school students.",
                        stack: ["Unity", "C#", "Pathfinding Algorithms"]
                    }
                ]
            }
        ]
    }
];