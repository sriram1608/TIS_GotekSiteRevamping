import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Printer, Monitor } from "lucide-react";
import gotekLogo from "../assets/gotek-logo.png";

export default function Header() {
  const location = useLocation();
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when page route shifts
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSolutionsOpen(false);
  }, [location]);

  return (
    <header
      id="gotek-nav-header"
      className="fixed top-0 left-0 w-full h-24 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between px-6 md:px-12 transition-all duration-300 select-none"
    >
      {/* LEFT: Branding Logo */}
      <div id="navbar-left-layout" className="flex items-center shrink-0">
        {/* Branding Logo - Moved to top left */}
        <Link
          id="navbar-branding-logo"
          to="/"
          className="group flex items-center shrink-0 bg-transparent"
          data-cursor="pointer"
        >
          <motion.img
            src={gotekLogo}
            alt="GOTEK Logo"
            className="h-[72px] w-auto object-contain mix-blend-multiply bg-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          />
        </Link>
      </div>

      {/* CENTER: Desktop Navigation Links Centered */}
      <nav
        id="navbar-desktop-nav"
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 font-sans text-[15px] font-bold tracking-wide"
      >
        {/* Home */}
        <Link
          to="/"
          className={`px-3 py-2 transition-colors ${location.pathname === "/" ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          Home
        </Link>

        {/* About */}
        <Link
          to="/about"
          className={`px-3 py-2 transition-colors ${location.pathname === "/about" ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          About Us
        </Link>

        {/* Solutions Dropdown Menu */}
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsSolutionsOpen(true)}
          onMouseLeave={() => setIsSolutionsOpen(false)}
        >
          <button
            className={`px-3 py-2 transition-colors flex items-center gap-1 ${location.pathname === "/manufacturing" || location.pathname === "/it-solutions"
              ? "text-blue-600 font-extrabold"
              : "text-zinc-650 hover:text-blue-600"
              }`}

            data-cursor="pointer"
          >
            Our Solutions
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isSolutionsOpen ? "rotate-180 text-blue-600" : ""
                }`}
            />
          </button>

          {/* Dropdown Card Box */}
          <AnimatePresence>
            {isSolutionsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full pt-4 w-[480px] z-50 pointer-events-auto"
              >
                <div className="bg-white border border-zinc-200 p-5 shadow-xl grid grid-cols-2 gap-4">
                  {/* Printing and Corporate Solution - Blue highlight */}
                  <Link
                    to="/manufacturing"
                    className="p-4 border border-zinc-100 hover:border-blue-600 hover:bg-zinc-50 transition-all flex flex-col items-start gap-2.5 text-left"
                    data-cursor="expand"
                  >
                    <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-600">
                      <Printer className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-blue-600 tracking-tight">
                        Printing and Corporate Gifting
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 font-bold mt-1 leading-normal">
                        Custom ID cards, lanyard printing, RFID cards, and corporate gifting.
                      </p>
                    </div>
                  </Link>

                  {/* IT Solutions - Red highlight */}
                  <Link
                    to="/it-solutions"
                    className="p-4 border border-zinc-100 hover:border-red-600 hover:bg-zinc-50 transition-all flex flex-col items-start gap-2.5 text-left"
                    data-cursor="expand"
                  >
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-600">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-red-600 tracking-tight">
                        IT & Software Solutions
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 font-bold mt-1 leading-normal">
                        Smart AI Campus (SAC), custom software development, and online retail stores.
                      </p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products */}
        <Link
          to="/products"
          className={`px-3 py-2 transition-colors ${location.pathname === "/products" ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          Products
        </Link>

        {/* Clients */}
        <Link
          to="/clients"
          className={`px-3 py-2 transition-colors ${location.pathname === "/clients" ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          Clients
        </Link>

        {/* Careers */}
        <Link
          to="/careers"
          className={`px-3 py-2 transition-colors ${location.pathname.startsWith("/careers") ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          Careers
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          className={`px-3 py-2 transition-colors ${location.pathname === "/contact" ? "text-blue-600 font-extrabold" : "text-zinc-650 hover:text-blue-600"
            }`}
          data-cursor="pointer"
        >
          Contact
        </Link>
      </nav>

      {/* RIGHT: Mobile Toggle Button */}
      <div id="navbar-right-layout" className="flex items-center gap-4 md:gap-6">
        {/* Mobile menu Toggle Button - now on the far right on mobile layout */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-12 h-12 border border-zinc-200 hover:border-blue-600 hover:bg-zinc-50 text-zinc-700 flex items-center justify-center transition-all rounded-none"
          data-cursor="pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE Slider Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-24 left-0 w-full h-[calc(100vh-6rem)] bg-white z-40 border-t border-zinc-200 p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-5 text-left font-sans font-bold text-base tracking-normal pt-2">
              <Link to="/" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>Home</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
              <Link to="/about" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
              <Link to="/products" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>Products</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
              <Link to="/clients" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>Clients</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
              <Link to="/careers" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>Careers</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
              <Link to="/contact" className="flex justify-between items-center py-2.5 border-b border-zinc-100 text-zinc-700">
                <span>Contact</span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>
            </div>

            {/* Simple Solutions Links on Mobile Footer menu */}
            <div className="flex flex-col gap-3 pt-6 border-t border-zinc-200">
              <span className="font-sans text-xs text-zinc-400 tracking-wider uppercase font-bold text-left block">
                Our Solutions
              </span>
              <div className="grid grid-cols-2 gap-3 text-left">
                <Link
                  to="/manufacturing"
                  className="p-3 border border-zinc-200 hover:border-blue-600 bg-zinc-50 hover:bg-white flex flex-col gap-1"
                >
                  <span className="font-sans text-xs font-bold text-blue-600">Printing and Corporate Gifting</span>
                </Link>
                <Link
                  to="/it-solutions"
                  className="p-3 border border-zinc-200 hover:border-red-600 bg-zinc-50 hover:bg-white flex flex-col gap-1"
                >
                  <span className="font-sans text-xs font-bold text-red-600">IT & Software Solutions</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
