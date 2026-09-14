# ⚡ KAELEN VANCE // Futuristic Awwwards Creative Developer Portfolio

An award-winning caliber, dark-luxury, cyber-minimalist developer portfolio and WebGL playground inspired by high-end design studios (Active Theory, Locomotive, Studio Freight).

![License](https://img.shields.io/badge/License-MIT-CCFF00?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-08080A?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-00F0FF?style=for-the-badge&logo=tailwindcss)
![ThreeJS](https://img.shields.io/badge/Three.js-WebGL2-7928CA?style=for-the-badge&logo=threedotjs)

---

## 🎨 Design System & Art Direction

- **Aesthetic**: Dark Luxury / Cyber-Minimalist / Neo-Brutalist Awwwards style
- **Color Palette**:
  - `OLED Black` (`#08080A`): Pure deep background
  - `Dark Zinc Surface` (`#121216`): Layered frosted cards with `rgba(255, 255, 255, 0.08)` borders
  - `Electric Neon Lime` (`#CCFF00`): Primary energy accent & hover states
  - `Cyber Purple & Blue` (`#7928CA` → `#0070F3` → `#00F0FF`): Ambient volumetric glow gradients
- **Typography**:
  - Display / Hero: Oversized kinetic headline typography (`Syne` / `Space Grotesk`)
  - Body & Micro-copy: Monospace & Neo-Grotesque (`JetBrains Mono` / `Plus Jakarta Sans`)

---

## ⚡ Interactive Micro-Interactions & Features

1. **Custom Inertial Cursor**:
   - Dynamic trailing aura + precision dot
   - Context-aware hover tags (`VIEW //`, `ROTATE`, magnetic button snap)
   - Automatic touch-device fallback (disables cursor cleanly on mobile/tablets)

2. **Magnetic Snapping Elements**:
   - CTA buttons and navigation items calculate physics distance from the cursor and snap toward it with spring dynamics.

3. **Three.js WebGL Interactive 3D Canvas**:
   - Interactive glossy Icosahedron sculpture enclosed in a pulsing neon wireframe cage, orbiting rings, and 750 additive blending particles.
   - Real-time mouse inertia tracking and drag-to-rotate physics.
   - Interactive Mode Switcher: **HYBRID**, **MESH**, and **FLUID** particle mode.
   - Power & battery optimization: GPU render loop automatically pauses when scrolled off-screen via `IntersectionObserver`.

4. **Procedural Web Audio Synthesizer**:
   - Zero-dependency, pure procedural Web Audio API sound engine providing tactile cyber clicks, harmonic chords, and subtle hums on user interaction.
   - Polite by default (muted with a clean 1-click audio toggle in the floating navbar).

5. **Glassmorphic Floating Navigation & Mobile Drawer**:
   - Responsive pill navbar with live section scroll-spy indicator.
   - Pulsating green "Available for Work" badge.
   - Fullscreen animated mobile navigation drawer with staggered entrance.

6. **Interactive Developer CLI Terminal**:
   - Embedded interactive terminal emulator in the contact section.
   - Commands: `help`, `about`, `skills`, `projects`, `contact`, `hire`, `matrix`, `whoami`, `clear`.
   - Realistic keystroke sound synthesizer and auto-scroll history.

7. **Project Lightbox / Case Study Modal**:
   - High-impact asymmetric gallery showcase.
   - Expandable modal with interactive image gallery, architectural challenges, engineering solutions, and live performance metrics.

8. **Ultra-Minimal One-Line Luxury Footer**:
   - Coordinates, dynamic current year, live system status, and magnetic "Back to Top" button.

---

## 🛠 Tech Stack

- **Framework**: React 19 (Modern Hooks & Functional Architecture)
- **Styling**: Tailwind CSS with custom cyber tokens, glassmorphism, noise overlays, and scanline grids
- **Animation**: Framer Motion (spring physics, layout transitions, drag interactions)
- **3D & Graphics**: Three.js (WebGL2, custom geometries, point lights, particle systems)
- **Icons**: Lucide React + custom SVG brand icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Architecture Directory Structure

```
├── src/
│   ├── components/
│   │   ├── About.jsx              # Bento-grid narrative, live FPS meter & stat counters
│   │   ├── CustomCursor.jsx       # Trailing glow & dot cursor with touch detection
│   │   ├── Footer.jsx             # Ultra-minimal footer with coordinates & back-to-top
│   │   ├── Hero.jsx               # Kinetic headline, status telemetry, marquee ticker
│   │   ├── Icons.jsx              # Clean brand SVG icons (GitHub, X, LinkedIn, Discord)
│   │   ├── InteractiveCanvas.jsx  # Three.js 3D kinetic mesh, particles, mouse physics
│   │   ├── Magnetic.jsx           # Spring-physics magnetic hover wrapper
│   │   ├── Navbar.jsx             # Glassmorphic pill header with audio & mobile drawer
│   │   ├── ProjectModal.jsx       # Deep-dive case study modal & gallery carousel
│   │   ├── Projects.jsx           # Asymmetric flagship project showcase
│   │   ├── TechStack.jsx          # Interactive capability matrix & glowing filter pills
│   │   └── TerminalContact.jsx    # Glassmorphic contact form + CLI terminal simulator
│   ├── data/
│   │   ├── portfolioData.js       # Bio, stats, philosophy, socials, and coordinates
│   │   ├── projectsData.js        # Detailed flagship case studies with metrics
│   │   └── skillsData.js          # Categorized stack with proficiency indicators
│   ├── utils/
│   │   └── sound.js               # Web Audio API procedural sound synthesizer
│   ├── App.jsx                    # Root layout with scroll-spy orchestration
│   ├── index.css                  # Custom cyber utilities, grain, glassmorphism
│   └── main.jsx                   # Entry point
├── index.html                     # Google Fonts (Syne, Space Grotesk, JetBrains Mono)
├── tailwind.config.js             # Dark luxury OLED palette, custom neon glows & animations
└── vite.config.js                 # Vite production configuration
```
