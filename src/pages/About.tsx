import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Printer, Monitor, Eye, Target, Compass, Star, ChevronRight, MessageSquare } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import TiltCard from "../components/TiltCard";

export default function About() {
  // Google reviews mock data
  const googleReviews = [
    {
      id: "rev-1",
      name: "Siddharth Mehta",
      role: "Operations Manager",
      rating: 5,
      date: "2 days ago",
      text: "We ordered 500 customized RFID cards and premium printed lanyards for our tech event. The print contrast and material robustness are outstanding. Extremely smooth transaction!"
    },
    {
      id: "rev-2",
      name: "Anita Desai",
      role: "HR Director",
      rating: 5,
      date: "1 week ago",
      text: "The new Smart Campus platform of Gotek is exceptionally handy. It allowed us to instantly coordinate student check-in profiles and track attendances efficiently."
    },
    {
      id: "rev-3",
      name: "Karan Johar",
      role: "Procurement Lead",
      rating: 5,
      date: "3 weeks ago",
      text: "Absolute highest quality UV printing on our corporate gifting mugs and badges. Delivered exactly on time, and the sales team was very helpful and accommodating."
    },
    {
      id: "rev-4",
      name: "Meera Patel",
      role: "IT Administrator",
      rating: 5,
      date: "1 month ago",
      text: "Gotek's local software systems have streamlined our corporate badging workflows. No more back-and-forth email attachments. We just click, place order, and run."
    }
  ];

  return (
    <div id="gotek-about-root" className="gotek-page bg-[#f7f6f1] pt-32 pb-24 px-6 md:px-12 select-none font-sans relative">
      
      {/* Background Subtle Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-zinc-100/50 to-[#f7f6f1] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-[1] flex flex-col gap-24 md:gap-32">
        
        {/* SECTION 1: Intro Section (Replaced 'Engineering Digital and Physical Integrity') */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-5">
          <ScrollReveal delay={0.1} id="about-intro-tag">
            <span className="text-xs uppercase tracking-[3px] text-blue-600 font-bold px-3 py-1 bg-white border border-zinc-200">
              Who We Are
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2} id="about-intro-heading">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 tracking-tight leading-none mt-2">
              Our Printing & <span className="text-blue-600">Software Solutions</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3} id="about-intro-summary">
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mt-3 font-normal">
              Gotek provides printing and corporate solutions to support your business operations. We specialize in high-quality employee ID cards, lanyards, RFID credentials, corporate gifting, and software solutions designed to simplify everyday business processes.
            </p>
          </ScrollReveal>
        </div>

        {/* SECTION 2: What We Do Section (Simple, clean, updated grid boxes) */}
        <div className="flex flex-col gap-10">
          <ScrollReveal id="about-wwd-header">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-blue-600" />
              <h2 className="text-xs font-bold tracking-[2.5px] uppercase text-zinc-500">
                Core Business Divisions
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Printing Solutions Box */}
            <ScrollReveal direction="left" id="about-wwd-mfg">
              <Link to="/manufacturing" className="block h-full group" data-cursor="pointer">
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="bg-white border border-zinc-200 p-8 md:p-10 hover:border-blue-600 hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left shadow-sm h-full"
                >
                  <div className="p-3.5 bg-blue-50 border border-blue-200 w-fit text-blue-600 group-hover:scale-110 transition-transform">
                    <Printer className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">
                    Printing and Corporate Solution
                  </h3>
                  <p className="text-sm text-zinc-650 leading-relaxed font-light">
                    We create custom ID cards, RFID access cards, and personalized lanyards for businesses. With all printing done in-house, we deliver quality products at affordable prices with fast delivery.
                  </p>
                </motion.div>
              </Link>
            </ScrollReveal>

            {/* IT & Software Solutions Box */}
            <ScrollReveal direction="right" id="about-wwd-it">
              <Link to="/it-solutions" className="block h-full group" data-cursor="pointer">
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="bg-white border border-zinc-200 hover:border-red-600 hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left shadow-sm h-full p-8 md:p-10"
                >
                  <div className="p-3.5 bg-red-50 border border-red-200 w-fit text-red-600 group-hover:scale-110 transition-transform">
                    <Monitor className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-red-600 tracking-tight">
                    IT & Software Solutions
                  </h3>
                  <p className="text-sm text-zinc-655 leading-relaxed font-light font-sans">
                    We provide Smart AI Campus solutions with school management and automatic attendance tracking. We also create customized e-commerce websites and online stores to help businesses grow online.
                  </p>
                </motion.div>
              </Link>
            </ScrollReveal>
          </div>
        </div>

        {/* SECTION 3: Vision/Mission/Values Cards Row (To be shared by client) */}
        <div className="flex flex-col gap-10">
          <ScrollReveal id="about-vmv-title">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-blue-600" />
              <h2 className="text-xs font-bold tracking-[2.5px] uppercase text-zinc-500">
                Objectives & Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <ScrollReveal delay={0.1} id="about-vmv-1">
              <TiltCard id="about-vmv-vision-card" className="bg-white border border-zinc-200 p-8 min-h-[380px] flex flex-col justify-between hover:border-blue-600 hover:shadow-md transition-all duration-300 text-left">
                <div className="p-3 bg-blue-50 border border-blue-200 w-fit text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Our Vision
                  </h4>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed text-justify">
                    We aspire to revolutionize the landscape of the Indian education system through innovative identification solutions tailored for schools. Our mission is to bolster operational efficiency, prioritize student safety, and catalyze transformative learning experiences. With cutting-edge technology and a commitment to excellence, we envision a future where every educational institution thrives, empowered by our pioneering solutions.
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal delay={0.2} id="about-vmv-2">
              <TiltCard id="about-vmv-mission-card" className="bg-white border border-zinc-200 p-8 min-h-[380px] flex flex-col justify-between hover:border-blue-600 hover:shadow-md transition-all duration-300 text-left">
                <div className="p-3 bg-blue-50 border border-blue-200 w-fit text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Our Mission
                  </h4>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed text-justify">
                    We are dedicated to equipping schools with robust and dependable ID solutions that streamline processes and uphold student safety as paramount. Through the integration of modernized technology and strategic collaborations, we envision serving 1000 schools by 2030 and 5000 schools by 2035. Our ultimate goal is to enrich the educational journey for both students and educators, fostering a conducive environment for growth and success.
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Values */}
            <ScrollReveal delay={0.3} id="about-vmv-3">
              <TiltCard id="about-vmv-values-card" className="bg-white border border-zinc-200 p-8 min-h-[380px] flex flex-col justify-between hover:border-blue-600 hover:shadow-md transition-all duration-300 text-left">
                <div className="p-3 bg-blue-50 border border-blue-200 w-fit text-blue-600">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Our Values
                  </h4>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed text-justify">
                    At our core, we foster a culture of respect for all individuals, recognizing that diversity strengthens our team. We believe in the power of teamwork built on trust and collaboration, where each member's unique strengths contribute to our collective success. Our commitment to efficient, ethical, transparent, and truthful business practices ensures integrity in all our interactions, while our unwavering focus on customer delight drives us to exceed expectations at every turn.
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>

        {/* SECTION 4: Google Reviews Section (Replaces 'Developed Enterprise Scale' checklist) */}
        <div className="flex flex-col gap-10">
          <ScrollReveal id="about-reviews-title">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-blue-600" />
              <h2 className="text-xs font-bold tracking-[2.5px] uppercase text-zinc-500">
                Customer Testimonials
              </h2>
            </div>
          </ScrollReveal>

          {/* High-fidelity Google Reviews dashboard */}
          <div className="bg-white border border-zinc-200 p-8 md:p-12 shadow-sm flex flex-col gap-10 text-left">
            
            {/* Top Score Summary Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-150 pb-8">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-100 border border-zinc-200 p-4 shrink-0 font-sans text-3xl font-black text-zinc-800 flex flex-col items-center justify-center leading-none">
                  <span>4.9</span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1 tracking-widest">OUT OF 5</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">128 Verified Google Reviews</h3>
                  <p className="text-[11px] text-zinc-400 font-medium">99% Customer loyalty & satisfaction rating</p>
                </div>
              </div>

              {/* Verified Ribbon tag */}
              <div className="bg-emerald-50 border border-emerald-250 px-4 py-2 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>Google Verified Service Provider</span>
              </div>
            </div>

            {/* Reviews list grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {googleReviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-6 bg-[#fcfbfa] border border-zinc-200 hover:border-blue-600 transition-all flex flex-col justify-between gap-6 hover:shadow-xs"
                >
                  <p className="text-xs text-zinc-650 leading-relaxed font-normal italic">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                      {/* Initials Circle */}
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-sans text-xs font-extrabold flex items-center justify-center">
                        {rev.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-900 leading-none">{rev.name}</span>
                        <span className="text-[10px] text-zinc-400 mt-1">{rev.role}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1">{rev.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
