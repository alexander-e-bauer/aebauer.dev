import React, { useRef, useState } from 'react';
import {
  Server,
  DollarSign,
  Scaling,
  AlertTriangle,
  ShieldCheck,
  Database,
  Workflow,
  Clock3,
  Bot,
  Phone,
  Layers,
  Network,
  CheckCircle2,
  GitBranch,
  Search,
  Cpu,
  Activity,
  ArrowRight,
  Wrench,
  MonitorSmartphone,
  GitMerge,
  Table2,
  RefreshCw,
  MapPin,
  Zap,
  ChevronRight,
  Building2,
  Hash,
  Map,
  Stethoscope,
} from 'lucide-react';

interface Props {
  isBiz: boolean;
}

const steps = [
  { id: 0, icon: <Server className="w-3.5 h-3.5" />, label: 'Infra & Cost' },
  { id: 1, icon: <Database className="w-3.5 h-3.5" />, label: 'Normalize' },
  { id: 2, icon: <GitBranch className="w-3.5 h-3.5" />, label: 'Rule Engine' },
  { id: 3, icon: <MonitorSmartphone className="w-3.5 h-3.5" />, label: 'Agent UI' },
  { id: 4, icon: <GitMerge className="w-3.5 h-3.5" />, label: 'Migration' },
];

const spaghettiOncall = [
  { text: 'M-F 9a-5p  John Doe #1122 is OC', type: 'action' },
  { text: '', type: 'muted' },
  { text: 'Mon 5p - Tue 8a   Jake Ballard OC 1234', type: 'action' },
  { text: 'Tue 5p - Wed 8a   Peggy Scott OC 4321', type: 'action' },
  { text: 'Wed 5p - Thu 8a   Jake Ballard OC 1234', type: 'action' },
  { text: 'Thu 5p - Fri 8a   Peggy Scott OC 4321', type: 'action' },
  { text: '', type: 'muted' },
  { text: 'Fri 5p - Mon 8a   See OC in CMC', type: 'keyword' },
  { text: '  (unless page from Irving TX', type: 'comment' },
  { text: '   give to OC for the TX group)', type: 'comment' },
  { text: '', type: 'muted' },
  { text: '// one of thousands of account variants', type: 'comment' },
];

const spaghettiMedical = [
  { text: 'If call CANNOT wait for next business day', type: 'keyword' },
  { text: '  AND is NOT re: any of the following:', type: 'action' },
  { text: '    - C-PAPs or CPAP supplies', type: 'comment' },
  { text: '    - Incontinence supplies', type: 'comment' },
  { text: '    - Ostomy supplies', type: 'comment' },
  { text: '        UNLESS for a doctor or hospital', type: 'exception' },
  { text: '    - Durable medical equipment', type: 'comment' },
  { text: '        UNLESS re: repair of a bed', type: 'exception' },
  { text: '        UNLESS for a hospital', type: 'exception' },
  { text: '    - Orthotics / prosthetics (routine)', type: 'comment' },
  { text: '    - Customer service inquiries', type: 'comment' },
  { text: '    - Billing questions', type: 'comment' },
  { text: '    - Referral status checks', type: 'comment' },
  { text: '    ... plus more exceptions', type: 'comment' },
  { text: '', type: 'muted' },
  { text: '-> Page Ventilation OC', type: 'action' },
  { text: '-> Page Orthotics OC', type: 'action' },
  { text: '-> Page Customer Svc OC', type: 'action' },
];

const relayInstructions = [
  { text: 'Call Primary OC in CMC', type: 'action' },
  { text: '  -> If no answer: Leave VM + LCB', type: 'keyword' },
  { text: '  -> Set 5-min action', type: 'action' },
  { text: '     -> If still no answer: Call Secondary', type: 'keyword' },
  { text: '       -> Leave VM + LCB', type: 'action' },
  { text: '       -> Set 5-min action', type: 'action' },
  { text: '         -> If still no answer:', type: 'keyword' },
  { text: '           Call Backup OC in CMC', type: 'action' },
  { text: '           repeat loop up to 3x', type: 'comment' },
  { text: '', type: 'muted' },
  { text: '// relay steps also live in IntelliForm text', type: 'comment' },
];

