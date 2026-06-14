import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Printer, Monitor, ArrowRight, Shield, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div
      id="gotek-home-root"
      className="w-full min-h-screen pt-24 flex flex-col lg:flex-row overflow-hidden bg-zinc-950 font-sans"
    >

      {/* PANEL 1: Printing Solutions - Highlighting Blue theme */}
      <motion.div
        data-cursor="view"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 70 }}
        className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800 min-h-[50vh] lg:min-h-screen flex flex-col justify-start p-8 md:p-14 lg:p-16"
      >
        {/* Animated Printing Press/Material Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:opacity-95 transition-opacity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=1200&auto=format&fit=crop&q=80')`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Balanced Gradient Overlay for beautiful visibility and clean text contrast at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-zinc-950 z-[1]" />

        {/* Content area */}
        <div className="relative z-[2] flex flex-col items-start gap-4 text-white max-w-lg">
          <div className="p-3.5 bg-blue-600 rounded-none mb-1 shadow-lg">
            <Printer className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-none">
            Printing and Corporate <span className="text-blue-400">Gifting</span>
          </h2>

          <p className="text-base text-white leading-relaxed font-light mt-1">
            Innovative IT and AI solutions designed to accelerate business growth.
          </p>

          {/* Core Priorities Checklist - Printing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 w-full text-left">
            <ul className="flex flex-col gap-2">
              {[
                "Employee Welcome Kits",
                "Return Gifts",
                "Awards and Mementos",
                "Gifts for MSMEs"
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {[
                "Sublimation Printing",
                "UV Printing",
                "Laser Engraving and Cutting",
                "Offset Printing"
              ].map((text) => (
                <li key={text} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Simple Button Replacement */}
          <Link
            to="/manufacturing"
            className="group/btn mt-5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-[1.5px] transition-all duration-300 flex items-center gap-2.5 shadow-md"
          >
            See Printing Products
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* PANEL 2: IT Solutions - Highlighting Red theme */}
      <motion.div
        data-cursor="view"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 70 }}
        className="relative flex-1 group overflow-hidden min-h-[50vh] lg:min-h-screen flex flex-col justify-start p-8 md:p-14 lg:p-16"
      >
        {/* Animated IT/Software Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:opacity-95 transition-opacity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80')`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Balanced Gradient Overlay for beautiful visibility and clean text contrast at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-zinc-950 z-[1]" />

        {/* Content area */}
        <div className="relative z-[2] flex flex-col items-start gap-4 text-white max-w-lg">
          <div className="p-3.5 bg-red-600 rounded-none mb-1 shadow-lg">
            <Monitor className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-none">
            IT & Software <span className="text-red-400">Solutions</span>
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed font-light mt-1">
            Empowering organizations with smart technology, automation, and digital transformation.
          </p>

          {/* Core Priorities Checklist - IT */}
          <ul className="flex flex-col gap-2 mt-2 w-full text-left">
            {[
              "SAC – Smart AI Campus",
              "Custom Software Development",
              "E-Commerce & Online Stores"
            ].map((text) => (
              <li key={text} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* Simple Button Replacement */}
          <Link
            to="/it-solutions"
            className="group/btn mt-5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[1.5px] transition-all duration-300 flex items-center gap-2.5 shadow-md"
          >
            See Softwares & Tools
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
