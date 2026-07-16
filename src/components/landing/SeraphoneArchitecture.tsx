import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NODE_FILL = '#101321';
const NODE_FILL_ACTIVE = '#171b2e';
const NODE_STROKE = 'rgba(255,255,255,0.12)';
const NODE_STROKE_ACTIVE = 'rgba(232,121,249,0.7)';
const TITLE_FILL = '#e5e7eb';
const SUB_FILL = '#94a3b8';
const NOTE_FILL = '#8b90a0';

const NW = 186;
const NH = 60;
const COL: Record<number, number> = { 1: 30, 2: 262, 3: 494, 4: 726 };
const ROW: Record<number, number> = { 1: 40, 2: 190, 3: 340 };

interface DiagramNode {
  id: string;
  col: number;
  row: number;
  title: string;
  sub: string;
  explain: string;
}

// Aligned into four columns so the call reads left-to-right, top-to-bottom:
// live-call lane (row 1), live fan-out to the dashboard (row 2), and the
// after-call actions + memory lane (row 3).
const NODES: DiagramNode[] = [
  { id: 'caller', col: 1, row: 1, title: 'Caller', sub: 'inbound phone call', explain: 'Someone dials one of the demo numbers above. A real phone call. No app, no download.' },
  { id: 'twilio', col: 2, row: 1, title: 'Twilio', sub: 'webhooks · media streams', explain: 'Bridges the phone network to the app, streaming the live audio both ways over a WebSocket.' },
  { id: 'engine', col: 3, row: 1, title: 'FastAPI call engine', sub: 'interruptible voice loop', explain: 'The brain of the call: streams speech to the model, plays the reply back, and lets the caller interrupt naturally.' },
  { id: 'openai', col: 4, row: 1, title: 'OpenAI Realtime API', sub: 'speech in · speech out', explain: 'Understands the caller and generates the spoken reply in real time, turn by turn.' },
  { id: 'redis', col: 2, row: 2, title: 'Redis', sub: 'call state · TTL · pub/sub', explain: 'Holds live call state and broadcasts every update so the rest of the system can react instantly.' },
  { id: 'backend', col: 3, row: 2, title: 'REST backend', sub: 'WebSocket router', explain: 'Subscribes to call events and pushes them to the dashboard the moment they happen.' },
  { id: 'dashboard', col: 4, row: 2, title: 'React dashboard', sub: 'live call view', explain: 'Staff watch calls unfold live (transcript, status, escalation), updating in real time.' },
  { id: 'mcp', col: 2, row: 3, title: 'MCP tool server', sub: 'calendar · CRM · email', explain: 'When the assistant needs to act (book a visit, look up a record), it calls tools here behind per-tenant credentials.' },
  { id: 'postcall', col: 3, row: 3, title: 'Post-call pipeline', sub: 'redaction · summaries · embeddings', explain: 'After hang-up: strips sensitive data, summarizes the call, and embeds it for memory.' },
  { id: 'kg', col: 4, row: 3, title: 'Caller knowledge graph', sub: 'Postgres/pgvector · HNSW', explain: 'Every call folds into an encrypted, searchable memory of who called and why.' },
];

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));
const x = (id: string) => COL[nodeById[id].col];
const y = (id: string) => ROW[nodeById[id].row];

