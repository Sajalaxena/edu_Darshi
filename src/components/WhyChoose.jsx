// src/components/WhyChoose.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  {
    id: "career-counselling",
    number: "1",
    title: "Career Counselling with Clarity & Confidence",
    desc: "Personalized career guidance to help you choose the right path—whether you're confused about jobs, higher studies, or switching fields. We assess your interests, strengths, and goals to create a clear, actionable roadmap aligned with real-world opportunities.",
    points: [
      "1:1 career counselling sessions",
      "Interest & skill assessment",
      "Personalized career roadmaps",
      "Course, certification & job recommendations",
      "Industry-informed, data-driven guidance",
    ],
  },
  {
    id: "exam-job-preparation",
    number: "2",
    title: "Academia & Industry Exam and Job Preparation",
    desc: "End-to-end preparation for academic admissions, research roles, and industry jobs. From mock tests to interview simulations, we prepare you to perform with confidence in highly competitive environments.",
    points: [
      "Mock tests & simulated interviews (BS, MS, PhD, faculty roles)",
      "Industry job interview preparation",
      "Tailored study materials & resources",
      "One-to-one mentorship from academia & industry experts",
      "Actionable feedback to improve performance",
    ],
  },
  {
    id: "workshops-internships",
    number: "3",
    title: "Job-Oriented Workshops & Internship Exposure",
    desc: "Hands-on workshops and real-world internship opportunities designed to build practical skills, professional confidence, and a strong career portfolio—guided by experienced mentors.",
    points: [
      "Expert-led workshops (resume, interviews, professional skills)",
      "Industry & research-focused skill training",
      "Live projects & supervised internships",
      "Portfolio & credential building",
      "Networking with mentors from academia & industry",
    ],
  },
];

export default function WhyChoose() {
  const navigate = useNavigate();
  const openDetail = (id) => navigate(`/why-choose-us#${id}`);

  return (
    <section className="relative py-20 container mx-auto px-6">
      {/* Faint gradient background */}
      <div className="absolute inset-0  pointer-events-none" />

      <h2
        className="text-4xl font-bold text-center mb-16"
        style={{ color: "var(--brand)" }}
      >
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-10 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="relative p-[2px] rounded-2xl bg-gradient-to-br from-indigo-200/40 to-blue-100/20 shadow-lg"
          >
            {/* Inner card (glassmorphism) */}
            <div
              className="bg-white/70 backdrop-blur-md rounded-2xl p-7 shadow-lg flex flex-col h-full cursor-pointer"
              onClick={() => openDetail(item.id)}
            >
              {/* Animated number badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-14 h-14 rounded-full grid place-items-center text-lg font-semibold mb-6 shadow-md"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #ffe2e6, #ffd6d9)"
                      : i === 1
                      ? "linear-gradient(135deg, #e8d5ff, #f3e8ff)"
                      : "linear-gradient(135deg, #dce9ff, #e6f0ff)",
                  color: i === 0 ? "#ff4f61" : i === 1 ? "#a855f7" : "#3b82f6",
                }}
              >
                {item.number}
              </motion.div>

              {/* Icon */}
              <div className="text-indigo-600 mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-slate-600 leading-relaxed text-[0.95rem] flex-grow">
                {item.desc}
              </p>

              {/* CTA */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-slate-400">Learn more</span>
                <motion.span
                  whileHover={{ x: 6 }}
                  className="text-blue-600 text-sm font-semibold"
                >
                  Read more →
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