interface TooltipData {
  label: string;
  sublabel: string;
  what: string;
  why: string;
}

function HtmlTooltip({ data, anchorRect, isBiz }: { data: TooltipData; anchorRect: DOMRect; isBiz: boolean }) {
  const TW = 310;
  const PAD = 12;
  let left = anchorRect.right + 10;
  if (left + TW > window.innerWidth - PAD) left = anchorRect.left - TW - 10;
  let top = anchorRect.top + anchorRect.height / 2 - 82;
  top = Math.max(PAD, Math.min(top, window.innerHeight - 300));

  const bg = isBiz ? '#0f172a' : '#ffffff';
  const border = isBiz ? '#334155' : '#cbd5e1';
  const title = isBiz ? '#f1f5f9' : '#0f172a';
  const sub = isBiz ? '#94a3b8' : '#64748b';
  const body = isBiz ? '#cbd5e1' : '#334155';
  const accent = isBiz ? '#4ade80' : '#15803d';

  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        width: TW,
        zIndex: 9999,
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: 14,
        padding: '16px 18px',
        boxShadow: isBiz ? '0 8px 40px rgba(0,0,0,0.6)' : '0 8px 40px rgba(0,0,0,0.15)',
        pointerEvents: 'none',
        fontFamily: 'system-ui,sans-serif',
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: title, marginBottom: 2 }}>{data.label}</div>
      <div style={{ fontSize: 11, color: sub, marginBottom: 10 }}>{data.sublabel}</div>
      <div style={{ height: 1, background: border, marginBottom: 12 }} />
      <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        What it does
      </div>
      <div style={{ fontSize: 12, color: body, lineHeight: 1.6, marginBottom: 12 }}>{data.what}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        Why it matters
      </div>
      <div style={{ fontSize: 12, color: body, lineHeight: 1.6 }}>{data.why}</div>
    </div>
  );
}

const BulletRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  isBiz: boolean;
  tooltip?: TooltipData;
}> = ({ icon, label, sub, isBiz, tooltip }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-3 rounded-xl border p-3 ${isBiz ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-200'}`}
      onMouseEnter={() => tooltip && ref.current && setRect(ref.current.getBoundingClientRect())}
      onMouseLeave={() => setRect(null)}
    >
      <div
        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
          isBiz
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-emerald-50 border-emerald-200 text-emerald-600'
        }`}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold leading-snug ${isBiz ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        <p className={`text-xs mt-0.5 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
      </div>

      {tooltip && (
        <div
          className={`text-xs px-1.5 py-0.5 rounded border font-mono shrink-0 ${
            isBiz
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          }`}
          style={{ fontSize: 9 }}
        >
          ?
        </div>
      )}

      {rect && tooltip && <HtmlTooltip data={tooltip} anchorRect={rect} isBiz={isBiz} />}
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  sub: string;
  isBiz: boolean;
  strong?: boolean;
}> = ({ title, value, sub, isBiz, strong = false }) => (
  <div
    className={`rounded-2xl border p-4 ${
      strong
        ? isBiz
          ? 'bg-green-500/10 border-green-500/25'
          : 'bg-emerald-50 border-emerald-200'
        : isBiz
          ? 'bg-slate-900/70 border-slate-700'
          : 'bg-white border-slate-200'
    }`}
  >
    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
      {title}
    </p>
    <p className={`text-2xl font-extrabold mt-2 leading-tight ${isBiz ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    <p className={`text-xs mt-2 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
  </div>
);

const CodeBlock: React.FC<{
  lines: { text: string; type: string }[];
  label: string;
  badge: string;
  isBiz: boolean;
}> = ({ lines, label, badge, isBiz }) => (
  <div className={`rounded-xl border overflow-hidden ${isBiz ? 'border-slate-700' : 'border-slate-200'}`}>
    <div className={`flex items-center justify-between px-4 py-2 border-b text-xs font-bold ${isBiz ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs ${isBiz ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
        {badge}
      </span>
    </div>
    <div className={`p-4 font-mono text-xs leading-6 ${isBiz ? 'bg-slate-950 text-slate-400' : 'bg-slate-900 text-slate-400'}`}>
      {lines.map((line, i) => (
        <div key={i} style={{ minHeight: line.text === '' ? '0.75rem' : undefined }}>
          <span
            className={
              line.type === 'keyword'
                ? 'text-amber-400'
                : line.type === 'action'
                  ? isBiz
                    ? 'text-green-400'
                    : 'text-emerald-400'
                  : line.type === 'exception'
                    ? 'text-cyan-400'
                    : line.type === 'comment'
                      ? 'text-slate-500 italic'
                      : 'text-slate-600'
            }
          >
            {line.text}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ModernInfraPanel: React.FC<Props> = ({ isBiz }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [exampleIdx, setExampleIdx] = useState(0);

  const shellCard = isBiz ? 'bg-slate-900/55 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const softCard = isBiz ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200';
  const innerCard = isBiz ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-200';
  const headingText = isBiz ? 'text-white' : 'text-slate-900';
  const bodyText = isBiz ? 'text-slate-300' : 'text-slate-700';
  const mutedText = isBiz ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
            isBiz
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          }`}
        >
          <Server className="w-3 h-3" />
          Modern Infrastructure
        </div>

        <h3 className={`text-xl font-bold ${headingText}`}>
          Managed systems, safer logic, and a cleaner path to scale
        </h3>

        <p className={`text-sm mt-1 max-w-3xl ${mutedText}`}>
          This is not just a hosting story. It is about deploy speed, operational resilience, structured routing logic, and reducing the amount of brittle decision-making RTC forces agents to do manually under pressure.
        </p>
      </div>

      <div className="flex gap-1.5 shrink-0 flex-wrap">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? isBiz
                    ? 'bg-green-500/10 border-green-500/25 text-green-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : isBiz
                    ? 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {step.icon}
              {step.label}
            </button>
          );
        })}
      </div>

      <div
  className={`rounded-2xl border ${shellCard} flex flex-col overflow-hidden`}
  style={{ height: 620, minHeight: 620 }}
        >
          <div
            className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isBiz ? '#334155 transparent' : '#cbd5e1 transparent',
            }}
          >

        {activeStep === 0 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
                Why infrastructure matters
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Infrastructure is what turns ideas into dependable operations. RTC does not just need a place to host software. It needs a platform that can support live voice traffic, background processing, structured routing rules, and future AI products without becoming harder to maintain every time something new is added.
              </p>
              <p className={`text-sm leading-relaxed mt-3 ${bodyText}`}>
                In practice, that means better deployment workflows, clearer separation between real-time and background workloads, stronger observability, and a system architecture that moves brittle routing rules out of agent memory and into software. The goal is not just scale. It is safer execution, faster iteration, and fewer avoidable operational failures.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Entry baseline"
                value="$33/mo"
                sub="Dyno $25, Postgres $5, Redis $3. Good for early internal tools and light production use."
              />
              <StatCard
                isBiz={isBiz}
                title="Production path"
                value="$330/mo"
                sub="Dynos $250, Postgres $50, Redis $30. A cleaner fit for autoscaling production workloads."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Shield path"
                value="~$780/mo"
                sub="Shield dynos, Shield Postgres, Shield Redis, plus private space cost for stronger compliance boundaries."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Server className="w-4 h-4" />}
                label="Heroku buys speed and simplicity"
                sub="Not the cheapest raw compute, but often the fastest route to stable deploys and managed data services."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Scaling className="w-4 h-4" />}
                label="Scaling is broader than hosting"
                sub="Voice concurrency, websocket load, queues, workers, and failure isolation matter as much as dyno size."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Phone className="w-4 h-4" />}
                label="Realtime economics still work"
                sub="Twilio is about $0.0085/min, while AI answering still prices well against labor-heavy live answering."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ArrowRight className="w-4 h-4" />}
                label="Can move to GCP later"
                sub="Managed infrastructure first, then migrate selected workloads if lower-level cloud economics become worth it."
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <BulletRow
                isBiz={isBiz}
                icon={<Bot className="w-4 h-4" />}
                label="Premium realtime AI tier"
                sub="$1.29/min remains attractive against premium live answering, even with stronger hosting underneath."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<DollarSign className="w-4 h-4" />}
                label="Why software margin can improve"
                sub="RTC spends time reading notes, typing messages, and dispatching. Software pushes more of that cost into background automation."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Business framing</p>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                RTC is not only paying for hosting. It is paying for deployment speed, cleaner environments, easier scaling, better workload separation, and a safer base layer for multiple products.
              </p>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
                The routing rules problem
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                RTC agents are often asked to interpret pseudo-code-like routing rules embedded in freeform text. Errors happen, but the deeper problem is structural. Humans are being used as interpreters for brittle branching logic with exceptions, time windows, and account-specific routing context.
              </p>
            </div>

            <div className="flex gap-1.5">
              {['On-Call Routing', 'Medical Exceptions'].map((label, i) => (
                <button
                  key={i}
                  onClick={() => setExampleIdx(i)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    exampleIdx === i
                      ? isBiz
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : isBiz
                        ? 'bg-slate-800/40 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {exampleIdx === 0 && (
              <CodeBlock
                lines={spaghettiOncall}
                label="Startel CMC on-call routing block"
                badge="Freeform text"
                isBiz={isBiz}
              />
            )}

            {exampleIdx === 1 && (
              <CodeBlock
                lines={spaghettiMedical}
                label="Startel CMC medical supply account"
                badge="Nested exceptions"
                isBiz={isBiz}
              />
            )}

            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-sm font-bold mb-3 ${headingText}`}>Normalize the routing rules into data</p>
              <div className="grid md:grid-cols-2 gap-3">
                <BulletRow
                  isBiz={isBiz}
                  icon={<Table2 className="w-4 h-4" />}
                  label="Routing rules become records"
                  sub="Time windows, routing context, priority order, and contact references move out of prose and into fields."
                />
                <BulletRow
                  isBiz={isBiz}
                  icon={<Workflow className="w-4 h-4" />}
                  label="Relay steps become records"
                  sub="Call, voicemail, wait, retry, escalate, and stop conditions become explicit routing steps."
                />
                <BulletRow
                  isBiz={isBiz}
                  icon={<Database className="w-4 h-4" />}
                  label="One source of truth"
                  sub="The same routing rules should not live in multiple slightly different text blocks."
                />
                <BulletRow
                  isBiz={isBiz}
                  icon={<Search className="w-4 h-4" />}
                  label="Auditability becomes possible"
                  sub="Once rules are structured, RTC can search, validate, compare, and review them safely."
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${innerCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Target 1, routing rules</p>
                <div className="space-y-2">
                  {[
                    ['day_start / day_end', 'Mon / Tue'],
                    ['time_start / time_end', '17:00 / 08:00'],
                    ['routing_context_type', 'hospital / zip / keyword / state / doctor'],
                    ['routing_context_value', 'Houston Methodist / 77030 / bed repair / TX / Dr. Shah'],
                    ['contact_ref', 'Jake Ballard / TX Group'],
                    ['priority', '1 to 7'],
                  ].map(([field, example], i) => (
                    <div key={i} className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${isBiz ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className={`font-mono text-xs font-bold ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>{field}</span>
                      <span className={`text-xs ${mutedText}`}>{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${innerCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Target 2, relay steps</p>
                <CodeBlock
                  lines={relayInstructions}
                  label="Current relay text"
                  badge="Inline prose"
                  isBiz={isBiz}
                />
              </div>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-green-500/10 border-green-500/20' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Operational point</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Even strong agents still get caught by sneaky edge cases. That is evidence the routing rules should be encoded more safely. The goal is not better prose. It is replacing prose with structured routing data the system can evaluate.
              </p>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
                Two rule types, one engine
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Most RTC routing rules fall into two categories: time-window routing and conditional exception trees. The rule engine handles both so agents do not have to manually evaluate them live.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock3 className={`w-4 h-4 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`} />
                  <p className={`text-sm font-bold ${headingText}`}>Rule type 1, time-window routing</p>
                </div>
                <p className={`text-xs mb-3 ${mutedText}`}>
                  First matching rule wins. Higher-priority exceptions sit above catch-all windows.
                </p>

                <div className={`rounded-xl border overflow-hidden ${isBiz ? 'border-slate-700' : 'border-slate-200'}`}>
                  <div
                    className={`grid px-3 py-2 text-xs font-bold uppercase tracking-wider ${isBiz ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}
                    style={{ gridTemplateColumns: '1.5rem 1fr 1fr' }}
                  >
                    <span>#</span>
                    <span>Window + context</span>
                    <span>Route to</span>
                  </div>

                  {[
                    { p: '1', window: 'Mon-Fri 09:00-17:00', contact: 'John Doe #1122', ex: false },
                    { p: '2', window: 'Mon 17:00 - Tue 08:00', contact: 'Jake Ballard 1234', ex: false },
                    { p: '3', window: 'Tue 17:00 - Wed 08:00', contact: 'Peggy Scott 4321', ex: false },
                    { p: '4', window: 'Fri 17:00-Mon 08:00 + Houston Methodist', contact: 'Houston TX Group', ex: true },
                    { p: '5', window: 'Fri 17:00 - Mon 08:00', contact: 'Weekend OC', ex: false },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className={`grid px-3 py-2.5 border-t text-xs items-center ${
                        row.ex
                          ? isBiz
                            ? 'border-slate-800 bg-amber-500/10'
                            : 'border-slate-100 bg-amber-50'
                          : isBiz
                            ? 'border-slate-800'
                            : 'border-slate-100'
                      }`}
                      style={{ gridTemplateColumns: '1.5rem 1fr 1fr' }}
                    >
                      <span className={`font-black ${row.ex ? (isBiz ? 'text-amber-400' : 'text-amber-700') : isBiz ? 'text-green-400' : 'text-emerald-600'}`}>{row.p}</span>
                      <span className={isBiz ? 'text-slate-300' : 'text-slate-700'}>{row.window}</span>
                      <span className={row.ex ? (isBiz ? 'text-amber-300 font-semibold' : 'text-amber-800 font-semibold') : isBiz ? 'text-green-400 font-semibold' : 'text-emerald-700 font-semibold'}>
                        {row.contact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className={`w-4 h-4 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`} />
                  <p className={`text-sm font-bold ${headingText}`}>Rule type 2, exception trees</p>
                </div>
                <p className={`text-xs mb-3 ${mutedText}`}>
                  For medical and specialty accounts, the rule engine evaluates explicit conditions and exclusions until it reaches a route.
                </p>

                <div className={`rounded-xl border p-3 ${innerCard}`}>
                  <div className="space-y-2">
                    {[
                      ['Can this wait until business hours?', 'If yes, take message, no page'],
                      ['Is it routine supply, billing, referral, or customer service?', 'If yes, take message, no page'],
                      ['Exception for doctor or hospital?', 'If yes, page Ventilation OC'],
                      ['DME repair for a bed?', 'If yes, page Ventilation OC'],
                      ['Urgent orthotics or prosthetics issue?', 'If yes, page Orthotics OC'],
                      ['Urgent billing or service dispute?', 'If yes, page Customer Svc OC'],
                    ].map(([question, answer], i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className={`w-3 h-3 shrink-0 mt-0.5 ${isBiz ? 'text-slate-500' : 'text-slate-400'}`} />
                        <div>
                          <p className={`text-xs ${bodyText}`}>{question}</p>
                          <p className={`text-xs font-semibold mt-0.5 ${isBiz ? 'text-green-400' : 'text-emerald-700'}`}>{answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Cpu className="w-4 h-4" />}
                label="Humans stop being the runtime"
                sub="The rule engine evaluates the hidden logic so the agent only sees the resolved output."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Safer and more consistent"
                sub="The same routing context produces the same result every time instead of depending on who parsed the notes."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<RefreshCw className="w-4 h-4" />}
                label="Changes become safer"
                sub="Updating a rule becomes editing a record, not rewriting a paragraph and hoping nothing broke."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Activity className="w-4 h-4" />}
                label="Auditability becomes real"
                sub="RTC can track what changed, when it changed, and which rule produced the output."
              />
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
                The agent should see the answer
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                A safer dispatch interface hides the branching logic. The agent enters the account group and the relevant routing context, then the system resolves the current route, exceptions, and relay steps automatically.
              </p>
            </div>

            <div className={`rounded-2xl border shadow-sm overflow-hidden ${isBiz ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'}`}>
              <div className={`flex items-center justify-between px-4 py-3 border-b ${isBiz ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`} />
                  <span className={`text-sm font-bold tracking-tight ${headingText}`}>Dispatch Routing Engine</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium ${isBiz ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                  <Clock3 className="w-3 h-3" />
                  Fri 19:04
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${mutedText}`}>Account group</label>
                  <div className={`relative rounded-lg border flex items-center ${isBiz ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'}`}>
                    <Search className={`absolute left-3 w-3.5 h-3.5 ${mutedText}`} />
                    <input
                      readOnly
                      value="Houston TX Group"
                      className={`w-full bg-transparent pl-9 pr-3 py-2.5 text-sm font-medium outline-none cursor-default ${isBiz ? 'text-white' : 'text-slate-900'}`}
                    />
                    <div className={`mr-2 px-1.5 py-0.5 rounded text-xs font-bold uppercase ${isBiz ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                      Matched
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${mutedText}`}>Routing context type</label>
                    <div className={`rounded-lg border px-3 py-2.5 flex items-center gap-2 text-sm ${isBiz ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}>
                      <Building2 className={`w-3.5 h-3.5 ${mutedText}`} />
                      <span className="font-medium">Hospital</span>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${mutedText}`}>Routing context value</label>
                    <div className={`rounded-lg border px-3 py-2.5 flex items-center gap-2 text-sm ${isBiz ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}>
                      <MapPin className={`w-3.5 h-3.5 ${mutedText}`} />
                      <span className="font-medium">Houston Methodist</span>
                    </div>
                  </div>
                </div>

                <button className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${isBiz ? 'bg-green-500 text-slate-950 hover:bg-green-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                  <Zap className="w-4 h-4" /> Run Routing Engine
                </button>
              </div>

              <div className={`border-t ${isBiz ? 'border-slate-800 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
                <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${isBiz ? 'border-slate-800' : 'border-slate-200'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${isBiz ? 'text-green-400' : 'text-emerald-700'}`}>
                    Match found, routing context applied
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${mutedText}`}>Route to</p>
                      <p className={`text-xl font-black tracking-tight ${headingText}`}>Marcus Webb</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${isBiz ? 'bg-green-400' : 'bg-emerald-500'}`} />
                        <p className={`text-xs ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>Resolved live from CMC directory</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${mutedText}`}>Number</p>
                      <p className={`text-lg font-bold font-mono ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>(713) 555-0182</p>
                      <p className={`text-xs mt-0.5 ${mutedText}`}>Houston TX On-Call</p>
                    </div>
                  </div>

                  <div className={`rounded-lg border px-3 py-2.5 flex gap-2.5 text-xs ${isBiz ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <p>
                      <span className="font-bold">Routing context triggered:</span> caller is associated with Houston Methodist, so route to the Houston TX group instead of the general weekend on-call.
                    </p>
                  </div>

                  <div className={`rounded-lg border p-3 flex flex-col gap-2 ${innerCard}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${mutedText}`}>Relay steps</p>
                    {[
                      ['1', 'Call Marcus Webb', '(713) 555-0182'],
                      ['2', 'If no answer, leave VM + LCB', 'Set 5-min action'],
                      ['3', 'If still no answer, call Secondary OC', 'Resolved from CMC'],
                    ].map(([step, action, detail], i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i === 0 ? (isBiz ? 'bg-green-500/20 text-green-400' : 'bg-emerald-100 text-emerald-700') : isBiz ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                          {step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold ${headingText}`}>{action}</p>
                          <p className={`text-xs ${mutedText}`}>{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Building2 className="w-4 h-4" />}
                label="Hospital-based routing context"
                sub="For pacemaker or specialty accounts, the source hospital can decide which group gets paged."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Hash className="w-4 h-4" />}
                label="Zip-based routing context"
                sub="For service accounts, the same rule engine can route by zip code, city, region, or state."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Stethoscope className="w-4 h-4" />}
                label="Doctor or patient context"
                sub="A doctor's hospital, or which doctor a patient sees, can become routing context when the account requires it."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Map className="w-4 h-4" />}
                label="Keyword or state context"
                sub="Medical equipment and specialty workflows can also branch on keywords, product type, or geography."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-green-500/10 border-green-500/20' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Design principle</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The interface should not assume every account routes by caller location alone. It should support whatever routing context the account actually uses, then turn that context into a clean answer, a clean number, and the next step.
              </p>
            </div>
          </>
        )}

        {activeStep === 4 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-green-400' : 'text-emerald-600'}`}>
                Migration should be gradual
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                This does not require a risky big-bang cutover. The safer path is audit, build, shadow test, refine, and then cut over only after the rule engine reliably matches the intended routing behavior.
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {[
                {
                  name: 'Audit',
                  tag: 'Foundation',
                  desc: 'Translate current CMC routing text into a master structured sheet. Capture time windows, exceptions, relay steps, and routing context.',
                },
                {
                  name: 'Build',
                  tag: 'Engineering',
                  desc: 'Stand up the routing database, rule engine, CMC integration, and agent dispatch interface.',
                },
                {
                  name: 'Shadow test',
                  tag: 'Validation',
                  desc: 'Run old and new logic side by side on live traffic and compare every routing outcome.',
                },
                {
                  name: 'Refine',
                  tag: 'QA',
                  desc: 'Fix discrepancies, especially nested exceptions and strange account-specific branches.',
                },
                {
                  name: 'Cutover',
                  tag: 'Launch',
                  desc: 'Retire the brittle text path only after the new system is trusted and validated.',
                },
              ].map((phase, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center shrink-0" style={{ width: 24 }}>
                    <div className={`w-3 h-3 rounded-full shrink-0 mt-4 ${isBiz ? 'bg-green-400' : 'bg-emerald-500'}`} />
                    {i < arr.length - 1 && <div className={`w-px flex-1 mt-1 ${isBiz ? 'bg-slate-700' : 'bg-slate-200'}`} style={{ minHeight: 16 }} />}
                  </div>

                  <div className={`flex-1 rounded-xl border p-3.5 mb-2 ${softCard}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className={`text-xs font-bold ${headingText}`}>{phase.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold ${isBiz ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}>
                        {phase.tag}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${bodyText}`}>{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<ShieldCheck className="w-4 h-4" />}
                label="No untested path goes live"
                sub="The old system stays active until the rule engine is proven safe enough to trust."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Validation becomes explicit"
                sub="Instead of assuming the text is right, RTC can compare actual outputs and correct edge cases deliberately."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Wrench className="w-4 h-4" />}
                label="Admins get a maintainable workflow"
                sub="Long term, edits happen in forms and rule records instead of dense, exception-heavy text."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Network className="w-4 h-4" />}
                label="This supports the broader platform"
                sub="The same structured infrastructure helps AI tools, dashboards, and internal ops systems stay aligned."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-green-500/10 border-green-500/20' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Bottom line</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Modern infrastructure at RTC should mean more than stronger hosting. It should mean structured routing rules, safer dispatch workflows, cleaner scaling boundaries, and a system that reduces avoidable human error by design.
              </p>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default ModernInfraPanel;