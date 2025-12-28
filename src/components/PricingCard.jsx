import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Crown, RocketLaunch } from "phosphor-react"; // MODERN ICONS

const plans = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    icon: <Star size={36} weight="fill" className="text-blue-500" />,
    gradient: "linear-gradient(135deg,#E0F2FE,#F0F9FF)", // Light blue modern
    short: ["Basic Papers", "Limited Access", "Community Support"],
    front: [
      "Access to EduDarshi webinars (live + selected recordings)",
      "Limited solutions for recent and past exams",
      "Weekly alerts on national-level exams, workshops, internships, and jobs",
      "Starter study resources (limited)",
      "Basic community access",
    ],
  },
  {
    id: "premium",
    name: "Basic Plan",
    price: "₹499",
    icon: <Crown size={36} weight="fill" className="text-purple-500" />,
    gradient: "linear-gradient(135deg,#F3E8FF,#EDE9FE)", // Soft purple
    short: ["Full Access", "1-on-1 Mentorship", "All PDFs"],
    front: [
      "Unlimited webinars + exclusive workshops and curated internships",
      "Complete solutions library for recent and past exams",
      "Personalized weekly alerts",
      "Focused notes & preparation guides",
      "Adaptive mock tests with analytics",
    ],
  },
  {
    id: "elite",
    name: "Personalised Plan",
    price: "₹999",
    icon: <RocketLaunch size={36} weight="fill" className="text-green-500" />,
    gradient: "linear-gradient(135deg,#DCFCE7,#ECFDF5)", // Soft green
    short: ["All Premium Features", "Dedicated Mentor", "Priority Support"],
    front: [
      "All-access webinars, exclusive workshops, curated internships",
      "On-demand expert discussions",
      "1:1 application/document guidance",
      "Dedicated mentor + priority doubt support",
      "Career portfolio development",
    ],
  },
];

export default function PricingSection() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="my-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Our Services
      </h2>

      <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {plans.map((p, i) => {
          const isFlipped = flippedIndex === i;

          return (
            <div
              key={p.id}
              className={`flip-card ${isFlipped ? "flipped" : ""}`}
              onClick={() => setFlippedIndex(isFlipped ? null : i)}
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              style={{ width: 320 }}
            >
              <div className="flip-card-inner">
                {/* -------- FRONT -------- */}
                <div
                  className="flip-card-front card flex flex-col justify-center items-center p-6 shadow-lg border"
                  style={{
                    background: p.gradient,
                    borderRadius: 20,
                  }}
                >
                  <div className="mb-3">{p.icon}</div>

                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="text-3xl text-blue-600 font-semibold mt-2">
                    {p.price}
                  </div>

                  <ul className="mt-4 text-sm text-slate-700 space-y-1 text-left w-full">
                    {p.short.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>

                  <div className="mt-6 text-sm text-slate-500 font-medium">
                    Tap for details
                  </div>
                </div>

                {/* -------- BACK -------- */}
                <div
                  className="flip-card-back flex flex-col justify-between p-6"
                  style={{
                    background: "linear-gradient(135deg,#3B82F6,#1E40AF)",
                    color: "white",
                    borderRadius: 20,
                  }}
                >
                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      {p.name} — Highlights
                    </h4>

                    <ul className="text-white/90 text-sm list-disc pl-5 space-y-2">
                      {p.front.slice(0, 4).map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex justify-between">
                    <button
                      className="px-4 py-2 bg-white text-blue-700 rounded-md font-semibold shadow"
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
                        setFlippedIndex(null);
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
