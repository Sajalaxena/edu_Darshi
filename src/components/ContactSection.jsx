// src/components/ContactSectionModern.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneTilt, Clock, Users, CheckCircle } from "phosphor-react";

const PLANS = [
  { id: "free", label: "Free" },
  { id: "premium", label: "Premium" },
  { id: "elite", label: "Elite" },
];

const QUALIFICATIONS = [
  "10th / 12th",
  "B.Sc / B.Tech / BCom",
  "M.Sc / M.Tech / MCom",
  "Ph.D / Postdoc",
  "Other",
];

export default function ContactSectionModern() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: QUALIFICATIONS[1],
    subject: "",
    lastInstitute: "",
    purpose: "",
    plan: PLANS[0].id,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Enter a valid email.";
    if (!form.phone.trim()) err.phone = "Phone is required.";
    else if (!/^[0-9+\-()\s]{7,18}$/.test(form.phone))
      err.phone = "Enter a valid phone number.";
    if (!form.subject.trim())
      err.subject = "Subject helps us route your query.";
    if (!form.purpose.trim()) err.purpose = "Tell us why you're contacting us.";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccessOpen(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      qualification: QUALIFICATIONS[1],
      subject: "",
      lastInstitute: "",
      purpose: "",
      plan: PLANS[0].id,
    });
  }

  return (
    <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br " />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg"
          >
            ✨ Get Expert Guidance
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Need Guidance Contact Us?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Fill the form and our team will get back within 24 hours. Tell us your target and we'll suggest the right plan & mentor.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Main Info Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-blue-600 rounded-3xl p-8 text-white shadow-xl overflow-hidden"
              >

                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg"
                    >
                      <PaperPlaneTilt size={28} weight="fill" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Still Have a Doubt?</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Tell us your exam/target and preferred mentor & we will schedule a demo session. No charges, no spam.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/30">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 bg-white/10 rounded-xl p-3 backdrop-blur"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Clock size={22} weight="bold" />
                      </div>
                      <div>
                        <div className="text-xs text-white/80 font-medium">Office Hours</div>
                        <div className="text-sm font-bold">Mon–Sat • 9:00 AM – 7:00 PM</div>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 bg-white/10 rounded-xl p-3 backdrop-blur"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Users size={22} weight="bold" />
                      </div>
                      <div>
                        <div className="text-xs text-white/80 font-medium">Trusted Mentors</div>
                        <div className="text-sm font-bold">Faculty & industry experts</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-3xl font-bold text-blue-600">~4 hours</div>
                  <div className="text-xs text-slate-500 mt-2 font-semibold">Avg Response</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-3xl font-bold text-purple-600">4.8/5</div>
                  <div className="text-xs text-slate-500 mt-2 font-semibold">Satisfaction</div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Full name
                      </div>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-4 py-3.5 text-sm transition-all shadow-sm hover:shadow-md ${
                          errors.name ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-rose-600 text-xs font-medium flex items-center gap-1"
                        >
                          <span className="text-rose-500">⚠</span> {errors.name}
                        </motion.div>
                      )}
                    </label>

                    <label className="block group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Email
                      </div>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-4 py-3.5 text-sm transition-all shadow-sm hover:shadow-md ${
                          errors.email ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                        }`}
                        placeholder="hello@example.com"
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-rose-600 text-xs font-medium flex items-center gap-1"
                        >
                          <span className="text-rose-500">⚠</span> {errors.email}
                        </motion.div>
                      )}
                    </label>
                  </div>

                  {/* Phone + Qualification */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        Phone
                      </div>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-4 py-3.5 text-sm transition-all shadow-sm hover:shadow-md ${
                          errors.phone ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                        }`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-rose-600 text-xs font-medium flex items-center gap-1"
                        >
                          <span className="text-rose-500">⚠</span> {errors.phone}
                        </motion.div>
                      )}
                    </label>

                    <label className="group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Highest qualification
                      </div>
                      <select
                        name="qualification"
                        value={form.qualification}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3.5 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm hover:shadow-md bg-white"
                      >
                        {QUALIFICATIONS.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Subject + Last Institute */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        Subject (primary)
                      </div>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full rounded-xl border-2 px-4 py-3.5 text-sm transition-all shadow-sm hover:shadow-md ${
                          errors.subject ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                        }`}
                        placeholder="e.g., Mathematics"
                      />
                      {errors.subject && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-rose-600 text-xs font-medium flex items-center gap-1"
                        >
                          <span className="text-rose-500">⚠</span> {errors.subject}
                        </motion.div>
                      )}
                    </label>

                    <label className="group">
                      <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Last institute (optional)
                      </div>
                      <input
                        name="lastInstitute"
                        value={form.lastInstitute}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-slate-200 px-4 py-3.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all shadow-sm hover:shadow-md"
                        placeholder="e.g., IIT Delhi"
                      />
                    </label>
                  </div>

                  {/* Purpose */}
                  <label className="group">
                    <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Your purpose / target (brief)
                    </div>
                    <textarea
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full rounded-xl border-2 px-4 py-3.5 text-sm transition-all resize-none shadow-sm hover:shadow-md ${
                        errors.purpose ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      }`}
                      placeholder="e.g., Prepare for JAM 2026, want weekly mocks + mentor"
                    />
                    {errors.purpose && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-rose-600 text-xs font-medium flex items-center gap-1"
                      >
                        <span className="text-rose-500">⚠</span> {errors.purpose}
                      </motion.div>
                    )}
                  </label>

                  {/* Plan + Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-6 border-t-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-slate-700">Target plan</div>
                      <select
                        name="plan"
                        value={form.plan}
                        onChange={handleChange}
                        className="rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-sm bg-white"
                      >
                        {PLANS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <PaperPlaneTilt size={20} weight="fill" />
                        )}
                        <span>{submitting ? "Submitting..." : "Send Message"}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() =>
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            qualification: QUALIFICATIONS[1],
                            subject: "",
                            lastInstitute: "",
                            purpose: "",
                            plan: PLANS[0].id,
                          })
                        }
                        className="px-6 py-3.5 rounded-xl border-2 border-slate-300 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
                      >
                        Reset
                      </motion.button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 text-center pt-2">
                    By submitting you agree to our{" "}
                    <a className="text-blue-600 underline hover:text-blue-700 font-medium" href="/privacy">
                      privacy policy
                    </a>
                    . We will contact you for support only.
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {successOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4"
            onClick={() => setSuccessOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle size={40} weight="fill" className="text-white" />
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Message Sent! 🎉
                </h3>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Our team will reach out on the details you provided. Meanwhile you can check our{" "}
                  <a href="/webinars" className="text-blue-600 underline hover:text-blue-700 font-semibold">
                    upcoming webinars
                  </a>.
                </p>

                <button
                  onClick={() => setSuccessOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

 
