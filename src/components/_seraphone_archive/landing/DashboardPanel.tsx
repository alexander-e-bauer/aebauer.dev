import React, { useRef, useState } from 'react';
import {
  BarChart3,
  BrainCircuit,
  Search,
  Activity,
  AlertTriangle,
  FileSearch,
  Network,
  Sparkles,
  Clock3,
  Layers3,
  ShieldAlert,
  Filter,
  Bot,
  LineChart,
  Database,
  Workflow,
  TrendingUp,
  Eye,
  CheckCircle2,
  MessagesSquare,
} from 'lucide-react';

interface Props {
  isBiz: boolean;
}

const steps = [
  { id: 0, icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Why The Dashboard Matters' },
  { id: 1, icon: <BrainCircuit className="w-3.5 h-3.5" />, label: 'Embeddings & Patterns' },
  { id: 2, icon: <ShieldAlert className="w-3.5 h-3.5" />, label: 'Anomalies & Risk' },
  { id: 3, icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Client Value' },
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
  const accent = isBiz ? '#22d3ee' : '#2563eb';

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
            ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            : 'bg-blue-50 border-blue-200 text-blue-600'
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
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
              : 'bg-blue-50 border-blue-200 text-blue-600'
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
          ? 'bg-cyan-500/10 border-cyan-500/25'
          : 'bg-blue-50 border-blue-200'
        : isBiz
          ? 'bg-slate-900/70 border-slate-700'
          : 'bg-white border-slate-200'
    }`}
  >
    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
      {title}
    </p>
    <p className={`text-2xl font-extrabold mt-2 leading-tight ${isBiz ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    <p className={`text-xs mt-2 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
  </div>
);

const InsightCard: React.FC<{
  isBiz: boolean;
  title: string;
  body: string;
  icon: React.ReactNode;
}> = ({ isBiz, title, body, icon }) => (
  <div className={`rounded-2xl border p-4 ${isBiz ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-200'}`}>
    <div className="flex items-start gap-3">
      <div
        className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
          isBiz
            ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            : 'bg-blue-50 border-blue-200 text-blue-600'
        }`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-sm font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>{title}</p>
        <p className={`text-xs mt-1 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{body}</p>
      </div>
    </div>
  </div>
);

const DashboardPanel: React.FC<Props> = ({ isBiz }) => {
  const [activeStep, setActiveStep] = useState(0);

  const shellCard = isBiz ? 'bg-slate-900/55 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const softCard = isBiz ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200';
  const headingText = isBiz ? 'text-white' : 'text-slate-900';
  const bodyText = isBiz ? 'text-slate-300' : 'text-slate-700';
  const mutedText = isBiz ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
            isBiz
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}
        >
          <BarChart3 className="w-3 h-3" />
          Dashboard & Intelligence
        </div>

        <h3 className={`text-xl font-bold ${headingText}`}>
          Turn RTC&apos;s call history into an intelligence layer, not just a record archive
        </h3>

        <p className={`text-sm mt-1 max-w-3xl ${mutedText}`}>
          A basic dashboard tells you how many calls happened. A smarter one shows where confusion is forming, what patterns are changing, and which workflows need attention.
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
                    ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400'
                    : 'bg-blue-50 border-blue-200 text-blue-600'
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
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                Why this matters
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                RTC already generates valuable data every day: transcripts, notes, dispositions, callbacks, escalations, account variation, and repeated caller issues. Much of that value disappears after the call. A stronger dashboard turns that call exhaust into feedback about where agents struggle, where accounts are unclear, and which workflows create repeat friction.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Raw material"
                value="Call data"
                sub="A large stream of conversations, notes, and outcomes."
              />
              <StatCard
                isBiz={isBiz}
                title="Embeddings unlock"
                value="Meaning-level analysis"
                sub="Not just counts and keywords, but themes, clusters, similarity, and drift."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Best outcome"
                value="Operational clarity"
                sub="See where confusion, risk, and missed process signals come from."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<MessagesSquare className="w-4 h-4" />}
                label="Call logs are more than archives"
                sub="The transcript, note, and outcome stream shows what callers actually need and where agents get stuck."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Eye className="w-4 h-4" />}
                label="Hidden patterns can become visible"
                sub="Repeated confusion, edge cases, and slow drift are hard to spot without analysis across many calls."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Workflow className="w-4 h-4" />}
                label="Operations can improve from the data"
                sub="If a workflow repeatedly causes routing or note-taking issues, the dashboard should reveal it."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<TrendingUp className="w-4 h-4" />}
                label="There is client-facing value too"
                sub="RTC can eventually show not only that calls were handled, but what patterns emerged."
              />
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                Embeddings change what a dashboard can see
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                A normal dashboard counts events. Embeddings make it possible to compare conversations by meaning, cluster repeated situations together, detect topic drift over time, and surface patterns even when people describe the same issue differently.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <InsightCard
                isBiz={isBiz}
                icon={<BrainCircuit className="w-4 h-4" />}
                title="Cluster similar calls automatically"
                body="Group conversations by meaning so RTC can see the real categories of work across accounts, shifts, and time windows."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Search className="w-4 h-4" />}
                title="Find repeated issues without exact keywords"
                body="Two callers may describe the same problem differently. Embeddings can still pull those cases together."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Layers3 className="w-4 h-4" />}
                title="Track topic drift over time"
                body="See when an account starts generating new kinds of issues, confusion, or urgency."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Filter className="w-4 h-4" />}
                title="Separate noise from real patterns"
                body="Move beyond anecdotal impressions and see which themes recur often enough to deserve attention."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<FileSearch className="w-4 h-4" />}
                label="Similarity search across conversations"
                sub="Retrieve prior calls that resemble a current issue, even if the wording is different."
                tooltip={{
                  label: 'Conversation similarity',
                  sublabel: 'Embedding-based retrieval',
                  what: 'Each call can be represented as a vector, making it possible to compare calls by meaning instead of exact phrases.',
                  why: 'That makes the dashboard much better at identifying recurring issue types and related edge cases.',
                }}
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Network className="w-4 h-4" />}
                label="Theme clustering"
                sub="Organize thousands of calls into meaningful buckets like overflow routing, callback friction, or instruction confusion."
                tooltip={{
                  label: 'Theme clustering',
                  sublabel: 'Pattern grouping',
                  what: 'Calls with similar meaning naturally group together, helping RTC see structure inside a messy call stream.',
                  why: 'This makes reporting more useful internally and more credible externally.',
                }}
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Sparkles className="w-4 h-4" />}
                label="Smarter summaries"
                sub="Condense a cluster of similar calls into a readable explanation of what is actually happening."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Database className="w-4 h-4" />}
                label="Recover value from lost context"
                sub="Even if legacy systems missed the insight, the underlying call stream can still be mined now."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Why the Startel and historical-data issue matters</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                If important analytics were never captured or became hard to access, RTC loses more than reports. It loses memory. Embedding-driven analysis is a way to rebuild intelligence from the call stream itself.
              </p>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                The dashboard should surface risk, not just volume
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Basic reporting treats all calls like neutral events. A stronger dashboard should highlight anomalies: unusual spikes, repeated confusion, abnormal escalation behavior, suspicious call patterns, deteriorating service quality, or shifts starting to drift off process.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Detect early"
                value="Pattern drift"
                sub="Catch changes before they become larger service or staffing problems."
              />
              <StatCard
                isBiz={isBiz}
                title="Most useful signal"
                value="Repeated confusion"
                sub="If agents keep stumbling on the same account or workflow, something is wrong upstream."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Best outcome"
                value="Actionable review"
                sub="Not just alerts, but a short explanation of what changed and what to inspect."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<AlertTriangle className="w-4 h-4" />}
                label="Escalation anomalies"
                sub="Spot accounts or time windows where urgent escalations rise unexpectedly."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Clock3 className="w-4 h-4" />}
                label="Service degradation"
                sub="Flag rising after-hours delays, callback loops, or more uncertain dispositions."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Process adherence gaps"
                sub="See where notes, routing, or message structure become inconsistent across shifts."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Bot className="w-4 h-4" />}
                label="Suspicious-call patterns"
                sub="Surface clusters that resemble scam attempts, test calls, or repeated manipulation."
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <InsightCard
                isBiz={isBiz}
                icon={<Activity className="w-4 h-4" />}
                title="Anomaly feeds for supervisors"
                body="Leads should see what changed, why it was flagged, and which examples support the signal."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<ShieldAlert className="w-4 h-4" />}
                title="Risk review by account"
                body="Some client workflows create repeated confusion or risky ambiguity. The dashboard should make those accounts obvious."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>A useful principle</p>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                The dashboard should not just say
                <span className={`font-semibold ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}> "here is what happened."</span>
                It should say
                <span className={`font-semibold ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}> "here is what changed, why it matters, and what needs attention."</span>
              </p>
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                This becomes a better reporting product too
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                There is internal value here, but there is also external value. If RTC can summarize not only volume but patterns, issue categories, escalation trends, and recurring friction points, the dashboard becomes a more premium client product.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>What clients could eventually see</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Top call themes"
                    sub="What callers are actually contacting them about most often organized into concise action items."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<AlertTriangle className="w-4 h-4" />}
                    label="Recurring friction points"
                    sub="Where callers or agents repeatedly hit confusion, delay, or escalation triggers."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<LineChart className="w-4 h-4" />}
                    label="Trend changes over time"
                    sub="How issue categories rise, fall, or shift by week, season, or service window. Track customer stories over time"
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Sparkles className="w-4 h-4" />}
                    label="AI-generated summaries"
                    sub="Readable monthly or weekly explanations instead of raw tables and exports."
                  />
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Why that matters commercially</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<BarChart3 className="w-4 h-4" />}
                    label="More than commodity answering"
                    sub="RTC can show that it provides operational insight, not just call handling."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Eye className="w-4 h-4" />}
                    label="Better client visibility"
                    sub="Customers understand not only what happened, but what their callers keep needing."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Workflow className="w-4 h-4" />}
                    label="Better client workflows"
                    sub="Insights can lead to clearer instructions, fewer escalations, and less repeated confusion."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Stronger premium positioning"
                    sub="A more intelligent dashboard supports higher-value service packaging over time."
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Internal win"
                value="Operational clarity"
                sub="RTC sees where confusion, risk, and drift are forming."
              />
              <StatCard
                isBiz={isBiz}
                title="External win"
                value="Premium reporting"
                sub="Clients get more than counts. They get insight."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Strategic value"
                value="Intelligence layer"
                sub="RTC turns call handling into a richer data product over time."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Bottom line</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The dashboard should evolve from a reporting accessory into an intelligence layer:
                <span className={`font-semibold ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}> a system that helps RTC understand patterns, fix workflows, detect risk earlier, and eventually give clients insight that ordinary answering services cannot.</span>
              </p>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default DashboardPanel;