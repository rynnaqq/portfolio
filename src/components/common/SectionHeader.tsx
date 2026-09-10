import React from 'react';

interface SectionHeaderProps {
  id?: string;
  title: string;
  subtitle?: string;
  number?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ id, title, subtitle, number }) => {
  return (
    <div className="mb-12 border-b-2 border-text pb-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={id} className="text-3xl md:text-5xl font-display font-extrabold text-text tracking-tight">
          {title}
        </h2>
        {number && (
          <span className="font-display text-xl md:text-2xl font-bold text-text-muted select-none">
            {number}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-3 text-lg md:text-xl text-text-muted max-w-2xl font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
