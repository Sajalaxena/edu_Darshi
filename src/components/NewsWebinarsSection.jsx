import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WebinarModal from "./WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return "—";

  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

// Demo data fallback
const DEMO_NEWS = [
  {
    _id: "1",
    title: "Breakthrough in Quantum Computing Research",
    source: "Science Daily",
    publishedDate: "Jan 2, 2026",
    externalLink: "#",
  },
  {
    _id: "2",
    title: "New AI Model Achieves 99% Accuracy in Medical Diagnosis",
    source: "Tech News",
    publishedDate: "Jan 1, 2026",
    externalLink: "#",
  },
  {
    _id: "3",
    title: "Revolutionary Study on Climate Change Mitigation",
    source: "Nature",
    publishedDate: "Dec 30, 2025",
    externalLink: "#",
  },
];

const DEMO_WEBINARS = [
  {
    _id: "1",
    title: "Mastering JEE Advanced Problem Solving Techniques",
    date: "Jan 15, 2026",
    time: "5:00 PM IST",
    speaker: "Dr. Amit Sharma",
  },
  {
    _id: "2",
    title: "NEET Biology: Last Minute Revision Strategies",
    date: "Jan 18, 2026",
    time: "6:30 PM IST",
    speaker: "Dr. Priya Gupta",
  },
  {
    _id: "3",
    title: "Career Guidance for Engineering Aspirants",
    date: "Jan 22, 2026",
    time: "4:00 PM IST",
    speaker: "Prof. Rajesh Kumar",
  },
];

function CompactRow({ type, title, meta, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 transition text-left"
    >
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-xs font-semibold ${
          type === "news"
            ? "bg-blue-100 text-blue-700"
            : "bg-indigo-100 text-indigo-700"
        }`}
      >
        {type === "news" ? "NEWS" : "LIVE"}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-gray-500 mt-1">{meta}</p>
      </div>
      <span className="text-gray-400">›</span>
    </button>
  );
}

export default function NewsWebinarsCompact() {
  const [news, setNews] = useState(DEMO_NEWS);
  const [webinars, setWebinars] = useState(DEMO_WEBINARS);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, webinarRes] = await Promise.all([
          fetch(`${API_BASE}/research-news`),
          fetch(`${API_BASE}/webinars`),
        ]);
        const newsJson = await newsRes.json();
        const webinarJson = await webinarRes.json();

        if (newsJson.data?.length) setNews(newsJson.data);
        if (webinarJson.data?.length) setWebinars(webinarJson.data);
      } catch (err) {
        console.error("Using demo data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= NEWS BOX ================= */}
          <div
            className="rounded-2xl overflow-hidden 
                    bg-gradient-to-br from-blue-50 via-white to-indigo-50
                    border border-blue-200
                    shadow-lg shadow-blue-100/50"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                  Competitive Exams, Postdocs & Jobs Updates
                </h3>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center
             px-5 py-2
             text-sm font-semibold
             bg-white text-blue-700
             rounded-full
             hover:bg-blue-50
             transition
             shadow-sm whitespace-nowrap"
                >
                  View All →
                </Link>
              </div>
            </div>

            {/* Rows */}
<div className="p-6 space-y-4">
              {news.slice(0, 4).map((n) => (
                <div
                  key={n._id}
                  onClick={() => setOpen({ ...n, type: "news" })}
                  className="group p-4 rounded-xl bg-white 
                          border border-blue-100
                          hover:border-blue-400
                          hover:shadow-md
                          transition cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center 
                              bg-blue-100 text-blue-700 text-xs font-bold rounded-md"
                    >
                      Jobs
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition">
                        {n.title}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-emerald-600 font-medium">
                          Starts:
                        </span>
                        <span className="text-gray-600">{formatDateDDMMYYYY(n.publishedDate)}</span>

                        <span className="text-gray-400">•</span>

                        <span className="text-sky-600 font-medium">
                          Deadline:
                        </span>
                        <span className="text-gray-700">{n.source || "—"}</span>
                      </div>
                    </div>

                    <span className="text-gray-400 group-hover:text-blue-600 transition">
                      ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= WEBINAR BOX ================= */}
          <div
            className="rounded-2xl overflow-hidden 
                    bg-gradient-to-br from-indigo-50 via-white to-purple-50
                    border border-indigo-200
                    shadow-lg shadow-indigo-100/50"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                  Conferences, Seminars & Workshops Updates
                </h3>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center
             px-5 py-2
             text-sm font-semibold
             bg-white text-blue-700
             rounded-full
             hover:bg-blue-50
             transition
             shadow-sm whitespace-nowrap"
                >
                  View All →
                </Link>
              </div>
            </div>

            {/* Rows */}
<div className="p-6 space-y-4">
              {webinars.slice(0, 4).map((w) => (
                <div
                  key={w._id}
                  onClick={() => setOpen(w)}
                  className="group p-4 rounded-xl bg-white 
                          border border-indigo-100
                          hover:border-indigo-400
                          hover:shadow-md
                          transition cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center 
                              bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md"
                    >
                      LIVE
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition">
                        {w.title}
                      </h4>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-emerald-600 font-medium">
                          Starts:
                        </span>
                        <span className="text-gray-700">{w.date}</span>

                        <span className="text-gray-400">•</span>

                        <span className="text-rose-600 font-medium">
                          Deadline:
                        </span>
                        <span className="text-gray-700">{w.time}</span>
                      </div>
                    </div>

                    <span className="text-gray-400 group-hover:text-indigo-600 transition">
                      ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <WebinarModal data={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
