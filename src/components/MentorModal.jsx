// src/components/MentorModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function MentorModal({ mentor, open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mentor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <div className="w-36 h-36 p-4 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
            <img src={mentor.img} alt={mentor.name} className="w-28 h-28 rounded-full object-cover" />
          </div>

          <div className="p-6 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold">{mentor.name}</h3>
                <div className="text-sm text-slate-600 mt-1">{mentor.title}</div>
                <div className="text-xs text-slate-500 mt-2">{mentor.short}</div>
              </div>

              <button onClick={onClose} className="text-slate-600 ml-4" aria-label="Close">
                ✕
              </button>
            </div>

            <p className="mt-4 text-slate-700">{mentor.bio}</p>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-slate-800">Qualifications</h4>
              <ul className="list-disc ml-5 mt-2 text-sm text-slate-700">
                {mentor.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {mentor.linkedin && (
                <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold">
                  LinkedIn
                </a>
              )}
              {mentor.email && (
                <a href={`mailto:${mentor.email}`} className="text-slate-600">
                  {mentor.email}
                </a>
              )}

              <div className="ml-auto">
                <button onClick={() => alert("Contact flow coming")} className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
