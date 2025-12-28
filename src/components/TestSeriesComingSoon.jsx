// src/pages/TestSeriesComingSoon.jsx
import React from "react";
import { motion } from "framer-motion";
import { Exam, Timer, ChartLineUp } from "phosphor-react";

export default function TestSeriesComingSoon() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden
      bg-gradient-to-b from-blue-50 via-indigo-50 to-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full
          bg-indigo-100 text-indigo-700 text-sm font-semibold"
        >
          🚀 Launching Soon
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900"
        >
          EduDarshi Test Series
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg"
        >
          Smart, exam-aligned test series designed for{" "}
          <span className="font-semibold text-indigo-600">
            JAM, NET/JRF, GATE, CUET, PhD & Academia
          </span>
          . Built to track real progress — not just scores.
        </motion.p>

        {/* Feature cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Feature
            icon={<Exam size={28} />}
            title="Exam-Level Difficulty"
            desc="Questions curated by mentors from IITs & top institutes with real exam patterns."
          />
          <Feature
            icon={<ChartLineUp size={28} />}
            title="Detailed Analytics"
            desc="Topic-wise accuracy, time analysis, and performance trends after every test."
          />
          <Feature
            icon={<Timer size={28} />}
            title="Timed Mock Environment"
            desc="Real exam pressure simulation with auto-submission and ranking insights."
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-blue-600 to-indigo-600
            shadow-lg hover:shadow-xl hover:scale-[1.03] transition"
          >
            Notify Me When It Launches
          </a>

          <p className="mt-3 text-sm text-slate-500">
            We’ll notify you as soon as test series go live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Feature Card ---------- */

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: "linear-gradient(135deg,#DBEAFE,#E0E7FF)",
          color: "var(--brand)",
        }}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
