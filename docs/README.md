# Project documentation

Reviewed against the working tree on September 6, 2026. Live Cloudflare and AWS settings were not independently verified.

| Guide | Purpose |
| --- | --- |
| [Architecture and content](architecture.md) | Current routes, editable content, state, and GitHub data flow |
| [Development and release](development.md) | Setup, checks, preview, and manual deployment |
| [Theme implementation status](apple-theme-tailwind-shadcn-implementation-plan.md) | Completed, superseded, and remaining migration work |
| [Cleanup audit](cleanup-audit.md) | Historical cleanup results and dependency follow-up |

The [root README](../README.md) provides an overview. The [AWS notes](../aws/README.md) preserve infrastructure inspection details, but their Vercel release instructions and removed-component references are stale. Use the development guide here for frontend releases.

## Maintaining these docs

Update the relevant guide when routes, content locations, environment variables, scripts, or deployment configuration change. Link to source rather than copying large implementation blocks. Label historical validation and proposed work explicitly. Source and configuration files take precedence when prose disagrees.
