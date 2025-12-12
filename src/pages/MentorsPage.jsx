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
    mentorsData.forEach((m) => m.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = mentorsData.filter((m) => {
    const matchQ =
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.title.toLowerCase().includes(query.toLowerCase());
    const matchTag = activeTag ? m.tags.includes(activeTag) : true;
    return matchQ && matchTag;
  });

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold" style={{ color: "var(--brand)" }}>
          Our Mentors
        </h1>
        <p className="mt-2 text-slate-600">Experienced mentors across academia & industry</p>
      </div>

      <div className="mt-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or specialization..."
          className="flex-1 rounded-lg border px-4 py-3 shadow-sm"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setActiveTag(null)} className={`px-3 py-2 rounded ${activeTag ? "bg-slate-100" : "bg-indigo-600 text-white"}`}>
            All
          </button>
          {allTags.map((t) => (
            <button key={t} onClick={() => setActiveTag(t)} className={`px-3 py-2 rounded ${activeTag === t ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <MentorCard
            key={m.id}
            mentor={m}
            onOpen={(mentor) => setSelected(mentor)}
            onNavigate={(mentor) => navigate(`/mentors/${mentor.id}`)}
          />
        ))}
      </div>

      <MentorModal mentor={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}
