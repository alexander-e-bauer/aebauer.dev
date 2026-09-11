import React from 'react';
import { cn } from '@/lib/utils';

/**
 * The one page-width rule. Every section, the navbar and the footer share it so
 * their left edges line up; a section that wants a narrower prose measure caps
 * its own inner block (`max-w-3xl`, `max-w-5xl`) without re-centering it.
 * Content is 1152px wide at md+ (max-width minus the side padding).
 */
const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div
    className={cn('site-container mx-auto w-full max-w-[1232px] px-6 md:px-10', className)}
    {...rest}
  />
);

export default Container;
