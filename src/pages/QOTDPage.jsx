// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ================= LaTeX Renderer ================= */
function LatexText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g);

  return parts.map((part, i) => {
    if (part.startsWith("$$")) {
      return <BlockMath key={i} math={part.slice(2, -2)} />;
    }
    if (part.startsWith("$")) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });
}

/* ================= MAIN COMPONENT ================= */
export default function QOTDPage() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------- Fetch Today Question -------- */
  useEffect(() => {
    async function loadQOTD() {
      try {
        const res = await fetch(`${API_BASE}/question/today`);
        const json = await res.json();
        setQuestion(json.data);
      } catch (err) {
        console.error("Failed to load QOTD", err);
      } finally {
        setLoading(false);
      }
    }

    loadQOTD();
  }, []);

  /* -------- Submit Answer -------- */
  async function submitAnswer() {
    if (!selected || result) return;

    try {
      const res = await fetch(`${API_BASE}/question/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question._id,
          answer: selected,
        }),
      });

      const json = await res.json();
      setResult({ ...json, selected });
    } catch (err) {
      console.error("Submit failed", err);
    }
  }

  function closeAll() {
    setResult(null);
    navigate("/", { replace: true });
  }

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-xl shadow">Loading...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-xl shadow">
          No Question Today
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center">
      {/* MAIN MODAL */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Question of the Day</h2>
            <p className="text-xs text-indigo-600 font-medium">
              Daily Challenge
            </p>
          </div>
          <button
            onClick={closeAll}
            className="text-xl text-slate-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* QUESTION */}
          <div className="text-base sm:text-lg font-semibold leading-relaxed">
            <LatexText text={question.question} />
          </div>

          {/* OPTIONS */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selected === opt;
              const isCorrect = result && opt === question.correctAnswer;
              const isWrong = result && isSelected && !result.correct;

              return (
                <button
                  key={idx}
                  disabled={!!result}
                  onClick={() => setSelected(opt)}
                  className={`w-full text-left p-4 rounded-xl border transition
                    ${
                      isCorrect
                        ? "border-green-500 bg-green-50"
                        : isWrong
                          ? "border-red-500 bg-red-50"
                          : isSelected
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-slate-200 hover:border-indigo-300"
                    }
                  `}
                >
                  <LatexText text={opt} />
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={submitAnswer}
            disabled={!selected || !!result}
            className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-50"
          >
            Submit
          </button>
          <button
            onClick={closeAll}
            className="flex-1 py-2.5 rounded-lg border"
          >
            Close
          </button>
        </div>
      </motion.div>

      {/* RESULT MODAL */}
      {result && (
        <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
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
                Correct answer:
                <span className="ml-1 font-semibold">
                  <LatexText text={question.correctAnswer} />
                </span>
              </p>
            )}

            <div className="mt-4 text-sm leading-relaxed">
              <strong>Explanation</strong>
              <div className="mt-2 text-slate-700">
                <LatexText text={result.explanation} />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              {result.solutionVideoUrl && (
                <a
                  href={result.solutionVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-center"
                >
                  Watch Solution
                </a>
              )}
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
