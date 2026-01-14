import MathematicalBackground from "../components/MathematicalBackground";

export default function AboutUs() {
  return (
    <section className="relative min-h-screen">
      {/* Background */}
      <MathematicalBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-6"
          style={{ color: "var(--brand, #2563EB)" }}
        >
          About EduDarshi
        </h1>

        <p className="text-center text-slate-600 mb-12">
          Academic mentorship with clarity, rigor, and purpose.
        </p>

        {/* Section 1 */}
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Who We Are
          </h2>

          <p className="text-slate-700 leading-relaxed">
            We are a dedicated team of experienced faculty members, postdoctoral
            researchers, and PhD scholars from some of the most prestigious
            institutions in India and abroad, including{" "}
            <strong>IITs, NITs, IISERs, TIFR, and IISc</strong>.
            <br />
            <br />
            United by a shared passion for mathematics and academic excellence,
            we work with a single objective: to mentor and guide the next
            generation of mathematicians through a rigorous and honest academic
            process.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Our Focus
          </h2>

          <p className="text-slate-700 leading-relaxed">
            Our focus is clear and uncompromising.
            <br />
            <br />
            We support mathematics graduates who are preparing for{" "}
            <strong>PhD admissions in top-tier institutions</strong> such as
            IITs, NITs, IISERs, IISc, TIFR, and other leading research centers.
            <br />
            <br />
            EduDarshi follows a{" "}
            <strong>100% academic-focused approach</strong>. We do not offer
            shortcuts or generic coaching. Instead, we provide structured
            guidance, rigorous feedback, and comprehensive academic support
            throughout the entire PhD admission journey—from application
            preparation to interview readiness.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why EduDarshi
          </h2>

          <p className="text-slate-700 leading-relaxed">
            With deep insight into the expectations of research programs and
            firsthand experience in academic evaluation processes, we understand
            what selection committees actually look for.
            <br />
            <br />
            Our goal is to bridge the gap between undergraduate or postgraduate
            studies and successful entry into competitive PhD programs. We help
            students transition from being exam-oriented learners to becoming
            research-ready candidates with clarity of thought, academic depth,
            and confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
