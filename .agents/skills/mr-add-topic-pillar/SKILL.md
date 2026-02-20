---
name: mr-add-topic-pillar
description: Create or update a Topic pillar page in Sanity so it renders correctly on /topics/{slug} with Evidence Snapshot, sections, takeaways, and best references.
---

# mr-add-topic-pillar

## When to use
Use this skill when you need to:
- create a new topic pillar (e.g., GLP-1, Ultra-processed foods)
- update a topic’s Evidence Snapshot, interpretation, or references
- ensure a topic page follows the “living pillar” structure

## In Studio: create a Topic document
Document type: **Topic** (`topic`)

Fill these fields:
- **Title** (required)
- **Slug** (required) — must be set or the frontend won’t list it
- **Intro** (1–2 sentences)
- **Updated date** (optional) — use when you materially revise the page
- **Hero image** (optional)

### Evidence Snapshot (structured box)
- Claim summary (1–2 sentences)
- Evidence strength (High / Moderate / Low / Unclear)
- What would change my mind (3 bullets)
- Last reviewed date

### Core sections (Portable Text)
- What we know
- What we don’t know yet
- My interpretation (clearly labeled opinion)

### Key takeaways
- 3–6 bullets

### Best references
- Add a numbered list via “Best references” (repeatable `sourceReference` objects)
- Prefer primary sources, high-quality reviews, or guidelines

## Frontend expectations
- Topic pages render at: `/topics/{slug}`
- Related content is auto-listed based on `primaryTopic` references on Insights/Policy/Media

## Definition of done
- Topic shows on `/topics`
- Topic page shows:
  - Updated badge (when present)
  - Evidence Snapshot box
  - Sources rendered cleanly
  - Related content list populates once content exists
