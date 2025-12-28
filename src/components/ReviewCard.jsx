import React from "react";
import { motion } from "framer-motion";
import { Star } from "phosphor-react";

/* ---------------- DATA ---------------- */

const reviews = [
  {
    name: "Aman Singh",
    role: "IIT-JAM Mathematics | PhD Aspirant",
    date: "Apr 2024",
    text: "I prepared for IIT-JAM Mathematics with EduDarshi mentors. The problem-solving approach, weekly mock analysis, and clear strategy for high-weight topics helped me improve accuracy and speed. The guidance also helped me plan my PhD applications with confidence.",
    rating: 5,
  },
  {
    name: "Riya Patel",
    role: "CSIR-NET/JRF Qualified | Research Aspirant",
    date: "Feb 2024",
    text: "The NET/JRF preparation was very structured. Concept-wise tests, doubt-focused sessions, and mentor feedback on answer presentation made a big difference. I also received guidance on choosing research areas and shortlisting institutes for PhD.",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    role: "PhD Admission (India & Abroad) | Postdoc Aspirant",
    date: "Jan 2024",
    text: "Beyond exam preparation, EduDarshi mentors helped me with SOP writing, CV structuring, and interview preparation for PhD admissions. The one-to-one feedback on my research proposal and mock interviews was extremely valuable.",
    rating: 5,
  },
];

/* ---------------- HELPERS ---------------- */

function Stars({ value }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          weight={i <= value ? "fill" : "regular"}
          color="#FBBF24"
          className="mr-1"
        />
      ))}
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function ReviewsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden isolate">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[380px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-14"
          style={{ color: "var(--brand)" }}
        >
          Student Reviews
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
            >
              {/* CARD HEADER */}
              <div
                className="relative p-5 flex items-center justify-between"
                style={{
                  minHeight: "140px",
                  background:
                    "linear-gradient(135deg, rgba(219,234,254,0.95), rgba(199,210,254,0.9))",
                  borderBottom: "1px solid rgba(99,102,241,0.15)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)",
                  }}
                />

                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ color: "var(--brand-deep)" }}
                  >
                    {r.name}
                  </div>
                  <div className="text-sm text-slate-600">{r.role}</div>
                </div>

                <div className="text-right">
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--brand)" }}
                  >
                    {r.date}
                  </div>
                  <div className="text-xs text-slate-400">Verified</div>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="p-5 flex flex-col flex-1">
                {/* Fixed-height text */}
                <p className="italic text-slate-700 text-sm leading-relaxed min-h-[140px]">
                  “{r.text}”
                </p>

                {/* Footer pinned */}
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Stars value={r.rating} />
                    <span className="text-sm text-slate-500">
                      ({r.rating}.0)
                    </span>
                  </div>

                  <button
                    className="text-xs font-semibold px-4 py-1.5 rounded-md text-white shadow"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--brand), var(--brand-deep))",
                      boxShadow: "0 8px 22px rgba(37,99,235,0.18)",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
