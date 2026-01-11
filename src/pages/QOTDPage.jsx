// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================= DATA ================= */

const QOTD_BANK = [
  {
    id: "jam-01",
    title: "Let A be a 2×2 matrix with determinant 5. What is det(2A⁻¹)?",
    options: ["1/5", "2/5", "4/5", "8/5"],
    answerIndex: 2,
    explanation: [
      "det(A⁻¹) = 1 / det(A) = 1/5",
      "det(2A⁻¹) = 2² × det(A⁻¹) = 4 × (1/5) = 4/5",
    ],
    youtube: "https://www.youtube.com/watch?v=example",
    date: "2026-01-10",
  },
];

/* ================= COMPONENT ================= */

export default function QOTDPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const currentQ = QOTD_BANK[0];

  useEffect(() => setSelected(null), []);

  function submitAnswer() {
    if (selected === null) {
      alert("Please select an option");
      return;
    }
    setResult({
      correct: selected === currentQ.answerIndex,
      question: currentQ,
    });
  }

  function closeAll() {
    setResult(null);
    navigate("/", { replace: true });
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center">
      {/* ================= MAIN MODAL ================= */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
          w-full sm:max-w-xl
          bg-white
          rounded-t-2xl sm:rounded-2xl
          max-h-[92vh]
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Question of the Day</h2>
            <p className="text-xs text-slate-500">JAM & GATE Mathematics</p>
          </div>
          <button
            onClick={closeAll}
            className="text-xl text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="text-xs text-slate-400 mb-2">{currentQ.date}</div>

          <h3 className="text-base sm:text-lg font-semibold leading-relaxed">
            {currentQ.title}
          </h3>

          <div className="mt-4 space-y-3">
            {currentQ.options.map((opt, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer
                  ${
                    selected === idx
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-slate-200"
                  }`}
              >
                <input
                  type="radio"
                  checked={selected === idx}
                  onChange={() => setSelected(idx)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t flex gap-3">
          <button
            onClick={submitAnswer}
            className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white font-medium"
          >
            Submit
          </button>
          <button
            onClick={closeAll}
            className="flex-1 py-2.5 rounded-lg border text-slate-600"
          >
            Close
          </button>
        </div>
      </motion.div>

      {/* ================= RESULT MODAL ================= */}
      {result && (
        <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3
              className={`text-xl font-bold ${
                result.correct ? "text-green-600" : "text-red-500"
              }`}
            >
              {result.correct ? "Correct 🎉" : "Incorrect"}
            </h3>

            {!result.correct && (
              <p className="mt-2 text-sm">
                Correct answer:{" "}
                <strong>
                  {result.question.options[result.question.answerIndex]}
                </strong>
              </p>
            )}

            <div className="mt-4">
              <h4 className="font-semibold">Explanation</h4>
              <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                {result.question.explanation.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={result.question.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-center"
              >
                Watch Solution
              </a>
              <button
                onClick={closeAll}
                className="flex-1 py-2 rounded-lg border"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
