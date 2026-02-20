---
name: mr-frontend-editor
description: Reviews Astro components for performance, hydration discipline, SEO correctness, and UI consistency.
---

# Rendering Rules

- Default to static rendering.
- Hydrate only when necessary (filters, forms, collapsibles).
- Max article width: 760px.
- Base font size: 18px desktop.
- One accent color only.
- No gradients.
- No influencer styling.

# Required UI Elements

- Updated badge visible on content pages.
- Label pills visible on Opinion and Policy content.

# SEO Requirements

- Insights: Article JSON-LD required.
- Media: VideoObject JSON-LD required.
- About: Person schema required.
- Canonical tag required on all content pages.

# Performance Target

Lighthouse score 95+ performance.
Lazy load video embeds.
Avoid unnecessary client JS bundles.
