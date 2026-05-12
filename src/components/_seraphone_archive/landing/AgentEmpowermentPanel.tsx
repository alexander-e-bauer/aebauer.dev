import React, { useRef, useState } from 'react';
import {
  Network,
  Search,
  AlertTriangle,
  MessageCircle,
  Database,
  Slack,
  CalendarRange,
  Bot,
  CheckCircle2,
  ArrowRight,
  FileText,
  Workflow,
  Clock3,
  Layers,
  Wand2,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

interface Props {
  isBiz: boolean;
}

const steps = [
  { id: 0, icon: <AlertTriangle className="w-3.5 h-3.5" />, label: 'The Retrieval Problem' },
  { id: 1, icon: <Search className="w-3.5 h-3.5" />, label: 'KG Search in Slack' },
  { id: 2, icon: <CalendarRange className="w-3.5 h-3.5" />, label: 'Schedule Automation' },
  { id: 3, icon: <Slack className="w-3.5 h-3.5" />, label: 'Why This Matters at RTC' },
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
  const accent = isBiz ? '#a78bfa' : '#4f46e5';

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
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
            : 'bg-indigo-50 border-indigo-200 text-indigo-600'
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
              ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
              : 'bg-indigo-50 border-indigo-200 text-indigo-600'
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
          ? 'bg-purple-500/10 border-purple-500/25'
          : 'bg-indigo-50 border-indigo-200'
        : isBiz
          ? 'bg-slate-900/70 border-slate-700'
          : 'bg-white border-slate-200'
    }`}
  >
    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-purple-400' : 'text-indigo-600'}`}>
      {title}
    </p>
    <p className={`text-2xl font-extrabold mt-2 leading-tight ${isBiz ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    <p className={`text-xs mt-2 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
  </div>
);

