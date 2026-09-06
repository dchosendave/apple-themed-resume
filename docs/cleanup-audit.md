# Cleanup audit

Historical cleanup record, reconciled with current source on September 6, 2026.

[Documentation index](README.md)

## Historical record

The earlier audit recorded removal of superseded hero/contact components, an avatar command store, unmounted bento sections, duplicate project components, an experience guide, unused actions, and supporting data/types. It also recorded a technical-note prop fix and corrections to README content paths.

It reported a successful `npm.cmd run check` with zero errors/warnings, a successful build, and no references to the removed component trees. These are historical results, not validation of the current working tree.

That audit retained a notes route, project drawer, and technical-note components. Those are absent from the current source inventory. The former retention list is no longer an architecture map.

## Current source review

- The homepage mounts PortfolioStory, CommandPalette, and AmbientBackground.
- Projects, work history, skills, and education render within PortfolioStory.
- Theme/sound controls, desk slideshow, location globe, and GitHub activity remain active.
- Local Motion Core code is used by the page; GSAP and OGL support that code.
- Shared UI components and theme CSS remain infrastructure. Check imports, dynamic classes, and browser behavior before removing individual pieces.

See the [architecture map](architecture.md) for current source paths.

## Dependency follow-up

`three`, `@types/three`, `@fontsource/fira-mono`, and `@neoconfetti/svelte` remain declared in [package.json](../package.json). A text search of `src/` found no references to those package names. They are removal candidates; source search alone does not prove they are unused by all tooling.

The earlier uninstall attempt was blocked by npm remote-fetch restrictions (`EALLOWREMOTE`) involving a Tailwind oxide archive. That historical failure was not retried in this documentation update.

To complete cleanup:

1. Confirm the candidates are unused in source, configuration, and tooling.
2. Use npm uninstall so package.json and package-lock.json change together.
3. Run `npm run check` and `npm run build`.
4. Verify portrait, slideshow, globe, and command palette behavior in the browser.
5. Record the actual results and close the [implementation follow-up](apple-theme-tailwind-shadcn-implementation-plan.md).

No dependencies or application files were changed by this documentation review.
