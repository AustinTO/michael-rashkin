# michaelrashkin.com starter (Astro + embedded Sanity Studio)

This repo is a single Astro app with Sanity Studio embedded at `/studio`.

## 1) Prereqs

- Node.js 20.19+ (required by current Astro/Sanity toolchain)
- A Sanity project + dataset

## 2) Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Fill in at least:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`

If your dataset is private, also set:

- `SANITY_READ_TOKEN`

Optional Studio-specific overrides:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_API_VERSION`

Notes:
- `PUBLIC_SANITY_*` values are public identifiers and can be exposed to the browser.
- Do not mark `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET`/`PUBLIC_SANITY_API_VERSION` as secrets in Netlify.

## 3) Install

From the repo root:

```bash
npm install
```

## 4) Run the app (site + Studio)

```bash
npm run dev
```

- Site: `http://localhost:4321/`
- Studio: `http://localhost:4321/studio`

## 5) Build

```bash
npm run build
```

## 6) What’s implemented

### Routes

- `/` Home
- `/start-here`
- `/topics` + `/topics/[slug]`
- `/media` + `/media/[slug]`
- `/insights` + `/insights/[slug]`
- `/policy` + `/policy/[slug]`
- `/evidence/*` (static pages, easy to move into CMS later)
- `/newsletter`, `/links`, `/about`, `/contact`
- Redirect stubs: `/bio`, `/blog`, `/videos`, `/podcast`, `/resources`, `/press`
- `/studio` embedded Sanity Studio

### CMS types (Sanity)

- `topic`
- `insight`
- `policyNote`
- `mediaEpisode`
- `referenceEntry` (optional)
- `legalPage` (privacy/terms/cookies/disclaimer/accessibility)
- `correctionEntry` (for Corrections log)
- `siteSettings` (featured topics, pinned content)

## 7) Next steps

- Create your first 3 topics in Studio
- Add 3 media episodes
- Add a couple insights
- Then iterate on the design system/components in `src/components`

## 8) Codex/Cursor Skills

This repo includes Agent Skills (YAML frontmatter + `SKILL.md`) to make it easy to drive the project from Cursor Agent chat or Codex.

- Codex repo skills: `.agents/skills/*/SKILL.md`
- Cursor project skills: `.cursor/skills/*/SKILL.md`

There is also a root `AGENTS.md` with project-level guidance.
