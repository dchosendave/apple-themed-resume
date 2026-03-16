import type { Education } from "$lib/types/education";
import type { Experience } from "$lib/types/experience";
import type { Project } from "$lib/types/project";
import type { PersonalInformation } from "$lib/types/personal-information";
import type { Statistics } from "$lib/types/statistics";

export const personalInfo: PersonalInformation = {
    name: 'Lowie Dave Dichoson',
    title: 'Backend Developer',
    subtitle: 'Backend Developer · Financial Systems',
    location: 'Taguig City, Philippines',
    email: 'lowiedave30@gmail.com',
    phone: '+63 915 083 3518',
    linkedin: 'https://www.linkedin.com/in/davedichoson',
    github: 'https://github.com/lowiedichoson',
    resumePdf: '/ldd-resume-january-2026-v2.pdf'
};

export const stats: Statistics[] = [
    { value: '8+', label: 'Systems Built & Enhanced' },
    { value: '60+', label: 'Production Deployments' },
    { value: '4', label: 'Legacy Systems Supported' },
    { value: '300+', label: 'Modules Documented' }
];

export const professionalFocus =
    'What sets me apart is my drive to understand business problems first, then craft technical solutions that are efficient, maintainable, and aligned with business goals.';

export const skills: Record<string, string[]> = {
    Backend: ['C#', '.NET Core', 'Node.js', 'VB.NET', 'PHP'],
    Frontend: ['JavaScript', 'TypeScript', 'Angular', 'SvelteKit', 'Alpine.js', 'jQuery'],
    Databases: ['MS SQL', 'PostgreSQL', 'Oracle SQL', 'MySQL'],
    Tooling: ['Git', 'GitHub', 'Postman', 'QuestPDF', 'RDLC', 'Technical Documentation', 'Production Support']
};



export const experience: Experience[] = [
    {
        company: 'Vantage Financial Corp.',
        role: 'Analyst Programmer',
        period: 'August 2023 – Present',
        categories: [
            {
                title: 'System Development',
                bullets: [
                    {
                        text: 'Solely responsible for end-to-end backend development of a client-facing system, including data modeling, API design and implementation, business logic, frontend integration, and PDF report generation.',
                        stack: ['Angular', '.NET Web API', 'PostgreSQL', 'QuestPDF']
                    },
                    {
                        text: 'Designed and implemented an in-house system integrated with a legacy Oracle database, automating manual transaction counter-checks and approval validation, improving accuracy and efficiency for an 8-person team.',
                        stack: ['Alpine.js', 'ASP.NET MVC', 'Oracle SQL', 'RDLC']
                    },
                    {
                        text: 'Designed and implemented core access-control modules for an internal report-generation system, including user account management, RBAC, password recovery and enforcement, and dynamic role-driven navigation.',
                        stack: ['HTML/CSS/jQuery', 'ASP.NET Web Forms', 'MS SQL', 'RDLC']
                    }
                ]
            },
            {
                title: 'Database & Data Management',
                bullets: [
                    {
                        text: 'Identified and resolved a data type issue in the transaction archiving process, enabling the successful migration of 3M+ transaction records (2021–2024) from production to archive and reducing production database load.',
                        stack: ['MS SQL']
                    },
                    {
                        text: 'Enhanced a transaction settlement system by implementing end-to-end audit logging across multi-step settlement workflows (rollback, data retrieval, processing, and settlement), introducing soft-deletion for traceability and root-cause analysis.',
                        stack: ['ASP.NET Web Forms', 'VB.NET', 'MS SQL']
                    }
                ]
            },
            {
                title: 'Production Support & System Analysis',
                bullets: [
                    {
                        text: 'Maintained and supported 4 legacy production systems, solely designed and developed 1 internal web application, and solely built the backend API and database schema for 1 client-facing application.',
                        stack: []
                    },
                    {
                        text: 'Maintained continuous delivery with 60+ production deployments over ~2 years, including new system rollouts, enhancements, and fixes.',
                        stack: []
                    },
                    {
                        text: 'Acted as a technical liaison, translating business requirements across settlement, accounting, sales, and operations into clear technical specifications and system implementations.',
                        stack: []
                    },
                    {
                        text: 'Analyzed and reverse-engineered legacy codebases to produce maintainable, code-aligned documentation, supporting a docs-as-code initiative spanning 300+ system modules.',
                        stack: []
                    }
                ]
            }
        ]
    },
    {
        company: 'EastWest Banking Corporation',
        role: 'Software QA Tester Intern',
        period: 'April 2023 – July 2023',
        categories: [
            {
                title: 'Testing & Quality Assurance',
                bullets: [
                    {
                        text: 'Conducted manual and automated testing of software applications, identifying and documenting bugs and issues.',
                        stack: []
                    },
                    {
                        text: 'Collaborated with development teams to ensure quality standards and compliance with project requirements.',
                        stack: []
                    }
                ]
            }
        ]
    },
    {
        company: 'University of Makati',
        role: 'Computer Science Student',
        period: 'August 2019 – August 2023',
        categories: [
            {
                title: 'Thesis Project: Educational Game Development',
                bullets: [
                    {
                        text: 'Designed and developed a 2D game using Unity and C#, implementing educational gameplay mechanics targeting pre-school students.',
                        stack: ['Unity', 'C#', 'Pathfinding Algorithms']
                    }
                ]
            }
        ]
    }
];



