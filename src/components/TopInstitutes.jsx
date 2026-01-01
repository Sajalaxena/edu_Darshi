// src/components/TopInstitutesSlider.jsx
import React from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "IIT Bombay", svg: "/IIT_BOMBAY.png" },
  { name: "IIT Delhi", svg: "/IIT_Delhi.png" },
  { name: "IIT Jodhpur", svg: "/IIT_Jodhpur.png" },
  { name: "IIT Madras", svg: "/IIT_Madras.png" },
];

// Duplicate list for seamless loop
const SCROLL = [...LOGOS, ...LOGOS];

export default function TopInstitutesSlider() {
  return (
    <section
      className="relative py-20 overflow-hidden
      bg-gradient-to-b from-blue-50 via-indigo-50 to-white"
    >
      {/* soft radial glow */}
      {/* background glow (scroll-safe) */}
      <div className="absolute inset-0 pointer-events-none glow-clip isolate">
        <div
          className="absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[300px] h-[360px]
    bg-blue-200/30 rounded-full blur-3xl"
        />

        <div
          className="absolute top-[60%] left-[60%]
    -translate-x-1/2 -translate-y-1/2
    w-[300px] h-[300px]
    bg-indigo-200/30 rounded-full blur-3xl"
        />
      </div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-blue-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-50 to-transparent z-10" />

      <div className="relative z-20">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-slate-900">
          Our Mentors Come From
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-20"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "200%" }}
          >
            {SCROLL.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center
                  min-w-[160px] text-center
                  opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={item.svg}
                  alt={item.name}
                  className="h-16 sm:h-20 w-auto object-contain
                    drop-shadow-md"
                  loading="lazy"
                />
                <p className="mt-3 text-sm sm:text-base font-semibold text-slate-700">
                  {item.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
