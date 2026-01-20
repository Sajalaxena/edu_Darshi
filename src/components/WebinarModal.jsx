// src/components/WebinarModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function WebinarModal({ webinar, onClose }) {
  useEffect(() => {
    if (!webinar) return;

    const onKey = (e) => e.key === "Escape" && onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-4 md:p-6 bg-gradient-to-r from-sky-50 to-white border-b">
          <div
            className="w-28 h-20 rounded-md overflow-hidden flex-shrink-0
                bg-gradient-to-br from-indigo-100 to-violet-100
                flex items-center justify-center"
          >
            {webinar.image ? (
              <img
                src={webinar.image}
                alt={webinar.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1v13a1 1 0 001 1z"
                />
              </svg>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              {webinar.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {webinar.date} • {webinar.time}
              {webinar.venue ? ` • ${webinar.venue}` : ""}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 space-y-4">
          {/* Short summary (optional) */}
          {webinar.summary && (
            <p className="text-sm text-slate-600">{webinar.summary}</p>
          )}

          {/* ✅ Full description */}
          {webinar.description && (
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {webinar.description}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex justify-end gap-3">
            {webinar.registrationLink && (
              <button
                onClick={() => window.open(webinar.registrationLink, "_blank")}
                className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                More Details
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
