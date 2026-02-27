export interface Project {
    name: string;
    tagline: string;
    category: string;
    role?: string; // e.g. 'Sole Developer' | 'Contributor' — omit if not applicable
    description: string;
    impact: string;
    stack: string[];
    url?: string; // omit for internal/confidential projects
}