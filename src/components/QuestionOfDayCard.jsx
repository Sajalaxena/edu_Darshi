// src/components/QuestionOfDayCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Lightweight teaser card to replace Quote of the Day.
 * Clicking navigates to the QOTD route which shows the dialog.
 */

export default function QuestionOfDayCard() {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate("/qotd");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 mt-6 max-w-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">Question of the Day</h4>
          <p className="text-sm text-slate-600 mt-2 mr-8">
            Click to try today's short challenge — submit your answer and view a
            short solution video.
          </p>
        </div>
        <div className="mt-4">
          <button onClick={onOpen} className="btn-primary">
            Try
          </button>
        </div>
      </div>
    </motion.div>
  );
}
