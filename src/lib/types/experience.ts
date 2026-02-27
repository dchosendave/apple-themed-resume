import type { ExperienceCategory } from "./experience-category";

export interface Experience {
    company: string;
    role: string;
    period: string;
    categories: ExperienceCategory[];
}
