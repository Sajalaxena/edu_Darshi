import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathLoader from "../components/MathLoader";
import MathematicalBackground from "../components/MathematicalBackground";
import { Search, MapPin, Calendar, ExternalLink, Briefcase, Building2, ArrowRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AllJobs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`${API_BASE}/jobs`);
        const json = await res.json();
        setItems(json.data || []);
      } catch (err) {
        console.error("Failed to load jobs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    return !search ||
      i.title?.toLowerCase().includes(q) ||
      i.institution?.toLowerCase().includes(q) ||
      i.designation?.toLowerCase().includes(q) ||
      i.area?.toLowerCase().includes(q) ||
      i.location?.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q);
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#1A0A10] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Career Opportunities
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Faculty & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-orange-300">Academic Jobs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-rose-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Discover prestigious faculty openings, research positions, and teaching opportunities across top universities.
          </motion.p>
        </div>
      </section>

      {/* ── Floating Search ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(225,29,72,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full group flex flex-col md:flex-row gap-4">
            <div className="relative w-full flex-1">
              <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-600 transition-transform group-focus-within:scale-110" />
              <input
                type="text"
                placeholder="Search jobs by title, institution, area, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="hidden md:flex flex-col items-end shrink-0 pl-10 pr-4 justify-center border-l border-slate-200">
              <span className="text-3xl font-black text-rose-600 leading-none">{filtered.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Found</span>
            </div>
            <div className="md:hidden flex justify-between items-center w-full">
              <span className="text-sm font-bold text-slate-500 uppercase">Results Found</span>
              <span className="text-2xl font-black text-rose-600 bg-rose-50 px-4 py-1 rounded-xl">{filtered.length}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {loading ? (
          <MathLoader text="Loading Job Opportunities..." />
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {filtered.map((j, index) => (
                <motion.div
                  key={j._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center border border-rose-100 shrink-0 shadow-sm text-rose-600">
                        <Briefcase size={22} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-rose-600 transition-colors line-clamp-2">
                          {j.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      {j.institution && (
                        <div className="flex items-start gap-2.5 text-slate-700 font-semibold mb-2">
                          <Building2 size={16} className="text-slate-400 mt-0.5 shrink-0" />
                          <span>{j.institution}</span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {j.designation && (
                          <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                            {j.designation}
                          </span>
                        )}
                        {j.area && (
                          <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-100">
                            {j.area}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2.5 mt-auto pt-4 border-t border-slate-100">
                      {j.location && (
                        <div className="flex items-start gap-3 text-slate-600">
                          <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium leading-tight">{j.location}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {j.postedDate && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Posted</span>
                            <span className="block text-sm font-semibold text-slate-700">{j.postedDate}</span>
                          </div>
                        )}
                        {j.deadline && (
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Deadline</span>
                            <span className="block text-sm font-semibold text-rose-600">{j.deadline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {j.externalLink && (
                    <a href={j.externalLink.startsWith("http") ? j.externalLink : `https://${j.externalLink}`}
                      target="_blank" rel="noreferrer"
                      className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <span>View Job Application</span>
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

