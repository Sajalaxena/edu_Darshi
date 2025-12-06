// src/pages/Quiz.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultModal from "./ResultModal";

/**
 * Hardcoded question bank for demo. Each question:
 * { id, exam, subject (optional), q, options: [a,b,c,d], answerIndex (0..3) }
 * You may extend or replace with API later.
 */
const QUESTION_BANK = [
  // NEET sample (10-15)
  {
    id: "n1",
    exam: "NEET",
    q: "What is the chemical symbol of water?",
    options: ["O2", "H2O", "CO2", "HO"],
    answer: 1,
  },
  {
    id: "n2",
    exam: "NEET",
    q: "The hardest substance available on earth is",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: 2,
  },
  {
    id: "n3",
    exam: "NEET",
    q: "Which organ produces insulin?",
    options: ["Liver", "Pancreas", "Kidney", "Spleen"],
    answer: 1,
  },
  {
    id: "n4",
    exam: "NEET",
    q: "Approx normal body temperature ?",
    options: ["36.6°C", "40°C", "34°C", "39°C"],
    answer: 0,
  },
  {
    id: "n5",
    exam: "NEET",
    q: "Which vitamin is produced in skin on exposure to sunlight?",
    options: ["Vit A", "Vit C", "Vit D", "Vit K"],
    answer: 2,
  },

  // JEE sample
  {
    id: "j1",
    exam: "JEE",
    q: "What is sin(90°)?",
    options: ["0", "1", "0.5", "-1"],
    answer: 1,
  },
  {
    id: "j2",
    exam: "JEE",
    q: "Derivative of x^2 is",
    options: ["x", "2x", "x^2", "2"],
    answer: 1,
  },
  {
    id: "j3",
    exam: "JEE",
    q: "Units of force?",
    options: ["kg", "m/s", "N", "J"],
    answer: 2,
  },

  // GATE / JAM generic
  {
    id: "g1",
    exam: "GATE",
    q: "Binary of decimal 5 is",
    options: ["101", "110", "111", "100"],
    answer: 0,
  },
  {
    id: "ga1",
    exam: "GATE",
    q: "Which is a sorting algorithm?",
    options: ["DFS", "BFS", "QuickSort", "Dijkstra"],
    answer: 2,
  },

  // generic
  {
    id: "o1",
    exam: "Other",
    q: "Which gas is used for refrigeration?",
    options: ["Oxygen", "Nitrogen", "Ammonia", "Hydrogen"],
    answer: 2,
  },
  {
    id: "o2",
    exam: "Other",
    q: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },

  // add more to reach 15
  {
    id: "n6",
    exam: "NEET",
    q: "What carries oxygen to cells in blood?",
    options: ["Plasma", "Platelets", "RBC", "WBC"],
    answer: 2,
  },
  {
    id: "j4",
    exam: "JEE",
    q: "If f(x)=sin x, f'(x)=?",
    options: ["cos x", "sin x", "-sin x", "-cos x"],
    answer: 0,
  },
];

function pickRandomQuestions(bank, exam, qty) {
  // filter by exam, if none match take all
  const pool = bank.filter((b) => b.exam === exam);
  const use = pool.length ? pool : bank;
  // shuffle and take qty
  const copy = [...use];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, qty);
}

export default function QuizPage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const params = state || null;

  useEffect(() => {
    if (!params) {
      // if user opens /quiz directly, redirect to setup
      nav("/quiz-setup", { replace: true });
    }
  }, [params, nav]);

  // derive questions once
  const questions = useMemo(() => {
    if (!params) return [];
    const qty = Math.max(1, Math.min(50, Number(params.quantity || 10)));
    return pickRandomQuestions(QUESTION_BANK, params.exam, qty);
  }, [params]);

  // state for answers: object mapping question id -> selectedIndex or null
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // reset answers when questions change
    const initial = {};
    questions.forEach((q) => (initial[q.id] = null));
    setAnswers(initial);
    setCurrentIndex(0);
  }, [questions]);

  if (!params) return null; // redirect handled above

  function selectOption(qid, optIndex) {
    setAnswers((prev) => ({ ...prev, [qid]: optIndex }));
  }

  function goNext() {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }
  function goPrev() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  function submitTest() {
    // calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });
    setResultData({
      total: questions.length,
      correct,
      name: params.name,
      exam: params.exam,
    });
    setShowResult(true);
  }

  function closeResultAndExit() {
    setShowResult(false);
    // navigate back to home
    nav("/", { replace: true });
  }

  const currentQ = questions[currentIndex];

  return (
    <section className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left: question panel (spans 2 cols on lg) */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-slate-500">
                Name: <strong>{params.name}</strong>
              </div>
              <div className="text-sm text-slate-500">
                Exam: <strong>{params.exam}</strong>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Q {currentIndex + 1} / {questions.length}
            </div>
          </div>

          {currentQ ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">{currentQ.q}</h3>
              <div className="mt-4 space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const selected = answers[currentQ.id] === idx;
                  return (
                    <label
                      key={idx}
                      className={`block border rounded p-3 cursor-pointer ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQ.id}
                        checked={selected}
                        onChange={() => selectOption(currentQ.id, idx)}
                        className="mr-3"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="btn-secondary"
                >
                  Prev
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === questions.length - 1}
                  className="btn-secondary"
                >
                  Next
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => {
                    if (!window.confirm("Submit test now?")) return;
                    submitTest();
                  }}
                  className="btn-primary"
                >
                  Submit Test
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center text-slate-500">
              No questions available for selected parameters.
            </div>
          )}
        </div>

        {/* right: dashboard */}
        <aside className="card p-4">
          <h4 className="font-semibold mb-3">Question Dashboard</h4>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = answers[q.id] === null ? "un" : "ans";
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded ${
                    isCurrent ? "ring-2 ring-blue-400" : ""
                  } ${
                    status === "ans" ? "bg-green-100" : "bg-slate-100"
                  } flex items-center justify-center text-sm`}
                  title={`Q ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-slate-600">
            <div>
              <strong>Answered:</strong>{" "}
              {Object.values(answers).filter((v) => v !== null).length}
            </div>
            <div>
              <strong>Remaining:</strong>{" "}
              {questions.length -
                Object.values(answers).filter((v) => v !== null).length}
            </div>
          </div>
        </aside>
      </div>

      {/* Result Modal */}
      {showResult && resultData && (
        <ResultModal data={resultData} onClose={closeResultAndExit} />
      )}
    </section>
  );
}
