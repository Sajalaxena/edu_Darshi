// src/components/BackgroundFXPlans.jsx
import React from "react";
import { motion } from "framer-motion";

const SYMBOLS = ["σ", "λ", "θ", "μ", "Δ", "α", "∑"];

export default function BackgroundFXPlans() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* BASE BLUE GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, #dbeafe 0%, transparent 60%),
            radial-gradient(circle at 80% 30%, #e0e7ff 0%, transparent 60%),
            linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)
          `,
        }}
      />

      {/* FLOATING MATH SYMBOLS */}
      {SYMBOLS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-300/30 font-semibold select-none"
          style={{
            fontSize: `${28 + i * 6}px`,
            top: `${10 + i * 12}%`,
            left: `${(i * 17) % 90}%`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s}
        </motion.div>
      ))}
    </div>
  );
}
