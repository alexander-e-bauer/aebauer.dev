import React from 'react';
import Container from './Container';

/* The `$` prompts are terminal chrome, not content — hidden from screen readers. */
const Prompt: React.FC = () => (
  <span aria-hidden="true" className="text-[hsl(var(--aurora-2))] select-none">
    ${' '}
  </span>
);

const HowIWork: React.FC = () => {
  return (
    <section
      id="how-i-work"
      className="relative py-24 md:py-32 scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]"
    >
      <Container>
        <div className="max-w-5xl">
          <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
            Approach
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10 md:mb-14 max-w-3xl">
            Start with the phone call, <span className="text-aurora">not the model.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
            <div className="space-y-6 text-[17px] leading-relaxed text-muted-foreground">
              <p>
                I start with the customer conversation. My day job is fielding calls from
                financial advisors, wealth managers, and trust attorneys — people who don't care
                what an embedding is, and shouldn't have to. The systems I build start there —
                three questions first, architecture second.
              </p>
              <p>
                The "AI-powered systems" half of my work exists to make the "translate them" half
                unnecessary. Seraphone answers the phone so a practice manager doesn't have to.
                The atlas and the codebase analyzer are retrieval you can inspect, not generation
                you have to trust. I'd rather ship a boring integration that removes a category
                of work than an impressive demo that needs babysitting.
              </p>
            </div>

            {/* Terminal card — the three questions are the payload, so they live here, not
                duplicated in the prose. Traffic lights take the aurora stops. */}
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden shadow-xl shadow-black/25">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--aurora-1))]/80" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--aurora-2))]/80" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--aurora-3))]/80" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground/70">
                  alex@aebauer — zsh
                </span>
              </div>
              <div className="px-5 py-5 md:px-6 font-mono text-[13px] leading-[2] text-muted-foreground">
                <p>
                  <Prompt />
                  <span className="text-foreground/90">cat approach.txt</span>
                </p>
                <p className="text-foreground/80">where does it hurt?</p>
                <p className="text-foreground/80">what has to never break?</p>
                <p className="text-foreground/80">who has to trust it?</p>
                <p className="mt-4">
                  <Prompt />
                  <span className="text-foreground/90">ls shipped/</span>
                </p>
                <p>
                  seraphone/&nbsp;&nbsp;atlas/&nbsp;&nbsp;codebase-kg/
                </p>
                <p className="mt-4" aria-hidden="true">
                  <Prompt />
                  <span className="terminal-cursor" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowIWork;
