export interface Project {
    name: string;
    description: string;
    category: string;
    stack: string[];
    url?: string; // omit for internal/confidential projects
}