// src/components/RisingStarsModal.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Responsive RisingStarsModal
 * Props:
 * - open (bool)
 * - onClose (fn)
 * - students (array of { id, name, exam, brief, image })
 * - onDontShowAgainToggle (fn taking bool) optional
 *
 * Notes:
 * - Modal is centered on large screens.
 * - On small screens it's inset and near-fullscreen so header/footer are always visible.
 * - Body scrolling is locked when modal open and restored on close.
 */

export default function RisingStarsModal({
  open,
  onClose,
  students = [],
  onDontShowAgainToggle,
}) {
  const navigate = useNavigate();
  const closeRef = useRef(null);
  const prevOverflow = useRef("");

  useEffect(() => {
    if (!open) return;

    // Prevent background scroll while modal is open
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to close button (accessibility)
    setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow.current || "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      aria-hidden={open ? "false" : "true"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Our Rising Stars"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.16 }}
        className="relative z-10 w-full max-w-3xl rounded-xl shadow-2xl bg-white"
        style={{
          // mobile: almost full height; desktop: natural height
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (sticky) */}
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-5 border-b
                        bg-gradient-to-r from-indigo-50 to-white rounded-t-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
              Our Rising Stars
            </h3>
            <p className="text-sm text-slate-500">
              Celebrating student wins — click show more for full list
            </p>
          </div>

          {/* Close button always visible and reachable */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close modal"
            className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200
                       bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            title="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="p-4 sm:p-5 overflow-auto"
          style={{ flex: "1 1 auto" }}
        >
          <div className="grid grid-cols-1 gap-4">
            {students && students.length ? (
              students.map((s) => (
                <article
                  key={s.id || s.name}
                  className="flex gap-4 items-start bg-white rounded-lg border p-4 shadow-sm"
                >
                  {/* avatar */}
                  <div className="flex-shrink-0">
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-16 h-16 rounded-full object-cover shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        {/* simple placeholder icon */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* text */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-800">{s.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.exam || ""}</div>
                      </div>
                      {/* optional badge or verified icon */}
                      <div className="text-xs text-slate-400"> {/* placeholder */} </div>
                    </div>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {s.brief}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center text-slate-500 py-8">No student stories available.</div>
            )}
          </div>
        </div>

        {/* Footer (sticky) */}
        <div className="flex items-center justify-between gap-4 p-3 sm:px-5 sm:py-4 border-t bg-white rounded-b-xl">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="w-4 h-4 rounded"
              onChange={(e) =>
                onDontShowAgainToggle && onDontShowAgainToggle(e.target.checked)
              }
            />
            Don’t show again
          </label>

          <div className="flex items-center gap-3">
            <button
              className="px-3 py-2 rounded-md text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              onClick={() => {
                onClose();
                navigate("/rising-stars");
              }}
            >
              Show more
            </button>

            <button
              className="px-3 py-2 rounded-md text-sm bg-indigo-600 text-white shadow hover:bg-indigo-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
