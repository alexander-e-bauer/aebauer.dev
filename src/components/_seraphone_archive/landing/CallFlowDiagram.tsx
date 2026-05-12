import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, Brain, Network, GitFork, UserCheck,
  Shield, Zap, CheckCircle2, RotateCcw, Play
} from 'lucide-react';

// 🚀 IMPROVEMENT 1: Executive-Level Business Copy
const STEPS = [
  {
    id: 0,
    icon: Phone,
    label: 'Instant Connection',
    sublabel: 'Zero wait times',
    color: 'from-slate-500 to-slate-600',
    glow: 'shadow-slate-500/40',
    border: 'border-slate-500/40',
    bg: 'bg-slate-500/10',
    textAccent: 'text-slate-300',
    detail: 'The AI answers the phone in under 1 second. No frustrating phone trees, no hold music—just a natural, conversational voice ready to help.',
  },
  {
    id: 1,
    icon: Shield, // Changed icon to represent security
    label: 'Trust & Compliance',
    sublabel: 'PII Vaulting & Security',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/40',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-500/10',
    textAccent: 'text-cyan-300',
    detail: 'The system instantly screens out robocalls and hostile callers. Sensitive data (like credit cards) is scrubbed and vaulted before it ever hits our servers.',
  },
  {
    id: 2,
    icon: Network,
    label: 'Zero Hallucinations',
    sublabel: 'Semantic Knowledge Graph',
    color: 'from-purple-500 to-indigo-600',
    glow: 'shadow-purple-500/40',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
    textAccent: 'text-purple-300',
    detail: 'The AI doesn\'t guess. It mathematically matches the caller\'s exact question to your currently active business policies, ensuring 100% accurate answers.',
  },
  {
    id: 3,
    icon: GitFork,
    label: 'Action & Dispatch',
    sublabel: 'Autonomy in motion',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/40',
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    textAccent: 'text-amber-300',
    detail: 'More than just talking, the AI takes action. It books calendar appointments, logs support tickets, or texts the right on-call technician at 2:00 AM.',
  },
  {
    id: 4,
    icon: Brain, // Changed icon to represent intelligence/analytics
    label: 'Data Goldmine',
    sublabel: 'Post-call intelligence',
    color: 'from-emerald-500 to-green-600',
    glow: 'shadow-emerald-500/40',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/10',
    textAccent: 'text-emerald-300',
    detail: 'The call ends, but the work doesn\'t. The system automatically emails a concise summary to your department head and plots the interaction on your analytics map.',
  },
];

const CONNECTOR_LABELS = [
  'Voice Stream',
  'Trust Score',
  'Policy Match',
  'Execute Action',
];

const DOT_DURATION = 900;
const STEP_HOLD = 1200;

