# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server.
- `npm run build` — typecheck (`tsc`) then production build to `dist/`. The build will fail on type errors; `tsc` here uses the composite `tsconfig.app.json` which emits declarations to `.types/app/` and build info to `.tsbuild/app/`.
- `npm run start` — serve the prebuilt `dist/` with `serve -s dist` (used by Heroku via `Procfile`; not for local dev).
- `npm run test` — run Vitest once. Append a path or `-t "<name>"` to run a single file/test, e.g. `npm run test -- src/__tests__/sanity.test.ts -t "runs"`. Watch mode: `npx vitest`.
- No `lint` script is wired up; lint manually with `npx eslint .` if needed. The ESLint config (`eslint.config.js`) intentionally disables `@typescript-eslint/no-unused-vars` and `no-explicit-any` — do not "fix" unused vars or `any` just to satisfy lint.

Node 22.x / npm 10.x (declared in `engines`).

## Architecture

This is a portfolio site (`portfolio-v1`) — currently a single-page landing built with React 19 + TypeScript + Vite 6. Routing exists (`react-router-dom`) but only the `/` route is mounted in `src/App.tsx`.

**Two-tier component layout under `src/components/`:**
- `landing/` — the actual page sections (`LandingPage.tsx` composes `Navbar`, `Hero`, `Projects`, `About`, `Contact`, `Footer`). Project metadata is hardcoded in `landing/Projects.tsx`.
- `ui/` — shadcn/ui primitives (new-york style, stone base color, lucide icons; see `components.json`). Add new shadcn components via the shadcn CLI so they land here.
- `_seraphone_archive/` — **archived prior app, explicitly excluded from `tsconfig.app.json`.** Do not import from this directory; do not type-check or refactor it as part of unrelated work. Many large `dependencies` in `package.json` (three, react-three-fiber, react-dnd, recharts, react-d3-tree, stripe, axios, etc.) are leftovers from this archive and are not used by the live landing page.

**Styling stack — Tailwind v4 via `@tailwindcss/vite`.** Tokens live in CSS (`src/index.css`, `src/styles/globals.css`) using `oklch()` and `hsl(var(--token))` patterns and shadcn-style semantic names (`--background`, `--foreground`, `--primary`, etc.). A legacy `tailwind.config.ts` still exists and references the same tokens — treat it as transitional; prefer adding tokens in CSS for Tailwind v4.

**Path alias `@/*` → `./src/*`** is configured in both `vite.config.ts` and `tsconfig.app.json`. Use it for cross-directory imports.

**Tests** use Vitest + jsdom + `@testing-library/react`. Setup is in `src/test-setup.ts` (imports `@testing-library/jest-dom`). Vitest has `globals: true`, so `describe`/`it`/`expect` are ambient — no imports required in test files. The same `@/*` alias is wired in `vitest.config.ts`.

**Environment variables** are Vite-style (`VITE_*`) in `.env`. The current landing page does not consume them, but `VITE_API_BASE_URL`, `VITE_TWILIO_NUMBER`, and `VITE_STRIPE_PUBLISHABLE_KEY` are defined — historically used by the archived app. Note that `.env` is checked in and currently contains a live Stripe publishable key; flag any change that would expose more secrets.

**Deployment** is Heroku. `Procfile` runs `npm run start` (static serve of `dist/`). `deploy.sh` does `git add . && git commit -am "make it better" && git push heroku master` — it commits everything in the working tree with a fixed message, so be careful what's staged before invoking it. `.slugignore` excludes `server/` and `*.d.ts` from the slug.

**The HTML title is `seraphone.ai`** (`index.html`) — Seraphone is one of the showcased projects, not the framework. Don't "fix" the title to match the package name (`phone_app`) or the directory (`portfolio-v1`).
