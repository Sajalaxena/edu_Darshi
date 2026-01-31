// src/components/WhyChoose.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import w1 from "../assets/why1.png";
import w2 from "../assets/why2.png";
import w3 from "../assets/why3.png";

const items = [
  {
    id: "career-counselling",
    title: "Career Counselling with Clarity & Confidence",
    desc: "Personalized career guidance to help you choose the right path—whether you're confused about jobs, higher studies, or switching fields. We assess your interests, strengths, and goals to create a clear, actionable roadmap aligned with real-world opportunities.",
    image: w1,
    color: "rose",
  },
  {
    id: "exam-job-preparation",
    title: "Academia & Industry Exam Preparation",
    desc: "End-to-end preparation for academic admissions, research roles, and industry jobs. From mock tests to interview simulations, we prepare you to perform with confidence in highly competitive environments.",
    image: w2,
    color: "purple",
  },
  {
    id: "workshops-internships",
    title: "Job-Oriented Workshops & Internships",
    desc: "Hands-on workshops and real-world internship opportunities designed to build practical skills, professional confidence, and a strong career portfolio—guided by experienced mentors.",
    image: w3,
    color: "blue",
  },
];

export default function WhyChoose() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ color: "var(--brand-deep)" }}
          >
            Why Choose Us
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto ">
            Transform your career with expert guidance and real-world experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.2,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              onClick={() => navigate(`/why-choose-us#${item.id}`)}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Image */}
              <motion.div
                className="relative h-48 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.2, duration: 0.5 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: i * 0.2 + 0.4,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-700 shadow-lg"
                >
                  {i + 1}
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span
                  className={`inline-flex items-center text-${item.color}-600 font-medium text-sm group-hover:gap-2 transition-all duration-300`}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
