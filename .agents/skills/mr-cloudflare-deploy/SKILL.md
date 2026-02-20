---
name: mr-cloudflare-deploy
description: Deploy the Astro site (and optionally Sanity Studio) with Cloudflare Pages + Cloudflare DNS/WAF settings per the project requirements.
---

# mr-cloudflare-deploy

## When to use
Use this skill when you need to:
- deploy `apps/web` to Cloudflare Pages
- configure environment variables in Cloudflare
- implement redirects and basic security/performance settings

## Recommended deployment split
- **Website**: Cloudflare Pages project from repo, build `apps/web`
- **Studio**: either a separate Pages project or host via Sanity (depending on preference)

## Build settings (website)
Typical Cloudflare Pages settings:
- Build command: `npm install && npm run build:web`
- Output directory: `apps/web/dist`

Add environment variables in Cloudflare Pages:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `SANITY_READ_TOKEN` (only if needed)

## Cloudflare settings checklist
- Force HTTPS
- HSTS enabled
- Enable WAF managed rules (basic)
- Bot protection on forms
- Rate limiting on `/contact` submissions if applicable
- Image optimization (Cloudflare or Astro build strategy)
- Cache static assets aggressively

## Redirects
Implement the required redirects (e.g., `/bio -> /about`) using:
- Cloudflare Pages `_redirects` file (preferred), OR
- Astro route stubs that return 301

## Definition of done
- Production site builds and serves from Cloudflare Pages
- HTTPS enforced
- Redirects work
- Sitemap/robots render correctly
