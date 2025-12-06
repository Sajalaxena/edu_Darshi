// src/components/RisingStarsModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h3 className="text-xl font-semibold">Our Rising Stars</h3>
            <p className="text-sm text-slate-500">
              Celebrating student wins — click show more for full list
            </p>
          </div>
          <button
            aria-label="Close"
            className="text-slate-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.slice(0, 3).map((s) => (
            <article
              key={s.id}
              className="flex flex-col items-center text-center p-3 rounded-lg border"
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

              <div className="font-semibold">{s.name}</div>
              <div className="text-xs text-slate-500 mt-1">{s.exam}</div>
              <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                {s.brief}
              </p>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              onChange={(e) =>
                onDontShowAgainToggle && onDontShowAgainToggle(e.target.checked)
              }
            />
            Don’t show again
          </label>

          <div className="flex gap-3">
            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                navigate("/rising-stars");
              }}
            >
              Show more
            </button>

            <button
              className="btn-primary"
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
