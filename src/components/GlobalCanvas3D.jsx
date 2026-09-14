import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Disc, Eye, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GlobalCanvas3D({ activeSection = 'hero' }) {
  const canvasRef = useRef(null);
  const [visualMode, setVisualMode] = useState('hybrid'); // 'hybrid' | 'wireframe' | 'particles'
  const modeRef = useRef(visualMode);
  modeRef.current = visualMode;

  // Section targets for 3D camera / object coordinates
  const sectionTargets = {
    hero: { x: 2.0, y: 0.1, z: 0, scale: 1.0, rx: 0.1, ry: 0, rz: 0 },
    about: { x: -2.2, y: -0.3, z: -0.8, scale: 1.15, rx: 0.4, ry: 1.2, rz: 0.2 },
    stack: { x: 2.3, y: 0.5, z: -1.0, scale: 1.05, rx: -0.3, ry: 2.5, rz: -0.4 },
    projects: { x: -2.1, y: -0.5, z: -1.2, scale: 1.25, rx: 0.6, ry: 3.8, rz: 0.3 },
    contact: { x: 2.1, y: -0.4, z: -0.6, scale: 1.1, rx: 0.2, ry: 5.2, rz: -0.3 },
  };

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // 1. SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. ROOT GROUP (Follows scroll & section coordinates)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. MAIN SCULPTURE GROUP
    const sculptureGroup = new THREE.Group();
    rootGroup.add(sculptureGroup);

    // A. Glossy Core Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x111116,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // B. Neon Lime Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.9, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // C. Gyroscopic Cyber Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.025, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    sculptureGroup.add(ring3);

    // 4. FLOATING SATELLITE 3D SHAPES (Distributed throughout space)
    const satellites = [];
    const satelliteGeos = [
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.TorusGeometry(0.3, 0.08, 12, 32),
      new THREE.OctahedronGeometry(0.25, 0),
    ];

    const satelliteMats = [
      new THREE.MeshPhysicalMaterial({ color: 0x08080a, metalness: 0.9, roughness: 0.2, clearcoat: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xccff00, wireframe: true }),
      new THREE.MeshPhysicalMaterial({ color: 0x7928ca, metalness: 0.8, roughness: 0.1 }),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true }),
      new THREE.MeshPhysicalMaterial({ color: 0x1a1a24, metalness: 0.95, roughness: 0.1 }),
    ];

    for (let i = 0; i < 14; i++) {
      const geo = satelliteGeos[i % satelliteGeos.length];
      const mat = satelliteMats[i % satelliteMats.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Distribute in a wider orbital cloud
      const angle = (i / 14) * Math.PI * 2;
      const radius = 3.6 + (i % 5) * 0.9;
      const height = ((i % 7) - 3) * 1.1;

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

    // 5. GLOBAL DEEP SPACE PARTICLE CONSTELLATION
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cLime = new THREE.Color(0xccff00);
    const cPurple = new THREE.Color(0x7928ca);
    const cBlue = new THREE.Color(0x0070f3);
    const cCyan = new THREE.Color(0x00f0ff);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Wide volume covering entire screen
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const rand = Math.random();
      const col = rand > 0.8 ? cLime : rand > 0.6 ? cPurple : rand > 0.4 ? cCyan : rand > 0.2 ? cBlue : cWhite;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const neonLimeLight = new THREE.PointLight(0xccff00, 5, 20);
    neonLimeLight.position.set(4, 3, 3);
    scene.add(neonLimeLight);

    const neonPurpleLight = new THREE.PointLight(0x7928ca, 8, 22);
    neonPurpleLight.position.set(-5, -3, 2);
    scene.add(neonPurpleLight);

    const mouseLight = new THREE.PointLight(0x00f0ff, 4, 14);
    scene.add(mouseLight);

    // 7. MOUSE & SCROLL TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseLight.position.x = targetMouseX * 5;
      mouseLight.position.y = targetMouseY * 4;
      mouseLight.position.z = 2.5;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Determine section target
      const currentTarget = sectionTargets[activeSectionRef.current] || sectionTargets.hero;

      // Adjust for mobile screens: keep 3D shape centered and smaller
      const isMobile = window.innerWidth < 768;
      const targetPosX = isMobile ? currentTarget.x * 0.3 : currentTarget.x;
      const targetPosY = isMobile ? currentTarget.y + 0.5 : currentTarget.y;
      const targetScale = isMobile ? currentTarget.scale * 0.75 : currentTarget.scale;

      // Smoothly interpolate rootGroup position and rotation to section targets
      rootGroup.position.x += (targetPosX + mouseX * 0.4 - rootGroup.position.x) * 0.04;
      rootGroup.position.y += (targetPosY + mouseY * 0.3 - rootGroup.position.y) * 0.04;
      rootGroup.position.z += (currentTarget.z - rootGroup.position.z) * 0.04;

      const currentScale = rootGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.04;
      rootGroup.scale.set(newScale, newScale, newScale);

      // Section target rotation + continuous idle rotation + mouse parallax
      const targetRotX = currentTarget.rx - mouseY * 0.4;
      const targetRotY = currentTarget.ry + mouseX * 0.6 + scrollProgress * Math.PI * 2;
      const targetRotZ = currentTarget.rz;

      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.z += (targetRotZ - rootGroup.rotation.z) * 0.04;

      // Internal sculpture continuous autonomous motion
      coreMesh.rotation.y += 0.006;
      coreMesh.rotation.x += 0.004;

      wireMesh.rotation.y -= 0.009;
      wireMesh.rotation.z += 0.005;

      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.007;
      ring3.rotation.y += 0.012;

      // Breathing pulse on wireframe
      const pulse = Math.sin(elapsed * 2.5) * 0.05 + 1;
      wireMesh.scale.set(pulse, pulse, pulse);

      // Orbiting satellite shapes
      satellites.forEach((sat) => {
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = sat.userData.height + Math.sin(elapsed * 2 + sat.userData.angle) * 0.3;

        sat.rotation.x += sat.userData.rotSpeedX;
        sat.rotation.y += sat.userData.rotSpeedY;
      });

      // Ambient particle slow drifting
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
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

  return (
    <>
      {/* Fixed Fullscreen 3D Spatial Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-85 transition-opacity duration-700"
      />

      {/* Floating 3D HUD Controller (Bottom Left Dock) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-surface-card/85 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-zinc-400 border-r border-white/10">
          <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
          <span className="hidden md:inline">SPATIAL 3D:</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('hybrid');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'hybrid'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Hybrid Mode (Glossy + Wireframe + Particles)"
        >
          <Sparkles className="w-3 h-3" />
          <span>HYBRID</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('wireframe');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'wireframe'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Wireframe Matrix Mode"
        >
          <Disc className="w-3 h-3" />
          <span>MESH</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setVisualMode('particles');
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            visualMode === 'particles'
              ? 'bg-neon-lime text-black font-bold shadow-neon-lime'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Cosmic Particles Mode"
        >
          <Eye className="w-3 h-3" />
          <span>FLUID</span>
        </button>
      </div>
    </>
  );
}
