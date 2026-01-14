import React from "react";
import { motion } from "framer-motion";
import { Star, Quotes } from "phosphor-react";

const reviews = [
  {
    name: "Aman Singh",
    role: "IIT-JAM Mathematics | PhD Aspirant",
    text: "I prepared for IIT-JAM Mathematics with EduDarshi mentors. The problem-solving approach, weekly mock analysis, and clear strategy helped me improve accuracy and speed.",
    rating: 5,
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    name: "Riya Patel",
    role: "CSIR-NET/JRF Qualified | Research Aspirant",
    text: "The NET/JRF preparation was very structured. Concept-wise tests, doubt-focused sessions, and mentor feedback on answer presentation made a big difference.",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOOOp7Ae6JdqU8o-6BLyjvrep4SEd8mfKx2w&s",
  },
  {
    name: "Sneha Kulkarni",
    role: "PhD Admission (India & Abroad) | Postdoc Aspirant",
    text: "EduDarshi mentors helped me with SOP writing, CV structuring, and interview preparation for PhD admissions. The one-to-one feedback was extremely valuable.",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOOOp7Ae6JdqU8o-6BLyjvrep4SEd8mfKx2w&s",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3"
                        style={{ color: "var(--brand-deep)" }}
>
            Student Reviews
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from students who transformed their careers with our guidance
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
                <Quotes size={48} weight="fill" />
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50 shadow-md"
                  />
                  {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div> */}
                </motion.div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{review.name}</h3>
                  <p className="text-sm text-slate-600 leading-snug">{review.role}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Rating */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      weight="fill"
                      className="text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
             
