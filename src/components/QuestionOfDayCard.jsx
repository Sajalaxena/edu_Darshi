// src/components/QuestionOfDayCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuestionOfDayCard() {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate("/qotd");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 max-w-xl"
    >
      <div
        className="relative rounded-2xl 
                      bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700
                      p-5 md:p-6
                      shadow-lg shadow-indigo-500/20"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center 
                        px-3 py-1 mb-3
                        rounded-full bg-white/20
                        text-white text-xs font-medium"
        >
          🔥 Solve & Succeed
        </div>

        {/* Heading */}
        <p className="font-semibold text-white leading-snug">
          Solve Today’s Question & Boost Your Skills
        </p>

        {/* Button */}
        <div className="mt-4">
          <button
            onClick={onOpen}
            className="px-6 py-2 rounded-full text-lg font-bold
             bg-gradient-to-r from-pink-500 to-yellow-400
             text-white
             shadow-2xl shadow-pink-500/40
             hover:scale-110
             transition-all duration-300
             animate-bounce"
          >
            🚀 Question of the Day
          </button>
        </div>
      </div>
    </motion.div>
  );
}
