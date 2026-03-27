import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";

const EQUATIONS = [
  "∫ eˣ dx = eˣ + C",
  "x = (-b ± √(b² - 4ac)) / 2a",
  "e^(iπ) + 1 = 0",
  "a² + b² = c²",
  "∇ · E = ρ / ε₀",
  "F = G(m₁m₂)/r²",
  "Δx Δp ≥ ℏ / 2",
  "iℏ ∂Ψ/∂t = HΨ",
];

export default function MathLoader({ text = "Calculating results..." }) {
  const [eqIndex, setEqIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEqIndex((prev) => (prev + 1) % EQUATIONS.length);
    }, 1500); // Switch equation every 1.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] min-h-[400px] flex flex-col items-center justify-center p-6">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl shadow-indigo-500/30 flex items-center justify-center mb-8 rotate-3"
      >
        <Calculator size={36} className="text-white" />
      </motion.div>

      <div className="h-16 relative w-full max-w-sm flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={eqIndex}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute text-2xl md:text-3xl font-black text-slate-800 tracking-wider text-center"
            style={{ fontFamily: "'Cambria Math', 'Times New Roman', serif" }}
          >
            {EQUATIONS[eqIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-slate-500 font-semibold uppercase tracking-widest text-sm"
      >
        {text}
      </motion.p>
    </div>
  );
}
