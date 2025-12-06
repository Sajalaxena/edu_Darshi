// src/pages/WhyChooseDetails.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function WhyChooseDetails() {
  const nav = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // small delay to ensure layout finished
    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // briefly highlight the section
        el.style.transition = "background-color 0.6s";
        const prev = el.style.backgroundColor;
        el.style.backgroundColor = "rgba(59,130,246,0.06)";
        setTimeout(() => (el.style.backgroundColor = prev), 1200);
      }
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <button
          onClick={() => nav(-1)}
          className="mb-4 text-sm text-slate-600 hover:underline"
        >
          ← Back
        </button>

        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--brand)" }}
        >
          Why Choose Us
        </h1>

        <p className="text-slate-700 mb-6">
          At EduDarshi, we empower individuals to navigate their career paths
          with confidence and clarity. Our expert-led services are designed to
          address the uncertainties of career planning, academic pursuits, and
          professional development. Whether you're a student, recent graduate,
          or career changer, we provide personalized, comprehensive support to
          help you achieve your goals. Here's why we're the ideal partner for
          your journey:
        </p>

        <article className="space-y-6">
          <section id="career-counselling" className="p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">
              1. Career Counselling
            </h2>
            <p className="text-slate-700 mb-2">
              Feeling overwhelmed by career decisions? You're not alone. Many
              individuals grapple with questions like: "What job should I pursue
              next?" "Which courses will best prepare me for my desired career?"
              or "How can I transition into a new field?" Our career counselling
              service offers tailored guidance to help you clarify your
              aspirations, assess your skills, and align your choices with
              market demands.
            </p>
            <p className="text-slate-700 mb-2">
              We start with an in-depth assessment of your interests, strengths,
              and long-term objectives, followed by personalized roadmaps that
              outline actionable steps. Our counsellors draw on industry
              insights and data-driven trends to recommend suitable courses,
              certifications, or job paths. This service not only reduces
              confusion but also builds your self-awareness, ensuring you're
              equipped to make informed decisions that lead to fulfilling
              careers. Sessions are available in one-on-one formats or group
              workshops, with flexible scheduling to fit your needs.
            </p>
          </section>

          <section id="exams-prep" className="p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">
              2. Academia and Industry Examinations and Job Preparation
            </h2>
            <p className="text-slate-700 mb-2">
              Preparing for academic admissions or job interviews can be
              daunting, but our comprehensive preparation programs ensure you're
              ready to succeed. We specialize in mock tests and simulated
              interviews for academic pursuits (BS, MS, PhD), faculty roles,
              research fellowships—and industry job preparation.
            </p>

            <ul className="list-disc pl-5 text-slate-700 space-y-2 mb-2">
              <li>
                <strong>Mock Assessments:</strong> Realistic practice exams and
                interviews to build confidence and identify areas for
                improvement.
              </li>
              <li>
                <strong>Tailored Resources:</strong> Access to study materials,
                industry reports, and up-to-date hiring trends.
              </li>
              <li>
                <strong>One-to-One Mentorship:</strong> Personalized sessions
                with experienced mentors from academia and industry.
              </li>
            </ul>

            <p className="text-slate-700">
              This holistic preparation enhances your performance in exams and
              interviews and equips you with the knowledge to stand out in
              competitive environments, bridging the gap between education and
              employment.
            </p>
          </section>

          <section id="workshops-internships" className="p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">
              3. Job-Oriented Workshops and Internships
            </h2>
            <p className="text-slate-700 mb-2">
              Gain hands-on experience and practical skills through our
              job-oriented workshops and internships, designed for both academic
              and industrial career paths. These programs are led by seasoned
              experts from academia and industry, ensuring relevance and
              real-world applicability.
            </p>

            <p className="text-slate-700 mb-2">
              Our workshops cover essential topics such as resume building,
              interview techniques, professional etiquette, and
              industry-specific skills (e.g., data analysis for tech roles or
              research methodologies for academic positions). Participants
              engage in interactive sessions, case studies, and group activities
              to apply concepts immediately.
            </p>

            <p className="text-slate-700">
              Complementing this, our internship opportunities provide immersive
              experiences, allowing you to work on real projects under expert
              supervision. Whether you're aiming for academic roles like
              teaching or research, or industry positions in fields like
              technology, healthcare, or finance, these programs help you build
              a portfolio, network with professionals, and gain valuable
              credentials. Check out our mentors and experts page to learn more
              about the diverse backgrounds of our facilitators, who bring a
              wealth of knowledge to guide your development.
            </p>
          </section>
        </article>

        <div className="mt-8 flex justify-end">
          <button onClick={() => nav(-1)} className="btn-secondary">
            Back
          </button>
        </div>
      </div>
    </section>
  );
}
