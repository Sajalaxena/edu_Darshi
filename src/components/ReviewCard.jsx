// src/components/ReviewsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Star } from "phosphor-react";

/**
 * Modern Student Reviews section
 * - uses small avatar (image or initials)
 * - shows name, short role/exam, date & verified badge
 * - humanized review text
 * - clear rating with filled/outline stars (phosphor)
 */

const reviews = [
  {
    name: "Aman Singh",
    role: "NEET - 2024 (Ranked Top 1200)",
    date: "Apr 2024",
    text:
      "Mentors at EduDarshi broke down tough NEET problems into simple steps. Weekly mocks and timely feedback helped me improve edges I didn't even know I had. Highly recommended.",
    rating: 5,
    avatar: null, // use null to show initials
  },
  {
    name: "Riya Patel",
    role: "JEE Advanced Aspirant - Top Ranker",
    date: "Feb 2024",
    text:
      "Structured guidance and a clear study roadmap — the doubt sessions were short and laser-focused. The mentors gave practical tips for exam writing and time management.",
    rating: 4,
    avatar: null,
  },
  {
    name: "Vikram Joshi",
    role: "B.Sc Entrance - Cleared",
    date: "Dec 2023",
    text:
      "Very good practice papers and solution walkthroughs. The mentor's feedback on my approach helped me improve accuracy under time pressure.",
    rating: 5,
    avatar: null,
  },
];

function Avatar({ name, src, size = 56 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="rounded-full grid place-items-center font-semibold text-white"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, rgba(17,89,255,0.95), rgba(6,182,212,0.85))",
        boxShadow: "0 6px 20px rgba(17,89,255,0.10)",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function Stars({ value = 5, size = 14 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={size}
        weight={i <= value ? "fill" : "regular"}
        color="#FBBF24"
        style={{ marginRight: 4 }}
        aria-hidden
      />
    );
  }
  return <div className="flex items-center">{stars}</div>;
}

export default function ReviewsSection() {
  return (
    <section className="my-12 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-8 text-center"
        style={{ color: "var(--brand)" }}
      >
        Student Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.article
            key={r.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.36 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200"
            aria-label={`Review by ${r.name}`}
          >
            {/* small colorful header bar */}
           <div
  className="p-4 flex gap-4 items-center"
  style={{
background: "#e3f2fd",
    minHeight: "150px",   // ⭐ Keeps all header heights equal
        borderBottom: "1px solid #dce9f9",

  }}
>
  {/* <Avatar name={r.name} src={r.avatar} /> */}

  <div className="flex-1 flex flex-col justify-center">
    <div className="text-base font-semibold" style={{ color: "var(--brand-deep)" }}>
      {r.name}
    </div>
    <div className="text-sm text-slate-500 leading-tight">{r.role}</div>
  </div>

  <div style={{ textAlign: "right", minWidth: 84 }}>
    <div className="text-sm font-semibold" style={{ color: "var(--brand)" }}>
      {r.date}
    </div>
    <div className="text-xs text-slate-400">Verified</div>
  </div>
</div>


            {/* body */}
            <div className="p-5">
              <div className="text-slate-700 italic text-sm leading-relaxed" style={{ minHeight: 72 }}>
                “{r.text}”
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stars value={r.rating} />
                  <div className="text-sm text-slate-500">({r.rating}.0)</div>
                </div>

                <div className="text-sm">
                  <button
                    className="text-xs font-semibold px-3 py-1 rounded-md"
                    style={{
                      background: "linear-gradient(90deg,var(--brand),var(--brand-deep))",
                      color: "white",
                      boxShadow: "0 8px 22px rgba(17,89,255,0.12)",
                    }}
                    onClick={() => {
                      // placeholder: open review detail or CTA
                      alert(`Thanks for your interest — this would open ${r.name}'s full review.`);
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
