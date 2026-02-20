---
name: mr-project-setup
description: Set up, run, and troubleshoot this monorepo locally (Astro web + Sanity Studio). Use for env vars, scripts, and common startup issues.
---

# mr-project-setup

## When to use
Use this skill when you need to:
- bootstrap the repo on a new machine
- configure `.env` for Sanity
- run web and studio locally
- debug common “Sanity unauthorized / missing env var / empty content” issues

## Repository overview
- `apps/web` — Astro frontend
- `apps/studio` — Sanity Studio
- Root scripts are in `package.json` (workspace-based)

## Required environment variables
Create repo-root `.env` from `.env.example`, then set:

**Frontend**
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`

**Studio**
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`

Optional:
- `SANITY_READ_TOKEN` (only if the dataset is private or you need authenticated reads)

## Standard commands
From the repo root:

1) Install deps
- `npm install`

2) Run Astro
- `npm run dev:web`
- Default: http://localhost:4321

3) Run Sanity Studio
- `npm run dev:studio`

## Troubleshooting checklist
### “Missing required env var”
- Check `.env` exists at repo root
- Verify variable names match exactly (no `PUBLIC_` prefix needed; server-side uses `process.env`)
- Restart dev server after changing `.env`

### “401 Unauthorized” or empty content
- If your Sanity dataset is private, set `SANITY_READ_TOKEN`
- Confirm `SANITY_PROJECT_ID` and `SANITY_DATASET` match the Studio’s project/dataset
- In Studio, make sure documents have `slug` populated; frontend queries require it

### Content not showing
- Most list queries filter on `defined(slug.current)`
- Create at least:
  - 1 Topic
  - 1 Insight
  - 1 Media Episode
to validate the UI
