import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ArrowRight, Mail, Monitor, Printer } from "lucide-react";
import { CAREER_JOBS } from "../data";
import ScrollReveal from "../components/ScrollReveal";

const jobDescriptions: Record<string, string> = {
  "job-m1": "Lead assembly lines for RFID/NFC smart cards and keyfobs, managing quality assurance processes, equipment calibration, and production scheduling.",
  "job-m2": "Operate state-of-the-art precision CNC routers and engraving equipment with high tolerance levels for custom badge substrates and corporate gifting items.",
  "job-m3": "Oversee structural design verification, antenna layout compliance, and tuning parameters for high-frequency (HF) and ultra-high-frequency (UHF) passive tags.",
  "job-it1": "Design, build, and optimize interactive canvas simulations, web customizers, and high-performance user interfaces using React, SVG graphics, and Framer Motion.",
  "job-it2": "Architect robust database layers, API gateway integrations, and real-time transaction synchronization flows for Gotek's enterprise cloud ERP platform.",
  "job-it3": "Drive product roadmaps, requirements specifications, and cross-functional feature planning for the Smart AI Campus (SAC) education and logistics suite."
};

export default function Careers() {
  // IT and Software engineering positions
  const itJobs = CAREER_JOBS.filter((job) => 
    job.department.includes("IT") || 
    job.department.includes("Software") || 
    job.department.includes("Enterprise")
  );

  // Printing & Corporate Solutions positions (the remaining ones)
  const corporateJobs = CAREER_JOBS.filter((job) => 
    !job.department.includes("IT") && 
    !job.department.includes("Software") && 
    !job.department.includes("Enterprise")
  );

  return (
    <div className="gotek-page bg-[#f7f6f1] pt-32 font-sans select-none overflow-x-hidden">
      
      {/* SECTION 1: Page Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pb-12 text-left flex flex-col gap-4">
        <ScrollReveal id="careers-tag">
          <span className="text-xs uppercase tracking-[3px] text-blue-600 font-bold px-3 py-1 bg-white border border-zinc-200 w-fit rounded-lg shadow-sm">
            Corporate Careers
          </span>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1} id="careers-title">
          <h1 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 leading-none">
            Explore Our <span className="text-blue-600">Openings</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2} id="careers-desc">
          <p className="text-[15px] text-zinc-500 leading-relaxed font-medium max-w-3xl mt-1">
            Join our growing team and build innovative solutions with us. We welcome skilled professionals in software development, IT support, printing operations, and business services. Submit your application below to explore career opportunities at Gotek.
          </p>
        </ScrollReveal>
      </div>

      {/* SECTION 2: Parallel Columns (Printing & IT side-by-side) */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT CARD: Printing & Corporate Solutions (Dark Theme) */}
        <div className="bg-gradient-to-br from-[#0c0f1d] via-[#111728] to-[#17203a] p-6 md:p-10 border border-zinc-800 rounded-3xl shadow-xl text-white text-left relative overflow-hidden flex flex-col gap-8">
          {/* Animated subtle glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05] bg-blue-600 pointer-events-none" />
          
          <ScrollReveal id="careers-printing-header">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="p-2.5 bg-blue-950/50 border border-blue-900 text-blue-400 rounded-xl">
                <Printer className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Printing & Corporate Solutions
                </h3>
                <p className="text-[13px] text-zinc-400 mt-1 font-semibold">
                  In-house precision printing, smart identity systems, and custom corporate gifting products.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6 w-full animate-fade-in">
            {corporateJobs.map((job, idx) => (
              <ScrollReveal key={job.id} delay={idx * 0.05} id={`printing-job-reveal-${job.id}`} className="w-full">
                <div 
                  className="p-6 bg-[#131b31]/70 backdrop-blur-md border border-blue-900/30 hover:border-blue-500/60 shadow-[0_4px_20px_rgba(0,34,255,0.02)] hover:shadow-[0_12px_30px_rgba(0,34,255,0.12)] transition-all duration-300 ease-in-out rounded-2xl flex flex-col justify-between gap-6 group hover:-translate-y-1 relative w-full"
                  data-cursor="expand"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-tight transition-colors group-hover:text-blue-400">
                      {job.title}
                    </h4>
                    <p className="text-[13px] text-zinc-300/90 leading-relaxed font-semibold">
                      {jobDescriptions[job.id] || "Ensure high standards in our custom fabrication and advanced material printing processes."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider bg-blue-950/40 px-3 py-1.5 w-fit border border-blue-900/60 rounded-lg">
                      {job.type}
                    </div>
                    <Link
                      to={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                      className="w-full py-3.5 border border-blue-600 text-blue-400 font-bold text-xs uppercase tracking-[1.5px] bg-blue-950/10 hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 text-center rounded-xl"
                      data-cursor="pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: IT & Software Solutions (Light Theme) */}
        <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e4e9f3] p-6 md:p-10 border border-zinc-200 rounded-3xl shadow-md text-zinc-900 text-left relative overflow-hidden flex flex-col gap-8">
          {/* Animated subtle glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.03] bg-red-600 pointer-events-none" />

          <ScrollReveal id="careers-it-header">
            <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  IT & Software Solutions
                </h3>
                <p className="text-[13px] text-zinc-500 mt-1 font-semibold">
                  Empowering organizations with smart technology, automation, and digital transformation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6 w-full animate-fade-in">
            {itJobs.map((job, idx) => (
              <ScrollReveal key={job.id} delay={idx * 0.05} id={`it-job-reveal-${job.id}`} className="w-full">
                <div 
                  className="p-6 bg-white/85 backdrop-blur-md border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.01),0_1px_4px_rgba(0,0,0,0.01)] hover:border-red-500/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300 ease-in-out rounded-2xl flex flex-col justify-between gap-6 group hover:-translate-y-1 relative w-full"
                  data-cursor="expand"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 tracking-tight transition-colors group-hover:text-red-600">
                      {job.title}
                    </h4>
                    <p className="text-[13px] text-zinc-600 leading-relaxed font-semibold">
                      {jobDescriptions[job.id] || "Join our team and work on bleeding-edge solutions with robust career growth opportunities."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-wider bg-red-50 px-3 py-1.5 w-fit border border-red-100/80 rounded-lg">
                      {job.type}
                    </div>
                    <Link
                      to={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                      className="w-full py-3.5 border border-red-600 text-red-600 font-bold text-xs uppercase tracking-[1.5px] bg-red-50/20 hover:bg-red-600 hover:text-white flex items-center justify-center gap-2 transition-all duration-300 text-center rounded-xl"
                      data-cursor="pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 4: General Application Callout */}
      <div className="w-full py-20 px-6 md:px-12 lg:px-16 bg-[#f7f6f1]">
        <div className="max-w-7xl mx-auto text-left">
          <ScrollReveal id="careers-general-call">
            <div className="bg-gradient-to-br from-[#0c0f1d] via-[#101726] to-[#151f33] p-8 md:p-12 border border-zinc-800/80 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group rounded-2xl shadow-xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.08] bg-blue-600 pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05] bg-purple-600 pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500" />
              
              <div className="relative z-10 text-white flex flex-col gap-2.5 max-w-xl">
                <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase bg-blue-950/40 border border-blue-900/60 px-2.5 py-1 w-fit rounded-md">
                  Gotek General Application Pool
                </span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none mt-1">
                  Submit Unsolicited Portfolio
                </h3>
                <p className="text-[13px] text-zinc-300 leading-relaxed font-medium mt-1">
                  Don't see a current active opening that fits your expertise? Send your CV and cover details to our hiring panel anyway. We always explore fresh talent portfolios.
                </p>
                
                <div className="flex items-center gap-2 mt-3 text-xs font-mono font-bold text-blue-400">
                  <Mail className="w-4 h-4" />
                  <span>Email: hr@gotekid.com</span>
                </div>
              </div>

              <Link
                to="/careers/apply?position=General%20Talent%20Pool"
                className="relative z-10 px-8 py-4 border border-blue-600 bg-blue-600 hover:bg-transparent text-white hover:text-blue-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 rounded-xl group-hover:scale-[1.02]"
                data-cursor="pointer"
              >
                <span>Submit CV</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
}
