import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import type { Mode } from '@/types/theme';
import AboutNavbar from './AboutNavbar';

interface DiscussionPageProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const DiscussionPage: React.FC<DiscussionPageProps> = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const isBiz = mode === 'business';

  // Always start at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const decisions = [
    {
      icon: <Users className="w-4 h-4" />,
      title: 'Protect the human advantage',
      body: "Keep RTC's people at the center. Use AI to support agents, not replace them."
    },
    {
      icon: <Wrench className="w-4 h-4" />,
      title: 'Fix the weak infrastructure',
      body: 'Close compliance gaps, reduce brittle routing logic, and modernize operations.'
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Create a stronger product',
      body: 'Turn call data, reporting, and workflow automation into clear client value.'
    }
  ];

  return (
    <div className={`min-h-screen lg:h-screen lg:overflow-hidden w-screen flex flex-col transition-colors duration-500 ${isBiz ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <AboutNavbar
        mode={mode}
        setMode={setMode}
        onLogin={() => navigate('/about')}
        onRegister={() => navigate('/register')}
      />

      {/* Main Content - Flex grows to fill space, centering content vertically */}
      <main className="flex-1 flex items-center pt-24 lg:pt-16 pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left side: The Argument */}
            <section className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-6 w-fit uppercase tracking-wider ${
                isBiz
                  ? 'bg-slate-900 border-slate-800 text-cyan-400'
                  : 'bg-white border-blue-200 text-blue-700 shadow-sm'
              }`}>
                <Sparkles className="w-3 h-3" />
                Decision Summary
              </div>

              <h1 className={`text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 ${
                isBiz ? 'text-white' : 'text-slate-900'
              }`}>
                RTC does not need a new identity.
                <span className={`block mt-2 text-transparent bg-clip-text bg-gradient-to-r ${isBiz ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-indigo-600'}`}>
                  It needs a stronger system around it.
                </span>
              </h1>

              <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-lg ${
                isBiz ? 'text-slate-400' : 'text-slate-600'
              }`}>
                The recommendation is simple: preserve the human service model, modernize the infrastructure, and introduce targeted AI only where it improves speed, visibility, and value.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  'Keep the human-centered service model',
                  'Fix the highest-friction operational gaps first',
                  'Use a phased rollout instead of a disruptive overhaul'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`rounded-full p-0.5 shrink-0 ${isBiz ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className={`text-sm font-medium ${isBiz ? 'text-slate-300' : 'text-slate-700'}`}>{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/about')}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    isBiz
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to proposal
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${
                    isBiz
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                  }`}
                >
                  Enter live demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Right side: The Breakdown */}
            <section className="lg:col-span-6 xl:col-span-7">
              <div className="grid gap-3">
                {decisions.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-4 lg:p-5 flex gap-4 items-start transition-all hover:shadow-md ${
                      isBiz
                        ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
                        : 'bg-white border-slate-200 shadow-sm hover:border-blue-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isBiz
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {item.icon}
                    </div>

                    <div>
                      <h2 className={`text-base font-bold mb-1 ${
                        isBiz ? 'text-white' : 'text-slate-900'
                      }`}>
                        {item.title}
                      </h2>
                      <p className={`text-sm leading-relaxed ${
                        isBiz ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Highlighted Recommendation Block */}
                <div
                  className={`mt-2 rounded-2xl p-5 lg:p-6 relative overflow-hidden shadow-lg ${
                    isBiz
                      ? 'bg-gradient-to-br from-cyan-900/50 to-slate-900 border border-cyan-500/30'
                      : 'bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-700'
                  }`}
                >
                  {/* Subtle background glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none ${isBiz ? 'bg-cyan-500/20' : 'bg-white/10'}`} />

                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                    isBiz ? 'text-cyan-400' : 'text-blue-200'
                  }`}>
                    Recommended path
                  </p>

                  <p className={`text-sm lg:text-base font-medium leading-relaxed ${
                    isBiz ? 'text-slate-200' : 'text-white'
                  }`}>
                    Start with a focused first phase: secure messaging, routing logic, and structured data capture.
                    Then expand into reporting, agent tooling, and selective AI workflows once the foundation is in place.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionPage;