import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, ArrowRight } from "phosphor-react";
import hero1 from "../assets/banner1.png";
import hero2 from "../assets/banner2.png";
import hero3 from "../assets/Hero3.png";

import QuestionOfDayCard from "./QuestionOfDayCard";
// import BackgroundFX from "./BackgroundFX";
const quotes = [
  "Education is the most powerful weapon which you can use to change the world.",
  "Arise, awake, and stop not until the goal is reached.",
  "The future belongs to those who prepare for it today.",
  "Learning never exhausts the mind.",
  "Push yourself, because no one else is going to do it for you.",
  "There is no substitute for hard work.",
  "Believe in yourself and all that you are.",
  "Dream big, work hard, stay humble.",
  "Every expert was once a beginner.",
  "Discipline is the bridge between goals and accomplishment.",
];

const IMAGES = [hero1, hero2, hero3];

// Counter animation hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

const t = setInterval(() => {
  setIndex((i) => (i + 1) % IMAGES.length);
}, 2000);

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Counter values
  const mentorCount = useCounter(20, 2000);
  const questionCount = useCounter(100, 2500);
  const studentCount = useCounter(50, 2200);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ color: "var(--brand-deep)" }}
            >
              Empowering Students Through Mentorship
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Get personalized guidance, access previous year papers, and learn
              from top mentors.
            </p>

            {/* Stats Counters */}
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: "var(--brand-deep)" }}
                >
                  {mentorCount}+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Expert Mentors
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: "var(--brand-deep)" }}
                >
                  {questionCount}+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Questions Bank
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: "var(--brand-deep)" }}
                >
                  {studentCount}+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Students Helped
                </div>
              </motion.div>
            </div>

            <QuestionOfDayCard />
          </motion.div>

          {/* RIGHT: Premium Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main Slider Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-transparent p-3">
              <div className="relative rounded-2xl overflow-hidden h-full">
                <AnimatePresence>
                  <motion.img
                    key={index}
                    src={IMAGES[index]}
                    alt={`Hero ${index + 1}`}
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-100%" }}
                    transition={{
                      duration: 0.6,
                      ease: "linear",
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
