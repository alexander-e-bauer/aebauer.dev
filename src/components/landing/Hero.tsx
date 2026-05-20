import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Diagonal cut at the bottom: hero clips up-right (right side lifts higher than left),
// matching the divider style from the old portfolio.
const heroClipPath =
  'polygon(0% 0%, 100% 0%, 100% calc(100% - 6rem), 0% 100%)';

const PARALLAX_FACTOR = 0.6;

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Direct DOM manipulation for parallax — bypasses React reconciliation on every
  // scroll tick, which is what was making the motion feel jumpy.
  // Uses `transform: translate3d` (universally supported + GPU-composited) rather
  // than the newer CSS `translate` property.
  useEffect(() => {
    if (reduceMotion) {
      if (bgRef.current) bgRef.current.style.transform = 'translate3d(0, 0, 0)';
      return;
    }
    let raf = 0;
    const update = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${window.scrollY * PARALLAX_FACTOR}px, 0)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative pt-32 pb-32 md:pt-48 md:pb-48 overflow-hidden scroll-mt-24"
      style={{ clipPath: heroClipPath, WebkitClipPath: heroClipPath }}
    >
      {/* Hex backdrop — overshoots the section vertically by ~70% so the stronger parallax
          translate never exposes blank edges as the hero scrolls past the viewport.
          Translated directly via ref in the rAF loop above. */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="hero-bg-image pointer-events-none absolute left-[-10%] right-[-10%] top-[-40%] bottom-[-40%] -z-20 bg-[url('/assets/landing/TObeK.png')] bg-cover bg-center"
        style={{ willChange: reduceMotion ? undefined : 'transform' }}
      />
      {/* Dark wash so text and glass pane read against the photographic texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/55 to-background/85"
      />
      {/* Subtle aurora bleed — keeps the brand warmth without dominating. */}
      <div
        aria-hidden="true"
        className="aurora-glow pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-50"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Frosted glass pane — improves legibility over the hex texture. */}
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-background/30 backdrop-blur-xl shadow-2xl shadow-black/30 px-6 py-12 md:px-14 md:py-16 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-6">
            Alex Bauer
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-foreground">
            I build <span className="text-aurora">AI-powered systems</span>
            <br className="hidden md:block" />{' '}
            and translate them for the people paying the bill.
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Developer shipping production tools — telephony, vector search, forecasting.
            Day job: primary contact for financial advisors, wealth managers, and trust attorneys.
            Same skillset, both sides of the table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="text-base px-7 py-6 rounded-full font-semibold bg-aurora text-white shadow-lg shadow-[hsl(var(--aurora-2))]/40 hover:shadow-[hsl(var(--aurora-2))]/60 hover:brightness-110 transition-all"
            >
              <a href="#projects">
                View projects
                <ArrowRight className="ml-1 w-5 h-5" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-7 py-6 rounded-full font-medium bg-transparent border-white/15 text-foreground hover:bg-white/5 hover:border-white/30"
            >
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
