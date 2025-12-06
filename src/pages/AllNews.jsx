// src/pages/AllNews.jsx
import React from "react";
import { motion } from "framer-motion";

const NEWS = [
  {
    id: "r1",
    title: "New CRISPR variant accelerates plant editing",
    source: "Nature • Oct 2025",
    summary: "Improves editing efficiency in rice.",
  },
  {
    id: "r2",
    title: "Breakthrough in battery chemistry",
    source: "Science • Sep 2025",
    summary: "New electrolyte doubles cycle life in lab.",
  },
  {
    id: "r3",
    title: "AI helps discover new molecule",
    source: "Nat Comm • Aug 2025",
    summary: "AI-driven search reduces discovery time.",
  },
  {
    id: "r4",
    title: "Novel polymer for sensors",
    source: "Adv Mater • Jul 2025",
    summary: "Stretchable sensors with higher sensitivity.",
  },
  // ...more items
];

export default function AllNews() {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">All Research & News</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {NEWS.map((n) => (
          <motion.article
            key={n.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 border rounded-lg"
          >
            <h3 className="font-semibold">{n.title}</h3>
            <div className="text-sm text-slate-500">{n.source}</div>
            <p className="mt-2 text-sm text-slate-700">{n.summary}</p>
            <div className="mt-3">
              <a href="#" className="text-blue-600 hover:underline">
                Read paper
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
