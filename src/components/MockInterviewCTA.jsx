import React from "react";

export default function MockInterviewCTA() {
  const googleFormLink = "https://forms.office.com/r/U24iyxuCLD";

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600"></div>

          {/* Glow Effects */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400 rounded-full blur-[120px] opacity-30"></div>

          <div className="relative text-center text-white px-6 py-14">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span
                className="px-5 py-2 rounded-full text-lg font-semibold tracking-wide
                               bg-gradient-to-r from-pink-500 to-yellow-400
                               border border-white/30"
              >
                🎯 MOCK INTERVIEW PROGRAM
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-bold leading-tight max-w-4xl mx-auto">
              Preparing for Ph.D. Admission, Assistant Professor, TGT / PGT or
              Industry Jobs?
            </h2>

            {/* Sub Text */}
            <p className="mt-5 text-base md:text-lg text-indigo-100 max-w-3xl mx-auto">
              IITs / IISERs / TIFR / IISc / Central Universities • HPSC / UPHESC
              / MPPSC • Boost your selection chances with expert mock
              interviews.
            </p>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => window.open(googleFormLink, "_blank")}
                className="group relative inline-flex items-center justify-center
                           px-8 py-3 rounded-full text-base font-semibold
                           bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400
                           text-white shadow-xl shadow-orange-500/30
                           hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                🚀 Register Now
                {/* Shine animation */}
                <span
                  className="absolute inset-0
                                 bg-gradient-to-r from-transparent via-white/30 to-transparent
                                 translate-x-[-100%]
                                 group-hover:translate-x-[100%]
                                 transition-transform duration-700 ease-out"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
