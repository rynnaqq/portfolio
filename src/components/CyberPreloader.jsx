import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

export default function CyberPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL RUNTIME...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasLoaded = sessionStorage.getItem('kv_preloader_seen');
    if (hasLoaded) {
      onComplete();
      setIsDone(true);
      return;
    }

    const statuses = [
      { at: 15, text: 'ALLOCATING WEBGL2 BUFFERS...' },
      { at: 40, text: 'COMPILING GLSL SHADER PIPELINES...' },
      { at: 70, text: 'CALIBRATING GYROSCOPIC INERTIA...' },
      { at: 90, text: 'SYNCHRONIZING SPATIAL TELEMETRY...' },
      { at: 100, text: 'CORE OPERATIONAL // READY' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 4;
        if (next >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('kv_preloader_seen', 'true');
          setTimeout(() => {
            sound.playSuccess();
            setIsDone(true);
            onComplete();
          }, 350);
          return 100;
        }

        const match = statuses.find((s) => next >= s.at && prev < s.at);
        if (match) {
          setStatusText(match.text);
          sound.playHover();
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-oled flex flex-col justify-between p-6 sm:p-12 select-none pointer-events-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
            <span className="text-white font-bold tracking-widest">KV // BOOT_SEQUENCE</span>
          </div>
          <span>V2.4.0 (x86_64)</span>
        </div>

        {/* Center Progress & Kinetic Monogram */}
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="flex items-baseline justify-between font-display text-5xl sm:text-7xl font-black text-white">
            <span className="gradient-headline">KV//01</span>
            <span className="font-mono text-3xl sm:text-4xl text-neon-lime">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-neon-lime shadow-[0_0_15px_#CCFF00]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Log Status */}
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="text-neon-lime">&gt;</span>
              <span>{statusText}</span>
            </span>
          </div>
        </div>

        {/* Bottom Skip Action */}
        <div className="flex items-center justify-between font-mono text-xs text-zinc-600 border-t border-white/10 pt-4">
          <span>DISPLAY-P3 / OLED CERTIFIED</span>
          <button
            onClick={() => {
              sessionStorage.setItem('kv_preloader_seen', 'true');
              setIsDone(true);
              onComplete();
            }}
            className="text-zinc-400 hover:text-neon-lime transition-colors uppercase tracking-wider"
          >
            [SKIP INTRO]
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
