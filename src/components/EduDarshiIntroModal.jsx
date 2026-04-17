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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — larger max-w for desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-[900px] bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Branding (fixed on desktop) */}
        <div className="relative flex md:flex-col flex-row items-center justify-center gap-3 text-white p-5 md:p-10 bg-[#0B1120] shrink-0 md:w-[40%]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-blue-900/50" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          
          <img
            src="/logo.png"
            alt="EduDarshi"
            className="relative z-10 w-14 h-14 md:w-48 md:h-48 object-contain drop-shadow-xl"
          />
          <div className="relative z-10 text-center">
            <h2 className="text-xl md:text-3xl font-black tracking-tight">EduDarshi</h2>
            <p className="mt-1 flex items-center justify-center gap-2 text-blue-200 text-[11px] md:text-sm font-medium uppercase tracking-[0.1em] md:tracking-[0.15em]">
              <span className="hidden md:inline w-6 h-[1px] bg-blue-400/50"></span>
              Your Academic Sarathi
              <span className="hidden md:inline w-6 h-[1px] bg-blue-400/50"></span>
            </p>
            <p className="mt-2 text-emerald-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              Educate | Elevate | Empower
            </p>
          </div>
        </div>

        {/* RIGHT – Content (scrollable on desktop) */}
        <div className="p-6 md:p-10 flex flex-col justify-between relative bg-white md:w-[60%] md:overflow-y-auto">
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-sm z-20"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="mt-1 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 pr-8">
              Join EduDarshi
            </h3>
            <p className="mt-2 md:mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
              A mentorship-driven platform built to support students throughout their academic and career journey.
            </p>

            <div className="mt-6 md:mt-8 space-y-6">
              {/* Free Services */}
              <div>
                <h4 className="text-[15px] md:text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  Our free services:
                </h4>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-[15px] text-slate-600 pl-4">
                  <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0 mt-0.5">✔</span><span>Updates on job opportunities, admission openings, conferences & seminars</span></li>
                  <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0 mt-0.5">✔</span><span>Previous year question papers with structured solutions</span></li>
                  <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0 mt-0.5">✔</span><span>Daily question practice & concept reinforcement</span></li>
                </ul>
              </div>

              {/* Limited Time */}
              <div>
                <h4 className="text-[15px] md:text-base font-bold text-slate-800 flex items-center gap-2 mb-3 bg-amber-50 w-fit px-3 py-1 rounded-md text-amber-900 border border-amber-100">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse"></span>
                  🌟 Limited time free access:
                </h4>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-[15px] text-slate-600 pl-4">
                  <li className="flex gap-2.5 items-start"><span className="text-blue-500 shrink-0 mt-0.5">✔</span><span>Career counselling for informed academic & professional decisions</span></li>
                  <li className="flex gap-2.5 items-start"><span className="text-blue-500 shrink-0 mt-0.5">✔</span><span>Mock interviews for academic and career preparation</span></li>
                  <li className="flex gap-2.5 items-start"><span className="text-blue-500 shrink-0 mt-0.5">✔</span><span>Expert guidance sessions</span></li>
                  <li className="flex gap-2.5 items-start"><span className="text-blue-500 shrink-0 mt-0.5">✔</span><span>Live webinars, strategy sessions & doubt solving</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 md:mt-10 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <p className="text-sm md:text-base font-bold text-indigo-800 flex items-center gap-2">
                <span className="text-xl">👉</span>
                Register now and take the next step toward your dreams.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 md:mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between shrink-0">
            <label className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-800 transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                onChange={(e) =>
                  e.target.checked &&
                  localStorage.setItem("hideIntroModal", "true")
                }
              />
              Don't show again
            </label>

            <button
              onClick={handleRegisterClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 text-white text-[15px] md:text-base font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95 text-center flex justify-center items-center gap-2"
            >
              Register Now <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
