---
name: mr-sanity-mcp-workflow
description: Uses Sanity MCP tools to inspect, create, update, and validate content documents.
---

# MCP Workflow Rules

When working with Sanity via MCP:

1. Query existing documents before creating new ones.
2. Validate required fields are present.
3. Ensure topic references exist before assigning.
4. Never duplicate slugs.
5. Update `updatedDate` when modifying content.
6. Log corrections when factual changes are made.

If schema mismatch occurs, reconcile schema before proceeding.
