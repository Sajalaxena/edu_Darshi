import React from "react";
import { motion } from "framer-motion";

const SYMBOLS = ["σ", "λ", "θ", "μ", "Δ", "α", "π", "Ω"];

export default function SectionBackground({ children }) {
  return (
    <div className="relative py-16 px-4 overflow-hidden rounded-3xl my-12">
      {/* 🔵 Soft Blue Gradient */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl"
        style={{
          background:
            "linear-gradient(140deg, rgba(70,130,255,0.16), rgba(180,200,255,0.20), rgba(250,250,255,0.10))",
        }}
      />

      {/* 🔢 Floating math symbols */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[26px] md:text-[34px] text-blue-800/15 select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7 + Math.random() * 4,
            repeat: Infinity,
          }}
        >
          {SYMBOLS[i % SYMBOLS.length]}
        </motion.div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
