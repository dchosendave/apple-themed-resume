import { personalInfo } from "$lib/data/personal-information";

export type CommandAction = {
    value: string;
    label: string;
    category: string;
    meta: string;
    keywords: string[];
    run: () => void;
};

export type CommandActionGroup = {
    label: string;
    actions: CommandAction[];
};

function scrollToTile(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyEmail() {
    try {
        await navigator.clipboard.writeText(personalInfo.email);
    } catch {
        window.location.href = `mailto:${personalInfo.email}`;
    }
}

function downloadResume() {
    const link = document.createElement("a");
    link.href = personalInfo.resumePdf;
    link.download = "";
    link.click();
}

export function createCommandActionGroups(): CommandActionGroup[] {
    return [
        {
            label: "Navigate",
            actions: [
                {
                    value: "hero",
                    label: "Jump to hero section",
                    category: "Navigate",
                    meta: "Hero",
                    keywords: ["intro", "top", "hero", "profile"],
                    run: () => scrollToTile("tile-hero"),
                },
                {
                    value: "experience",
                    label: "Jump to work experience",
                    category: "Navigate",
                    meta: "Work",
                    keywords: ["experience", "work", "career", "resume"],
                    run: () => scrollToTile("tile-experience"),
                },
                {
                    value: "skills",
                    label: "Jump to skills section",
                    category: "Navigate",
                    meta: "Skills",
                    keywords: ["skills", "stack", "tools", "tech"],
                    run: () => scrollToTile("tile-skills"),
                },
                {
                    value: "projects",
                    label: "Jump to featured projects",
                    category: "Navigate",
                    meta: "Projects",
                    keywords: ["projects", "portfolio", "case study"],
                    run: () => scrollToTile("tile-projects"),
                },
                {
                    value: "education",
                    label: "Jump to education",
                    category: "Navigate",
                    meta: "Education",
                    keywords: ["education", "certifications", "school"],
                    run: () => scrollToTile("tile-education"),
                },
            ],
        },
        {
            label: "Contact",
            actions: [
                {
                    value: "copy-email",
                    label: "Copy email address",
                    category: "Contact",
                    meta: "Copy",
                    keywords: ["email", "mail", "copy", "contact"],
                    run: copyEmail,
                },
                {
                    value: "download-resume",
                    label: "Download resume PDF",
                    category: "Contact",
                    meta: "PDF",
                    keywords: ["resume", "cv", "download", "pdf"],
                    run: downloadResume,
                },
                {
                    value: "open-linkedin",
                    label: "Open LinkedIn profile",
                    category: "Contact",
                    meta: "Open",
                    keywords: ["linkedin", "profile", "social"],
                    run: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer"),
                },
                {
                    value: "open-github",
                    label: "Open GitHub profile",
                    category: "Contact",
                    meta: "Open",
                    keywords: ["github", "code", "repositories"],
                    run: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer"),
                },
            ],
        },
    ];
}
