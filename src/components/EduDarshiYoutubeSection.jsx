// src/components/EduDarshiYoutubeSection.jsx
import { motion } from "framer-motion";
import { CheckCircle } from "phosphor-react";

export default function EduDarshiYoutubeSection() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — YOUTUBE VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KpnyhOJNyAI"
              title="EduDarshi Platform Overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: "var(--brand-deep)" }}
            >
              What We Do at EduDarshi
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              EduDarshi is a mentorship-driven learning platform designed to help
              students crack competitive exams with clarity, confidence, and
              strategy.
            </p>

            <ul className="mt-6 space-y-4 text-slate-700">
              {[
                "Personalized mentorship from top educators & researchers",
                "Previous year papers with structured solutions",
                "Daily question practice & concept reinforcement",
                "Research updates, exam insights & academic guidance",
                "Live webinars, strategy sessions & doubt solving",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    size={22}
                    weight="fill"
                    className="text-blue-600 mt-0.5"
                  />
                  <span className="text-base">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
