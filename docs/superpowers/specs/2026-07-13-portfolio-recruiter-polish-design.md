# Portfolio recruiter polish — design

**Date:** 2026-07-13
**Goal:** Make aebauer.dev read as more impressive to recruiters, optimized first for FDE roles (Anthropic FDE Applied AI, Glean Founding FDE), without hurting the SE/ML/SWE reads.
**Appetite:** 1–2 days including visuals. Applications go out this week.
**Basis:** remaining items from `portfolio_review_20260712.md` (§4 nice-to-haves, §7 what-to-add), plus corrections from Alex on the real Seraphone architecture.

## Decisions already made

- FDE-first: the site's job is to show closed loops, demos that demo themselves, and translation skill.
- No invented outcome numbers anywhere. Only claims Alex has actually made (e.g. the 25% forecast lift in About) may appear.
- No nameable Seraphone customer — lean on the live demo lines, not case-study names.
- Public code: only `r_machine_learning` (Atlas) and `aebauer.dev` (this site). Seraphone and RAPTOR repos stay private → "code available on request."
- One-page site stays. No per-project routes this round.

## §1 — "How I work" section

New `src/components/landing/HowIWork.tsx`, rendered in `LandingPage.tsx` between `Projects` and `About`. Same section grammar as About: uppercase aurora eyebrow ("Approach"), `font-heading` H2, prose paragraphs, `max-w-3xl`. Navbar unchanged.

Copy (approved as a starting point; Alex may edit wording in review):

> **H2:** Start with the phone call, not the model.
>
> I start with the customer conversation. My day job is fielding calls from financial advisors, wealth managers, and trust attorneys — people who don't care what an embedding is, and shouldn't have to. The systems I build start there: where does it hurt, what has to never break, who has to trust it. Then I work backward to the architecture.
>
> The "AI-powered systems" half of my work exists to make the "translate them" half unnecessary. Seraphone answers the phone so a practice manager doesn't have to. The atlas and the codebase analyzer are retrieval you can inspect, not generation you have to trust. I'd rather ship a boring integration that removes a category of work than an impressive demo that needs babysitting.

Section id `how-i-work` with `scroll-mt-24` for consistency (not linked from nav).

## §2 — Seraphone architecture diagram + corrected copy

### Real architecture (source of truth, from Alex)

Four-service mesh:
1. **Call engine (FastAPI)** — Twilio webhooks + media streams in; bidirectional WebSocket to the **OpenAI Realtime API** (interruptible voice loop). A **live governance layer** runs during the call: compliance guardrails (no false promises, scope limits), spam/hostility/confusion-loop detection, dead-air monitors, dynamic routing/escalation.
2. **Real-time fan-out** — call state in **Redis** (TTL) streaming over pub/sub through the REST backend's WebSocket router to the **React SPA dashboard** live.
3. **MCP tool server** — tool actions (calendar / CRM / email) invoked by the LLM; the engine injects tenant OAuth credentials; auth via time-scoped **one-time-nonce Fernet tokens** with credential-fingerprint binding.
4. **Post-call pipeline** — PII redaction, caller profiling, summaries, **Vertex AI embeddings** → per-tenant **caller knowledge graph on Postgres/pgvector** (cosine HNSW), sensitive fields Fernet-encrypted at rest.

Multi-tenant (personal + business workspaces), feature-flag entitlements, Stripe billing. Backends on GCP Cloud Run, frontend on Vercel.

### Diagram component

`src/components/landing/SeraphoneArchitecture.tsx` — a hand-authored inline SVG (no chart lib), rendered full-width in the Seraphone drawer below the screenshot+copy grid (`ProjectDetail` gains an optional `diagram` slot on the project data). Style: nodes as rounded rects matching card chrome (`bg-card`, `border-white/10` equivalents in SVG), aurora-gradient edges, muted labels; must read on the dark background and scale via `viewBox` (mobile: horizontal-scroll container, min-width ~720px).

Three lanes:
- **Live call lane:** Caller → Twilio (media streams) → FastAPI call engine ⇄ OpenAI Realtime API, with the governance layer drawn as an attached badge on the engine: "in-call governance: compliance · spam/hostility detection · dead-air monitors · escalation".
- **Fan-out lane:** engine → Redis (state · TTL · pub/sub) → WS router → live React dashboard.
- **Actions & memory lane:** engine → MCP tool server (calendar/CRM/email) annotated "one-time-nonce Fernet auth · tenant-bound credentials"; engine → post-call pipeline (PII redaction → summaries → Vertex embeddings) → caller KG (Postgres/pgvector, HNSW) annotated "Fernet-encrypted at rest".

