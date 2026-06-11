import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import { PROJECT_DATA } from "../data";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VectorNode {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
}

// Interactive graphic fallback for projects - renders animated retro-cyber code grids, 
// glowing wireframe matrices, orbits or vector nodes reacting inside cards.
function ProjectInteractiveVisual({ id }: { id: string }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates between -50 and 50
    const x = ((e.clientX - rect.left) / rect.width) * 100 - 50;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - 50;
    setCoords({ x, y });
  };

  const colors = {
    "01": { primary: "#0022ff", secondary: "#7000ff", bg: "from-blue-50/60 via-indigo-50/20 to-white" },
    "02": { primary: "#00b4d8", secondary: "#ff007f", bg: "from-sky-50/60 via-slate-50/20 to-white" },
    "03": { primary: "#f43f5e", secondary: "#d97706", bg: "from-rose-50/60 via-amber-50/20 to-white" },
    "04": { primary: "#7c3aed", secondary: "#059669", bg: "from-violet-50/60 via-emerald-50/20 to-white" },
  }[id] || { primary: "#0022ff", secondary: "#7000ff", bg: "from-zinc-100 via-zinc-50 to-white" };

  return (
    <div
      id={`project-visual-container-${id}`}
      className={`relative w-full h-[320px] md:h-[420px] bg-gradient-to-b ${colors.bg} border border-zinc-200 overflow-hidden flex items-center justify-center transition-all duration-500`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background static fine grid */}
      <div 
        id={`project-visual-grid-${id}`}
        className="absolute inset-0 opacity-[0.06] transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${colors.primary} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.primary} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />

      {/* Retro Sci-fi Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-650 opacity-50 select-none">
        GRID_POS: {Math.round(coords.x)}, {Math.round(coords.y)} <br />
        STATE: {hovered ? "ACTIVE_FOCUS" : "STANDBY"}
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[8.5px] text-zinc-650 opacity-50 select-none">
        MAT_ID: {id}-04-X <br />
        GAIN: +12.4dB
      </div>

      {/* Decorative center target circle */}
      <div 
        className="absolute w-24 h-24 border border-dashed rounded-full pointer-events-none opacity-[0.15]" 
        style={{ borderColor: colors.primary, transform: "scale(1.2)" }} 
      />

      {/* Interactive Vector Animation layer */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
        animate={{
          x: coords.x * 0.4,
          y: coords.y * 0.4,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Render specific interactive graphics based on project ID */}
        {id === "01" && (
          /* Neural Canvas Orbits with orbiting satellites */
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div 
              className="absolute w-44 h-44 border rounded-full opacity-35"
              style={{ borderColor: colors.primary }}
              animate={{ rotate: hovered ? 360 : 60 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-28 h-28 border border-dashed rounded-full opacity-40"
              style={{ borderColor: colors.secondary }}
              animate={{ rotate: hovered ? -360 : -40 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-6 h-6 rounded-full"
              style={{ backgroundColor: colors.primary, boxShadow: `0 0 20px ${colors.primary}` }}
              animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div className="absolute w-2 h-2 rounded-full left-[28%] bg-white shadow-md shadow-white animate-pulse" />
            <div className="absolute w-1.5 h-1.5 rounded-full right-[35%] bg-accent" />
          </div>
        )}

        {id === "02" && (
          /* Brutalist Floating Geometric Nodes and Laser Connections */
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div 
              className="w-16 h-16 border-2 border-zinc-950"
              animate={{ 
                rotateX: hovered ? 180 : 0,
                rotateY: hovered ? 180 : 0,
                rotateZ: hovered ? 90 : 45,
                scale: hovered ? 1.25 : 1,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ borderColor: colors.primary, transformStyle: "preserve-3d" }}
            />
            {/* Connected horizontal laser lines radiating */}
            <div className={`absolute w-[220px] h-[1px] opacity-60 translate-y-12`} style={{ backgroundColor: colors.primary }} />
            <div className={`absolute w-[180px] h-[1px] opacity-45 -translate-y-12`} style={{ backgroundColor: colors.secondary }} />
          </div>
        )}

        {id === "03" && (
          /* Kinetic Typographic Rotational Engine Matrix glyph design */
          <div className="relative flex items-center justify-center flex-col font-display select-none">
            <motion.span 
              className="text-7xl font-black text-zinc-900 italic"
              animate={{
                skewX: hovered ? -25 : -5,
                scale: hovered ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 10 }}
            >
              K I N
            </motion.span>
            <motion.span 
              className="text-4xl font-mono font-bold uppercase tracking-widest text-accent mt-2"
              animate={{
                x: hovered ? 15 : 0,
                opacity: hovered ? 1 : 0.60
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              [F_TPE]
            </motion.span>
          </div>
        )}

        {id === "04" && (
          /* Chronos Core: spinning solar tracking vector matrix */
          <div className="relative flex items-center justify-center">
            {/* Spinning vector ring */}
            <motion.svg 
              className="w-48 h-48 opacity-40" 
              viewBox="0 0 100 100"
              animate={{ rotate: hovered ? -360 : 0 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="40" stroke={colors.primary} strokeWidth="0.5" fill="none" strokeDasharray="5, 3" />
              <line x1="50" y1="10" x2="50" y2="90" stroke={colors.secondary} strokeWidth="0.25" />
              <line x1="10" y1="50" x2="90" y2="50" stroke={colors.secondary} strokeWidth="0.25" />
            </motion.svg>
            <motion.div 
              className="absolute w-12 h-12 border rounded-full bg-white flex items-center justify-center p-1"
              style={{ borderColor: colors.primary }}
              animate={{ scale: hovered ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-4 h-4 rounded-full bg-accent" />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Micro-interaction zoom overlay inside container boundaries */}
      <div className="absolute inset-0 bg-white opacity-20 pointer-events-none group-hover:opacity-5 transition-opacity duration-300" />
    </div>
  );
}

export default function Showcase() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const categories = ["ALL", "INTERFACE DESIGN", "EXHIBITION SPACE", "FOUNDRY SYSTEM", "SAAS PRODUCT"];

  const filteredProjects = selectedFilter === "ALL" 
    ? PROJECT_DATA 
    : PROJECT_DATA.filter(p => p.category.toUpperCase() === selectedFilter);

  return (
    <section 
      id="showcase" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent select-none z-10 px-6 md:px-12 border-t border-zinc-200"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        {/* Header Row */}
        <div id="showcase-header-row" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" id="showcase-revealed-title">
              <span className="font-mono text-xs text-accent tracking-[4px] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                [03] SELECTED WORKS & ARTIFACTS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-zinc-900 mt-6 uppercase tracking-tight">
                CRAFT EXHIBITION
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7 lg:text-right">
            <ScrollReveal direction="left" id="showcase-revealed-meta">
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                SYSTEM SELECTION / GRID INDEX (V_4.0)
              </span>
            </ScrollReveal>
          </div>
        </div>

        {/* Editorial Subcategory Filters */}
        <div id="showcase-category-filters" className="flex flex-wrap gap-2 pt-4 border-b border-zinc-200 pb-8">
          {categories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05} direction="none" id={`filter-reveal-${idx}`}>
              <button
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 font-mono text-[10px] font-bold tracking-[1.5px] uppercase transition-all duration-300 rounded-none border ${
                  selectedFilter === cat 
                    ? "bg-accent text-white border-accent" 
                    : "bg-transparent text-zinc-500 border-zinc-200 hover:border-zinc-500 hover:text-zinc-900"
                }`}
                data-cursor="pointer"
              >
                {cat}
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Staggered Projects Grid layout (Alternate widths representing asymmetrical, high-end editorial portfolios) */}
        <div id="showcase-portfolio-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical grid column mapping: alternating layout lengths (sizes)
            // Card 1: 7-cols, Card 2: 5-cols, Card 3: 5-cols, Card 4: 7-cols
            const colsClass = [
              "lg:col-span-7",
              "lg:col-span-5",
              "lg:col-span-5",
              "lg:col-span-7"
            ][idx % 4];

            return (
              <div key={project.id} className={`${colsClass} flex flex-col justify-between`}>
                <ScrollReveal 
                  delay={0.15} 
                  direction="up" 
                  distance={50}
                  id={`project-reveal-wrapper-${project.id}`}
                >
                  <TiltCard 
                    id={`project-tilt-${project.id}`}
                    className="group flex flex-col gap-6 cursor-pointer"
                    dataCursor="view"
                  >
                    {/* Render Interactive fallbacks responding directly to cursor placement in real-time */}
                    <ProjectInteractiveVisual id={project.id} />

                    {/* Meta/Metadata row underneath visual */}
                    <div id={`project-stats-${project.id}`} className="flex flex-col gap-3 font-mono border-b border-zinc-200 pb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-zinc-500 tracking-wider">
                          CLIENT: {project.client.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          YEAR: {project.year}
                        </span>
                      </div>

                      {/* Display Heading & Category */}
                      <div className="flex justify-between items-end mt-1">
                        <h3 className="font-display text-2xl md:text-3xl font-black text-zinc-900 group-hover:text-accent transition-colors duration-300 uppercase tracking-tight leading-none">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 border border-zinc-200 px-2.5 py-1 text-zinc-500 group-hover:border-accent group-hover:text-accent font-bold text-[9px] tracking-widest uppercase transition-all duration-300">
                          {project.category}
                        </div>
                      </div>
                    </div>

                    {/* Bottom row displaying terminal tags list */}
                    <div id={`project-tags-row-${project.id}`} className="flex justify-between items-center font-mono">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[9px] text-zinc-500 font-medium bg-zinc-100 border border-zinc-200 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-bold text-accent opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        LAUNCH WORK
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
