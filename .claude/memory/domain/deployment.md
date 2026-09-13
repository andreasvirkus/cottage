## Deployment

- 2026-09-12 — Andreas is considering migrating cottage from Netlify to Cloudflare Pages, matching a preference from his other recent projects. Why: also came up right after diagnosing prod-only soft-nav delay (Netlify serves HTML with `max-age=0, must-revalidate`, no caching for the router's `fetch()` calls) — CF Pages Cache Rules could address that too.
