// src/components/TopInstitutesSlider.jsx
import React from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "IIT Bombay", svg: "/IIT_BOMBAY.png" },
  { name: "IIT Delhi", svg: "/IIT_Delhi.png" },
  { name: "IIT Jodhpur", svg: "/IIT_Jodhpur.png" },
  { name: "IIT Madras", svg: "/IIT_Madras.png" },
  { name: "IISc Banglore", svg: "/IISc_Banglore.png" },
  { name: "IISER Bhopal", svg: "/IISER_Bhopal.png" },
  { name: "IISER Pune", svg: "/iiser-pune.png" },
  { name: "IIT Kharagpur", svg: "/IIT-kharagpur.jpg" },
  { name: "IIT BHU", svg: "/iit-bhu.png" },
  { name: "TIFR", svg: "/tifr.png" },
];

export default function TopInstitutesSlider() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden ">
      {/* Gradient Accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3"
            style={{ color: "var(--brand-deep)" }}
          >
            Our Mentors Come From
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Learn from experts at India's premier institutions
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        {/* Infinite Slider – All Screens */}
        <div className="relative">
          {/* Edge fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="overflow-hidden py-6">
            <motion.div
              className="flex gap-6 lg:gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30, // slower for desktop
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...LOGOS, ...LOGOS].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -6 }}
                  className="flex-shrink-0 bg-white rounded-2xl p-6 lg:p-8 shadow-lg w-[160px] lg:w-[220px]"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 lg:h-20 flex items-center justify-center">
                      <img
                        src={item.svg}
                        alt={item.name}
                        className="max-h-16 lg:max-h-20 w-auto object-contain transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm lg:text-base font-bold text-slate-800 text-center leading-tight">
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
