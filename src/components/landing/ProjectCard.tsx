import React from 'react';
import { ArrowUpRight, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DemoNumber {
  /** Who answers and what the demo shows, e.g. "Summit Comfort — business demo (HVAC)". */
  label: string;
  number: string;
}

export interface ProjectCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  stack: string[];
  url: string;
  screenshot?: string;
  demoNumbers?: DemoNumber[];
  /** Label for an always-visible "open the live demo" button on the card. */
  demoCta?: string;
  /** One-line technical skim under the title, middot-separated. */
  tagline?: string;
  /** Renders a pulsing dot before the subtitle eyebrow. */
  live?: boolean;
  /** Italic microcopy under the call buttons suggesting what to say. */
  demoHint?: string;
  /** Public repo URL — renders a "View code" button in the drawer. */
  github?: string;
  /** Quiet line under the drawer CTAs, e.g. "Code available on request." */
  codeNote?: string;
  /** Freshness signal shown in the drawer header, e.g. "July 2026". */
  lastShipped?: string;
  /** Optional architecture diagram component rendered full-width in the drawer. */
  diagram?: React.ComponentType;
}

export interface ProjectCardProps extends ProjectCardData {
  isOpen: boolean;
  onToggle: () => void;
}

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '').replace(/^1/, '');
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : raw;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  subtitle,
  description,
  stack,
  url,
  demoNumbers,
  demoCta,
  tagline,
  live,
  demoHint,
  isOpen,
  onToggle,
}) => {
  const drawerId = `project-drawer-${id}`;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={drawerId}
      onClick={onToggle}
      onKeyDown={(e) => {
        // Only toggle for keys pressed on the card itself — Enter on a nested
        // link (call buttons, demo CTA) must activate the link, not the drawer.
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className="group border-aurora relative flex flex-col p-7 rounded-2xl border border-white/10 bg-card hover:border-white/20 hover:shadow-xl hover:shadow-[hsl(var(--aurora-2))]/10 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        boxShadow: isOpen
          ? '0 0 0 1px hsl(var(--aurora-2) / 0.55), 0 20px 40px -10px hsl(var(--aurora-2) / 0.2)'
          : undefined,
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls={drawerId}
        aria-label={isOpen ? `Collapse ${title} details` : `Expand ${title} details`}
        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChevronDown
          className="w-4 h-4 text-muted-foreground transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? 'hsl(var(--aurora-2))' : undefined }}
        />
      </button>

      <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-2 flex items-center gap-2">
        {live && (
          <span aria-hidden="true" data-testid="live-pulse" className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--aurora-2))] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--aurora-2))]" />
          </span>
        )}
        {subtitle}
      </p>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 pr-10">
        {title}
      </h3>
      {tagline && (
        <p className="text-xs font-mono text-muted-foreground/80 -mt-2 mb-3">{tagline}</p>
      )}
      <p className="text-sm leading-relaxed text-muted-foreground mb-5 flex-1">
        {description}
      </p>

      {demoNumbers && demoNumbers.length > 0 && (
        <div className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoNumbers.map(({ label, number }) => (
              <a
                key={number}
                href={`tel:${number}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-aurora text-white px-4 py-2.5 text-center shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Phone className="w-4 h-4" />
                  Call {formatPhone(number)}
                </span>
                <span className="text-[11px] font-medium leading-tight opacity-85">{label}</span>
              </a>
            ))}
          </div>
          {demoHint && (
            <p className="mt-2 text-xs italic text-muted-foreground/80">{demoHint}</p>
          )}
        </div>
      )}

      {demoCta && url && (
        <div className="mb-5">
          <Button
            asChild
            variant="outline"
            className="rounded-full bg-transparent shadow-none font-semibold border-[hsl(var(--aurora-2))]/50 text-[hsl(var(--aurora-2))] hover:bg-[hsl(var(--aurora-2))]/10 hover:text-[hsl(var(--aurora-2))] hover:border-[hsl(var(--aurora-2))]"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {demoCta}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
