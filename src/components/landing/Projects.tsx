import React, { useEffect, useRef, useState } from 'react';
import ProjectCard, { type ProjectCardData } from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import SeraphoneArchitecture from './SeraphoneArchitecture';
import Container from './Container';

const projects: ProjectCardData[] = [
  {
    id: 'seraphone',
    subtitle: 'Featured · AI answering service · Live demo',
    title: 'Seraphone',
    featured: true,
    description:
      "An AI answering service that picks up in real time, talks like a person, and screens spam and social engineering. For businesses it books, routes, and pages while the caller is still on the line; for personal lines it lets the people you trust ring straight through. Don't take the card's word for it. Call it.",
    longDescription:
      "Seraphone is a four-service mesh on GCP Cloud Run. Twilio media streams hit a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API — an interruptible voice loop, governed while the call is live: policy guardrails, spam and social-engineering detection, dead-air monitors, dynamic routing and on-call paging. Voice and SMS share one comms pipeline. Call state fans out through Redis pub/sub to a live React dashboard. Tool actions — availability checks, calendar booking, address lookup — run on an MCP server behind one-time-nonce Fernet auth; it fetches each tenant's credentials itself at execute time and rejects any sent in the request. After hang-up, a post-call pipeline redacts PII, embeds with Vertex AI, and folds every call into a per-tenant caller knowledge graph on Postgres/pgvector, sensitive fields encrypted at rest.",
    stack: ['Python', 'FastAPI', 'OpenAI Realtime', 'Twilio', 'pgvector', 'Redis', 'MCP'],
    url: 'https://seraphone.ai',
    screenshot: '/assets/landing/seraphone-landing.webp',
    screenshotAlt:
      'Seraphone landing page: "Stop missing important calls" beside a phone playing a live booking call',
    detailScreenshot: '/assets/landing/dashboard-mockup.png',
    diagram: SeraphoneArchitecture,
    demoNumbers: [
      { number: '+1-971-455-1825', label: 'Summit Comfort · business demo' },
      { number: '+1-313-476-2606', label: 'Carol Carter · personal demo' },
    ],
    live: true,
    tagline: 'Twilio ↔ OpenAI Realtime · in-call governance · encrypted caller KG',
    demoHint:
      'Try: "I\'d like to book a service visit." Ninety seconds tells you more than this card can.',
    lastShipped: 'September 2026',
    codeNote: 'Code available on request.',
    howItWorksUrl: 'https://www.seraphone.ai/how-it-works',
  },
  {
    id: 'atlas',
    subtitle: 'Research atlas · Live demo',
    title: 'Atlas in Relief',
    description:
      "Thirteen disciplines drawn as what cites what, from Plato to this year's papers. A relief map of 26,988 embedded papers, a citation lineage for every canon, and each field's turning points on one time axis.",
    longDescription:
      'Atlas in Relief is a hand-set editorial atlas of the machine-learning literature and the thirteen disciplines it cites. 26,988 papers — arXiv, PhilArchive, OpenAlex, lab blogs — are embedded, projected to 2D with UMAP, and clustered bottom-up with RAPTOR into 36 clusters and nine named regions. The Map draws them as a kernel-density relief in deck.gl, colored by canon, with a 3D version, The Relief, that drapes the engraving over a heightmap. The Lineage draws each canon as a citation tree in its own honeycomb cell, placed by meaning and stacked by year. Turning Points lays every flagged work — the paper where an idea took the shape it still has — on one time axis with its definition, notation, and a worked example. You choose a chapter by turning a WebGL medallion on the frontispiece. Working pages: The Guide, an agent that plans a search, runs it, and cites what it read; The Descent, which routes any abstract down the cluster tree; and Foundations, the 2019 R portfolio this grew out of.',
    // Kept to one row at the shared card width — pgvector stands in for Postgres+FastAPI.
    stack: ['Python', 'pgvector', 'UMAP', 'RAPTOR', 'deck.gl', 'Three.js'],
    url: 'https://ml.aebauer.dev',
    screenshot: '/assets/landing/atlas-map.webp',
    demoCta: 'Explore the atlas',
    live: true,
    tagline: '26,988 papers · 13 canons · deck.gl relief · Three.js lineage',
    lastShipped: 'September 2026',
    codeNote: 'Code available on request.',
  },
  {
    id: 'raptor',
    subtitle: 'Codebase analyzer · Live demo',
    title: 'RAPTOR Code Knowledge Graph',
    description:
      'Tree-sitter parses a repo into ASTs; RAPTOR summarizes upward; a chat engine answers architecture-level questions.',
    longDescription:
      "A codebase analyzer that turns a repo into a queryable knowledge graph. Tree-sitter parses every file into ASTs; the RAPTOR architecture clusters and summarizes upward to produce a hierarchical semantic graph; a chat engine surfaces answers to architecture-level questions — \"where does the auth boundary live?\", \"what gets touched if I rename this table?\" — without dumping raw code at the LLM.",
    // One row at the shared card width; pgvector covers both Postgres and the embeddings.
    stack: ['Python', 'Tree-sitter', 'RAPTOR', 'pgvector', 'WebSockets'],
    url: 'https://kg.aebauer.dev',
    screenshot: '/assets/landing/raptor-analyzer.webp',
    demoCta: 'Try the live demo',
    live: true,
    tagline: 'Tree-sitter ASTs · hierarchical summaries · WebSocket chat',
    lastShipped: 'August 2026',
    codeNote: 'Code available on request.',
  },
];

const featuredProject = projects.find((p) => p.featured)!;
const secondaryProjects = projects.filter((p) => !p.featured);

// Animated open/close height. Uses ResizeObserver so the drawer re-fits when
// inner content size changes after the initial open (image loads, font swap, etc.).
// Fires `onOpened` once the open-transition completes, so callers can run
// post-animation work (e.g. scrollIntoView) without timing it by hand.
const AnimateHeight: React.FC<{
  open: boolean;
  onOpened?: () => void;
  children: React.ReactNode;
}> = ({ open, onOpened, children }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (!open) {
      setHeight(0);
      return;
    }
    setHeight(el.scrollHeight);
    const observer = new ResizeObserver(() => {
      if (innerRef.current) setHeight(innerRef.current.scrollHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, children]);

  useEffect(() => {
    if (!open || !onOpened) return;
    const outer = outerRef.current;
    if (!outer) return;
    const handle = (e: TransitionEvent) => {
      if (e.target === outer && e.propertyName === 'height') onOpened();
    };
    outer.addEventListener('transitionend', handle);
    return () => outer.removeEventListener('transitionend', handle);
  }, [open, onOpened]);

  return (
    <div
      ref={outerRef}
      style={{ height, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const drawerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Close on outside click or Escape.
  useEffect(() => {
    if (!openId) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openId]);

  // Scrolls the open drawer into view after its height transition settles.
  // Passed to <AnimateHeight onOpened> so we don't have to time the transition by hand.
  const scrollOpenIntoView = () => {
    if (!openId) return;
    drawerRefs.current[openId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const toggle = (id: string) => () => setOpenId(openId === id ? null : id);

  // A card group's drawer: single-open, shared across the cards in that group.
  const renderDrawer = (project?: ProjectCardData) => (
    <AnimateHeight open={Boolean(project)} onOpened={scrollOpenIntoView}>
      {project && (
        <div
          ref={(el) => {
            drawerRefs.current[project.id] = el;
          }}
        >
          <ProjectDetail project={project} />
        </div>
      )}
    </AnimateHeight>
  );

  return (
    <section id="projects" ref={containerRef} className="relative py-24 md:py-32 scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-6">
          <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
            Projects
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Real systems, <span className="text-aurora">shipped.</span>
          </h2>
        </div>

        {/* Terminal-chrome meta row — states what's here, not a decorative sequence number. */}
        <div className="flex items-center gap-3 mb-10 font-mono text-[11px] tracking-widest uppercase text-muted-foreground/70">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--aurora-2))]"
          />
          <span className="whitespace-nowrap">3 systems · all live</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div className="flex flex-col gap-3">
          {/* Featured, full-width */}
          <div className="flex flex-col gap-3">
            <ProjectCard
              {...featuredProject}
              isOpen={openId === featuredProject.id}
              onToggle={toggle(featuredProject.id)}
            />
            {renderDrawer(openId === featuredProject.id ? featuredProject : undefined)}
          </div>

          {/* Secondary, two-up */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {secondaryProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  isOpen={openId === project.id}
                  onToggle={toggle(project.id)}
                />
              ))}
            </div>
            {renderDrawer(secondaryProjects.find((p) => p.id === openId))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
