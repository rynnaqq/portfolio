import React from 'react';
import type { SkillGroup } from '../../types/portfolio';

interface SkillGroupsProps {
  skillGroups: SkillGroup[];
}

export const SkillGroups: React.FC<SkillGroupsProps> = ({ skillGroups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {skillGroups.map((group, idx) => (
        <div
          key={group.title}
          className="border-2 border-text bg-[#FAF6EE] p-6 rounded-lg shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalt"></span>
              <h4 className="text-base font-display font-bold text-text">
                {group.title}
              </h4>
            </div>
            <ul className="space-y-2">
              {group.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="text-sm font-body text-text-muted flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-text/40 rotate-45"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-text/10 text-[11px] font-mono text-text-muted uppercase">
            Grup Keahlian 0{idx + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
