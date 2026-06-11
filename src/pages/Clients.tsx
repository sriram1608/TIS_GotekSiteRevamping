import React from "react";
import { motion } from "motion/react";
import { CLIENT_PARTNERS } from "../data";
import ScrollReveal from "../components/ScrollReveal";
import TiltCard from "../components/TiltCard";

export default function Clients() {
  return (
    <div className="gotek-page bg-bg-dark pt-32 pb-24 px-6 md:px-12 select-none font-sans overflow-x-hidden">
      {/* Overlay details */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-white/20 to-bg-dark pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-24">
        
        {/* Header section */}
        <div className="max-w-4xl flex flex-col gap-4 text-left">
          <ScrollReveal id="clients-tag">
            <span className="font-mono text-[10px] tracking-[4px] text-accent font-bold px-3 py-1 bg-white border border-zinc-200 w-fit">
              [Gotek Compliance & Partners]
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} id="clients-title">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[0.95]">
              Trust Correlation <span className="text-accent">Networks</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} id="clients-desc">
            <p className="font-space text-sm text-zinc-650 leading-relaxed font-light max-w-2xl">
              Our solutions are trusted by businesses, schools, and organizations looking for high-quality printing, smart ID cards, RFID access systems, asset tracking, and custom software services.
            </p>
          </ScrollReveal>
        </div>

        {/* SECTION 2: Responsive Client Logo Grid (grayscale by default, colorful/vibrant blue on hover) */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLIENT_PARTNERS.map((partner, idx) => (
              <ScrollReveal 
                key={partner.name} 
                delay={idx * 0.04} 
                direction="up" 
                id={`partner-card-${idx}`}
              >
                <TiltCard 
                  id={`p-tilt-${idx}`}
                  className="group relative bg-white border border-zinc-900 h-44 flex flex-col items-center justify-center p-6 rounded-lg select-none cursor-pointer"
                >
                  {/* Corporate Logo rendered with original colors */}
                  <motion.div 
                    className="w-full h-full flex items-center justify-center p-2"
                  >
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain select-none pointer-events-none transition-transform duration-350 group-hover:scale-105"
                    />
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
