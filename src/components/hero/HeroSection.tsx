import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Mail } from 'lucide-react';
import { portfolioContent } from '../../content/portfolio';
import { SelectedProjectPanel } from './SelectedProjectPanel';
import { SceneControls } from './SceneControls';
import { SceneBoundary } from '../../scene/SceneBoundary';

interface HeroSectionProps {
  renderScene?: (props: {
    selectedProjectId: string;
    onSelectProject: (id: string) => void;
    rotationTrigger: { direction?: 'left' | 'right' | 'up' | 'down'; count: number } | null;
    resetTrigger: number;
    setIsSceneReady: (ready: boolean) => void;
  }) => React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ renderScene }) => {
  const { owner, labels, projects } = portfolioContent;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0]?.id || ''
  );
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const [rotationTrigger, setRotationTrigger] = useState<{
    direction?: 'left' | 'right' | 'up' | 'down';
    count: number;
  } | null>(null);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleRotate = (direction: 'left' | 'right' | 'up' | 'down') => {
    setRotationTrigger((prev) => ({
      direction,
      count: (prev?.count || 0) + 1,
    }));
  };

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <section aria-label="Hero & Pengantar" className="py-12 md:py-20 border-b-2 border-text bg-bg">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left / Editorial Identity (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-butter text-text text-xs font-display font-bold uppercase tracking-wider mb-6 border border-text">
                Portofolio Profesional
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-text tracking-tight leading-[1.08] mb-4">
                {owner.name}
              </h1>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-cobalt mb-6">
                {owner.profession}
              </h2>

              <p className="text-base sm:text-lg font-body text-text leading-relaxed mb-8 max-w-xl">
                {owner.intro}
              </p>

              {/* CTAs rendered early and accessible */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/#work"
                  className="min-h-[44px] px-6 py-3 bg-cobalt text-white font-display font-bold rounded-lg border-2 border-text shadow-sm hover:bg-cobalt/90 focus:outline-none focus:ring-2 focus:ring-text flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{labels.ctaViewWork}</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>
                <Link
                  to="/#contact"
                  className="min-h-[44px] px-6 py-3 bg-bg text-text font-display font-bold rounded-lg border-2 border-text hover:bg-butter focus:outline-none focus:ring-2 focus:ring-cobalt flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{labels.ctaContactMe}</span>
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Memphis Accent Line */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-text/30 flex items-center gap-3 select-none text-text-muted text-xs font-mono">
              <span className="w-3 h-3 rounded-full bg-tomato"></span>
              <span className="w-3 h-3 bg-butter border border-text"></span>
              <span className="w-3 h-3 rounded-sm bg-cobalt"></span>
              <span>Bauhaus Grid &amp; Kinetic 3D</span>
            </div>
          </div>

          {/* Right / Interactive Visual & 3D Area (7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Visual Sculpture Container with Reserved Aspect Ratio (Zero CLS) */}
            <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-[#EFE9DC] border-2 border-text rounded-xl overflow-hidden relative shadow-sm">
              {renderScene ? (
                renderScene({
                  selectedProjectId,
                  onSelectProject: setSelectedProjectId,
                  rotationTrigger,
                  resetTrigger,
                  setIsSceneReady,
                })
              ) : (
                <SceneBoundary
                  selectedProjectId={selectedProjectId}
                  onSelectProject={setSelectedProjectId}
                  rotationTrigger={rotationTrigger}
                  resetTrigger={resetTrigger}
                  setIsSceneReady={setIsSceneReady}
                />
              )}
            </div>

            {/* Live Synchronized HTML Project Information Panel */}
            {selectedProject && <SelectedProjectPanel project={selectedProject} />}

            {/* HTML Alternative Controls (Radio Group & Rotation Steps) */}
            <SceneControls
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
              onRotate={handleRotate}
              onReset={handleReset}
              isSceneReady={isSceneReady || true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
