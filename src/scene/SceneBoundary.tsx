import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { portfolioContent } from '../content/portfolio';

const LazyPortfolioScene = lazy(() => import('./PortfolioScene'));

interface SceneBoundaryProps {
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  rotationTrigger: { direction?: 'left' | 'right' | 'up' | 'down'; count: number } | null;
  resetTrigger: number;
  setIsSceneReady: (ready: boolean) => void;
}

type SceneLifecycleState = 'poster' | 'loading' | 'ready' | 'fallback';

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
    );
  } catch {
    return false;
  }
}

export const SceneBoundary: React.FC<SceneBoundaryProps> = ({
  selectedProjectId,
  onSelectProject,
  rotationTrigger,
  resetTrigger,
  setIsSceneReady,
}) => {
  const [state, setState] = useState<SceneLifecycleState>('poster');
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef<number>(0);

  const { labels } = portfolioContent;

  const initScene = () => {
    if (!isWebGLAvailable()) {
      setState('fallback');
      setIsSceneReady(false);
      return;
    }

    setState('loading');

    // 8-second initialization timeout per PRD FR-10
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setState((curr) => {
        if (curr === 'loading') {
          setIsSceneReady(false);
          return 'fallback';
        }
        return curr;
      });
    }, 8000);
  };

  useEffect(() => {
    initScene();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSceneReady = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState('ready');
    setIsSceneReady(true);
  };

  const handleRetry = () => {
    retryCountRef.current += 1;
    initScene();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#EFE9DC]">
      {/* 1. Fallback State */}
      {state === 'fallback' && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <img
            src="/poster-sculpture.svg"
            alt="Ilustrasi Patung Geometris Modular"
            className="w-48 h-36 object-contain opacity-85 mb-4 select-none pointer-events-none"
          />
          <div className="flex items-center gap-1.5 text-tomato text-xs font-display font-bold uppercase mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{labels.fallback3DTitle}</span>
          </div>
          <p className="text-xs font-body text-text-muted max-w-xs mb-4">
            {labels.fallback3DDesc}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="min-h-[44px] px-4 py-2 border-2 border-text bg-butter hover:bg-butter/80 text-text font-display font-bold text-xs rounded-md shadow-sm inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cobalt active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{labels.retry3DButton}</span>
          </button>
        </div>
      )}

      {/* 2. Poster / Loading State */}
      {(state === 'poster' || state === 'loading') && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center absolute inset-0 z-10 bg-[#EFE9DC]">
          <img
            src="/poster-sculpture.svg"
            alt="Poster Patung Geometris"
            className="w-56 h-40 object-contain mb-4 select-none pointer-events-none"
          />
          <div className="flex items-center gap-2 text-xs font-display font-semibold text-text-muted">
            <span className="w-2 h-2 rounded-full bg-cobalt animate-ping" />
            <span>Memuat tampilan 3D...</span>
          </div>
        </div>
      )}

      {/* 3. Ready State (R3F Canvas rendered when WebGL is active & intersecting) */}
      {state !== 'fallback' && isIntersecting && (
        <Suspense fallback={null}>
          <LazyPortfolioScene
            selectedProjectId={selectedProjectId}
            onSelectProject={onSelectProject}
            rotationTrigger={rotationTrigger}
            resetTrigger={resetTrigger}
            onReady={handleSceneReady}
          />
        </Suspense>
      )}
    </div>
  );
};
