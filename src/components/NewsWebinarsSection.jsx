// src/components/NewsWebinarsCompact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WebinarModal from "./WebinarModal";

// demo data: replace or extend later
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
];

const WEBINARS = [
  {
    id: "w1",
    title: "Crack NEET 2026 — Strategy",
    date: "2026-02-12",
    time: "7:00 PM IST",
    image: "/mnt/data/Media (5).jpg",
    points: ["Syllabus prioritization", "Daily routine"],
  },
  {
    id: "w2",
    title: "JEE Problem Solving Marathon",
    date: "2026-02-26",
    time: "6:00 PM IST",
    image: "/mnt/data/Media (5).jpg",
    points: ["Algebra tricks", "Time management"],
  },
  {
    id: "w3",
    title: "Career Roadmap for CS",
    date: "2026-03-10",
    time: "5:00 PM IST",
    image: "/mnt/data/Media (5).jpg",
    points: ["Interview prep", "Project tips"],
  },
  {
    id: "w4",
    title: "Research Methods 101",
    date: "2026-03-20",
    time: "7:00 PM IST",
    image: "/mnt/data/Media (5).jpg",
    points: ["Paper reading", "Experimental design"],
  },
];

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
};

function CompactCard({ title, sub, onClick, image }) {
  return (
    <motion.button
      layout
      variants={item}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 p-3 rounded-md border border-transparent hover:shadow-sm transition"
      style={{ background: "rgba(255,255,255,0.9)" }}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="w-14 h-10 rounded-md object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-10 rounded-md bg-slate-50 flex items-center justify-center text-xs text-slate-400">
          News
        </div>
      )}
      <div className="flex-1">
        <div className="font-medium text-sm line-clamp-2">{title}</div>
        {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      </div>
    </motion.button>
  );
}

export default function NewsWebinarsCompact() {
  const [openWebinar, setOpenWebinar] = useState(null);

  return (
    <>
      <section className="container mx-auto px-6 my-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Research & News */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate="visible"
            className="card p-4 border rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Research & News</h3>
              <Link
                to="/news"
                className="text-sm text-blue-600 hover:underline"
              >
                Show more
              </Link>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {NEWS.slice(0, 3).map((n) => (
                  <CompactCard
                    key={n.id}
                    title={n.title}
                    sub={n.source}
                    onClick={() =>
                      window.open("#", "_blank")
                    } /* Replace with modal or details page if desired */
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Webinars */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate="visible"
            className="card p-4 border rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Upcoming Webinars</h3>
              <Link
                to="/webinars"
                className="text-sm text-blue-600 hover:underline"
              >
                Show more
              </Link>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {WEBINARS.slice(0, 3).map((w) => (
                  <CompactCard
                    key={w.id}
                    title={w.title}
                    sub={`${w.date} • ${w.time}`}
                    image={w.image}
                    onClick={() => setOpenWebinar(w)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal rendered if webinar clicked */}
      <AnimatePresence>
        {openWebinar && (
          <WebinarModal
            webinar={openWebinar}
            onClose={() => setOpenWebinar(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
