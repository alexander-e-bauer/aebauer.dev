import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-base font-bold tracking-tight text-foreground">
            Alex Bauer
          </span>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Alex Bauer. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-muted-foreground">
            <a
              href="mailto:alex@aebauer.dev"
              aria-label="Email"
              className="hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/alexander-e-bauer"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-e-bauer"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--aurora-2))] transition-colors focus-visible:outline-none focus-visible:text-[hsl(var(--aurora-2))]"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
