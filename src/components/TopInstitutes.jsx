// src/components/TopInstitutesSlider.jsx
import React from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "IIT Bombay", svg: "/IIT_BOMBAY.png" },
  { name: "IIT Delhi", svg: "/IIT_Delhi.png" },
  { name: "IIT Jodhpur", svg: "/IIT_Jodhpur.png" },
  { name: "IIT Madras", svg: "/IIT_Madras.png" },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Our Mentors Come From
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Learn from experts at India's premier institutions
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {LOGOS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img
                    src={item.svg}
                    alt={item.name}
                    className="max-h-20 w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-base font-bold text-slate-800 text-center">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Infinite Scroll */}
        <div className="md:hidden relative">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...LOGOS, ...LOGOS].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white rounded-xl p-6 shadow-md w-[160px]"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 flex items-center justify-center">
                      <img
                        src={item.svg}
                        alt={item.name}
                        className="max-h-16 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 text-center leading-tight">{item.name}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
