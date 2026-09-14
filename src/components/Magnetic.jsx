import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
  onClick,
  onMouseEnter,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = (e) => {
    sound.playHover();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.2 }}
      className={`inline-block ${className}`}
      data-cursor-magnetic="true"
      {...props}
    >
      {children}
    </motion.div>
  );
}
