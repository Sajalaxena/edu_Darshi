// src/components/ResultModal.jsx
import React from "react";

export default function ResultModal({ data, onClose }) {
  if (!data) return null;
  const { total, correct, name, exam } = data;
  const percent = Math.round((correct / total) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-[#0f172a] card p-6 z-50 max-w-md w-full text-center">
        <h3 className="text-2xl font-semibold mb-2">Test Result</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Name: <strong>{name}</strong> — Exam: <strong>{exam}</strong>
        </p>

        <div className="text-6xl font-bold" style={{ color: "var(--brand)" }}>
          {percent}%
        </div>
        <div className="mt-2 text-sm">
          Score: {correct} / {total}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
