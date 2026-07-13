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
          <linearGradient id="sera-aurora" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="960" y2="0">
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
        <Edge d="M346,85 C 346,140 260,140 231,206" />
        <Edge d="M306,239 L342,239" />
        <Edge d="M546,239 L686,239" />

        {/* Edges — actions & memory */}
        <Edge d="M370,158 C 340,195 320,235 320,280 C 320,300 260,320 207,326" />
        <Edge d="M495,158 C 590,190 590,270 495,326" />
        <Edge d="M610,359 L666,359" />

        {/* Edge labels */}
        <text x={222} y={300} fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
          tool calls
        </text>
        <text x={576} y={222} fontSize="9" fontStyle="italic" fill={NOTE_FILL}>
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
