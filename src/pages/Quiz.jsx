// src/pages/Quiz.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Circle, ArrowRight, ArrowLeft, Flag, CheckSquare } from "lucide-react";
import MathLoader from "../components/MathLoader";
import MathematicalBackground from "../components/MathematicalBackground";
import ResultModal from "./ResultModal";

/**
 * Hardcoded question bank for demo.
 */
const QUESTION_BANK = [
  { id: "n1", exam: "NEET", q: "What is the chemical symbol of water?", options: ["O2", "H2O", "CO2", "HO"], answer: 1 },
  { id: "n2", exam: "NEET", q: "The hardest substance available on earth is", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
  { id: "n3", exam: "NEET", q: "Which organ produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Spleen"], answer: 1 },
  { id: "n4", exam: "NEET", q: "Approx normal body temperature ?", options: ["36.6°C", "40°C", "34°C", "39°C"], answer: 0 },
  { id: "n5", exam: "NEET", q: "Which vitamin is produced in skin on exposure to sunlight?", options: ["Vit A", "Vit C", "Vit D", "Vit K"], answer: 2 },
  { id: "j1", exam: "JEE", q: "What is sin(90°)?", options: ["0", "1", "0.5", "-1"], answer: 1 },
  { id: "j2", exam: "JEE", q: "Derivative of x^2 is", options: ["x", "2x", "x^2", "2"], answer: 1 },
  { id: "j3", exam: "JEE", q: "Units of force?", options: ["kg", "m/s", "N", "J"], answer: 2 },
  { id: "g1", exam: "GATE", q: "Binary of decimal 5 is", options: ["101", "110", "111", "100"], answer: 0 },
  { id: "ga1", exam: "GATE", q: "Which is a sorting algorithm?", options: ["DFS", "BFS", "QuickSort", "Dijkstra"], answer: 2 },
  { id: "o1", exam: "Other", q: "Which gas is used for refrigeration?", options: ["Oxygen", "Nitrogen", "Ammonia", "Hydrogen"], answer: 2 },
  { id: "o2", exam: "Other", q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { id: "n6", exam: "NEET", q: "What carries oxygen to cells in blood?", options: ["Plasma", "Platelets", "RBC", "WBC"], answer: 2 },
  { id: "j4", exam: "JEE", q: "If f(x)=sin x, f'(x)=?", options: ["cos x", "sin x", "-sin x", "-cos x"], answer: 0 },
];

function pickRandomQuestions(bank, exam, qty) {
  const pool = bank.filter((b) => b.exam === exam);
  const use = pool.length ? pool : bank;
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

  const [isInitializing, setIsInitializing] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!params) {
      nav("/quiz-setup", { replace: true });
    }
  }, [params, nav]);

  const questions = useMemo(() => {
    if (!params) return [];
    const qty = Math.max(1, Math.min(50, Number(params.quantity || 10)));
    return pickRandomQuestions(QUESTION_BANK, params.exam, qty);
  }, [params]);

  useEffect(() => {
    const initial = {};
    questions.forEach((q) => (initial[q.id] = null));
    setAnswers(initial);
    setCurrentIndex(0);
    
    // Simulate complex exam generation for premium feel
    const timer = setTimeout(() => setIsInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, [questions]);

  if (!params) return null;

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <MathematicalBackground />
        <MathLoader text={`Generating ${params.exam} Assessment Environment...`} />
      </div>
    );
  }

  function selectOption(qid, optIndex) {
    setAnswers((prev) => ({ ...prev, [qid]: optIndex }));
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  }

  function submitTest() {
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

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <section className="min-h-screen bg-slate-50 font-sans pb-20 selection:bg-indigo-500 selection:text-white">
      <MathematicalBackground />
      
      {/* ── Top App Bar ── */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
              {params.exam[0]}
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight">{params.exam} Assessment</h1>
              <p className="text-xs text-slate-500 font-medium">Candidate: {params.name}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full text-sm font-bold">
              <Clock size={16} className="text-indigo-500" /> 
              <span>Untimed Practice</span>
            </div>
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to exit the test?")) nav("/");
              }}
              className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Exit Test
            </button>
          </div>
        </div>
      </header>

      {/* ── Progress Bar ── */}
      <div className="h-1.5 w-full bg-slate-200">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left Sidebar (Dashboard) ── */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckSquare size={18} className="text-indigo-500" /> Question Palette
                </h3>
              </div>
              
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-4 gap-2.5">
                {questions.map((q, idx) => {
                  const status = answers[q.id] !== null ? "answered" : "unanswered";
                  const isCurrent = idx === currentIndex;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`relative w-full aspect-square rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-300
                        ${isCurrent ? "ring-2 ring-indigo-500 ring-offset-2 scale-110 z-10" : "hover:scale-105"}
                        ${status === "answered" 
                          ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30" 
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"}
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-2xl font-black text-indigo-500">{Object.values(answers).filter(v => v !== null).length}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Answered</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-2xl font-black text-slate-400">{questions.length - Object.values(answers).filter(v => v !== null).length}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1">Remaining</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Question Area ── */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col min-h-[500px]">
              
              {/* Question Header */}
              <div className="p-6 md:px-10 md:pt-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <span className="inline-flex py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-black text-sm uppercase tracking-wider border border-indigo-100 w-fit">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-amber-500 transition-colors">
                  <Flag size={14} /> Mark for review
                </button>
              </div>

              {/* Question Content */}
              <div className="p-6 md:p-10 flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 p-6 md:p-10 overflow-y-auto"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-8">
                      {currentQ?.q}
                    </h2>
                    
                    <div className="space-y-4">
                      {currentQ?.options.map((opt, idx) => {
                        const selected = answers[currentQ.id] === idx;
                        const char = String.fromCharCode(65 + idx); // A, B, C, D
                        
                        return (
                          <label
                            key={idx}
                            className={`group flex items-center p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 
                              ${selected 
                                ? "bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-500/10" 
                                : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-sm"
                              }`}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors
                              ${selected ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"}
                            `}>
                              {char}
                            </div>
                            <span className={`text-lg transition-colors ${selected ? "font-bold text-indigo-900" : "font-medium text-slate-700"}`}>
                              {opt}
                            </span>
                            
                            <div className="ml-auto pl-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${selected ? "border-indigo-500" : "border-slate-300"}
                              `}>
                                {selected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                              </div>
                            </div>
                            
                            {/* Hidden actual radio for accessibility */}
                            <input
                              type="radio"
                              name={currentQ.id}
                              checked={selected}
                              onChange={() => selectOption(currentQ.id, idx)}
                              className="sr-only"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation */}
              <div className="p-6 md:px-10 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between mt-auto">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 transition-all"
                >
                  <ArrowLeft size={18} /> Previous
                </button>
                
                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={() => {
                      if (!window.confirm("Submit test now?")) return;
                      submitTest();
                    }}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    Submit Test <CheckCircle size={18} />
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 shadow-md shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Save & Next <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {showResult && resultData && (
        <ResultModal data={resultData} onClose={() => { setShowResult(false); nav("/"); }} />
      )}
    </section>
  );
}
