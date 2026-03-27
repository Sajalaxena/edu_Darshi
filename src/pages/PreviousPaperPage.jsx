import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, PlayCircle, Library } from "lucide-react";
import MathLoader from "../components/MathLoader";
import MathematicalBackground from "../components/MathematicalBackground";

/* ------------------ EXAMS ------------------ */
const EXAMS = [
  "All",
  "IIT-JAM",
  "GATE",
  "CSIR-NET/JRF",
  "CUET",
  "PhD Entrance",
  "UP-GDS",
  "UPHESC",
  "MPPSC",
  "Assistant Professor",
  "JOB EXAMS"
];

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function normalizeDriveLink(url = "") {
  if (!url) return "#";
  const match = url.match(/\/d\/([^/]+)/);
  if (!match) return url;
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export default function PreviousPapersPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeExam, setActiveExam] = useState("All");

  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch(`${API_BASE}/previous-papers`);
        const json = await res.json();
        setPapers(json.data || []);
      } catch (err) {
        console.error("Failed to fetch papers", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const examMatch =
        activeExam === "All" ||
        p.exam.toLowerCase().includes(activeExam.toLowerCase()) ||
        activeExam.toLowerCase().includes(p.exam.toLowerCase());

      const searchMatch =
        p.exam.toLowerCase().includes(query.toLowerCase()) ||
        (p.subject || "").toLowerCase().includes(query.toLowerCase()) ||
        String(p.year).includes(query);

      return examMatch && searchMatch;
    });
  }, [papers, query, activeExam]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#021A2A] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Exam Preparation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Previous Year <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Question Papers
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cyan-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Download official question papers and watch detailed solution walkthroughs to master your upcoming exams.
          </motion.p>
        </div>
      </section>

      {/* ── Floating Search & Filters ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full mb-6 group">
            <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search by exam name, subject, or year..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 md:gap-3 w-full max-h-[140px] overflow-y-auto no-scrollbar pb-2">
              {EXAMS.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setActiveExam(exam)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 
                  ${activeExam === exam 
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30 scale-105 border border-cyan-500" 
                    : "bg-white border-2 border-slate-100 text-slate-600 hover:border-cyan-200 hover:text-cyan-600"}`}
                >
                  {exam}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex flex-col items-end shrink-0 pl-6 border-l border-slate-200">
              <span className="text-3xl font-black text-cyan-600 leading-none">{filteredPapers.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Papers</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {loading ? (
          <MathLoader text="Fetching Question Papers..." />
        ) : filteredPapers.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Library size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No papers found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPapers.map((p, index) => (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex flex-col flex-1">
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center border border-cyan-100 shrink-0 shadow-sm text-cyan-600">
                        <FileText size={22} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">{p.year} Paper</span>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-cyan-600 transition-colors line-clamp-2">
                          {p.exam}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block w-full text-center">
                        {p.subject || "General"}
                      </span>
                    </div>
                    
                    <div className="mt-auto flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                      {/* PDF BUTTON */}
                      <a
                        href={normalizeDriveLink(p.paperPdfLink)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-3 px-4 text-sm font-semibold tracking-wide shadow-md hover:bg-slate-800 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                      >
                        <FileText size={16} /> Paper PDF
                      </a>

                      {/* SOLUTION BUTTON */}
                      {p.solutionYoutubeLink && (
                        <a
                          href={p.solutionYoutubeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 text-sm font-semibold tracking-wide shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98]"
                        >
                          <PlayCircle size={16} /> Watch Solution
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}

