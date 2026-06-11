import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function BackgroundBlob() {
  const blobX = useMotionValue(-200);
  const blobY = useMotionValue(-200);

  // Soft damping & stiffness to let the glow float gracefully behind the mouse
  const springConfig = { damping: 65, stiffness: 80, mass: 1.5 };
  
  const smoothX = useSpring(blobX, springConfig);
  const smoothY = useSpring(blobY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      blobX.set(e.clientX);
      blobY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [blobX, blobY]);

  return (
    <div id="ambient-container" className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Mesh/Grid Background Plate */}
      <div 
        id="bg-grid-overlay"
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #121212 1px, transparent 1px),
            linear-gradient(to bottom, #121212 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Vignette effect */}
      <div id="vignette-layer" className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0)_50%,#f7f6f1_100%] absolute-fill" />

      {/* Floating interactive glowing blob */}
      <motion.div
        id="interactive-bg-blob"
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.14] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #0022ff 0%, rgba(0,34,255,0.06) 70%, transparent 100%)",
        }}
      />

      {/* Static supplementary subtle secondary glow to ground the visual composition */}
      <div 
        id="ambient-glow-static"
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #0022ff 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
