import type { TechnicalNote } from '$lib/types/technical-note';

export const technicalNotes: TechnicalNote[] = [
    {
        slug: 'archiving-3m-transactions',
        title: 'Archiving 3M+ Transactions Without Breaking Production',
        category: 'Database Management',
        summary: 'A short note on debugging schema assumptions during production archive work.',
        readTime: '5 min',
        tags: [ 'MS SQL Server', 'Data Migration', 'Production Support'],
        sections: [
            {
                title: "Context",
                body: "The production database had years of transaction records, and archiving was needed to reduce operational load while keeping historical records available."
            },
            {
                title: "Problem",
                body: "A data type mismatch blocked the archive process for transaction records from 2021 to 2024. The issue looked small, but it affected a high-volume financial workflow."
            },
            {
                title: "Approach",
                body: "I traced the failing records, compared assumptions between source and archive structures, fixed the type issue, and validated record counts before and after the migration."
            },
            {
                title: "What I Learned",
                body: "Migration work in financial systems needs validation checkpoints, not just working scripts. Small schema assumptions can create large operational risk."
            }
        ]
    },
    {
        slug: "designing-rbac-reporting-tools",
        title: "Designing RBAC for Internal Reporting Tools",
        category: "Access Control",
        summary: "How I approached permissions, provisioning, and report access management.",
        readTime: "4 min",
        tags: ["RBAC", "IAM", "ASP.NET", "MS SQL"],
        sections: [
            {
                title: "Context",
                body: "Internal report access was managed through manual SQL updates, which made provisioning fragile and hard to audit."
            },
            {
                title: "Problem",
                body: "Admins needed a safer way to manage users, roles, password recovery, and dynamic navigation without touching the database directly."
            },
            {
                title: "Approach",
                body: "I implemented user management, role-based access control, password workflows, and role-driven menus so permissions could be managed through the application."
            },
            {
                title: "What I Learned",
                body: "Access control is not just a security feature. It is also an operations feature that reduces manual work and protects internal systems from accidental changes."
            }
        ]
    },
    {
        slug: "legacy-systems-without-making-them-worse",
        title: "Shipping Safely in Legacy Enterprise Systems",
        category: "Legacy Apps",
        summary: "Practical lessons from ASP.NET, Oracle, and financial workflows.",
        readTime: "3 min",
        tags: ["Legacy Systems", "Oracle SQL", "Maintainability"],
        sections: [
            {
                title: "Context",
                body: "Many business-critical systems are old, constrained, and still extremely important. Improving them requires patience and respect for existing behavior."
            },
            {
                title: "Problem",
                body: "Changes often have to fit around older frameworks, undocumented assumptions, and workflows that teams already rely on every day."
            },
            {
                title: "Approach",
                body: "I try to isolate changes, verify behavior against real workflows, avoid unnecessary rewrites, and document the edge cases I discover while working."
            },
            {
                title: "What I Learned",
                body: "Good legacy work is measured by how safely it improves the system. The goal is not to make old code look modern overnight."
            }
        ]
    }
]