const SlackExample: React.FC<{
  isBiz: boolean;
  prompt: string;
  response: string;
}> = ({ isBiz, prompt, response }) => (
  <div className={`rounded-2xl border overflow-hidden ${isBiz ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-white'}`}>
    <div className={`px-4 py-2 border-b text-xs font-semibold ${isBiz ? 'border-slate-700 bg-slate-900/70 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
      Slack copilot example
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isBiz ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          <MessageCircle className="w-3.5 h-3.5" />
        </div>
        <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-[85%] ${isBiz ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
          {prompt}
        </div>
      </div>

      <div className="flex gap-3 items-start">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
            isBiz ? 'bg-purple-500/15 text-purple-400' : 'bg-indigo-100 text-indigo-600'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
        </div>
        <div
          className={`rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-[92%] ${
            isBiz ? 'bg-purple-500/10 text-slate-200 border border-purple-500/20' : 'bg-indigo-50 text-slate-700 border border-indigo-200'
          }`}
        >
          {response}
        </div>
      </div>
    </div>
  </div>
);

const AgentEmpowermentPanel: React.FC<Props> = ({ isBiz }) => {
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
              ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
              : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}
        >
          <Network className="w-3 h-3" />
          Agent Empowerment
        </div>

        <h3 className={`text-xl font-bold ${headingText}`}>
          A Slack copilot that helps RTC find the right answer faster
        </h3>

        <p className={`text-sm mt-1 max-w-3xl ${mutedText}`}>
          At RTC, a huge share of the work is accurate message taking, fast instruction lookup, and repetitive admin tasks. A Slack-based AI tool can improve all three without changing the human service model.
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
                    ? 'bg-purple-500/10 border-purple-500/25 text-purple-400'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-600'
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
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-purple-400' : 'text-indigo-600'}`}>
                The real bottleneck
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                RTC often has to take accurate messages with limited context. When instructions do exist, they are often buried in long plain-text mastercards that are hard to scan under pressure. The result is slow retrieval, inconsistent handling, and too much time spent searching for what should happen next.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Most common work"
                value="Message accuracy"
                sub="Getting the right message to the right place with the right context."
              />
              <StatCard
                isBiz={isBiz}
                title="Biggest friction"
                value="Weak retrieval"
                sub="Important instructions exist, but they are buried in plain-text documentation."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Immediate opportunity"
                value="Slack copilot"
                sub="Give staff a faster way to ask questions and retrieve the best answer."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<FileText className="w-4 h-4" />}
                label="Mastercards are hard to navigate"
                sub="Even useful notes become hard to use when they are long, inconsistent, and packed with exceptions."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Search className="w-4 h-4" />}
                label="Keyword search breaks too easily"
                sub="Agents should not have to guess the exact phrase used in the notes to find the right answer."
                tooltip={{
                  label: 'Why keyword search breaks',
                  sublabel: 'Exact-match retrieval is brittle',
                  what: 'If the caller describes the issue one way and the notes describe it another way, a keyword search can miss the right instruction.',
                  why: 'RTC needs meaning-based retrieval, not just literal string matching.',
                }}
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Clock3 className="w-4 h-4" />}
                label="Slow lookup increases stress"
                sub="Every extra minute spent searching makes the call feel messier and less confident."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<MessageCircle className="w-4 h-4" />}
                label="Most calls need the right instruction fast"
                sub="This is exactly where AI retrieval can improve the service without replacing the person."
              />
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-purple-400' : 'text-indigo-600'}`}>
                Knowledge graph + embeddings inside Slack
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Instead of forcing staff to hunt through a mastercard with keywords, the Slack app can answer normal-language questions using knowledge graph search and vector similarity. In plain English: it can retrieve the most relevant instruction by meaning, even when the wording does not match exactly.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>What the Slack app can do</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Database className="w-4 h-4" />}
                    label="Semantic knowledge retrieval"
                    sub="Search policy chunks, notes, and instructions by meaning instead of exact text match."
                    tooltip={{
                      label: 'Semantic retrieval',
                      sublabel: 'Embedding-based search',
                      what: 'The system compares the meaning of the question to the meaning of stored policy chunks, then returns the closest matches.',
                      why: 'This makes retrieval more reliable when callers and documentation use different wording.',
                    }}
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Layers className="w-4 h-4" />}
                    label="Return the right chunk"
                    sub="Show the best section instead of making staff scan the entire document."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Wand2 className="w-4 h-4" />}
                    label="Natural-language questions"
                    sub="Staff can ask normal questions instead of learning rigid search syntax."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<ShieldCheck className="w-4 h-4" />}
                    label="Better consistency"
                    sub="When the best answer appears quickly, message-taking mistakes and bad routing go down."
                  />
                </div>
              </div>

              <SlackExample
                isBiz={isBiz}
                prompt="Customer says the remote has short range and the lift hiccups. What should I check first?"
                response="Start with transmitter battery strength. If the red LED flickers, replace both CR2032 batteries. The guide also says not to change antenna wire length and notes the system requires line of sight, up to 300 feet. Retrieved from the transmitter and range troubleshooting section."
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <SlackExample
                isBiz={isBiz}
                prompt="Summarize what matters before I answer a customer asking how to sync a replacement GEM remote."
                response="Open the GEM faceplate, press and release the Learn button once, then press Stop on the replacement remote within 5 seconds. The LED should flash twice to confirm pairing. Do not hold the Learn button for 7 seconds or memory will be cleared. Retrieved from the syncing guide."
              />
              <SlackExample
                isBiz={isBiz}
                prompt="Does flood damage qualify for the standard GEM warranty?"
                response="No. The 1-year warranty covers defects in materials and workmanship, but does not cover submersion, flood damage, lightning strikes, power surges, or improper installation. Retrieved from the warranty policy."
              />
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-purple-400' : 'text-indigo-600'}`}>
                Beyond search: actually doing the work
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The Slack app should not stop at answering questions. It can also help with repetitive workflows like on-call entry and schedule updates. Instead of typing changes one row at a time, staff should be able to paste a schedule block, let the bot structure it, then review before submission.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Pain today"
                value="Manual entry"
                sub="Two weeks of schedule changes entered into CMC one row at a time."
              />
              <StatCard
                isBiz={isBiz}
                title="AI assist"
                value="Paste → structure → validate"
                sub="Read a schedule block, extract fields, then prepare clean updates."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Workflow effect"
                value="Less admin drag"
                sub="Less repetitive data entry, more time for review and edge cases."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<CalendarRange className="w-4 h-4" />}
                label="Paste a whole schedule"
                sub="Staff could paste the source schedule directly into Slack instead of entering each change by hand."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Workflow className="w-4 h-4" />}
                label="Extract structured fields"
                sub="Client ID, member name, role, start time, and end time can be parsed for tool execution."
                tooltip={{
                  label: 'Tool-based schedule workflow',
                  sublabel: 'Structured updates before execution',
                  what: 'Your backend already defines tool inputs for on-call updates, including client, member, role, and shift start/end.',
                  why: 'That makes schedule automation a believable extension of the Slack app, not just a concept slide.',
                }}
              />
              <BulletRow
                isBiz={isBiz}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Validate before writing"
                sub="The bot can ask for missing fields and confirm ambiguous details before making changes."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ArrowRight className="w-4 h-4" />}
                label="Slack as an ops surface"
                sub="The same tool that answers questions can also help staff move from question to action."
              />
            </div>

            <SlackExample
              isBiz={isBiz}
              prompt={`Put this into on-call:
Mon 5p–Tue 8a Jake Ballard primary
Tue 5p–Wed 8a Peggy Scott backup
Wed 5p–Thu 8a Jake Ballard primary`}
              response="I parsed 3 proposed on-call entries. I still need the Client ID before submitting. Once confirmed, I can structure the assignments and prepare the Startel updates for review."
            />
          </>
        )}

        {activeStep === 3 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-purple-400' : 'text-indigo-600'}`}>
                A practical internal AI product
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                This gives RTC an immediate internal AI win. Ryan does not have to buy the full external AI answering vision on day one. The Slack tools stand on their own: better retrieval, easier schedule workflows, and less time lost fighting documentation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Why it fits RTC specifically</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<MessageCircle className="w-4 h-4" />}
                    label="Human layer already wins"
                    sub="The Slack app strengthens that layer by helping people find the right instruction faster."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Search className="w-4 h-4" />}
                    label="Retrieval is the real bottleneck"
                    sub="When most of the job is message quality and routing accuracy, better retrieval has immediate value."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Bot className="w-4 h-4" />}
                    label="Useful before voice rollout"
                    sub="This can create real operational value even if external AI answering is introduced gradually."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Slack className="w-4 h-4" />}
                    label="Low-friction adoption path"
                    sub="Slack is a practical interface for asking questions, getting summaries, and triggering actions."
                  />
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>What this becomes over time</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Database className="w-4 h-4" />}
                    label="Business knowledge copilot"
                    sub="Fast retrieval for policies, exceptions, routing notes, account logic, or anything we need to know."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Workflow className="w-4 h-4" />}
                    label="Operations assistant"
                    sub="A natural-language layer over repetitive admin tasks like on-call scheduling."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Wrench className="w-4 h-4" />}
                    label="Bridge to broader AI systems"
                    sub="The same retrieval foundation can later support voice AI, analytics, and agent assist."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<ShieldCheck className="w-4 h-4" />}
                    label="Safer than replacing people outright"
                    sub="It gives humans better tools first, which is a more practical way to modernize RTC."
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Phase 1 value"
                value="Internal leverage"
                sub="Make staff faster and reduce admin drag before expanding the external AI product."
              />
              <StatCard
                isBiz={isBiz}
                title="Most compelling proof"
                value="Better retrieval"
                sub="If staff can stop fighting mastercards and find the answer faster, the product is already working."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Strategic effect"
                value="AI that supports RTC's people"
                sub="That is the right modernization story for this business."
              />
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default AgentEmpowermentPanel;