# resume-portfolio

An Apple-inspired resume portfolio for **Lowie Dave Dichoson**, built with **SvelteKit**, **Tailwind CSS v4**, and **shadcn-svelte** primitives.

## Overview

This project turns a traditional PDF resume into a polished one-page web experience with:

- Apple-style glass surfaces and theme tokens
- Tailwind-first layout and spacing
- shadcn-svelte primitives for accessible interactions
- Svelte 5 runes for local state and component logic

The app is intentionally being migrated in phases rather than rewritten all at once. The current implementation keeps the visual identity custom while moving interaction-heavy UI onto shadcn foundations.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [SvelteKit](https://svelte.dev/docs/kit) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + shared Apple theme classes |
| UI Primitives | [shadcn-svelte](https://shadcn-svelte.com/) + [bits-ui](https://www.bits-ui.com/) |
| Icons | [lucide-svelte](https://lucide.dev/) |

## Current Features

- Apple-style glass cards, chips, badges, and panel surfaces
- Dark and light mode with persisted preference
- Command palette built with shadcn `Dialog` + `Command`
- Project case study drawer built with shadcn `Sheet`
- Experience disclosures built with shadcn `Accordion`
- Resume download and external profile links
- Centralized resume content in `src/lib/data/resume.ts`

## Project Structure

```text
src/
|-- app.css                             # Tailwind entry + shadcn tokens + shared Apple theme classes
|-- lib/
|   |-- actions/                        # Reveal, count-up, focus helpers
|   |-- components/
|   |   |-- portfolio/                  # Resume-specific UI sections
|   |   |-- ui/                         # Generated shadcn-svelte primitives
|   |-- data/
|   |   `-- resume.ts                   # Typed portfolio content
|   |-- stores/
|   |   `-- theme.svelte.ts             # Svelte 5 theme store
|   |-- types/                          # Content model types
|   `-- utils/                          # Shared helpers and tech icon mapping
`-- routes/
    |-- +layout.svelte                  # Global app shell
    `-- +page.svelte                    # One-page portfolio layout
```

## Available UI Primitives

The project currently includes these generated shadcn-svelte primitives in `src/lib/components/ui/`:

- `button`
- `dialog`
- `command`
- `sheet`
- `separator`
- `accordion`
- `input`
- `input-group`
- `textarea`

These were added to support the incremental migration plan in `docs/apple-theme-tailwind-shadcn-implementation-plan.md`.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Validation

```bash
npm run check
npm run build
```

## Updating Resume Content

Most content lives in `src/lib/data/resume.ts`. Update that file to change personal details, work experience, skills, education, and project copy without restructuring the UI.
