import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WebinarModal from "./WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ---------------- ROW ---------------- */

function CompactRow({ type, title, meta, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="w-full flex items-start gap-4 p-4 rounded-xl
                 bg-white hover:bg-blue-50/60
                 border border-slate-100
                 shadow-sm hover:shadow-md
                 transition text-left"
    >
      {/* Badge */}
      <div
        className={`min-w-[42px] h-[42px] rounded-lg flex items-center justify-center
          text-xs font-semibold
          ${
            type === "news"
              ? "bg-blue-100 text-blue-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
      >
        {type === "news" ? "NEWS" : "LIVE"}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="font-medium text-slate-900 text-sm leading-snug line-clamp-2">
          {title}
        </div>
        <div className="text-xs text-slate-500 mt-1">{meta}</div>
      </div>

      <div className="text-slate-400 text-sm mt-1">›</div>
    </motion.button>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function NewsWebinarsCompact() {
  const [news, setNews] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [open, setOpen] = useState(null);

  /* -------- FETCH DATA -------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const [newsRes, webinarRes] = await Promise.all([
          fetch(`${API_BASE}/research-news`),
          fetch(`${API_BASE}/webinars`),
        ]);

        const newsJson = await newsRes.json();
        const webinarJson = await webinarRes.json();

        setNews(newsJson.data || []);
        setWebinars(webinarJson.data || []);
      } catch (err) {
        console.error("Failed to load news/webinars", err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="container mx-auto px-6 my-12">
        <div className="grid md:grid-cols-2 gap-8">

          {/* ---------------- NEWS ---------------- */}
          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <div className="relative px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">
                  Research & News
                </h3>
                <Link
                  to="/news"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Show more
                </Link>
              </div>
            </div>

            <div
              className="space-y-3 no-scrollbar"
              style={{ maxHeight: 360, overflowY: "auto", padding: 12 }}
            >
              {news.slice(0, 4).map((n) => (
                <CompactRow
                  key={n._id}
                  type="news"
                  title={n.title}
                  meta={`${n.source} • ${n.publishedDate}`}
                  onClick={() =>
                    n.externalLink && window.open(n.externalLink, "_blank")
                  }
                />
              ))}
            </div>
          </div>

          {/* ---------------- WEBINARS ---------------- */}
          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <div className="relative px-6 py-4 border-b bg-gradient-to-r from-indigo-50 to-white">
              <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">
                  Upcoming Webinars
                </h3>
                <Link
                  to="/webinars"
                  className="text-sm text-indigo-600 font-medium hover:underline"
                >
                  Show more
                </Link>
              </div>
            </div>

            <div
              className="space-y-3 no-scrollbar"
              style={{ maxHeight: 360, overflowY: "auto", padding: 12 }}
            >
              {webinars.slice(0, 4).map((w) => (
                <CompactRow
                  key={w._id}
                  type="webinar"
                  title={w.title}
                  meta={`${w.date} • ${w.time}`}
                  onClick={() => setOpen(w)}
                />
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
