import React, { useState, useRef, useEffect } from 'react';
import {
  DollarSign, ShieldAlert, Wrench, Users, Clock,
  TrendingDown, ChevronDown, MessageCircle
} from 'lucide-react';

interface ObjectionHandlingProps {
  isBiz: boolean;
}

interface Objection {
  id: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  tag: string;
  title: string;
  shortAnswer: string;
  drawerContent: {
    reframe: string;
    points: { label: string; detail: string }[];
    closing: string;
  };
}

const buildObjections = (isBiz: boolean): Objection[] => [
  {
    id: 'cost',
    icon: <DollarSign className="w-4 h-4" />,
    iconColor: isBiz ? '#4ade80' : '#059669',
    iconBg: isBiz ? 'rgba(74,222,128,0.12)' : 'rgba(5,150,105,0.08)',
    tag: 'Budget',
    title: "This sounds expensive to build and maintain.",
    shortAnswer: "It's already built. The cost question is really about licensing, not development.",
    drawerContent: {
      reframe: "The platform is production-ready today. RTC isn't funding a build — it's deciding how to access something that already works.",
      points: [
        { label: "No dev cost under White-Label", detail: "RTC pays a licensing fee, not an engineering team. I handle all maintenance, updates, and integrations." },
        { label: "ROI is measurable immediately", detail: "Every call the AI handles autonomously is a call that doesn't require agent time. At RTC's call volume, that's a calculable number." },
        { label: "Competitor cost comparison", detail: "Off-the-shelf AI call center solutions (Five9, NICE, Genesys) start at $150–$300/seat/month with no Startel integration. This is purpose-built." },
        { label: "The cost of not acting", detail: "Clients are already asking for AI services. Every month without an offering is a month a competitor can step in." },
      ],
      closing: "The White-Label path is specifically structured to minimize upfront capital risk while capturing the full market opportunity.",
    },
  },
  {
    id: 'hipaa',
    icon: <ShieldAlert className="w-4 h-4" />,
    iconColor: isBiz ? '#f87171' : '#dc2626',
    iconBg: isBiz ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.08)',
    tag: 'Compliance',
    title: "How do we know this is actually HIPAA-compliant?",
    shortAnswer: "Application-level encryption, PII vaulting, and a zero-plaintext policy are baked into the architecture — not bolted on.",
    drawerContent: {
      reframe: "HIPAA compliance isn't a checkbox here — it's a core design constraint that shaped every data flow in the system.",
      points: [
        { label: "Fernet encryption at rest", detail: "Phone numbers and caller PII are encrypted at the application layer before they ever touch the database. The DB stores ciphertext only." },
        { label: "Post-call PII scrubbing", detail: "After every call, an automated pipeline strips names, emails, card numbers, and identifiers from transcripts before they're stored." },
        { label: "No plaintext transmission", detail: "SMS containing PII routes through a HIPAA-compliant relay with end-to-end encryption — the same gap that currently exists at RTC is closed." },
        { label: "Audit trail by default", detail: "Every data access, every AI decision, and every escalation is logged with timestamps. Compliance review is built in, not retrofitted." },
      ],
      closing: "The existing SMS & HIPAA exposure problem at RTC is a live liability. This system closes it on day one.",
    },
  },
  {
    id: 'startel',
    icon: <Wrench className="w-4 h-4" />,
    iconColor: isBiz ? '#fb923c' : '#ea580c',
    iconBg: isBiz ? 'rgba(251,146,60,0.12)' : 'rgba(234,88,12,0.08)',
    tag: 'Integration',
    title: "Startel integration sounds risky. What if it breaks?",
    shortAnswer: "The integration is already working. This isn't a proposal to build it — it's a proposal to deploy what's been tested.",
    drawerContent: {
      reframe: "Startel integration risk is a valid concern for a greenfield project. This isn't that. The API layer is live and tested against real call data.",
      points: [
        { label: "API-first, not screen-scraping", detail: "The integration uses Startel's documented API endpoints, not brittle UI automation. Changes to Startel's interface don't break the connection." },
        { label: "Graceful degradation", detail: "If the Startel API is unavailable, the AI falls back to message-taking mode. No call is dropped, no data is lost." },
        { label: "My role under White-Label", detail: "I own the integration and maintenance. If something breaks, it's my problem to fix — not RTC's engineering team scrambling on an unfamiliar codebase." },
        { label: "Incremental rollout possible", detail: "We can start with a single client or call type, validate the integration in production, and expand from there. No big-bang cutover required." },
      ],
      closing: "The biggest integration risk is the current paging logic — inline IF statements that nobody wants to touch. Replacing that is a day-one win regardless of which path RTC chooses.",
    },
  },
  {
    id: 'agents',
    icon: <Users className="w-4 h-4" />,
    iconColor: isBiz ? '#818cf8' : '#4f46e5',
    iconBg: isBiz ? 'rgba(129,140,248,0.12)' : 'rgba(79,70,229,0.08)',
    tag: 'People',
    title: "Will agents feel like they're being replaced?",
    shortAnswer: "The AI handles the tedious 80%. Agents get to do the interesting 20% — with tools that make them genuinely better at it.",
    drawerContent: {
      reframe: "The framing matters here. This isn't 'AI instead of agents' — it's 'AI so agents can stop being human voicemail machines.'",
      points: [
        { label: "Agents currently fly blind", detail: "Right now agents take messages and hope for the best because they can't query business rules. The Knowledge Graph changes that — agents become genuine client experts." },
        { label: "The Downtime Engine is agent-first", detail: "Idle time becomes growth time. Agents who previously stared at a quiet phone now have structured, AI-assisted tasks that build their skills and the business." },
        { label: "Escalations are higher-value work", detail: "The calls that reach agents are the complex, high-stakes ones — exactly the calls where human judgment matters and agents feel most useful." },
        { label: "Whisper summaries reduce stress", detail: "Agents pick up escalations already knowing who's calling and why. No more cold transfers where the caller has to re-explain everything." },
      ],
      closing: "The agents most at risk are the ones doing purely mechanical routing. This system makes every agent more capable, not redundant.",
    },
  },
  {
    id: 'timing',
    icon: <Clock className="w-4 h-4" />,
    iconColor: isBiz ? '#38bdf8' : '#0284c7',
    iconBg: isBiz ? 'rgba(56,189,248,0.12)' : 'rgba(2,132,199,0.08)',
    tag: 'Timing',
    title: "Is now really the right time to take this on?",
    shortAnswer: "The market window for being an early AI adopter in medical answering services is open right now — not indefinitely.",
    drawerContent: {
      reframe: "The question isn't whether to adopt AI — clients are already asking for it. The question is whether RTC leads or follows.",
      points: [
        { label: "Clients are asking today", detail: "This isn't a future trend. RTC's own clients are actively requesting AI services. 'We're working on it' only works for so long before they find someone who has it." },
        { label: "First-mover advantage is real", detail: "In a relationship-driven industry like medical answering services, the first provider to offer a credible AI tier will set the standard. Second place gets to compete on price." },
        { label: "The platform is ready now", detail: "There's no 12-month build timeline here. Under the White-Label path, RTC could have a working AI offering in weeks, not quarters." },
        { label: "Internal problems compound", detail: "Every month the paging logic stays brittle, the SMS gap stays open, and analytics stay lost is a month of compounding technical debt and compliance exposure." },
      ],
      closing: "The right time was six months ago. The second-best time is now — before a competitor makes the decision for you.",
    },
  },
  {
    id: 'dependency',
    icon: <TrendingDown className="w-4 h-4" />,
    iconColor: isBiz ? '#fbbf24' : '#d97706',
    iconBg: isBiz ? 'rgba(251,191,36,0.12)' : 'rgba(217,119,6,0.08)',
    tag: 'Risk',
    title: "What if this creates a dependency on one person?",
    shortAnswer: "That's a real concern — and it's exactly why the White-Label structure includes a non-compete, not a non-solicitation.",
    drawerContent: {
      reframe: "Key-person risk is legitimate. The structure of each path is specifically designed to address it at different levels of comfort.",
      points: [
        { label: "Acquisition eliminates it entirely", detail: "Full IP transfer means RTC owns the codebase outright. I transition into an integration role, and the knowledge transfers with the code." },
        { label: "White-Label has contractual protections", detail: "The licensing agreement includes SLAs, documentation requirements, and source code escrow provisions. RTC is never left holding a black box." },
        { label: "The codebase is documented", detail: "This isn't a spaghetti side project. The architecture is documented, the APIs are typed, and the infrastructure is reproducible. Another developer could pick it up." },
        { label: "Internal Role is the cleanest separation", detail: "If dependency risk is the primary concern, the Internal Role path gives RTC full control — I build and maintain as an employee, not a vendor." },
      ],
      closing: "The dependency concern is actually an argument for moving faster, not slower — the sooner the integration is built, the sooner the knowledge is embedded in RTC's team.",
    },
  },
];

