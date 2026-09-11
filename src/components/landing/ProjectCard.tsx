import React from 'react';
import { ArrowUpRight, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DemoNumber {
  /** Who answers and what the demo shows, e.g. "Summit Comfort · business demo". */
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
  /** Card-level artifact (the featured card's right column). */
  screenshot?: string;
  /** Alt text for the card artifact; defaults to "<title> screenshot". */
  screenshotAlt?: string;
  /** Drawer-level artifact when it should differ from the card's; falls back to `screenshot`. */
  detailScreenshot?: string;
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
  /** Plain-language "how it flows" page — surfaced in the drawer CTA row. */
  howItWorksUrl?: string;
  /** Renders the full-width, two-column hero treatment instead of the compact card. */
  featured?: boolean;
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

/** Pulsing "live" dot. Keeps the data-testid contract the compact card relies on. */
const LivePulse: React.FC = () => (
  <span aria-hidden="true" data-testid="live-pulse" className="relative flex h-2 w-2">
    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--aurora-2))] opacity-60" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--aurora-2))]" />
  </span>
);

const StackPills: React.FC<{ stack: string[] }> = ({ stack }) => (
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
);

const ChevronToggle: React.FC<{
  isOpen: boolean;
  title: string;
  drawerId: string;
  onToggle: () => void;
}> = ({ isOpen, title, drawerId, onToggle }) => (
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
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        color: isOpen ? 'hsl(var(--aurora-2))' : undefined,
      }}
    />
  </button>
);

const cardEyebrowClass =
  'font-mono text-[11px] tracking-widest uppercase text-[hsl(var(--aurora-2))] flex items-center gap-2 pr-10';

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const {
    id,
    title,
    subtitle,
    description,
    stack,
    url,
    screenshot,
    screenshotAlt,
    demoNumbers,
    demoCta,
    tagline,
    live,
    demoHint,
    featured,
    isOpen,
    onToggle,
  } = props;
  const drawerId = `project-drawer-${id}`;

  const sharedInteraction = {
    role: 'button' as const,
    tabIndex: 0,
    'aria-expanded': isOpen,
    'aria-controls': drawerId,
    onClick: onToggle,
    onKeyDown: (e: React.KeyboardEvent) => {
      // Only toggle for keys pressed on the card itself — Enter on a nested
      // link (call buttons, demo CTA) must activate the link, not the drawer.
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    },
  };

  // ---- Featured (full-width, two-column) treatment --------------------------
  if (featured) {
    return (
      <article
        {...sharedInteraction}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card hover:border-white/20 hover:shadow-xl hover:shadow-[hsl(var(--aurora-2))]/10 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          boxShadow: isOpen
            ? '0 0 0 1px hsl(var(--aurora-2) / 0.55), 0 20px 40px -10px hsl(var(--aurora-2) / 0.2)'
            : undefined,
        }}
      >
        {/* Gradient top hairline — the brand's punctuation on the flagship card. */}
        <span aria-hidden="true" className="aurora-hairline absolute inset-x-0 top-0 h-px" />

        <ChevronToggle isOpen={isOpen} title={title} drawerId={drawerId} onToggle={onToggle} />

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-8 md:gap-9 p-7 md:p-9 md:items-center">
          {/* Left column — the pitch */}
          <div className="flex flex-col">
            <p className={`${cardEyebrowClass} mb-3`}>
              {live && <LivePulse />}
              {subtitle}
            </p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 pr-10">
              {title}
            </h3>
            {tagline && (
              <p className="text-[13px] font-mono text-muted-foreground/75 mb-4">{tagline}</p>
            )}
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">{description}</p>

            {demoNumbers && demoNumbers.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoNumbers.map(({ label, number }, i) => (
                    <a
                      key={number}
                      href={`tel:${number}`}
                      onClick={(e) => e.stopPropagation()}
                      className={
                        i === 0
                          ? 'flex flex-col items-center justify-center gap-0.5 rounded-xl bg-aurora text-white px-4 py-3 text-center shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                          : 'flex flex-col items-center justify-center gap-0.5 rounded-xl border border-[hsl(var(--aurora-2))]/50 bg-transparent text-[hsl(var(--aurora-2))] px-4 py-3 text-center hover:bg-[hsl(var(--aurora-2))]/10 hover:border-[hsl(var(--aurora-2))] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                      }
                    >
                      <span className="inline-flex items-center gap-2 text-sm font-semibold">
                        <Phone className="w-4 h-4" />
                        Call {formatPhone(number)}
                      </span>
                      <span
                        className={
                          i === 0
                            ? 'text-[11px] font-medium leading-tight opacity-85'
                            : 'text-[11px] font-medium leading-tight text-muted-foreground'
                        }
                      >
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
                {demoHint && (
                  <p className="mt-2.5 text-xs italic text-muted-foreground/80">{demoHint}</p>
                )}
              </div>
            )}

            <StackPills stack={stack} />
          </div>

          {/* Right column — the artifact */}
          {screenshot && (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <img
                src={screenshot}
                alt={screenshotAlt ?? `${title} screenshot`}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </article>
    );
  }

  // ---- Compact (secondary) treatment ---------------------------------------
  return (
    <article
      {...sharedInteraction}
      className="group border-aurora relative flex flex-col p-7 rounded-2xl border border-white/10 bg-card hover:border-white/20 hover:shadow-xl hover:shadow-[hsl(var(--aurora-2))]/10 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        boxShadow: isOpen
          ? '0 0 0 1px hsl(var(--aurora-2) / 0.55), 0 20px 40px -10px hsl(var(--aurora-2) / 0.2)'
          : undefined,
      }}
    >
      <ChevronToggle isOpen={isOpen} title={title} drawerId={drawerId} onToggle={onToggle} />

      <p className={`${cardEyebrowClass} mb-2`}>
        {live && <LivePulse />}
        {subtitle}
      </p>
      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground mb-3 pr-10">
        {title}
      </h3>
      {tagline && (
        <p className="text-xs font-mono text-muted-foreground/80 -mt-2 mb-3">{tagline}</p>
      )}
      <p className="text-sm leading-relaxed text-muted-foreground mb-5 flex-1">{description}</p>

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

      <StackPills stack={stack} />
    </article>
  );
};

export default ProjectCard;
