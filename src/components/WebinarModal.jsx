// src/components/WebinarModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 mt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-4 md:p-6 bg-gradient-to-r from-sky-50 to-white border-b">
          <div
            className="w-24 h-20 rounded-md overflow-hidden flex-shrink-0
              bg-gradient-to-br from-indigo-100 to-violet-100
              flex items-center justify-center"
          >
            {data.image ? (
              <img
                src={data.image}
                alt={data.title}
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
              {data.title}
            </h3>

            {/* Conditional Meta */}
            <p className="text-sm text-slate-500 mt-1">
              {data.type === "news" ? (
                <>
                  {data.publishedDate}
                  {data.source && ` • ${data.source}`}
                </>
              ) : (
                <>
                  {data.date} • {data.time}
                  {data.venue ? ` • ${data.venue}` : ""}
                </>
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 md:p-6 space-y-4 overflow-y-auto flex-1">
          {data.summary && (
            <p className="text-sm text-slate-600">{data.summary}</p>
          )}

          {data.description && (
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {data.description}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex justify-end gap-3">
            {data.registrationLink && (
              <button
                onClick={() => window.open(data.registrationLink, "_blank")}
                className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                More Details
              </button>
            )}

            {data.externalLink && (
              <button
                onClick={() => window.open(data.externalLink, "_blank")}
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Visit Link
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
