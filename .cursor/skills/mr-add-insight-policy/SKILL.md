---
name: mr-add-insight-policy
description: Create Insights (Evidence Brief/Deep Dive/Myth Check/Opinion) or Policy Notes in Sanity with correct labeling, topic linkage, summary bullets, and sources.
---

# mr-add-insight-policy

## When to use
Use this skill when you need to:
- publish a new Insight post
- publish a new Policy Note (politics/policy content)
- ensure correct labeling + topic assignment + sources

## Insight workflow
Document type: **Insight** (`insight`)

Fill:
- Title, Slug (required)
- Content type (required): Evidence Brief / Deep Dive / Myth Check / Opinion
- Primary topic (recommended) — improves related-content + filtering
- Tags (optional)
- Publish date
- Updated date (optional)
- Summary bullets (3–6)
- Body (Portable Text)
- Sources (repeatable `sourceReference` list)

### Opinion content
- If contentType == Opinion, ensure the writing clearly separates:
  - what is known (claims with citations)
  - interpretation/value judgments (explicitly labeled)

## Policy Note workflow
Document type: **Policy note** (`policyNote`)

Fill:
- Title, Slug (required)
- Primary topic (required)
- Policy lens (one line describing the policy question)
- Summary bullets, Body, Sources (same pattern as Insight)

## Frontend expectations
- Insight routes: `/insights/{slug}`
- Policy routes: `/policy/{slug}`
- Cards show a pill label:
  - Insight uses its content type
  - Policy uses “Policy Note”

## Definition of done
- Post appears in the correct index page (Insights or Policy)
- Post page renders:
  - title, date, content type pill
  - summary bullets
  - sources section (if provided)
