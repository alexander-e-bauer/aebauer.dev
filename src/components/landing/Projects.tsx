import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    demoNumbers: ['+1-248-846-1901', '+1-248-710-0164'],
  },
  {
    id: 'raptor',
    subtitle: 'RAPTOR Knowledge Graph',
    title: 'AI Codebase Analyzer',
    description:
      'Tree-sitter parses a codebase into ASTs; RAPTOR builds a hierarchical semantic graph; a chat engine answers architecture-level questions against the index.',
    longDescription:
      "A codebase analyzer that turns a repo into a queryable knowledge graph. Tree-sitter parses every file into ASTs; the RAPTOR architecture clusters and summarizes upward to produce a hierarchical semantic graph; a chat engine surfaces answers to architecture-level questions — \"where does the auth boundary live?\", \"what gets touched if I rename this table?\" — without dumping raw code at the LLM.",
    stack: ['Python', 'Tree-sitter', 'Vector Embeddings', 'LLMs'],
    url: 'https://kg.aebauer.dev',
  },
  {
    id: 'wealth',
    subtitle: 'Wealth Management Platform',
    title: 'Option Overlay Recommender',
    description:
      'Recommendation engine for portfolio option-overlay strategies. Vector embeddings of holdings, strategies, and historical outcomes; FastAPI service for advisors managing accredited-investor accounts.',
    longDescription:
      'A recommendation engine for portfolio option-overlay strategies. Vector embeddings encode each holding, candidate strategy, and historical outcome; a FastAPI service surfaces context-aware suggestions tuned for advisors managing accredited-investor accounts. The model surfaces the why behind each suggestion, not just the what — designed to slot into an existing advisor workflow rather than replace it.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Vector Embeddings', 'TypeScript'],
    url: 'https://isadora.ai',
  },
  {
    id: 'ml',
    subtitle: 'ML/AI Boilerplate — Live Demo',
    title: 'R Machine Learning',
    description:
      'Modern ML/AI boilerplate built on the bones of a 2019 R portfolio. FastAPI + Postgres/pgvector + Vite stack; two live demos — a heart-disease classifier and RAG over the legacy datasets, powered by Vertex AI (Gemini).',
    longDescription:
      'A working ML/AI boilerplate built on the bones of a 2019 R machine-learning portfolio. The original R scripts and CSVs sit untouched under legacy/; the rest is a modern FastAPI + Postgres (pgvector) + Vite/TypeScript stack. Two end-to-end demos run live: a gradient-boosted scikit-learn pipeline for heart-disease prediction, and a RAG chat over summaries of every legacy dataset — embeddings via Vertex text-embedding-005 stored in pgvector, generation via Gemini 2.5 Flash. The legacy R work (SVM, PCA, k-means, CART, bagging, random forests, gradient boosting, splines) is preserved as-is for provenance.',
    stack: ['Python', 'FastAPI', 'PostgreSQL/pgvector', 'Vertex AI', 'scikit-learn', 'TypeScript'],
    url: 'https://ml.aebauer.dev',
  },
];

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

  const rows = useMemo(() => [projects.slice(0, 2), projects.slice(2, 4)], []);

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
          {rows.map((row, rowIdx) => {
            const openProject = row.find((p) => p.id === openId);

            return (
              <div key={rowIdx} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {row.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                      isOpen={openId === project.id}
                      onToggle={() =>
                        setOpenId(openId === project.id ? null : project.id)
                      }
                    />
                  ))}
                </div>

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
