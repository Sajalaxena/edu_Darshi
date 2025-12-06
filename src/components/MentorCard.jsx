import React from "react";
import { motion } from "framer-motion";
import m1 from "../assets/mentor1.jpg";
import m2 from "../assets/mentor2.jpg";
import m3 from "../assets/mentor1.jpg";

/**
 * Split a raw qualification string into sensible lines.
 * Splits on comma, semicolon, and various dashes, then trims.
 */
function parseQualifications(raw = "") {
  return raw
    .split(/[;,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function MentorCard({ mentor }) {
  const quals = parseQualifications(mentor.qualification);

  return (
    <article
      className="card p-6 flex flex-col items-center text-center max-w-sm mx-auto"
      aria-labelledby={`mentor-${mentor.name}`}
    >
      <img
        src={mentor.img}
        alt={mentor.name}
        className="w-28 h-28 rounded-full object-cover shadow"
      />

      <h4 id={`mentor-${mentor.name}`} className="mt-4 font-medium text-lg">
        {mentor.name}
      </h4>

      {/* Render each qualification on its own line */}
      <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 space-y-1 leading-snug">
        {quals.map((q, idx) => (
          <div
            key={idx}
            className="break-words"
            title={q}
            style={{ maxWidth: "20rem" }}
          >
            {q}
          </div>
        ))}
      </div>

      {/* <button
        className="mt-6 btn-secondary"
        aria-label={`View profile of ${mentor.name}`}
      >
        View Profile
      </button> */}
    </article>
  );
}

const mentors = [
  {
    name: "Dr. Gyan",
    qualification:
      "Ph.D (Mathematics) IIT Delhi, National Postdoctoral Fellow IISC Bengaluru",
    img: m1,
  },
  {
    name: "Sajal Saxena",
    qualification: "MCA NIT PATNA , GEN AI IIT Mandi",
    img: m2,
  },
  { name: "Kavita Sonkar", qualification: "M.Tech, IIT Madras", img: m3 },
];

export default function MentorsSection() {
  return (
    <section id="mentors" className="my-12 container mx-auto px-6">
      <h2
        className="text-3xl font-bold text-center"
        style={{ color: "var(--brand)" }}
      >
        Our Top Mentors
      </h2>

      <div className="grid gap-8 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <MentorCard mentor={m} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
