import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, Calendar, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import MathematicalBackground from "../components/MathematicalBackground";
import MathLoader from "../components/MathLoader";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const SUB_SUBJECTS = [
  "All", "Foundations & Logic", "Algebra", "Geometry & Topology", "Analysis",
  "Functional Analysis & Harmonic Analysis", "Probability & Statistics",
  "Applied Mathematics", "Mathematical Physics", "Discrete Mathematics & Combinatorics",
  "Interdisciplinary Mathematics", "Other"
];

const LEVELS = ["All", "UG", "PG", "PhD", "Postdoc", "Teaching Enrichment", "Faculty", "Research"];
const EVENT_TYPES = ["All", "conference", "seminar", "workshop"];

const TYPE_COLORS = {
  conference: "bg-blue-50 text-blue-700 border-blue-200",
  seminar: "bg-purple-50 text-purple-700 border-purple-200",
  workshop: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const CARD_BG = {
  conference: "bg-gradient-to-br from-blue-50/50 to-white border-blue-100",
  seminar: "bg-gradient-to-br from-purple-50/50 to-white border-purple-100",
  workshop: "bg-gradient-to-br from-emerald-50/50 to-white border-emerald-100",
};

const parseDateString = (d) => {
  if (!d) return 0;
  let s = String(d).trim();
  // Transform "January 12-16, 2026" into "January 16, 2026"
  s = s.replace(/([a-zA-Z]+)\s+\d+\s*-\s*(\d+)/, "$1 $2");

  const p = s.split("-");
  if (p.length === 3) {
    if (p[0].length === 4) return new Date(`${p[0]}-${p[1]}-${p[2]}T23:59:59`).getTime();
    if (p[2].length === 4) return new Date(`${p[2]}-${p[1]}-${p[0]}T23:59:59`).getTime();
  }
  let testT = new Date(s).getTime();
  return isNaN(testT) ? 0 : testT;
};

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${API_BASE}/events`);
        const json = await res.json();
        setEvents(json.data || []);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filtered = events.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      e.title?.toLowerCase().includes(q) ||
      e.venue?.toLowerCase().includes(q) ||
      e.description?.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || e.eventType === typeFilter;
    const matchLevel = levelFilter === "All" || 
      (Array.isArray(e.level) ? e.level.includes(levelFilter) : e.level === levelFilter);
    const matchSub = subFilter === "All" || e.subSubject === subFilter;
    return matchSearch && matchType && matchLevel && matchSub;
  }).sort((a, b) => {
    const now = new Date().getTime();
    const timeA = parseDateString(a.applicationDeadline || a.startDate);
    const timeB = parseDateString(b.applicationDeadline || b.startDate);
    const isCrossedA = timeA < now && timeA !== 0;
    const isCrossedB = timeB < now && timeB !== 0;

    if (isCrossedA !== isCrossedB) return isCrossedA ? 1 : -1;
    if (timeA === 0 && timeB !== 0) return 1;
    if (timeB === 0 && timeA !== 0) return -1;
    return timeA - timeB;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#0B1120] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Academic Network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Discover Academic <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
              Workshops & Events
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Explore upcoming workshops, seminars, and conferences. Filter by your level of study or subject area to find your next opportunity.
          </motion.p>
        </div>
      </section>

      {/* ── Floating Search & Filters ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full mb-6 group">
            <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search events by title, venue, or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8 no-scrollbar overflow-x-auto pb-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize whitespace-nowrap
                ${typeFilter === type 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105 border border-blue-500" 
                  : "bg-white border-2 border-slate-100 text-slate-600 hover:border-blue-200 hover:text-blue-600"}`}
              >
                {type === "All" ? "All Events" : type}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
              {/* Type Filter */}
              <div className="relative">
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                  className="w-full appearance-none px-5 py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl font-semibold text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all shadow-sm">
                  {EVENT_TYPES.map(t => <option key={t} value={t} className="capitalize">{t === "All" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <Filter size={16} />
                </div>
              </div>
              {/* Level Filter */}
              <div className="relative">
                <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
                  className="w-full appearance-none px-5 py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl font-semibold text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all shadow-sm">
                  {LEVELS.map(l => <option key={l} value={l}>{l === "All" ? "All Levels" : l}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <GraduationCapIcon size={16} />
                </div>
              </div>
              {/* Subject Filter */}
              <div className="relative">
                <select value={subFilter} onChange={e => setSubFilter(e.target.value)}
                  className="w-full appearance-none px-5 py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl font-semibold text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all shadow-sm">
                  {SUB_SUBJECTS.map(s => <option key={s} value={s}>{s === "All" ? "All Subjects" : s}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <BookOpen size={16} />
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end shrink-0 pl-4 border-l border-slate-200">
              <span className="text-3xl font-black text-blue-600 leading-none">{filtered.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Found</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Events Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {loading ? (
          <MathLoader text="Finding Events..." />
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No events found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {filtered.map((e, i) => (
                <motion.div
                  key={e._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`group relative rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border ${CARD_BG[e.eventType] || "bg-white border-slate-200"}`}
                >
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex flex-wrap items-start gap-2 mb-4">
                      <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border ${TYPE_COLORS[e.eventType] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                        {e.eventType}
                      </span>
                      {Array.isArray(e.level) ? e.level.map(l => (
                        <span key={l} className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                          {l}
                        </span>
                      )) : (e.level && e.level !== "All" && (
                        <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                          {e.level}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {e.title}
                    </h3>

                    {e.subSubject && (
                      <div className="inline-flex items-center gap-2 text-sm text-indigo-600 mb-4 bg-indigo-50/50 w-fit px-3 py-1.5 rounded-lg font-medium">
                        <BookOpen size={14} /> {e.subSubject}
                      </div>
                    )}

                    <div className="space-y-3 mt-auto pt-4 border-t border-slate-100/50">
                      {e.venue && (
                        <div className={`flex items-start gap-3 p-3.5 rounded-xl ${TYPE_COLORS[e.eventType] || "bg-slate-50 text-slate-700"}`}>
                          <MapPin size={18} className="mt-0.5 shrink-0 opacity-80" />
                          <span className="text-[14px] font-bold leading-snug">{e.venue}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mt-4 bg-slate-50 p-3 rounded-xl">
                        {e.startDate && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">📅 Event Start </span>
                            <span className="block text-sm font-semibold text-emerald-600">{e.startDate}</span>
                          </div>
                        )}
                        {e.applicationDeadline && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5 text-rose-500">Deadline</span>
                            <span className="block text-sm font-bold text-rose-600">{e.applicationDeadline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {e.externalLink && (
                    <a href={e.externalLink.startsWith("http") ? e.externalLink : `https://${e.externalLink}`}
                      target="_blank" rel="noreferrer"
                      className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
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

// Simple generic icons instead of large lucide imports to avoid error on GraduationCap missing
function GraduationCapIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
}

