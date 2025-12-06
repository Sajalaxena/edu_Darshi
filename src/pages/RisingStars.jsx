// src/pages/RisingStars.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * This page expects the same student data format the modal uses.
 * We'll use import.meta.globEager in the parent to prepare images and pass here
 * (or you can reuse the same import approach).
 */

const STUDENT_DATA = [
  {
    id: "s1",
    name: "Anita Sharma",
    exam: "NEET - 2025 (AIR 102)",
    brief: "Scored 680/720. Focused on concept clarity & timed practice.",
    image: "student1.jpg",
  },
  {
    id: "s2",
    name: "Rohit Verma",
    exam: "JEE Advanced - 2025 (Rank 1200)",
    brief: "Strong problem-solving routine, weekly mock evaluation.",
    image: "student2.jpg",
  },
  {
    id: "s3",
    name: "Priya N",
    exam: "GATE - 2025 (Top 500)",
    brief: "Focused project work + mentor-led doubt sessions.",
    image: "student3.jpg",
  },

  // more items — add as needed
  {
    id: "s4",
    name: "Vikram Joshi",
    exam: "JEE Main - 2025",
    brief: "Consistent daily targets; improved speed & accuracy.",
    image: "student4.jpg",
  },
  {
    id: "s5",
    name: "Trupti",
    exam: "NET/SET - 2025",
    brief: "Research-focused track, publications & fellowship guidance.",
    image: "student5.jpg",
  },
];

export default function RisingStars({ imageMap = {} }) {
  // imageMap: optional filename -> imported url
  return (
    <section className="container mx-auto px-6 py-12">
      <h1
        className="text-3xl font-semibold mb-6"
        style={{ color: "var(--brand)" }}
      >
        Rising Stars
      </h1>

      <p className="text-slate-700 mb-6">
        Meet our students who cleared competitive exams with disciplined
        mentorship.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {STUDENT_DATA.map((s) => (
          <article key={s.id} className="card p-6 rounded-lg text-center">
            {imageMap[s.image] ? (
              <img
                src={imageMap[s.image]}
                alt={s.name}
                className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-slate-100 mx-auto mb-4" />
            )}

            <h3 className="font-semibold">{s.name}</h3>
            <div className="text-sm text-slate-500">{s.exam}</div>
            <p className="text-sm text-slate-700 mt-3">{s.brief}</p>

            <div className="mt-4">
              <Link to="#" className="text-sm text-blue-600 hover:underline">
                Read full story →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
