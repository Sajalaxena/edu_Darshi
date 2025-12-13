// src/components/BackgroundFXPlans.jsx
import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function BackgroundFXPlans() {
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 20]);
  const y2 = useTransform(scrollY, [0, 300], [0, -15]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Soft dual gradient */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(circle at 85% 70%, rgba(56,189,248,0.20), transparent 60%)",
        }}
      />

      {/* Blurred glow circles */}
      <motion.div
        style={{ y: y1 }}
        className="absolute w-[440px] h-[440px] bg-indigo-300/20 blur-[150px] rounded-full top-[12%] left-[5%]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute w-[380px] h-[380px] bg-blue-300/20 blur-[140px] rounded-full top-[55%] right-[10%]"
      />

      {/* Floating premium icons */}
      {[
        { icon: "⭐", top: "18%", left: "22%" },
        { icon: "₹", top: "40%", left: "72%" },
        { icon: "👑", top: "65%", left: "30%" },
        { icon: "🚀", top: "78%", left: "80%" },
      ].map((i, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0.18, y: 0 }}
          animate={{
            opacity: [0.18, 0.32, 0.18],
            y: [0, -14, 0],
          }}
          transition={{
            duration: 7 + idx * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-4xl md:text-5xl"
          style={{ top: i.top, left: i.left }}
        >
          {i.icon}
        </motion.div>
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </div>
  );
}
