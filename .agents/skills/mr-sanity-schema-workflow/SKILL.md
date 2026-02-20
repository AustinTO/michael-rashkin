---
name: mr-sanity-schema-workflow
description: Add or change Sanity Studio schemas for michaelrashkin.com, and keep Astro queries/types in sync. Use when modifying the CMS model.
---

# mr-sanity-schema-workflow

## When to use
Use this skill when you need to:
- add a new content type (document)
- add or rename fields on existing types (topic, insight, policyNote, mediaEpisode)
- add new reusable object types (evidenceSnapshot, sourceReference)
- change validation, previews, or editorial guardrails

## Where schemas live
- `apps/studio/schemaTypes/*.ts` — document types
- `apps/studio/schemas/*` — shared object types and schema assembly

## Safe workflow
1) Identify what UI/output needs to change (field, validation, preview).
2) Update Sanity schema(s) in `apps/studio`.
3) Update Astro GROQ queries (if fields changed):
   - `apps/web/src/lib/queries.ts`
4) Update types used by the frontend as needed:
   - `apps/web/src/lib/types.ts`
5) Run Studio and Web locally to confirm:
   - `npm run dev:studio`
   - `npm run dev:web`

## Guardrails
- Avoid renaming fields unless necessary (breaks existing content + GROQ queries).
- If you must rename, consider:
  - keeping the old field temporarily
  - adding a migration plan (manual or script) before removing old fields
- Keep trust-related fields prominent:
  - evidence snapshot fields
  - sources arrays
  - opinion/policy labeling

## Common patterns in this project
- Most document types use:
  - `title`, `slug`, `publishedAt`, `updatedAt`
- Sources use the `sourceReference` object and are rendered as numbered references.
