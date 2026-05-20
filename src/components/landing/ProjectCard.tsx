import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';

export interface ProjectCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  stack: string[];
  url: string;
  screenshot?: string;
  demoNumbers?: string[];
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
  demoNumbers,
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

      <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-2">
        {subtitle}
      </p>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 pr-10">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground mb-5 flex-1">
        {description}
      </p>

      {demoNumbers && demoNumbers.length > 0 && (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {demoNumbers.map((number) => (
            <a
              key={number}
              href={`tel:${number}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Phone className="w-4 h-4" />
              Call {formatPhone(number)}
            </a>
          ))}
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
