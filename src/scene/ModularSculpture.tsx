import React, { useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { isClickCandidate, Point } from './gestureUtils';
import type { SceneBinding } from '../types/portfolio';

interface ModularSculptureProps {
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  sceneBindings: SceneBinding[];
}

export const ModularSculpture: React.FC<ModularSculptureProps> = ({
  selectedProjectId,
  onSelectProject,
  sceneBindings,
}) => {
  const pointerStartRef = useRef<Record<string, Point>>({});
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const getBindingFor = (partId: string): SceneBinding | undefined => {
    return sceneBindings.find((b) => b.partId === partId);
  };

  const handlePointerDown = (partId: string, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    pointerStartRef.current[partId] = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (partId: string, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const startPoint = pointerStartRef.current[partId];
    if (startPoint) {
      const currentPoint = { x: e.clientX, y: e.clientY };
      if (isClickCandidate(startPoint, currentPoint, 8)) {
        const binding = getBindingFor(partId);
        if (binding) {
          onSelectProject(binding.projectId);
        }
      }
    }
    delete pointerStartRef.current[partId];
  };

  const part1Binding = getBindingFor('part-cube');
  const part2Binding = getBindingFor('part-sphere');
  const part3Binding = getBindingFor('part-ring');
  const part4Binding = getBindingFor('part-arc');

  const isPart1Selected = part1Binding?.projectId === selectedProjectId;
  const isPart2Selected = part2Binding?.projectId === selectedProjectId;
  const isPart3Selected = part3Binding?.projectId === selectedProjectId;
  const isPart4Selected = part4Binding?.projectId === selectedProjectId;

  return (
    <group position={[0, -0.2, 0]}>
      {/* Ground Shadow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.12} />
      </mesh>

      {/* Part 4: Curved Arch (Mint Green) */}
      <group position={[0.2, 0.4, -0.4]} rotation={[0.4, 0.3, -0.2]}>
        <mesh
          castShadow
          receiveShadow
          onPointerDown={(e) => handlePointerDown('part-arc', e)}
          onPointerUp={(e) => handlePointerUp('part-arc', e)}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('part-arc');
          }}
          onPointerOut={() => setHoveredPart(null)}
          scale={isPart4Selected ? 1.06 : 1}
        >
          <torusGeometry args={[1.3, 0.22, 24, 48, Math.PI]} />
          <meshStandardMaterial
            color="#B8D8C7"
            roughness={0.4}
            metalness={0.05}
            emissive={isPart4Selected ? '#2146D9' : hoveredPart === 'part-arc' ? '#333333' : '#000000'}
            emissiveIntensity={isPart4Selected ? 0.35 : 0.15}
          />
        </mesh>
      </group>

      {/* Part 1: Soft-Cornered Box (Cobalt Blue) - Project 1 */}
      <group position={[-0.4, -0.2, 0.2]} rotation={[-0.1, -0.2, 0.05]}>
        <mesh
          castShadow
          receiveShadow
          onPointerDown={(e) => handlePointerDown('part-cube', e)}
          onPointerUp={(e) => handlePointerUp('part-cube', e)}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('part-cube');
          }}
          onPointerOut={() => setHoveredPart(null)}
          scale={isPart1Selected ? 1.06 : 1}
        >
          <boxGeometry args={[1.4, 1.4, 1.4]} />
          <meshStandardMaterial
            color="#2146D9"
            roughness={0.35}
            metalness={0.05}
            emissive={isPart1Selected ? '#F2D45C' : hoveredPart === 'part-cube' ? '#242424' : '#000000'}
            emissiveIntensity={isPart1Selected ? 0.4 : 0.2}
          />
        </mesh>
      </group>

      {/* Part 2: Sphere (Tomato Red) - Project 2 */}
      <group position={[0.7, 0.6, 0.4]}>
        <mesh
          castShadow
          receiveShadow
          onPointerDown={(e) => handlePointerDown('part-sphere', e)}
          onPointerUp={(e) => handlePointerUp('part-sphere', e)}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('part-sphere');
          }}
          onPointerOut={() => setHoveredPart(null)}
          scale={isPart2Selected ? 1.08 : 1}
        >
          <sphereGeometry args={[0.75, 48, 48]} />
          <meshStandardMaterial
            color="#D83A2F"
            roughness={0.3}
            metalness={0.05}
            emissive={isPart2Selected ? '#FFFFFF' : hoveredPart === 'part-sphere' ? '#333333' : '#000000'}
            emissiveIntensity={isPart2Selected ? 0.35 : 0.15}
          />
        </mesh>
      </group>

      {/* Part 3: Ring / Torus (Butter Yellow) - Project 3 */}
      <group position={[0.5, -0.6, 0.5]} rotation={[Math.PI / 3, 0.2, 0.4]}>
        <mesh
          castShadow
          receiveShadow
          onPointerDown={(e) => handlePointerDown('part-ring', e)}
          onPointerUp={(e) => handlePointerUp('part-ring', e)}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart('part-ring');
          }}
          onPointerOut={() => setHoveredPart(null)}
          scale={isPart3Selected ? 1.08 : 1}
        >
          <torusGeometry args={[0.7, 0.24, 24, 48]} />
          <meshStandardMaterial
            color="#F2D45C"
            roughness={0.35}
            metalness={0.05}
            emissive={isPart3Selected ? '#D83A2F' : hoveredPart === 'part-ring' ? '#242424' : '#000000'}
            emissiveIntensity={isPart3Selected ? 0.4 : 0.15}
          />
        </mesh>
      </group>
    </group>
  );
};
