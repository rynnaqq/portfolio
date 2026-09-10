import React from 'react';
import { portfolioContent } from '../../content/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from './ProjectCard';

export const WorkSection: React.FC = () => {
  const { projects, featuredProjectIds, labels } = portfolioContent;

  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is typeof projects[0] => Boolean(p));

  const firstProject = featuredProjects[0];
  const otherProjects = featuredProjects.slice(1);

  return (
    <section id="work" aria-label="Proyek Pilihan" className="py-16 md:py-24 border-b-2 border-text bg-bg">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <SectionHeader
          id="work-heading"
          title={labels.navWork}
          subtitle="Karya pilihan dengan studi kasus mendalam mengenai masalah, keputusan teknis, dan kontribusi langsung."
          number="01"
        />

        {/* First Project: Full Width Editorial Presentation */}
        {firstProject && (
          <div className="mb-10">
            <ProjectCard project={firstProject} featuredIndex={0} />
          </div>
        )}

        {/* Subsequent Projects: 2-Column Responsive Grid */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {otherProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featuredIndex={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
