import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import TerminalContact from './components/TerminalContact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlobalCanvas3D from './components/GlobalCanvas3D';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // ScrollSpy to sync active section for both Navbar and Global 3D Spatial Scene
  useEffect(() => {
    const sections = ['contact', 'projects', 'stack', 'about'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 350) {
        setActiveSection('hero');
        return;
      }

      const scrollPosition = scrollY + 300;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTerminal = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-oled text-zinc-100 font-sans selection:bg-neon-lime selection:text-black">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Cyber Grid & Ambient Grain Background */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-35 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-25 z-0" />

      {/* Persistent Global 3D Spatial Environment (Integrates 3D Shapes Across All Pages) */}
      <GlobalCanvas3D activeSection={activeSection} />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onOpenTerminal={handleOpenTerminal} />

      {/* Main Content Layout with 3D Spatial Depth */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenTerminal={handleOpenTerminal} />
        <About />
        <TechStack />
        <Projects />
        <TerminalContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
