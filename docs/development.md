# Development and release

[Documentation index](README.md)

Commands run from the repository root and reflect [package.json](../package.json). In PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Setup

Use Node.js and npm compatible with the locked dependencies; the repository does not currently pin a Node version.

```sh
npm ci
```

Copy [.env.example](../.env.example) to `.env`. Replace its placeholder `GITHUB_PULSE_API_URL` with the intended AWS snapshot endpoint, or leave it empty to exercise direct GitHub fallback. `GITHUB_TOKEN` is optional; without it, fallback uses public events. Keep real tokens out of committed files. Restart the development server after changing environment settings.

```sh
npm run dev
```

Open the URL printed by Vite.

## Commands

| Command | Behavior |
| --- | --- |
| `npm run check` | Cleans generated Cloudflare output, regenerates worker-configuration.d.ts, syncs SvelteKit, and checks Svelte/TypeScript |
| `npm run check:ci` | Cleans generated output, verifies committed Wrangler types without regenerating them, then checks source |
| `npm run check:watch` | Syncs SvelteKit and watches source checks; does not regenerate Wrangler types |
| `npm run cf:clean` | Removes .svelte-kit/cloudflare and .svelte-kit/cloudflare-tmp through the cleanup script |
| `npm run cf:typegen` | Cleans adapter output and regenerates Wrangler types |
| `npm run build` | Creates the production Cloudflare build |
| `npm run preview` | Builds, then serves the Worker bundle with wrangler dev |
| `npm run deploy:dry` | Checks, builds, and performs a deployment dry run without uploading |
| `npm run deploy` | Runs predeploy checks/build, then uploads through Wrangler |

Run checks before building: they deliberately remove previous adapter output to avoid importing a stale compiled Worker during type checking. Review generated type changes before committing. `check:ci` is available for automation; no `.github` workflow is currently checked in.

## Validation

For application or dependency changes:

```sh
npm run check
npm run build
```

For documentation-only edits, check links, source paths, and command descriptions. A build does not validate prose.

For affected UI, review:

- Mobile/desktop layout, overflow, and long content.
- Keyboard navigation, visible focus, skip link, and command-palette search, selection, Escape, focus containment, and restoration.
- Section shortcuts, project/social links, email copy, and resume downloads.
- Theme and sound preference persistence after reload.
- Portrait, slideshow, and globe on touch devices and with reduced motion; globe fallback without WebGL.
- GitHub activity success, empty, and unavailable states.

Record actual results and limitations. Passing source checks does not certify browser accessibility or visual correctness.

## Manual Cloudflare release

Authenticate Wrangler to the intended Cloudflare account, then inspect the bundle:

```sh
npm run deploy:dry
```

When ready to publish:

```sh
npm run deploy
```

The npm `predeploy` lifecycle runs checks and build automatically. Calling `wrangler deploy` directly bypasses that lifecycle.

[wrangler.jsonc](../wrangler.jsonc) configures the Worker and assets under `.svelte-kit/cloudflare`, custom domains `lowiedichoson.com` and `www.lowiedichoson.com`, disabled workers.dev/preview URLs, `keep_vars`, the public AWS endpoint variable, and an empty optional `GITHUB_TOKEN`. Review reported configuration differences, especially domain or variable removals. These are repository settings, not a fresh Dashboard verification.

If a real production fallback token is needed, store it as a Worker secret:

```sh
npx wrangler secret put GITHUB_TOKEN
```

After release, verify the production homepage, assets, activity state, and key contact/download actions. Frontend deployment does not require uploading the AWS Lambda. The [AWS notes](../aws/README.md) contain obsolete Vercel publishing instructions.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Source checks see an old compiled Worker | Run npm run check to clean adapter output before type generation |
| check:ci reports stale types | Run npm run cf:typegen, review the diff, then repeat checks |
| Preview output disappears after checks | Run npm run preview to rebuild |
| Activity is old/unavailable | Inspect server warnings, endpoint settings, snapshot timestamp, and the cache layers in the architecture guide |
| npm reports EALLOWREMOTE | Resolve the environment's package-fetch restriction and retry npm; keep manifest and lockfile consistent |
