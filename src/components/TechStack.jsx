import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  FileCode,
  Globe,
  Palette,
  Workflow,
  Box,
  Sparkles,
  PlayCircle,
  Volume2,
  Activity,
  Server,
  Cpu,
  Database,
  Zap,
  Network,
  Boxes,
  Cloud,
  GitBranch,
  Compass,
} from 'lucide-react';
import { skillCategories, skillsList } from '../data/skillsData';
import { sound } from '../utils/sound';
import Card3D from './Card3D';
import TextScramble from './TextScramble';

const iconMap = {
  Layers,
  FileCode,
  Globe,
  Palette,
  Workflow,
  Box,
  Sparkles,
  PlayCircle,
  Volume2,
  Activity,
  Server,
  Cpu,
  Database,
  Zap,
  Network,
  Boxes,
  Cloud,
  GitBranch,
  Compass,
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsList
    : skillsList.filter((s) => s.category === activeCategory);

  const handleCategoryChange = (catId) => {
    sound.playClick();
    setActiveCategory(catId);
  };

  return (
    <section id="stack" className="py-16 sm:py-28 md:py-32 relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-lime tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime" />
              <span>02 // CAPABILITY MATRIX</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              TECHNICAL <br />
              <span className="gradient-headline">
                <TextScramble text="ARSENAL" />
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-sm mt-3 md:mt-0 leading-relaxed">
            High-leverage engineering across the entire modern computing stack. Specializing in WebGL, React internals, and resilient backend microservices.
          </p>
        </div>

        {/* Category Filter Pills (Mobile friendly swipeable horizontal scroll bar) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-12 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap overscroll-x-contain">
          {skillCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
                    : 'bg-surface-card/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <span>{category.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Interactive Glowing 3D Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Sparkles;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="h-full"
                >
                  <Card3D
                    maxRotation={8}
                    onMouseEnter={() => sound.playHover()}
                    className="h-full group relative p-5 sm:p-6 rounded-2xl bg-surface-card/80 backdrop-blur-xl border border-white/10 hover:border-neon-lime/50 transition-all duration-300 hover:shadow-glow-card-hover flex flex-col justify-between overflow-hidden"
                  >
                    {/* Neon illuminate gradient border accent */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-lime/0 to-transparent group-hover:via-neon-lime transition-all duration-500" />
                    
                    <div>
                      {/* Card Top: Icon & Badge */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-200/80 border border-white/10 flex items-center justify-center text-neon-lime group-hover:bg-neon-lime group-hover:text-black group-hover:shadow-neon-lime transition-all duration-300">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/5 font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider group-hover:text-neon-lime group-hover:border-neon-lime/30 transition-colors">
                          {skill.badge}
                        </span>
                      </div>

                      {/* Skill Title */}
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-neon-lime transition-colors">
                        {skill.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 mt-1.5 sm:mt-2 leading-relaxed font-normal">
                        {skill.description}
                      </p>
                    </div>

                    {/* Level Progress Bar & Metric */}
                    <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] mb-1.5 text-zinc-500">
                        <span>PROFICIENCY</span>
                        <span className="text-zinc-300 group-hover:text-neon-lime transition-colors font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-600 group-hover:bg-neon-lime transition-all duration-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
