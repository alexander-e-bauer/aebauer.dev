import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, SunMedium, ArrowRight, Briefcase } from 'lucide-react';
import type { Mode } from '@/types/theme';

interface NavbarProps {
  mode: Mode;
  setMode: (m: Mode) => void;
  onLogin: () => void;
  onRegister: () => void;
}

const AboutNavbar: React.FC<NavbarProps> = ({ mode, setMode, onLogin }) => {
  const isBiz = mode === 'business';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-500 ${
        isBiz
          ? 'border-slate-800/80 bg-slate-950/78'
          : 'border-slate-200/80 bg-white/78'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 shrink-0 transition-transform duration-500 hover:scale-105">
              <img
                src={isBiz ? "/assets/landing/icons/icon-dark01.svg" : "/assets/landing/icons/icon-light.svg"}
                alt="Seraphone Icon"
                className="w-full h-full object-cover rounded-[22.5%] shadow-md transition-all duration-500"
              />
              <div
                className={`absolute inset-0 rounded-[22.5%] ring-1 ring-inset pointer-events-none transition-colors duration-500 ${
                  isBiz ? 'ring-white/20' : 'ring-black/10'
                }`}
              />
            </div>

            <div className="min-w-0">
              <div className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isBiz ? 'text-slate-50' : 'text-slate-900'}`}>
                seraphone<span className={isBiz ? 'text-cyan-400' : 'text-blue-600'}>.ai</span>
              </div>
              <div className={`hidden sm:flex items-center gap-2 text-xs font-medium transition-colors duration-500 ${isBiz ? 'text-slate-400' : 'text-slate-500'}`}>
                <Briefcase className="w-3 h-3" />
                <span>Strategic Proposal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode(isBiz ? 'personal' : 'business')}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${
              isBiz
                ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            aria-label="Toggle theme"
          >
            {isBiz ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBiz ? 'Light mode' : 'Dark mode'}</span>
          </button>

          <Button
            onClick={onLogin}
            className={`rounded-full px-5 font-semibold transition-colors duration-500 ${
              isBiz
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            See Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AboutNavbar;