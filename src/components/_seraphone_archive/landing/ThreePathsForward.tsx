import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Crown,
  Rocket,
  Briefcase,
  Gauge,
  HandCoins,
  Wrench,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  BadgeCheck,
} from 'lucide-react';

interface ThreePathsForwardProps {
  isBiz: boolean;
}

interface PathOption {
  num: string;
  title: string;
  tag: string;
  thesis: string;
  recommended: boolean;
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  miniBadges: string[];
  detail: {
    positioning: string;
    rtcGets: string;
    myRole: string;
    commitment: string;
    speed: string;
    bestFor: string;
    benefits: string[];
    execution: string[];
    closing: string;
  };
}

const ThreePathsForward: React.FC<ThreePathsForwardProps> = ({ isBiz }) => {
  const options: PathOption[] = [
    {
      num: '01',
      title: 'Buy the Company / Software',
      tag: 'Full Buy-In',
      thesis:
        "RTC acquires the software outright, takes full ownership of the infrastructure, and turns an already-built platform into a long-term competitive asset. Allows for the highest profit margin possible.",
      recommended: false,
      icon: <Crown className="w-4 h-4" />,
      accent: isBiz ? '#a78bfa' : '#7c3aed',
      accentBg: isBiz ? 'rgba(167,139,250,0.12)' : 'rgba(124,58,237,0.08)',
      miniBadges: ['Most Control', 'Full Ownership', 'Strongest Moat'],
      detail: {
        positioning:
          "This is the clearest ownership path. RTC buys the company/software outright, transfers the infrastructure internally, and owns the platform as part of the business going forward.",
        rtcGets:
          "RTC gets full ownership of the software, infrastructure, and roadmap. That means no ambiguity around control, no dependency on an outside license, and a real opportunity to create a durable moat in a market where clients are already asking for AI.",
        myRole:
          "My role becomes AI Engineer / platform lead: managing the system, integrating it with Startel, launching the HIPAA-compliant version, working with training to improve bot behavior, and continuing to add features based on RTC's needs.",
        commitment:
          "This is the biggest commitment up front, but it is also the most straightforward way to make the development work I've already done translate into something concrete for both me and RTC.",
        speed:
          "Still relatively fast because the platform already exists, but it requires the most internal alignment and deal structure at the start.",
        bestFor:
          "Best if RTC wants full control, wants to move decisively, and wants my long-term role to be building, maintaining, and expanding this internally as AI Engineer.",
        benefits: [
          'RTC owns the platform outright',
          'Clear recognition of the software’s value',
          'Strongest long-term strategic control',
          'Best path if RTC wants a true competitive moat',
        ],
        execution: [
          'Transfer the infrastructure over to RTC',
          'Integrate more deeply with Startel and launch the HIPAA-compliant version',
          'Work with training to refine bot behavior over time',
          'Show the programming team how to manage and extend the platform',
          'Create sales materials and help drive adoption',
        ],
        closing:
          "If RTC wants to fully own both the platform and the upside, this is the cleanest and strongest path.",
      },
    },
    {
      num: '02',
      title: 'White-Label the Infrastructure',
      tag: 'Recommended',
      thesis:
        "RTC launches quickly on a white-label version of the infrastructure while I continue developing the personal app under a structure that protects RTC and still respects the value of what I built.",
      recommended: true,
      icon: <Rocket className="w-4 h-4" />,
      accent: isBiz ? '#22d3ee' : '#2563eb',
      accentBg: isBiz ? 'rgba(34,211,238,0.12)' : 'rgba(37,99,235,0.08)',
      miniBadges: ['Fastest', 'Lower Risk', 'Best Blend'],
      detail: {
        positioning:
          "This is the most practical middle path. RTC gets to use a white-label version of the infrastructure under a contractual agreement, while I continue building the personal version separately in a way that does not compete with RTC's B2B business.",
        rtcGets:
          "RTC gets a working AI offering, faster deployment, and meaningful operational improvements without needing to buy everything outright on day one. It captures the business upside now while keeping the capital commitment lower.",
        myRole:
          "My role becomes AI Engineer / platform operator: managing the system, integrating with Startel, working with training to improve bot behavior, launching HIPAA-compliant workflows, and continuing to build the internal tools or other projects RTC wants prioritized.",
        commitment:
          "To me, this is probably the most balanced structure. It gives RTC the fastest and lowest-risk path forward, while also creating an agreement that makes the development time I've already invested feel respected and worthwhile.",
        speed:
          "Fastest option by far. Because the infrastructure already exists, RTC could move in weeks rather than quarters.",
        bestFor:
          "Best if RTC wants to move quickly, wants me in a more formal AI Engineer role, and wants a structure that is practical, fair, and easy to operationalize.",
        benefits: [
          'Fastest path to market',
          'Lower capital risk for RTC',
          'Creates a fair structure around the software already built',
          'Lets me keep building additional tools for RTC',
        ],
        execution: [
          'Set up a contractual agreement for RTC to operate the white-label app',
          'Replace the non-compete with a non-solicitation structure',
          'Handle Startel integration and rollout',
          'Work with training to improve bot behavior',
          'Set up admin access for programmers and show them how to manage the system',
          'Build the other tools and projects RTC wants next',
        ],
        closing:
          "If RTC wants the most practical version of yes, this is the strongest option.",
      },
    },
    {
      num: '03',
      title: 'Internal Role + Personal App',
      tag: 'Minimum Ask',
      thesis:
        "I keep the app, remove all B2B functionality, avoid competing with RTC, and focus my work internally on AI engineering, Slack tools, SMS upgrades, and other systems RTC wants improved.",
      recommended: false,
      icon: <Briefcase className="w-4 h-4" />,
      accent: isBiz ? '#4ade80' : '#059669',
      accentBg: isBiz ? 'rgba(74,222,128,0.12)' : 'rgba(5,150,105,0.08)',
      miniBadges: ['Lowest Complexity', 'Internal Upgrade Path'],
      detail: {
        positioning:
          "This is the minimum-ask path. I keep the app personally, but remove the B2B functionality so there is no competition with RTC's business. In return, I step into a more serious internal role focused on AI and operational tooling.",
        rtcGets:
          "RTC gets a dedicated internal builder who can improve Slack agent tools, HIPAA-compliant SMS, analytics workflows, automations, and other operational systems without needing to solve the larger ownership question first.",
        myRole:
          "My role becomes AI Engineer focused on internal tooling, Slack agent assistance, SMS upgrades, workflow automation, and whatever technical projects RTC sees as highest leverage.",
        commitment:
          "This is the simplest structure and the easiest one to say yes to organizationally, but it gives RTC less direct access to the broader commercial upside of the platform.",
        speed:
          "Fast for internal improvements. Slower if the goal is launching a broader client-facing AI product.",
        bestFor:
          "Best if RTC mainly wants to formalize and expand my internal technical role first, while keeping the business structure as simple and conflict-free as possible.",
        benefits: [
          'No B2B competition with RTC',
          'Simple internal structure',
          'Immediate help on Slack tools and SMS upgrades',
          'Clear promotion path into AI Engineer work',
        ],
        execution: [
          'Remove all B2B functionality from the personal app',
          'Keep the app outside RTC’s lane entirely',
          'Build Slack agent tools and SMS upgrades',
          'Support additional internal AI and ops projects as needed',
        ],
        closing:
          "If the priority is putting me in the right role internally first, this is the cleanest minimum-ask option.",
      },
    },
  ];

  const [activeIdx, setActiveIdx] = useState(1);
  const active = options[activeIdx];

  const panelBg = isBiz ? 'rgba(15,23,42,0.78)' : '#ffffff';
  const softBg = isBiz ? '#020617' : '#f8fafc';
  const borderColor = isBiz ? '#1e293b' : '#e2e8f0';
  const muted = isBiz ? '#94a3b8' : '#64748b';
  const titleColor = isBiz ? '#f8fafc' : '#0f172a';

  return (
    <section className={`py-24 border-t ${isBiz ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>
            The Ask
          </p>
          <h2 className={`text-3xl md:text-5xl font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
            Three paths forward
          </h2>
          <p className={`mt-4 text-lg max-w-3xl ${isBiz ? 'text-slate-400' : 'text-slate-500'}`}>
            I've already invested a significant amount of time building this. I'm not asking RTC to fund a vague idea —
            I'm asking for a fair structure around something real: a promotion path into an <span className="font-semibold">AI Engineer</span> role,
            an agreement that makes the software I've built worth something, and the chance to keep building the tools RTC needs.
          </p>
        </div>

        {/* Compact selector */}
        <div className="grid md:grid-cols-3 gap-3 mb-6">
          {options.map((o, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={o.num}
                onClick={() => setActiveIdx(i)}
                className="text-left rounded-2xl border p-4 transition-all duration-300"
                style={{
                  background: isActive ? panelBg : (isBiz ? 'rgba(15,23,42,0.35)' : 'rgba(255,255,255,0.78)'),
                  borderColor: isActive ? o.accent + '88' : borderColor,
                  boxShadow: isActive ? `inset 3px 0 0 ${o.accent}, 0 10px 30px -18px ${o.accent}55` : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: o.accentBg, color: o.accent }}
                  >
                    {o.icon}
                  </div>
                  <span className="text-xs font-black tracking-wide" style={{ color: isActive ? o.accent : muted }}>
                    {o.num}
                  </span>
                  <div className="ml-auto">
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full border"
                      style={{
                        color: isActive ? o.accent : muted,
                        background: isActive ? o.accentBg : 'transparent',
                        borderColor: isActive ? o.accent + '44' : borderColor,
                      }}
                    >
                      {o.tag}
                    </span>
                  </div>
                </div>

                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: isActive ? titleColor : (isBiz ? '#cbd5e1' : '#0f172a') }}
                >
                  {o.title}
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: muted }}>
                  {o.thesis}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {o.miniBadges.map((badge, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-semibold px-2 py-1 rounded-full border"
                      style={{
                        color: isActive ? o.accent : muted,
                        background: isActive ? o.accentBg : 'transparent',
                        borderColor: isActive ? o.accent + '33' : borderColor,
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main detail panel */}
        <div
          className="rounded-3xl border overflow-hidden transition-all duration-300"
          style={{
            background: panelBg,
            borderColor: active.accent + '55',
            boxShadow: `0 0 0 1px ${active.accent}18, 0 24px 60px -36px ${active.accent}45`,
          }}
        >
          <div
            className="h-1 w-full transition-all duration-300"
            style={{ background: `linear-gradient(90deg, ${active.accent}, ${active.accent}66, transparent)` }}
          />

          <div className="p-6 md:p-8">
            {/* Top row */}
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5 mb-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      color: active.accent,
                      background: active.accentBg,
                      borderColor: active.accent + '44',
                    }}
                  >
                    {active.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: titleColor }}>
                  {active.num} · {active.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed mb-3" style={{ color: muted }}>
                  {active.detail.positioning}
                </p>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: active.accent }}>
                  {active.thesis}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-3 xl:w-80">
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    background: active.accentBg,
                    borderColor: active.accent + '33',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <HandCoins className="w-4 h-4" style={{ color: active.accent }} />
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                      Best Fit
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: titleColor }}>
                    {active.detail.bestFor}
                  </p>
                </div>

                <div
                  className="rounded-2xl border p-4"
                  style={{
                    background: softBg,
                    borderColor,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4" style={{ color: active.accent }} />
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                      Why This Works
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: muted }}>
                    None of these paths require RTC to bet on an unproven idea. The main question is how to structure something that's already real in a way that is fair, useful, and sustainable for both sides.
                  </p>
                </div>
              </div>
            </div>

            {/* 2-col detail grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div
                className="rounded-2xl border p-5"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    What RTC Gets
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  {active.detail.rtcGets}
                </p>
              </div>

              <div
                className="rounded-2xl border p-5"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    My Role
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  {active.detail.myRole}
                </p>
              </div>

              <div
                className="rounded-2xl border p-5"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Speed to Market
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  {active.detail.speed}
                </p>
              </div>

              <div
                className="rounded-2xl border p-5"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Strategic Structure
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  {active.detail.commitment}
                </p>
              </div>
            </div>

            {/* Benefits + execution */}
            <div className="grid xl:grid-cols-5 gap-4 mb-6">
              <div className="xl:col-span-2 rounded-2xl border p-5" style={{ background: softBg, borderColor }}>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Key Benefits
                  </p>
                </div>
                <div className="space-y-3">
                  {active.detail.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: active.accent }} />
                      <p className="text-sm leading-relaxed" style={{ color: muted }}>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-3 rounded-2xl border p-5" style={{ background: softBg, borderColor }}>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    What I Would Execute
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {active.detail.execution.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border p-3"
                      style={{ background: isBiz ? 'rgba(15,23,42,0.45)' : '#ffffff', borderColor }}
                    >
                      <p className="text-sm leading-relaxed" style={{ color: muted }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom value strip */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div
                className="rounded-2xl border p-4"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Career Path
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  Formalize the work I'm already doing into a real AI Engineer role so I can keep building with clear ownership and accountability.
                </p>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <HandCoins className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Value Recognition
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  Create a structure that fairly recognizes the time and product development work I've already put into building the software.
                </p>
              </div>

              <div
                className="rounded-2xl border p-4"
                style={{ background: softBg, borderColor }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone className="w-4 h-4" style={{ color: active.accent }} />
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: active.accent }}>
                    Ongoing Build-Out
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: muted }}>
                  Beyond the platform itself, I would keep building the other tools we've discussed — or whatever projects RTC sees as most useful.
                </p>
              </div>
            </div>

            {/* Closing */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background: active.accentBg,
                borderColor: active.accent + '33',
              }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: titleColor }}>
                {active.detail.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;