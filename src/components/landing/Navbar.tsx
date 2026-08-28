import React from 'react';
import { Mail } from 'lucide-react';

const navLinkClass =
  'font-mono text-[12.5px] lowercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground rounded-sm';

const navLinks: { label: string; href: string }[] = [
  { label: '/projects', href: '#projects' },
  { label: '/approach', href: '#how-i-work' },
  { label: '/about', href: '#about' },
  { label: '/contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-background/70 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 py-3.5 flex items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
        {/* Wordmark — the domain lives in the bar; the name lives in the hero eyebrow. */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 justify-self-start focus-visible:outline-none rounded-sm"
          aria-label="aebauer.dev — back to top"
        >
          <img
            src="/assets/landing/logo192.png"
            alt=""
            aria-hidden="true"
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
          />
          <span className="font-mono text-[13.5px] font-medium tracking-tight text-foreground transition-colors group-hover:text-[hsl(var(--aurora-2))]">
            aebauer.dev
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 justify-self-center">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className={navLinkClass}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <a
            href="/alex_bauer_resume.pdf"
            download
            className="inline-flex items-center gap-1 font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground rounded-sm"
          >
            resume.pdf <span aria-hidden="true">↓</span>
          </a>

          {/* A mail icon on mobile + tablet (paired with resume.pdf), expanding to the full
              "Get in touch" label on desktop (lg) where there's room for it. */}
          <a
            href="#contact"
            aria-label="Get in touch"
            className="inline-flex items-center justify-center gap-1.5 h-[34px] px-4 rounded-[8px] bg-aurora text-white text-sm font-semibold whitespace-nowrap shadow-lg shadow-[hsl(var(--aurora-2))]/30 hover:shadow-[hsl(var(--aurora-2))]/50 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail className="w-4 h-4 block lg:hidden" aria-hidden="true" />
            <span className="hidden lg:inline">Get in touch</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
