// src/pages/MentorsPage.jsx
import React, { useMemo, useState } from "react";
import mentorsData from "../components/data/mentorsData";
import MentorCard from "../components/MentorCard";
import MentorModal from "../components/MentorModal";
import { useNavigate } from "react-router-dom";

export default function MentorsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const allTags = useMemo(() => {
    const s = new Set();
    mentorsData.forEach((m) => (m.tags || []).forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = mentorsData.filter((m) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.title && m.title.toLowerCase().includes(q));
    const matchTag = activeTag ? (m.tags || []).includes(activeTag) : true;
    return matchQ && matchTag;
  });

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold" style={{ color: "var(--brand, #334eea)" }}>
          Our Mentors
        </h1>
        <p className="mt-2 text-slate-600">Experienced mentors across academia & industry</p>
      </div>

      {/* Search + tags */}
      <div className="mt-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full rounded-xl bg-white/90 border border-slate-200 px-4 py-3 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-2 rounded-xl text-sm transition ${
              !activeTag ? "bg-indigo-600 text-white shadow" : "bg-slate-100 text-slate-700"
            }`}
          >
            All
          </button>

          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-3 py-2 rounded-xl text-sm transition ${
                activeTag === t ? "bg-indigo-600 text-white shadow" : "bg-slate-100 text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor grid */}
      <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <div key={m.id} className="h-full">
            <MentorCard
              mentor={m}
              onOpen={(mentor) => setSelected(mentor)}
            />
          </div>
        ))}
      </div>

      <MentorModal mentor={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}
