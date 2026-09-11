import React from 'react';
import { ArrowUpRight, Github, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectCardData } from './ProjectCard';

interface ProjectDetailProps {
  project: ProjectCardData;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const drawerId = `project-drawer-${project.id}`;
  const hasUrl = project.url && project.url !== 'TODO';
  // The drawer may show a different artifact than the card (e.g. the card shows the
  // product's landing page, the drawer shows the pipeline behind it).
  const screenshotSrc = project.detailScreenshot ?? project.screenshot;
  const hasScreenshot = Boolean(screenshotSrc);

  // Real screenshots preserve their natural aspect ratio (aspect-video).
  // Placeholders use a tighter fixed height so the drawer doesn't gain ~400px of empty space.
  const paneSizing = hasScreenshot ? 'aspect-video' : 'h-48 md:h-56';

  const screenshotInner = hasScreenshot ? (
    <img
      src={screenshotSrc}
      alt={`${project.title} screenshot`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
      <ImageOff className="w-8 h-8 opacity-40" />
      <p className="text-xs font-medium uppercase tracking-widest opacity-60">
        Screenshot coming soon
      </p>
    </div>
  );

  return (
    <div
      id={drawerId}
      role="region"
      aria-label={`${project.title} details`}
      className="mt-3 rounded-2xl border border-[hsl(var(--aurora-2))]/40 bg-card/80 backdrop-blur-sm overflow-hidden"
      style={{ boxShadow: '0 0 0 1px hsl(var(--aurora-2) / 0.15)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 md:p-8 items-start">
        {/* Screenshot — clickable when a real URL is set */}
        <div className="md:col-span-3">
          {hasUrl && hasScreenshot ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${project.title} site in a new tab`}
              className={`group block relative ${paneSizing} rounded-xl overflow-hidden border border-white/10 hover:border-[hsl(var(--aurora-2))]/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              {screenshotInner}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-aurora text-white text-xs font-semibold px-3 py-1.5">
                  Open site
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ) : (
            <div
              className={`relative ${paneSizing} rounded-xl overflow-hidden border border-white/10`}
              aria-label={hasScreenshot ? `${project.title} preview` : 'Screenshot placeholder'}
            >
              {screenshotInner}
            </div>
          )}
        </div>

        {/* Long-form copy + site CTA */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--aurora-2))]">
              About this project
            </p>
            {project.lastShipped && (
              <p className="text-xs text-muted-foreground/70 whitespace-nowrap">
                Shipped · {project.lastShipped}
              </p>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
            {project.longDescription ?? project.description}
          </p>

          {hasUrl ? (
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="rounded-full bg-aurora text-white font-semibold shadow-md shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all w-full sm:w-auto"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View project site
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
                {project.github && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-transparent shadow-none font-semibold border-[hsl(var(--aurora-2))]/50 text-[hsl(var(--aurora-2))] hover:bg-[hsl(var(--aurora-2))]/10 hover:text-[hsl(var(--aurora-2))] hover:border-[hsl(var(--aurora-2))] w-full sm:w-auto"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      View code
                    </a>
                  </Button>
                )}
              </div>
              {project.howItWorksUrl && (
                <a
                  href={project.howItWorksUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
                >
                  Non-technical version: how a call flows
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.codeNote && (
                <p className="mt-3 text-xs italic text-muted-foreground/70">{project.codeNote}</p>
              )}
            </div>
          ) : (
            <p className="text-xs italic text-muted-foreground/70">
              Project site link coming soon.
            </p>
          )}
        </div>
      </div>

      {project.diagram && (
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <project.diagram />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
