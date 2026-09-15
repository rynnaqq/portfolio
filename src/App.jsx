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
import CyberPreloader from './components/CyberPreloader';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [themeAccent, setThemeAccent] = useState('#CCFF00');
  const [currentGeometry, setCurrentGeometry] = useState('icosahedron');
  const [isLoaded, setIsLoaded] = useState(false);

  // Dynamically inject theme CSS variable into root
  useEffect(() => {
    document.documentElement.style.setProperty('--color-neon-lime', themeAccent);
  }, [themeAccent]);

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
    <div className="relative min-h-screen bg-oled text-zinc-100 font-sans selection:bg-neon-lime selection:text-black w-full overflow-x-hidden">
      {/* Cyber Preloader Sequence */}
      <CyberPreloader onComplete={() => setIsLoaded(true)} />

      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Cyber Grid & Ambient Grain Background */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-35 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-25 z-0" />

      {/* Persistent Global 3D Spatial Environment (Integrates 3D Shapes Across All Pages) */}
      <GlobalCanvas3D
        activeSection={activeSection}
        themeAccent={themeAccent}
        currentGeometry={currentGeometry}
        onGeometryChange={setCurrentGeometry}
      />

      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenTerminal={handleOpenTerminal}
        themeAccent={themeAccent}
        onThemeChange={setThemeAccent}
      />

      {/* Main Content Layout with 3D Spatial Depth */}
      <main className="relative z-10 flex flex-col w-full">
        <Hero
          onOpenTerminal={handleOpenTerminal}
          themeAccent={themeAccent}
          currentGeometry={currentGeometry}
          onGeometryChange={setCurrentGeometry}
        />
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
