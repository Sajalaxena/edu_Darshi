// src/components/ContactSectionModern.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ContactSectionModern
 * - Responsive two-column layout (stacks on mobile)
 * - Extra fields: Highest Qualification, Subject, Last Institute, Purpose, Target Plan
 * - Lightweight client-side validation
 * - Success modal + subtle animations
 * - Uses Tailwind utility classes (feel free to adjust tokens)
 */

const PLANS = [
  { id: "free", label: "Free" },
  { id: "premium", label: "Premium" },
  { id: "elite", label: "Elite" },
];

const QUALIFICATIONS = [
  "High School (12th)",
  "B.Sc / B.Tech / BCom",
  "M.Sc / M.Tech / MCom",
  "MCA / MBA",
  "Ph.D / Postdoc",
  "Other",
];

function IconInput({ children, label }) {
  return (
    <div className="flex items-center gap-3 text-slate-500 text-sm">
      <div className="w-9 h-9 grid place-items-center rounded-lg bg-white/60 shadow-sm">
        {children}
      </div>
      <div className="text-sm text-slate-700">{label}</div>
    </div>
  );
}

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
  const firstErrorRef = useRef(null);

  useEffect(() => {
    if (firstErrorRef.current) firstErrorRef.current.focus();
  }, [errors]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email.";
    if (!form.phone.trim()) err.phone = "Phone is required.";
    else if (!/^[0-9+\-()\s]{7,18}$/.test(form.phone)) err.phone = "Enter a valid phone number.";
    if (!form.subject.trim()) err.subject = "Subject helps us route your query.";
    if (!form.purpose.trim()) err.purpose = "Tell us why you're contacting us.";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setSubmitting(true);
    // Dummy network delay to show state; replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccessOpen(true);

    // optionally reset or keep data
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
    <section id="contact" className="my-16 container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#1E40AF" }}>
            Need a Free Demo or Guidance?
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Fill the form and our team will get back within 24 hours. Tell us your target and we'll suggest the right plan & mentor.
          </p>
        </header>

        <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* LEFT: Visual / Info */}
            <div className="p-6 md:p-8 bg-[linear-gradient(180deg,#f8fbff,rgba(255,255,255,0.6))]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 grid place-items-center rounded-xl bg-blue-100 text-blue-700">
                  {/* ribbon icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2L15 8H21L16.5 12L18 18L12 14.5L6 18L7.5 12L3 8H9L12 2Z" fill="#1E3A8A"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Request a Free Demo</h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-sm">
                    Tell us your exam/target and preferred mentor & we will schedule a demo session. No charges, no spam.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none"><path d="M12 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  <div>
                    <div className="text-xs text-slate-500">Office Hours</div>
                    <div className="text-sm text-slate-700">Mon–Sat • 9:00 AM – 7:00 PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none"><path d="M3 8l8-5 8 5v7a2 2 0 0 1-2 2h-2v-5H7v5H5a2 2 0 0 1-2-2V8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div>
                    <div className="text-xs text-slate-500">Trusted Mentors</div>
                    <div className="text-sm text-slate-700">Faculty & industry experts</div>
                  </div>
                </div>

                <div className="mt-4">
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-slate-500">Avg Response</div>
                      <div className="text-sm font-medium text-slate-700">~4 hours</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Satisfaction</div>
                      <div className="text-sm font-medium text-slate-700">4.8/5</div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* name + email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <div className="text-xs font-medium text-slate-600">Full name</div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`mt-1 w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-200 ${
                        errors.name ? "border-rose-400" : "border-slate-200"
                      }`}
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                    />
                    {errors.name && (
                      <div id="err-name" className="mt-1 text-rose-600 text-xs" ref={firstErrorRef}>
                        {errors.name}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <div className="text-xs font-medium text-slate-600">Email</div>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`mt-1 w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-200 ${
                        errors.email ? "border-rose-400" : "border-slate-200"
                      }`}
                      placeholder="hello@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email && <div id="err-email" className="mt-1 text-rose-600 text-xs">{errors.email}</div>}
                  </label>
                </div>

                {/* phone + qualification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label>
                    <div className="text-xs font-medium text-slate-600">Phone</div>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`mt-1 w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-200 ${
                        errors.phone ? "border-rose-400" : "border-slate-200"
                      }`}
                      placeholder="+91 98765 43210"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone && <div id="err-phone" className="mt-1 text-rose-600 text-xs">{errors.phone}</div>}
                  </label>

                  <label>
                    <div className="text-xs font-medium text-slate-600">Highest qualification</div>
                    <select
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border p-3 text-sm border-slate-200 focus:ring-2 focus:ring-blue-200"
                    >
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* subject + last institute */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label>
                    <div className="text-xs font-medium text-slate-600">Subject (primary)</div>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`mt-1 w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-200 ${
                        errors.subject ? "border-rose-400" : "border-slate-200"
                      }`}
                      placeholder="e.g., Physics / Computer Science"
                    />
                    {errors.subject && <div className="mt-1 text-rose-600 text-xs">{errors.subject}</div>}
                  </label>

                  <label>
                    <div className="text-xs font-medium text-slate-600">Last institute (optional)</div>
                    <input
                      name="lastInstitute"
                      value={form.lastInstitute}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border p-3 text-sm border-slate-200 focus:ring-2 focus:ring-blue-200"
                      placeholder="e.g., IIT Delhi"
                    />
                  </label>
                </div>

                {/* purpose */}
                <label>
                  <div className="text-xs font-medium text-slate-600">Your purpose / target (brief)</div>
                  <textarea
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    rows="3"
                    className={`mt-1 w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-200 ${
                      errors.purpose ? "border-rose-400" : "border-slate-200"
                    }`}
                    placeholder="e.g., Prepare for JEE 2026, want weekly mocks + mentor"
                  />
                  {errors.purpose && <div className="mt-1 text-rose-600 text-xs">{errors.purpose}</div>}
                </label>

                {/* plan + CTA */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-medium text-slate-600">Target plan</div>
                    <select
                      name="plan"
                      value={form.plan}
                      onChange={handleChange}
                      className="ml-3 rounded-lg border p-2 text-sm border-slate-200 focus:ring-2 focus:ring-blue-200"
                    >
                      {PLANS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.01] transition"
                    >
                      {submitting ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" fill="none" />
                        </svg>
                      ) : null}
                      <span>{submitting ? "Submitting..." : "Send Message"}</span>
                    </button>

                    <button
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
                      className="px-4 py-2 rounded-lg border border-slate-200 text-sm"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  By submitting you agree to our <a className="text-blue-600 underline" href="/privacy">privacy policy</a>. We will contact you for support only.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {successOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto max-w-md w-full bg-white rounded-xl shadow-xl p-4 border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 grid place-items-center text-emerald-700">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Thanks — request received!</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Our team will reach out on the details you provided. Meanwhile you can check our{" "}
                    <a href="/webinars" className="text-blue-600 underline">upcoming webinars</a>.
                  </div>
                </div>
                <button
                  onClick={() => setSuccessOpen(false)}
                  className="text-slate-500 text-sm ml-3"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
