import { motion } from "motion/react";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const line1 = "WE SHAPE";
  const line2 = "IMMERSIVE";
  const line3 = "INTERACTIONS";

  // Staggered animation triggers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.215, 0.61, 0.355, 1],
      }
    },
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-screen w-full bg-transparent flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 z-10 select-none overflow-hidden"
    >
      {/* Decorative Subtle Side Coordinates */}
      <div id="side-tech-meta" className="absolute left-6 md:left-12 bottom-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] hidden lg:block leading-relaxed">
        <span>LOC: [45.10 / -122.39]</span><br />
        <span>SYS: [ONLINE_60_FPS]</span><br />
        <span>SYS OPERATIONAL: COGNITIVE RENDER</span>
      </div>

      <div id="side-tech-index" className="absolute right-6 md:right-12 bottom-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] hidden lg:block text-right leading-relaxed">
        <span>AWARDS® MONITORED</span><br />
        <span>PLATFORM VERSION 4.0</span><br />
        <span>SCROLL DOWN TO INITIATE ↘</span>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-12 mt-4">
        {/* Massive Main Bold Display Typography with line-cutout reveals */}
        <motion.div 
          id="hero-display-heading"
          className="flex flex-col items-start leading-[0.85] font-display text-[10vw] sm:text-[9vw] lg:text-[8.5vw] font-extrabold uppercase tracking-tight text-[#121212] w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Line 1 */}
          <div className="overflow-hidden py-1 w-full flex">
            <motion.span id="hero-title-line-1" variants={lineVariants} className="block text-[#121212]">
              {line1}
            </motion.span>
          </div>

          {/* Line 2 (Vibrant highlight outline / neon lime text) */}
          <div className="overflow-hidden py-1 w-full flex gap-4 items-center">
            <motion.span 
              id="hero-title-line-2" 
              variants={lineVariants} 
              className="block font-black text-transparent"
              style={{
                WebkitTextStroke: "2px rgba(18,18,18,0.85)",
              }}
            >
              {line2}
            </motion.span>
            
            {/* Embedded technical badge inline */}
            <motion.div
              variants={lineVariants}
              className="hidden md:inline-flex items-center gap-2 border border-zinc-200 bg-white/60 backdrop-blur-md px-4 py-2 font-mono text-[10px] tracking-widest text-[#0022ff] rounded-none ml-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              STATUS: RENDER ACTIVE v12
            </motion.div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden py-1 w-full flex">
            <motion.span id="hero-title-line-3" variants={lineVariants} className="block text-[#0022ff]">
              {line3}
            </motion.span>
          </div>
        </motion.div>

        {/* Hero description & CTAs layout */}
        <div id="hero-body-content" className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          {/* Description Paragraph */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.4} id="hero-desc-reveal">
              <p className="font-space text-lg text-zinc-650 leading-relaxed font-light">
                An archival portfolio translating complex digital ecosystems into high-integrity, interactive brand frontends. Striking visual systems fueled by precision motion engineering. It is physical, reactive, and kinetic.
              </p>
            </ScrollReveal>
          </div>

          {/* Magnetic CTA Buttons */}
          <div className="lg:col-span-7 flex flex-wrap gap-4 items-center lg:justify-end">
            {/* Electric Blue Action Button */}
            <ScrollReveal delay={0.5} id="hero-cta-1-reveal">
              <MagneticButton strength={0.35} id="hero-magnet-cta-1">
                <a 
                  href="#showcase"
                  className="px-8 py-5 bg-accent text-white hover:bg-[#0019bf] font-mono text-sm font-bold tracking-[2px] uppercase transition-all duration-300 flex items-center gap-3 active:scale-95 text-center"
                  data-cursor="view"
                >
                  VIEW WORK INDEX
                  <ArrowDownRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            </ScrollReveal>

            {/* Hollow black border button */}
            <ScrollReveal delay={0.55} id="hero-cta-2-reveal">
              <MagneticButton strength={0.25} id="hero-magnet-cta-2">
                <a 
                  href="#services"
                  className="px-8 py-5 border border-zinc-950 hover:border-accent hover:text-white hover:bg-zinc-950 font-mono text-sm font-bold tracking-[2px] uppercase text-zinc-950 transition-all duration-300 bg-transparent active:scale-95 text-center block"
                  data-cursor="pointer"
                >
                  READ CREDENTIALS
                </a>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Embedded High-contrast physical spacer grid anchor */}
      <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-zinc-200 hidden lg:block" />
    </section>
  );
}
