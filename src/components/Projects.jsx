import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/projectsData';
import { sound } from '../utils/sound';
import ProjectModal from './ProjectModal';
import Magnetic from './Magnetic';
import Card3D from './Card3D';
import TextScramble from './TextScramble';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    sound.playClick();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-16 sm:py-28 md:py-32 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon-lime tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-lime" />
              <span>03 // FEATURED WORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              FLAGSHIP <br />
              <span className="gradient-headline">
                <TextScramble text="DEPLOYMENTS" />
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-sm mt-3 md:mt-0 leading-relaxed">
            Select case studies of custom 3D web engines, high-frequency decentralized applications, and cloud orchestration tools.
          </p>
        </div>

        {/* Asymmetric Showcase Grid with 3D Card Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`h-full ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <Card3D
                maxRotation={4}
                className="h-full group relative rounded-3xl bg-surface-card/80 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-neon-lime/40 transition-all duration-500 hover:shadow-glow-card-hover"
              >
                {/* Image Container with Hover Zoom */}
                <div
                  onClick={() => handleOpenProject(project)}
                  data-cursor-project="true"
                  className={`relative overflow-hidden cursor-pointer bg-zinc-950 ${
                    index === 0
                      ? 'aspect-[16/10] sm:aspect-[21/9] min-h-[240px] sm:min-h-[320px] md:min-h-[420px]'
                      : 'aspect-[16/10] min-h-[220px] sm:min-h-[280px]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 opacity-85 group-hover:opacity-100"
                  />

                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/45 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-zinc-300">
                      {project.category}
                    </span>

                    {project.award && (
                      <span className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full bg-neon-lime/90 text-black font-semibold shadow-neon-lime">
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{project.award}</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Overlay Info on Image */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-6 right-3.5 sm:right-6 flex items-end justify-between pointer-events-none">
                    <div>
                      <span className="font-mono text-[10px] sm:text-xs text-neon-lime font-semibold tracking-wider">
                        {project.year} // {project.role}
                      </span>
                      <h3 className="font-display text-lg xs:text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-0.5 sm:mt-1 leading-snug">
                        {project.title}
                      </h3>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-neon-lime group-hover:text-black transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="p-4 xs:p-5 sm:p-8 flex flex-col justify-between flex-grow">
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Metrics Pill Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 sm:mb-6 p-2.5 sm:p-3 rounded-xl bg-oled/60 border border-white/5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-left px-1.5 sm:px-2">
                        <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase">{m.label}</div>
                        <div className="text-xs sm:text-base font-display font-bold text-zinc-100 group-hover:text-neon-lime transition-colors">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-zinc-900 border border-white/5 font-mono text-[10px] sm:text-[11px] text-zinc-400 group-hover:text-zinc-200 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 w-full sm:w-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 sm:p-2.5 rounded-full bg-surface-200 border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-all shrink-0"
                          title="View Source Code"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                          }}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}

                      <Magnetic strength={0.3} className="flex-1 sm:flex-initial">
                        <button
                          onClick={() => handleOpenProject(project)}
                          className="w-full sm:w-auto px-4 py-2 rounded-full bg-surface-200 border border-white/10 text-white font-mono text-xs hover:border-neon-lime hover:text-neon-lime transition-all flex items-center justify-center gap-1.5 active:scale-98"
                        >
                          <span>CASE STUDY</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
