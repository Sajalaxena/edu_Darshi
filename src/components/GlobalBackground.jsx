// src/components/GlobalBackground.jsx
import React, { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const SYMBOLS = ["σ", "λ", "θ", "μ", "Δ", "α", "π", "Ω"];

export default function GlobalBackground() {
  const { scrollY } = useViewportScroll();
  const dynamicOpacity = useTransform(scrollY, [0, 600], [1, 0.85]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{ opacity: dynamicOpacity }}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* 🔵 Strong Global Blue Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, rgba(10,60,200,0.25) 0%, rgba(30,100,255,0.22) 40%, rgba(180,200,255,0.25) 100%)",
        }}
      />

      {/* 🔵 Top-left strong blue glow */}
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-[850px] h-[850px] rounded-full blur-[170px]"
        style={{
          background: "rgba(40,100,255,0.55)",
          top: "-200px",
          left: "-180px",
          x: mouse.x * -1.8,
          y: mouse.y * -1.8,
        }}
      />

      {/* 🟣 Right soft purple glow */}
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-[900px] h-[900px] rounded-full blur-[160px]"
        style={{
          background: "rgba(150,120,255,0.4)",
          bottom: "-250px",
          right: "-200px",
          x: mouse.x * 1.6,
          y: mouse.y * 1.6,
        }}
      />

      {/* 🔢 Floating Math Symbols */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[30px] md:text-[38px] font-semibold text-blue-900/20 select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.18, 0.5, 0.18],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {SYMBOLS[i % SYMBOLS.length]}
        </motion.div>
      ))}

      {/* Noise Layer */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </motion.div>
  );
}
