import React, { useRef, useState } from 'react';
import {
  Clock3,
  Target,
  Users,
  ShieldCheck,
  MonitorSmartphone,
  Search,
  Mail,
  Database,
  GraduationCap,
  Workflow,
  Phone,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  ToggleLeft,
  Layers3,
  BellRing,
  UserCog,
  Briefcase,
  FileText,
  Activity,
} from 'lucide-react';

interface Props {
  isBiz: boolean;
}

const steps = [
  { id: 0, icon: <Clock3 className="w-3.5 h-3.5" />, label: 'Why It Matters' },
  { id: 1, icon: <Briefcase className="w-3.5 h-3.5" />, label: 'Task Types' },
  { id: 2, icon: <UserCog className="w-3.5 h-3.5" />, label: 'Supervisor Controls' },
  { id: 3, icon: <MonitorSmartphone className="w-3.5 h-3.5" />, label: 'Agent Workflow' },
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
  const accent = isBiz ? '#f59e0b' : '#ea580c';

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
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            : 'bg-orange-50 border-orange-200 text-orange-600'
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
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-orange-50 border-orange-200 text-orange-600'
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
          ? 'bg-amber-500/10 border-amber-500/25'
          : 'bg-orange-50 border-orange-200'
        : isBiz
          ? 'bg-slate-900/70 border-slate-700'
          : 'bg-white border-slate-200'
    }`}
  >
    <p className={`text-xs font-semibold uppercase tracking-widest ${isBiz ? 'text-amber-400' : 'text-orange-600'}`}>
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
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            : 'bg-orange-50 border-orange-200 text-orange-600'
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

const DowntimeEnginePanel: React.FC<Props> = ({ isBiz }) => {
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
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-orange-50 border-orange-200 text-orange-600'
          }`}
        >
          <Clock3 className="w-3 h-3" />
          Between-Call Workflows
        </div>

        <h3 className={`text-xl font-bold ${headingText}`}>
          Turn low-volume time into useful business capacity
        </h3>

        <p className={`text-sm mt-1 max-w-3xl ${mutedText}`}>
          When call volume drops, RTC still has paid agent attention between calls. Instead of letting that time drift into filler activity, it can be routed into short, interruptible tasks that support growth, retention, and training.
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
                    ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                    : 'bg-orange-50 border-orange-200 text-orange-600'
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
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`}>
                Why this matters
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                RTC has periods where call volume is slow and dispatch volume from accounts like Abbott is lighter than before. That means agents can spend meaningful time waiting between calls. The idle time already exists. The real question is whether RTC lets that attention drift, or channels it into useful work that disappears the moment Startel needs full focus again.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Current state"
                value="Idle attention"
                sub="Low-volume periods create spare agent capacity whether RTC plans for it or not."
              />
              <StatCard
                isBiz={isBiz}
                title="Best use"
                value="Interruptible tasks"
                sub="Short work items can turn low-volume time into practical value without disrupting calls."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Core rule"
                value="Startel first"
                sub="The call always wins. Between-call work exists only when volume allows it."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Activity className="w-4 h-4" />}
                label="Idle time is already being spent"
                sub="The real decision is whether that time stays unstructured or gets redirected into approved, useful work."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Workflow className="w-4 h-4" />}
                label="Tasks must be instantly interruptible"
                sub="Agents should be able to drop a task the second a call arrives, then resume later without losing their place."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ShieldCheck className="w-4 h-4" />}
                label="This should be supervisor-controlled"
                sub="Low-volume work should be enabled only when conditions allow, then disabled immediately when traffic picks up."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<BarChart3 className="w-4 h-4" />}
                label="Small increments can compound"
                sub="A few minutes per shift across many agents can add up to real prospecting, follow-up, and training output."
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <InsightCard
                isBiz={isBiz}
                icon={<BellRing className="w-4 h-4" />}
                title="Better than informal reminders"
                body="RTC already changes expectations during high-volume periods, but messages and action bans are easy to miss when agents are actively on calls."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<ToggleLeft className="w-4 h-4" />}
                title="The system should show the current mode"
                body="If between-call work is enabled or disabled at the system level, agents do not have to depend on noticing a message at the right moment."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-amber-500/10 border-amber-500/20' : 'bg-orange-50 border-orange-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Bottom line</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                This is not about keeping people busy for its own sake. It is about using low-volume time more intentionally while preserving the one rule that matters most: if Startel needs the agent, everything else disappears immediately.
              </p>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`}>
                Good between-call tasks
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The best tasks are short, useful, easy to pause, and easy to review later. This should not be random busywork. It should be a curated queue of approved work that supports growth, retention, and internal operations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <InsightCard
                isBiz={isBiz}
                icon={<Target className="w-4 h-4" />}
                title="Prospecting support"
                body="Research likely prospects, build lead lists, and prepare lightweight outreach notes that management can follow up on later."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Users className="w-4 h-4" />}
                title="Client retention support"
                body="Draft account check-ins, update contact details, and surface accounts that may need proactive follow-up."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Database className="w-4 h-4" />}
                title="Internal cleanup work"
                body="Update spreadsheets, organize notes, clean account information, and support small admin tasks that otherwise never get prioritized."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<GraduationCap className="w-4 h-4" />}
                title="Training modules"
                body="Short targeted refreshers fit naturally into slow periods, especially when modules can pause and resume automatically."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Search className="w-4 h-4" />}
                label="Prospect research"
                sub="Medical offices, service businesses, legal practices, property managers, and other likely after-hours users can be added to a growing pipeline."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Mail className="w-4 h-4" />}
                label="Drafted outreach or check-ins"
                sub="Agents can prepare light-touch emails that management or account owners review before anything is sent."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<FileText className="w-4 h-4" />}
                label="Account hygiene"
                sub="Contact updates, instruction review flags, and small maintenance tasks can be collected during slow windows."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<GraduationCap className="w-4 h-4" />}
                label="Short training work"
                sub="Compliance refreshers, de-escalation modules, and tool fluency training fit well when tasks can be resumed later."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Selection rule</p>
              <p className={`text-sm leading-relaxed ${mutedText}`}>
                A task belongs here only if it can be started quickly, paused instantly, resumed cleanly, and reviewed later by someone responsible for outcomes.
              </p>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`}>
                Supervisor control is the key
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                The system should not assume between-call work is always available. Supervisors need a simple way to turn it on or off by shift, team, or operating conditions. That removes the need to rely on everyone seeing an action-ban message while they are already busy.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <StatCard
                isBiz={isBiz}
                title="Manual mode"
                value="Shift toggle"
                sub="Supervisors can enable or disable between-call workflows when the floor is quiet or when volume starts rising."
              />
              <StatCard
                isBiz={isBiz}
                title="Granular control"
                value="Team-level"
                sub="Different groups or queues may need different settings depending on account mix and call load."
                strong
              />
              <StatCard
                isBiz={isBiz}
                title="Operational result"
                value="Clear state"
                sub="Agents see the current mode in the system itself instead of relying on scattered announcements."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<ToggleLeft className="w-4 h-4" />}
                label="On or off at will"
                sub="Supervisors should be able to disable low-volume tasks immediately if conditions change."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Layers3 className="w-4 h-4" />}
                label="Different by team or queue"
                sub="Some groups may have enough slack for between-call tasks while others need full standby attention."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<BellRing className="w-4 h-4" />}
                label="No dependence on broadcast messages"
                sub="Agents should not have to catch an announcement at the right moment to know whether extra work is allowed."
                tooltip={{
                  label: 'Operational mode control',
                  sublabel: 'System state over announcements',
                  what: 'Supervisors set whether between-call workflows are active, and the interface reflects that immediately.',
                  why: 'That reduces confusion and avoids the problem where half the floor misses a message because they were already on calls.',
                }}
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Startel stays priority one"
                sub="The task layer exists only when supervisors decide conditions are quiet enough to allow it."
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <InsightCard
                isBiz={isBiz}
                icon={<UserCog className="w-4 h-4" />}
                title="Better than ad hoc policing"
                body="A supervisor-controlled system is cleaner than informal reminders, scattered expectations, or manually telling people to stop side tasks."
              />
              <InsightCard
                isBiz={isBiz}
                icon={<Activity className="w-4 h-4" />}
                title="Future version could be volume-aware"
                body="The long-term version could react to traffic automatically, but even a simple manual toggle would already be a major improvement."
              />
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <div className={`rounded-2xl border p-4 ${softCard}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`}>
                The workflow should feel obvious
              </p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                Agents do not need a complicated second system. They need a simple queue of approved between-call tasks, a clear indicator of whether those tasks are enabled, and an immediate way to pause when a call arrives.
              </p>
            </div>

            <div className={`rounded-2xl border shadow-sm overflow-hidden ${isBiz ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'}`}>
              <div className={`flex items-center justify-between px-4 py-3 border-b ${isBiz ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2">
                  <Clock3 className={`w-4 h-4 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`} />
                  <span className={`text-sm font-bold tracking-tight ${headingText}`}>Between-Call Workflows</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium ${isBiz ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
                  <Zap className="w-3 h-3" />
                  Enabled by supervisor
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${mutedText}`}>Active task</p>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm font-bold ${headingText}`}>Research local specialty practices</p>
                      <p className={`text-xs mt-1 ${mutedText}`}>
                        Add likely prospects to the shared list, note after-hours clues, and save anything useful for management follow-up.
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold shrink-0 ${isBiz ? 'bg-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-600'}`}>
                      6 min in progress
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <PlayCircle className={`w-4 h-4 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`} />
                      <p className={`text-xs font-bold ${headingText}`}>Start</p>
                    </div>
                    <p className={`text-xs ${mutedText}`}>Pick a task from the approved queue when volume is quiet.</p>
                  </div>

                  <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <PauseCircle className={`w-4 h-4 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`} />
                      <p className={`text-xs font-bold ${headingText}`}>Pause</p>
                    </div>
                    <p className={`text-xs ${mutedText}`}>An incoming call immediately interrupts the task and preserves progress.</p>
                  </div>

                  <div className={`rounded-xl border p-3 ${isBiz ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className={`w-4 h-4 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`} />
                      <p className={`text-xs font-bold ${headingText}`}>Resume</p>
                    </div>
                    <p className={`text-xs ${mutedText}`}>When things go quiet again, the task reopens at the same point.</p>
                  </div>
                </div>

                <div className={`rounded-xl border p-3 ${isBiz ? 'bg-amber-500/10 border-amber-500/20' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex items-start gap-2.5">
                    <Phone className={`w-4 h-4 shrink-0 mt-0.5 ${isBiz ? 'text-amber-400' : 'text-orange-600'}`} />
                    <p className={`text-xs ${bodyText}`}>
                      <span className="font-bold">Incoming call behavior:</span> if Startel traffic appears, the task layer gets out of the way immediately. No extra clicks should stand between the agent and the live call.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <BulletRow
                isBiz={isBiz}
                icon={<Workflow className="w-4 h-4" />}
                label="Simple queue, not a giant portal"
                sub="The experience should feel lightweight so agents can move in and out of it naturally."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<Phone className="w-4 h-4" />}
                label="Calls override everything"
                sub="No between-call task should ever create hesitation or friction when real traffic arrives."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Progress should persist"
                sub="If an agent gets interrupted, the task should reopen exactly where they left off."
              />
              <BulletRow
                isBiz={isBiz}
                icon={<ArrowRight className="w-4 h-4" />}
                label="Useful now, expandable later"
                sub="A simple queue and supervisor toggle is enough to start. More automation can come later if it proves useful."
              />
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isBiz ? 'bg-amber-500/10 border-amber-500/20' : 'bg-orange-50 border-orange-200'
              }`}
            >
              <p className={`text-sm font-bold mb-2 ${headingText}`}>Practical first version</p>
              <p className={`text-sm leading-relaxed ${bodyText}`}>
                This does not need to start as a sophisticated platform. Even a supervisor-controlled task queue with pause and resume behavior would be enough to make low-volume time more useful and much easier to manage.
              </p>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default DowntimeEnginePanel;