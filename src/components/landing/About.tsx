import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
          About
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10">
          Two careers. <span className="text-aurora">One operating model.</span>
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm an analytically focused builder blending machine-learning work with the kind of
            client service most engineers don't get near. My day job is being the primary contact
            for financial advisors, wealth managers, and trust attorneys across roughly a thousand
            client companies — including running the after-hours interface to Abbott Medical's
            pacemaker and ICD rep network. High stakes, fast turnaround, no room for hand-waving.
          </p>
          <p>
            I studied at Lawrence University — a Philosophy and Biology degree with a Machine
            Learning concentration assembled from the cognitive-science and applied-math tracks,
            since the school didn't offer a standalone ML degree. Before that, I was an Assistant
            Researcher at BYOBeez (2017–2020), building predictive models in Python that lifted
            forecast accuracy by 25% and feeding executive dashboards directly to decision-makers.
            Then a few years in service, ski patrol, and groundskeeping before running point on a
            full-cycle POS implementation at Celtica French Bakery in New Orleans through Mardi
            Gras, cutting manual data-entry errors by 90%.
          </p>
          <p>
            Now I ship:{' '}
            <strong className="text-foreground font-semibold">Seraphone</strong>, a HIPAA-compliant
            AI telephony platform with two live demo lines you can call;{' '}
            <strong className="text-foreground font-semibold">an AI codebase analyzer</strong>{' '}
            built on the RAPTOR architecture; and{' '}
            <strong className="text-foreground font-semibold">
              a vector-embedding recommendation engine
            </strong>{' '}
            for option-overlay strategies in wealth management. The stack is Python, PostgreSQL,
            TypeScript, with Power BI, Tableau, and Salesforce in the mix. I learned how
            businesses actually operate before I built tools that operate inside them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
