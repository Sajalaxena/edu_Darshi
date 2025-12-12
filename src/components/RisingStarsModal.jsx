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
 */

export default function RisingStarsModal({
  open,
  onClose,
  students = [],
  onDontShowAgainToggle,
}) {
  const navigate = useNavigate();
  const closeRef = useRef(null);
  const lastBodyOverflow = useRef("");

  useEffect(() => {
    if (!open) return;

    // lock background scroll
    lastBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // put focus on close button for keyboard users
    const t = setTimeout(() => {
      if (closeRef.current) closeRef.current.focus();
    }, 60);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = lastBodyOverflow.current || "";
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      aria-hidden={open ? "false" : "true"}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Rising Stars"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 w-full max-w-md sm:max-w-3xl md:max-w-4xl rounded-xl shadow-xl bg-white"
        style={{
          // ensure we don't overflow viewport; body locked so inner scroll is fine
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header (sticky) */}
        <div
          className="flex items-start justify-between px-4 py-3 sm:px-5 sm:py-4 border-b bg-white"
          style={{ flex: "0 0 auto" }}
        >
          <div>
            <h3 className="text-base sm:text-lg font-semibold">Our Rising Stars</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Celebrating student wins — click show more for full list
            </p>
          </div>

          {/* Visible, accessible close button with big hit area */}
          <button
            ref={closeRef}
            aria-label="Close rising stars modal"
            onClick={onClose}
            className="ml-3 inline-flex items-center justify-center p-2 rounded-full bg-white shadow-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
            style={{ flex: "0 0 auto" }}
          >
            {/* larger visual 'X' */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* body: scrollable content area */}
        <div className="p-3 sm:p-5 overflow-auto" style={{ flex: "1 1 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {students.length === 0 && (
              <div className="text-center text-slate-500 p-6">No rising stars to show.</div>
            )}

            {students.slice(0, 3).map((s) => (
              <article
                key={s.id || s.name}
                className="flex flex-col items-center text-center p-3 rounded-lg border"
                style={{ background: "linear-gradient(180deg, #ffffff, #fbfbfd)" }}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-24 h-24 rounded-full object-cover shadow-sm mb-3"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-100 mb-3" />
                )}

                <div className="font-semibold text-sm sm:text-base">{s.name}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">{s.exam}</div>
                <p className="text-sm text-slate-600 mt-2 line-clamp-4">
                  {s.brief}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* footer: actions */}
        <div
          className="flex items-center justify-between px-3 py-3 sm:px-5 sm:py-4 border-t bg-white"
          style={{ flex: "0 0 auto" }}
        >
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="w-4 h-4"
              onChange={(e) =>
                onDontShowAgainToggle && onDontShowAgainToggle(e.target.checked)
              }
            />
            Don’t show again
          </label>

          <div className="flex gap-2">
            <button
              className="btn-secondary px-3 py-2 rounded-md text-sm"
              onClick={() => {
                onClose();
                navigate("/rising-stars");
              }}
            >
              Show more
            </button>

            <button
              className="btn-primary px-3 py-2 rounded-md text-sm"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