const Node: React.FC<{
  node: DiagramNode;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}> = ({ node, active, onActivate, onDeactivate }) => {
  const nx = COL[node.col];
  const ny = ROW[node.row];
  return (
    <g
      tabIndex={0}
      aria-label={`${node.title}: ${node.explain}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      style={{ cursor: 'pointer', outline: 'none' }}
    >
      <rect
        x={nx}
        y={ny}
        width={NW}
        height={NH}
        rx={12}
        fill={active ? NODE_FILL_ACTIVE : NODE_FILL}
        stroke={active ? NODE_STROKE_ACTIVE : NODE_STROKE}
        style={{ transition: 'fill 150ms ease, stroke 150ms ease' }}
      />
      <text x={nx + NW / 2} y={ny + 26} textAnchor="middle" fontSize="13" fontWeight="600" fill={TITLE_FILL}>
        {node.title}
      </text>
      <text x={nx + NW / 2} y={ny + 43} textAnchor="middle" fontSize="9.5" fill={SUB_FILL}>
        {node.sub}
      </text>
    </g>
  );
};

const Edge: React.FC<{ d: string; live?: boolean }> = ({ d, live }) => (
  <path
    d={d}
    fill="none"
    stroke="url(#sera-aurora)"
    strokeWidth="1.6"
    strokeOpacity={live ? 1 : 0.55}
    markerEnd="url(#sera-arrow)"
    className={live ? 'sera-edge--live' : undefined}
  />
);

const HOW_IT_WORKS_URL = 'https://www.seraphone.ai/how-it-works';

const SeraphoneArchitecture: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <figure>
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-xs font-mono tracking-widest uppercase text-[hsl(var(--aurora-2))]">
          Architecture · how a call flows
        </p>
      </div>

      {/* Plain-language caption — updates on node hover/focus, fixed height so nothing jumps. */}
      <p
        aria-live="polite"
        className="min-h-[2.5rem] mb-3 text-xs leading-relaxed text-muted-foreground"
      >
        {activeNode ? (
          <>
            <span className="text-foreground font-medium">{activeNode.title}:</span>{' '}
            {activeNode.explain}
          </>
        ) : (
          'Hover or focus any step for a plain-language explanation.'
        )}
      </p>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <svg
          viewBox="0 0 960 445"
          role="img"
          aria-label="Seraphone architecture: Twilio media streams reach a FastAPI call engine holding a bidirectional WebSocket to the OpenAI Realtime API, governed in-call; state fans out via Redis pub/sub to a live React dashboard; tool actions go to an MCP server behind one-time-nonce Fernet auth; a post-call pipeline redacts PII and folds every call into an encrypted knowledge graph on Postgres/pgvector."
          className="w-full h-auto min-w-[760px]"
        >
          <defs>
            <linearGradient id="sera-aurora" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="960" y2="0">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="55%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <marker id="sera-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#e879f9" />
            </marker>
          </defs>

          {/* Governance badge — the in-call guardrails wrap the engine and hub the action edges. */}
          <rect x={COL[3]} y={112} width={NW} height={46} rx={10} fill="transparent" stroke="rgba(232,121,249,0.5)" strokeDasharray="4 4" />
          <text x={COL[3] + NW / 2} y={131} textAnchor="middle" fontSize="10" fontWeight="600" fill={TITLE_FILL}>
            in-call governance
          </text>
          <text x={COL[3] + NW / 2} y={146} textAnchor="middle" fontSize="9" fill={SUB_FILL}>
            compliance · spam/hostility · dead-air · escalation
          </text>

          {/* ---- Edges (under nodes) ---- */}
          {/* Live-call path (animated flow) */}
          <Edge live d={`M${x('caller') + NW},${y('caller') + NH / 2} L${x('twilio')},${y('twilio') + NH / 2}`} />
          <Edge live d={`M${x('twilio') + NW},${y('twilio') + NH / 2} L${x('engine')},${y('engine') + NH / 2}`} />
          <Edge live d={`M${x('engine') + NW},${y('engine') + NH / 2 - 7} L${x('openai')},${y('openai') + NH / 2 - 7}`} />
          <Edge live d={`M${x('openai')},${y('openai') + NH / 2 + 7} L${x('engine') + NW},${y('engine') + NH / 2 + 7}`} />

          {/* Live fan-out to the dashboard */}
          <Edge d={`M${x('engine') + 6},${y('engine') + NH} C 440,130 400,160 ${x('redis') + NW / 2},${y('redis')}`} />
          <Edge d={`M${x('redis') + NW},${y('redis') + NH / 2} L${x('backend')},${y('backend') + NH / 2}`} />
          <Edge d={`M${x('backend') + NW},${y('backend') + NH / 2} L${x('dashboard')},${y('dashboard') + NH / 2}`} />

          {/* After-call actions & memory — each edge drops down the gutter beside its
              column and enters the target's upper-right corner, so it never crosses (or
              appears to originate from) the fan-out node directly above the target. */}
          <Edge d={`M500,158 C 471,175 471,300 ${x('mcp') + 138},${y('mcp')}`} />
          <Edge d={`M654,158 C 715,172 715,300 ${x('postcall') + 146},${y('postcall')}`} />
          <Edge d={`M${x('postcall') + NW},${y('postcall') + NH / 2} L${x('kg')},${y('kg') + NH / 2}`} />

          {/* Edge labels */}
          <text x={360} y={296} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>tool calls</text>
          <text x={600} y={296} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>after hang-up</text>

          {/* ---- Nodes (over edges) ---- */}
          {NODES.map((node) => (
            <Node
              key={node.id}
              node={node}
              active={active === node.id}
              onActivate={() => setActive(node.id)}
              onDeactivate={() => setActive((cur) => (cur === node.id ? null : cur))}
            />
          ))}

          {/* Security annotations */}
          <text x={x('mcp') + NW / 2} y={425} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
            one-time-nonce Fernet auth · tenant-bound credentials
          </text>
          <text x={x('kg') + NW / 2} y={425} textAnchor="middle" fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
            Fernet-encrypted at rest
          </text>
        </svg>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <figcaption className="text-xs italic text-muted-foreground/80">
          The demo lines above run this exact path.
        </figcaption>
        <a
          href={HOW_IT_WORKS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
        >
          Non-technical version: how a call flows
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </figure>
  );
};

export default SeraphoneArchitecture;
