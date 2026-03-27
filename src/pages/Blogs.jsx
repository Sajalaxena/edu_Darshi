import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathLoader from "../components/MathLoader";
import MathematicalBackground from "../components/MathematicalBackground";
import { Search, Compass } from "lucide-react";
import BlogCard from "../components/BlogCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(blogs.map(b => b.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = blogs.filter((b) => {
    const matchSearch = !search || 
      b.title?.toLowerCase().includes(search.toLowerCase()) || 
      b.summary?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#0F0C20] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Knowledge Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-200">Stories</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-purple-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Read the latest academic trends, preparation strategies, and success stories from our expert team and mentors.
          </motion.p>
        </div>
      </section>

      {/* ── Floating Search & Filters ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(147,51,234,0.15)] p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="relative w-full mb-6 group">
            <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-600 transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search blogs by title or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-slate-800 text-lg font-medium focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 md:gap-3 w-full max-h-[120px] overflow-y-auto no-scrollbar pb-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  ${activeCategory === c 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105" 
                    : "bg-white border-2 border-slate-100 text-slate-600 hover:border-purple-200 hover:text-purple-600"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex flex-col items-end shrink-0 pl-6 border-l border-slate-200">
              <span className="text-3xl font-black text-purple-600 leading-none">{filteredBlogs.length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Articles</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 max-w-7xl">
        {loading ? (
          <MathLoader text="Loading Knowledge Hub & Stories..." />
        ) : filteredBlogs.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No blogs found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="h-full"
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}

