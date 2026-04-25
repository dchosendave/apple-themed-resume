import type { Bullet } from "./bullet";

export interface ExperienceCategory {
    title: string;
    tabTitle?: string;
    bullets: Bullet[];
}
