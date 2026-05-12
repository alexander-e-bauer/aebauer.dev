import React from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  Globe, 
  Heart, 
  BellRing, 
  MessageSquare 
} from 'lucide-react';
import type { Mode } from '@/types/theme';

interface BentoFeaturesProps {
  mode: Mode;
}

const BentoFeatures: React.FC<BentoFeaturesProps> = ({ mode }) => {
  const isBiz = mode === 'business';

  // Business Features Data
  const bizFeatures = [
    {
      title: "Conversational AI",
      desc: "Our proprietary models understand context, intent, and sentiment in real-time. It doesn't just transcribe; it comprehends.",
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      bg: "bg-cyan-500/10", border: "border-cyan-500/20", colSpan: "md:col-span-2"
    },
    {
      title: "Spam Elimination",
      desc: "Automatically drop robocalls and telemarketers before your phone even rings.",
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-500/10", border: "border-purple-500/20", colSpan: "col-span-1"
    },
    {
      title: "Instant Webhooks",
      desc: "Pipe call transcripts and summaries directly into your CRM or Slack channels instantly.",
      icon: <Zap className="w-6 h-6 text-green-400" />,
      bg: "bg-green-500/10", border: "border-green-500/20", colSpan: "col-span-1"
    },
    {
      title: "Global Infrastructure",
      desc: "Provision local numbers in over 50 countries with ultra-low latency edge routing for natural, delay-free conversations.",
      icon: <Globe className="w-6 h-6 text-orange-400" />,
      bg: "bg-orange-500/10", border: "border-orange-500/20", colSpan: "md:col-span-2"
    }
  ];

  // Personal Features Data
  const personalFeatures = [
    {
      title: "100% Scam Protection",
      desc: "Elderly parents are the #1 target for phone scams. Our AI acts as a polite but firm gatekeeper, ensuring scammers never reach them.",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100", border: "border-blue-200", colSpan: "md:col-span-2"
    },
    {
      title: "VIP Family Bypass",
      desc: "Add family and doctors to the VIP list. Their calls ring through immediately, every time.",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      bg: "bg-rose-100", border: "border-rose-200", colSpan: "col-span-1"
    },
    {
      title: "Activity Alerts",
      desc: "Get an instant SMS if a suspicious caller tries to contact your loved one repeatedly.",
      icon: <BellRing className="w-6 h-6 text-amber-500" />,
      bg: "bg-amber-100", border: "border-amber-200", colSpan: "col-span-1"
    },
    {
      title: "Easy Transcripts",
      desc: "No more struggling with confusing voicemails. Get clear, easy-to-read text summaries of every missed call sent right to your phone.",
      icon: <MessageSquare className="w-6 h-6 text-indigo-500" />,
      bg: "bg-indigo-100", border: "border-indigo-200", colSpan: "md:col-span-2"
    }
  ];

  const features = isBiz ? bizFeatures : personalFeatures;

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
            {isBiz ? 'Engineered for efficiency.' : 'Peace of mind, built in.'}
          </h2>
          <p className={`text-lg max-w-2xl transition-colors duration-500 ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>
            {isBiz
              ? 'Everything you need to automate your communications, wrapped in a developer-friendly platform.'
              : 'Powerful AI technology working silently in the background to keep your family safe from predatory callers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {features.map((feat, i) => (
            <div key={i} className={`${feat.colSpan} rounded-3xl border p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group ${
              isBiz
                ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/50'
                : 'border-slate-200 bg-white hover:shadow-xl hover:border-blue-200 shadow-sm'
            }`}>
              {/* Abstract graphic for large cards in Biz mode */}
              {isBiz && feat.colSpan === 'md:col-span-2' && (
                <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                  <img src="/assets/landing/abstract-mesh-dark.svg" alt="" className="w-96 h-96 object-cover" />
                </div>
              )}
              <div className="z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${feat.bg} ${feat.border}`}>
                  {feat.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h3>
                <p className={`max-w-md transition-colors duration-500 ${isBiz ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
