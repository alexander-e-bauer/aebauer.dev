import React, { useEffect, useRef, useState } from 'react';
import ProjectCard, { type ProjectCardData } from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import SeraphoneArchitecture from './SeraphoneArchitecture';

const projects: ProjectCardData[] = [
  {
    id: 'seraphone',
    subtitle: 'Featured · AI telephony · Live demo',
    title: 'Seraphone',
    featured: true,
    description:
      "Multi-tenant AI answering service replacing IVR for healthcare and professional services. HIPAA-compliant, with a PostgreSQL knowledge graph behind every call. Don't take the card's word for it. Call it.",
    longDescription:
      'Seraphone is a four-service mesh replacing IVR phone trees. Twilio media streams hit a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API — an interruptible voice loop, governed while the call is live: compliance guardrails, spam and hostility detection, dead-air monitors, dynamic escalation. Call state fans out through Redis pub/sub to a live React dashboard. Tool actions — calendar, CRM, email — are offloaded to an MCP server behind one-time-nonce Fernet auth with tenant-bound credential injection. After hang-up, a post-call pipeline redacts PII, embeds with Vertex AI, and folds every call into a per-tenant caller knowledge graph on Postgres/pgvector, sensitive fields encrypted at rest.',
    stack: ['Python', 'FastAPI', 'OpenAI Realtime', 'Twilio', 'pgvector', 'Redis', 'MCP'],
    url: 'https://seraphone.ai',
    screenshot: '/assets/landing/dashboard-mockup.png',
    diagram: SeraphoneArchitecture,
    demoNumbers: [
      { number: '+1-971-455-1825', label: 'Summit Comfort · business demo' },
      { number: '+1-313-476-2606', label: 'Carol Carter · personal demo' },
    ],
    live: true,
    tagline: 'Twilio ↔ OpenAI Realtime · in-call governance · encrypted caller KG',
    demoHint:
      'Try: "I\'d like to book a service visit." Ninety seconds tells you more than this card can.',
    lastShipped: 'July 2026',
    codeNote: 'Code available on request.',
    howItWorksUrl: 'https://www.seraphone.ai/how-it-works',
  },
  {
    id: 'atlas',
    subtitle: 'Embedding atlas · Live demo',
    title: 'An Atlas of Machine Understanding',
    description:
      '12,000 papers embedded, UMAP-projected, and RAPTOR-clustered into named regions. A kernel-density relief map with filters and a full 3D view.',
    longDescription:
      'Vol. 01 of a hand-set editorial atlas of the ML literature. Twelve thousand papers — arXiv, PhilArchive, OpenAlex, lab blogs — are embedded, projected to 2D with UMAP, and clustered bottom-up with RAPTOR into labeled regions like "LLM Mechanics" and "Metaphysics, Mind, and Epistemic Foundations." The Map renders the corpus as a kernel-density relief with deck.gl, filterable by source and year, with region focus and a 3D view. The Guide is an agent that decomposes a question, retrieves against the corpus, and cites what it used. The original 2019 R portfolio (SVM, PCA, k-means, CART, random forests, gradient boosting, splines) is preserved intact as Foundations.',
    stack: ['Python', 'FastAPI', 'PostgreSQL/pgvector', 'UMAP', 'RAPTOR', 'deck.gl (WebGL)', 'Vertex AI'],
    url: 'https://ml.aebauer.dev/map',
    screenshot: '/assets/landing/atlas-map.webp',
    demoCta: 'Explore the atlas',
    live: true,
    tagline: '12,000 papers · UMAP + RAPTOR · deck.gl relief',
    lastShipped: 'June 2026',
    github: 'https://github.com/alexander-e-bauer/r_machine_learning',
  },
  {
    id: 'raptor',
    subtitle: 'Knowledge graph · Live demo',
    title: 'AI Codebase Analyzer',
    description:
      'Tree-sitter parses a repo into ASTs; RAPTOR summarizes upward; a chat engine answers architecture-level questions.',
    longDescription:
      "A codebase analyzer that turns a repo into a queryable knowledge graph. Tree-sitter parses every file into ASTs; the RAPTOR architecture clusters and summarizes upward to produce a hierarchical semantic graph; a chat engine surfaces answers to architecture-level questions — \"where does the auth boundary live?\", \"what gets touched if I rename this table?\" — without dumping raw code at the LLM.",
    stack: ['Python', 'Tree-sitter', 'RAPTOR', 'Vector Embeddings', 'WebSockets', 'PostgreSQL'],
    url: 'https://kg.aebauer.dev',
    screenshot: '/assets/landing/raptor-analyzer.webp',
    demoCta: 'Try the live demo',
    live: true,
    tagline: 'Tree-sitter ASTs · hierarchical summaries · WebSocket chat',
    lastShipped: 'July 2026',
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
      <div className="container mx-auto px-6">
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
      </div>
    </section>
  );
};

export default Projects;
