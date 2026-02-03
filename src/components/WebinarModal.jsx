// src/components/WebinarModal.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebinarModal({ data, onClose }) {
  useEffect(() => {
    if (!data) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [data, onClose]);

  if (!data) return null;

  // ✅ Flexible date handling
  const startDate = data.startDate || data.date || data.publishedDate || "TBA";
  const redirectLink = data.registrationLink || data.externalLink;

  const deadline = data.time || data.endDate || data.source || "TBA";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6 mt-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-3xl 
          bg-white rounded-2xl 
          border border-blue-200 
          shadow-[0_25px_60px_rgba(0,0,0,0.25)] 
          flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* HEADER */}
          <div
            className="relative p-6 
          bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 
          text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold leading-snug">
                  {data.title}
                </h3>

                {/* Starts / Deadline */}
                <div className="mt-3 text-sm flex flex-wrap items-center gap-2">
                  <span className="text-green-200 font-medium">Starts:</span>
                  <span>{startDate}</span>

                  <span className="opacity-60 mx-2">•</span>

                  <span className="text-red-200 font-medium">Deadline:</span>
                  <span>{deadline}</span>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex gap-3 flex-wrap">
                {/* Register Button */}

                {/* More Details Button */}
                {data.moreLink && (
                  <button
                    onClick={() => window.open(data.moreLink, "_blank")}
                    className="px-6 py-3 rounded-full text-sm font-semibold
                    bg-white text-blue-700
                    border border-white/40
                    hover:bg-blue-50 transition"
                  >
                    More Details
                  </button>
                )}
              </div>
            </div>

            {/* Close Button */}
            {/* <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-lg"
              aria-label="Close"
            >
              ✕
            </button> */}
          </div>

          {/* BODY */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              {data.summary && (
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {data.summary}
                </p>
              )}

              {data.description && (
                <div className="mt-4 text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">
                  {data.description}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end border-t border-slate-200">
              {redirectLink && (
                <button
                  onClick={() => window.open(redirectLink, "_blank")}
                  className="px-6 py-3 rounded-full text-sm font-bold text-white
      bg-gradient-to-r from-indigo-600 to-purple-600
      shadow-xl shadow-indigo-500/30
      hover:scale-[1.05] transition-transform"
                >
                  More Details
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl 
                border border-slate-300 
                text-slate-700 
                hover:bg-slate-100 
                transition"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
