// src/components/MentorCard.jsx
import React from "react";
import { motion } from "framer-motion";
import mentorsData from "../components/data/mentorsData";
import { useNavigate } from "react-router-dom";

const THEMES = {
  "dr-gyan": { color: "blue", bg: "from-blue-50 to-white", btnClass: "bg-blue-600 hover:bg-blue-700" },
  "sajal-saxena": { color: "blue", bg: "from-blue-50 to-white", btnClass: "bg-blue-600 hover:bg-blue-700" },
  "kavita-sonkar": { color: "blue", bg: "from-blue-50 to-white", btnClass: "bg-blue-600 hover:bg-blue-700" },
};

function SingleCard({ mentor, onOpen }) {
  const navigate = useNavigate();
  const m = mentor || {};
  const theme = THEMES[m.id] || { color: "indigo", bg: "from-slate-50 to-white", btnClass: "bg-indigo-600 hover:bg-indigo-700" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Header */}
      <div className={`p-6 bg-gradient-to-br ${theme.bg}`}>
        <div className="flex items-center gap-4">
          <img
            src={m.img}
            alt={m.name || "Mentor"}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
            onError={(e) => e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23e5e7eb' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23808a9a' font-size='12'%3E👤%3C/text%3E%3C/svg%3E"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate">{m.name || "Mentor"}</h3>
            <p className="text-sm text-slate-600 truncate">{m.title}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{m.short}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Qualifications */}
        {m.qualifications?.length > 0 && (
          <ul className="space-y-1.5 text-sm text-slate-700">
            {m.qualifications.slice(0, 2).map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className={`text-${theme.color}-600`}>•</span>
                <span className="line-clamp-1">{q}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        {m.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {m.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-2.5 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onOpen?.(m) || navigate("/mentors")}
          className={`w-full ${theme.btnClass} text-white font-medium py-2.5 px-4 rounded-lg transition-colors`}
        >
          View Profile →
        </button>
      </div>
    </motion.div>
  );
}

export default function MentorCard({ mentor, onOpen }) {
  if (mentor) return <SingleCard mentor={mentor} onOpen={onOpen} />;

  const list = Array.isArray(mentorsData) ? mentorsData.slice(0, 3) : [];
  if (!list.length) return <div className="p-6 text-center text-slate-500">No mentors available</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Our Top Mentors</h2>
          <p className="text-slate-600">Learn from experienced professionals</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <SingleCard key={m.id || m.name} mentor={m} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
 