---
name: mr-astro-seo-structured-data
description: Implement or adjust SEO meta tags, OpenGraph, canonical URLs, and JSON-LD structured data for pages (Article/VideoObject/Person) in the Astro frontend.
---

# mr-astro-seo-structured-data

## When to use
Use this skill when you need to:
- improve SEO metadata or social previews
- add structured data (JSON-LD) to Insights/Policy/Media/About
- ensure canonical URLs are correct

## Where SEO helpers live
- `apps/web/src/lib/seo.ts` — helper to build meta tags
- `apps/web/src/layouts/BaseLayout.astro` — global head wrapper

## Expected meta per page
Every page should have:
- `<title>`
- meta description (when available)
- canonical URL
- OG tags (title, description, url)
- Twitter card tags (optional but recommended)

## Structured data expectations
- Insights + Policy: `Article` schema
- Media episodes: `VideoObject` schema (when possible)
- About page: `Person` schema

## Definition of done
- Page preview looks correct in social share (OG)
- No obvious missing title/description
- JSON-LD validates in rich results testing tools (when used)
