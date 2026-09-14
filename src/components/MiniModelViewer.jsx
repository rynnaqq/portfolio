import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Maximize2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function MiniModelViewer({ title = "KINETIC_CORE_PROTOTYPE" }) {
  const mountRef = useRef(null);
  const [wireColor, setWireColor] = useState('#CCFF00');

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Torus Knot Kinetic Sculpture
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.28, 100, 16, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x181820,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(wireColor),
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    scene.add(wireMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xccff00, 3, 10);
    light1.position.set(2, 3, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7928ca, 4, 10);
    light2.position.set(-2, -3, 2);
    scene.add(light2);

    // Interactive Drag
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotSpeedX = 0.008;
    let rotSpeedY = 0.012;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      mesh.rotation.y += deltaX * 0.015;
      mesh.rotation.x += deltaY * 0.015;
      wireMesh.rotation.y = mesh.rotation.y;
      wireMesh.rotation.x = mesh.rotation.x;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Render loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += rotSpeedY;
        mesh.rotation.x += rotSpeedX;
        wireMesh.rotation.y = mesh.rotation.y;
        wireMesh.rotation.x = mesh.rotation.x;
      }
      wireMat.color.set(wireColor);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [wireColor]);

  return (
    <div className="relative w-full rounded-2xl bg-oled/90 border border-white/10 p-4 overflow-hidden">
      {/* HUD Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 border-b border-white/5 pb-2.5 mb-2">
        <span className="flex items-center gap-1.5 text-neon-lime">
          <RotateCw className="w-3 h-3 animate-spin" />
          <span>{title}</span>
        </span>
        <span className="text-zinc-600">DRAG TO INSPECT</span>
      </div>

      {/* 3D Canvas Mount Area */}
      <div
        ref={mountRef}
        className="w-full h-44 cursor-grab active:cursor-grabbing flex items-center justify-center relative"
      />

      {/* Wireframe Color Toggles */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[10px]">
        <span className="text-zinc-500">GLSL SHADER:</span>
        <div className="flex items-center gap-1.5">
          {[
            { label: 'LIME', color: '#CCFF00' },
            { label: 'CYAN', color: '#00F0FF' },
            { label: 'PURPLE', color: '#7928CA' },
          ].map((c) => (
            <button
              key={c.label}
              onClick={() => {
                sound.playClick();
                setWireColor(c.color);
              }}
              className={`px-2 py-0.5 rounded border transition-all ${
                wireColor === c.color
                  ? 'border-white text-white font-bold bg-white/10'
                  : 'border-white/10 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
