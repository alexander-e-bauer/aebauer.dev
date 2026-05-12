import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Database, MessageSquare, ArrowRight,
  AlertTriangle, Zap, Briefcase, Network,
  Cpu, LineChart, Lock, ChevronRight, Sparkles, Building2
} from 'lucide-react';
import type { Mode } from '@/types/theme';
import AboutNavbar from './AboutNavbar';
import Footer from './Footer';
import CallFlowScenarios from './CallFlowScenarios';
import ModernInfraPanel from './ModernInfraPanel';
import AgentEmpowermentPanel from './AgentEmpowermentPanel';
import AIAnsweringPanel from './AIAnsweringPanel';
import DashboardPanel from './DashboardPanel';
import DowntimeEnginePanel from './DowntimeEnginePanel';
import ThreePathsForward from './ThreePathsForward';
import ObjectionHandling from './ObjectionHandling';

interface AboutPageProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
};

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

const AboutPage: React.FC<AboutPageProps> = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const isBiz = mode === 'business';
  const [activePillar, setActivePillar] = useState(0);
  const [openProblem, setOpenProblem] = useState<number | null>(null);

  const problems = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Lost Volume & Visibility",
      desc: "RTC has the service reputation, but not the volume or product edge it once had.",
      color: isBiz ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-red-50 text-red-600 border-red-200",
      accentColor: isBiz ? '#f87171' : '#dc2626',
      accentBg: isBiz ? 'rgba(248,113,113,0.10)' : 'rgba(220,38,38,0.06)',
      reframe: "People still talk about when the boardroom was full and the phones never stopped. That matters. The business didn't stop being valuable—the market evolved, and RTC's tooling didn't.",
      points: [
        { label: "The old volume story", detail: "When multiple people reference the 'nonstop' era, that's signal. RTC once had stronger market pull." },
        { label: "Reputation isn't enough", detail: "Good service matters, but clients now expect visibility, automation, and modern integrations." },
        { label: "The offering feels thin", detail: "RTC delivers a strong human experience, but doesn't package it inside a modern product." },
        { label: "This is fixable", detail: "Don't replace the core service. Layer better tools, data, and client capabilities on top of it." },
      ],
      closing: "The opportunity isn't to reinvent RTC. It's to modernize what already works and make it easier for clients to say yes.",
    },
    {
      icon: <LineChart className="w-4 h-4" />,
      title: "Startel Data Loss",
      desc: "RTC handles valuable call data daily, but almost none of it becomes usable intelligence.",
      color: isBiz ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-cyan-50 text-cyan-700 border-cyan-200",
      accentColor: isBiz ? '#22d3ee' : '#0891b2',
      accentBg: isBiz ? 'rgba(34,211,238,0.10)' : 'rgba(8,145,178,0.06)',
      reframe: "Every call contains structured value: intent, urgency, outcomes, and staffing patterns. Right now, most of that disappears unless manually typed into Startel. That's a major missed opportunity.",
      points: [
        { label: "The raw material is there", detail: "RTC already sits on high-value data. The issue is extraction and structure." },
        { label: "Clients get messages, not insight", detail: "Clients aren't seeing the patterns and reporting modern providers surface." },
        { label: "Data as a product layer", detail: "With tagging and integrations, RTC could offer something far more valuable than raw call logs." },
        { label: "My background helps here", detail: "My data science experience directly translates to turning call exhaust into a competitive edge." },
      ],
      closing: "If RTC treats call data as an asset instead of exhaust, it creates an advantage others don't have.",
    },
    {
      icon: <Lock className="w-4 h-4" />,
      title: "SMS & HIPAA Exposure",
      desc: "RTC has a live compliance gap around secure messaging that competitors have already solved.",
      color: isBiz ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-700 border-amber-200",
      accentColor: isBiz ? '#fbbf24' : '#d97706',
      accentBg: isBiz ? 'rgba(251,191,36,0.10)' : 'rgba(217,119,6,0.06)',
      reframe: "Sending patient info over standard SMS is messy and a real compliance exposure. When other offices do this safely and RTC cannot, it becomes a liability.",
      points: [
        { label: "Standard SMS isn't enough", detail: "Unencrypted patient information over text creates unnecessary risk." },
        { label: "Agents are boxed in", detail: "Without the right tool, agents either omit details or rely on unsafe workarounds." },
        { label: "Secure convenience is expected", detail: "A HIPAA-compliant messaging layer is no longer a nice-to-have. It's the baseline." },
        { label: "This can be closed quickly", detail: "With the right encrypted workflow, this is one of the fastest gaps RTC could fix." },
      ],
      closing: "Better infrastructure protects RTC and immediately improves the client experience.",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Brittle Paging Logic",
      desc: "Routing and on-call logic rely too heavily on fragile freeform rules and workarounds.",
      color: isBiz ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-orange-50 text-orange-700 border-orange-200",
      accentColor: isBiz ? '#fb923c' : '#ea580c',
      accentBg: isBiz ? 'rgba(251,146,60,0.10)' : 'rgba(234,88,12,0.06)',
      reframe: "When routing logic lives in pseudo-code nobody wants to touch, every exception becomes operational risk. It slows changes, increases stress, and hurts scaling.",
      points: [
        { label: "Too much fragile knowledge", detail: "Critical routing shouldn't depend on a few people remembering edge cases." },
        { label: "Changes are too hard", detail: "What should be an admin-level update often becomes a technical problem." },
        { label: "It creates drag everywhere", detail: "Sales, onboarding, support, and overnight operations all feel the cost." },
        { label: "A rules engine fixes it", detail: "This isn't just cleanup; it's a structural improvement that makes RTC easier to run." },
      ],
      closing: "Less time fighting brittle logic means more time improving service and winning business.",
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      title: "Agents Need Better Tools",
      desc: "RTC's advantage is its people, but the current system doesn't give them the support they need.",
      color: isBiz ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200",
      accentColor: isBiz ? '#60a5fa' : '#2563eb',
      accentBg: isBiz ? 'rgba(96,165,250,0.10)' : 'rgba(37,99,235,0.06)',
      reframe: "I'm not trying to replace agents with AI. RTC's human service is its moat. The opportunity is to give agents better context and faster answers so they operate at a higher level.",
      points: [
        { label: "Good agents are underserved", detail: "Strong agents act like message takers without fast access to context." },
        { label: "AI should support, not replace", detail: "Use AI for summaries, lookup, and routing—not removing the human layer." },
        { label: "Better tools = better service", detail: "Confident answers and intelligent escalations make RTC more valuable." },
        { label: "Humans-first is the differentiator", detail: "Others will chase AI over people. RTC wins by using AI to make people better." },
      ],
      closing: "The goal isn't fewer humans. It's more leverage per human and a stronger product around the team.",
    },
    {
      icon: <AlertTriangle className="w-4 h-4" />,
      title: "No Modern AI Offering",
      desc: "Clients are asking for AI capabilities, and RTC doesn't yet have a strong answer.",
      color: isBiz ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-rose-50 text-rose-700 border-rose-200",
      accentColor: isBiz ? '#fb7185' : '#e11d48',
      accentBg: isBiz ? 'rgba(251,113,133,0.10)' : 'rgba(225,29,72,0.06)',
      reframe: "The market isn't asking if AI is coming. It's here. RTC can use it to expand offerings while keeping its human model, or let competitors define the category.",
      points: [
        { label: "The demand is here", detail: "This is no longer theoretical. Clients are actively asking for AI." },
        { label: "Keep the identity", detail: "AI doesn't replace the service model. It adds automation, smarter routing, and reporting." },
        { label: "A broader offering", detail: "RTC can serve more use cases without becoming a commodity call center." },
        { label: "Waiting has a cost", detail: "The longer RTC has no answer, the more clients look elsewhere." },
      ],
      closing: "AI shouldn't replace RTC's service. It should expand it, modernize it, and make it easier to sell.",
    },
  ];

  const pillars = [
    {
      title: "AI Answering & Dispatch",
      subtitle: "HIPAA-Compliant Autonomous Routing",
      icon: <Cpu className="w-4 h-4" />,
      accentHex: isBiz ? "#22d3ee" : "#2563eb",
      bg: isBiz ? "bg-cyan-500/10" : "bg-blue-50",
      border: isBiz ? "border-cyan-500/20" : "border-blue-200",
    },
    {
      title: "Analytics & Operations",
      subtitle: "Data Science & Business Intelligence",
      icon: <LineChart className="w-4 h-4" />,
      accentHex: isBiz ? "#22d3ee" : "#2563eb",
      bg: isBiz ? "bg-cyan-500/10" : "bg-blue-50",
      border: isBiz ? "border-cyan-500/20" : "border-blue-200",
    },
    {
      title: "Agent Empowerment",
      subtitle: "Slack Tools & Knowledge Graph",
      icon: <Network className="w-4 h-4" />,
      accentHex: isBiz ? "#c084fc" : "#4f46e5",
      bg: isBiz ? "bg-purple-500/10" : "bg-indigo-50",
      border: isBiz ? "border-purple-500/20" : "border-indigo-200",
    },
    {
      title: "Modern Infrastructure",
      subtitle: "Paging, SMS & Analytics Overhaul",
      icon: <Database className="w-4 h-4" />,
      accentHex: isBiz ? "#4ade80" : "#059669",
      bg: isBiz ? "bg-green-500/10" : "bg-emerald-50",
      border: isBiz ? "border-green-500/20" : "border-emerald-200",
    },
    {
      title: "The Downtime Engine",
      subtitle: "Turning Idle Time into Revenue",
      icon: <TrendingUp className="w-4 h-4" />,
      accentHex: isBiz ? "#fbbf24" : "#ea580c",
      bg: isBiz ? "bg-amber-500/10" : "bg-orange-50",
      border: isBiz ? "border-amber-500/20" : "border-orange-200",
    },
  ];

  const activePillarData = pillars[activePillar];
  const problemRows = [problems.slice(0, 3), problems.slice(3, 6)];

  return (
    <div className={`min-h-screen w-screen font-sans overflow-x-hidden transition-colors duration-500 ${isBiz ? 'bg-slate-950 selection:bg-cyan-500/30' : 'bg-slate-50 selection:bg-blue-500/30'}`}>
      <AboutNavbar mode={mode} setMode={setMode} onLogin={() => navigate('/login')} onRegister={() => navigate('/register')} />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className={`absolute inset-0 pointer-events-none ${isBiz ? 'bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_42%)]' : 'bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_42%)]'}`} />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[960px] h-[520px] rounded-full blur-[120px] pointer-events-none ${isBiz ? 'bg-cyan-500/10' : 'bg-blue-400/15'}`} />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 backdrop-blur-sm ${isBiz ? 'bg-slate-800/60 border-slate-700 text-cyan-400' : 'bg-white/90 border-blue-200 text-blue-700 shadow-sm'}`}>
              <Briefcase className="w-3.5 h-3.5" />
              <span>Strategic Proposal · RTC · April 2026</span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.02] ${isBiz ? 'text-white' : 'text-slate-900'}`}>
              RTC has the human advantage.<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isBiz ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-indigo-600'}`}>
                Let's build the modern product around it.
              </span>
            </h1>

            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>
              A production-ready platform designed to modernize RTC's infrastructure, turn call data into a competitive edge, and expand offerings—without replacing the people who make the service valuable.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {[
                'Humans-first AI',
                'Operational modernization',
                'Data as a product layer',
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-full border text-sm font-medium"
                  style={{
                    color: isBiz ? '#cbd5e1' : '#334155',
                    background: isBiz ? 'rgba(15,23,42,0.55)' : 'rgba(255,255,255,0.92)',
                    borderColor: isBiz ? '#1e293b' : '#dbeafe',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              className="max-w-3xl mx-auto rounded-2xl border px-5 py-4 mb-10"
              style={{
                background: isBiz ? 'rgba(15,23,42,0.52)' : 'rgba(255,255,255,0.82)',
                borderColor: isBiz ? '#1e293b' : '#e2e8f0',
                boxShadow: isBiz ? 'none' : '0 10px 30px -24px rgba(15,23,42,0.16)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: isBiz ? '#22d3ee' : '#2563eb' }}>
                    Protect
                  </p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: isBiz ? '#cbd5e1' : '#334155' }}>
                    Keep RTC's human service model at the center.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: isBiz ? '#22d3ee' : '#2563eb' }}>
                    Modernize
                  </p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: isBiz ? '#cbd5e1' : '#334155' }}>
                    Replace brittle workflows with durable systems.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: isBiz ? '#22d3ee' : '#2563eb' }}>
                    Grow
                  </p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: isBiz ? '#cbd5e1' : '#334155' }}>
                    Add new value clients will actually pay for.
                  </p>
                </div>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 text-sm font-medium ${isBiz ? 'text-slate-500' : 'text-slate-500'}`}>
              <span>Scroll to explore</span>
              <ChevronRight className="w-4 h-4 animate-bounce rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className={`py-24 border-y ${isBiz ? 'border-slate-800 bg-slate-900/28' : 'border-slate-200 bg-white/90'}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <div className="mb-14">
              <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>The Problem</p>
              <h2 className={`text-3xl md:text-5xl font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                What's holding RTC back
              </h2>
              <p className={`mt-4 text-lg max-w-3xl leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>
                RTC delivers a level of human service that matters. The problem isn't the people—it's that the tools and product layer around them haven't kept up with market expectations.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {problemRows.map((row, rowIdx) => {
              const openInRow = row.findIndex((_, colIdx) => openProblem === rowIdx * 3 + colIdx);
              const openP = openInRow >= 0 ? row[openInRow] : null;

              return (
                <div key={rowIdx} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {row.map((p, colIdx) => {
                      const globalIdx = rowIdx * 3 + colIdx;
                      const isOpen = openProblem === globalIdx;

                      return (
                        <button
                          key={globalIdx}
                          onClick={() => setOpenProblem(isOpen ? null : globalIdx)}
                          className="text-left rounded-2xl border transition-all duration-200 p-5 flex flex-col gap-2.5 group"
                          style={{
                            background: isBiz ? 'rgba(15,23,42,0.64)' : 'rgba(255,255,255,0.94)',
                            borderColor: isOpen ? p.accentColor + '99' : (isBiz ? '#1e293b' : '#dbe3ee'),
                            boxShadow: isOpen
                              ? `0 0 0 1px ${p.accentColor}22`
                              : (isBiz ? 'none' : '0 10px 24px -24px rgba(15,23,42,0.18)'),
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${p.color}`}>
                              {p.icon}
                            </div>
                            <div
                              className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                              style={{ background: isOpen ? p.accentColor + '18' : (isBiz ? '#1e293b' : '#f1f5f9') }}
                            >
                              <ChevronRight
                                className="w-3 h-3 transition-transform duration-300"
                                style={{
                                  color: isOpen ? p.accentColor : (isBiz ? '#475569' : '#94a3b8'),
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                }}
                              />
                            </div>
                          </div>
                          <p className="text-sm font-bold leading-tight" style={{ color: isBiz ? '#f1f5f9' : '#0f172a' }}>
                            {p.title}
                          </p>
                          <p
                            className="text-sm leading-relaxed transition-opacity duration-300"
                            style={{ color: isBiz ? '#94a3b8' : '#5b6b7f', opacity: isOpen ? 0.45 : 1 }}
                          >
                            {p.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <AnimateHeight open={openInRow >= 0}>
                    {openP && (
                      <div
                        className="rounded-2xl border p-5"
                        style={{
                          background: isBiz ? 'rgba(15,23,42,0.84)' : 'rgba(250,250,250,0.95)',
                          borderColor: openP.accentColor + '55',
                          boxShadow: isBiz
                            ? `0 0 0 1px ${openP.accentColor}18`
                            : `0 12px 30px -24px ${openP.accentColor}25, 0 0 0 1px ${openP.accentColor}18`,
                        }}
                      >
                        <div
                          className="rounded-xl p-4 mb-4"
                          style={{ background: openP.accentBg, borderLeft: `3px solid ${openP.accentColor}` }}
                        >
                          <p className="text-sm font-semibold leading-relaxed" style={{ color: openP.accentColor }}>
                            {openP.reframe}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {openP.points.map((pt, j) => (
                            <div key={j} className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: openP.accentColor }} />
                                <p className="text-sm font-semibold leading-snug" style={{ color: isBiz ? '#f1f5f9' : '#0f172a' }}>
                                  {pt.label}
                                </p>
                              </div>
                              <p className="text-sm leading-relaxed" style={{ color: isBiz ? '#94a3b8' : '#475569' }}>
                                {pt.detail}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="h-px mb-3" style={{ background: isBiz ? '#1e293b' : '#dbe3ee' }} />
                        <p className="text-sm leading-relaxed italic" style={{ color: isBiz ? '#94a3b8' : '#64748b' }}>
                          {openP.closing}
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

      {/* ── WHAT I BRING ── */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <div className="mb-10">
              <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>The Solution</p>
              <h2 className={`text-3xl md:text-5xl font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                What I bring to the table
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-4 lg:gap-5 items-start">
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-2">
              {pillars.map((p, i) => {
                const isActive = activePillar === i;

                return (
                  <button
                    key={i}
                    onClick={() => setActivePillar(i)}
                    className="text-left rounded-2xl border transition-all duration-200 flex items-center gap-3 px-4 py-4 w-full"
                    style={{
                      background: isActive
                        ? isBiz ? 'rgba(15,23,42,0.94)' : 'linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,0.98))'
                        : isBiz ? 'rgba(15,23,42,0.40)' : 'rgba(255,255,255,0.82)',
                      borderColor: isActive ? p.accentHex + '66' : (isBiz ? '#1e293b' : '#dde5f0'),
                      boxShadow: isActive
                        ? `inset 3px 0 0 ${p.accentHex}, 0 14px 32px -26px ${p.accentHex}55`
                        : (isBiz ? 'none' : '0 10px 20px -24px rgba(15,23,42,0.22)'),
                      transform: isActive ? 'translateX(0)' : 'translateX(0)',
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${p.bg} ${p.border}`}
                      style={{ color: isActive ? p.accentHex : (isBiz ? '#64748b' : '#94a3b8') }}
                    >
                      {p.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-bold leading-tight"
                        style={{ color: isActive ? (isBiz ? '#f8fafc' : '#0f172a') : (isBiz ? '#cbd5e1' : '#334155') }}
                      >
                        {p.title}
                      </p>
                      <p
                        className="text-xs leading-relaxed mt-1"
                        style={{ color: isActive ? p.accentHex : (isBiz ? '#64748b' : '#64748b') }}
                      >
                        {p.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      className="w-4 h-4 shrink-0 transition-all duration-200"
                      style={{
                        color: isActive ? p.accentHex : (isBiz ? '#475569' : '#94a3b8'),
                        transform: isActive ? 'translateX(0)' : 'translateX(-1px)',
                        opacity: isActive ? 1 : 0.8,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div
                className={`rounded-3xl border relative overflow-hidden ${isBiz ? 'bg-slate-900/58 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/70'}`}
                style={{
                  boxShadow: isBiz ? 'none' : '0 20px 50px -35px rgba(15,23,42,0.18)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${activePillarData.accentHex}cc, ${activePillarData.accentHex}22, transparent)` }}
                />
                {!isBiz && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(248,250,252,0.55), rgba(255,255,255,0))',
                    }}
                  />
                )}
                <div className="relative p-8 md:p-10 lg:p-12 xl:p-14">
                  {activePillar === 0 ? <AIAnsweringPanel isBiz={isBiz} />
                    : activePillar === 1 ? <DashboardPanel isBiz={isBiz} />
                    : activePillar === 2 ? <AgentEmpowermentPanel isBiz={isBiz} />
                    : activePillar === 3 ? <ModernInfraPanel isBiz={isBiz} />
                    : <DowntimeEnginePanel isBiz={isBiz} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallFlowScenarios isBiz={isBiz} />
      <ThreePathsForward isBiz={isBiz} />
      <ObjectionHandling isBiz={isBiz} />

      {/* ── CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div className={`absolute inset-0 pointer-events-none ${isBiz ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none ${isBiz ? 'bg-cyan-500/10' : 'bg-blue-400/15'}`} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 ${isBiz ? 'bg-slate-800/60 border-slate-700 text-cyan-400' : 'bg-white border-blue-200 text-blue-700 shadow-sm'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Practical Next Step</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
            Let AI handle the routine.<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isBiz ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-indigo-600'}`}>
              Let RTC's people handle what matters most.
            </span>
          </h2>
          <p className={`text-lg mb-12 leading-relaxed ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>
            RTC already has the human layer that is hardest to replicate. The opportunity is to add the systems around it: automation, secure workflows, better data, and tools that make the service easier to sell.
          </p>
          <button
              onClick={() => navigate('/discussion')}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 ${
                isBiz ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_40px_-8px_rgba(6,182,212,0.5)]' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/30'
              }`}
            >
              <Building2 className="w-5 h-5" />
              View decision summary
              <ArrowRight className="w-5 h-5" />
            </button>
        </FadeIn>
      </section>

      <Footer mode={mode} />
    </div>
  );
};

export default AboutPage;