Caption under the SVG: *"The demo lines above run this exact path."*

### Seraphone copy corrections (drawer + tags)

`longDescription` is rewritten from Alex's elevator version (current copy undersells and partly mis-describes the system):

> Seraphone is a four-service mesh replacing IVR phone trees. Twilio media streams hit a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API — an interruptible voice loop, governed while the call is live: compliance guardrails, spam and hostility detection, dead-air monitors, dynamic escalation. Call state fans out through Redis pub/sub to a live React dashboard. Tool actions — calendar, CRM, email — are offloaded to an MCP server behind one-time-nonce Fernet auth with tenant-bound credential injection. After hang-up, a post-call pipeline redacts PII, embeds with Vertex AI, and folds every call into a per-tenant caller knowledge graph on Postgres/pgvector, sensitive fields encrypted at rest.

Stack tags become: `Python · FastAPI · OpenAI Realtime · Twilio · PostgreSQL/pgvector · Redis · MCP · React`.

Card `description` keeps its current shape (still accurate) — only the HIPAA phrasing must stay consistent with what the drawer now claims (PII redaction + encryption at rest support it; keep "HIPAA-compliant" as already published).

## §3 — Skim layer + code links

- **Taglines** — optional `tagline` on `ProjectCardData`; rendered as one `text-xs font-mono text-muted-foreground` line directly under the card title, middot-separated:
  - Seraphone: `Twilio ↔ OpenAI Realtime voice · in-call governance · encrypted caller KG`
  - Atlas: `12,000 papers · UMAP + RAPTOR · deck.gl relief`
  - RAPTOR: `Tree-sitter ASTs · hierarchical summaries · WebSocket chat`
  Fallback if the card visibly crowds at implementation: move the line into the drawer header instead.
- **Freshness** — optional `lastShipped` per project, right-aligned beside "About this project" in the drawer: "Shipped · July 2026". Values: Seraphone **July 2026**, Atlas **June 2026**, RAPTOR **July 2026**.
- **Footer** — two additions to `Footer.tsx`: a `Currently building: <text Alex supplies at implementation — must be true that week>` line, and *"This site is open source →"* linking to `https://github.com/alexander-e-bauer/aebauer.dev`.
- **Code links** — Atlas drawer gets a secondary outline "View code" button (GitHub icon) → `https://github.com/alexander-e-bauer/r_machine_learning`, next to "View project site". Seraphone and RAPTOR drawers get a quiet one-line *"Code available on request."* under the CTA. Modeled as optional `github?: string` / `codeNote?: string` on `ProjectCardData`.

## §4 — Wow layer

- **Live pulse** — small pulsing aurora dot before the "LIVE DEMO" eyebrow on all three cards (CSS keyframe, respects `prefers-reduced-motion`).
- **Call hint** — italic microcopy under the Seraphone call-button grid: *"Try: 'I'd like to book a service visit' — ninety seconds tells you more than this card can."* Modeled as optional `demoHint` on `ProjectCardData`.
- **OG image refresh** — re-capture `public/assets/landing/og-image.jpg` at 1200×630 from the updated hero (Playwright, same filename so `index.html` is untouched).

## Plumbing

- `ProjectCardData` gains optional: `tagline`, `github`, `codeNote`, `lastShipped`, `demoHint`, `diagram` (React component type).
- New components: `HowIWork.tsx`, `SeraphoneArchitecture.tsx` (both in `src/components/landing/`).
- Edits: `ProjectCard.tsx` (tagline, pulse dot, demo hint), `ProjectDetail.tsx` (diagram slot, View code / code-note, lastShipped), `Footer.tsx`, `LandingPage.tsx` (section order), `Projects.tsx` (data only).
- Nested-interactive caveat: the card already contains links inside `role="button"`; the tagline/dot/hint add no new interactive elements, and the View-code button lives in the drawer (outside the card button), so the a11y posture does not get worse.

## Out of scope

- Per-project routes / case-study pages; audio call recordings; nav changes; any edits to ml.aebauer.dev or kg.aebauer.dev (separate repos — RAPTOR demo fix is in progress by Alex).

## Verification

`npx tsc -b tsconfig.app.json --force` (the real typecheck), `npm run build`, `npm run test`, then the project verify skill: Playwright pass at 1600×900 and 375×812 covering the new section, diagram render in the Seraphone drawer, tagline/dot/hint on cards, footer links, and keyboard behavior (no regression to the Enter-on-card fix). Re-capture OG image last, after visual sign-off.
