# Portfolio Recruiter Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the FDE-targeted polish layer to aebauer.dev: a "How I work" section, a real Seraphone architecture diagram + corrected copy, card taglines/live-pulse/call-hint, drawer shipped-dates and code links, footer freshness, and a refreshed OG image.

**Architecture:** All changes live in the existing single-page landing (`src/components/landing/`). Two new presentational components (`HowIWork`, `SeraphoneArchitecture`); everything else is optional fields on `ProjectCardData` rendered by `ProjectCard`/`ProjectDetail`, plus small `Footer`/`LandingPage` edits. No new routes, no new dependencies.

**Tech Stack:** React 19 + TypeScript, Tailwind v4, Vitest + jsdom + @testing-library/react, lucide-react icons, hand-authored inline SVG.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-13-portfolio-recruiter-polish-design.md`. Copy strings verbatim from it (and from this plan) — no invented outcome numbers anywhere.
- Path alias `@/*` → `./src/*` works in src and tests.
- Vitest has `globals: true` — `describe`/`it`/`expect` are ambient; you still import `render`/`screen` from `@testing-library/react`. Test files go in `src/__tests__/`.
- Do NOT render `LandingPage` or `Hero` in jsdom tests (`window.matchMedia` is not stubbed) and do not open project drawers via `Projects` (ResizeObserver is not stubbed). Render leaf components directly.
- ESLint intentionally disables `no-unused-vars`/`no-explicit-any` — do not "fix" those in touched files.
- The real typecheck is `npx tsc -b tsconfig.app.json --force` (plain `tsc` in `npm run build` checks zero files).
- Run a single test file: `npm run test -- src/__tests__/<file>`.
- Every commit message ends with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Do not push. Commits stay local; Alex pushes via `push.sh`.

---

### Task 1: "How I work" section

**Files:**
- Create: `src/components/landing/HowIWork.tsx`
- Modify: `src/components/landing/LandingPage.tsx`
- Test: `src/__tests__/how-i-work.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `HowIWork: React.FC` (default export), rendered between `<Projects />` and `<About />`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/__tests__/how-i-work.test.tsx
import { render, screen } from '@testing-library/react';
import HowIWork from '@/components/landing/HowIWork';

describe('HowIWork', () => {
  it('renders the approach section with heading and copy', () => {
    render(<HowIWork />);
    expect(
      screen.getByRole('heading', { name: /start with the phone call, not the model/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/I start with the customer conversation/i)).toBeInTheDocument();
    expect(screen.getByText(/retrieval you can inspect/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/how-i-work.test.tsx`
Expected: FAIL — cannot resolve `@/components/landing/HowIWork`.

- [ ] **Step 3: Create the component**

```tsx
// src/components/landing/HowIWork.tsx
import React from 'react';

const HowIWork: React.FC = () => {
  return (
    <section id="how-i-work" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
          Approach
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10">
          Start with the phone call, <span className="text-aurora">not the model.</span>
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I start with the customer conversation. My day job is fielding calls from financial
            advisors, wealth managers, and trust attorneys — people who don't care what an
            embedding is, and shouldn't have to. The systems I build start there: where does it
            hurt, what has to never break, who has to trust it. Then I work backward to the
            architecture.
          </p>
          <p>
            The "AI-powered systems" half of my work exists to make the "translate them" half
            unnecessary. Seraphone answers the phone so a practice manager doesn't have to. The
            atlas and the codebase analyzer are retrieval you can inspect, not generation you
            have to trust. I'd rather ship a boring integration that removes a category of work
            than an impressive demo that needs babysitting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
```

- [ ] **Step 4: Wire into LandingPage**

In `src/components/landing/LandingPage.tsx`, add the import after the `Projects` import and render it between `<Projects />` and `<About />`:

```tsx
import Projects from './Projects';
import HowIWork from './HowIWork';
import About from './About';
```

```tsx
      <main>
        <Hero />
        <Projects />
        <HowIWork />
        <About />
        <Contact />
      </main>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- src/__tests__/how-i-work.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/HowIWork.tsx src/components/landing/LandingPage.tsx src/__tests__/how-i-work.test.tsx
git commit -m "Add 'How I work' section between Projects and About

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Card skim layer — tagline, live pulse, call hint

**Files:**
- Modify: `src/components/landing/ProjectCard.tsx`
- Modify: `src/components/landing/Projects.tsx` (data only)
- Test: `src/__tests__/project-card.test.tsx`

**Interfaces:**
- Consumes: existing `ProjectCardData` / `ProjectCardProps` in `ProjectCard.tsx`.
- Produces: `ProjectCardData` gains `tagline?: string; live?: boolean; demoHint?: string;`. The pulse dot element has `data-testid="live-pulse"`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/__tests__/project-card.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/landing/ProjectCard';

const base = {
  id: 'x',
  title: 'X Project',
  subtitle: 'AI — Live Demo',
  description: 'desc',
  stack: ['Python'],
  url: 'https://example.com',
  isOpen: false,
  onToggle: () => {},
};

describe('ProjectCard skim layer', () => {
  it('renders tagline, live pulse, and demo hint when provided', () => {
    render(
      <ProjectCard
        {...base}
        live
        tagline="alpha · beta · gamma"
        demoNumbers={[{ label: 'Test line', number: '+1-555-000-1111' }]}
        demoHint="Try: say hello — ninety seconds."
      />
    );
    expect(screen.getByText('alpha · beta · gamma')).toBeInTheDocument();
    expect(screen.getByTestId('live-pulse')).toBeInTheDocument();
    expect(screen.getByText(/Try: say hello/i)).toBeInTheDocument();
  });

  it('renders none of them when the fields are absent', () => {
    render(<ProjectCard {...base} />);
    expect(screen.queryByTestId('live-pulse')).not.toBeInTheDocument();
    expect(screen.queryByText(/Try:/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/project-card.test.tsx`
Expected: FAIL — TS error: `live`/`tagline`/`demoHint` not in props type (and/or missing testid at runtime).

- [ ] **Step 3: Extend the interface in `ProjectCard.tsx`**

Add three fields to `ProjectCardData` (after `demoCta?: string;`):

```tsx
  /** Label for an always-visible "open the live demo" button on the card. */
  demoCta?: string;
  /** One-line technical skim under the title, middot-separated. */
  tagline?: string;
  /** Renders a pulsing dot before the subtitle eyebrow. */
  live?: boolean;
  /** Italic microcopy under the call buttons suggesting what to say. */
  demoHint?: string;
