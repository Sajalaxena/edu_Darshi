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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [webinar, onClose]);

  if (!webinar) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative z-10 max-w-2xl w-[95%] bg-white rounded-xl shadow-lg p-6"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-600"
        >
          ✕
        </button>
        <div className="flex gap-4">
          {webinar.image && (
            <img
              src={webinar.image}
              alt=""
              className="w-28 h-20 object-cover rounded-md"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold">{webinar.title}</h3>
            <div className="text-sm text-slate-500 mt-1">
              {webinar.date} • {webinar.time} • {webinar.venue}
            </div>
            <ul className="list-disc pl-5 mt-3 text-sm">
              {webinar.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end gap-3">
              <a
                href={webinar.registration}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Register
              </a>
              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
