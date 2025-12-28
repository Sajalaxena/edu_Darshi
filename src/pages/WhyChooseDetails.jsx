// src/pages/WhyChooseDetails.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WhyChooseDetails() {
  const nav = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-2", "ring-indigo-200");
        setTimeout(
          () => el.classList.remove("ring-2", "ring-indigo-200"),
          1200
        );
      }
    }, 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* HERO */}
      <div className="container mx-auto px-6 pt-14 pb-10">
        <button
          onClick={() => nav(-1)}
          className="text-sm text-slate-600 hover:underline mb-4"
        >
          ← Back
        </button>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Why Choose <span className="text-indigo-600">EduDarshi</span>
        </h1>

        <p className="max-w-3xl text-lg text-slate-600 leading-relaxed">
          We help students and professionals remove confusion, prepare with
          confidence, and achieve outcomes—across academia and industry—through
          expert-led, structured guidance.
        </p>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid gap-10 max-w-5xl mx-auto">
          {/* CARD 1 */}
          <section
            id="career-counselling"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">🧭</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Career Counselling
                </h2>
                <p className="text-slate-500">
                  Find clarity. Make confident career decisions.
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Feeling overwhelmed by career decisions? Many people struggle with
              questions like what job to pursue, which course to choose, or how
              to transition into a new field. Our career counselling helps you
              align your interests, strengths, and long-term goals with real
              market opportunities.
            </p>

            <p className="text-slate-700 leading-relaxed">
              We conduct in-depth assessments and design personalized roadmaps
              with actionable steps—covering courses, certifications, and job
              paths—backed by industry insights and data-driven trends.
            </p>
          </section>

          {/* CARD 2 */}
          <section
            id="exams-prep"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Academia & Industry Exam and Job Preparation
                </h2>
                <p className="text-slate-500">
                  Structured preparation for competitive success
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Whether you’re preparing for BS, MS, PhD admissions, faculty
              roles, research fellowships, or industry jobs—our preparation
              programs are designed to make you confident and competitive.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
              <li>✅ Mock tests & simulated interviews</li>
              <li>✅ Targeted study material & resources</li>
              <li>✅ One-to-one mentorship with experts</li>
              <li>✅ Feedback-driven performance improvement</li>
            </ul>

            <p className="text-slate-700 mt-4">
              This approach bridges the gap between education and employment,
              helping you stand out in highly competitive environments.
            </p>
          </section>

          {/* CARD 3 */}
          <section
            id="workshops-internships"
            className="bg-white rounded-2xl p-8 shadow-md border border-blue-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">🛠️</div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Job-Oriented Workshops & Internships
                </h2>
                <p className="text-slate-500">
                  Learn by doing. Build real-world experience.
                </p>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              Our workshops and internships focus on practical, job-ready
              skills—covering resume building, interviews, professional
              etiquette, and domain-specific tools—guided by experts from
              academia and industry.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Internship programs allow you to work on real projects, build
              portfolios, network with professionals, and gain credentials that
              matter for placements, research roles, and scholarships.
            </p>
          </section>

          {/* CTA */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => nav("/mentors")}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Explore Our Mentors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
