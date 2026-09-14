import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  // Position motion values for zero-latency response
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring for outer aura
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e) => {
      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('[data-cursor-project]');
      const canvasArea = target.closest('[data-cursor-canvas]');
      const magneticEl = target.closest('[data-cursor-magnetic]');

      if (projectCard) {
        setCursorType('project');
        setCursorText('VIEW //');
      } else if (canvasArea) {
        setCursorType('canvas');
        setCursorText('ROTATE');
      } else if (magneticEl || clickable) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glowing Trailing Ring / Aura */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'project' ? 2.8 : cursorType === 'hover' ? 1.8 : cursorType === 'canvas' ? 2.2 : 1,
          borderColor: cursorType === 'project' || cursorType === 'hover' ? '#CCFF00' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: cursorType === 'project' ? 'rgba(204, 255, 0, 0.15)' : cursorType === 'hover' ? 'rgba(204, 255, 0, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-zinc-400/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none"
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-neon-lime select-none uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pin-Point Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'hover' || cursorType === 'project' ? 0.3 : 1,
          backgroundColor: cursorType === 'hover' || cursorType === 'project' ? '#CCFF00' : '#FFFFFF',
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#CCFF00] pointer-events-none"
      />
    </div>
  );
}
