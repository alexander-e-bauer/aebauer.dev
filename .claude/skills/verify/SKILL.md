---
name: verify
description: How to run and visually verify the portfolio landing page after changes
---

# Verifying portfolio-v1 changes

Single-page Vite + React app; the only surface is the landing page in a browser.

## Launch

```bash
npm run dev -- --port 5199   # run in background; ready in <1s at http://localhost:5199
```

## Drive

Use Playwright MCP tools (`mcp__plugin_playwright_playwright__browser_*`):

- Navigate to `http://localhost:5199` and screenshot at 1600x900 for desktop, 375x812 for mobile.
- The page is one route; sections are anchors: `#top` (hero), `#projects`, `#about`, `#contact`.
- Project cards toggle an expand drawer on click/Enter/Space; Escape or outside-click closes.
  Drawer DOM ids are `project-drawer-<id>` — check `article[aria-expanded="true"]` count to
  assert open/closed state.
- Buttons inside cards (tel: links, live-demo CTAs) must `stopPropagation` — clicking them
  should NOT toggle the drawer. Card CTAs open external sites in a new tab.

## Gotchas

- Playwright screenshots land in the repo root / `.playwright-mcp/` — delete temp captures
  before finishing so they don't get committed.
- `#projects` anchor on initial load may not scroll (content shifts); use
  `document.getElementById('projects').scrollIntoView()` via browser_evaluate instead.
- Project screenshots live in `public/assets/landing/` and are referenced as
  `/assets/landing/<name>.png`; capture at 16:9 (drawer pane is `aspect-video`).
