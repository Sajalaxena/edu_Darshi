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
    a:
      "We offer free demo sessions. To request one, please fill the Contact Us form (below on the page) and submit your details — we'll reach out to book a short demo tailored to your exam/subject.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <section className="my-16 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: "var(--brand)" }}
      >
        FAQ
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, idx) => {
          const isOpen = openId === f.id;
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: idx * 0.06 }}
              className="rounded-xl overflow-hidden"
            >
              <div
                className={`flex items-stretch justify-between gap-4 p-4 cursor-pointer transition-shadow duration-200 ${
                  isOpen ? "shadow-lg ring-1 ring-blue-50" : "shadow-sm"
                }`}
                role="button"
                tabIndex={0}
                onClick={() => toggle(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggle(f.id);
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${f.id}`}
                style={{
                  background: isOpen
                    ? "linear-gradient(180deg, rgba(255,255,255,1), rgba(249,250,255,0.95))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,252,255,0.98))",
                }}
              >
                <div className="flex-1">
                  <div className="text-lg font-medium" style={{ color: "var(--brand-deep)" }}>
                    {f.q}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {/* subtle short preview if closed */}
                    {!isOpen ? (
                      <span className="line-clamp-1">
                        {f.a.length > 120 ? f.a.slice(0, 120).trim() + "…" : f.a}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-2 rounded-md bg-white/60"
                    aria-hidden
                  >
                    <CaretDown size={18} weight="bold" color="var(--brand-deep)" />
                  </motion.span>
                </div>
              </div>

              {/* Panel */}
              <motion.div
                id={`faq-panel-${f.id}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: "hidden" }}
              >
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 text-slate-700 bg-white border-t border-slate-100">
                    <p className="text-sm leading-relaxed">{f.a}</p>

                    {/* small helpful CTA for the demo item */}
                    {f.id === "f4" && (
                      <div className="mt-3">
                        <a
                          href="#contact"
                          className="inline-block text-sm font-semibold px-4 py-2 rounded-md"
                          style={{
                            background: "linear-gradient(90deg,var(--brand),var(--brand-deep))",
                            color: "white",
                            boxShadow: "0 8px 28px rgba(17,89,255,0.12)",
                          }}
                        >
                          Fill Contact Form
                        </a>
                        <span className="ml-3 text-sm text-slate-500">
                          or email <a href="mailto:hello@edudarshi.example" className="underline">hello@edudarshi.example</a>
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
    </section>
  );
}
