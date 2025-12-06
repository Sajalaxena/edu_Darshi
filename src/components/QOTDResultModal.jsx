// src/components/QOTDResultModal.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function ResultModal({ result, onClose }) {
  useEffect(() => {
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
  }, [onClose]);

  if (!result) return null;
  const { correct, question } = result;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full bg-white rounded-lg shadow-lg p-6"
      >
        <button className="absolute right-3 top-3" onClick={onClose}>
          ✕
        </button>

        <div className="text-center">
          {correct ? (
            <>
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--brand)" }}
              >
                🎉 Correct!
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Great job — you got the Question of the Day right.
              </div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-rose-500">
                ✖ Incorrect
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Correct answer:{" "}
                <strong>{question.options[question.answerIndex]}</strong>.
              </div>
            </>
          )}

          <div className="mt-4 text-left">
            <h4 className="font-semibold">Explanation</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              {question.explanation.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex gap-3 justify-center">
            <a
              href={question.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Watch Solution
            </a>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
