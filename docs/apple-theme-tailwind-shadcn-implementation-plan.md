# Apple Theme + Tailwind CSS + shadcn Implementation Plan

## Goal

Keep the current Apple-themed resume aesthetic while shifting the codebase toward:

- `Tailwind CSS` for layout, spacing, responsiveness, and state styling
- `shadcn-svelte` for accessible interactive primitives
- a smaller amount of custom component CSS, reserved for the Apple visual identity

This plan is intentionally incremental. The app already builds successfully, so the goal is not a rewrite. The goal is to preserve the current experience while improving consistency, accessibility, and maintainability.

## Current State

The project already has the right ingredients, but they are used unevenly:

- Tailwind is installed and active via `src/app.css`
- `shadcn-svelte` scaffolding exists, but only the generated button component is present
- most portfolio components are still styled with local `<style>` blocks
- the visual design is driven by custom Apple-like CSS variables such as `--ios-glass`, `--ios-blue`, and `--ios-text-primary`
- some setup files and generated UI code appear to be partially adopted rather than fully integrated

## Guiding Principles

- Preserve the current Apple-inspired visual language
- Avoid a full rewrite of every component at once
- Prefer migrating interactive components to shadcn first
- Use Tailwind utilities for structure and behavior, not to replace every visual token
- Keep complex Apple-specific visuals in reusable theme classes instead of giant inline utility strings
- Improve accessibility as part of the migration, not afterward

## Target Architecture

### 1. Theme Layer

Keep the Apple design system as the visual source of truth in `src/app.css`.

This layer should contain:

- color tokens
- glass/background tokens
- border and separator tokens
- chip/button surface tokens
- typography and radius decisions
- dark mode token variants

This layer should also expose a small reusable class set such as:

- `.apple-card`
- `.apple-card-inner`
- `.apple-chip`
- `.apple-badge`
- `.apple-icon-button`
- `.apple-section-title`

These classes should carry the Apple look so components do not need to restate the same visual CSS repeatedly.

### 2. Tailwind Layer

Use Tailwind for:

- grid/flex layouts
- spacing
- responsive breakpoints
- typography sizing
- transitions
- alignment
- visibility/state helpers

Use Tailwind as the default way to compose component structure. Avoid relying on custom CSS for simple layout rules when a utility class expresses it clearly.

### 3. shadcn Layer

Use shadcn for:

- `Button`
- `Dialog`
- `Command`
- `Sheet` or `Drawer`
- `Separator`
- `Badge` where appropriate
- `Collapsible` or `Accordion` for expand/collapse UI

shadcn should provide behavior, accessibility, and composition. The Apple look should be applied on top through tokens and theme classes.

## Migration Strategy

## Phase 0: Baseline and Cleanup

Purpose: reduce confusion before broader migration.

Tasks:

- fix the accessibility warning in `src/lib/components/portfolio/CommandPalette.svelte`
- audit unused or stale scaffold files
- confirm whether unused generated UI pieces should be deleted or expanded upon
- update `README.md` so the documented structure matches the real app
- identify unused data fields in `src/lib/data/resume.ts` and related types

Deliverable:

- clean baseline with no misleading docs and no obvious dead paths blocking the migration

## Phase 1: Establish the Apple Theme as Reusable Primitives

Purpose: keep the current visual identity while reducing repeated CSS.

Tasks:

- extract repeated tile styling into shared theme classes in `src/app.css`
- extract repeated chip/badge/icon-button styles into reusable theme classes
- consolidate repeated hover/focus visual patterns
- decide which pieces stay as CSS classes versus Tailwind utilities

Recommended rule:

- visual identity belongs in theme classes
- structure belongs in Tailwind utilities

Deliverable:

- a stable Apple theme layer that can be reused by both custom components and shadcn components

## Phase 2: Strengthen shadcn Foundations

Purpose: make shadcn an actual part of the app instead of partial scaffolding.

Tasks:

- keep and validate `components.json`
- standardize the generated `ui` component folder usage
- add only the primitives the app will immediately use
- avoid generating large sets of components that the app does not need yet

Initial target primitives:

- `button`
- `dialog`
- `command`
- `sheet` or `drawer`
- `separator`
- `collapsible` or `accordion`

Deliverable:

- a minimal but real UI foundation for the portfolio

## Phase 3: Migrate Interactive Components First

Purpose: get the highest value from shadcn early.

### 3.1 Command Palette

File:

- `src/lib/components/portfolio/CommandPalette.svelte`

Plan:

- rebuild it using shadcn `Dialog` + `Command`
- preserve the Apple glass modal styling
- move item interaction onto proper buttons/command items
- keep keyboard shortcuts and focus handling

Reason:

- this component already has accessibility pressure and maps naturally to shadcn

### 3.2 Project Drawer

File:

- `src/lib/components/portfolio/ProjectDrawer.svelte`

