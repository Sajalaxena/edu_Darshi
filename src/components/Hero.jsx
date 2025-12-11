import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import hero1 from "../assets/Hero1.png";
import hero2 from "../assets/Hero2.png";
import QuestionOfDayCard from "./QuestionOfDayCard";
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

const IMAGES = [hero1, hero2];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className=" my-10 py-8 rounded-xl">
      <div className="grid md:grid-cols-2 gap-8 items-center container mx-auto px-6">
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

          {/* <div className="mt-6 card p-4 max-w-xl "> */}
          {/* <h4 className="font-semibold">Quote of the Day</h4>
            <p className="italic text-slate-600 dark:text-slate-300 mt-2">
              “{quotes[quoteIndex]}”
            </p> */}
          <QuestionOfDayCard />
          {/* </div> */}

          <div className="mt-6 flex gap-3">
            {/* <button className="btn-primary">Browse Mentors</button> */}
            {/* <button className="btn-secondary"></button> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-lg overflow-hidden h-64 md:h-72 shadow-lg">
            <img
              src={IMAGES[index]}
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