// ── Animated height ───────────────────────────────────────────────────────────
const AnimateHeight: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);
  return (
    <div style={{ height, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
      <div ref={ref}>{children}</div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ObjectionHandling: React.FC<ObjectionHandlingProps> = ({ isBiz }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const objections = buildObjections(isBiz);

  // Split into rows of 3
  const rows = [objections.slice(0, 3), objections.slice(3, 6)];

  const cardBg    = isBiz ? 'rgba(15,23,42,0.6)' : '#ffffff';
  const panelBg   = isBiz ? 'rgba(15,23,42,0.8)' : '#fafafa';
  const titleColor  = isBiz ? '#f1f5f9' : '#0f172a';
  const bodyColor   = isBiz ? '#64748b' : '#94a3b8';
  const labelColor  = isBiz ? '#e2e8f0' : '#1e293b';
  const dividerColor = isBiz ? '#1e293b' : '#e2e8f0';

  return (
    <section
      className={`py-24 border-t ${isBiz ? 'border-slate-800' : 'border-slate-200'}`}
      style={{ background: isBiz ? '#020617' : '#f8fafc' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className={`w-4 h-4 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`} />
            <p className={`text-sm font-semibold uppercase tracking-widest ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
              Objection Handling
            </p>
          </div>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
            The hard questions,<br />answered directly.
          </h2>
          <p className={`text-lg max-w-xl ${isBiz ? 'text-slate-400' : 'text-slate-500'}`}>
            Click any concern to read the full response.
          </p>
        </div>

        {/* Rows of 3 with full-width expansion panel */}
        <div className="flex flex-col gap-3">
          {rows.map((row, rowIdx) => {
            const openInRow = row.findIndex(obj => openId === obj.id);
            const openObj   = openInRow >= 0 ? row[openInRow] : null;

            return (
              <div key={rowIdx} className="flex flex-col gap-3">

                {/* ── 3 cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {row.map((obj) => {
                    const isOpen = openId === obj.id;
                    return (
                      <button
                        key={obj.id}
                        onClick={() => setOpenId(isOpen ? null : obj.id)}
                        className="text-left rounded-2xl border transition-all duration-200 p-5 flex flex-col gap-2.5"
                        style={{
                          background: cardBg,
                          borderColor: isOpen ? obj.iconColor + '99' : (isBiz ? '#1e293b' : '#e2e8f0'),
                          boxShadow: isOpen ? `0 0 0 1px ${obj.iconColor}22` : 'none',
                        }}
                      >
                        {/* Icon + tag + chevron */}
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: obj.iconBg, color: obj.iconColor }}
                          >
                            {obj.icon}
                          </div>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              color: obj.iconColor,
                              background: obj.iconBg,
                              borderColor: obj.iconColor + '44',
                            }}
                          >
                            {obj.tag}
                          </span>
                          <div
                            className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                            style={{ background: isOpen ? obj.iconColor + '18' : (isBiz ? '#1e293b' : '#f1f5f9') }}
                          >
                            <ChevronDown
                              className="w-3 h-3 transition-transform duration-300"
                              style={{
                                color: isOpen ? obj.iconColor : (isBiz ? '#475569' : '#94a3b8'),
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              }}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <p className="text-sm font-bold leading-snug" style={{ color: titleColor }}>
                          {obj.title}
                        </p>

                        {/* Short answer — fades when open */}
                        <p
                          className="text-xs leading-relaxed transition-opacity duration-300"
                          style={{ color: bodyColor, opacity: isOpen ? 0.4 : 1 }}
                        >
                          {obj.shortAnswer}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* ── Full-width expansion panel ── */}
                <AnimateHeight open={openInRow >= 0}>
                  {openObj && (
                    <div
                      className="rounded-2xl border p-5"
                      style={{
                        background: panelBg,
                        borderColor: openObj.iconColor + '55',
                        boxShadow: `0 0 0 1px ${openObj.iconColor}18`,
                      }}
                    >
                      {/* Reframe */}
                      <div
                        className="rounded-xl p-3 mb-4"
                        style={{ background: openObj.iconBg, borderLeft: `3px solid ${openObj.iconColor}` }}
                      >
                        <p className="text-xs font-semibold leading-relaxed" style={{ color: openObj.iconColor }}>
                          {openObj.drawerContent.reframe}
                        </p>
                      </div>

                      {/* 4 points — horizontal 4-col grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {openObj.drawerContent.points.map((pt, j) => (
                          <div key={j} className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: openObj.iconColor }} />
                              <p className="text-xs font-bold leading-tight" style={{ color: labelColor }}>
                                {pt.label}
                              </p>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: bodyColor }}>
                              {pt.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Closing */}
                      <div className="h-px mb-3" style={{ background: dividerColor }} />
                      <p className="text-xs leading-relaxed italic" style={{ color: bodyColor }}>
                        {openObj.drawerContent.closing}
                      </p>
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

export default ObjectionHandling;