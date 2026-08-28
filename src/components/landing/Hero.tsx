import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden scroll-mt-24 pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* Background layers — flat brand surface, faint dot-grid, one soft aurora blob. */}
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="aurora-glow pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-[80px] opacity-35"
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="max-w-[820px]">
          <p className="hero-reveal font-mono text-[12.5px] text-muted-foreground mb-6">
            Alex Bauer{' '}
            <span className="text-[hsl(var(--aurora-2))]">//</span> builder + client-side operator
          </p>

          <h1 className="hero-reveal hero-reveal-2 font-heading text-[2.5rem] md:text-6xl font-bold tracking-[-0.03em] leading-[1.04] text-foreground mb-6">
            I build <span className="text-aurora">AI-powered systems</span> that solve the
            problem, then get out of the way.
          </h1>

          <p className="hero-reveal hero-reveal-3 text-[17px] leading-relaxed text-muted-foreground max-w-[560px] mb-10">
            An AI receptionist with two live demo lines, a 12,000-paper embedding atlas, a
            codebase knowledge graph. Shipped, not slideware. Day job: primary contact for
            financial advisors, wealth managers, and trust attorneys.
          </p>

          <div className="hero-reveal hero-reveal-4 flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-[10px] bg-aurora text-white text-[15px] font-semibold shadow-lg shadow-[hsl(var(--aurora-2))]/40 hover:shadow-[hsl(var(--aurora-2))]/60 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-[10px] border border-white/[0.12] text-[15px] font-medium text-foreground hover:bg-white/5 hover:border-white/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
