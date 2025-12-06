import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I connect with mentors?",
    a: "View mentor profiles and request a session from their profile card.",
  },
  {
    q: "Is there a refund policy?",
    a: "Refunds available within 7 days (terms apply).",
  },
  {
    q: "Are previous year papers updated?",
    a: "Yes - we update our repository every year.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="my-16 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: "var(--brand)" }}
      >
        FAQ
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="card p-4"
          >
            <button
              className="w-full text-left flex justify-between items-center font-medium"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <span>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="mt-2 text-slate-600 dark:text-slate-300">{f.a}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