export default function CallFlowDiagram({ isBiz = true }: { isBiz?: boolean }) {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [dotProgress, setDotProgress] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
  };

  const runAnimation = () => {
    clearAll();
    setActiveStep(-1);
    setDotProgress(-1);
    setIsComplete(false);
    setIsPlaying(true);

    let cursor = 0;

    STEPS.forEach((_, i) => {
      schedule(() => setActiveStep(i), cursor);
      cursor += STEP_HOLD;

      if (i < STEPS.length - 1) {
        schedule(() => setDotProgress(i), cursor);
        cursor += DOT_DURATION;
        schedule(() => setDotProgress(-1), cursor);
      }
    });

    schedule(() => {
      setIsPlaying(false);
      setIsComplete(true);
    }, cursor);
  };

  const reset = () => {
    clearAll();
    setActiveStep(-1);
    setDotProgress(-1);
    setIsPlaying(false);
    setIsComplete(false);
  };

  useEffect(() => () => clearAll(), []);

  const accentBg = isBiz ? 'bg-cyan-500' : 'bg-blue-600';
  const panelBg = isBiz ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60';
  const pageBg = isBiz ? 'bg-slate-950' : 'bg-slate-50';
  const headingColor = isBiz ? 'text-white' : 'text-slate-900';
  const subColor = isBiz ? 'text-slate-400' : 'text-slate-500';
  const eyebrow = isBiz ? 'text-cyan-400' : 'text-blue-600';
  const connectorBase = isBiz ? 'bg-slate-700' : 'bg-slate-200';

  return (
    <section className={`py-24 border-t overflow-hidden ${isBiz ? 'border-slate-800' : 'border-slate-200'} ${pageBg}`}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="mb-16">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${eyebrow}`}>
            How It Works
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className={`text-3xl md:text-5xl font-bold ${headingColor}`}>
                A call, from ring to resolution
              </h2>
              <p className={`mt-4 text-lg max-w-xl ${subColor}`}>
                Every inbound call passes through five autonomous layers in under two seconds.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {isComplete && (
                <button
                  onClick={reset}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    isBiz ? 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white' : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              )}
              <button
                onClick={runAnimation}
                disabled={isPlaying}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  isPlaying
                    ? isBiz ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : isBiz ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_-4px_rgba(6,182,212,0.5)] hover:scale-105' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:scale-105'
                }`}
              >
                <Play className="w-4 h-4" />
                {isPlaying ? 'Simulating…' : isComplete ? 'Replay' : 'Simulate a Call'}
              </button>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* 🚀 IMPROVEMENT 2: Mobile Overflow Handling */}
          <div className="overflow-x-auto pb-8 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center justify-between gap-0 relative min-w-[700px] md:min-w-0">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep >= i;
                const isCurrent = activeStep === i;

                return (
                  <React.Fragment key={step.id}>
                    {/* Node */}
                    <div className="flex flex-col items-center gap-3 flex-1 min-w-0 z-10">
                      <div
                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${step.color} border-transparent shadow-xl ${step.glow}`
                            : isBiz
                              ? 'bg-slate-900 border-slate-700'
                              : 'bg-white border-slate-200'
                        }`}
                        style={{
                          transform: isCurrent ? 'scale(1.12)' : isActive ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <Icon
                          className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 ${
                            isActive ? 'text-white' : isBiz ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        />
                        {isCurrent && (
                          <span
                            className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                            style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                          />
                        )}
                        {isActive && !isCurrent && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="text-center px-1">
                        <p className={`text-xs md:text-sm font-bold transition-colors duration-300 ${
                          isActive ? (isBiz ? 'text-white' : 'text-slate-900') : isBiz ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </p>
                        <p className={`text-[10px] md:text-xs mt-0.5 transition-colors duration-300 hidden sm:block ${
                          isActive ? step.textAccent : isBiz ? 'text-slate-700' : 'text-slate-300'
                        }`}>
                          {step.sublabel}
                        </p>
                      </div>
                    </div>

                    {/* Connector */}
                    {i < STEPS.length - 1 && (
                      <div className="relative flex flex-col items-center flex-shrink-0 w-12 md:w-16 z-0 -mt-8">
                        <div className={`h-0.5 w-full rounded-full transition-colors duration-500 ${
                          activeStep > i
                            ? isBiz ? 'bg-cyan-500/60' : 'bg-blue-400/60'
                            : connectorBase
                        }`} />
                        {dotProgress === i && (
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${accentBg}`}
                            style={{
                              animation: `travelDot ${DOT_DURATION}ms linear forwards`,
                            }}
                          />
                        )}
                        <p className={`text-[9px] font-medium mt-1.5 text-center leading-tight transition-colors duration-300 ${
                          activeStep > i ? (isBiz ? 'text-slate-500' : 'text-slate-400') : isBiz ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          {CONNECTOR_LABELS[i]}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* 🚀 IMPROVEMENT 3: Min-Height layout shift fix + ARIA live region */}
          <div
            aria-live="polite"
            className={`mt-6 rounded-2xl border p-6 md:p-8 min-h-[160px] md:min-h-[140px] flex items-center transition-all duration-500 ${panelBg} ${
              activeStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            {activeStep >= 0 && (
              <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${STEPS[activeStep].color} shadow-lg ${STEPS[activeStep].glow}`}>
                  {React.createElement(STEPS[activeStep].icon, { className: 'w-6 h-6 text-white' })}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`font-bold text-lg ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                      {STEPS[activeStep].label}
                    </h4>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${STEPS[activeStep].bg} ${STEPS[activeStep].textAccent} border ${STEPS[activeStep].border}`}>
                      Step {activeStep + 1} of {STEPS.length}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isBiz ? 'text-slate-300' : 'text-slate-600'}`}>
                    {STEPS[activeStep].detail}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Completion Banner */}
          {isComplete && (
            <div
              className={`mt-5 rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${
                isBiz
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-bold text-sm ${isBiz ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  Call resolved. Post-call intelligence active.
                </p>
                <p className={`text-xs mt-0.5 ${isBiz ? 'text-emerald-500/80' : 'text-emerald-600/70'}`}>
                  Summary generated · Action items extracted · Insight map updated
                </p>
              </div>
              <div className="sm:ml-auto flex items-center gap-1.5 shrink-0 mt-2 sm:mt-0">
                <Zap className={`w-4 h-4 ${isBiz ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-xs font-bold ${isBiz ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Cost: pennies per interaction
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-4`}>
          {[
            { label: 'Routine Calls Handled Autonomously', value: '80%', icon: Brain },
            { label: 'Average Time to Route Decision', value: '< 2s', icon: Zap },
            { label: 'Actionable Data Points Captured', value: '100%', icon: CheckCircle2 },
            { label: 'Enterprise & Healthcare Ready', value: 'Native', icon: Shield },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
                  isBiz
                    ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:shadow-md'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-3 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`} />
                <p className={`text-2xl font-extrabold mb-1 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs px-2 ${isBiz ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes travelDot {
          from { left: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          to   { left: 100%; opacity: 0; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}