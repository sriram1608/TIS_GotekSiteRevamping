import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Building,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";

export default function Contact() {
  // Input form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendingState, setSendingState] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !email || !message) {
      setErrorMessage("Please complete all required fields: Full Name, Email, and Message.");
      return;
    }

    setSendingState("SENDING");
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSendingState("SUCCESS");
        setFullName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setSendingState("IDLE");
        setErrorMessage(result.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      setSendingState("IDLE");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div id="gotek-contact-root" className="gotek-page bg-[#f7f6f1] pt-32 pb-24 px-6 md:px-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">

        {/* Title head banner */}
        <div className="border-b border-zinc-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <ScrollReveal id="contact-breadcrumbs-title">
            <div className="flex flex-col gap-3 text-left">
              <span className="text-xs uppercase tracking-[3px] text-blue-600 font-bold px-3 py-1 bg-white border border-zinc-200 w-fit">
                Contact Gotek
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl font-black text-zinc-900 leading-none mt-2">
                Get in <span className="text-blue-600">Touch</span>
              </h1>
              <p className="text-[15px] text-zinc-500 font-semibold max-w-lg">
                Contact us to discuss your printing, corporate gifting, or software requirements. We’ll help you find the best solution for your business needs.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Info & form blocks split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 text-left">

          {/* Left: Contact Info card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal id="contact-left-tag">
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                Corporate Headquarters
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1} id="contact-mfg-office-card">
              <div className="bg-white border border-zinc-200 p-6 md:p-8 hover:border-blue-605 transition-all duration-350 flex flex-col gap-6">
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-600 w-fit">
                  <Building className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-sans text-lg font-bold text-zinc-900">
                    GOLDEN TEC
                  </h3>
                  <span className="text-[13px] font-semibold text-zinc-400 mt-1">Corporate Office & Manufacturing HQ</span>
                </div>

                {/* Info List */}
                <div className="flex flex-col gap-6">
                  {/* Map physical */}
                  <div className="flex gap-3.5 text-zinc-650">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="font-sans text-sm font-bold text-zinc-900">
                        Register Office Location
                      </h4>
                      <p className="text-[13px] leading-relaxed font-semibold">
                        O.No. 166/1, N.N. 317/1, Konnur High Road, Ayanavaram, Chennai-600023. Landmark: Noor Hotel Bus Stop.
                      </p>
                    </div>
                  </div>

                  {/* Phones click to call */}
                  <div className="flex gap-3.5 text-zinc-650">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="font-sans text-sm font-bold text-zinc-900">
                        Phone Number
                      </h4>
                      <div className="flex flex-wrap font-mono text-xs font-bold gap-x-2 gap-y-1">
                        <a href="tel:04442160975" className="hover:text-blue-600 transition-colors">044 – 4216 0975</a>
                        <span className="text-zinc-300">|</span>
                        <a href="tel:+919840330975" className="hover:text-blue-600 transition-colors">+91 9840330975</a>
                      </div>
                    </div>
                  </div>

                  {/* Mail click to write */}
                  <div className="flex gap-3.5 text-zinc-650">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <h4 className="font-sans text-sm font-bold text-zinc-900">
                        Email Address
                      </h4>
                      <div className="flex flex-col font-mono text-xs font-bold gap-1">
                        <a href="mailto:info@gotekid.com" className="hover:text-blue-600 transition-colors">info@gotekid.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>


          </div>

          {/* Right: Enquiry submission form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" id="contact-form-side-reveal">
              <div className="bg-white border border-zinc-200 p-6 md:p-8 hover:border-blue-605 transition-all duration-300 shadow-sm relative">

                {sendingState === "SUCCESS" ? (
                  /* Success Frame */
                  <div className="py-12 px-6 text-center flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-2">
                      <FileCheck className="w-6 h-6 animate-bounce" />
                    </div>
                    <h3 className="font-sans text-xl font-bold text-zinc-900 tracking-tight">
                      Message Submitted Successfully
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold max-w-sm leading-relaxed mt-1">
                      Your inquiry has been cataloged. Our liaison will follow up with you within 8 business hours.
                    </p>
                    <button
                      onClick={() => setSendingState("IDLE")}
                      className="mt-6 px-6 py-3 bg-blue-600 text-white font-mono text-[10px] font-bold uppercase hover:bg-blue-750 transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  /* Form structure */
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] text-blue-600 font-bold tracking-widest leading-none">BUSINESS ENQUIRY</span>
                      <h3 className="font-sans text-xl font-bold text-zinc-900">
                        Inquiry Specification Form
                      </h3>
                    </div>

                    {/* Inline Validation Banner */}
                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] font-bold text-zinc-700">
                        Full Name (Required)
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anand Kumar"
                        className="w-full bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-blue-650"
                      />
                    </div>

                    {/* Row group info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[11px] font-bold text-zinc-700">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 99000-xxxxx"
                          className="w-full bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-blue-650"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[11px] font-bold text-zinc-700">
                          Email Address (Required)
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. anand@company.com"
                          className="w-full bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-blue-650"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] font-bold text-zinc-700">
                        Describe your requirements (Required)
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your design specifications or software integration details..."
                        className="w-full bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-blue-650 resize-none"
                      />
                    </div>



                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sendingState === "SENDING"}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold tracking-[2px] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-1"
                    >
                      <span>{sendingState === "SENDING" ? "Transmitting specs..." : "Submit inquiry"}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </div>
  );
}
