// src/components/FAQ.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CaretDown } from "phosphor-react";

const faqs = [
  {
    id: "f1",
    q: "How do I connect with mentors?",
    a: "Browse the mentors section, open any mentor profile and request a session — you can pick 1:1 or group mentorship depending on availability.",
  },
  {
    id: "f2",
    q: "Is there a refund policy?",
    a: "Yes — refunds are available within 7 days of purchase for single-session purchases (terms and exceptions apply). For subscriptions please read the subscription T&Cs or contact support.",
  },
  {
    id: "f3",
    q: "Are previous year papers updated?",
    a: "Absolutely — our repository is updated every year. We curate official past papers and add worked solutions or model answers where available.",
  },
  {
    id: "f4",
    q: "Want a free demo?",
    a: "We offer free demo sessions. To request one, please fill the Contact Us form (below on the page) and submit your details — we'll reach out to book a short demo tailored to your exam/subject.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section
      className="relative py-20 overflow-hidden
      bg-gradient-to-b from-blue-50 via-indigo-50 to-white"
    >
      {/* soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: "var(--brand)" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openId === f.id;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="rounded-xl overflow-hidden"
              >
                {/* QUESTION */}
                <div
                  className={`flex items-stretch justify-between gap-4 p-5 cursor-pointer
                  transition-all duration-200 bg-white/90 backdrop-blur
                  ${isOpen ? "shadow-lg ring-1 ring-blue-200" : "shadow-sm"}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(f.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggle(f.id);
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "var(--brand-deep)" }}
                    >
                      {f.q}
                    </div>
                    {!isOpen && (
                      <div className="mt-1 text-sm text-slate-500 line-clamp-1">
                        {f.a}
                      </div>
                    )}
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-2 rounded-md bg-blue-50"
                    aria-hidden
                  >
                    <CaretDown
                      size={18}
                      weight="bold"
                      color="var(--brand-deep)"
                    />
                  </motion.span>
                </div>

                {/* ANSWER */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-slate-700 bg-white border-t border-blue-100">
                      <p className="text-sm leading-relaxed">{f.a}</p>

                      {f.id === "f4" && (
                        <div className="mt-4 flex items-center gap-3">
                          <a
                            href="#contact"
                            className="inline-block text-sm font-semibold px-5 py-2 rounded-lg text-white"
                            style={{
                              background:
                                "linear-gradient(90deg,var(--brand),var(--brand-deep))",
                              boxShadow: "0 10px 30px rgba(37,99,235,0.2)",
                            }}
                          >
                            Request Free Demo
                          </a>
                          <span className="text-sm text-slate-500">
                            or email{" "}
                            <a
                              href="mailto:hello@edudarshi.example"
                              className="underline"
                            >
                              hello@edudarshi.example
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
