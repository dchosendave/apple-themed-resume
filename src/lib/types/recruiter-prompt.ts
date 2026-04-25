export type ContactPrompt = "email" | "linkedin" | "github";
export type VisitPrompt =
    | "visit-morning"
    | "visit-afternoon"
    | "visit-evening"
    | "visit-late";

export type RecruiterPrompt = ContactPrompt | VisitPrompt;
