import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathLoader from "../components/MathLoader";
import MathematicalBackground from "../components/MathematicalBackground";
import { Search, MapPin, Calendar, ExternalLink, ArrowRight, BookOpen, GraduationCap } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const POSITION_TYPES = ["All", "masters", "phd", "postdoc", "project", "bs/bsc/b.tech"];

const POSITION_LABELS = {
  masters: "Masters (MBA/MTech/MSc)",
  phd: "PhD",
  postdoc: "Post-Doctoral",
  project: "Project Position",
  "bs/bsc/b.tech": "BS / BSc / B.Tech",
};

const POS_BADGE = {
  masters: "bg-sky-50 text-sky-700 border-sky-200",
  phd: "bg-violet-50 text-violet-700 border-violet-200",
  postdoc: "bg-emerald-50 text-emerald-700 border-emerald-200",
  project: "bg-amber-50 text-amber-700 border-amber-200",
  "bs/bsc/b.tech": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const formatDate = (d) => {
  if (!d) return "—";
  if (d.includes("-")) {
    const p = d.split("-");
    if (p.length === 3 && p[0].length === 4) return `${p[2]}-${p[1]}-${p[0]}`;
  }
  return d;
};

const parseDateString = (d) => {
  if (!d) return 0;
  let s = String(d).trim();
  s = s.replace(/([a-zA-Z]+)\s+\d+\s*-\s*(\d+)/, "$1 $2");
  
  const p = s.split("-");
  if (p.length === 3) {
    if (p[0].length === 4) return new Date(`${p[0]}-${p[1]}-${p[2]}T23:59:59`).getTime();
    if (p[2].length === 4) return new Date(`${p[2]}-${p[1]}-${p[0]}T23:59:59`).getTime();
  }
  let testT = new Date(s).getTime();
  return isNaN(testT) ? 0 : testT;
};

export default function AllAcademicPositions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`${API_BASE}/academic-positions`);
        const json = await res.json();
        setItems(json.data || []);
      } catch (err) {
        console.error("Failed to load positions", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      i.courseName?.toLowerCase().includes(q) ||
      i.institution?.toLowerCase().includes(q) ||
      i.areaOfResearch?.toLowerCase().includes(q) ||
      i.location?.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || i.positionType === typeFilter;
    return matchSearch && matchType;
  }).sort((a, b) => {
    const now = new Date().getTime();
    const timeA = parseDateString(a.lastDate);
    const timeB = parseDateString(b.lastDate);
    const isCrossedA = timeA < now && timeA !== 0;
    const isCrossedB = timeB < now && timeB !== 0;

    if (isCrossedA !== isCrossedB) return isCrossedA ? 1 : -1;
    if (timeA === 0 && timeB !== 0) return 1;
    if (timeB === 0 && timeA !== 0) return -1;
    
    return sortOrder === "asc" ? (timeA - timeB) : (timeB - timeA);
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#0F0A1D] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Future Scholars
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-200">Positions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-violet-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
Take your next big step. Discover Master’s, PhD, postdoctoral, and research project opportunities across leading universities and institutes.          </motion.p>
        </div>
      </section>

      {/* ── Floating Search & Filters ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full mb-6 group">
            <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-violet-600 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search positions by course, institution, area, location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2 w-full md:w-auto no-scrollbar overflow-x-auto pb-2">
              {POSITION_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap
                  ${typeFilter === type 
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/30 scale-105 border border-violet-500" 
                    : "bg-white border-2 border-slate-100 text-slate-600 hover:border-violet-200 hover:text-violet-600"}`}
                >
                  {type === "All" ? "All Positions" : POSITION_LABELS[type] || type}
                </button>
              ))}
            </div>
            
            <div className="flex items-center shrink-0 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
                  className="w-full md:w-auto appearance-none bg-white text-slate-600 text-sm font-semibold py-2.5 pl-4 pr-10 rounded-lg border border-slate-200 hover:border-violet-300 hover:text-violet-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer shadow-sm transition-all">
                  <option value="asc">Deadline: Soonest First</option>
                  <option value="desc">Deadline: Latest First</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={14} />
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto relative">
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="w-full md:w-64 appearance-none px-5 py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl font-semibold text-sm text-slate-700 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 cursor-pointer transition-all shadow-sm">
                {POSITION_TYPES.map(t => (
                  <option key={t} value={t}>{t === "All" ? "All Position Types" : POSITION_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:flex flex-col items-end shrink-0 pl-4 border-l border-slate-200">
              <span className="text-3xl font-black text-violet-600 leading-none">{filtered.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Found</span>
            </div>
          </div> */}
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {loading ? (
          <MathLoader text="Fetching Academic Positions..." />
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No positions found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {filtered.map((i, index) => (
                <motion.div
                  key={i._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex flex-wrap items-start gap-2 mb-4">
                      <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${POS_BADGE[i.positionType] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {POSITION_LABELS[i.positionType] || i.positionType}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                      {i.courseName || i.institution || "Academic Position"}
                    </h3>

                    <p className="text-[15px] font-semibold text-slate-700 mb-4">{i.institution}</p>

                    {i.areaOfResearch && (
                      <div className="inline-flex items-center gap-2 text-sm text-violet-600 mb-4 bg-violet-50/50 w-fit px-3 py-1.5 rounded-lg font-medium">
                        <BookOpen size={14} /> {i.areaOfResearch}
                      </div>
                    )}
                    
                    <div className="space-y-2.5 mt-auto pt-4 border-t border-slate-100">
                      {i.location && (
                        <div className="flex items-start gap-3 text-slate-600">
                          <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium leading-tight">{i.location}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3 mt-4 bg-slate-50 p-3 rounded-xl">
                        {i.startDate && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">📅 Start Date</span>
                            <span className="block text-sm font-semibold text-emerald-600">{formatDate(i.startDate)}</span>
                          </div>
                        )}
                        {i.lastDate && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5 text-rose-500">Deadline</span>
                            <span className="block text-sm font-bold text-rose-600">{formatDate(i.lastDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {i.externalLink && (
                    <a href={i.externalLink.startsWith("http") ? i.externalLink : `https://${i.externalLink}`}
                      target="_blank" rel="noreferrer"
                      className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                      <span>View Full Details</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}

