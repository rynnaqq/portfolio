import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Card3D({
  children,
  className = '',
  maxRotation = 6,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(touchCheck);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.15,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: isTouchDevice ? 'flat' : 'preserve-3d',
        perspective: isTouchDevice ? 'none' : 1000,
      }}
      animate={
        isTouchDevice
          ? {}
          : {
              rotateX,
              rotateY,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.4,
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Specular 3D Glare Sheen (Desktop) */}
      {glare && !isTouchDevice && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(204, 255, 0, ${glarePosition.opacity}), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
