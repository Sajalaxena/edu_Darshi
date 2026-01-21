import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WebinarModal from "../components/WebinarModal";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AllWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/webinars`)
      .then((r) => r.json())
      .then((j) => setWebinars(j.data || []));
  }, []);

  return (
    <section className="container mx-auto px-6 py-10">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8"
        style={{ color: "var(--brand, #2563EB)" }}
      >
        Conferences, Seminars & Workshops Updates
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {webinars.map((w) => (
          <motion.div
            key={w._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Title */}
            <div className="font-semibold text-slate-900">{w.title}</div>

            {/* Event info */}
            <div className="text-sm text-slate-500 mt-1">
              • {w.platform}
            </div>

            {/* Registration timing */}
            <div className="mt-3 text-sm space-y-1">
              <div>
                <span className="text-emerald-600 font-medium">
                  Registration Starts:
                </span>{" "}
                <span className="text-slate-600">
 {w.date}                </span>
              </div>

              <div>
                <span className="text-rose-600 font-medium">
                  Deadline:
                </span>{" "}
                <span className="text-slate-600">
 {w.time}                </span>
              </div>
            </div>

            {/* Description */}
            {w.description && (
              <p className="mt-3 text-sm text-slate-700 line-clamp-2">
                {w.description}
              </p>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setOpen(w)}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                View Details
              </button>

              {w.registrationLink && (
                <a
                  href={w.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Register →
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
