import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const links: ContactLink[] = [
  {
    label: 'Email',
    value: 'alex@aebauer.dev',
    href: 'mailto:alex@aebauer.dev',
    Icon: Mail,
  },
  {
    label: 'GitHub',
    value: '@alexander-e-bauer',
    href: 'https://github.com/alexander-e-bauer',
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    value: '@alexander-e-bauer',
    href: 'https://www.linkedin.com/in/alexander-e-bauer',
    Icon: Linkedin,
  },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <p className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-4">
          Contact
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Let's <span className="text-aurora">talk.</span>
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground mb-12">
          Open to senior IC roles, contract engagements, and collaboration on AI tooling for
          financial services and healthcare. The fastest way to reach me is email — I read
          everything.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-card hover:border-[hsl(var(--aurora-2))]/40 hover:shadow-lg hover:shadow-[hsl(var(--aurora-2))]/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-[hsl(var(--aurora-2))]" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--aurora-2))] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-foreground truncate">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
