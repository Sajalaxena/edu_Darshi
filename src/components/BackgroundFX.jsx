import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

const mathSymbols = [
  "∑", "π", "λ", "Δ", "∞", "θ", "μ", "∂", "α", "β", "γ", "√", "∫"
];

const icons = [
  "/icons/cloud.svg",
  "/icons/bell.svg",
  "/icons/cube.svg",
  "/icons/star.svg",
  "/icons/spark.svg",
];

const avatars = [
  "/avatars/a1.png",
  "/avatars/a2.png",
  "/avatars/a3.png",
  "/avatars/a4.png",
  "/avatars/a5.png",
];

export default function PremiumBackground() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const list = [];

    avatars.forEach(src => {
      list.push({
        type: "avatar",
        src,
        size: rand(60, 90),
        top: rand(5, 75),
        left: rand(5, 85),
      });
    });

    icons.forEach(src => {
      list.push({
        type: "icon",
        src,
        size: rand(30, 50),
        top: rand(10, 80),
        left: rand(5, 90),
      });
    });

    mathSymbols.forEach(sym => {
      list.push({
        type: "math",
        sym,
        size: rand(22, 38),
        top: rand(10, 85),
        left: rand(5, 90),
      });
    });

    setElements(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* 🟣 Animated gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-32 w-[28rem] h-[28rem] bg-indigo-400/25 blur-[110px] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -bottom-40 -right-32 w-[32rem] h-[32rem] bg-pink-400/25 blur-[130px] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* 🔵 AI Particle Field */}
      <div className="absolute inset-0 opacity-[0.09] bg-[url('/noise.png')] mix-blend-soft-light"></div>

      {/* Floating Elements */}
      {elements.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            fontSize: el.size,
            opacity: 0.18,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 12, 0],
          }}
          transition={{
            duration: 6 + idx,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.type === "math" && (
            <span className="text-slate-700 font-light">{el.sym}</span>
          )}

          {el.type === "icon" && (
            <img src={el.src} className="w-full h-full opacity-[0.15]" />
          )}

          {el.type === "avatar" && (
            <img
              src={el.src}
              className="w-full h-full rounded-full opacity-[0.2]"
            />
          )}
        </motion.div>
      ))}

      {/* SVG Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]">
        <motion.line
          x1="10%" y1="40%" x2="90%" y2="60%"
          stroke="#4f46e5" strokeWidth="1"
          strokeLinecap="round"
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.line
          x1="20%" y1="80%" x2="80%" y2="20%"
          stroke="#ec4899" strokeWidth="1"
          strokeLinecap="round"
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}
