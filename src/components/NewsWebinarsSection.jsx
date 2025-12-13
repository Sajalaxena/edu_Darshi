// src/components/NewsWebinarsCompact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WebinarModal from "./WebinarModal";

/**
 * Modern compact Research & Webinars panel
 * - left: Research (3 items)
 * - right: Webinars (3 items)
 * - each panel has its own scroll area
 * - "Show more" links navigate to full pages
 *
 * IMPORTANT: import your images at top of file if images are local:
 * import jeeImage from "../assets/jee.jpg";
 * then pass jeeImage to the WEBINARS array.
 */

// sample data (replace with real)
const NEWS = [
  { id: "n1", title: "New CRISPR variant accelerates plant editing", source: "Nature • Oct 2025", summary: "Refined CRISPR improves editing efficiency in rice." },
  { id: "n2", title: "Breakthrough in battery chemistry", source: "Science • Sep 2025", summary: "A new electrolyte increases charge cycles by 2x." },
  { id: "n3", title: "AI helps discover new molecule", source: "Nat Comm • Aug 2025", summary: "AI reduces discovery time and candidate list." },
  { id: "n4", title: "Novel polymer for sensors", source: "Adv Mater • Jul 2025", summary: "Stretchable sensors with higher sensitivity." },
    { id: "n5", title: "Quantum dots in solar cells", source: "Joule • Jun 2025", summary: "Enhanced efficiency using lead-free quantum dots." },
    { id: "n6", title: "New insights into dark matter", source: "PRL • May 2025", summary: "Experimental data narrows down dark matter candidates." },
];

const WEBINARS = [
  { id: "w1", title: "Crack NEET 2026 — Strategy", date: "2026-02-12", time: "7:00 PM IST", venue: "Zoom", image: null, points: ["Syllabus prioritization", "Daily routine"], registration: "#" },
  { id: "w2", title: "JEE Problem Solving Marathon", date: "2026-02-26", time: "6:00 PM IST", venue: "YouTube Live", image: null, points: ["Algebra tricks", "Time management"], registration: "#" },
  { id: "w3", title: "Career Roadmap for CS", date: "2026-03-10", time: "5:00 PM IST", venue: "Zoom", image: null, points: ["Interview prep", "Project tips"], registration: "#" },
  { id: "w4", title: "Research Methods 101", date: "2026-03-20", time: "7:00 PM IST", venue: "Auditorium", image: null, points: ["Paper reading", "Experimental design"], registration: "#" },
];

const listParent = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const listItem = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 6 } };

// compact list row
function CompactRow({ image, title, sub, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      variants={listItem}
      className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,255,0.98))" }}
    >
      {image ? (
        <img src={image} alt="" className="w-14 h-10 object-cover rounded-md flex-shrink-0" />
      ) : (
        <div className="w-14 h-10 rounded-md bg-slate-100 flex items-center justify-center text-xs text-slate-400">News</div>
      )}
      <div className="flex-1">
        <div className="font-medium text-sm line-clamp-2">{title}</div>
        {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      </div>
      <div className="text-xs text-slate-400">›</div>
    </motion.button>
  );
}

export default function NewsWebinarsCompact() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="container mx-auto px-6 my-8">

        <div className="grid md:grid-cols-2 gap-6">
          {/* Research & News */}
          <motion.div variants={listParent} initial="hidden" animate="visible" className="rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-white border">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="text-lg font-semibold text-slate-900">Research & News</h3>
              <Link to="/news" className="text-sm text-sky-600 hover:underline">Show more</Link>
            </div>

            <div style={{ maxHeight: 320, overflow: "auto", padding: 12 }} className="space-y-3">
              <AnimatePresence>
                {NEWS.slice(0, 4).map((n) => (
                  <CompactRow
                    key={n.id}
                    title={n.title}
                    sub={n.source}
                    image={null}
                    onClick={() => window.open("#", "_blank")}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Upcoming Webinars */}
          <motion.div variants={listParent} initial="hidden" animate="visible" className="rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-white border">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="text-lg font-semibold text-slate-900">Upcoming Webinars</h3>
              <Link to="/webinars" className="text-sm text-sky-600 hover:underline">Show more</Link>
            </div>

            <div style={{ maxHeight: 320, overflow: "auto", padding: 12 }} className="space-y-3">
              <AnimatePresence>
                {WEBINARS.slice(0, 4).map((w) => (
                  <CompactRow
                    key={w.id}
                    title={w.title}
                    sub={`${w.date} • ${w.time}`}
                    image={w.image}
                    onClick={() => setOpen(w)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {open && <WebinarModal webinar={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
