import React from 'react';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectCardData } from './ProjectCard';

interface ProjectDetailProps {
  project: ProjectCardData;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const drawerId = `project-drawer-${project.id}`;
  const hasUrl = project.url && project.url !== 'TODO';
  const hasScreenshot = Boolean(project.screenshot);

  // Real screenshots preserve their natural aspect ratio (aspect-video).
  // Placeholders use a tighter fixed height so the drawer doesn't gain ~400px of empty space.
  const paneSizing = hasScreenshot ? 'aspect-video' : 'h-48 md:h-56';

  const screenshotInner = hasScreenshot ? (
    <img
      src={project.screenshot}
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
          <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--aurora-2))] mb-2">
            About this project
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
            {project.longDescription ?? project.description}
          </p>

          {hasUrl ? (
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
          ) : (
            <p className="text-xs italic text-muted-foreground/70">
              Project site link coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
