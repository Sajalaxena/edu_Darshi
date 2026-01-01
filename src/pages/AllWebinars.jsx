import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WebinarModal from "../components/WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AllWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/research-news`)
      .then((r) => r.json())
      .then((j) => setWebinars(j.data || []));
  }, []);

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">All Webinars & Events</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {webinars.map((w) => (
          <motion.div
            key={w._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="font-medium">{w.title}</div>
            <div className="text-sm text-slate-500">
              {w.date} • {w.time} • {w.platform}
            </div>

            {w.description && (
              <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                {w.description}
              </p>
            )}

            <div className="mt-3 flex gap-4">
              <button
                onClick={() => setOpen(w)}
                className="text-blue-600 text-sm hover:underline"
              >
                Details
              </button>

              {w.registrationLink && (
                <a
                  href={w.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-500 hover:underline"
                >
                  Register
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {open && <WebinarModal webinar={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
