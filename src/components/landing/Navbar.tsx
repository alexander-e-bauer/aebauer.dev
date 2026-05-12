import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const navLinkClass =
  'transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground rounded-sm';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <a
          href="#top"
          className="group flex items-center gap-3 text-foreground justify-self-start focus-visible:outline-none rounded-full"
          aria-label="Alex Bauer — back to top"
        >
          <img
            src="/assets/landing/logo192.png"
            alt=""
            aria-hidden="true"
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
          />
          <span className="text-lg font-bold tracking-tight transition-colors group-hover:text-[hsl(var(--aurora-2))]">
            Alex Bauer
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground justify-self-center">
          <a href="#projects" className={navLinkClass}>Projects</a>
          <a href="#about" className={navLinkClass}>About</a>
          <a href="#contact" className={navLinkClass}>Contact</a>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full"
          >
            <a href="/alex_bauer_resume.pdf" download>
              <Download className="w-4 h-4" />
              Resume
            </a>
          </Button>

          <Button
            asChild
            className="rounded-full bg-aurora text-white font-semibold px-5 shadow-lg shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all"
          >
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
