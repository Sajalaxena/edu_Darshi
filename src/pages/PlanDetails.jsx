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
  "Adaptive Mock Tests",
  "Interview Practice",
  "Weekly Doubt Sessions",
  "Personalized Weekly Alerts",
  "Dedicated Mentor (1:1)",
  "Profile Build-up Guidance",
  "Internship Opportunities",
  "Complete Solutions Library",
];

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    description: "Get started with essential learning tools",
    includes: [
      "Webinars (live + recordings)",
      "Limited Solutions Library",
      "Previous Year Question Papers",
      "Community Access",
    ],
  },
  {
    id: "premium",
    name: "Basic Plan",
    description: "Structured preparation for serious aspirants",
    includes: [
      "Webinars (live + recordings)",
      "Weekly Alerts",
      "Complete Solutions Library",
      "Starter Study Resources",
      "Adaptive Mock Tests",
      "Interview Practice",
      "Previous Year Question Papers",
    ],
  },
  {
    id: "elite",
    name: "Personalised Plan",
    description: "End-to-end mentorship & career guidance",
    includes: [
      "Webinars (live + recordings)",
      "Starter Study Resources",
      "Adaptive Mock Tests",
      "Dedicated Mentor (1:1)",
      "Interview Practice",
      "Weekly Doubt Sessions",
      "Personalized Weekly Alerts",
      "Profile Build-up Guidance",
      "Internship Opportunities",
      "Complete Solutions Library",
    ],
  },
];

const PLAN_FULL_DETAILS = {
  free: {
    title: "Free Plan",
    subtitle: "Foundation features to explore EduDarshi",
    points: [
      "EduDarshi Webinars (live + selected recordings): Expert-led sessions on exam strategies, subject refreshers, and career pathways.",
      "Limited Solutions Library: Access a curated set of solved questions from previous exams.",
      "Previous Year Question Papers: Explore PYQs to understand exam patterns.",
      "Community Access: Read discussions and mentor-verified answers.",
    ],
  },

  premium: {
    title: "Basic Plan",
    subtitle: "Everything you need for focused exam preparation",
    points: [
      "Webinars (live + recordings) with expert instructors.",
      "Weekly Alerts for exams, internships, and academic opportunities.",
      "Complete Solutions Library for recent and past exams.",
      "Starter Study Resources including notes, formula sheets, and practice sets.",
      "Adaptive Mock Tests to analyze performance and improve accuracy.",
      "Interview Practice sessions to build confidence and clarity.",
    ],
  },

  elite: {
    title: "Personalised Plan",
    subtitle: "High-touch mentorship with career-focused guidance",
    points: [
      "All-access webinars and exclusive workshops with recordings.",
      "Starter Study Resources with structured learning paths.",
      "Advanced Adaptive Mock Tests aligned with your goals.",
      "Dedicated 1:1 Mentor for personalized guidance.",
      "Interview Practice with feedback and improvement plans.",
      "Weekly Doubt Sessions for continuous clarity.",
      "Personalized Weekly Alerts based on your profile.",
      "Profile Build-up Guidance (CV, SOP, academic positioning).",
      "Internship Opportunities with application support.",
      "Complete Solutions Library with in-depth explanations.",
      "Priority Mentor Support with monthly group doubt-clearing sessions. One-to-one Mentorship.",
    ],
  },
};

const VISUALS = {
  free: {
    price: "₹0",
    accent: "text-blue-600",
    icon: <Star size={28} weight="duotone" />,
    duration: "6 Months",
  },
  premium: {
    price: "₹499",
    accent: "text-indigo-600",
    icon: <Crown size={28} weight="duotone" />,
    duration: "6 Months",
  },
  elite: {
    price: "₹999",
    accent: "text-emerald-600",
    icon: <RocketLaunch size={28} weight="duotone" />,
    duration: "6 Months",
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

        {/* HEADER */}
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-8"
          style={{ color: "var(--brand, #2563EB)" }}
        >
          Our Plans — Full Details{" "}
        </h2>

        <p className="text-slate-600 mb-10 text-center">
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

                  {plan.id === "premium" ? (
                    <div className="mt-1">
                      <div className="text-2xl font-bold text-slate-400">
                        ₹499
                      </div>
                      <div
                        className="mt-1 inline-block px-3 py-1 rounded-full
      bg-gradient-to-r from-purple-500 to-pink-500
      text-white text-xs font-semibold shadow"
                      >
                        🎉 Registration FREE till March
                      </div>
                    </div>
                  ) : (
                    <p className={`mt-1 text-3xl font-bold ${visual.accent}`}>
                      {visual.price}
                    </p>
                  )}

                  <div className="mt-2 text-xs text-slate-500 space-y-0.5">
                    <div>
                      <span className="font-medium">Duration:</span>{" "}
                      {visual.duration}
                    </div>
                    {/* <div>
                      <span className="font-medium">Per Session:</span>{" "}
                      <span className="text-slate-700">
                        {visual.perSession}
                      </span>
                    </div> */}
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
                          included ? "text-slate-700" : "text-slate-400 "
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
        {/* ================= PLAN DETAILS (ALWAYS VISIBLE) ================= */}
        <div className="mt-20 space-y-16">
          {PLANS.map((plan) => {
            const detail = PLAN_FULL_DETAILS[plan.id];
            const visual = VISUALS[plan.id];

            return (
              <section
                key={plan.id}
                className="max-w-5xl mx-auto bg-white border border-blue-100 rounded-2xl p-8 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center ${visual.accent}`}
                  >
                    {visual.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {detail.title}
                    </h3>
                    <p className="text-sm text-slate-500">{detail.subtitle}</p>
                    {plan.id === "premium" ? (
                      <div className="mt-1">
                        <div className="text-2xl font-bold text-slate-400 ">
                          ₹499
                        </div>
                        <div
                          className="mt-1 inline-block px-3 py-1 rounded-full
      bg-gradient-to-r from-purple-500 to-pink-500
      text-white text-xs font-semibold shadow"
                        >
                          🎉 Registration FREE till March
                        </div>
                      </div>
                    ) : (
                      <p className={`mt-1 text-3xl font-bold ${visual.accent}`}>
                        {visual.price}
                      </p>
                    )}
                  </div>
                </div>

                {/* Points */}
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {detail.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6">
                  <button
                    onClick={() =>
                      window.open(
                        "https://forms.gle/j79LRuzWo5q7CxJL8",
                        "_blank"
                      )
                    }
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                  >
                    Proceed with {detail.title}
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}
