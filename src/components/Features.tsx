import ScrollReveal from "./ScrollReveal";
import { SERVICE_DATA } from "../data";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Features() {
  return (
    <section 
      id="services" 
      className="relative min-h-screen py-24 md:py-32 bg-transparent select-none z-10 px-6 md:px-12 border-t border-zinc-200"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        {/* Header Row */}
        <div id="services-header-row" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-4">
            <ScrollReveal direction="right" id="services-reveal-index">
              <span className="font-mono text-xs text-accent tracking-[4px] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                [02] CAPABILITIES & CREDENTIALS
              </span>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 lg:text-right">
            <ScrollReveal direction="left" id="services-reveal-motto">
              <span className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                SYSTEM ARCHITECTURE / MULTI-GRID
              </span>
            </ScrollReveal>
          </div>
        </div>

        {/* 2x2 Interactive Services Grid */}
        <div id="services-bento-grid" className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
          {SERVICE_DATA.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 0.1}
              direction="none"
              id={`service-reveal-item-${index}`}
            >
              <TiltCard
                id={`service-tilt-card-${index}`}
                className="group relative bg-white p-8 md:p-12 border border-zinc-100 overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:bg-[#fcfbfa]/80 cursor-pointer min-h-[380px]"
                dataCursor="expand"
              >
                {/* Background Grid Pattern on hovering individual service cell */}
                <div 
                  id={`service-hover-grid-${index}`}
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.035] transition-all duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #0022ff 1px, transparent 1px),
                      linear-gradient(to bottom, #0022ff 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px"
                  }}
                />

                {/* Top Row: Service Number and Arrow */}
                <div id={`service-top-row-${index}`} className="flex justify-between items-start z-[2]">
                  <span className="font-mono text-xl text-zinc-400 group-hover:text-accent font-bold transition-colors duration-300">
                    [{service.number}]
                  </span>
                  
                  {/* Rotating Arrow */}
                  <div id={`service-arrow-${index}`} className="w-10 h-10 border border-zinc-200 rounded-none flex items-center justify-center bg-zinc-50 text-zinc-400 group-hover:border-accent group-hover:bg-white group-hover:text-accent group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Mid-Content: Header and Paragraph */}
                <div id={`service-mid-content-${index}`} className="my-8 z-[2]">
                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-zinc-900 group-hover:text-accent transition-colors duration-300 uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-space text-sm text-zinc-650 font-light mt-4 leading-relaxed max-w-lg">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row: Terminal Tags */}
                <div id={`service-bottom-tags-${index}`} className="flex flex-wrap gap-2 mt-auto pt-4 z-[2]">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-zinc-500 border border-zinc-200 bg-zinc-50 uppercase group-hover:border-accent/40 group-hover:text-accent group-hover:bg-white transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
