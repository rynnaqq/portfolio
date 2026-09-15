import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Disc, Eye, Shapes } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GlobalCanvas3D({
  activeSection = 'hero',
  themeAccent = '#CCFF00',
  currentGeometry = 'icosahedron',
  onGeometryChange,
}) {
  const canvasRef = useRef(null);
  const [visualMode, setVisualMode] = useState('hybrid'); // 'hybrid' | 'wireframe' | 'particles'
  const [activeShape, setActiveShape] = useState(currentGeometry);

  const modeRef = useRef(visualMode);
  modeRef.current = visualMode;

  const shapeRef = useRef(activeShape);
  shapeRef.current = activeShape;

  const themeRef = useRef(themeAccent);
  themeRef.current = themeAccent;

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const isMobile = window.innerWidth < 768;

    // 1. SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 52 : 45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 9.2 : 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. ROOT GROUP (Follows scroll & section coordinates)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. MAIN SCULPTURE GROUP
    const sculptureGroup = new THREE.Group();
    rootGroup.add(sculptureGroup);

    // GEOMETRIES DICTIONARY
    const geometries = {
      icosahedron: {
        core: new THREE.IcosahedronGeometry(isMobile ? 1.3 : 1.55, 1),
        wire: new THREE.IcosahedronGeometry(isMobile ? 1.7 : 2.0, 2),
      },
      torusKnot: {
        core: new THREE.TorusKnotGeometry(isMobile ? 1.0 : 1.2, 0.32, 100, 16),
        wire: new THREE.TorusKnotGeometry(isMobile ? 1.15 : 1.35, 0.36, 60, 12),
      },
      octahedron: {
        core: new THREE.OctahedronGeometry(isMobile ? 1.4 : 1.65, 0),
        wire: new THREE.OctahedronGeometry(isMobile ? 1.8 : 2.1, 1),
      },
      sphere: {
        core: new THREE.SphereGeometry(isMobile ? 1.25 : 1.5, 32, 32),
        wire: new THREE.SphereGeometry(isMobile ? 1.65 : 1.95, 16, 16),
      },
    };

    // A. Glossy Core
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e0e14,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      wireframe: false,
    });
    let coreMesh = new THREE.Mesh(geometries.icosahedron.core, coreMat);
    sculptureGroup.add(coreMesh);

    // B. Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(themeAccent),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    let wireMesh = new THREE.Mesh(geometries.icosahedron.wire, wireMat);
    sculptureGroup.add(wireMesh);

    // C. Gyroscopic Cyber Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(isMobile ? 2.3 : 2.7, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(isMobile ? 2.7 : 3.1, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(isMobile ? 2.0 : 2.3, 0.015, 16, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(themeAccent),
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    sculptureGroup.add(ring3);

    // 4. SATELLITE 3D SHAPES
    const satellites = [];
    const satelliteCount = isMobile ? 7 : 14;
    const satelliteGeos = [
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.TorusGeometry(0.3, 0.08, 12, 24),
    ];

    const satelliteMats = [
      new THREE.MeshPhysicalMaterial({ color: 0x08080a, metalness: 0.9, roughness: 0.2, clearcoat: 1 }),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(themeAccent), wireframe: true }),
      new THREE.MeshPhysicalMaterial({ color: 0x7928ca, metalness: 0.8, roughness: 0.1 }),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true }),
    ];

    for (let i = 0; i < satelliteCount; i++) {
      const geo = satelliteGeos[i % satelliteGeos.length];
      const mat = satelliteMats[i % satelliteMats.length];
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 3.2 + (i % 4) * 0.8;
      const height = ((i % 5) - 2) * 1.0;

      mesh.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      mesh.userData = {
        angle,
        radius,
        height,
        speed: 0.003 + (i % 4) * 0.002,
        rotSpeedX: 0.01 * (i % 2 === 0 ? 1 : -1),
        rotSpeedY: 0.015 * (i % 3 === 0 ? 1 : -1),
      };

      rootGroup.add(mesh);
      satellites.push(mesh);
    }

    // 5. DEEP SPACE PARTICLE CONSTELLATION
    const particleCount = isMobile ? 550 : 1000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cAccent = new THREE.Color(themeAccent);
    const cPurple = new THREE.Color(0x7928ca);
    const cBlue = new THREE.Color(0x0070f3);
    const cCyan = new THREE.Color(0x00f0ff);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const px = (Math.random() - 0.5) * 26;
      const py = (Math.random() - 0.5) * 20;
      const pz = (Math.random() - 0.5) * 18;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      originalPositions[i * 3] = px;
      originalPositions[i * 3 + 1] = py;
      originalPositions[i * 3 + 2] = pz;

      const rand = Math.random();
      const col = rand > 0.75 ? cAccent : rand > 0.55 ? cPurple : rand > 0.35 ? cCyan : rand > 0.15 ? cBlue : cWhite;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const accentLight = new THREE.PointLight(new THREE.Color(themeAccent), 5, 20);
    accentLight.position.set(4, 3, 3);
    scene.add(accentLight);

    const purpleLight = new THREE.PointLight(0x7928ca, 7, 22);
    purpleLight.position.set(-5, -3, 2);
    scene.add(purpleLight);

    const mouseLight = new THREE.PointLight(0x00f0ff, 4, 14);
    scene.add(mouseLight);

    // 7. TOUCH & MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let targetTouchRotX = 0;
    let targetTouchRotY = 0;
    let smoothedTouchRotX = 0;
    let smoothedTouchRotY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseLight.position.x = targetMouseX * 5;
      mouseLight.position.y = targetMouseY * 4;
      mouseLight.position.z = 2.5;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isTouching = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouching || e.touches.length !== 1) return;
      const curX = e.touches[0].clientX;
      const curY = e.touches[0].clientY;
      const dx = curX - touchStartX;
      const dy = curY - touchStartY;

      // Only apply horizontal touch drag to 3D rotation, leaving vertical gestures for buttery smooth page scrolling!
      if (Math.abs(dx) > Math.abs(dy) * 0.7) {
        targetTouchRotY += dx * 0.003;
        touchStartX = curX;
      }
      
      // Gentle subtle lighting shift without wild vertical model tilting
      targetMouseX = ((curX / window.innerWidth) * 2 - 1) * 0.35;
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.02;
      lastScrollY = currentScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = currentScrollY / maxScroll;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobileNow = width < 768;
      camera.fov = mobileNow ? 52 : 45;
      camera.position.z = mobileNow ? 9.2 : 8;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. SECTION TARGET DEFINITIONS (PERFECTLY ADAPTIVE FOR MOBILE & DESKTOP)
    // On mobile, the 3D model stays centered (x: 0) and slightly recessed so it shines through glass cards
    const getSectionTargets = (isMob) => ({
      hero: isMob
        ? { x: 0.0, y: 0.05, z: -1.0, scale: 0.86, rx: 0.1, ry: 0, rz: 0 }
        : { x: 2.1, y: 0.1, z: 0, scale: 1.0, rx: 0.1, ry: 0, rz: 0 },
      about: isMob
        ? { x: 0.0, y: -0.15, z: -2.0, scale: 0.9, rx: 0.4, ry: 1.2, rz: 0.2 }
        : { x: -2.3, y: -0.3, z: -0.8, scale: 1.15, rx: 0.4, ry: 1.2, rz: 0.2 },
      stack: isMob
        ? { x: 0.0, y: 0.15, z: -2.0, scale: 0.86, rx: -0.3, ry: 2.5, rz: -0.4 }
        : { x: 2.4, y: 0.5, z: -1.0, scale: 1.05, rx: -0.3, ry: 2.5, rz: -0.4 },
      projects: isMob
        ? { x: 0.0, y: -0.15, z: -2.1, scale: 0.9, rx: 0.6, ry: 3.8, rz: 0.3 }
        : { x: -2.2, y: -0.5, z: -1.2, scale: 1.25, rx: 0.6, ry: 3.8, rz: 0.3 },
      contact: isMob
        ? { x: 0.0, y: 0.1, z: -1.8, scale: 0.86, rx: 0.2, ry: 5.2, rz: -0.3 }
        : { x: 2.2, y: -0.4, z: -0.6, scale: 1.1, rx: 0.2, ry: 5.2, rz: -0.3 },
    });

    let previousShape = shapeRef.current;

    // 9. ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Check if shape changed
      if (shapeRef.current !== previousShape) {
        previousShape = shapeRef.current;
        const newGeo = geometries[previousShape] || geometries.icosahedron;
        coreMesh.geometry.dispose();
        wireMesh.geometry.dispose();
        coreMesh.geometry = newGeo.core;
        wireMesh.geometry = newGeo.wire;
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      scrollVelocity *= 0.92;

      // Smooth touch rotation decay (prevents snapping on finger lift)
      smoothedTouchRotX += (targetTouchRotX - smoothedTouchRotX) * 0.06;
      smoothedTouchRotY += (targetTouchRotY - smoothedTouchRotY) * 0.06;
      targetTouchRotX *= 0.95;
      targetTouchRotY *= 0.96;

      // Update theme color
      const activeTheme = new THREE.Color(themeRef.current);
      wireMat.color.lerp(activeTheme, 0.08);
      ring3Mat.color.lerp(activeTheme, 0.08);
      accentLight.color.lerp(activeTheme, 0.08);

      const isMob = window.innerWidth < 768;
      const targets = getSectionTargets(isMob);
      const currentTarget = targets[activeSectionRef.current] || targets.hero;

      rootGroup.position.x += (currentTarget.x + mouseX * 0.35 - rootGroup.position.x) * 0.04;
      rootGroup.position.y += (currentTarget.y + mouseY * 0.25 - rootGroup.position.y) * 0.04;
      rootGroup.position.z += (currentTarget.z - rootGroup.position.z) * 0.04;

      const currentScale = rootGroup.scale.x;
      const newScale = currentScale + (currentTarget.scale - currentScale) * 0.04;
      rootGroup.scale.set(newScale, newScale, newScale);

      const targetRotX = currentTarget.rx - mouseY * 0.35 + smoothedTouchRotX;
      const targetRotY = currentTarget.ry + mouseX * 0.5 + scrollProgress * Math.PI * 2 + smoothedTouchRotY;
      const targetRotZ = currentTarget.rz;

      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.z += (targetRotZ - rootGroup.rotation.z) * 0.04;

      coreMesh.rotation.y += 0.006;
      coreMesh.rotation.x += 0.004;

      wireMesh.rotation.y -= 0.009;
      wireMesh.rotation.z += 0.005;

      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.007;
      ring3.rotation.y += 0.012;

      const pulse = Math.sin(elapsed * 2.5) * 0.05 + 1;
      wireMesh.scale.set(pulse, pulse, pulse);

      satellites.forEach((sat) => {
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = sat.userData.height + Math.sin(elapsed * 2 + sat.userData.angle) * 0.3;

        sat.rotation.x += sat.userData.rotSpeedX;
        sat.rotation.y += sat.userData.rotSpeedY;
      });

      particleSystem.rotation.y += 0.0008;
      particleSystem.position.z = scrollVelocity * 5;

      // Mode Visibility Toggles
      const mode = modeRef.current;
      if (mode === 'wireframe') {
        coreMesh.visible = false;
        wireMesh.visible = true;
        particleSystem.visible = false;
        satellites.forEach((s) => (s.visible = true));
      } else if (mode === 'particles') {
        coreMesh.visible = false;
        wireMesh.visible = false;
        ring1.visible = false;
        ring2.visible = false;
        ring3.visible = false;
        particleSystem.visible = true;
        satellites.forEach((s) => (s.visible = false));
      } else {
        coreMesh.visible = true;
        wireMesh.visible = true;
        ring1.visible = true;
        ring2.visible = true;
        ring3.visible = true;
        particleSystem.visible = true;
        satellites.forEach((s) => (s.visible = true));
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      Object.values(geometries).forEach((g) => {
        g.core.dispose();
        g.wire.dispose();
      });
      coreMat.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      satelliteGeos.forEach((g) => g.dispose());
      satelliteMats.forEach((m) => m.dispose());
    };
  }, []);

  const cycleShape = () => {
    sound.playClick();
    const shapes = ['icosahedron', 'torusKnot', 'octahedron', 'sphere'];
    const nextIdx = (shapes.indexOf(activeShape) + 1) % shapes.length;
    const nextShape = shapes[nextIdx];
    setActiveShape(nextShape);
    if (onGeometryChange) onGeometryChange(nextShape);
  };

  return (
    <>
      {/* Fixed Fullscreen 3D Spatial Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-85 transition-opacity duration-700"
      />

      {/* Floating 3D HUD Controller (Responsive Floating Dock centered on mobile) */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-40 flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-surface-card/95 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-[calc(100vw-20px)] overflow-x-auto scrollbar-none mb-[env(safe-area-inset-bottom)]">
        {/* Cycle Geometry Button */}
        <button
          onClick={cycleShape}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all text-neon-lime hover:bg-white/5 border border-neon-lime/30 shrink-0 active:scale-95"
          title="Morph 3D Geometry"
        >
          <Shapes className="w-3 h-3 text-neon-lime" />
          <span className="uppercase text-[10px] sm:text-xs">{activeShape}</span>
        </button>

        <span className="h-3 w-[1px] bg-white/10 shrink-0" />

        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('hybrid');
          }}
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all shrink-0 active:scale-95 ${
            visualMode === 'hybrid'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
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
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all shrink-0 active:scale-95 ${
            visualMode === 'wireframe'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Wireframe Mesh Mode"
        >
          <Disc className="w-3 h-3" />
          <span>MESH</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('particles');
          }}
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all shrink-0 active:scale-95 ${
            visualMode === 'particles'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Fluid Particles Mode"
        >
          <Eye className="w-3 h-3" />
          <span>FLUID</span>
        </button>
      </div>
    </>
  );
}
