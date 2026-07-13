# design-sync notes — aebauer.dev Design System (aurora-ui)

Repo-specific gotchas for future syncs. This repo is an **application** (`package.json` name `phone_app`), not a component-library package — the design system is the shadcn/ui primitives under `src/components/ui/` on the "Dark Aurora" brand.

## Source shape: package (synth-entry via a barrel)
- There is **no component-library `dist`** (the repo's `dist/` is the bundled app). The converter runs in package shape against a hand-written barrel entry: `cfg.entry = .design-sync/ds-entry.ts` (re-exports all 22 ui primitives). This also makes `PKG_DIR` resolve to the repo root.
- `node_modules/aurora-ui` does **not** exist (npm won't self-install). Do **not** drop `cfg.entry` — without it the build fails `ENOENT … node_modules/aurora-ui/package.json`.
- `componentSrcMap` lists the 22 primaries that get cards; the barrel `export *` still puts every sub-part (CardHeader, DialogContent, SelectItem, …) on `window.Aurora`, importable but without its own card.

## CSS / brand tokens
- `cfg.cssEntry = .design-sync/compiled.css` — a **generated snapshot** of the app's compiled Tailwind v4 output (`dist/assets/index-*.css`, the Dark Aurora theme from `src/styles/globals.css`) with a Google-Fonts `@import` for **Space Grotesk** prepended.
- The app imports **`src/styles/globals.css`** only. `src/index.css` (light "stone" oklch tokens) is **vestigial / unimported** — ignore it.
- **Re-sync: regenerate `compiled.css`** whenever `globals.css` (or component classes) change:
  `npm run build` → prepend `@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");` to the newest `dist/assets/index-*.css` and write the result to `.design-sync/compiled.css`. The dist CSS filename is content-hashed, so this is a copy step, not a fixed path.

## Preview surface + provider
- The preview harness renders on a **white** body (hardcoded in `lib/emit.mjs`, a contract surface — do NOT fork it). This DS is **single dark mode**, so `cfg.provider` wraps every preview in `ThemeSurface` (`.design-sync/theme-surface.tsx`, injected via `extraEntries`) which applies `bg-background text-foreground` + padding. Inner provider = `TooltipProvider` (Radix tooltip context; harmless globally).

## Contracts (.d.ts)
- Synth mode can't resolve shadcn's inline prop types (`React.ComponentProps<"button"> & VariantProps<…>`), so the auto-extracted `.d.ts` would be stubs (`[key: string]: unknown`). Real, **curated** prop bodies are hand-written in `cfg.dtsPropsFor` for all 22. Update them if a component's real API changes.

## Grouping / docs
- `cfg.docsDir = .design-sync/docs`; each `<Name>.md` has frontmatter `category:` (sets the group) and a usage body (becomes the `.prompt.md`, with the curated Props block appended automatically). Six groups: actions, data-display, feedback, forms, layout, overlays.

## Overlays + Toaster (preview specifics)
- Dialog, Select, DropdownMenu, Tooltip previews render `open` with an inline trigger; `cfg.overrides.<Name>` sets `cardMode: single` + a `viewport`. Their portal content escapes `ThemeSurface` (portals to `document.body`), so a modal backdrop sits over the harness's white page — a **preview artifact, not a component defect**.
- Toaster preview imports `Toaster` **and** `toast` from `sonner` (same instance) so a live toast renders. In real app code: mount `Toaster` from `aurora-ui` and call `toast()` from `sonner` — aurora-ui's `Toaster` is sonner's, pre-themed.

## Preview authoring (learned during the first sync)
- **`compiled.css` only contains utilities Tailwind scanned from `src/`.** `preview-rebuild` does NOT recompile Tailwind — it links the static `_ds_bundle.css` (= `compiled.css`). Any Tailwind class that appears **only** in a preview `.tsx` (never in `src/`) silently no-ops. Confirmed absent: `size-10`, `size-12`, `h-40`, `my-2`, `my-3`, `ring-2`, `ring-background` (present: `size-8`, `w-64`, `rounded-md`, `border`). So preview-only **sizing/spacing must use inline `style`** (component/token classes like `bg-*`/`text-*`/`border` are fine — they're all in `src/`). To let previews use arbitrary utilities, regenerate `compiled.css` with `.design-sync/previews/` added to Tailwind's content scan. **This same limit likely applies to designs the agent builds** — only utilities in the shipped `styles.css` closure resolve, so the conventions header steers the agent to token classes + components rather than arbitrary utilities.
- `ScrollArea` needs `type="auto"` (default `"hover"` shows no scrollbar in a cursorless static capture).
- `Skeleton`'s `animate-pulse` never fires in a static PNG — visibility rests on `bg-muted` vs the dark surface (reads fine now; a darker `--muted` would be a token escalation, never hardcode a color).
- Slider cells: choose values that land at **visibly different track positions** so the variant axis reads on the sheet.
- Previews don't import React by convention — use `as const` on shared style objects instead of a `React.CSSProperties` annotation.
- Multi-cell previews are wider than the product grid cell → `cfg.overrides.<Name>: {"cardMode": "column"}` (applied to the 11 multi-cell components); portal overlays use `{"cardMode": "single", "viewport": "WxH"}`.

## Known render warns (expected — not new)
- `[FONT_REMOTE] "Space Grotesk"` — loaded via the remote `@import`; expected, no action.
- `tokens: … (1 missing, below threshold)` — a stray `var(--*)` reference with no definition; non-blocking.

## Re-sync risks (watch-list)
- **`compiled.css` staleness**: it's a build snapshot. If `globals.css` changes and it isn't regenerated (see CSS section), the DS ships the old brand.
- **`cfg.dtsPropsFor` drift**: hand-curated; diverges silently if shadcn component APIs change. Re-check against source on a component bump.
- **Overlay/Toaster previews** depend on Radix `open`/portal and sonner behavior; re-verify their sheets after a radix/sonner/shadcn version bump.
- The barrel `.design-sync/ds-entry.ts` must list every ui primitive to sync — add new primitives there **and** in `componentSrcMap` + `dtsPropsFor` + a `docs/<Name>.md`.
