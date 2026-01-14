// src/pages/QOTDPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function QOTDPage() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TODAY QUESTION ================= */

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

  /* ================= SUBMIT ANSWER ================= */

  async function submitAnswer() {
    if (!selected) {
      alert("Please select an option");
      return;
    }

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
      setResult({
        ...json,
        selected,
      });
    } catch (err) {
      console.error("Submit failed", err);
    }
  }

  function closeAll() {
    setResult(null);
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-lg">Loading...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-lg">
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
        className="w-full sm:max-w-xl bg-white rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Question of the Day</h2>
            <p className="text-xs text-slate-500">EduDarshi</p>
          </div>
          <button onClick={closeAll}>✕</button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <h3 className="text-base sm:text-lg font-semibold">
            {question.question}
          </h3>

          <div className="mt-4 space-y-3">
            {question.options.map((opt, idx) => (
              <label
                key={idx}
                className={`flex gap-3 p-3 rounded-lg border cursor-pointer text-sm ${
                  selected === opt
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
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
                Correct answer:
                <strong className="ml-1">
                  {question.correctAnswer}
                </strong>
              </p>
            )}

            <div className="mt-4 text-sm">
              <strong>Explanation</strong>
              <p className="mt-1">{result.explanation}</p>
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
