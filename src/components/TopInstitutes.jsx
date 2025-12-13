// src/components/TopInstitutesSlider.jsx
import React from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "IIT Bombay", svg: "/IIT_BOMBAY.png" },
  { name: "IIT Delhi", svg: "/IIT_Delhi.png" },
  { name: "IIT Jodhpur", svg: "/IIT_Jodhpur.jpg" },
  { name: "IIT Madras", svg: "/IIT_Madras.png" },
  // { name: "IISc Bengaluru", svg: "/IISc.png" },
  // { name: "ISRO", svg: "/ISRO.png" },
];

// Duplicate list for seamless loop
const SCROLL = [...LOGOS, ...LOGOS];

export default function TopInstitutesSlider() {
  return (
    <section className="py-14 relative overflow-hidden">

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>

      <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "var(--brand)" }}
      >
        Our Mentors Come From
      </h2>

      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-20"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "200%" }}
        >
          {SCROLL.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center min-w-[160px] opacity-80 hover:opacity-100 transition"
            >
              <img
                src={item.svg}
                alt={item.name}
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
                loading="lazy"
              />
              <p className="mt-3 text-sm sm:text-base font-semibold text-slate-700">
                {item.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
