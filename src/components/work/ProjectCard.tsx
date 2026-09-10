import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  featuredIndex?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featuredIndex = 0 }) => {
  const isFirst = featuredIndex === 0;

  return (
    <article
      aria-labelledby={`project-heading-${project.id}`}
      className={`border-2 border-text bg-bg rounded-xl overflow-hidden shadow-sm flex flex-col ${
        isFirst ? 'lg:grid lg:grid-cols-12 gap-0' : ''
      }`}
    >
      {/* Media Cover Container */}
      <div
        className={`bg-[#EFE9DC] border-b-2 lg:border-b-0 border-text flex items-center justify-center p-6 sm:p-8 relative ${
          isFirst ? 'lg:col-span-7 lg:border-r-2' : 'aspect-[16/10]'
        }`}
      >
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center border border-dashed border-text/40 rounded-lg p-6 text-center bg-bg/40">
          <div className="w-16 h-16 rounded-full border-2 border-cobalt bg-butter/60 flex items-center justify-center mb-3">
            <span className="font-display font-extrabold text-cobalt text-lg">
              0{featuredIndex + 1}
            </span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-text-muted">
            {project.cover.caption || 'Pratinjau Proyek'}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className={`p-6 sm:p-8 flex flex-col justify-between ${isFirst ? 'lg:col-span-5' : 'flex-1'}`}>
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-display text-text-muted">
            {project.year && (
              <span className="px-2 py-0.5 border border-text/30 rounded bg-[#FAF6EE]">
                {project.year}
              </span>
            )}
            {project.projectType && (
              <span className="px-2 py-0.5 border border-text/30 rounded bg-[#FAF6EE]">
                {project.projectType}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 id={`project-heading-${project.id}`} className="text-2xl sm:text-3xl font-display font-bold text-text mb-3">
            <Link
              to={`/work/${project.slug}`}
              className="hover:text-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt rounded"
            >
              {project.title}
            </Link>
          </h3>

          {/* Problem */}
          <div className="mb-4">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-tomato block mb-1">
              Masalah
            </span>
            <p className="text-sm font-body text-text-muted leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Role */}
          <div className="mb-4">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-cobalt block mb-1">
              Peran
            </span>
            <p className="text-sm font-body text-text font-medium">
              {project.role}
            </p>
          </div>

          {/* Key Contributions */}
          {project.contributions && project.contributions.length > 0 && (
            <div className="mb-6">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                Kontribusi Utama
              </span>
              <ul className="list-disc list-inside text-xs sm:text-sm font-body text-text-muted space-y-1">
                {project.contributions.slice(0, 2).map((c, i) => (
                  <li key={i} className="line-clamp-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Link to Case Study */}
        <div className="pt-4 border-t border-text/10">
          <Link
            to={`/work/${project.slug}`}
            className="min-h-[44px] px-4 py-2 border-2 border-text bg-bg hover:bg-butter focus:outline-none focus:ring-2 focus:ring-cobalt rounded-lg font-display font-bold text-sm text-text inline-flex items-center justify-between w-full transition-colors"
          >
            <span>Lihat detail {project.title}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
