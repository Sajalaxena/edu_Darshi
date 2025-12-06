import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aman Singh",
    text: "The mentors are incredible! Helped me crack NEET.",
    rating: 5,
  },
  {
    name: "Riya Patel",
    text: "Guidance was top notch and structured.",
    rating: 4,
  },
  {
    name: "Vikram Joshi",
    text: "Great content and real practice papers.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="my-12 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: "var(--brand)" }}
      >
        Student Reviews
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="card p-6"
          >
            <p className="italic text-slate-600 dark:text-slate-300">
              “{r.text}”
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-yellow-400">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
