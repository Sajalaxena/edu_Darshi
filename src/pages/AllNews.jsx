// src/pages/AllNews.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function normalizeLink(url) {
  if (!url) return null;
  return url.startsWith("http") ? url : `https://${url}`;
}

export default function AllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${API_BASE}/research-news`);
        const json = await res.json();
        setNews(json.data || []);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading news…</div>;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        style={{ color: "var(--brand, #2563EB)" }}
      >
        Competitive Exams, Postdocs & Jobs Updates
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {news.map((n) => (
          <motion.article
            key={n._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* TYPE BADGE */}
            {n.type && (
              <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold
                bg-indigo-100 text-indigo-700">
                {n.type.toUpperCase()}
              </span>
            )}

            {/* TITLE */}
            <h3 className="font-semibold text-slate-900 leading-snug">
              {n.title}
            </h3>

            {/* META */}
            <div className="mt-1 text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                📅 Posted:{" "}
                <strong className="text-slate-600">
                  {n.publishedDate}
                </strong>
              </span>

              {n.source && (
                <span>
                  ⏳ Deadline:{" "}
                  <strong className="text-rose-600">
                    {n.source}
                  </strong>
                </span>
              )}
            </div>

            {/* SUMMARY */}
            {n.summary && (
              <p className="mt-3 text-sm text-slate-700 line-clamp-3">
                {n.summary}
              </p>
            )}

            {/* LINK */}
            {n.externalLink && (
              <div className="mt-4">
                <a
                  href={normalizeLink(n.externalLink)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  More Details →
                </a>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
