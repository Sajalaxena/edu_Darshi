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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — compact, same proportions as before, scrollable on small screens */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Branding (hidden on very small mobile, shown as top bar) */}
        <div className="flex md:flex-col flex-row items-center justify-center gap-3 text-white p-5 md:p-8 bg-gradient-to-br from-indigo-600 to-blue-700">
          <img
            src="/logo.png"
            alt="EduDarshi"
            className="w-12 h-12 md:w-36 md:h-36 object-contain"
          />
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-bold">EduDarshi</h2>
            <p className="mt-0.5 text-blue-100 text-[11px] md:text-sm">
              Your Academic Sarathi
            </p>
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="p-5 sm:p-7 flex flex-col justify-between relative">
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full border border-slate-200
                       flex items-center justify-center hover:bg-slate-100 text-slate-500 text-sm"
            aria-label="Close"
          >
            ✕
          </button>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 pr-6">
              Join EduDarshi
            </h3>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              A mentorship-driven platform built to support students throughout their academic and career journey.
            </p>

            {/* Free Services */}
            <div className="mt-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                Our free services:
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-600 pl-4">
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✔</span><span>Updates on job opportunities, admission openings, conferences & seminars</span></li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✔</span><span>Previous year question papers with structured solutions</span></li>
                <li className="flex gap-2"><span className="text-emerald-500 shrink-0">✔</span><span>Daily question practice & concept reinforcement</span></li>
              </ul>
            </div>

            {/* Limited Time */}
            <div className="mt-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                🌟 Limited time free access:
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-600 pl-4">
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">✔</span><span>Career counselling for informed academic & professional decisions</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">✔</span><span>Mock interviews for academic and career preparation</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">✔</span><span>Expert guidance sessions</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">✔</span><span>Live webinars, strategy sessions & doubt solving</span></li>
              </ul>
            </div>

            <p className="mt-4 text-sm font-semibold text-blue-600">
              👉 Register now and take the next step toward your dreams.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) =>
                  e.target.checked &&
                  localStorage.setItem("hideIntroModal", "true")
                }
              />
              Don't show again
            </label>

            <button
              onClick={handleRegisterClick}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-bold shadow hover:bg-indigo-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
