import React, { useEffect, useRef, useState } from 'react';
import ProjectCard, { type ProjectCardData } from './ProjectCard';
import ProjectDetail from './ProjectDetail';

const projects: ProjectCardData[] = [
  {
    id: 'seraphone',
    subtitle: 'AI Telephony — Live Demo',
    title: 'Seraphone',
    description:
      'Multi-tenant AI answering service replacing IVR for healthcare and professional services. Real-time voice, HIPAA-compliant, PostgreSQL knowledge graph, Twilio-backed. Two live demo lines below — call them.',
    longDescription:
      "Seraphone replaces traditional IVR phone trees with a real-time AI receptionist that handles intake, scheduling, and triage on its own. Built around a PostgreSQL knowledge graph that encodes each client's business rules, the system answers in natural language, hands off to a human only when escalation makes sense, and writes back to existing CRMs. HIPAA-compliant from the data flow up: application-level encryption, PII scrubbing on every transcript, and end-to-end encrypted SMS callbacks.",
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Twilio', 'React', 'TypeScript'],
    url: 'https://seraphone.ai',
    screenshot: '/assets/landing/dashboard-mockup.png',
    demoNumbers: [
      { number: '+1-971-455-1825', label: 'Summit Comfort — business demo (HVAC)' },
      { number: '+1-313-476-2606', label: 'Carol Carter — personal demo (family protection)' },
    ],
    live: true,
    tagline: 'Twilio ↔ OpenAI Realtime voice · in-call governance · encrypted caller KG',
    demoHint: "Try: 'I'd like to book a service visit' — ninety seconds tells you more than this card can.",
    lastShipped: 'July 2026',
    codeNote: 'Code available on request.',
  },
  {
    id: 'atlas',
    subtitle: 'Embedding Atlas — Live Demo',
    title: 'An Atlas of Machine Understanding',
    description:
      '12,000 AI and philosophy papers embedded, projected with UMAP, and clustered into named regions by RAPTOR — drawn as a kernel-density relief map with filters and a full 3D view. The Guide: an agent that decomposes, retrieves, and cites. The 2019 R work survives as Foundations.',
    longDescription:
      'Vol. 01 of a hand-set editorial atlas of the ML literature. Twelve thousand papers — arXiv, PhilArchive, OpenAlex, lab blogs — are embedded, projected to 2D with UMAP, and clustered bottom-up with RAPTOR into labeled regions like "LLM Mechanics" and "Metaphysics, Mind, and Epistemic Foundations." The Map renders the corpus as a kernel-density relief with deck.gl, filterable by source and year, with region focus and a 3D view. The Guide is an agent that decomposes a question, retrieves against the corpus, and cites what it used. The original 2019 R portfolio (SVM, PCA, k-means, CART, random forests, gradient boosting, splines) is preserved intact as Foundations.',
    stack: ['Python', 'FastAPI', 'PostgreSQL/pgvector', 'UMAP', 'RAPTOR', 'deck.gl (WebGL)', 'Vertex AI'],
    url: 'https://ml.aebauer.dev',
    screenshot: '/assets/landing/atlas-map.webp',
    demoCta: 'Explore the atlas',
    live: true,
    tagline: '12,000 papers · UMAP + RAPTOR · deck.gl relief',
    lastShipped: 'June 2026',
    github: 'https://github.com/alexander-e-bauer/r_machine_learning',
  },
  {
    id: 'raptor',
    subtitle: 'RAPTOR Knowledge Graph — Live Demo',
    title: 'AI Codebase Analyzer',
    description:
      'Tree-sitter parses a codebase into ASTs; RAPTOR builds a hierarchical semantic graph; a chat engine answers architecture-level questions against the index.',
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

// Rows of two; an odd trailing card renders centered at column width.
const projectRows: ProjectCardData[][] = [];
for (let i = 0; i < projects.length; i += 2) projectRows.push(projects.slice(i, i + 2));

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

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 md:py-32 scroll-mt-24"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
            Projects
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Real systems, <span className="text-aurora">shipped.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {projectRows.map((row, rowIdx) => {
            const openProject = row.find((p) => p.id === openId);
            const cards = row.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                isOpen={openId === project.id}
                onToggle={() =>
                  setOpenId(openId === project.id ? null : project.id)
                }
              />
            ));

            return (
              <div key={rowIdx} className="flex flex-col gap-3">
                {row.length === 1 ? (
                  // Lone card: same width as one column of the two-up grid
                  // below (50% minus half the gap-5), centered.
                  <div className="md:w-[calc(50%-10px)] md:mx-auto">{cards}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{cards}</div>
                )}

                <AnimateHeight open={Boolean(openProject)} onOpened={scrollOpenIntoView}>
                  {openProject && (
                    <div
                      ref={(el) => {
                        drawerRefs.current[openProject.id] = el;
                      }}
                    >
                      <ProjectDetail project={openProject} />
                    </div>
                  )}
                </AnimateHeight>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
