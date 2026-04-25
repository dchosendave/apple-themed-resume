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
                    label: "Open home card",
                    category: "Navigate",
                    meta: "Home",
                    keywords: ["intro", "top", "hero", "profile"],
                    run: () => scrollToTile("tile-hero"),
                },
                {
                    value: "experience",
                    label: "View work timeline",
                    category: "Navigate",
                    meta: "Work",
                    keywords: ["experience", "work", "career", "resume"],
                    run: () => scrollToTile("tile-experience"),
                },
                {
                    value: "skills",
                    label: "Scan full-stack loadout",
                    category: "Navigate",
                    meta: "Stack",
                    keywords: ["skills", "stack", "tools", "tech"],
                    run: () => scrollToTile("tile-skills"),
                },
                {
                    value: "projects",
                    label: "Open product case files",
                    category: "Navigate",
                    meta: "Cases",
                    keywords: ["projects", "portfolio", "case study"],
                    run: () => scrollToTile("tile-projects"),
                },
                {
                    value: "education",
                    label: "View credentials",
                    category: "Navigate",
                    meta: "Creds",
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
