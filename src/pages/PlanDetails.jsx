import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Crown,
  RocketLaunch,
  CheckCircle,
  XCircle,
} from "phosphor-react";

/* ---------- DATA ---------- */

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
  "Weekly Doubt Sessions",
];

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    description: "Best for beginners",
    includes: ALL_FEATURES.slice(0, 5),
    details: [
      "Access to EduDarshi webinars (live + selected recordings)",
      "Limited solutions for recent and past exams",
      "Weekly alerts for national-level exams, workshops, and jobs",
      "Starter study resources: sample notes, practice questions",
      "Basic community access (read-only discussions)",
    ],
  },
  {
    id: "premium",
    name: "Basic Plan",
    description: "For serious aspirants",
    includes: ALL_FEATURES.slice(0, 11),
    details: [
      "Unlimited webinars and exclusive expert workshops",
      "Complete solutions library for past and recent exams",
      "Personalized weekly alerts by subject and interest",
      "Focused preparation guides and limited lecture notes",
      "Adaptive mock tests with performance analytics",
      "Priority mentor support and group doubt sessions",
    ],
  },
  {
    id: "elite",
    name: "Personalised Plan",
    description: "Top-tier mentorship & career guidance",
    includes: ALL_FEATURES,
    details: [
      "All-access webinars and exclusive workshops with recordings",
      "On-demand expert discussions on complex solutions",
      "Hyper-personalized alerts with 1:1 application guidance",
      "Unlimited mocks, interview preparation, and simulations",
      "Dedicated mentor for the entire subscription period",
      "Priority doubt resolution via chat and scheduled calls",
      "Career portfolio support: CV, SOP, LOR reviews",
      "Placement and scholarship support with referrals",
    ],
  },
];

const VISUALS = {
  free: {
    price: "₹0",
    accent: "text-blue-600",
    icon: <Star size={28} weight="duotone" />,
    duration: "6 Months",
    perSession: "Free",
  },
  premium: {
    price: "₹499",
    accent: "text-indigo-600",
    icon: <Crown size={28} weight="duotone" />,
    duration: "6 Months",
    perSession: "≈ ₹3 / day", // 499 / 48
  },
  elite: {
    price: "₹999",
    accent: "text-emerald-600",
    icon: <RocketLaunch size={28} weight="duotone" />,
    duration: "6 Months",
    perSession: "≈ ₹6 / day", // 999 / 72
  },
};

/* ---------- COMPONENT ---------- */

export default function PlanDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedFromNav = id || location.state?.selected || null;
  const [activePlan, setActivePlan] = useState(selectedFromNav);

  const refs = useRef({});

  useEffect(() => {
    if (activePlan && refs.current[activePlan]) {
      refs.current[activePlan].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activePlan]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <section className="container mx-auto px-6 py-14">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-600 hover:underline"
        >
          ← Back
        </button>

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Our Plans — Full Details
        </h1>
        <p className="text-slate-600 mb-10">
          Choose the plan that best fits your preparation journey.
        </p>

        {/* PLANS GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {PLANS.map((plan) => {
            const visual = VISUALS[plan.id];
            const active = activePlan === plan.id;

            return (
              <article
                key={plan.id}
                ref={(el) => (refs.current[plan.id] = el)}
                onClick={() => setActivePlan(plan.id)}
                className={`cursor-pointer rounded-2xl p-7 bg-white border transition
                  ${
                    active
                      ? "border-indigo-400 ring-2 ring-indigo-200 scale-[1.02]"
                      : "border-blue-100 hover:shadow-md"
                  }`}
              >
                {/* HEADER */}
                <div className="text-center">
                  <div
                    className={`mx-auto mb-3 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center ${visual.accent}`}
                  >
                    {visual.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {plan.name}
                  </h3>

                  <p className={`mt-1 text-3xl font-bold ${visual.accent}`}>
                    {visual.price}
                  </p>

                  <div className="mt-2 text-xs text-slate-500 space-y-0.5">
                    <div>
                      <span className="font-medium">Duration:</span>{" "}
                      {visual.duration}
                    </div>
                    <div>
                      <span className="font-medium">Per Session:</span>{" "}
                      <span className="text-slate-700">
                        {visual.perSession}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FEATURES */}
                <ul className="mt-6 space-y-2 text-sm">
                  {ALL_FEATURES.map((feature) => {
                    const included = plan.includes.includes(feature);
                    return (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 ${
                          included
                            ? "text-slate-700"
                            : "text-slate-400 line-through"
                        }`}
                      >
                        {included ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <XCircle size={18} className="text-red-400" />
                        )}
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        {/* BRIEF DESCRIPTION */}
        {activePlan && (
          <div className="mt-14 max-w-3xl mx-auto bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              {PLANS.find((p) => p.id === activePlan).name}
            </h3>

            <p className="text-sm text-slate-500 mb-4">
              {PLANS.find((p) => p.id === activePlan).description}
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              {PLANS.find((p) => p.id === activePlan).details.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500 mt-[2px]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSfPLACEHOLDER/viewform",
                  "_blank"
                )
              }
              className="mt-6 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              Proceed to Register
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
