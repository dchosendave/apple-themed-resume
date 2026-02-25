# resume-portfolio

A personal portfolio web application for **Lowie Dave Dichoson** — built to transform a traditional PDF resume into a premium, interactive one-page web experience.

## Overview

This is a **SvelteKit** application styled with the **iOS Human Interface Guidelines** design language — featuring glassmorphism cards, smooth dark/light mode switching, Inter typography, and iOS system blue accents. It is a direct digital counterpart to the PDF resume, designed to be shareable as a link alongside or instead of the document.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://svelte.dev/docs/kit) |
| Language | TypeScript |
| UI Components | [shadcn-svelte](https://shadcn-svelte.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla CSS |
| Font | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

## Features

- **iOS-style design** — glassmorphism cards with `backdrop-filter: blur()`, rounded corners, and Apple-inspired color tokens
- **Dark / Light mode** — toggle button in the navbar; preference persisted via `localStorage`
- **Single-page layout** — no routing, minimal scrolling; all content in one continuous view
- **Impact stats bar** — 3M+ records, 60+ deployments, 4 legacy systems, 300+ modules
- **Skills section** — grouped pill chips by category (Languages, Frameworks, Databases, Others)
- **Experience section** — categorized bullets per work domain, each with tech stack chips
- **Education section** — degree and certification cards
- **Resume download** — direct link to the PDF in `/static`

## Project Structure

```
src/
├── app.html                        # HTML shell — Inter font, dark class default, SEO meta
├── app.css                         # Tailwind + shadcn tokens + iOS design system tokens
├── lib/
│   ├── data/
│   │   └── resume.ts               # All resume content as typed TypeScript constants
│   ├── stores/
│   │   └── theme.svelte.ts         # Svelte 5 $state reactive dark/light mode store
│   └── components/portfolio/
│       ├── NavBar.svelte           # Sticky blurred top bar with theme toggle
│       ├── ThemeToggle.svelte      # Sun/Moon icon button
│       ├── Hero.svelte             # Name, title, avatar, contact chips, CTAs
│       ├── StatsBar.svelte         # 4 key impact numbers
│       ├── SkillsSection.svelte    # Skill categories with pill tags
│       ├── ExperienceSection.svelte # Work history with bullets and stack chips
│       ├── EducationSection.svelte  # Degree and certification cards
│       └── ContactFooter.svelte    # Email, LinkedIn, PDF download
└── routes/
    ├── +layout.svelte              # Root layout with theme class binding
    └── +page.svelte                # Assembles all sections
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

> To deploy, install the appropriate [SvelteKit adapter](https://svelte.dev/docs/kit/adapters) for your target platform (e.g., `@sveltejs/adapter-vercel` for Vercel).

## Updating Resume Content

All content is centralized in [`src/lib/data/resume.ts`](src/lib/data/resume.ts). To update any information — name, experience bullets, skills, education — edit only that file. No other components need to be touched.
