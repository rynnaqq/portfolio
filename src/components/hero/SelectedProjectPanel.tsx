import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface SelectedProjectPanelProps {
  project: Project;
}

export const SelectedProjectPanel: React.FC<SelectedProjectPanelProps> = ({ project }) => {
  return (
    <div
      className="border-2 border-text bg-bg p-6 rounded-lg shadow-sm flex flex-col justify-between min-h-[220px] transition-all duration-150"
      aria-live="polite"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-cobalt">
            Proyek Aktif
          </span>
          {project.year && (
            <span className="text-xs font-body text-text-muted">
              {project.year}
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm font-body text-text-muted mb-3 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>
        <p className="text-xs font-body text-text font-semibold">
          <span className="text-text-muted font-normal">Peran: </span>
          {project.role}
        </p>
      </div>

      <div className="pt-4 mt-2 border-t border-text/10">
        <Link
          to={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-cobalt hover:text-tomato focus:outline-none focus:ring-2 focus:ring-cobalt rounded py-1 px-1 -ml-1 transition-colors"
        >
          <span>Lihat detail {project.title}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
