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
    url: 'TODO',
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
    url: 'TODO',
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
    url: 'TODO',
  },
  {
    id: 'chatbot',
    subtitle: 'Open Source',
    title: 'React/Flask AI Chatbot',
    description:
      'Reference chatbot pairing a React frontend with a Flask + Socket.IO backend. Document embeddings power retrieval; a teaching scaffold for clients spinning up a chat interface fast.',
    longDescription:
      'A reference chatbot scaffold: React frontend, Flask + Socket.IO backend, document embeddings for retrieval. I keep it updated as a fast on-ramp for clients who want to spin up a chat interface in days, not weeks. Public source on GitHub.',
    stack: ['React', 'Python', 'Flask', 'Socket.IO'],
    url: 'TODO',
  },
];

// Animated open/close height. Uses ResizeObserver so the drawer re-fits when
// inner content size changes after the initial open (image loads, font swap, etc.).
const AnimateHeight: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
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

  return (
    <div style={{ height, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const drawerRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const rows = [projects.slice(0, 2), projects.slice(2, 4)];

  // When a drawer opens, smooth-scroll it into view so the bottom isn't clipped by the fold.
  useEffect(() => {
    if (!openId) return;
    const rowIdx = rows.findIndex((row) => row.some((p) => p.id === openId));
    if (rowIdx < 0) return;
    const t = window.setTimeout(() => {
      drawerRefs.current[rowIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 420); // run after the open transition (~400ms) finishes
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

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

                <AnimateHeight open={Boolean(openProject)}>
                  {openProject && (
                    <div
                      ref={(el) => {
                        drawerRefs.current[rowIdx] = el;
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
