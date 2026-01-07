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

const PLAN_FULL_DETAILS = {
  free: {
    title: "Free Plan",
    subtitle: "Foundation features to get started at zero cost",
    points: [
      "EduDarshi Webinars (live + select recordings): Expert-led sessions on exam strategies, subject refreshers, and career pathways.",
      "Solutions Repository (limited): Curated worked solutions from recent and past exams.",
      "Weekly Opportunity Alerts (national level): Exams, workshops, internships, and jobs with key dates.",
      "Starter Study Resources: Sample notes, formula sheets, practice questions, and exam tips.",
      "Community (read-only): Browse mentor-verified discussions and solved threads.",
    ],
  },

  premium: {
    title: "Premium Plan",
    subtitle: "Includes everything in the Free Plan, plus",
    points: [
      "Unlimited Webinars + Exclusive Workshops with post-session resources.",
      "Complete Solutions Library for all recent and historical exams.",
      "Personalized Weekly Alerts (national & international) by subject and career track.",
      "Focused Lecture Notes & Preparation Guides for chosen subjects.",
      "Adaptive Mock Tests with performance analytics and improvement insights.",
      "Priority Mentor Support with monthly group doubt-clearing sessions.",
    ],
  },

  elite: {
    title: "Elite Plan",
    subtitle: "Concierge-level mentorship & career guidance",
    points: [
      "All-access webinars & workshops with guaranteed recordings.",
      "On-demand expert discussions for deep solution analysis.",
      "Hyper-personalized alerts + 1:1 application & document guidance.",
      "Complete lecture notes, unlimited mocks & interview simulations.",
      "Dedicated mentor for the entire subscription period.",
      "Priority doubt resolution via chat + scheduled phone/video calls.",
      "Career portfolio development: CV, SOP & LOR reviews.",
      "Placement & scholarship support with referrals & timelines.",
    ],
  },
};


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

        {/* HEADER */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8" style={{ color: "var(--brand, #2563EB)" }}>
 Our Plans — Full Details        </h2>
     
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
          </div>
        </div>

        {/* Points */}
        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          {detail.points.map((point, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle size={18} className="text-green-500 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6">
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfPLACEHOLDER/viewform",
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
