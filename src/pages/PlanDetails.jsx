// src/pages/PlanDetails.jsx
import React, { useMemo, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    tagline: "Foundation features to get started at zero cost",
    bullets: [
      "EduDarshi Webinars (live + select recordings)",
      "Solutions Repository (limited access)",
      "Weekly Opportunity Alerts (national level)",
      "Starter Study Resources: sample notes, practice questions, exam tips (limited)",
      "Basic community access (browse discussions and mentor highlights)",
    ],
    details:
      "EduDarshi Webinars (live + select recordings): Attend expert-led sessions on exam strategies, subject refreshers, and career pathways. Access a rotating library of recordings for catch-up and revision.",
  },
  {
    id: "premium",
    name: "Premium Plan",
    tagline: "Includes everything in the Free Plan, plus major upgrades",
    bullets: [
      "Unlimited webinars + exclusive workshops and curated internship opportunities",
      "Complete solutions library for recent and past exams",
      "Personalized weekly alerts (by subject/interest)",
      "Focused notes & preparation guides (choose your subjects)",
      "Adaptive mock tests with performance analytics",
    ],
    details:
      "Unlimited webinars + exclusive workshops, complete solutions, personalized alerts and adaptive mocks with analytics.",
  },
  {
    id: "elite",
    name: "Elite Plan",
    tagline: "Concierge-level, end-to-end preparation and placement support",
    bullets: [
      "All-access webinars, exclusive workshops, curated internships, recordings",
      "On-demand expert discussions and one-to-one application guidance",
      "Dedicated mentor, priority doubt resolution, career portfolio support",
      "Unlimited mock tests, analytics, interview practice and placement support",
    ],
    details:
      "Full concierge support: dedicated mentor, priority doubt resolution, expert feedback sessions, and placement & scholarship assistance.",
  },
];

export default function PlanDetails() {
  const { id: paramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // pick id from route param or location.state (safer)
  const selectedId =
    paramId || (location && location.state && location.state.selected) || null;

  const refs = useRef({});
  const [highlightedId, setHighlightedId] = useState(null);

  // build refs for each plan
  useEffect(() => {
    PLANS.forEach((p) => {
      if (!refs.current[p.id]) refs.current[p.id] = React.createRef();
    });
  }, []);

  // when selectedId changes, scroll + highlight
  useEffect(() => {
    if (!selectedId) return;
    const elRef = refs.current[selectedId];
    if (!elRef) return;

    // small delay so layout finishes
    const t = setTimeout(() => {
      const el = elRef.current;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // apply highlight
        setHighlightedId(selectedId);
        // remove highlight after 2200ms
        setTimeout(() => setHighlightedId(null), 2200);
      }
    }, 120);

    return () => clearTimeout(t);
  }, [selectedId]);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-slate-600 hover:underline"
        >
          ← Back
        </button>

        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--brand)" }}
        >
          Our Plans — Full Details
        </h1>

        <p className="text-slate-700 mb-8">
          Browse all subscription plans below. The plan you selected is
          highlighted.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => {
            const isHighlighted = highlightedId === p.id;
            return (
              <article
                key={p.id}
                id={`plan-${p.id}`}
                ref={refs.current[p.id]}
                className={`p-5 rounded-lg border transition-shadow duration-300 ${
                  isHighlighted
                    ? "plan-highlight border-blue-300 shadow-2xl"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
                <div className="text-sm text-slate-500 mb-3">{p.tagline}</div>

                <ul className="list-disc pl-5 text-slate-700 space-y-1 mb-3">
                  {p.bullets.map((b, idx) => (
                    <li key={idx} className="text-sm">
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-slate-700 mb-4">{p.details}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      alert(
                        "Buy flow will be added here (Razorpay). Selected plan: " +
                          p.id
                      )
                    }
                    className="btn-primary"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Extra expanded view for the selected plan (optional) */}
        {selectedId && (
          <div className="mt-10 bg-white p-6 rounded-lg border border-blue-100 shadow-sm">
            <h3 className="text-2xl font-semibold mb-3">
              {PLANS.find((p) => p.id === selectedId)?.name || "Selected Plan"}{" "}
              — Deep details
            </h3>

            <p className="text-slate-700 mb-4">
              {PLANS.find((p) => p.id === selectedId)?.details}
            </p>

            <h4 className="font-semibold mb-2">More inclusions</h4>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {(PLANS.find((p) => p.id === selectedId)?.bullets || []).map(
                (b, i) => (
                  <li key={i}>{b}</li>
                )
              )}
            </ul>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => alert("Buy flow will be added here")}
                className="btn-primary"
              >
                Buy Now
              </button>
              <button onClick={() => navigate(-1)} className="btn-secondary">
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
