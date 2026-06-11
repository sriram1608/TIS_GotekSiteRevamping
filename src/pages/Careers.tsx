import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ArrowRight, Mail, Briefcase } from "lucide-react";
import { CAREER_JOBS } from "../data";
import ScrollReveal from "../components/ScrollReveal";

export default function Careers() {
  // Only extract IT and Software Engineering positions
  const itJobs = CAREER_JOBS.filter((job) => 
    job.department.includes("IT") || 
    job.department.includes("Software") || 
    job.department.includes("Enterprise")
  );

  return (
    <div className="gotek-page bg-[#f7f6f1] pt-32 pb-24 px-6 md:px-12 select-none font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 relative z-10 text-left">
        
        {/* SECTION 1: Page Header */}
        <div className="flex flex-col gap-4">
          <ScrollReveal id="careers-tag">
            <span className="text-xs uppercase tracking-[3px] text-blue-600 font-bold px-3 py-1 bg-white border border-zinc-200 w-fit">
              Corporate Careers
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} id="careers-title">
            <h1 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 leading-none">
              Explore Our <span className="text-blue-600">Openings</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} id="careers-desc">
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              Join our growing team and build innovative solutions with us. We welcome skilled professionals in software development, IT support, printing operations, and business services. Submit your application below to explore career opportunities at Gotek.
            </p>
          </ScrollReveal>
        </div>

        {/* SECTION 2: IT & Software Engineering Roles List */}
        <div className="flex flex-col gap-6 border-t border-zinc-200 pt-12">
          <ScrollReveal id="careers-it-col-header">
            <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
              <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                IT & Software Engineering
              </h3>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {itJobs.map((job, idx) => (
              <ScrollReveal key={job.id} delay={idx * 0.05} id={`it-job-reveal-${job.id}`}>
                <div 
                  className="p-6 bg-white border border-zinc-200 hover:border-blue-600 hover:shadow-md transition-all rounded-none flex flex-col md:flex-row md:items-center justify-between gap-4"
                  data-cursor="expand"
                >
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-base font-bold text-zinc-900 tracking-tight">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="text-blue-600">{job.type}</span>
                    </div>
                  </div>

                  <Link
                    to={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                    className="w-10 h-10 border border-zinc-200 bg-zinc-50 hover:bg-blue-600 hover:border-blue-600 hover:text-white flex items-center justify-center transition-all shrink-0 self-start md:self-auto"
                    data-cursor="pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 3: General Application Callout */}
        <ScrollReveal id="careers-general-call">
          <div className="mt-8 bg-zinc-900 p-8 md:p-10 border border-blue-605 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-white flex flex-col gap-2">
              <span className="text-[9px] text-blue-400 font-bold tracking-widest uppercase">
                Gotek General Application Pool
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none">
                Submit Unsolicited Portfolio
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1">
                Don't see a current active opening that fits your expertise? Send your CV and cover details to our hiring panel anyway. We always explore fresh talent portfolios.
              </p>
              
              <div className="flex items-center gap-2 mt-2 text-[11px] font-mono font-bold text-blue-400">
                <Mail className="w-4 h-4" />
                <span>Email: careers@goteksystems.com</span>
              </div>
            </div>

            <Link
              to="/careers/apply?position=General%20Talent%20Pool"
              className="relative z-10 px-6 py-4 border border-blue-600 bg-blue-600 hover:bg-zinc-950 text-white hover:text-blue-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0"
              data-cursor="pointer"
            >
              <span>Submit CV</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
