// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";
import{ useRef } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ================= LaTeX Renderer ================= */
function LatexText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g);

  return parts.map((part, i) => {
    if (part.startsWith("$$")) {
      return (
        <div key={i} className="text-[0.9rem] sm:text-base">
          <BlockMath
            math={part.slice(2, -2)}
            trust={true}
          />
        </div>
      );
    }

    if (part.startsWith("$")) {
      return (
        <span key={i} className="text-[0.9rem] sm:text-base">
          <InlineMath
            math={part.slice(1, -1)}
            trust={true}
          />
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}


export default function QOTDPage() {
  const navigate = useNavigate();
const explanationRef = useRef(null);

  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadQOTD() {
      const res = await fetch(`${API_BASE}/question/today`);
      const json = await res.json();
      setQuestion(json.data);
    }
    loadQOTD();
  }, []);


useEffect(() => {
  if (result && explanationRef.current) {
    explanationRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [result]);
  async function submitAnswer() {
    if (!selected || result) return;

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
  }

  function closeAll() {
    navigate("/", { replace: true });
  }

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          w-full
          sm:w-[92vw]
          lg:w-[80vw]
          xl:w-[70vw]
          h-[92vh] sm:h-[95vh]
          bg-white
          rounded-t-2xl sm:rounded-3xl
          shadow-2xl
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm sm:text-lg font-semibold text-white">
                Question of the Day
              </h2>
              <p className="text-[10px] sm:text-xs text-indigo-100">
                Daily Challenge
              </p>
            </div>
            <button
              onClick={closeAll}
              className="text-xl sm:text-2xl text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 px-4 sm:px-6 py-4 overflow-hidden">
          <div className="h-full overflow-y-auto hide-scrollbar space-y-5">
            {/* QUESTION */}
            <div
              className="
                text-sm
                sm:text-base
                md:text-lg
                font-semibold
                leading-snug
                sm:leading-relaxed
                text-slate-800
              "
            >
              <LatexText text={question.question} />
            </div>

            {/* OPTIONS */}
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isSelected = selected === opt;
                const isCorrect = result && opt === question.correctAnswer;
                const isWrong = result && isSelected && !result.correct;

                return (
                  <button
                    key={idx}
                    disabled={!!result}
                    onClick={() => setSelected(opt)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm sm:text-base transition
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

            {/* RESULT */}
            {result && (
              <div
                className={`mt-5 rounded-xl p-4 border ${
                  result.correct
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                }`}
              >
                <h3
                  className={`text-base sm:text-xl font-bold ${
                    result.correct ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {result.correct ? "Correct 🎉" : "Incorrect ❌"}
                </h3>

               <div ref={explanationRef} className="mt-4">
  <h4 className="text-center text-base sm:text-lg font-bold text-indigo-700">
    How to Approach
  </h4>


                  <div
                    className="
                      mt-3
                      bg-white
                      rounded-xl
                      border
                      p-3
                      max-h-[35vh]
                      overflow-y-auto
                      hide-scrollbar
                      text-xs
                      sm:text-base
                      leading-relaxed
                      text-slate-700
                    "
                  >
                    <LatexText text={result.explanation} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-4 sm:px-6 py-3 border-t bg-slate-50 flex gap-3">
          <button
            onClick={submitAnswer}
            disabled={!selected || !!result}
            className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm sm:text-base font-medium disabled:opacity-50"
          >
            Submit
          </button>
          <button
            onClick={closeAll}
            className="flex-1 py-2 rounded-lg border text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
