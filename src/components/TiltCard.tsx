import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dataCursor?: string;
}

export default function TiltCard({
  children,
  className = "",
  id,
  dataCursor
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates: range [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth fluid micro-damping
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Map normalized coordinate coordinates to 3D rotation angles
  // Moving mouse right (positive x) tilts it on the Y-axis so right side goes inward, etc.
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Subtle gloss reflection position mapping
  const glossX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize coordinates to [-0.5, 0.5]
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      id={id ? `${id}-wrapper` : undefined}
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        id={id}
        className={`relative w-full h-full transform-style-3d ${className}`}
        style={{
          rotateX,
          rotateY,
        }}
        data-cursor={dataCursor}
      >
        {/* Subtle high-end physical shine overlay following cursor */}
        <motion.div
          id={id ? `${id}-shine` : undefined}
          className="absolute inset-0 rounded-xl pointer-events-none z-[3] opacity-25"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([gX, gY]) => `radial-gradient(circle at ${gX} ${gY}, rgba(204, 255, 0, 0.15) 0%, transparent 60%)`
            ),
          }}
        />
        
        {/* Children content renders on 3D layer */}
        <div className="h-full w-full z-[2] relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
