import ScrollReveal, { StaggerContainer } from "./ScrollReveal";
import TiltCard from "./TiltCard";
import { STAT_DATA } from "../data";
import { Target, Award, Eye } from "lucide-react";

export default function About() {
  const statIcons = [
    <Award className="w-6 h-6 text-accent mb-4" key="award" />,
    <Target className="w-6 h-6 text-accent mb-4" key="target" />,
    <Eye className="w-6 h-6 text-accent mb-4" key="eye" />,
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent select-none z-10 px-6 md:px-12 flex flex-col justify-center border-t border-zinc-200"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        {/* Section Header Row */}
        <div id="about-header-row" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-4">
            <ScrollReveal direction="right" id="about-section-index">
              <span className="font-mono text-xs text-accent tracking-[4px] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                [01] THE MANIFESTO
              </span>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 lg:text-right">
            <ScrollReveal direction="left" id="about-section-motto">
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                INTEGRITY — CRAFT — RHYTHM
              </span>
            </ScrollReveal>
          </div>
        </div>

        {/* Massive Editorial About Copy */}
        <div id="about-manifesto-text" className="max-w-5xl">
          <ScrollReveal direction="up" id="about-paragraph-reveal">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold pb-4 tracking-tight leading-[1.1] uppercase text-[#121212]">
              WE BRIDGED THE GAP BETWEEN{" "}
              <span className="text-zinc-400">BRUTALIST GRAPHIC STRUCTURE</span> AND{" "}
              <span className="text-accent">HIGH-FIDELITY CREATIVE WEB PERFORMANCE</span>.
            </h2>
            <p className="font-space text-lg text-zinc-650 leading-relaxed font-light mt-6 max-w-4xl">
              Operating at the intersection of aesthetic courage and high computational standard, we design layouts that reject the default scroll curves. Every container has physical boundaries, every trigger has weight, and every translation communicates intent.
            </p>
          </ScrollReveal>
        </div>

        {/* Custom Interactive Stats Grid */}
        <div id="stats-grid-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8">
          {STAT_DATA.map((stat, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 0.15} 
              direction="up" 
              distance={40}
              id={`stat-reveal-${idx}`}
            >
              <TiltCard 
                id={`stat-tilt-card-${idx}`} 
                className="group border border-zinc-200 bg-white hover:border-accent hover:bg-[#fcfbfa]/80 shadow-xs hover:shadow-md backdrop-blur-md p-8 rounded-none transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-[280px]"
                dataCursor="expand"
              >
                {/* Icon wrapper inside */}
                <div className="flex justify-between items-start">
                  <div id={`stat-icon-wrap-${idx}`} className="p-3 bg-zinc-50 border border-zinc-200 group-hover:border-accent group-hover:bg-white group-hover:text-accent transition-all duration-300">
                    {statIcons[idx]}
                  </div>
                  <span className="font-mono text-zinc-400 group-hover:text-accent font-bold text-xs transition-colors duration-300">
                    [REF: 0{idx + 1}]
                  </span>
                </div>

                {/* Stat texts */}
                <div id={`stat-text-wrap-${idx}`} className="flex flex-col gap-2 mt-auto">
                  <h3 className="font-display text-5xl font-extrabold text-zinc-900 group-hover:text-accent transition-colors duration-300 tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="font-space text-xs text-zinc-900 tracking-[2px] font-bold uppercase mt-1">
                    {stat.label}
                  </p>
                  <p className="font-sans text-xs text-zinc-500 font-light mt-1">
                    {stat.subtext}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
