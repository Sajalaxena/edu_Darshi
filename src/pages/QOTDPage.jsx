// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* Simple QOTD bank */
const QOTD_BANK = [
  {
    id: "q-2026-01",
    title: "What is the hardest substance available on earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answerIndex: 2,
    explanation: [
      "Diamond has the highest known hardness on the Mohs scale.",
      "It is an allotrope of carbon with a tetrahedral crystal structure.",
    ],
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2026-01-10",
  },
  {
    id: "q-2026-02",
    title: "Which organ produces insulin in the human body?",
    options: ["Liver", "Pancreas", "Kidney", "Spleen"],
    answerIndex: 1,
    explanation: [
      "The pancreas has beta cells in the islets of Langerhans which secrete insulin.",
    ],
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2026-01-11",
  },
  {
    id: "q-2026-03",
    title: "Which planet is known as the Red Planet?",
    options: ["Venus", "Earth", "Mars", "Jupiter"],
    answerIndex: 2,
    explanation: ["Mars appears red due to iron oxide (rust) on its surface."],
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2026-01-12",
  },
];

export default function QOTDPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(QOTD_BANK.length - 1);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // { correct: bool, question }

  useEffect(() => {
    setSelected(null);
  }, [currentIndex]);

  // For debugging: show state in console when result changes
  useEffect(() => {
    if (result) console.log("Result set:", result);
  }, [result]);

  function closePage() {
    navigate(-1);
  }

  function submitAnswer() {
    console.log("Submitting answer, selected:", selected);
    if (selected === null) {
      alert("Select an answer first.");
      return;
    }
    const q = QOTD_BANK[currentIndex];
    const correct = selected === q.answerIndex;
    setResult({ correct, question: q });
  }

  function closeResultAndExit() {
    setResult(null);
    // navigate to home as requested
    navigate("/", { replace: true });
  }

  const currentQ = QOTD_BANK[currentIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* background overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={closePage} />

      {/* Main QOTD modal */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-[10000] max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Question of the Day</h2>
            <div className="text-sm text-slate-500">
              Try it and check the solution video after submit
            </div>
          </div>
          <button onClick={closePage} className="text-slate-600">
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 p-4">
          {/* Left: question area */}
          <div className="md:col-span-2">
            <div className="p-4">
              <div className="text-sm text-slate-500 mb-2">
                Date: {currentQ.date}
              </div>
              <h3 className="text-xl font-semibold">{currentQ.title}</h3>

              <div className="mt-4 space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const checked = selected === idx;
                  return (
                    <label
                      key={idx}
                      className={`block cursor-pointer rounded-md p-3 border ${
                        checked
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="qotd"
                        checked={checked}
                        onChange={() => setSelected(idx)}
                        className="mr-3"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={submitAnswer} className="btn-primary">
                  Submit Answer
                </button>
                <button
                  onClick={() => navigate("/", { replace: true })}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Right: previous questions */}
          <aside className="space-y-3">
            <div className="text-sm font-medium">Previous Questions</div>
            <div className="space-y-2 max-h-[52vh] overflow-auto pr-2">
              {QOTD_BANK.slice()
                .reverse()
                .map((q, idx) => {
                  const realIndex = QOTD_BANK.length - 1 - idx;
                  const isCurrent = realIndex === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(realIndex)}
                      className={`w-full text-left p-3 rounded-md ${
                        isCurrent
                          ? "bg-blue-50 border border-blue-100"
                          : "bg-white border border-slate-100"
                      }`}
                    >
                      <div className="font-medium text-sm line-clamp-2">
                        {q.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {q.date}
                      </div>
                    </button>
                  );
                })}
            </div>
          </aside>
        </div>
      </motion.div>

      {/* === Inline Result Panel ===
          This is rendered inside the same file (no external import) so we avoid import path issues.
          It mounts immediately when `result` is set.
      */}
      {result && (
        <div
          id="qotd-result"
          className="fixed inset-0 z-[11000] flex items-center justify-center p-4 pointer-events-none"
        >
          {/* semi-transparent overlay sits above the page overlay but below the result box */}
          <div
            className="absolute inset-0 bg-black/30 pointer-events-auto"
            onClick={closeResultAndExit}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-[11001] max-w-md w-full bg-white rounded-lg shadow-lg p-6 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3"
              onClick={closeResultAndExit}
            >
              ✕
            </button>

            <div className="text-center">
              {result.correct ? (
                <>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "var(--brand)" }}
                  >
                    🎉 Correct!
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Great job — you got it right.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-rose-500">
                    ✖ Incorrect
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Correct answer:{" "}
                    <strong>
                      {result.question.options[result.question.answerIndex]}
                    </strong>
                    .
                  </div>
                </>
              )}

              <div className="mt-4 text-left">
                <h4 className="font-semibold">Explanation</h4>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                  {result.question.explanation.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3 justify-center">
                <a
                  href={result.question.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Watch Solution
                </a>
                <button className="btn-secondary" onClick={closeResultAndExit}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
