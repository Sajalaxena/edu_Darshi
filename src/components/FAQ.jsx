// src/components/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "phosphor-react";

const faqs = [
  {
    id: 1,
    q: "How do I connect with mentors?",
    a: "Browse the mentors section, open any mentor profile and request a session — you can pick 1:1 or group mentorship depending on availability.",
  },
  {
    id: 2,
    q: "Is there a refund policy?",
    a: "Yes — refunds are available within 7 days of purchase for single-session purchases (terms and exceptions apply). For subscriptions please read the subscription T&Cs or contact support.",
  },
  {
    id: 3,
    q: "Are previous year papers updated?",
    a: "Absolutely — our repository is updated every year. We curate official past papers and add worked solutions or model answers where available.",
  },
  {
    id: 4,
    q: "Want a free demo?",
    a: "We offer free demo sessions. To request one, please fill the Contact Us form (below on the page) and submit your details — we'll reach out to book a short demo tailored to your exam/subject.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Got questions? We've got answers
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    isOpen ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                  >
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}>
                      {faq.id}
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {faq.q}
                      </h3>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        isOpen ? "bg-blue-100" : "bg-slate-100"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={20} weight="bold" className="text-blue-600" />
                      ) : (
                        <Plus size={20} weight="bold" className="text-slate-600" />
                      )}
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                          <div className="pl-14 border-l-2 border-blue-200">
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-4">
                              {faq.a}
                            </p>
                            
                            {faq.id === 4 && (
                              <div className="mt-4 pl-4">
                                <a
                                  href="#contact"
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                  Request Free Demo
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
