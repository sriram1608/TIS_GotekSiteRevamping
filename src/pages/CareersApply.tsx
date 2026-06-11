import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2, User, Mail, Paperclip, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import { CAREER_JOBS } from "../data";

export default function CareersApply() {
  const [searchParams] = useSearchParams();
  const positionQuery = searchParams.get("position");

  // State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-fill position if present in credentials query parameter
  useEffect(() => {
    if (positionQuery) {
      setPosition(positionQuery);
    } else if (CAREER_JOBS.length > 0) {
      setPosition(CAREER_JOBS[0].title);
    }
  }, [positionQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please provide required variables: FULL_NAME and EMAIL_ADDRESS");
      return;
    }
    setSubmitting(true);
    // Simulate API transmission delay
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="gotek-page bg-bg-dark pt-32 pb-24 px-6 md:px-12 font-sans overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full relative z-10">
        
        {/* Navigation back button */}
        <ScrollReveal id="apply-back-reveal">
          <Link
            to="/careers"
            className="group inline-flex items-center gap-2 text-xs font-sans font-semibold text-zinc-500 hover:text-accent transition-colors mb-8"
            data-cursor="pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            Back to Careers
          </Link>
        </ScrollReveal>

        {success ? (
          /* Success Receipt state */
          <ScrollReveal id="apply-success-reveal">
            <div className="glass-container p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-none">
                Application Received
              </h2>
              <p className="font-sans text-sm text-zinc-650 max-w-sm leading-relaxed">
                We have registered your application details for: <span className="text-accent font-bold">{fullName}</span>.
                Our recruitment team will review your credentials and contact you in 48 business hours if there's alignment.
              </p>
              
              <div className="p-5 bg-zinc-50 border border-zinc-200 font-sans text-xs text-left text-zinc-600 flex flex-col gap-2.5 w-full max-w-md">
                <span className="font-semibold text-zinc-800">Logged Details:</span>
                <span>• Position: {position}</span>
                <span>• Contact email: {email}</span>
                <span>• Resume: {resumeUrl || "Pending Link"}</span>
              </div>

              <Link
                to="/careers"
                className="mt-4 px-6 py-3.5 bg-accent text-white font-sans text-xs font-bold uppercase tracking-[1.5px] hover:bg-[#0019bf] transition-colors"
              >
                Return to Careers
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          /* The Interactive Form container */
          <ScrollReveal id="apply-form-container-reveal">
            <div className="glass-container p-8 md:p-12 shadow-xl flex flex-col gap-8 text-left">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[80px] font-black text-accent/10 leading-none">AP-99</span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none mt-[-50px]">
                  Submit Job Application
                </h2>
                <p className="font-sans text-sm text-zinc-500 leading-relaxed font-light mt-1">
                  Fill out the fields below to submit your portfolio and cover letter detail to Gotek's talent team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Row 1: Full Name and Email Address (Two Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-accent" />
                      Full Name (Required)
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full legal name"
                      className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-accent transition-all rounded-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      Email Address (Required)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-accent transition-all rounded-none"
                    />
                  </div>
                </div>

                {/* Row 2: Select Dropdown for Position */}
                <div className="flex flex-col gap-2 font-sans">
                  <label className="text-xs font-semibold text-zinc-700">
                    Position of Interest
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-accent transition-all rounded-none"
                  >
                    <option value="General Talent Pool">General Talent Pool</option>
                    {CAREER_JOBS.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title} — {job.department}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3: Resume URL / Portfolio URL */}
                <div className="flex flex-col gap-2 font-sans">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-accent" />
                    Resume URL / Portfolio Link
                  </label>
                  <input
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://drive.google.com/your-resume"
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-accent transition-all rounded-none"
                  />
                  <span className="text-[11px] text-zinc-400">
                    Host your PDF on Google Drive, Dropbox, or GitHub, and enter the link here.
                  </span>
                </div>

                {/* Row 4: Introduction Details */}
                <div className="flex flex-col gap-2 font-sans">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-accent" />
                    Introduction & Cover Message
                  </label>
                  <textarea
                    rows={5}
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="Briefly describe your experience, skills, and why you are interested in Gotek..."
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-accent resize-none transition-all rounded-none"
                  />
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-accent hover:bg-[#0019bf] text-white font-sans text-xs font-bold tracking-[1.5px] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-4 rounded-none"
                  data-cursor="pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Submitting application..." : "Submit Application"}</span>
                </button>

              </form>
            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  );
}
