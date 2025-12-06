// src/components/WhyChoose.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Improved clickable cards:
 * - clear visual affordance (hover lift + CTA)
 * - smaller title and tighter spacing for compact look
 * - navigates to /why-choose-us#<sectionId> so details page can auto-scroll
 */

const items = [
  {
    id: "career-counselling",
    title: "Career Counselling",
    desc: "Tailored plans based on your goals and progress.",
  },
  {
    id: "exams-prep",
    title: "Academia & Industry Exams / Job Prep",
    desc: "Mentors from top institutes with proven track records.",
  },
  {
    id: "workshops-internships",
    title: "Job-Oriented Workshops & Internships",
    desc: "Clear milestones and practice materials for your target exam.",
  },
];

export default function WhyChoose() {
  const navigate = useNavigate();

  function openDetail(sectionId) {
    // navigate to details page and include hash for scrolling
    navigate(`/why-choose-us#${sectionId}`);
  }

  return (
    <section className="my-12 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: "var(--brand)" }}
      >
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.button
            key={it.id}
            onClick={() => openDetail(it.id)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            // visual/click affordance
            className="group relative text-left rounded-xl p-6 bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`Open details: ${it.title}`}
          >
            <div className="flex items-start gap-4">
              {/* small decorative icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-blue-50 grid place-items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2v20"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 9h14"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                  {it.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>

            {/* CTA that appears visibly on the right/bottom for clarity */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs text-slate-400">
                Learn more about this
              </div>

              <div className="text-sm font-medium text-blue-600 opacity-90 group-hover:translate-x-1 transition-transform">
                Read more →
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
