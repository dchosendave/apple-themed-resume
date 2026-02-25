export const personalInfo = {
    name: 'Lowie Dave Dichoson',
    title: 'Currently an Analyst Programmer',
    subtitle: 'Backend Developer · Financial Systems',
    location: 'Taguig City, Philippines',
    email: 'lowiedave30@gmail.com',
    phone: '+63 915 083 3518',
    linkedin: 'https://www.linkedin.com/in/davedichoson',
    resumePdf: '/ldd-resume-january-2026-v2.pdf'
};

export const stats = [
    { value: '3M+', label: 'Records Migrated' },
    { value: '60+', label: 'Production Deployments' },
    { value: '4', label: 'Legacy Systems Supported' },
    { value: '300+', label: 'Modules Documented' }
];

export const professionalFocus =
    'Backend-focused developer with experience designing and supporting production systems, building APIs, and managing complex data workflows in financial applications.';

export const skills: Record<string, string[]> = {
    Languages: ['C#', 'JavaScript', 'TypeScript', 'SQL', 'PHP', 'VB.NET', 'HTML', 'CSS'],
    'Libraries & Frameworks': [
        '.NET 8 / .NET Core',
        'ASP.NET Web API',
        'ASP.NET MVC',
        'ASP.NET Web Forms',
        'Angular',
        'Alpine.js',
        'jQuery',
        'QuestPDF'
    ],
    Databases: ['MS SQL', 'PostgreSQL', 'Oracle SQL', 'MySQL'],
    Others: ['Git', 'GitHub', 'Postman', 'Docs-as-Code', 'RDLC', 'Technical Documentation', 'Production Support']
};

export interface Bullet {
    text: string;
    stack: string[];
}

export interface ExperienceCategory {
    title: string;
    bullets: Bullet[];
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    categories: ExperienceCategory[];
}

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
    }
];

export interface Education {
    degree: string;
    major: string;
    school: string;
    period: string;
    icon: string;
}

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
        period: 'August 2023',
        icon: '📜'
    }
];
