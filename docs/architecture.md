# Architecture and content

[Documentation index](README.md)

## Application

The project uses Svelte 5, SvelteKit 2, TypeScript, and Tailwind CSS 4. [Vite](../vite.config.ts) enables SvelteKit and Tailwind; [Svelte configuration](../svelte.config.js) selects the Cloudflare adapter.

The current route inventory contains the homepage (`/`). There is no notes route or project-detail route.

| Source | Responsibility |
| --- | --- |
| [Root layout](../src/routes/+layout.svelte) | Global CSS, theme initialization, tooltip provider |
| [Homepage](../src/routes/+page.svelte) | Metadata; mounts PortfolioStory, AmbientBackground, and CommandPalette |
| [Server loader](../src/routes/+page.server.ts) | GitHub activity and response cache headers |
| [PortfolioStory](../src/lib/components/portfolio/PortfolioStory.svelte) | Page sections, portrait, projects, experience, and contact |
| [Global CSS](../src/app.css) | Tailwind imports, light/dark tokens, shared surfaces |
| [UI components](../src/lib/components/ui/) | Local reusable primitives, including command and dialog |
| [Motion Core](../src/lib/motion-core/) | Local motion components and rendering helpers |

## Content map

| Content | Edit |
| --- | --- |
| Name, title, location, email, socials, resume URL | [personal-information.ts](../src/lib/data/personal-information.ts) |
| Projects, stacks, descriptions, links | [projects.ts](../src/lib/data/projects.ts) |
| Work history | [experience.ts](../src/lib/data/experience.ts) |
| Education and certifications | [education.ts](../src/lib/data/education.ts) |
| Toolkit | [skills.ts](../src/lib/data/skills.ts) |
| Outside-work paragraph | [about.ts](../src/lib/data/about.ts) |
| Headings, introductory copy, portrait references | [PortfolioStory.svelte](../src/lib/components/portfolio/PortfolioStory.svelte) |
| Desk gear, images, captions | [LoadoutRail.svelte](../src/lib/components/portfolio/about/LoadoutRail.svelte) |
| Globe marker and coordinates | [LocationGlobe.svelte](../src/lib/components/portfolio/contact/LocationGlobe.svelte) |
| Command labels and destinations | [commandActions.ts](../src/lib/components/portfolio/command-center/commandActions.ts) |
| Titles and social metadata | [Homepage](../src/routes/+page.svelte) and [HTML shell](../src/app.html) |

Interfaces live in [src/lib/types/](../src/lib/types/). Check the consuming component before assuming every data field is displayed. Public images and PDFs live in [static/](../static/) and use root-relative URLs such as `/filename.pdf`. Update `personalInfo.resumePdf` when replacing the resume, then verify page and command-palette downloads. Changing the location text does not update the globe coordinates.

## Interactions

Cmd/Ctrl+K opens the command palette, which uses shared command/dialog components. Navigation actions target section IDs in PortfolioStory; keep them synchronized when moving sections.

The [theme store](../src/lib/stores/theme.svelte.ts) defaults to dark and persists `portfolio-theme`. The [sound store](../src/lib/stores/sound.svelte.ts) defaults to enabled unless `portfolio-sound` is `off` and generates Web Audio cues.

The portrait uses WaterRipple, the desk rail uses Slideshow, and the location card dynamically loads Globe. Review reduced-motion, pointer, visibility, and rendering fallbacks in the affected components when changing effects.

## GitHub activity

The server loader calls [getGitHubPulse](../src/lib/server/github-pulse.ts):

1. Return the module's in-memory cache when it is younger than 30 minutes.
2. Try `GITHUB_PULSE_API_URL` when configured and validate the payload shape.
3. If the endpoint is absent or fails, try GitHub GraphQL when a token is available.
4. Otherwise use public GitHub events; GraphQL failures also take this fallback. Empty or failed public activity produces an unavailable state.

Server code reads credentials through `$env/dynamic/private`. Token precedence is `GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_PAT`, then `PRIVATE_GITHUB_TOKEN`, using nullish checks. An empty earlier variable prevents later aliases from being selected.

The response sets `max-age=900`, `s-maxage=1800`, and `stale-while-revalidate=86400`. The in-memory cache belongs to each runtime instance, not shared persistent storage. Upstream snapshot age and HTTP caching add further delay; this is not real-time activity.

[CurrentlyBuilding](../src/lib/components/portfolio/github/CurrentlyBuilding.svelte) displays up to three events within 30 days of the payload's `fetchedAt`, with empty/unavailable states. It does not infer project completion. See the [AWS notes](../aws/README.md) for historical infrastructure details and the [index](README.md) for their known stale references.
