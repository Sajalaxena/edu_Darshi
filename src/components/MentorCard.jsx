// src/components/MentorCard.jsx
import React from "react";
import { motion } from "framer-motion";
import mentorsData from "../components/data/mentorsData"; // adjust path if needed

/**
 * MentorCard
 *
 * - If `mentor` prop is passed -> render a single detailed card.
 * - If no `mentor` prop -> render a small preview grid of first 3 mentors
 *   (useful for Home where you called <MentorCard /> directly).
 *
 * Props:
 * - mentor (object) optional
 * - onOpen (function) optional, called with mentor when "View Details" clicked
 */

function SingleCard({ mentor, onOpen }) {
  // defensive guards
  const m = mentor || {};
  const id = m.id || "unknown";
  const gradient =
    {
      "dr-gyan": "from-blue-50 to-white",
      "sajal-saxena": "from-purple-50 to-white",
      "kavita-sonkar": "from-green-50 to-white",
    }[id] || "from-slate-50 to-white";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
      }}
      transition={{ type: "spring", stiffness: 150 }}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm"
      data-mentor-id={id}
    >
      {/* Card header with gradient */}
      <div className={`p-6 bg-gradient-to-b ${gradient}`}>
        <div className="flex items-center gap-4">
          <img
            src={m.img}
            alt={m.name || "Mentor"}
            className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-white"
            onError={(e) => {
              // graceful fallback if image missing
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 24 24'%3E%3Crect fill='%23e5e7eb' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23808a9a' font-size='10'%3Ementor%3C/text%3E%3C/svg%3E";
            }}
          />

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {m.name || "Mentor name"}
            </h3>
            <p className="text-sm text-slate-600">{m.title || ""}</p>
            <p className="text-xs text-slate-500 mt-1">{m.short || ""}</p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-6">
        <ul className="text-sm text-slate-700 space-y-2 min-h-[3.5rem]">
          {(m.qualifications || []).slice(0, 2).map((q, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>{q}</span>
            </li>
          ))}

          {/* handle case where no qualifications present */}
          {(m.qualifications || []).length === 0 && (
            <li className="text-sm text-slate-500">Qualifications not listed</li>
          )}
        </ul>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {(m.tags || []).map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() =>
              typeof onOpen === "function"
                ? onOpen(m)
                : alert(`Open mentor: ${m.name || "unknown"}`)
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm shadow hover:bg-indigo-700"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MentorCard({ mentor, onOpen }) {
  // if single mentor given -> render single card
  if (mentor) {
    return <SingleCard mentor={mentor} onOpen={onOpen} />;
  }

  // No mentor prop – render a small preview grid using mentorsData
  const list = Array.isArray(mentorsData) ? mentorsData.slice(0, 3) : [];

  if (!list.length) {
    return (
      <div className="p-6 text-center text-slate-500">
        No mentors available (check mentorsData import)
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 my-12">
      <h2 className="text-4xl font-bold text-center mb-16" style={{ color: "var(--brand)" }}>
          Our Top Mentors
        </h2>
      <div className="flex items-center justify-between mb-6">
        
        {/* optional: link to /mentors page */}
        {/* <a href="/mentors" className="text-sm text-indigo-600 hover:underline">
          View all
        </a> */}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <SingleCard key={m.id || m.name} mentor={m} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
