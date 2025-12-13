// src/pages/PlanDetails.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Crown, RocketLaunch, CheckCircle, XCircle } from "phosphor-react";
import BackgroundFXPlans from "../components/BackgroundFXPlans";

/* All features */
const ALL_FEATURES = [
  "Webinars (live + recordings)",
  "Solutions Repository",
  "Weekly Opportunity Alerts",
  "Starter Study Resources",
  "Community Access",
  "Exclusive Workshops",
  "Internship Opportunities",
  "Complete Solutions Library",
  "Personalized Alerts",
  "Preparation Guides",
  "Adaptive Mock Tests",
  "Dedicated Mentor",
  "Career Portfolio Support",
  "Interview Preparation",
];

/* Plans data */
const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    includes: [
      "Webinars (live + recordings)",
      "Solutions Repository",
      "Weekly Opportunity Alerts",
      "Starter Study Resources",
      "Community Access",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    includes: [
      "Webinars (live + recordings)",
      "Solutions Repository",
      "Weekly Opportunity Alerts",
      "Starter Study Resources",
      "Community Access",
      "Exclusive Workshops",
      "Internship Opportunities",
      "Complete Solutions Library",
      "Personalized Alerts",
      "Preparation Guides",
      "Adaptive Mock Tests",
    ],
  },
  {
    id: "elite",
    name: "Elite Plan",
    includes: [
      "Webinars (live + recordings)",
      "Solutions Repository",
      "Weekly Opportunity Alerts",
      "Starter Study Resources",
      "Community Access",
      "Exclusive Workshops",
      "Internship Opportunities",
      "Complete Solutions Library",
      "Personalized Alerts",
      "Preparation Guides",
      "Adaptive Mock Tests",
      "Dedicated Mentor",
      "Career Portfolio Support",
      "Interview Preparation",
    ],
  },
];

/* Icons + prices */
const VISUALS = {
  free: {
    accent: "#3B82F6",
    price: "₹0",
    icon: <Star size={32} weight="duotone" />,
  },
  premium: {
    accent: "#A855F7",
    price: "₹499",
    icon: <Crown size={32} weight="duotone" />,
  },
  elite: {
    accent: "#10B981",
    price: "₹999",
    icon: <RocketLaunch size={32} weight="duotone" />,
  },
};

export default function PlanDetails() {
  const { id: paramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedId =
    paramId || (location.state && location.state.selected) || null;

  const refs = useRef({});
  PLANS.forEach((p) => {
    refs.current[p.id] = refs.current[p.id] || React.createRef();
  });

  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (!selectedId) return;
    const el = refs.current[selectedId].current;
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedId(selectedId);
        setTimeout(() => setHighlightedId(null), 2000);
      }, 150);
    }
  }, [selectedId]);

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfPLACEHOLDER/viewform";

  return (
<div className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Background Animation */}
      <BackgroundFXPlans />

      {/* Content */}
      <section className="relative z-10 container mx-auto px-6 py-12 bg-transparent">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-slate-300 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-4">
          Our Plans — Full Details
        </h1>
        <p className="text-slate-300 mb-8">
          Browse all subscription plans below. Click a plan to highlight it.
        </p>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((p) => {
            const visual = VISUALS[p.id];
            const isHighlighted =
              highlightedId === p.id || selectedId === p.id;

            return (
              <article
                key={p.id}
                ref={refs.current[p.id]}
                onClick={() => setHighlightedId(p.id)}
                className={`rounded-3xl p-8 backdrop-blur-2xl 
                  bg-white/10 border border-white/20 
                  shadow-[0_0_35px_rgba(0,0,0,0.25)]
                  transition duration-300 cursor-pointer
                  ${
                    isHighlighted
                      ? "scale-[1.04] ring-2 ring-indigo-400 shadow-xl"
                      : "hover:scale-[1.03]"
                  }
                `}
              >
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-2xl grid place-items-center mb-4"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(20px)",
                      color: visual.accent,
                    }}
                  >
                    {visual.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {p.name}
                  </h3>

                  <p
                    className="text-3xl font-extrabold mt-2"
                    style={{ color: visual.accent }}
                  >
                    {visual.price}
                  </p>
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  {ALL_FEATURES.map((feature) => {
                    const included = p.includes.includes(feature);
                    return (
                      <li
                        key={feature}
                        className="flex items-center gap-3"
                      >
                        {included ? (
                          <CheckCircle size={20} color="#22c55e" />
                        ) : (
                          <XCircle size={20} color="#ef4444" />
                        )}
                        <span
                          className={
                            included ? "" : "opacity-50 line-through"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Buy Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(GOOGLE_FORM_URL, "_blank");
                  }}
                  className="mt-6 w-full py-3 rounded-xl font-semibold 
                             text-white bg-indigo-600/80 hover:bg-indigo-700 
                             transition"
                >
                  Buy Now
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