```

- [ ] **Step 4: Render the three elements**

In the component, add `tagline`, `live`, `demoHint` to the destructured props (next to `demoCta`). Then:

Replace the subtitle `<p>` with:

```tsx
      <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-2 flex items-center gap-2">
        {live && (
          <span aria-hidden="true" data-testid="live-pulse" className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--aurora-2))] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--aurora-2))]" />
          </span>
        )}
        {subtitle}
      </p>
```

Directly after the title `<h3>` (which keeps `mb-3`), add:

```tsx
      {tagline && (
        <p className="text-xs font-mono text-muted-foreground/80 -mt-2 mb-3">{tagline}</p>
      )}
```

Replace the demo-numbers block's outer structure so the hint sits inside it:

```tsx
      {demoNumbers && demoNumbers.length > 0 && (
        <div className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoNumbers.map(({ label, number }) => (
              <a
                key={number}
                href={`tel:${number}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-aurora text-white px-4 py-2.5 text-center shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Phone className="w-4 h-4" />
                  Call {formatPhone(number)}
                </span>
                <span className="text-[11px] font-medium leading-tight opacity-85">{label}</span>
              </a>
            ))}
          </div>
          {demoHint && (
            <p className="mt-2 text-xs italic text-muted-foreground/80">{demoHint}</p>
          )}
        </div>
      )}
```

(The inner `<a>` is unchanged from the current file — only the wrapper `<div className="mb-5">` and the hint `<p>` are new.)

- [ ] **Step 5: Add the data in `Projects.tsx`**

Seraphone entry gains:

```tsx
    live: true,
    tagline: 'Twilio ↔ OpenAI Realtime voice · in-call governance · encrypted caller KG',
    demoHint: "Try: 'I'd like to book a service visit' — ninety seconds tells you more than this card can.",
```

Atlas entry gains:

```tsx
    live: true,
    tagline: '12,000 papers · UMAP + RAPTOR · deck.gl relief',
```

RAPTOR entry gains:

```tsx
    live: true,
    tagline: 'Tree-sitter ASTs · hierarchical summaries · WebSocket chat',
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm run test -- src/__tests__/project-card.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/ProjectCard.tsx src/components/landing/Projects.tsx src/__tests__/project-card.test.tsx
git commit -m "Add card taglines, live-pulse dot, and Seraphone call hint

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Drawer meta — shipped date, View code, code-on-request

**Files:**
- Modify: `src/components/landing/ProjectCard.tsx` (interface only)
- Modify: `src/components/landing/ProjectDetail.tsx`
- Modify: `src/components/landing/Projects.tsx` (data only)
- Test: `src/__tests__/project-detail.test.tsx`

**Interfaces:**
- Consumes: `ProjectCardData` from Task 2's state of `ProjectCard.tsx`; `ProjectDetail` props `{ project: ProjectCardData }`.
- Produces: `ProjectCardData` gains `github?: string; codeNote?: string; lastShipped?: string;`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/__tests__/project-detail.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectDetail from '@/components/landing/ProjectDetail';
import type { ProjectCardData } from '@/components/landing/ProjectCard';

const base: ProjectCardData = {
  id: 'x',
  title: 'X Project',
  subtitle: 's',
  description: 'desc',
  stack: [],
  url: 'https://example.com',
};

describe('ProjectDetail drawer meta', () => {
  it('shows shipped date and a View code link when github is set', () => {
    render(
      <ProjectDetail
        project={{
          ...base,
          lastShipped: 'July 2026',
          github: 'https://github.com/alexander-e-bauer/r_machine_learning',
        }}
      />
    );
    expect(screen.getByText('Shipped · July 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view code/i })).toHaveAttribute(
      'href',
      'https://github.com/alexander-e-bauer/r_machine_learning'
    );
  });

  it('shows the code note when codeNote is set and no github link', () => {
    render(<ProjectDetail project={{ ...base, codeNote: 'Code available on request.' }} />);
    expect(screen.getByText('Code available on request.')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view code/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/project-detail.test.tsx`
Expected: FAIL — TS error: `lastShipped`/`github`/`codeNote` not in `ProjectCardData`.

- [ ] **Step 3: Extend the interface in `ProjectCard.tsx`**

Add after the Task 2 fields:

```tsx
  /** Public repo URL — renders a "View code" button in the drawer. */
  github?: string;
  /** Quiet line under the drawer CTAs, e.g. "Code available on request." */
  codeNote?: string;
  /** Freshness signal shown in the drawer header, e.g. "July 2026". */
  lastShipped?: string;
```

- [ ] **Step 4: Render in `ProjectDetail.tsx`**

Add `Github` to the lucide import:

```tsx
import { ArrowUpRight, Github, ImageOff } from 'lucide-react';
```

Replace the "About this project" eyebrow `<p>` with a header row:

```tsx
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))]">
              About this project
            </p>
            {project.lastShipped && (
              <p className="text-xs text-muted-foreground/70 whitespace-nowrap">
                Shipped · {project.lastShipped}
              </p>
            )}
          </div>
```

Replace the CTA block (the `{hasUrl ? <Button …> : <p …>}` ternary) with:

```tsx
          {hasUrl ? (
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="rounded-full bg-aurora text-white font-semibold shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all w-full sm:w-auto"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View project site
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
                {project.github && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-transparent shadow-none font-semibold border-[hsl(var(--aurora-2))]/50 text-[hsl(var(--aurora-2))] hover:bg-[hsl(var(--aurora-2))]/10 hover:text-[hsl(var(--aurora-2))] hover:border-[hsl(var(--aurora-2))] w-full sm:w-auto"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      View code
                    </a>
                  </Button>
                )}
              </div>
              {project.codeNote && (
                <p className="mt-3 text-xs italic text-muted-foreground/70">{project.codeNote}</p>
              )}
            </div>
          ) : (
            <p className="text-xs italic text-muted-foreground/70">
              Project site link coming soon.
            </p>
          )}
```

- [ ] **Step 5: Add the data in `Projects.tsx`**

Seraphone entry gains:

```tsx
    lastShipped: 'July 2026',
    codeNote: 'Code available on request.',
```

Atlas entry gains:

```tsx
    lastShipped: 'June 2026',
    github: 'https://github.com/alexander-e-bauer/r_machine_learning',
```

RAPTOR entry gains:

```tsx
    lastShipped: 'July 2026',
    codeNote: 'Code available on request.',
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm run test -- src/__tests__/project-detail.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/ProjectCard.tsx src/components/landing/ProjectDetail.tsx src/components/landing/Projects.tsx src/__tests__/project-detail.test.tsx
git commit -m "Add shipped dates, Atlas code link, and code-on-request notes to drawers

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Seraphone architecture diagram + corrected copy

**Files:**
- Create: `src/components/landing/SeraphoneArchitecture.tsx`
- Modify: `src/components/landing/ProjectCard.tsx` (interface only)
- Modify: `src/components/landing/ProjectDetail.tsx` (diagram slot)
- Modify: `src/components/landing/Projects.tsx` (Seraphone copy, tags, diagram wiring)
- Test: `src/__tests__/seraphone-architecture.test.tsx`

**Interfaces:**
- Consumes: `ProjectCardData` from Task 3's state; `ProjectDetail` layout from Task 3.
- Produces: `SeraphoneArchitecture: React.FC` (default export); `ProjectCardData` gains `diagram?: React.ComponentType;`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/__tests__/seraphone-architecture.test.tsx
import { render, screen } from '@testing-library/react';
import SeraphoneArchitecture from '@/components/landing/SeraphoneArchitecture';
import ProjectDetail from '@/components/landing/ProjectDetail';

describe('SeraphoneArchitecture', () => {
  it('renders the call-flow diagram with key services and caption', () => {
    render(<SeraphoneArchitecture />);
    expect(screen.getByText('OpenAI Realtime API')).toBeInTheDocument();
    expect(screen.getByText('MCP tool server')).toBeInTheDocument();
    expect(screen.getByText('Caller knowledge graph')).toBeInTheDocument();
    expect(screen.getByText(/demo lines above run this exact path/i)).toBeInTheDocument();
  });

  it('renders inside the drawer when project.diagram is set', () => {
    render(
      <ProjectDetail
        project={{
          id: 'x',
          title: 'X',
          subtitle: 's',
          description: 'd',
          stack: [],
          url: 'https://example.com',
          diagram: SeraphoneArchitecture,
        }}
      />
    );
    expect(screen.getByText('OpenAI Realtime API')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/seraphone-architecture.test.tsx`
Expected: FAIL — cannot resolve `@/components/landing/SeraphoneArchitecture`.

- [ ] **Step 3: Create the SVG component**

```tsx
// src/components/landing/SeraphoneArchitecture.tsx
import React from 'react';

const NODE_FILL = '#101321';
const NODE_STROKE = 'rgba(255,255,255,0.12)';
const TITLE_FILL = '#e5e7eb';
const SUB_FILL = '#94a3b8';
const NOTE_FILL = '#8b90a0';

const Node: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
}> = ({ x, y, w, h, title, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={12} fill={NODE_FILL} stroke={NODE_STROKE} />
    <text
      x={x + w / 2}
      y={y + (sub ? h / 2 - 4 : h / 2 + 4)}
      textAnchor="middle"
      fontSize="13"
      fontWeight="600"
      fill={TITLE_FILL}
    >
      {title}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="9.5" fill={SUB_FILL}>
        {sub}
      </text>
    )}
  </g>
);

const Edge: React.FC<{ d: string }> = ({ d }) => (
  <path
    d={d}
    fill="none"
    stroke="url(#sera-aurora)"
    strokeWidth="1.6"
    markerEnd="url(#sera-arrow)"
  />
);

// Row centers: live call y=71, fan-out y=239, actions/memory y=359.
const SeraphoneArchitecture: React.FC = () => (
  <figure>
    <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-3">
      Architecture — how a call flows
    </p>
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <svg
        viewBox="0 0 960 430"
        role="img"
        aria-label="Seraphone architecture: Twilio media streams reach a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API, governed in-call; state fans out via Redis pub/sub to a live React dashboard; tool actions go to an MCP server behind one-time-nonce Fernet auth; a post-call pipeline redacts PII and folds every call into an encrypted knowledge graph on Postgres/pgvector."
        className="w-full h-auto min-w-[720px]"
      >
        <defs>
          <linearGradient id="sera-aurora" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <marker
            id="sera-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#e879f9" />
          </marker>
        </defs>

        {/* Live call lane */}
        <Node x={16} y={42} w={100} h={58} title="Caller" />
        <Node x={156} y={42} w={150} h={58} title="Twilio" sub="webhooks · media streams" />
        <Node x={346} y={42} w={200} h={58} title="FastAPI call engine" sub="interruptible voice loop" />
        <Node x={690} y={42} w={180} h={58} title="OpenAI Realtime API" sub="speech in · speech out" />
        {/* Governance badge attached to the engine */}
        <rect
          x={346}
          y={112}
          width={200}
          height={46}
          rx={10}
          fill="transparent"
          stroke="rgba(232,121,249,0.5)"
          strokeDasharray="4 4"
        />
        <text x={446} y={130} textAnchor="middle" fontSize="10" fontWeight="600" fill={TITLE_FILL}>
          in-call governance
        </text>
        <text x={446} y={146} textAnchor="middle" fontSize="9" fill={SUB_FILL}>
          compliance · spam/hostility · dead-air · escalation
        </text>

        {/* Fan-out lane */}
        <Node x={156} y={210} w={150} h={58} title="Redis" sub="call state · TTL · pub/sub" />
        <Node x={346} y={210} w={200} h={58} title="REST backend" sub="WebSocket router" />
        <Node x={690} y={210} w={180} h={58} title="React dashboard" sub="live call view" />

        {/* Actions & memory lane */}
        <Node x={100} y={330} w={210} h={58} title="MCP tool server" sub="calendar · CRM · email" />
        <Node x={380} y={330} w={230} h={58} title="Post-call pipeline" sub="PII redaction · summaries · embeddings" />
        <Node x={670} y={330} w={220} h={58} title="Caller knowledge graph" sub="Postgres/pgvector · HNSW" />

        {/* Security annotations */}
        <text x={205} y={408} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
          one-time-nonce Fernet auth · tenant-bound credentials
        </text>
        <text x={780} y={408} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
          Fernet-encrypted at rest
        </text>

        {/* Edges — live call */}
        <Edge d="M116,71 L152,71" />
        <Edge d="M306,71 L342,71" />
        <Edge d="M546,63 L686,63" />
        <Edge d="M690,79 L550,79" />

        {/* Edges — fan-out */}
        <Edge d="M346,85 C 280,85 231,140 231,206" />
        <Edge d="M306,239 L342,239" />
        <Edge d="M546,239 L686,239" />

        {/* Edges — actions & memory */}
        <Edge d="M370,158 C 320,190 240,250 207,326" />
        <Edge d="M495,158 C 495,220 495,270 495,326" />
        <Edge d="M610,359 L666,359" />

        {/* Edge labels */}
        <text x={252} y={258} fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
          tool calls
        </text>
        <text x={505} y={250} fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
          after hang-up
        </text>
      </svg>
    </div>
    <figcaption className="mt-3 text-xs italic text-muted-foreground/80">
      The demo lines above run this exact path.
    </figcaption>
  </figure>
);

export default SeraphoneArchitecture;
```

- [ ] **Step 4: Add the `diagram` field and drawer slot**

In `ProjectCard.tsx`, add to `ProjectCardData` after `lastShipped`:

```tsx
  /** Optional architecture diagram component rendered full-width in the drawer. */
  diagram?: React.ComponentType;
```

In `ProjectDetail.tsx`, insert a full-width row after the closing `</div>` of the `grid grid-cols-1 md:grid-cols-5` container (still inside the drawer's outer rounded container):

```tsx
      {project.diagram && (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <project.diagram />
        </div>
      )}
```

- [ ] **Step 5: Correct the Seraphone data in `Projects.tsx`**

Add the import at the top of the file:

```tsx
import SeraphoneArchitecture from './SeraphoneArchitecture';
```

In the Seraphone entry: add `diagram: SeraphoneArchitecture,`, replace `longDescription` with (verbatim):

```tsx
    longDescription:
      'Seraphone is a four-service mesh replacing IVR phone trees. Twilio media streams hit a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API — an interruptible voice loop, governed while the call is live: compliance guardrails, spam and hostility detection, dead-air monitors, dynamic escalation. Call state fans out through Redis pub/sub to a live React dashboard. Tool actions — calendar, CRM, email — are offloaded to an MCP server behind one-time-nonce Fernet auth with tenant-bound credential injection. After hang-up, a post-call pipeline redacts PII, embeds with Vertex AI, and folds every call into a per-tenant caller knowledge graph on Postgres/pgvector, sensitive fields encrypted at rest.',
```

and replace `stack` with:

```tsx
    stack: ['Python', 'FastAPI', 'OpenAI Realtime', 'Twilio', 'PostgreSQL/pgvector', 'Redis', 'MCP', 'React'],
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm run test -- src/__tests__/seraphone-architecture.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/SeraphoneArchitecture.tsx src/components/landing/ProjectCard.tsx src/components/landing/ProjectDetail.tsx src/components/landing/Projects.tsx src/__tests__/seraphone-architecture.test.tsx
git commit -m "Add Seraphone architecture diagram and correct drawer copy to real stack

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Footer — currently-building line + open-source link

**Files:**
- Modify: `src/components/landing/Footer.tsx`
- Test: `src/__tests__/footer.test.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Write the failing test**

```tsx
// src/__tests__/footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from '@/components/landing/Footer';

describe('Footer', () => {
  it('shows the currently-building line and open-source link', () => {
    render(<Footer />);
    expect(screen.getByText(/currently building/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /this site is open source/i })).toHaveAttribute(
      'href',
      'https://github.com/alexander-e-bauer/aebauer.dev'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/footer.test.tsx`
Expected: FAIL — text/link not found.

- [ ] **Step 3: Implement**

In `Footer.tsx`, inside `<div className="container mx-auto px-6">`, add a row ABOVE the existing flex row (`<div className="flex flex-col md:flex-row justify-between items-center gap-4">`):

```tsx
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-6 mb-6 border-b border-white/5 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground font-medium">Currently building:</span>{' '}
            improvements to the RAPTOR live demo.
          </p>
          <a
            href="https://github.com/alexander-e-bauer/aebauer.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
          >
            This site is open source →
          </a>
        </div>
```

Note for the reviewer/Alex: the "Currently building" text is a true-today default (Alex said he is fixing the RAPTOR demo). Alex may reword it at review; it must always describe real current work.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/__tests__/footer.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/Footer.tsx src/__tests__/footer.test.tsx
git commit -m "Add currently-building line and open-source link to footer

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: OG image refresh + full verification sweep

**Files:**
- Replace: `public/assets/landing/og-image.jpg` (1200×630 capture of the updated hero)
- No source changes; `index.html` already points at this filename.

**Interfaces:**
- Consumes: everything from Tasks 1–5 rendered by the dev server.
- Produces: final verified state; nothing downstream.

- [ ] **Step 1: Full-suite gates**

```bash
npx tsc -b tsconfig.app.json --force   # expected: exit 0, no output
npm run build                           # expected: "✓ built" with no errors
npm run test                            # expected: all test files pass (sanity + 5 new)
```

- [ ] **Step 2: Start the dev server**

```bash
npm run dev -- --port 5199   # run in background; ready at http://localhost:5199
```

- [ ] **Step 3: Visual verification (Playwright MCP, per `.claude/skills/verify/SKILL.md`)**

At 1600×900 and 375×812, on `http://localhost:5199`:
- "How I work" section renders between Projects and About with the approved copy.
- All three cards show the pulse dot and tagline; Seraphone shows the call hint under the buttons.
- Seraphone drawer: new four-service-mesh copy, new stack tags, architecture diagram renders (nodes "OpenAI Realtime API", "MCP tool server", "Caller knowledge graph" legible; horizontal scroll on mobile), "Shipped · July 2026", "Code available on request."
- Atlas drawer: "View code" button → `r_machine_learning` repo; "Shipped · June 2026".
- Footer: currently-building line + open-source link.
- Keyboard regression: Tab to a call button / demo CTA, press Enter → link activates, drawer does NOT toggle; Enter on the card body still toggles.

- [ ] **Step 4: Capture the OG image**

Resize the Playwright window to exactly 1200×630, navigate to `http://localhost:5199` (hero at top, no scroll), screenshot the viewport as PNG named `og-capture.png` (Playwright MCP drops it in the repo root), then convert over the existing asset:

```bash
sips -s format jpeg -s formatOptions 85 og-capture.png --out public/assets/landing/og-image.jpg
sips -g pixelWidth -g pixelHeight public/assets/landing/og-image.jpg   # expected: 1200 × 630
rm og-capture.png
```

- [ ] **Step 5: Stop the dev server, final commit**

```bash
git add public/assets/landing/og-image.jpg
git commit -m "Refresh OG image to updated hero

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git status --short   # expected: clean except untracked review/scratch files
```
