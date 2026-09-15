import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Terminal, Sparkles, Code2, Globe, Orbit } from 'lucide-react';
import Magnetic from './Magnetic';
import TextScramble from './TextScramble';
import { sound } from '../utils/sound';

export default function Hero({ onOpenTerminal, themeAccent = '#CCFF00' }) {
  const [timeString, setTimeString] = useState('');
  const [telemetry, setTelemetry] = useState({ x: 2.0, y: 0.1, rot: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        x: (2.0 + (Math.random() - 0.5) * 0.04).toFixed(3),
        y: (0.1 + (Math.random() - 0.5) * 0.03).toFixed(3),
        rot: ((Date.now() / 40) % 360).toFixed(1),
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-10 sm:pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[500px] bg-gradient-to-b from-neon-purple/20 via-neon-blue/10 to-transparent blur-[120px] sm:blur-[140px] rounded-full opacity-70" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-neon-lime/10 blur-[100px] sm:blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-neon-blue/10 blur-[120px] sm:blur-[150px] rounded-full" />

      {/* Hero Header & Identity */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-6 mb-6 sm:mb-8">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-neon-lime"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-300">
              CORE: OPERATIONAL // TOKYO & SF
            </span>
          </div>

          {/* Realtime UTC Telemetry */}
          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime" />
              <span>TIME: {timeString || 'SYNCING...'}</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 hidden xs:inline">120FPS SPATIAL ENGINE</span>
          </div>
        </div>

        {/* Main Headline & 3D Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px] sm:min-h-[500px]">
          {/* Left Column: Kinetic Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card/80 backdrop-blur-md border border-white/10 font-mono text-[11px] sm:text-xs text-neon-lime mb-3 sm:mb-4">
                <Sparkles className="w-3 h-3 text-neon-lime" />
                <span>SENIOR CREATIVE TECHNOLOGIST & ARCHITECT</span>
              </div>

              {/* Kinetic Massive Typography with Responsive Clamping & Scramble */}
              <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.92] text-white break-words">
                <TextScramble text="SCULPTING" /> <br />
                <span className="gradient-headline">DIGITAL</span> <br />
                <span className="relative inline-block">
                  <TextScramble text="MONUMENTS" />
                  <span
                    style={{ backgroundColor: themeAccent }}
                    className="absolute -bottom-1.5 left-0 w-full h-1 opacity-90 shadow-[0_0_12px_#CCFF00]"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline positioning copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl"
            >
              Bridging the boundary between raw distributed computing and high-end Awwwards-caliber visual aesthetics. 
              Engineering sub-millisecond frontends, custom GLSL shaders, and reactive 3D spatial environments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              {/* Primary CTA */}
              <Magnetic strength={0.3} className="w-full xs:w-auto">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="w-full xs:w-auto group relative px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-neon-lime text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:shadow-neon-lime-lg transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </button>
              </Magnetic>

              {/* Secondary CTA */}
              <Magnetic strength={0.25} className="w-full xs:w-auto">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full xs:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-surface-card/80 backdrop-blur-md border border-white/10 hover:border-neon-lime text-white font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2"
                >
                  <span>INITIATE CONTACT</span>
                </button>
              </Magnetic>

              {/* Interactive CLI Terminal Launch */}
              {onOpenTerminal && (
                <Magnetic strength={0.2} className="hidden sm:inline-block">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenTerminal();
                    }}
                    className="p-3.5 sm:p-4 rounded-full bg-surface-200/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-neon-lime hover:border-neon-lime transition-all"
                    title="Open Command Terminal"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                </Magnetic>
              )}
            </motion.div>
          </div>

          {/* Right Column: Spatial 3D HUD Reticle & Interactive Telemetry */}
          <div className="lg:col-span-5 relative h-[220px] xs:h-[280px] sm:h-[400px] lg:h-[480px] flex items-center justify-center pointer-events-none">
            {/* Ethereal Circular Targeting HUD (Hidden or compact on small mobile) */}
            <div className="relative w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
              <div className="absolute inset-2 rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-neon-lime/20" />
              
              {/* Cardinal Reticle Ticks */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-3 sm:h-4 bg-neon-lime" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-3 sm:h-4 bg-neon-lime" />
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 sm:w-4 h-1 bg-neon-lime" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 sm:w-4 h-1 bg-neon-lime" />
            </div>

            {/* Spatial Telemetry Floating Badges */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 pointer-events-auto flex flex-col gap-1.5 font-mono text-[10px] sm:text-[11px]">
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-surface-card/85 backdrop-blur-md border border-white/10 text-zinc-300 flex items-center gap-1.5">
                <Orbit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime animate-spin" />
                <span>ROT: {telemetry.rot}°</span>
              </div>
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-surface-card/85 backdrop-blur-md border border-white/10 text-zinc-400 hidden xs:block">
                <span>VEC: [{telemetry.x}, {telemetry.y}]</span>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 pointer-events-auto">
              <div className="px-3 py-1.5 sm:py-2 rounded-full bg-oled/85 backdrop-blur-xl border border-neon-lime/30 font-mono text-[9px] sm:text-[10px] text-neon-lime flex items-center gap-1.5 shadow-neon-lime">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-ping" />
                <span>TOUCH / SWIPE 3D MODEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Kinetic Marquee Strip */}
      <div className="w-full mt-8 sm:mt-12 border-y border-white/10 py-2.5 sm:py-3 bg-surface-card/40 backdrop-blur-md overflow-hidden flex whitespace-nowrap z-10">
        <div className="flex items-center gap-6 sm:gap-8 animate-marquee text-[11px] sm:text-xs font-mono text-zinc-400 tracking-widest uppercase">
          <span className="flex items-center gap-2 text-white">
            <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime" /> REACT 19 & NEXT.JS ARCHITECTURE
          </span>
          <span className="text-zinc-600">//</span>
          <span className="text-neon-lime">INTEGRATED 3D SPATIAL SCULPTURE</span>
          <span className="text-zinc-600">//</span>
          <span>THREE.JS & WEBGL SHADERS</span>
          <span className="text-zinc-600">//</span>
          <span className="text-neon-lime">120FPS FLUID MOTION</span>
          <span className="text-zinc-600">//</span>
          <span>DISTRIBUTED SYSTEMS IN RUST & GO</span>
          <span className="text-zinc-600">//</span>
          <span>AWWWARDS SITE OF THE DAY RECIPIENT</span>
          <span className="text-zinc-600">//</span>
          <span>ZERO-RUNTIME OVERHEAD STACK</span>
          <span className="text-zinc-600">//</span>
          <span className="flex items-center gap-2 text-white">
            <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime" /> REACT 19 & NEXT.JS ARCHITECTURE
          </span>
          <span className="text-zinc-600">//</span>
          <span className="text-neon-lime">INTEGRATED 3D SPATIAL SCULPTURE</span>
          <span className="text-zinc-600">//</span>
          <span>THREE.JS & WEBGL SHADERS</span>
        </div>
      </div>
    </section>
  );
}
