import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Disc } from 'lucide-react';
import { sound } from '../utils/sound';

export default function InteractiveCanvas() {
  const containerRef = useRef(null);
  const [visualMode, setVisualMode] = useState('hybrid'); // 'hybrid' | 'wireframe' | 'particles'
  const modeRef = useRef(visualMode);
  modeRef.current = visualMode;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // GROUPS & OBJECTS
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Glossy Icosahedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x121216,
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Neon Lime Cyber Wireframe Cage
    const wireGeometry = new THREE.IcosahedronGeometry(2.1, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    mainGroup.add(wireMesh);

    // 3. Surrounding Orbital Rings (Torus)
    const ringGeometry = new THREE.TorusGeometry(3.0, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3 })
    );
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 4. High-Density Particle Constellation
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xccff00); // Lime
    const color2 = new THREE.Color(0x7928ca); // Purple
    const color3 = new THREE.Color(0x00f0ff); // Cyan

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution around center
      const radius = 2.4 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? color1 : Math.random() > 0.5 ? color2 : color3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const neonLight1 = new THREE.PointLight(0xccff00, 4, 15);
    neonLight1.position.set(3, 3, 3);
    scene.add(neonLight1);

    const neonLight2 = new THREE.PointLight(0x7928ca, 6, 15);
    neonLight2.position.set(-4, -2, 2);
    scene.add(neonLight2);

    const mouseLight = new THREE.PointLight(0x00f0ff, 3, 10);
    scene.add(mouseLight);

    // MOUSE & DRAG PHYSICS
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let mouseNDC = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDC = { x, y };

      // Move point light to track cursor in 3D space
      mouseLight.position.x = x * 4;
      mouseLight.position.y = y * 4;
      mouseLight.position.z = 2.5;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        targetRotationY = x * 0.6;
        targetRotationX = -y * 0.6;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // INTERSECTION OBSERVER TO PAUSE RENDER LOOP WHEN OFF-SCREEN (100% CPU/GPU EFFICIENCY)
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip work when off-screen

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerping to mouse / drag target
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Autonomous idle oscillation
      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x += 0.003;

      wireMesh.rotation.y -= 0.007;
      wireMesh.rotation.z += 0.004;

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;

      particleSystem.rotation.y += 0.0015;

      // Breathing pulse on wireframe
      const pulse = Math.sin(elapsedTime * 2.5) * 0.05 + 1;
      wireMesh.scale.set(pulse, pulse, pulse);

      // Mode visibility updates
      const currentMode = modeRef.current;
      if (currentMode === 'wireframe') {
        coreMesh.visible = false;
        wireMesh.visible = true;
        particleSystem.visible = false;
        ring1.visible = true;
        ring2.visible = true;
      } else if (currentMode === 'particles') {
        coreMesh.visible = false;
        wireMesh.visible = false;
        particleSystem.visible = true;
        ring1.visible = false;
        ring2.visible = false;
      } else {
        coreMesh.visible = true;
        wireMesh.visible = true;
        particleSystem.visible = true;
        ring1.visible = true;
        ring2.visible = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor-canvas="true"
      className="relative w-full h-[450px] md:h-[620px] lg:h-[720px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Visual Canvas Mode Pill Switcher */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-surface-card/80 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('hybrid');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'hybrid'
              ? 'bg-neon-lime text-black font-semibold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Hybrid Mode"
        >
          <Sparkles className="w-3 h-3" />
          <span>HYBRID</span>
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('wireframe');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'wireframe'
              ? 'bg-neon-lime text-black font-semibold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Wireframe Mesh"
        >
          <Disc className="w-3 h-3" />
          <span>MESH</span>
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('particles');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'particles'
              ? 'bg-neon-lime text-black font-semibold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Particle Field"
        >
          <Eye className="w-3 h-3" />
          <span>FLUID</span>
        </button>
      </div>

      {/* Floating HUD Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-3 font-mono text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-ping" />
          <span>WEBGL2 KINETIC CORE</span>
        </span>
        <span className="text-zinc-700">|</span>
        <span>DRAG TO ROTATE SCULPTURE</span>
      </div>
    </div>
  );
}
