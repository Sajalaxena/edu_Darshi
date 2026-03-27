// src/pages/MentorDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, Mail, CheckCircle, GraduationCap, Award, BookOpen, ExternalLink, CalendarDays } from "lucide-react";
import mentorsData from "../components/data/mentorsData";
import MathematicalBackground from "../components/MathematicalBackground";

export default function MentorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentorsData.find((m) => m.id === id);

  if (!mentor) {
    return (
      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mentor Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-sm">We couldn't locate the profile you were looking for. They might have been removed or the link is incorrect.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 flex items-center gap-2">
          <ArrowLeft size={18} /> Go Back
        </button>
      </section>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <MathematicalBackground />

      {/* ── Dynamic Hero Banner ── */}
      <section className="relative h-64 md:h-80 bg-[#1A1829] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/60 to-purple-900/60 mix-blend-multiply" />
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-br from-indigo-500/30 to-transparent blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute top-[20%] right-[-10%] w-[60%] h-[150%] rounded-full bg-gradient-to-bl from-amber-500/20 to-transparent blur-3xl" 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 h-full relative z-10 flex items-start pt-24">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-xl transition-all duration-300 font-medium text-sm">
            <ArrowLeft size={16} /> Back to Mentors
          </button>
        </div>
      </section>

      {/* ── Profile Content ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-32 md:-mt-40 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(30,27,75,0.1)] overflow-hidden"
        >
          {/* Header Area */}
          <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-full blur-md opacity-30 transform scale-110"></div>
              <img 
                src={mentor.img} 
                alt={mentor.name} 
                className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover ring-8 ring-white shadow-xl bg-slate-50"
                onError={(e) => e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f1f5f9' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='60'%3E👤%3C/text%3E%3C/svg%3E"}
              />
            </div>

            <div className="flex-1 mt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-amber-100">
                <Award size={14} /> Verified Mentor
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                {mentor.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-indigo-600 font-semibold mb-3">
                {mentor.title}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mb-8">
                {mentor.short}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {/* 
                <button 
                  className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  <CalendarDays size={20} /> Request 1:1 Session
                </button>
                */}
                
                <div className="flex gap-3">
                  {mentor.linkedin && (
                    <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
                      <Linkedin size={22} className="fill-current" />
                    </a>
                  )}
                  {mentor.email && (
                    <a href={`mailto:${mentor.email}`} className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shadow-sm">
                      <Mail size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Main Column */}
            <div className="md:col-span-2 p-8 md:p-12 bg-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="text-indigo-500" /> About
              </h3>
              <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none mb-12" dangerouslySetInnerHTML={{__html: mentor.bio?.replace(/\n/g, '<br/>') || "No detailed biography provided."}} />
              
              {mentor.qualifications?.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="text-indigo-500" /> Educational Background & Experience
                  </h3>
                  <div className="space-y-4">
                    {mentor.qualifications.map((q, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors">
                        <CheckCircle size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{q}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="p-8 md:p-12 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {(mentor.tags || []).map((t) => (
                  <span key={t} className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-sm font-bold text-indigo-700">
                    {t}
                  </span>
                ))}
              </div>

              {/* 
              <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <h4 className="font-bold text-lg mb-2">Book a Session</h4>
                <p className="text-indigo-200 text-sm mb-6 leading-relaxed">Get personalized guidance on academic strategies, interviews, and more.</p>
                <button className="w-full py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                  Check Availability <ExternalLink size={16} />
                </button>
              </div>
              */}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
