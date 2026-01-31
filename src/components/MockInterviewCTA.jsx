import React from "react";

export default function MockInterviewCTA() {
  const googleFormLink = "https://forms.gle/YOUR_GOOGLE_FORM_LINK";

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600"></div>

      {/* Animated Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto text-center text-white">
        {/* Blinking Badge */}
        <div className="inline-block mb-6">
          <span
            className="px-6 py-2 rounded-full text-sm font-bold tracking-wide
                           bg-white/20 backdrop-blur-md
                           border border-white/40
                           animate-pulse"
          >
            🎯 MOCK INTERVIEW PROGRAM
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Preparing for Ph.D. Admission, Assistant Professor, TGT / PGT or
          Industry Jobs?
        </h2>

        {/* Sub Text */}
        <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-4xl mx-auto leading-relaxed">
          IITs / IISERs / TIFR / IISc / Central Universities • HPSC / UPHESC /
          MPPSC • Boost your selection chances with expert mock interviews.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={() => window.open(googleFormLink, "_blank")}
            className="px-10 py-4 rounded-full text-lg font-bold
                       bg-gradient-to-r from-pink-500 to-yellow-400
                       text-white
                       shadow-2xl shadow-pink-500/40
                       hover:scale-110
                       transition-all duration-300
                       animate-bounce"
          >
            🚀 Register Now
          </button>
        </div>
      </div>
    </section>
  );
}
