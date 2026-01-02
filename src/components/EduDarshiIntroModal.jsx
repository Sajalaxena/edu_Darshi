import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EduDarshiIntroModal({ open, onClose }) {
  const navigate = useNavigate();
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
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT – Branding */}
        <div className="hidden md:flex flex-col justify-center items-center text-white p-10 bg-gradient-to-br from-indigo-600 to-blue-700">
          <img
            src="/logo.png"
            alt="EduDarshi"
            className="w-28 h-28 mb-6"
          />
          <h2 className="text-3xl font-bold">EduDarshi</h2>
          <p className="mt-2 text-blue-100 text-center">
            Guiding students to clarity, confidence & success
          </p>
        </div>

        {/* RIGHT – Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
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
              Learn smarter. Not harder.
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600 text-sm">
              <li>✔️ Expert-designed courses for JAM, JRF, GATE & NET</li>
              <li>✔️ Concept-first teaching with real exam focus</li>
              <li>✔️ Previous year papers & detailed solutions</li>
              <li>✔️ Research insights & live expert webinars</li>
              <li>✔️ Personal mentorship & doubt resolution</li>
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

            <div className="flex gap-3">
              {/* <button
                className="px-5 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
                onClick={onClose}
              >
                Close
              </button> */}

              <button
                className="px-6 py-2 rounded-md bg-indigo-600 text-white shadow hover:bg-indigo-700"
                onClick={() => {
                  onClose();
                  navigate("/register");
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
