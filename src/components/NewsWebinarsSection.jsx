import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WebinarModal from "./WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Demo data fallback
const DEMO_NEWS = [
  { _id: "1", title: "Breakthrough in Quantum Computing Research", source: "Science Daily", publishedDate: "Jan 2, 2026", externalLink: "#" },
  { _id: "2", title: "New AI Model Achieves 99% Accuracy in Medical Diagnosis", source: "Tech News", publishedDate: "Jan 1, 2026", externalLink: "#" },
  { _id: "3", title: "Revolutionary Study on Climate Change Mitigation", source: "Nature", publishedDate: "Dec 30, 2025", externalLink: "#" },
  
];

const DEMO_WEBINARS = [
  { _id: "1", title: "Mastering JEE Advanced Problem Solving Techniques", date: "Jan 15, 2026", time: "5:00 PM IST", speaker: "Dr. Amit Sharma" },
  { _id: "2", title: "NEET Biology: Last Minute Revision Strategies", date: "Jan 18, 2026", time: "6:30 PM IST", speaker: "Dr. Priya Gupta" },
  { _id: "3", title: "Career Guidance for Engineering Aspirants", date: "Jan 22, 2026", time: "4:00 PM IST", speaker: "Prof. Rajesh Kumar" },
 
];

function CompactRow({ type, title, meta, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 transition text-left"
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-xs font-semibold ${type === "news" ? "bg-blue-100 text-blue-700" : "bg-indigo-100 text-indigo-700"}`}>
        {type === "news" ? "NEWS" : "LIVE"}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">{title}</h4>
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
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NEWS */}
          <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-white border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-700">Academic & News Updates</h3>
                <Link to="/news" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
              </div>
            </div>
            <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto no-scrollbar">
              {news.slice(0, 4).map((n) => (
                <CompactRow key={n._id} type="news" title={n.title} meta={`${n.source} • ${n.publishedDate}`}
                  onClick={() => n.externalLink && window.open(n.externalLink, "_blank")} />
              ))}
            </div>
          </div>

          {/* WEBINARS */}
          <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-white border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-700">Upcoming Webinars, Seminars, and Workshops</h3>
                <Link to="/webinars" className="text-sm text-indigo-600 font-medium hover:underline">View All</Link>
              </div>
            </div>
            <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto no-scrollbar">
              {webinars.slice(0, 4).map((w) => (
                <CompactRow key={w._id} type="webinar" title={w.title} meta={`${w.date} • ${w.time}`}
                  onClick={() => w.registrationLink && window.open(w.registrationLink, "_blank")} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <WebinarModal webinar={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
