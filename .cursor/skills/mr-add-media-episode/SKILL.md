---
name: mr-add-media-episode
description: Create Media Episodes (YouTube/Podcast/Interview) with embed URL, key points, timestamps, transcript, sources, and topic linkage so /media/{slug} renders correctly.
---

# mr-add-media-episode

## When to use
Use this skill when you need to:
- add a new YouTube / Podcast / Interview episode
- attach a transcript and sources
- ensure episode pages render consistently

## In Studio: create a Media episode document
Document type: **Media episode** (`mediaEpisode`)

Required:
- Title
- Slug
- Platform (YouTube / Podcast / Interview)
- Embed URL (embeddable)

Recommended:
- Short description (2–3 sentences)
- Key points (5–10 bullets)
- Timestamp outline (optional)
- Transcript (Portable Text; collapsible on frontend)
- Sources (repeatable `sourceReference`)
- Primary topic (recommended)
- Tags (optional)
- Publish date
- Updated date (optional)

## Frontend expectations
- Episode routes: `/media/{slug}`
- The page layout includes:
  - summary + key points
  - timestamps (optional)
  - transcript (collapsible)
  - sources
  - related content (topic-based)

## Definition of done
- Episode appears on `/media`
- Episode page embeds correctly and loads quickly
- Transcript collapses by default on mobile
