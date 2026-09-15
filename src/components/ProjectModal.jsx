import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    sound.playSuccess();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && project?.gallery) {
        setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
      }
      if (e.key === 'ArrowLeft' && project?.gallery) {
        setActiveImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const nextImage = () => {
    sound.playClick();
    setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    sound.playClick();
    setActiveImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-oled/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-surface-card border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 custom-scrollbar"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-surface-card/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-[11px] sm:text-xs text-neon-lime uppercase tracking-widest">
                // DOSSIER: {project.id}
              </span>
              {project.award && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neon-lime/10 border border-neon-lime/30 text-[10px] font-mono text-neon-lime">
                  <Award className="w-3 h-3" />
                  {project.award}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-full bg-surface-200 border border-white/10 hover:border-neon-lime text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Gallery Image Display */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[16/10] sm:aspect-video border border-white/10 group">
              <img
                src={project.gallery[activeImageIndex]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gallery Navigation Controls */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-neon-lime hover:text-black transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-neon-lime hover:text-black transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Thumbnail Indicators */}
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                    {project.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sound.playClick();
                          setActiveImageIndex(i);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === activeImageIndex ? 'bg-neon-lime w-5' : 'bg-white/40 w-1.5'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Title & Category */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neon-lime text-black font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1.5 hover:shadow-neon-lime transition-all"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-surface-200 border border-white/10 text-zinc-300 hover:text-neon-lime hover:border-neon-lime transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="font-mono text-xs sm:text-sm text-neon-lime">{project.subtitle}</p>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-oled/80 border border-white/10">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-2 sm:p-3 text-left">
                  <div className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase">{metric.label}</div>
                  <div className="font-display text-lg sm:text-2xl font-black text-white mt-0.5 sm:mt-1 text-neon-lime">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-200/50 border border-white/5 space-y-2">
                <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  THE ARCHITECTURAL CHALLENGE
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{project.challenge}</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-surface-200/50 border border-white/5 space-y-2">
                <span className="font-mono text-xs text-neon-lime font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-neon-lime" />
                  THE ENGINEERING SOLUTION
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-widest block mb-2.5">
                // APPLIED TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-surface-200 border border-white/10 font-mono text-[11px] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
