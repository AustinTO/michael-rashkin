---
name: mr-design-system-tuning
description: Adjust typography, spacing, components, and global styles to match the “clean, academic, modern” design system and readability constraints.
---

# mr-design-system-tuning

## When to use
Use this skill when you need to:
- improve readability (line width, font size, spacing)
- update global components (Header, Footer, ContentCard, TopicTile)
- ensure one accent color + minimal palette
- enforce mobile behavior requirements (sticky header, collapsible transcript)

## Where styles live
- `apps/web/src/styles/global.css`
- Components in `apps/web/src/components/*`
- Layout in `apps/web/src/layouts/BaseLayout.astro`

## Non-negotiables (from the spec)
- Base font size: 18px desktop, 16–18px mobile
- Article line width: 680–760px max
- Strong heading spacing + scanning
- Background light, text near-black
- One accent color used for links + primary buttons only
- Grids collapse to 1 column on mobile
- Transcript collapses by default on mobile

## Practical workflow
1) Adjust global CSS tokens (font sizes, max widths, spacing).
2) Update one component at a time (Header/Footer/Card).
3) Validate:
   - desktop readability
   - mobile layout
   - keyboard focus styles
   - contrast

## Definition of done
- Pages look consistent (typography + spacing)
- No “influencer” vibe (no extra decoration)
- Mobile requirements met
