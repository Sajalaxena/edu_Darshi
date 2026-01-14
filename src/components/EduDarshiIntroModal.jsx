import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function EduDarshiIntroModal({ open, onClose }) {
  const closeRef = useRef(null);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Branding */}
        <div className="flex md:flex-col flex-row items-center justify-center gap-4 text-white p-6 md:p-10 bg-gradient-to-br from-indigo-600 to-blue-700">
          <img
            src="/logo.png"
            alt="EduDarshi"
            className="w-16 h-16 md:w-56 md:h-56"
          />

          <div className="text-center">
            <h2 className="text-xl md:text-3xl font-bold">EduDarshi</h2>
            <p className="mt-1 text-blue-100 text-xs md:text-base">
              Academic mentorship beyond coursework
            </p>
          </div>
        </div>

        {/* RIGHT – UPDATED CONTENT */}
        <div className="p-6 sm:p-8 flex flex-col justify-between relative">
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-200
                       flex items-center justify-center hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Postdocs & Academic / Industry Jobs
            </h3>

            <p className="mt-4 text-slate-700 font-medium">
              🎓 Just finished your Ph.D.? Congratulations!
            </p>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Thinking about postdoctoral positions or jobs in India or overseas,
              but confused about where to start?
              <br />
              <br />
              Whether it’s approaching professors, writing a strong research
              proposal, or preparing an effective SOP, we guide you through
              every step with clarity and structure.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>✔️ Postdoc opportunities (NPDF / NBHM / IPDF)</li>
              <li>✔️ Academic & industry job guidance</li>
              <li>✔️ Research proposal & SOP review</li>
              <li>✔️ Faculty outreach & application strategy</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) =>
                  e.target.checked &&
                  localStorage.setItem("hideIntroModal", "true")
                }
              />
              Don’t show again
            </label>

            <button
              className="px-6 py-2 rounded-md bg-indigo-600 text-white shadow hover:bg-indigo-700"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSesT8-qk5jfZoDXqjUfiCkq83xhfkZ6CfBekE74uGTpibWPcQ/viewform",
                  "_blank"
                )
              }
            >
              Register Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
