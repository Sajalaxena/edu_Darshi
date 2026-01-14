// src/pages/AllNews.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
      <h2 className="text-2xl font-semibold mb-6">All Research & News</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {news.map((n) => (
          <motion.article
            key={n._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold">{n.title}</h3>
            <div className="text-sm text-slate-500">
              {n.source} • {n.publishedDate}
            </div>
            <p className="mt-2 text-sm text-slate-700">{n.summary}</p>

            {n.externalLink && (
              <div className="mt-3">
                <a
                  href={n.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline"
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
