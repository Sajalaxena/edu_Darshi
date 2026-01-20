// src/components/MentorModal.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MentorModal({ mentor, open, onClose }) {
  const closeBtnRef = useRef(null);
   const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus trap for accessibility
    setTimeout(() => closeBtnRef.current?.focus(), 100);

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mentor) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="
          relative z-10 
          w-[92%] sm:w-[85%] md:w-[650px] 
          max-h-[88vh] overflow-y-auto 
          bg-white rounded-2xl shadow-2xl
          border border-slate-200
        "
      >

        {/* Header section with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-5 rounded-t-2xl text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{mentor.name}</h2>
            <p className="text-sm opacity-90">{mentor.title}</p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close modal"
            className="
              p-2 rounded-full bg-white/20 hover:bg-white/30 
              focus:ring-2 focus:ring-white 
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Content area */}
        <div className="p-6">
          
          {/* Profile row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={mentor.img}
              alt={mentor.name}
              className="w-28 h-28 rounded-full object-cover shadow-lg ring-4 ring-indigo-100"
            />

            <div className="flex-1 text-center sm:text-left">
              <p className="text-slate-600 text-sm">{mentor.short}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-5 text-slate-700 leading-relaxed">
            {mentor.bio}
          </p>

          {/* Qualifications */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-800">
              Qualifications
            </h4>
            <ul className="space-y-2 mt-2 text-sm text-slate-700">
              {mentor.qualifications.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500 mt-[3px]">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Links + contact */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">

            {mentor.linkedin && (
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline font-medium text-sm"
              >
                🔗 Portfolio
              </a>
            )}

            {/* {mentor.email && (
              <a
                href={`mailto:${mentor.email}`}
                className="text-slate-600 hover:text-slate-800 text-sm"
              >
                ✉️ {mentor.email}
              </a>
            )} */}

            <button
  onClick={() =>
    navigate("/home", { state: { scrollTo: "contact" } })
  }
  className="
    px-4 py-2 bg-indigo-600 text-white rounded-md
    hover:bg-indigo-700 shadow text-sm
  "
>
  Contact
</button>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