export const education: Education[] = [
    {
        degree: 'Bachelor of Science in Computer Science',
        major: 'Major in Application Development',
        school: 'University of Makati, Makati City',
        period: 'August 2023',
        icon: '🎓'
    },
    {
        degree: 'IT Specialist – Databases',
        major: 'Certification',
        school: 'Certiport',
        period: 'January 2023',
        icon: '🏅'
    },
    {
        degree: 'Introduction to Responsible AI',
        major: 'Certification',
        school: 'Google Skills',
        period: 'January 2026',
        icon: '🏅'
    },
    {
        degree: 'Introduction to Large Language Models',
        major: 'Certification',
        school: 'Google Skills',
        period: 'January 2026',
        icon: '🏅'
    },
    {
        degree: 'Introduction to Generative AI',
        major: 'Certification',
        school: 'Google Skills',
        period: 'January 2026',
        icon: '🏅'
    }
];

export const projects: Project[] = [
    {
        name: 'PEMI ClientEase',
        description: 'Self-service investor portal automating account creation and updates — replaced manual back-office workflows.',
        category: 'Client-Facing',
        stack: ['Angular', '.NET Web API', 'PostgreSQL', 'QuestPDF'],
        url: 'https://www.philequity.net/portal/'
    },
    {
        name: 'LOI Generator',
        description: 'Automated Letter of Intent generation from database records — improved accuracy for an 8-person department.',
        category: 'Internal Tool',
        stack: ['Alpine.js', 'ASP.NET MVC', 'Oracle SQL', 'RDLC']
    },
    {
        name: 'Report Generator',
        description: 'Centralized IAM module with RBAC and dynamic permissions — replaced manual SQL-based user provisioning.',
        category: 'Internal Tool',
        stack: ['HTML/CSS/jQuery', 'ASP.NET Web Forms', 'MS SQL', 'RDLC']
    },
    {
        name: 'Dave Delivers',
        description: 'Experimental macOS-inspired portfolio with CLI, desktop sim, and interactive easter eggs.',
        category: 'Personal',
        stack: ['SvelteKit', 'Turso SQLite', 'TailwindCSS'],
        url: 'https://dave-delivers.vercel.app/'
    }
];

export const exploring: { icon: string; label: string; note: string }[] = [
    { icon: '🐳', label: 'Docker & Containerization', note: 'Packaging applications for consistent deployments' },
    { icon: '☁️', label: 'Azure Fundamentals', note: 'Cloud hosting, storage, and managed services' },
    { icon: '🤖', label: 'AI / LLM Integration', note: 'Embedding LLM-powered features into backend services' },
    { icon: '📨', label: 'AI-assisted Development', note: 'Utilizing AI tools to enhance development workflows' },
];