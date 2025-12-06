// src/pages/AllWebinars.jsx
import React, { useState } from "react";
import WebinarModal from "../components/WebinarModal";
import { motion } from "framer-motion";
import jeeImage from "../assets/jee.jpg";

const WEBINARS = [
  {
    id: "w1",
    title: "Crack NEET 2026 — Strategy",
    date: "2026-02-12",
    time: "7:00 PM IST",
    venue: "Zoom",
    image: "jeeImage",
    points: ["Syllabus prioritization", "Daily routine"],
  },
  {
    id: "w2",
    title: "JEE Problem Solving Marathon",
    date: "2026-02-26",
    time: "6:00 PM IST",
    venue: "YouTube Live",
    image: "jeeImage",
    points: ["Algebra tricks", "Time management"],
  },
  {
    id: "w3",
    title: "Career Roadmap for CS",
    date: "2026-03-10",
    time: "5:00 PM IST",
    venue: "Zoom",
    image: "jeeImage",
    points: ["Interview prep", "Project tips"],
  },
  {
    id: "w4",
    title: "Research Methods 101",
    date: "2026-03-20",
    time: "7:00 PM IST",
    venue: "Auditorium",
    image: "jeeImage",
    points: ["Paper reading", "Design"],
  },
];

export default function AllWebinars() {
  const [open, setOpen] = useState(null);

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">All Webinars & Events</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {WEBINARS.map((w) => (
          <motion.div
            key={w.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-3 border rounded-lg flex gap-3 items-start"
          >
            <img
              src={w.image}
              alt={w.title}
              className="w-24 h-16 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1">
              <div className="font-medium">{w.title}</div>
              <div className="text-sm text-slate-500">
                {w.date} • {w.time} • {w.venue}
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {w.points.slice(0, 3).join(" • ")}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setOpen(w)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Details
                </button>
                <a href="#" className="text-sm text-slate-500 hover:underline">
                  Register
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <WebinarModal webinar={open} onClose={() => setOpen(null)} />
    </section>
  );
}
