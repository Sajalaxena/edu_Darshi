// src/components/PricingSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Keeps the flip-on-click behavior.
 * Adds a "Details" button on the back that navigates to /plans/:id
 */

const plans = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    front: [
      "Access to EduDarshi webinars (live + selected recordings)",
      "Limited solutions for recent and past exams",
      "Weekly alerts on national-level exams, workshops, internships, and jobs",
      "Starter study resources (limited)",
      "Basic community access (browse discussions and mentor highlights)",
    ],
    short: ["Basic Papers", "Limited Access", "Community Support"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹499",
    front: [
      "Unlimited webinars + exclusive workshops and curated internships",
      "Complete solutions library for recent and past exams",
      "Personalized weekly alerts (by subject/interest)",
      "Focused notes & preparation guides",
      "Adaptive mock tests with analytics",
    ],
    short: ["Full Access", "1-on-1 Mentorship", "All PDFs"],
  },
  {
    id: "elite",
    name: "Elite Plan",
    price: "₹999",
    front: [
      "All-access webinars, exclusive workshops, curated internships, recordings",
      "Complete solutions library with on-demand expert discussions",
      "Hyper-personalized alerts + 1:1 application & document guidance",
      "Dedicated mentor, priority doubt resolution",
      "Career portfolio development & placement support",
    ],
    short: ["All Premium Features", "Dedicated Mentor", "Priority Support"],
  },
];

export default function PricingSection() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const navigate = useNavigate();

  function toggleFlip(i) {
    setFlippedIndex((cur) => (cur === i ? null : i));
  }

  return (
    <section className="my-16 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold text-center mb-10"
        style={{ color: "var(--brand)" }}
      >
        Our Plans
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {plans.map((p, i) => {
          const isFlipped = flippedIndex === i;
          return (
            <div
              key={p.id}
              className={`flip-card ${isFlipped ? "flipped" : ""}`}
              onClick={() => toggleFlip(i)}
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleFlip(i);
              }}
              style={{ width: 300 }}
            >
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front card flex flex-col justify-center items-center p-6">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="text-2xl text-blue-600 mt-2">{p.price}</div>
                  <ul className="mt-4 text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    {p.short.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-slate-400">
                    Tap for details
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="flip-card-back flex flex-col justify-between items-center p-6"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--brand),var(--brand-deep))",
                    minHeight: 220,
                  }}
                >
                  <div className="w-full text-left">
                    <h4 className="font-semibold text-white mb-2">
                      {p.name} — Highlights
                    </h4>
                    <ul className="text-white/90 text-sm mb-4 list-disc pl-5 space-y-1">
                      {p.front.slice(0, 4).map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <button
                      className="px-4 py-2 bg-white text-blue-700 rounded-md font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/plans/${p.id}`);
                      }}
                    >
                      Details
                    </button>

                    <button
                      className="text-white/90 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedIndex(null); // go back to front
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
