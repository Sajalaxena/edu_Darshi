// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================= JAM / GATE MATH QOTD BANK ================= */

const QOTD_BANK = [
  {
    id: "jam-01",
    title: "Let A be a 2×2 matrix with determinant 5. What is det(2A⁻¹)?",
    options: ["1/5", "2/5", "4/5", "8/5"],
    answerIndex: 2,
    explanation: [
      "det(A⁻¹) = 1 / det(A) = 1/5",
      "det(2A⁻¹) = 2² · det(A⁻¹) = 4 × (1/5) = 4/5",
    ],
    youtube: "https://www.youtube.com/watch?v=example",
    date: "2026-01-10",
  },
  {
    id: "gate-02",
    title: "If f(x) = |x| is differentiable at x = a, then a must be",
    options: ["a > 0", "a < 0", "a = 0", "a ≠ 0"],
    answerIndex: 3,
    explanation: [
      "|x| is differentiable everywhere except at x = 0",
      "Hence differentiable for all a ≠ 0",
    ],
    youtube: "https://www.youtube.com/watch?v=example",
    date: "2026-01-11",
  },
  {
    id: "jam-03",
    title:
      "Let X be a random variable with P(X=1)=P(X=−1)=1/2. Then E(X²) equals",
    options: ["0", "1/2", "1", "2"],
    answerIndex: 2,
    explanation: ["X² = 1 for both outcomes", "So E(X²) = 1"],
    youtube: "https://www.youtube.com/watch?v=example",
    date: "2026-01-12",
  },
];

/* ================= COMPONENT ================= */

export default function QOTDPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(QOTD_BANK.length - 1);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => setSelected(null), [currentIndex]);

  function submitAnswer() {
    if (selected === null) return alert("Please select an option.");
    const q = QOTD_BANK[currentIndex];
    setResult({
      correct: selected === q.answerIndex,
      question: q,
    });
  }

  function closeAll() {
    setResult(null);
    navigate("/", { replace: true });
  }

  const currentQ = QOTD_BANK[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative bg-white w-full max-w-5xl rounded-xl shadow-xl
          max-h-[95vh] overflow-hidden
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Question of the Day</h2>
            <p className="text-sm text-slate-500">JAM & GATE Mathematics</p>
          </div>
          <button onClick={closeAll}>✕</button>
        </div>

        {/* BODY */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* QUESTION */}
          <div className="flex-1 p-5 overflow-auto">
            <div className="text-xs text-slate-500 mb-2">{currentQ.date}</div>

            <h3 className="text-lg md:text-xl font-semibold">
              {currentQ.title}
            </h3>

            <div className="mt-4 space-y-3">
              {currentQ.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`block p-3 rounded-md border cursor-pointer text-sm
                    ${
                      selected === idx
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200"
                    }`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={selected === idx}
                    onChange={() => setSelected(idx)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-primary" onClick={submitAnswer}>
                Submit
              </button>
              <button className="btn-secondary" onClick={closeAll}>
                Close
              </button>
            </div>
          </div>

          {/* PREVIOUS QUESTIONS */}
          <aside
            className="
              w-full md:w-[280px]
              border-t md:border-t-0 md:border-l
              p-4 overflow-auto
            "
          >
            <div className="text-sm font-semibold mb-3">Previous Questions</div>

            <div className="space-y-2">
              {[...QOTD_BANK].reverse().map((q, idx) => {
                const realIndex = QOTD_BANK.length - 1 - idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(realIndex)}
                    className={`w-full text-left p-3 rounded-md text-sm
                      ${
                        realIndex === currentIndex
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-white border border-slate-100"
                      }`}
                  >
                    {q.title}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </motion.div>

      {/* RESULT MODAL */}
      {result && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 p-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3
              className={`text-2xl font-bold ${
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
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
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
                className="btn-primary"
              >
                Watch Solution
              </a>
              <button className="btn-secondary" onClick={closeAll}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
