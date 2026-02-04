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
        <div className="bg-white px-6 py-4 rounded-xl shadow">
          Loading...
        </div>
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
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="
          w-full
          sm:w-[92vw]
          lg:w-[80vw]
          xl:w-[70vw]
          h-[95vh]
          bg-white
          rounded-t-3xl sm:rounded-3xl
          shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
<div
  className="
    flex justify-between items-center
    px-6 py-4
    border-b border-white/10
    bg-gradient-to-r from-indigo-600 to-purple-600
    shadow-lg shadow-indigo-500/25
  "
>
  <div>
    <h2 className="text-lg font-semibold text-white">
      Question of the Day
    </h2>
    <p className="text-xs text-indigo-100">
      Daily Challenge
    </p>
  </div>

  <button
    onClick={closeAll}
    className="
      text-2xl
      text-white/70
      hover:text-white
      transition
    "
  >
    ✕
  </button>
</div>


        {/* BODY (single scroll area) */}
        <div className="flex-1 px-6 py-6 overflow-hidden">
<div className="h-full overflow-y-auto overflow-x-hidden hide-scrollbar space-y-6 pr-2">
            {/* QUESTION */}
            <div className="text-lg sm:text-xl font-semibold leading-relaxed text-slate-800">
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

            {/* RESULT + EXPLANATION */}
            {result && (
              <div
                className={`mt-8 rounded-2xl p-6 border-2 ${
                  result.correct
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                }`}
              >
                <h3
                  className={`text-2xl font-bold ${
                    result.correct
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {result.correct ? "Correct 🎉" : "Incorrect ❌"}
                </h3>

                {!result.correct && (
                  <p className="mt-3 text-base">
                    Correct answer:
                    <span className="ml-2 font-semibold">
                      <LatexText text={question.correctAnswer} />
                    </span>
                  </p>
                )}

                {/* HOW TO APPROACH (OWN SCROLL) */}
                <div className="mt-6">
                  <h4 className="text-center text-lg font-bold text-indigo-700">
                    How to Approach
                  </h4>

                 <div
  className="
    mt-4
    bg-white
    rounded-xl
    border
    shadow-sm
    p-4
    max-h-[45vh]
    overflow-y-auto
    overflow-x-hidden
    hide-scrollbar
    text-base
    leading-relaxed
    text-slate-700
  "
>
                    <LatexText text={result.explanation} />
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  {result.solutionVideoUrl && (
                    <a
                      href={result.solutionVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 rounded-lg bg-indigo-600 text-white text-center font-medium"
                    >
                      Watch Solution
                    </a>
                  )}
                  {/* <button
                    onClick={closeAll}
                    className="flex-1 py-3 rounded-lg border font-medium"
                  >
                    Close
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-slate-50 flex gap-3">
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
    </div>
  );
}
