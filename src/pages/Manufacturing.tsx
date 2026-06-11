import React from "react";
import { motion } from "motion/react";

export default function Manufacturing() {
  return (
    <div 
      id="manufacturing-coming-soon-premium"
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-[#f7f6f1] px-6 py-24 overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Element */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Slow drifting gradient warm & cool light flares */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 15, -15, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 20, 0],
            y: [0, 15, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute w-[350px] h-[350px] rounded-full bg-orange-100/30 blur-[80px]"
        />
      </div>

      {/* Subtle architectural grid lines with clean fade-in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0"
      />

      {/* Interactive Beautiful Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
        className="relative z-10 glass-container px-12 py-16 text-center max-w-md w-full border border-black/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center group"
      >
        {/* Subtle geometric radar motif rotating infinitely */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-blue-600/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-12 h-12 border border-blue-600/30 rounded-full flex items-center justify-center"
          />
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_12px_#0022ff]"
          />
        </div>

        {/* Brand Tagline with dynamic letter spacing on hover */}
        <motion.span 
          className="font-mono text-[11px] tracking-[6px] uppercase text-zinc-400 font-bold mb-4 block transition-all duration-500 group-hover:tracking-[8px] group-hover:text-blue-600"
        >
          Gotek
        </motion.span>
        
        {/* Coming Soon beautifully masked text reveal */}
        <div className="overflow-hidden py-1">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-none uppercase"
          >
            Coming <span className="text-blue-600">Soon</span>
          </motion.h1>
        </div>
        
        {/* Premium interactive line expansion */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="h-[2px] bg-blue-600 mt-8"
          whileHover={{ width: 64 }}
        />
      </motion.div>
    </div>
  );
}
