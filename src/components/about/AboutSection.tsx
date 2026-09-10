import React from 'react';
import { portfolioContent } from '../../content/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { SkillGroups } from './SkillGroups';

export const AboutSection: React.FC = () => {
  const { owner, labels } = portfolioContent;

  return (
    <section id="about" aria-label="Tentang Pemilik" className="py-16 md:py-24 border-b-2 border-text bg-bg">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <SectionHeader
          id="about-heading"
          title={labels.navAbout}
          subtitle="Latar belakang profesional, filosofi perancangan, dan kapabilitas teknis yang telah diterapkan."
          number="02"
        />

        {/* Narrative & Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
          <div className="lg:col-span-6 bg-[#FAF6EE] border-2 border-text p-8 rounded-xl shadow-sm">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-tomato block mb-3">
              Biografi Singkat
            </span>
            <p className="text-base sm:text-lg font-body text-text leading-relaxed">
              {owner.bio}
            </p>
          </div>

          <div className="lg:col-span-6 bg-bg border-2 border-text p-8 rounded-xl shadow-sm">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-cobalt block mb-3">
              Pendekatan Kerja
            </span>
            <p className="text-base sm:text-lg font-body text-text leading-relaxed">
              {owner.approach}
            </p>
          </div>
        </div>

        {/* Functional Skills Group */}
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-text mb-6">
            Kapabilitas &amp; Penerapan
          </h3>
          <SkillGroups skillGroups={owner.skillGroups} />
        </div>
      </div>
    </section>
  );
};
