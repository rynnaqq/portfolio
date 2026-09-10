import React from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface SceneControlsProps {
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onRotate?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onReset?: () => void;
  isSceneReady?: boolean;
}

export const SceneControls: React.FC<SceneControlsProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onRotate,
  onReset,
  isSceneReady = false,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Accessible Radio Group for Project Selection */}
      <fieldset className="border border-text/20 p-3 rounded-lg bg-bg/50">
        <legend className="text-xs font-display font-bold uppercase tracking-wider text-text px-2">
          Pilih proyek
        </legend>
        <div className="flex flex-wrap gap-2 mt-1">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <label
                key={proj.id}
                className={`cursor-pointer min-h-[44px] px-3.5 py-2 flex items-center text-xs sm:text-sm font-display font-bold rounded-md border-2 transition-all select-none ${
                  isSelected
                    ? 'border-cobalt bg-cobalt text-white shadow-sm'
                    : 'border-text/30 bg-bg text-text hover:border-text hover:bg-butter/40'
                }`}
              >
                <input
                  type="radio"
                  name="hero-project-selection"
                  value={proj.id}
                  checked={isSelected}
                  onChange={() => onSelectProject(proj.id)}
                  className="sr-only"
                  aria-label={proj.title}
                />
                <span className="truncate max-w-[180px] sm:max-w-[220px]">
                  {proj.title}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* HTML 3D Rotation and Reset Controls */}
      {isSceneReady && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5" aria-label="Kontrol Rotasi Patung">
            <button
              type="button"
              onClick={() => onRotate?.('left')}
              aria-label="Putar kiri"
              className="min-w-[44px] min-h-[44px] p-2 border border-text/40 bg-bg hover:bg-butter rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cobalt text-text"
              title="Putar kiri 15°"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onRotate?.('right')}
              aria-label="Putar kanan"
              className="min-w-[44px] min-h-[44px] p-2 border border-text/40 bg-bg hover:bg-butter rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cobalt text-text"
              title="Putar kanan 15°"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onRotate?.('up')}
              aria-label="Putar atas"
              className="min-w-[44px] min-h-[44px] p-2 border border-text/40 bg-bg hover:bg-butter rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cobalt text-text"
              title="Putar atas 15°"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onRotate?.('down')}
              aria-label="Putar bawah"
              className="min-w-[44px] min-h-[44px] p-2 border border-text/40 bg-bg hover:bg-butter rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cobalt text-text"
              title="Putar bawah 15°"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onReset}
            aria-label="Reset posisi"
            className="min-h-[44px] px-3 py-2 border border-text/40 bg-bg hover:bg-butter rounded-md flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cobalt text-text font-display font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset posisi</span>
          </button>
        </div>
      )}
    </div>
  );
};
