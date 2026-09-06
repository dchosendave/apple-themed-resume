# Lowie Dichoson — Portfolio

A one-page personal portfolio built with SvelteKit 5 and deployed manually to Cloudflare Workers. The interface combines a restrained editorial layout with Motion Core interactions, including the reactive portrait, desk slideshow, and location globe.

## Stack

- SvelteKit 5 and TypeScript
- Tailwind CSS v4
- Motion Core, GSAP, and OGL
- Cloudflare Workers with static assets
- AWS API Gateway and Lambda for the cached GitHub activity snapshot

## Local development

Install dependencies and start Vite:

```bash
npm install
npm run dev
```

Wrangler loads local server variables from `.env`. Copy `.env.example` and provide the AWS endpoint when setting up a new checkout. Keep `.env` out of source control.

## Validation and build

```bash
npm run check
npm run build
```

`npm run check` clears only generated Cloudflare adapter output, regenerates `worker-configuration.d.ts`, and then checks Svelte and TypeScript. Clearing that output prevents Wrangler from importing an old compiled Worker into the source type-check. CI should use `npm run check:ci`, which verifies that the committed Cloudflare types are already current instead of changing them.

To exercise the complete deployment bundle without uploading anything:

```bash
npm run deploy:dry
```

## Production deployment

Production deploys are intentionally manual. This repository is not connected to Cloudflare Builds.

```bash
npm run deploy
```

The `predeploy` lifecycle runs the source checks and production build automatically before `wrangler deploy` uploads anything. Wrangler may still display configuration metadata differences reported by the Dashboard; review the diff and ensure neither custom-domain pattern nor a required variable is marked for removal.

Cloudflare configuration lives in `wrangler.jsonc`. It explicitly owns these production settings:

- `lowiedichoson.com` and `www.lowiedichoson.com` as custom domains
- `workers.dev` and preview URLs disabled
- the public `GITHUB_PULSE_API_URL` runtime variable
- Dashboard variables preserved through `keep_vars`

`GITHUB_TOKEN` is currently an empty optional variable. If a real token is ever required, store it as an encrypted Worker secret:

```bash
npx wrangler secret put GITHUB_TOKEN
```

Never place a real token in `.env.example`, `wrangler.jsonc`, or committed source.

## Content and components

The page composition is in `src/lib/components/portfolio/PortfolioStory.svelte`. Portfolio copy and structured content live in `src/lib/data/`. Local Motion Core components are kept in `src/lib/motion-core/` so their behavior can be tailored to the portfolio.

The AWS GitHub activity integration and its deployment commands are documented in `aws/README.md`.
