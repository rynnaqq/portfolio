import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { ModularSculpture } from './ModularSculpture';
import { useSculptureGesture } from './useSculptureGesture';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { portfolioContent } from '../content/portfolio';

interface SceneContainerProps {
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  rotationTrigger: { direction?: 'left' | 'right' | 'up' | 'down'; count: number } | null;
  resetTrigger: number;
  onReady?: () => void;
}

// Inner group component to connect gesture ref to Three group
const InteractiveGroup: React.FC<{
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  rotationRef: React.MutableRefObject<{ yaw: number; pitch: number }>;
  reducedMotion: boolean;
}> = ({ selectedProjectId, onSelectProject, rotationRef, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation unless reduced motion is active
      if (reducedMotion) {
        groupRef.current.rotation.y = rotationRef.current.yaw;
        groupRef.current.rotation.x = rotationRef.current.pitch;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          rotationRef.current.yaw,
          0.12
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          rotationRef.current.pitch,
          0.12
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <ModularSculpture
        selectedProjectId={selectedProjectId}
        onSelectProject={(id) => {
          onSelectProject(id);
          invalidate();
        }}
        sceneBindings={portfolioContent.sceneBindings}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

// Scene ready notifier
const ReadyNotifier: React.FC<{ onReady?: () => void }> = ({ onReady }) => {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
};

export const PortfolioScene: React.FC<SceneContainerProps> = ({
  selectedProjectId,
  onSelectProject,
  rotationTrigger,
  resetTrigger,
  onReady,
}) => {
  const reducedMotion = useReducedMotion();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const {
    rotationRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    resetRotation,
    stepRotate,
  } = useSculptureGesture({
    reducedMotion,
  });

  // Handle external step rotation
  useEffect(() => {
    if (rotationTrigger?.direction) {
      stepRotate(rotationTrigger.direction);
    }
  }, [rotationTrigger, stepRotate]);

  // Handle external reset
  useEffect(() => {
    if (resetTrigger > 0) {
      resetRotation();
    }
  }, [resetTrigger, resetRotation]);

  return (
    <div
      ref={canvasContainerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: 'pan-y pinch-zoom' }}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none relative"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-5, -2, -3]} intensity={0.3} />

        <InteractiveGroup
          selectedProjectId={selectedProjectId}
          onSelectProject={onSelectProject}
          rotationRef={rotationRef}
          reducedMotion={reducedMotion}
        />

        <ReadyNotifier onReady={onReady} />
      </Canvas>
    </div>
  );
};

export default PortfolioScene;
