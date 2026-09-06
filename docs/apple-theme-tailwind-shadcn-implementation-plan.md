# Theme and UI implementation status

Reconciled with the working tree on September 6, 2026. This replaces the original migration proposal; it does not claim every planned task was completed.

[Documentation index](README.md)

## Current state

The current design is an editorial portfolio with forest/mint colors. Legacy `--ios-*` tokens remain part of the implementation. Tailwind utilities coexist with local component CSS and shared theme classes.

| Original workstream | Source evidence | Status |
| --- | --- | --- |
| Shared theme | src/app.css defines light/dark tokens, apple-card, apple-chip, apple-badge, apple-icon-button, and other surface classes | Implemented; review usage before further extraction |
| UI foundations | components.json and src/lib/components/ui contain button, command, dialog, input, input-group, and tooltip components | Implemented for current interactions |
| Command palette | portfolio/command-center/CommandPalette.svelte uses Command.Dialog and command items | Migrated; browser QA remains necessary |
| Theme toggle | portfolio/shared/ThemeToggle.svelte uses the shared Button and theme store | Migrated |
| Project drawer and experience disclosures | Standalone components are absent; content renders in PortfolioStory.svelte | Superseded by redesign |
| Tailwind-first layout | PortfolioStory retains substantial component CSS | Partial; no blanket rewrite required |
| Content consolidation | Separate src/lib/data modules exist; some copy remains in components | Partial |
| Metadata consolidation | Titles/descriptions remain in app.html and routes/+page.svelte | Open |
| Motion pass | Portrait, slideshow, and globe use local Motion Core code | Active, not reserved infrastructure |

See the [architecture guide](architecture.md) for linked source locations.

## Maintenance principles

- Use shared tokens for colors/surfaces, utilities for straightforward layout, and component CSS where complex visuals remain clearer.
- Extend existing interactive primitives when appropriate; add new ones for actual feature needs.
- Preserve keyboard access, visible focus, light/dark behavior, and reduced-motion fallbacks.
- Follow current imports and page composition rather than recreating removed components from the original plan.

## Follow-ups

These are proposed changes, not work performed by this documentation update.

- [ ] Consolidate metadata and replace the old Vercel og:url in [the homepage](../src/routes/+page.svelte) with the intended production URL.
- [ ] Reconcile [aws/README.md](../aws/README.md): Vercel publishing and removed experience-guide/project-drawer references are stale.
- [ ] Correct framework naming in the [root README](../README.md): Svelte 5 and SvelteKit 2 are separate versions.
- [ ] Review the dependency candidates in the [cleanup audit](cleanup-audit.md).
- [ ] Review repeated local styles before deciding whether further extraction improves maintainability.

Accept implementation changes only after the applicable [validation steps](development.md) and browser scenarios have been completed and docs match the resulting source. This page does not certify browser QA.
