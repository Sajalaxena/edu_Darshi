// src/pages/WhyChooseDetails.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function WhyChooseDetails() {
  const nav = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-2", "ring-indigo-200");
        setTimeout(
          () => el.classList.remove("ring-2", "ring-indigo-200"),
          1200
        );
      }
    }, 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <section className="relative min-h-screen bg-slate-50">
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#0B1120] overflow-hidden pt-24 pb-32 mb-10">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-white/10">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-indigo-500/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-blue-500/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10">
          <button
            onClick={() => nav(-1)}
            className="group flex items-center gap-2 text-blue-300/80 hover:text-blue-200 mb-8 transition-colors"
          >
            <div className="p-1 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </button>

          <div className="text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               transition={{ duration: 0.5 }} 
               className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md"
            >
              Platform Excellence
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
            >
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-600">EduDarshi?</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light"
            >
              At EduDarshi, we understand the challenges students and researchers
              face at every stage of their academic and professional journey. From
              missing important deadlines to feeling uncertain about the next step,
              we are here to guide and support you with the right mentorship,
              opportunities, and preparation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Content Container (Overlapping effect) ── */}
      <div className="relative z-20 -mt-16 container mx-auto px-6 pb-20">
        <div className="grid gap-10 max-w-5xl mx-auto">
          {/* CARD 1 — Timely Updates */}
          <section
            id="timely-updates"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">📢</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Timely Updates on Opportunities
                </h2>
                <p className="text-slate-500">Never miss an important deadline again.</p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Have you ever missed an application deadline, a conference
              announcement, or an important job opening simply because you were
              not aware of it in time? We have been there too, and we understand
              how frustrating that can be.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              At EduDarshi, we bring all essential updates together in one place
              so that you stay informed and prepared.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <li>✔ Job openings and internship opportunities</li>
              <li>✔ Admission notifications and application deadlines</li>
              <li>✔ Conferences, seminars, and workshops</li>
              <li>✔ Fellowships, scholarships, and research calls</li>
            </ul>
          </section>

          {/* CARD 2 — Career Counselling */}
          <section
            id="career-counselling"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Career Counselling
                </h2>
                <p className="text-slate-500">
                  Find clarity. Make confident career decisions.
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Completed your bachelor’s or master’s degree and still unsure about
              what comes next? Many students struggle with questions such as:
              Should I go for higher studies or a job? Which field best matches
              my interests? How do I transition into research or industry?
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              Our career counselling helps you understand your strengths,
              interests, and long-term goals, and converts them into a
              personalized roadmap.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <li>✔ Higher studies guidance</li>
              <li>✔ Research vs industry pathway support</li>
              <li>✔ Course and certification planning</li>
              <li>✔ Long-term career strategy</li>
            </ul>
          </section>

          {/* CARD 3 — Mentorship Programs */}
          <section
            id="mentorship-programs"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">👩‍🏫</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Mentorship Programs
                </h2>
                <p className="text-slate-500">
                  Personalized guidance from experts who understand your journey.
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Whether you are preparing for job interviews, PhD admissions,
              postdoctoral positions, or faculty roles, it is common to feel out
              of touch or lacking confidence. Our mentorship programs are
              designed to help you rebuild confidence, organize your thoughts,
              and prepare effectively.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              We conduct guided mock interviews and mentoring sessions to help you
              revisit concepts, articulate your ideas clearly, and perform
              confidently.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <li>✔ PhD / Postdoc interview preparation</li>
              <li>✔ Research discussion practice</li>
              <li>✔ Academic and industry mock interviews</li>
              <li>✔ One-to-one expert mentorship</li>
            </ul>
          </section>

          {/* CARD 4 — Additional Features */}
          <section
            id="additional-features"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">📚</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Additional Features
                </h2>
                <p className="text-slate-500">More tools for your success</p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4 text-slate-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                Curated question bank for regular practice
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                Mentors from top institutes such as IITs, IISc, and NITs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                Growing learning resources and academic support every day
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span>
                Structured solutions and concept-based guidance
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => nav("/mentors")}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Explore Our Mentors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