Plan:

- migrate to shadcn `Sheet` or `Drawer`
- preserve the current side-panel and mobile bottom-sheet behavior
- apply Apple surface styling through shared classes

Reason:

- modal/panel behavior is exactly where headless accessible primitives help most

### 3.3 Theme Toggle

File:

- `src/lib/components/portfolio/ThemeToggle.svelte`

Plan:

- migrate to shadcn `Button`
- keep the existing theme store
- preserve icon-only Apple styling through theme classes

## Phase 4: Migrate Expand/Collapse Experiences

Purpose: standardize disclosure behavior and reduce custom state complexity.

Primary target:

- `src/lib/components/portfolio/ExperienceSection.svelte`

Plan:

- replace custom collapse UI with shadcn `Collapsible` or `Accordion`
- keep the existing content hierarchy and compact presentation
- preserve Apple-styled headers and chips

Secondary consideration:

- evaluate whether other expanding UI should use the same primitive for consistency

Deliverable:

- a single consistent pattern for disclosure interactions

## Phase 5: Convert Layout-Heavy Components to Tailwind-First Styling

Purpose: reduce local CSS noise while keeping the Apple look.

Primary targets:

- `src/routes/+page.svelte`
- `src/lib/components/portfolio/Hero.svelte`
- `src/lib/components/portfolio/ProjectsSection.svelte`
- `src/lib/components/portfolio/SkillsSection.svelte`
- `src/lib/components/portfolio/StatsBar.svelte`
- `src/lib/components/portfolio/EducationSection.svelte`
- `src/lib/components/portfolio/ExploringSection.svelte`
- `src/lib/components/portfolio/ContactFooter.svelte`

Plan:

- move structural layout into Tailwind classes
- keep Apple-specific surfaces in shared classes
- avoid replacing every class name with long utility chains when a semantic wrapper improves readability

Suggested styling split:

- Tailwind for `grid`, `flex`, `gap`, `padding`, `margin`, `text-*`, `items-*`, `justify-*`, breakpoints
- shared classes for glass surfaces, chips, icon buttons, Apple hover/focus look

Deliverable:

- thinner component `<style>` blocks
- clearer distinction between structure and visual identity

## Phase 6: Content and Metadata Consolidation

Purpose: prevent theme migration from leaving content configuration scattered.

Tasks:

- centralize site metadata currently split between `src/app.html` and `src/routes/+page.svelte`
- decide whether fields like `subtitle`, `phone`, and `education.major` should be rendered or removed
- keep resume content in `src/lib/data/resume.ts`, but separate pure site config if needed

Deliverable:

- less drift between content, SEO metadata, and rendered UI

## Phase 7: Verification and Polish

Purpose: ensure the migration improves quality, not just style consistency.

Required checks:

- `npm run check`
- `npm run build`
- keyboard navigation for all dialogs, drawers, and toggles
- light/dark theme validation
- mobile layout validation
- hover/focus state review
- reduced-motion review where relevant

Manual QA checklist:

- command palette opens, navigates, and closes correctly
- drawer/sheet traps focus and restores it appropriately
- theme toggle persists correctly
- all Apple surface styles remain visually consistent
- no section feels visually out of place after migrating to Tailwind/shadcn

## Recommended Implementation Order

1. baseline cleanup
2. extract shared Apple theme classes
3. migrate `CommandPalette`
4. migrate `ProjectDrawer`
5. migrate `ThemeToggle`
6. migrate `ExperienceSection`
7. migrate remaining layout-heavy sections to Tailwind-first styling
8. consolidate docs and metadata
9. final QA and polish

## Risks and How to Avoid Them

### Risk: losing the Apple look

Mitigation:

- do not let raw shadcn defaults dictate the design
- always style primitives through Apple tokens and shared classes

### Risk: utility-class overload

Mitigation:

- use Tailwind for structure
- keep custom visual identity in shared theme classes
- avoid replacing readable classes with giant utility strings unless it simplifies the component

### Risk: partial migration inconsistency

Mitigation:

- migrate one interaction pattern at a time
- finish a pattern fully before moving to the next

### Risk: keeping unused scaffold code forever

Mitigation:

- decide early which generated shadcn files stay
- remove unused generated code when it no longer serves the target architecture

## Definition of Done

This migration is complete when:

- the portfolio still reads visually as an Apple-themed resume
- interactive components use shadcn primitives where appropriate
- layout and responsive behavior are primarily expressed with Tailwind
- repeated visual styles are centralized in shared Apple theme classes
- component-level CSS is meaningfully reduced
- docs reflect the actual implementation
- `npm run check` and `npm run build` pass cleanly

## Suggested Next Step

Start with `CommandPalette.svelte`.

It is the best first migration target because it has:

- immediate accessibility payoff
- strong overlap with shadcn primitives
- relatively isolated behavior
- minimal risk to the rest of the page layout
