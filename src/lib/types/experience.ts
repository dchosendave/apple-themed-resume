import type { ExperienceCategory } from "./experience-category";

export interface Experience {
    company: string;
    role: string;
    period: string;
    disclosureLabel: string;
    highlights?: string[];
    categories: ExperienceCategory[];
}
