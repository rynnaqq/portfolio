import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Terminal, Palette } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Magnetic from './Magnetic';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './Icons';

export default function Navbar({ activeSection, onOpenTerminal, themeAccent, onThemeChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  const themes = [
    { name: 'Neon Lime', color: '#CCFF00' },
    { name: 'Cyber Cyan', color: '#00F0FF' },
    { name: 'Electric Purple', color: '#7928CA' },
    { name: 'Hyper Pink', color: '#FF007A' },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-5 px-3 sm:px-8 flex justify-center ${
          isScrolled ? 'py-2 sm:py-3' : ''
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-oled/90 backdrop-blur-2xl border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.9)]'
              : 'bg-surface-card/60 backdrop-blur-lg border-white/10'
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
              className="group flex items-center gap-2.5 font-display text-base sm:text-lg tracking-wider font-extrabold text-white"
            >
              <span
                style={{ borderColor: themeAccent }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border flex items-center justify-center text-[11px] sm:text-xs font-mono text-neon-lime group-hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all"
              >
                KV
              </span>
              <span className="hidden md:inline-block font-mono text-xs text-zinc-400 group-hover:text-white transition-colors">
                KAELEN VANCE <span style={{ color: themeAccent }}>//01</span>
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
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Live Availability Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/20 text-[11px] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-lime"></span>
              </span>
              <span className="text-zinc-300">OPEN FOR Q3/Q4</span>
            </div>

            {/* Quick Terminal CLI Button */}
            {onOpenTerminal && (
              <Magnetic strength={0.3}>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTerminal();
                  }}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-200/80 border border-white/10 hover:border-neon-lime text-xs font-mono text-zinc-300 hover:text-neon-lime transition-all"
                  title="Open Interactive Terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-neon-lime" />
                  <span>CLI</span>
                </button>
              </Magnetic>
            )}

            {/* Theme Accent Switcher Picker */}
            <div className="relative">
              <Magnetic strength={0.3}>
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowThemePicker(!showThemePicker);
                  }}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                  title="Change 3D Theme Accent"
                >
                  <Palette className="w-3.5 h-3.5" style={{ color: themeAccent }} />
                </button>
              </Magnetic>

              {/* Theme Dropdown Popover */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 mt-2 p-2 rounded-2xl bg-surface-card/95 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 z-50 min-w-[140px]"
                  >
                    <span className="font-mono text-[10px] text-zinc-500 px-2 uppercase">Theme Accent</span>
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => {
                          sound.playClick();
                          if (onThemeChange) onThemeChange(t.color);
                          setShowThemePicker(false);
                        }}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                          themeAccent === t.color ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Audio Toggle + Mini Equalizer Bars */}
            <Magnetic strength={0.3}>
              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full bg-surface-200 border border-white/10 text-zinc-400 hover:text-neon-lime hover:border-neon-lime transition-all"
                title={isMuted ? 'Unmute Sound Effects & Ambient Audio' : 'Mute Audio'}
                aria-label="Toggle Sound"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-neon-lime" />
                    {/* Equalizer Visualizer Bars */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-neon-lime h-2.5 animate-pulse" />
                      <span className="w-0.5 bg-neon-lime h-1.5 animate-pulse delay-75" />
                      <span className="w-0.5 bg-neon-lime h-3 animate-pulse delay-150" />
                    </div>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Desktop Let's Talk CTA */}
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

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden w-8 h-8 rounded-full bg-surface-200 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-neon-lime transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-oled/98 backdrop-blur-3xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 border-b border-white/10 overflow-y-auto"
          >
            {/* Header close inside drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-neon-lime tracking-widest uppercase">
                // SYSTEM DIRECTORY
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-surface-200 border border-white/10 text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col space-y-3 py-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                  className="flex items-baseline justify-between py-3 border-b border-white/5 font-display text-2xl font-extrabold tracking-tight text-zinc-200 hover:text-neon-lime active:text-neon-lime transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-zinc-500">{item.index}</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom Actions inside drawer */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-surface-card border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
                  <span className="font-mono text-xs text-zinc-300">Available for Contract Work</span>
                </div>
                <span className="font-mono text-xs text-neon-lime">2025/2026</span>
              </div>

              {/* Social Channels in Drawer */}
              <div className="flex items-center justify-center gap-4 py-2 text-zinc-400">
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-surface-200 border border-white/10">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={portfolioData.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-surface-200 border border-white/10">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-surface-200 border border-white/10">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
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
