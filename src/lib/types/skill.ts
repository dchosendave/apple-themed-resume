export type SkillLevel = 'familiar' | 'proficient' | 'expert';

export interface Skill {
    name: string;
    level?: SkillLevel;
}
