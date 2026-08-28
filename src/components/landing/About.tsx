import React from 'react';

/* Career arc as a skim layer — every entry is stated in the prose alongside.
   The two "now" tracks run in parallel: that's the heading's claim, drawn. */
const timeline: { era: string; detail: string; current?: boolean }[] = [
  { era: '2017–20', detail: 'BYOBeez — predictive models in Python' },
  { era: 'then', detail: 'service · ski patrol · POS point person' },
  { era: 'now · ops', detail: 'primary contact, ~1,000 client companies', current: true },
  { era: 'now · build', detail: 'seraphone / atlas / codebase-kg', current: true },
];

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
            About
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10 md:mb-14 max-w-3xl">
            Two careers. <span className="text-aurora">One operating model.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16">
            {/* Trajectory rail — a hairline timeline; past nodes muted, the
                two parallel "now" tracks carry the accent. self-start keeps the
                line from stretching to the full height of the prose column. */}
            <ol className="relative self-start border-l border-white/[0.08] space-y-8">
              {timeline.map(({ era, detail, current }) => (
                <li key={era} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[3.5px] top-[3px] h-1.5 w-1.5 rounded-full ${
                      current ? 'bg-[hsl(var(--aurora-2))]' : 'bg-muted-foreground/40'
                    }`}
                  />
                  <p
                    className={`font-mono text-[11px] tracking-wider uppercase mb-1 ${
                      current ? 'text-[hsl(var(--aurora-2))]' : 'text-muted-foreground'
                    }`}
                  >
                    {era}
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{detail}</p>
                </li>
              ))}
            </ol>

            <div className="space-y-6 text-[17px] md:text-lg leading-relaxed text-muted-foreground">
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
                <strong className="text-foreground font-semibold">
                  an Atlas of Machine Understanding
                </strong>
                , 12,000 papers embedded, UMAP-projected, and RAPTOR-clustered into a navigable map;{' '}
                <strong className="text-foreground font-semibold">an AI codebase analyzer</strong>{' '}
                built on the RAPTOR architecture; and{' '}
                <strong className="text-foreground font-semibold">
                  a vector-embedding recommendation engine
                </strong>{' '}
                for option-overlay strategies in wealth management (in progress). The stack is Python, PostgreSQL,
                TypeScript, with Power BI, Tableau, and Salesforce in the mix. I learned how
                businesses actually operate before I built tools that operate inside them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
