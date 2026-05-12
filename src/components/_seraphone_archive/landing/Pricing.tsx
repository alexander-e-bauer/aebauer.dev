import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import type { Mode } from '@/types/theme';
import { personalPrices, businessPrices } from '@/types/prices';

interface PricingProps {
  mode: Mode;
  onRegister: () => void;
}

const Pricing = ({ mode, onRegister }: PricingProps) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const isBiz = mode === 'business';

  // Get the correct pricing array based on the current mode
  const currentPlans = isBiz ? businessPrices : personalPrices;

  return (
    <section className={`py-24 border-t transition-colors duration-500 ${
      isBiz ? 'bg-slate-950 border-slate-800/50' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-500 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
            Simple, transparent pricing.
          </h2>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!isAnnual ? (isBiz ? 'text-white font-medium' : 'text-slate-900 font-medium') : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full relative flex items-center p-1 transition-colors ${
                isBiz ? 'bg-slate-800' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full transition-transform ${
                isBiz ? 'bg-cyan-400' : 'bg-blue-600'
              } ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm ${isAnnual ? (isBiz ? 'text-white font-medium' : 'text-slate-900 font-medium') : 'text-slate-500'}`}>
              Annually <span className={isBiz ? 'text-cyan-400 text-xs ml-1' : 'text-blue-600 text-xs ml-1'}>(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid (Updated to 3 columns) */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 relative transition-all duration-500 flex flex-col ${
                plan.isRecommended
                  ? isBiz
                    ? 'border-cyan-500/30 bg-slate-900/60 shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] scale-105 z-10'
                    : 'border-blue-200 bg-blue-50/50 shadow-[0_0_40px_-10px_rgba(37,99,235,0.1)] scale-105 z-10'
                  : isBiz
                    ? 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:shadow-lg'
              }`}
            >
              {plan.isRecommended && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                  isBiz ? 'bg-cyan-500 text-slate-950' : 'bg-blue-600 text-white'
                }`}>
                  RECOMMENDED
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-medium mb-2 ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm min-h-[40px] ${isBiz ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${isBiz ? 'text-white' : 'text-slate-900'}`}>
                    ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className={isBiz ? 'text-slate-400' : 'text-slate-500'}>/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${isBiz ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={onRegister}
                variant={plan.isRecommended ? "default" : "outline"}
                className={`w-full rounded-full transition-colors mt-auto ${
                  plan.isRecommended
                    ? isBiz
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold'
                      : 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'
                    : isBiz
                      ? 'bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white'
                      : 'bg-transparent border-slate-300 text-slate-900 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {plan.isRecommended ? 'Start Free Trial' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Plan Note */}
        <div className="mt-16 text-center">
          <p className={`text-sm ${isBiz ? 'text-slate-400' : 'text-slate-500'}`}>
            Need more capacity? <button className={`font-medium hover:underline ${isBiz ? 'text-cyan-400' : 'text-blue-600'}`}>Contact sales</button> for a custom plan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
