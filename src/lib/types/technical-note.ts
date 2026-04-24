export interface TechnicalNoteSection {
    title: string;
    body: string;
}

export interface TechnicalNote {
    slug: string;
    title: string;
    category: string;
    summary: string;
    readTime: string;
    tags: string[];
    sections: TechnicalNoteSection[];
}