---
name: mr-frontend-tester
description: Systematically tests routes, content rendering, structured data, and filter logic.
---

# Test Checklist

For each new or modified page:

1. Verify route resolves correctly.
2. Verify 404 handling for invalid slug.
3. Verify Updated date renders.
4. Verify label pill renders correctly.
5. Verify related content auto-filters by topic.
6. Verify no console errors.
7. Validate JSON-LD structure.
8. Confirm mobile layout responsiveness.

If any test fails, output a structured failure report.
