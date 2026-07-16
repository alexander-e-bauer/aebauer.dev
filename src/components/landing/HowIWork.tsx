import React from 'react';

const HowIWork: React.FC = () => {
  return (
    <section id="how-i-work" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
          Approach
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10">
          Start with the phone call, <span className="text-aurora">not the model.</span>
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I start with the customer conversation. My day job is fielding calls from financial
            advisors, wealth managers, and trust attorneys — people who don't care what an
            embedding is, and shouldn't have to. The systems I build start there: where does it
            hurt, what has to never break, who has to trust it. Then I work backward to the
            architecture.
          </p>
          <p>
            The "AI-powered systems" half of my work exists to make the "translate them" half
            unnecessary. Seraphone answers the phone so a practice manager doesn't have to. The
            atlas and the codebase analyzer are retrieval you can inspect, not generation you
            have to trust. I'd rather ship a boring integration that removes a category of work
            than an impressive demo that needs babysitting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
