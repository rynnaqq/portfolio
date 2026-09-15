import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Card3D from './Card3D';
import MiniModelViewer from './MiniModelViewer';
import TextScramble from './TextScramble';

export default function About() {
  const [fps, setFps] = useState(60);

  // Measure real live browser frame rate
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="about" className="py-16 sm:py-28 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-lime tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime" />
              <span>01 // BACKGROUND & METHODOLOGY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              ENGINEERED FOR <br />
              <span className="gradient-cyber">
                <TextScramble text="PURE IMPACT" />
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-sm mt-3 md:mt-0 leading-relaxed">
            Merging avant-garde design aesthetics with relentless full-stack systems engineering. No bloated templates. No compromises.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: Core Narrative Bio (Spans 7 cols on desktop) */}
          <Card3D
            maxRotation={5}
            className="md:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl bg-surface-card/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all shadow-glow-card"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/15 blur-3xl pointer-events-none" />
            
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider block mb-3 sm:mb-4">
                // ARCHITECTURAL DOSSIER
              </span>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6 leading-snug">
                "We treat code as architectural steel, animations as physical inertia, and latency as technical failure."
              </h3>

              <div className="space-y-3 sm:space-y-4 text-zinc-400 font-normal leading-relaxed text-xs sm:text-sm md:text-base">
                <p>
                  Over the past eight years, I have architected digital experiences and cloud-native applications for high-growth tech enterprises, creative studios, and decentralized protocols. My work has been featured on Awwwards, FWA, and GitHub trending.
                </p>
                <p>
                  As a Creative Technologist, I occupy the rare intersection where design precision meets algorithmic rigor. Whether formulating custom GLSL displacement shaders, constructing real-time WebSocket state machines, or tuning database query latencies, my mission is singular: creating software that feels astonishingly fast and unmistakably memorable.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Zero Jank</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Strict 60-120fps render budget on all viewports.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Sub-50ms</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Optimized edge compute & instant data sync.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neon-lime shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Aesthetic</h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Award-winning dark luxury art direction.</p>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Card 2: Interactive 3D Model Inspector + Telemetry HUD (Spans 5 cols on desktop) */}
          <Card3D
            maxRotation={5}
            className="md:col-span-5 p-5 sm:p-8 rounded-3xl bg-surface-card/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between relative shadow-glow-card"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-lime/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[10px] sm:text-xs text-neon-lime uppercase tracking-widest">
                  // 3D KINETIC INSPECTOR & HUD
                </span>
                <Activity className="w-4 h-4 text-neon-lime animate-pulse" />
              </div>

              {/* Dedicated Mini 3D Model Viewer */}
              <div className="mb-3 sm:mb-4">
                <MiniModelViewer title="SPATIAL_GYROSCOPE // V2" />
              </div>

              {/* Live Telemetry Data */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-oled/70 border border-white/5 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-[11px] sm:text-xs">
                  <span className="text-zinc-500">RUNTIME FPS:</span>
                  <span className="text-neon-lime font-bold">{fps} FPS STABLE</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-neon-lime h-full transition-all duration-300"
                    style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-1 text-[10px] sm:text-[11px]">
                  <span className="text-zinc-500">COLOR SPACE:</span>
                  <span className="text-zinc-200">Display-P3 / OLED</span>
                </div>
                <div className="flex justify-between items-center text-[10px] sm:text-[11px]">
                  <span className="text-zinc-500">LOCATION:</span>
                  <span className="text-zinc-200">Tokyo // SF (Remote)</span>
                </div>
                <div className="flex justify-between items-center text-[10px] sm:text-[11px]">
                  <span className="text-zinc-500">SECURITY:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE SSL
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-400">
              <span>STATUS:</span>
              <span className="text-neon-lime font-bold">READY FOR DEPLOYMENT</span>
            </div>
          </Card3D>

          {/* Cards 3 - 6: Metrics & Stat Counters (2x2 grid on mobile, 4 columns on desktop) */}
          <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {portfolioData.stats.map((stat, index) => (
              <Card3D
                key={index}
                maxRotation={8}
                className="h-full p-4 xs:p-5 sm:p-7 rounded-2xl bg-surface-card/80 backdrop-blur-xl border border-white/10 hover:border-neon-lime/40 transition-all group shadow-glow-card"
              >
                <span className="font-mono text-[9px] sm:text-xs text-zinc-500 block mb-1 sm:mb-2">// METRIC_0{index + 1}</span>
                <div className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-neon-lime transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-200 mt-1 sm:mt-2 uppercase tracking-wide">
                  {stat.label}
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 leading-relaxed">{stat.detail}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
