// src/components/WebinarModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function WebinarModal({ webinar, onClose }) {
  useEffect(() => {
    if (!webinar) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [webinar, onClose]);

  if (!webinar) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-start gap-4 p-4 md:p-6 bg-gradient-to-r from-sky-50 to-white border-b">
          <div className="w-28 h-20 rounded-md overflow-hidden flex-shrink-0 bg-slate-100">
            {webinar.image ? (
              <img
                src={webinar.image}
                alt={webinar.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              {webinar.title}
            </h3>
            <div className="text-sm text-slate-500 mt-1">
              {webinar.date} • {webinar.time} {webinar.venue ? `• ${webinar.venue}` : ""}
            </div>
          </div>

          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-2 text-slate-600 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="p-5 md:p-6">
          <p className="text-sm text-slate-700 mb-3">
            {/* optional short intro */}
            {webinar.summary || "Join our webinar to learn practical tips and strategies."}
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-4">
            {(webinar.points || []).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <div className="flex gap-3 justify-end">
            {webinar.registration ? (
              <a
                href={webinar.registration}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Register
              </a>
            ) : (
              <button
                onClick={() => alert("Registration link not provided yet.")}
                className="btn-primary"
              >
                Register
              </button>
            )}
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
