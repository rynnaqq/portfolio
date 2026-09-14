import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Magnetic from './Magnetic';

export default function Navbar({ activeSection, onOpenTerminal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  const navItems = [
    { label: 'ABOUT', href: '#about', index: '01' },
    { label: 'STACK', href: '#stack', index: '02' },
    { label: 'WORKS', href: '#projects', index: '03' },
    { label: 'CONTACT', href: '#contact', index: '04' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.playClick();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 md:py-6 px-4 sm:px-8 flex justify-center ${
          isScrolled ? 'py-3 md:py-4' : ''
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-oled/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-surface-card/40 backdrop-blur-md border-white/5'
          }`}
        >
          {/* Logo / Monogram */}
          <Magnetic strength={0.25}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 font-display text-lg tracking-wider font-extrabold text-white"
            >
              <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-mono text-neon-lime group-hover:border-neon-lime group-hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all">
                KV
              </span>
              <span className="hidden sm:inline-block font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">
                KAELEN VANCE <span className="text-neon-lime">//01</span>
              </span>
            </a>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-300/60 p-1.5 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <Magnetic key={item.href} strength={0.2}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-black font-semibold bg-neon-lime shadow-neon-lime'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="opacity-40 text-[10px]">{item.index}</span>
                    <span>{item.label}</span>
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Availability Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/20 text-[11px] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-lime"></span>
              </span>
              <span className="text-zinc-300">AVAILABLE FOR Q3</span>
            </div>

            {/* Quick Terminal CLI Drawer Button */}
            {onOpenTerminal && (
              <Magnetic strength={0.3}>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTerminal();
                  }}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-200 border border-white/10 hover:border-neon-lime text-xs font-mono text-zinc-300 hover:text-neon-lime transition-all"
                  title="Open Interactive Terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-neon-lime" />
                  <span>CLI</span>
                </button>
              </Magnetic>
            )}

            {/* Audio Toggle */}
            <Magnetic strength={0.3}>
              <button
                onClick={toggleSound}
                className="w-8 h-8 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-neon-lime hover:border-neon-lime transition-all"
                title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
                aria-label="Toggle Sound Effects"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-neon-lime" />}
              </button>
            </Magnetic>

            {/* Magnetic Contact Button */}
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative group overflow-hidden px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-neon-lime transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-neon-lime"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden w-9 h-9 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-neon-lime"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-oled/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-28 pb-12 px-8 border-b border-white/10"
          >
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-xs text-neon-lime tracking-widest uppercase">
                // SYSTEM DIRECTORY
              </span>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-baseline justify-between py-3 border-b border-white/5 font-display text-3xl font-extrabold tracking-tight text-zinc-200 hover:text-neon-lime transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-sm text-zinc-500">{item.index}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-card border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
                  <span className="font-mono text-xs text-zinc-300">Available for Contract Work</span>
                </div>
                <span className="font-mono text-xs text-neon-lime">2025/2026</span>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-3.5 rounded-xl bg-neon-lime text-black font-mono font-bold text-center flex items-center justify-center gap-2 shadow-neon-lime"
              >
                <span>INITIATE CONTACT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
