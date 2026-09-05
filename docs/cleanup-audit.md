# Post-redesign cleanup audit

## Scope

Traced references from the homepage, notes route, project and technical-note drawers,
and command palette. This is a source/dependency cleanup, not a visual or security audit.

## Removed

- Superseded hero components, contact prompts, and avatar-command store.
- Unmounted bento experience, skills, education, exploring, statistics, and GitHub sections.
- Duplicate project grid, project card, featured ClientEase component, and experience guide.
- Unused count-up and focus-trapping actions and their obsolete supporting types/data.
- Command-palette effects that updated an avatar no longer displayed.

## Fixed

- Technical-note selection now derives from the current variant prop, removing the
  stale-prop warning.
- README content-editing instructions now point to the actual data files.

## Deliberately retained

- Notes-page card, footer, shared icons, and technical-note components: still imported.
- Project drawer, theme switch, command palette, and GitHub server integration: active.
- Motion library and its dependencies: reserved for the requested motion pass.
- Shared UI primitives and theme CSS: reusable infrastructure; dynamic classes make
  a blanket CSS deletion unsafe without a separate visual pass.
- Original illustrated portraits: retained as creative assets for possible secondary use.

The removed stats panel included an “8+ systems built & enhanced” aggregate. Its
other metrics remain represented in the experience content. The old exploring list
covered Docker, Go/Python, and AI; the active learning section now focuses on AWS.

## Validation and remaining dependency cleanup

- `npm.cmd run check`: zero errors and zero warnings.
- `npm.cmd run build`: passed.
- Reference search: no remaining source references to the removed component trees.
- Four unused dependency declarations remain: `three`, `@types/three`,
  `@fontsource/fira-mono`, and `@neoconfetti/svelte`. Npm could not regenerate the
  lockfile because remote package fetching is disabled (`EALLOWREMOTE`) for an
  existing Tailwind oxide archive. Package files were left unchanged rather than
  manually creating an inconsistent lockfile. Retry the uninstall after resolving
  that npm restriction.
