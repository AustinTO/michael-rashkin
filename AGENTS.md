# michaelrashkin.com — agent guidance (Astro + Sanity)

This repository builds **michaelrashkin.com** as a single Astro app with Sanity Studio embedded at `/studio`.

## High-level goals (do not drift)
- Academic, modern, highly readable. Not “wellness influencer.”
- Clear labeling for opinion vs evidence vs policy.
- Citations/sources are first-class data.
- Fast, static-first rendering (Astro), minimal hydration.

## Local dev (expected commands)
From repo root:
- Install: `npm install`
- Run app (site + studio): `npm run dev`
- Build app: `npm run build`

## Environment variables (repo root `.env`)
Required:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`

Optional:
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`
- `SANITY_READ_TOKEN` (only if dataset is private, or drafts need auth reads)

## Working agreements for changes
- Prefer **small, composable** Astro components.
- Avoid adding dependencies unless strictly necessary.
- Keep interactive UI minimal; hydrate only where needed (filters/forms).
- If you change a Sanity schema, also update:
  - any impacted GROQ queries in `src/lib/queries.ts`
  - types in `src/lib/types.ts` (if applicable)
- Do not remove or weaken: disclaimers, opinion labeling, corrections infrastructure.

## Where “skills” live
Codex and Cursor both support skill folders with a `SKILL.md` file (YAML frontmatter + instructions).  
Use the skills in:
- `.agents/skills/` (Codex standard location for repo skills)
- `.cursor/skills/` (Cursor project skill location)

Prefer editing skills in **one** place and mirroring as needed to avoid divergence.

## Definition of done (for most tasks)
- Code compiles without TypeScript errors (where applicable).
- Pages render with correct title/OG meta and canonical URLs.
- No broken links in global nav/footer routes.
- Accessibility basics: headings, labels, focus states.
