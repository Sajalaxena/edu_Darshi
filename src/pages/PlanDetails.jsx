// src/pages/PlanDetails.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Crown, RocketLaunch, CheckCircle, XCircle } from "phosphor-react";

/* All features (master list) */
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

/* Which features each plan includes */
const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    tagline: "Foundation features to get started at zero cost",
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
    tagline: "Free features +   Major upgrades",
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
    tagline: "Concierge-level, full preparation & placement support",
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

/* Visual metadata */
const VISUALS = {
  free: {
    gradient: "linear-gradient(135deg,#E8F8FF,#F6FCFF)",
    accent: "#0EA5E9",
    icon: <Star size={28} weight="duotone" />,
    price: "₹0",
  },
  premium: {
    gradient: "linear-gradient(135deg,#F7F0FF,#FBF7FF)",
    accent: "#7C3AED",
    icon: <Crown size={28} weight="duotone" />,
    price: "₹499",
  },
  elite: {
    gradient: "linear-gradient(135deg,#E8FFF1,#F7FFFA)",
    accent: "#10B981",
    icon: <RocketLaunch size={28} weight="duotone" />,
    price: "₹999",
  },
};

export default function PlanDetails() {
  const { id: paramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedId =
    paramId || (location && location.state && location.state.selected) || null;

  const refs = useRef({});
  PLANS.forEach((p) => {
    refs.current[p.id] = refs.current[p.id] || React.createRef();
  });

  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (!selectedId) return;
    const elRef = refs.current[selectedId];
    if (!elRef || !elRef.current) return;

    const t = setTimeout(() => {
      elRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(selectedId);
      const r = setTimeout(() => setHighlightedId(null), 2200);
      return () => clearTimeout(r);
    }, 120);
    return () => clearTimeout(t);
  }, [selectedId]);

  function handleCardClick(planId) {
    const elRef = refs.current[planId];
    if (elRef && elRef.current) {
      elRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setHighlightedId(planId);
    setTimeout(() => setHighlightedId(null), 2200);
  }

  // Replace with your real Google Form if you have one
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfPLACEHOLDER/viewform";

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-slate-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--brand)" }}>
          Our Plans — Full Details
        </h1>

        <p className="text-slate-700 mb-8">
          Browse all subscription plans below. The plan you selected is highlighted.
        </p>

        {/* grid of cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PLANS.map((p) => {
            const visual = VISUALS[p.id] || VISUALS.free;
            const isHighlighted = highlightedId === p.id || selectedId === p.id;

            return (
              <article
                key={p.id}
                id={`plan-${p.id}`}
                ref={refs.current[p.id]}
                onClick={() => handleCardClick(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(p.id);
                }}
                className={`rounded-xl overflow-hidden transition-transform duration-300 focus:outline-none ${
                  isHighlighted ? "ring-4 ring-blue-200 scale-[1.01]" : "hover:-translate-y-1"
                }`}
                style={{
                  boxShadow: isHighlighted
                    ? "0 18px 50px rgba(14,165,233,0.10)"
                    : "0 8px 24px rgba(2,6,23,0.04)",
                  background: "white",
                }}
              >
                {/* HEADER - fixed height and vertically centered */}
                <div
                  className="p-5 flex items-center gap-4"
                  style={{
                    background: visual.gradient,
                    minHeight: 170, // <- fixed header height so all match
                    alignItems: "center",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl grid place-items-center text-white"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 -6px 14px rgba(255,255,255,0.06)",
                      color: visual.accent,
                    }}
                    aria-hidden
                  >
                    {visual.icon}
                  </div>

                  <div className="flex-1 pr-4">
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-sm text-slate-700 mt-1">{p.tagline}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold" style={{ color: visual.accent }}>
                      {visual.price}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">/month</div>
                  </div>
                </div>

                {/* BODY */}
                <div className="bg-white p-5 border-t border-slate-100">
                  <ul className="space-y-3 mt-2">
                    {ALL_FEATURES.map((feature) => {
                      const included = p.includes.includes(feature);
                      return (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          {included ? (
                            <CheckCircle size={20} color="#10B981" weight="duotone" />
                          ) : (
                            <XCircle size={20} color="#EF4444" weight="duotone" />
                          )}

                          <span className={included ? "text-gray-800" : "text-gray-400 line-through"}>
                            {feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // open Google Form in new tab and optionally prefill plan via query params
                        const url = `${GOOGLE_FORM_URL}?usp=pp_url&entry.XXXXX=${encodeURIComponent(
                          p.id
                        )}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="btn-primary"
                      aria-label={`Buy ${p.name}`}
                      style={{ minWidth: 160 }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* optional expanded details removed per your request */}
      </div>
    </section>
  );
}
