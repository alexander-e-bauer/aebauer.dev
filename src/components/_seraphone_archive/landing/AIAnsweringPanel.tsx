import React, { useMemo, useState } from 'react';
import {
  Cpu,
  PhoneCall,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock3,
  Bot,
  Users,
} from 'lucide-react';

interface Props {
  isBiz: boolean;
}

const steps = [
  { id: 0, label: 'Market Opportunity', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { id: 1, label: 'Pricing & Margins', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 2, label: 'Why RTC Wins', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { id: 3, label: 'Deployment Model', icon: <Building2 className="w-3.5 h-3.5" /> },
];

const BulletRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  isBiz: boolean;
}> = ({ icon, label, sub, isBiz }) => (
  <div
    className={`flex items-start gap-3 rounded-xl border p-3 ${
      isBiz ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-200'
    }`}
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
    <div className="min-w-0">
      <p className={`text-xs font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>{label}</p>
      <p className={`text-xs mt-0.5 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
    </div>
  </div>
);

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
    <p className={`text-2xl font-extrabold mt-2 break-words leading-tight ${isBiz ? 'text-white' : 'text-slate-900'}`}>
      {value}
    </p>
    <p className={`text-xs mt-2 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
  </div>
);

const MetricPill: React.FC<{
  title: string;
  value: string;
  sub: string;
  isBiz: boolean;
  strong?: boolean;
}> = ({ title, value, sub, isBiz, strong = false }) => (
  <div
    className={`rounded-xl border p-3 ${
      strong
        ? isBiz
          ? 'bg-cyan-500/10 border-cyan-500/25'
          : 'bg-blue-50 border-blue-200'
        : isBiz
          ? 'bg-slate-900/80 border-slate-700'
          : 'bg-white border-slate-200'
    }`}
  >
    <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
      {title}
    </p>
    <p className={`text-3xl font-extrabold leading-none mt-2 break-words ${isBiz ? 'text-white' : 'text-slate-900'}`}>
      {value}
    </p>
    <p className={`text-xs mt-2 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>{sub}</p>
  </div>
);

const AIAnsweringPanel: React.FC<Props> = ({ isBiz }) => {
  const [activeStep, setActiveStep] = useState(0);

  const shellCard = isBiz ? 'bg-slate-900/55 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const softCard = isBiz ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200';
  const headingText = isBiz ? 'text-white' : 'text-slate-900';
  const bodyText = isBiz ? 'text-slate-300' : 'text-slate-700';
  const mutedText = isBiz ? 'text-slate-400' : 'text-slate-600';

  const pricing = useMemo(() => {
    const twilioPerMin = 0.0085;

    const premiumLow = 0.576 + twilioPerMin;
    const premiumHigh = 0.96 + twilioPerMin;
    const premiumAvg = 0.7;
    const premiumSell = 1.29;

    const miniLow = 0.18 + twilioPerMin;
    const miniHigh = 0.30 + twilioPerMin;
    const miniAvg = 0.22;
    const miniSell = 0.49;

    return {
      premiumLow,
      premiumHigh,
      premiumAvg,
      premiumSell,
      premiumMarginAvg: premiumSell - premiumAvg,
      miniLow,
      miniHigh,
      miniAvg,
      miniSell,
      miniMarginAvg: miniSell - miniAvg,
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="shrink-0">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
            isBiz
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
              : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}
        >
          <Cpu className="w-3 h-3" />
          AI Answering & Dispatch
        </div>

        <h3 className={`text-xl font-bold ${headingText}`}>
          A premium AI answering layer that can route, schedule, relay, and escalate when needed
        </h3>

        <p className={`text-sm mt-1 max-w-3xl ${mutedText}`}>
          The goal is not to remove the human service model. The goal is to give RTC a new service tier for overflow, after-hours coverage, narrow workflows, and price-sensitive accounts while keeping RTC&apos;s people focused on the calls where judgment, reassurance, and complexity matter most. It can do more than take a message, including warm-context lookup, knowledge graph search, scheduling, routing, relays, and connected tool use through the MCP server.
        </p>
      </div>

      {/* Tabs */}
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

      {/* Content */}
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
        {/* Step 0 */}
        {activeStep === 0 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                Why this matters now
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Clients are already asking about AI. The market is still split between cheap bots that do very little and expensive live labor for every minute of every call. RTC has room in the middle with a real-time AI voice layer that feels more premium than a basic bot and can handle useful work such as scheduling, routing, relays, and knowledge lookup.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Low-end bot market"
                value="$0.24-$0.90/min"
                sub="Usually turn-based, narrow in scope, and built around lower-quality voice flows."
              />
              <StatCard
                isBiz={isBiz}
                title="RTC AI premium tier"
                value="$1.29/min"
                sub="Avg cost about $0.70/min at low-medium token usage. Handles routing, scheduling, relays, and other bounded workflows without live agent overhead."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Live answering"
                value="$1.00-$3.00+/min"
                sub="Typical effective range once labor, 24/7 coverage, dispatching, and account support are included."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<PhoneCall className="w-4 h-4" />}
                label="Best-fit use cases"
                sub="Overflow coverage, after-hours intake, appointment capture, scripted dispatch, relay workflows, and knowledge-based questions."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Clock3 className="w-4 h-4" />}
                label="Where it creates leverage"
                sub="AI handles routine intake, scheduling, routing, knowledge lookup, and relay decisions quickly, while RTC staff stay focused on higher-touch calls."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Users className="w-4 h-4" />}
                label="Mission alignment"
                sub="This is not a replacement story. It is a coverage, margin, and packaging story built around preserving RTC&apos;s human advantage."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Sparkles className="w-4 h-4" />}
                label="Why real-time matters"
                sub="A true voice-to-voice system feels faster and more natural, and it can complete work during the call instead of just collecting a message."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Bottom line</p>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                RTC does not need to compete as the cheapest AI vendor. It can compete as a credible hybrid service: human-first where trust matters, AI-first where speed, consistency, and operational efficiency matter.
              </p>
            </div>
          </>
        )}

        {/* Step 1 */}
        {activeStep === 1 && (
          <>
            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                      Premium real-time AI
                    </p>
                    <h4 className={`text-lg font-bold mt-1 ${headingText}`}>gpt-realtime-1.5 tier</h4>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      isBiz
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-blue-50 border-blue-200 text-blue-600'
                    }`}
                  >
                    Premium
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <MetricPill
                    isBiz={isBiz}
                    title="Sell price"
                    value={`$${pricing.premiumSell.toFixed(2)}/min`}
                    sub="Suggested premium tier."
                    strong
                  />
                  <MetricPill
                    isBiz={isBiz}
                    title="Avg cost"
                    value={`$${pricing.premiumAvg.toFixed(2)}/min`}
                    sub="Low-medium token usage."
                  />
                </div>

                <div className={`rounded-xl border p-3 mb-3 ${isBiz ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className={`text-xs font-bold mb-1 ${headingText}`}>Cost floor range</p>
                  <p className={`text-sm font-semibold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                    ${pricing.premiumLow.toFixed(2)}-${pricing.premiumHigh.toFixed(2)}/min
                  </p>
                  <p className={`text-xs mt-1 leading-relaxed ${mutedText}`}>Model + Twilio.</p>
                </div>

                <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className={`text-xs font-bold mb-1 ${headingText}`}>Gross margin view</p>
                  <p className={`text-xs leading-relaxed ${mutedText}`}>
                    At an estimated average cost of about <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$0.70/min</span>,
                    a <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$1.29/min</span> sell price
                    yields about <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$0.59/min</span> gross margin before overhead.
                  </p>
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                      Lower-cost real-time AI
                    </p>
                    <h4 className={`text-lg font-bold mt-1 ${headingText}`}>gpt-realtime-mini tier</h4>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      isBiz
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-blue-50 border-blue-200 text-blue-600'
                    }`}
                  >
                    Volume
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <MetricPill
                    isBiz={isBiz}
                    title="Sell price"
                    value={`$${pricing.miniSell.toFixed(2)}/min`}
                    sub="Suggested volume tier."
                    strong
                  />
                  <MetricPill
                    isBiz={isBiz}
                    title="Avg cost"
                    value={`$${pricing.miniAvg.toFixed(2)}/min`}
                    sub="Low-medium token usage."
                  />
                </div>

                <div className={`rounded-xl border p-3 mb-3 ${isBiz ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className={`text-xs font-bold mb-1 ${headingText}`}>Cost floor range</p>
                  <p className={`text-sm font-semibold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                    ${pricing.miniLow.toFixed(2)}-${pricing.miniHigh.toFixed(2)}/min
                  </p>
                  <p className={`text-xs mt-1 leading-relaxed ${mutedText}`}>Model + Twilio.</p>
                </div>

                <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <p className={`text-xs font-bold mb-1 ${headingText}`}>Gross margin view</p>
                  <p className={`text-xs leading-relaxed ${mutedText}`}>
                    At an estimated average cost of about <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$0.22/min</span>,
                    a <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$0.49/min</span> sell price
                    yields about <span className={isBiz ? 'text-cyan-400 font-semibold' : 'text-blue-600 font-semibold'}>$0.27/min</span> gross margin before overhead.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-2 ${headingText}`}>Why usage efficiency matters</p>
                <p className={`text-sm leading-relaxed ${mutedText}`}>
                  Clients are not paying for agent time spent writing notes, deciding who to relay to, or manually working through routine routing and scheduling steps.
                </p>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-2 ${headingText}`}>What the AI is actually doing</p>
                <p className={`text-sm leading-relaxed ${mutedText}`}>
                  This is more than routing prep. The system can handle intake, scheduling, routing, relay decisions, and knowledge lookup during the call itself.
                </p>
              </div>
            </div>

            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-sm font-bold mb-3 ${headingText}`}>Pricing context</p>
              <div className="grid md:grid-cols-3 gap-3">
                <BulletRow
                  isBiz={isBiz}
                  icon={<Bot className="w-4 h-4" />}
                  label="Turn-based bots"
                  sub="Often marketed at $0.24-$0.90/min, but usually narrower and less natural in conversation."
                />
                <BulletRow
                  isBiz={isBiz}
                  icon={<Users className="w-4 h-4" />}
                  label="Offshore live labor"
                  sub="Can land around $0.25-$1.00/min, but quality control, training, and perception vary."
                />
                <BulletRow
                  isBiz={isBiz}
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Premium live U.S."
                  sub="Often sits around $1.50-$3.00+/min."
                />
              </div>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p className={`text-sm font-bold mb-1 ${headingText}`}>Why the economics are attractive</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                A large share of RTC&apos;s current billed time is agent reading, writing, intake, routing decisions, relay handling, and dispatch work. In the AI model, the customer is primarily paying for telecom minutes and model usage while routing, relays, scheduling, summaries, and knowledge lookup happen with much lower incremental labor cost.
              </p>
            </div>
          </>
        )}

        {/* Step 2 */}
        {activeStep === 2 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                RTC&apos;s strategic advantage
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                RTC already understands dispatch logic, escalation sensitivity, and client expectations. That operating knowledge is the moat. The AI layer works because it is built inside a real answering-service workflow with business-specific rules, warm context, and a customizable knowledge graph.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Hybrid service positioning"
                sub="AI handles routine calls well, and people stay focused on empathy, judgment, and exceptions."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Compliance-aware design"
                sub="Sensitive workflows, secure messaging, and governed behavior can be built in deliberately."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Users className="w-4 h-4" />}
                label="Humans stay at the center"
                sub="RTC&apos;s people remain the trust layer. AI reduces routine load without removing the human backstop."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<TrendingUp className="w-4 h-4" />}
                label="A more sellable story"
                sub="RTC gains live, hybrid, and AI-first packaging instead of relying on one labor-heavy model."
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="What generic bots miss"
                value="Context"
                sub="They lack account nuance, warm caller memory, business rules, and real workflow discipline."
              />
              <StatCard
                isBiz={isBiz}
                title="What RTC already has"
                value="Operational judgment"
                sub="The workflows, escalation habits, and client expectations that make the service work."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="What gets added"
                value="Leverage"
                sub="Coverage, pricing flexibility, and automation that absorbs routine call volume efficiently."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Positioning statement</p>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                RTC should not market this as &quot;AI replacing receptionists.&quot; It should market it as
                <span className={`font-semibold ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}> a human-first answering company with a premium AI layer for calls that do not require a human first.</span>
              </p>
            </div>
          </>
        )}

        {/* Step 3 */}
        {activeStep === 3 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                Recommended rollout
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The best first deployment is not AI for every call. It is a controlled rollout on bounded use cases where the workflow is structured, the economics are strong, and the handoff to humans is clear.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-3">
              {[
                {
                  title: 'Phase 1',
                  body: 'After-hours and overflow intake for simple, scriptable workflows.',
                },
                {
                  title: 'Phase 2',
                  body: 'Dispatch-oriented accounts with clear routing rules and relay paths.',
                },
                {
                  title: 'Phase 3',
                  body: 'Hybrid packages where AI handles first contact and people handle exceptions.',
                },
                {
                  title: 'Phase 4',
                  body: 'Selective client-facing packaging for new business and lower-cost entry tiers.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 ${
                    isBiz ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
                    {item.title}
                  </p>
                  <p className={`text-xs leading-relaxed ${mutedText}`}>{item.body}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Good first-fit accounts</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<PhoneCall className="w-4 h-4" />}
                    label="Overflow and after-hours coverage"
                    sub="Useful where calls are real but repetitive, and where some clients want lower-cost coverage."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Building2 className="w-4 h-4" />}
                    label="Narrow operational workflows"
                    sub="Appointments, intake, scripted dispatch, relays, and triage with clear policy boundaries."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<ArrowRight className="w-4 h-4" />}
                    label="Clean escalation boundaries"
                    sub="If confidence drops or complexity rises, the system hands off to a person."
                  />
                </div>
              </div>

              <div className={`rounded-2xl border p-4 ${softCard}`}>
                <p className={`text-sm font-bold mb-3 ${headingText}`}>Guardrails that preserve trust</p>
                <div className="space-y-3">
                  <BulletRow
                    isBiz={isBiz}
                    icon={<ShieldCheck className="w-4 h-4" />}
                    label="Escalate uncertainty quickly"
                    sub="Calls with ambiguity, distress, or unusual wording should move to a human early."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Users className="w-4 h-4" />}
                    label="Keep the human backstop visible"
                    sub="AI expands coverage, but RTC staff remain available when judgment is required."
                  />
                  <BulletRow
                    isBiz={isBiz}
                    icon={<Sparkles className="w-4 h-4" />}
                    label="Use AI where it improves service"
                    sub="The point is speed, consistency, availability, and efficient execution, not novelty."
                  />
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Recommended positioning for RTC</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Launch AI answering as a
                <span className={`font-semibold ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}> premium hybrid offering</span>:
                a practical new revenue line for overflow, after-hours, and bounded workflows that strengthens RTC&apos;s human service model.
              </p>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default AIAnsweringPanel;
