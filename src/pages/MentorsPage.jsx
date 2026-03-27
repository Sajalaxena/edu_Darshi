import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Award, BookOpen } from "lucide-react";
import mentorsData from "../components/data/mentorsData";
import { useNavigate } from "react-router-dom";
import MathematicalBackground from "../components/MathematicalBackground";

export default function MentorsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const navigate = useNavigate();

  const allTags = useMemo(() => {
    const s = new Set();
    mentorsData.forEach((m) => (m.tags || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = mentorsData.filter((m) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q ||
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.short && m.short.toLowerCase().includes(q));
    const matchTag = activeTag === "All" ? true : (m.tags || []).includes(activeTag);
    return matchQ && matchTag;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#1A1829] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Expert Guidance
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">Mentors</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-amber-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Learn from experienced professionals and top educators who are dedicated to guiding you towards your academic and career goals.
          </motion.p>
        </div>
      </section>

      {/* ── Floating Search & Filters ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full mb-6 group">
            <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-600 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search mentors by name, specialization, or background..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 md:gap-3 w-full overflow-x-auto no-scrollbar pb-2">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap
                  ${activeTag === t 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 scale-105" 
                    : "bg-white border-2 border-slate-100 text-slate-600 hover:border-amber-200 hover:text-amber-600"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex flex-col items-end shrink-0 pl-6 border-l border-slate-200">
              <span className="text-3xl font-black text-amber-600 leading-none">{filtered.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Mentors</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No mentors found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence>
              {filtered.map((m, index) => (
                <motion.div
                  key={m.id || m.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden text-center h-full"
                >
                  {/* Banner & Avatar Container */}
                  <div className="relative pt-8 pb-4 px-6 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">
                    <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-amber-100/50 to-orange-50/50"></div>
                    
                    <div className="relative w-28 h-28 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-sm opacity-20 group-hover:opacity-60 transition-opacity duration-300 scale-110"></div>
                      <img
                        src={m.img}
                        alt={m.name}
                        className="relative w-full h-full rounded-full object-cover ring-4 ring-white shadow-lg bg-white"
                        onError={(e) => e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f1f5f9' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='30'%3E👤%3C/text%3E%3C/svg%3E"}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{m.name}</h3>
                    <p className="text-sm font-semibold text-amber-600 mt-1">{m.title}</p>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                      {m.short}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-6 mt-auto">
                      {(m.tags || []).slice(0, 3).map((t) => (
                        <span key={t} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(`/mentors/${m.id}`)}
                      className="w-full mt-auto bg-slate-900 hover:bg-amber-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-amber-500/30 active:scale-[0.98]"
                    >
                      View Profile
                    </button>
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

