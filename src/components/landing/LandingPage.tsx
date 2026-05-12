import React from 'react';

import Navbar from './Navbar';
import Hero from './Hero';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden bg-background text-foreground selection:bg-[hsl(var(--aurora-2))]/30">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
