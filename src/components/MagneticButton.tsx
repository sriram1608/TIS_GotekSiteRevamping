import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Strength factor of magnetic pull, default 0.35
  id?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  id
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for direct spring mapping
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Interactive springs
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    // Calculate center of the button container
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Relative distance to center
    const relativeX = clientX - centerX;
    const relativeY = clientY - centerY;

    // Apply strength pull
    x.set(relativeX * strength);
    y.set(relativeY * strength);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <div
      ref={containerRef}
      id={id ? `${id}-container` : undefined}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        id={id}
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
