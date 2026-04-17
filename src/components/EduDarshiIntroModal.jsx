import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EduDarshiIntroModal({ open, onClose }) {
  const closeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 80);

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleRegisterClick = () => {
    navigate("/plans");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-[40%_60%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Branding */}
        <div className="relative flex md:flex-col flex-row items-center justify-center gap-4 text-white p-8 md:p-12 bg-[#0B1120] overflow-hidden">
          {/* Decorative background for the left part */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          
          <img
            src="/logo.png"
            alt="EduDarshi"
            className="relative z-10 w-20 h-20 md:w-64 md:h-64 object-contain drop-shadow-2xl"
          />

          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">EduDarshi</h2>
            <p className="mt-2 text-blue-200 text-xs md:text-sm font-medium uppercase tracking-[0.2em]">
              Your Academic Sarathi
            </p>
          </div>
        </div>

        {/* RIGHT – CONTENT */}
        <div className="p-8 sm:p-12 flex flex-col justify-between relative bg-white">
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-slate-100
                       flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all"
            aria-label="Close"
          >
            <span className="text-xl">✕</span>
          </button>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Join EduDarshi
            </h3>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              A mentorship-driven platform built to support students throughout their academic and career journey.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {/* Free Services */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Our free services:
                </h4>
                <ul className="space-y-3 text-[14px] text-slate-600">
                  <li className="flex gap-2 shrink-0">
                    <span className="text-emerald-500">✔</span>
                    <span>Updates on job opportunities, admission openings, conferences, and seminars</span>
                  </li>
                  <li className="flex gap-2 shrink-0">
                    <span className="text-emerald-500">✔</span>
                    <span>Previous year question papers with structured solutions</span>
                  </li>
                  <li className="flex gap-2 shrink-0">
                    <span className="text-emerald-500">✔</span>
                    <span>Daily question practice & concept reinforcement</span>
                  </li>
                </ul>
              </div>

              {/* Limited Time Access */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  🌟 Limited time free access:
                </h4>
                <ul className="space-y-3 text-[14px] text-slate-600">
                  <li className="flex gap-2 shrink-0">
                    <span className="text-blue-500">✔</span>
                    <span>Career counselling for informed academic and professional decisions</span>
                  </li>
                  <li className="flex gap-2 shrink-0">
                    <span className="text-blue-500">✔</span>
                    <span>Mock interviews for academic and career preparation</span>
                  </li>
                  <li className="flex gap-2 shrink-0">
                    <span className="text-blue-500">✔</span>
                    <span>Expert guidance sessions</span>
                  </li>
                  <li className="flex gap-2 shrink-0">
                    <span className="text-blue-500">✔</span>
                    <span>Live webinars, strategy sessions & doubt solving</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-10 font-bold text-blue-600 flex items-center gap-2">
              <span>👉</span>
              Register now and take the next step toward your dreams.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-slate-50 pt-8">
            <label className="inline-flex items-center gap-3 text-sm text-slate-500 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                onChange={(e) =>
                  e.target.checked &&
                  localStorage.setItem("hideIntroModal", "true")
                }
              />
              <span className="group-hover:text-slate-800 transition-colors">Don’t show again</span>
            </label>

            <button
              onClick={handleRegisterClick}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1"
            >
              Register Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
