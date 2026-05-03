export interface Project {
    name: string;
    description: string;
    category: string;
    signal?: string;
    role?: string;
    stack: string[];
    url?: string; // omit for internal/confidential projects
    problem?: string;
    solution?: string;
    impact?: string;
}
