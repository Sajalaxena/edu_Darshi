// src/components/WhyChoose.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  {
    id: "open-access",
    number: "1",
 
    title: "An open access to the world’s best.",
    desc: "From Design to AI, there are thousands of top experts you can access anytime.",
  },
  {
    id: "personalized-advice",
    number: "2",
    title: "Personalized advice to accelerate your success.",
    desc: "1:1 mentorship sessions with tailored insights to fast-track your learning.",
  },
  {
    id: "achieve-goals",
    number: "3",
    title: "Achieve your long-term goals, easily.",
    desc: "Work with mentors through consistent sessions to achieve long-term outcomes.",
  },
];

export default function WhyChoose() {
  const navigate = useNavigate();
  const openDetail = (id) => navigate(`/why-choose-us#${id}`);

  return (
    <section className="relative py-20 container mx-auto px-6">
      {/* Faint gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-white pointer-events-none" />

      <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "var(--brand)" }}>
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
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-7 shadow-lg flex flex-col h-full cursor-pointer"
              onClick={() => openDetail(item.id)}
            >
              {/* Animated number badge */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full grid place-items-center text-lg font-semibold mb-6 shadow-md"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #ffe2e6, #ffd6d9)"
                      : i === 1
                      ? "linear-gradient(135deg, #e8d5ff, #f3e8ff)"
                      : "linear-gradient(135deg, #dce9ff, #e6f0ff)",
                  color:
                    i === 0 ? "#ff4f61" : i === 1 ? "#a855f7" : "#3b82f6",
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
