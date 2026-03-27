import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Crown, RocketLaunch, CheckCircle, XCircle } from "phosphor-react";
import MathematicalBackground from "../components/MathematicalBackground";

/* ---------- DATA ---------- */
const ALL_FEATURES = [
  "Webinars (live + recordings)",
  "Adaptive Mock Tests",
  "Interview Practice",
  "Weekly Doubt Sessions",
  "Personalized Weekly Alerts",
  "Dedicated Mentor (1:1)",
  "Profile Build-up Guidance",
  "Internship Opportunities",
  "Complete Solutions Library",
];

const PLANS = [
  {
    id: "free",
    name: "Free Service",
    description: "Get started with essential learning tools",
    includes: [
      "Webinars (live + recordings)",
      "Limited Solutions Library",
      "Previous Year Question Papers",
      "Community Access",
    ],
  },
  {
    id: "premium",
    name: "Basic Service",
    description: "Structured preparation for serious aspirants",
    includes: [
      "Webinars (live + recordings)",
      "Weekly Alerts",
      "Complete Solutions Library",
      "Starter Study Resources",
      "Adaptive Mock Tests",
      "Interview Practice",
      "Previous Year Question Papers",
    ],
  },
  {
    id: "elite",
    name: "Personalised Service",
    description: "End-to-end mentorship & career guidance",
    includes: [
      "Webinars (live + recordings)",
      "Starter Study Resources",
      "Adaptive Mock Tests",
      "Dedicated Mentor (1:1)",
      "Interview Practice",
      "Weekly Doubt Sessions",
      "Personalized Weekly Alerts",
      "Profile Build-up Guidance",
      "Internship Opportunities",
      "Complete Solutions Library",
    ],
  },
];

const PLAN_FULL_DETAILS = {
  free: {
    title: "Free Service",
    subtitle: "Foundation features to explore EduDarshi",
    points: [
      "EduDarshi Webinars (live + selected recordings): Expert-led sessions on exam strategies, subject refreshers, and career pathways.",
      "Limited Solutions Library: Access a curated set of solved questions from previous exams.",
      "Previous Year Question Papers: Explore PYQs to understand exam patterns.",
      "Community Access: Read discussions and mentor-verified answers.",
    ],
  },
  premium: {
    title: "Basic Service",
    subtitle: "Everything you need for focused exam preparation",
    points: [
      "Webinars (live + recordings) with expert instructors.",
      "Weekly Alerts for exams, internships, and academic opportunities.",
      "Complete Solutions Library for recent and past exams.",
      "Starter Study Resources including notes, formula sheets, and practice sets.",
      "Adaptive Mock Tests to analyze performance and improve accuracy.",
      "Interview Practice sessions to build confidence and clarity.",
    ],
  },
  elite: {
    title: "Personalised Service",
    subtitle: "High-touch mentorship with career-focused guidance",
    points: [
      "All-access webinars and exclusive workshops with recordings.",
      "Starter Study Resources with structured learning paths.",
      "Advanced Adaptive Mock Tests aligned with your goals.",
      "Dedicated 1:1 Mentor for personalized guidance.",
      "Interview Practice with feedback and improvement plans.",
      "Weekly Doubt Sessions for continuous clarity.",
      "Personalized Weekly Alerts based on your profile.",
      "Profile Build-up Guidance (CV, SOP, academic positioning).",
      "Internship Opportunities with application support.",
      "Complete Solutions Library with in-depth explanations.",
      "Priority Mentor Support with monthly group doubt-clearing sessions. One-to-one Mentorship.",
    ],
  },
};

const VISUALS = {
  free: {
    price: "₹0",
    accent: "text-blue-100",
    bgAccent: "bg-blue-500",
    cardBg: "bg-gradient-to-br from-blue-600 to-sky-500",
    textMain: "text-white",
    textSub: "text-blue-100",
    borderAccent: "border-blue-400 ring-blue-500",
    btnAccent: "bg-white text-blue-700 hover:bg-blue-50 shadow-blue-900/20",
    icon: <Star size={32} weight="duotone" className="text-white" />,
    duration: "6 Months",
    durationBg: "bg-blue-700/50 border-blue-500 text-blue-100",
    tableRowActive: "bg-blue-50",
    checkColor: "text-blue-600",
  },
  premium: {
    price: "₹499",
    accent: "text-indigo-100",
    bgAccent: "bg-indigo-500",
    cardBg: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white",
    textMain: "text-white",
    textSub: "text-indigo-100",
    borderAccent: "border-indigo-400 ring-indigo-500",
    btnAccent: "bg-white text-indigo-700 hover:bg-indigo-50 shadow-indigo-900/20",
    icon: <Crown size={32} weight="duotone" className="text-white" />,
    duration: "6 Months",
    durationBg: "bg-indigo-800/50 border-indigo-500 text-indigo-100",
    tableRowActive: "bg-indigo-50",
    checkColor: "text-indigo-600",
  },
  elite: {
    price: "₹999",
    accent: "text-fuchsia-100",
    bgAccent: "bg-fuchsia-500",
    cardBg: "bg-gradient-to-br from-violet-700 to-fuchsia-600 text-white",
    textMain: "text-white",
    textSub: "text-fuchsia-100",
    borderAccent: "border-fuchsia-400 ring-fuchsia-500",
    btnAccent: "bg-white text-fuchsia-700 hover:bg-fuchsia-50 shadow-fuchsia-900/20",
    icon: <RocketLaunch size={32} weight="duotone" className="text-white" />,
    duration: "6 Months",
    durationBg: "bg-fuchsia-800/50 border-fuchsia-500 text-fuchsia-100",
    tableRowActive: "bg-fuchsia-50",
    checkColor: "text-fuchsia-600",
  },
};

export default function PlanDetails() {
  const { id } = useParams();
  const location = useLocation();
  const selectedFromNav = id || location.state?.selected || null;
  const [activePlan, setActivePlan] = useState(selectedFromNav);
  const refs = useRef({});

  useEffect(() => {
    if (activePlan && refs.current[activePlan]) {
      const yOffset = -120; // Offset for sticky navbar
      const element = refs.current[activePlan];
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [activePlan]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <MathematicalBackground />
      {/* ── Animated Hero Section ── */}
      <section className="relative bg-[#0E0B16] overflow-hidden pt-24 pb-32">
        {/* Animated Background Gradients & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Premium Offerings
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
          >
            Choose Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-200">
              Preparation Journey
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Explore our meticulously crafted service plans designed to support every stage of your academic career.
          </motion.p>
        </div>
      </section>

      {/* ── Pricing Overview ── */}
      <section className="container mx-auto px-4 sm:px-6 relative z-20 -mt-20">
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => {
            const visual = VISUALS[plan.id];
            const active = activePlan === plan.id;

            return (
              <motion.article
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`cursor-pointer rounded-[2rem] p-8 md:p-10 ${visual.cardBg} border transition-all duration-300 shadow-xl flex flex-col items-center text-center relative overflow-hidden
                  ${active 
                    ? `border-white ring-4 scale-[1.03] shadow-2xl z-10 ${visual.borderAccent}` 
                    : "border-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-2"}
                `}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/30 bg-white/10 backdrop-blur-sm`}>
                  {visual.icon}
                </div>

                <h3 className={`text-2xl font-bold ${visual.textMain} mb-2`}>{plan.name}</h3>

                <div className="mb-6 min-h-[50px] flex flex-col justify-end">
                  {plan.id === "premium" ? (
                    <div>
                      <div className="text-3xl font-black text-white/50 line-through decoration-white/50 decoration-2 mb-1">₹499</div>
                      <div className="inline-flex px-4 py-1.5 rounded-full bg-white text-purple-700 text-[11px] font-black uppercase tracking-wider shadow-lg">
                        Registration FREE till March 🎉
                      </div>
                    </div>
                  ) : (
                    <div className={`text-5xl font-black tracking-tight ${visual.textMain}`}>{visual.price}</div>
                  )}
                </div>

                <p className={`text-sm font-medium ${visual.textSub} mb-8 max-w-[200px] leading-relaxed`}>
                  {plan.description}
                </p>

                <div className={`w-full border rounded-2xl p-4 mb-6 ${visual.durationBg} backdrop-blur-sm`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest opacity-80 block mb-1`}>Duration</span>
                  <span className={`text-sm font-bold ${visual.textMain}`}>{visual.duration}</span>
                </div>

                <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] ${visual.btnAccent}`}>
                  Get Started
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Detailed Features Table/List ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-32 max-w-6xl relative">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-2xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight"
          >
            Compare <span className="text-indigo-600">Features</span>
          </motion.h2>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto">
            Find the perfect balance of support for your career goals.
          </p>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden md:block bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(30,27,75,0.08)] border border-white/60 overflow-hidden relative">
          
          {/* Table Header (Sticky) */}
          <div className="sticky top-16 z-30 grid grid-cols-4 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
            <div className="p-5 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] self-center pl-8">
              Feature List
            </div>
            {PLANS.map(plan => {
              const visual = VISUALS[plan.id];
              return (
                <div key={plan.id} className="p-4 flex flex-col items-center justify-center border-l border-slate-50 relative group">
                  {plan.id === "premium" && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                      Popular
                    </div>
                  )}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 shadow-sm border ${visual.cardBg} transition-transform group-hover:scale-110`}>
                    {React.cloneElement(visual.icon, { size: 16 })}
                  </div>
                  <span className="font-bold text-slate-800 text-[11px] tracking-tight">{plan.name}</span>
                </div>
              );
            })}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-50">
            {ALL_FEATURES.map((feature, idx) => (
              <motion.div 
                key={feature} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-4 items-stretch group hover:bg-slate-50/80 transition-all duration-300"
              >
                {/* Feature Label */}
                <div className="p-4 px-8 border-r border-slate-50 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors" />
                    <span className="font-bold text-slate-700 group-hover:text-slate-900 text-sm transition-colors">{feature}</span>
                  </div>
                </div>

                {/* Plan Cells */}
                {PLANS.map(plan => {
                  const included = plan.includes.includes(feature);
                  const visual = VISUALS[plan.id];
                  return (
                    <div key={plan.id} className={`p-4 flex items-center justify-center border-l border-slate-50 transition-colors ${plan.id === "premium" ? "bg-indigo-50/10" : ""}`}>
                      <AnimatePresence mode="wait">
                        {included ? (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg shadow-${visual.checkColor.split("-")[1]}-500/10 bg-white border border-${visual.checkColor.split("-")[1]}-100`}
                          >
                            <CheckCircle size={18} weight="fill" className={visual.checkColor} />
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="opacity-10 grayscale">
                            <XCircle size={18} weight="bold" className="text-slate-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile View (Compact Cards) ── */}
        <div className="md:hidden space-y-6">
          {ALL_FEATURES.map((feature) => (
            <div key={feature} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h4 className="font-extrabold text-slate-800 mb-4 border-b border-slate-50 pb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                {feature}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {PLANS.map(plan => {
                  const included = plan.includes.includes(feature);
                  const visual = VISUALS[plan.id];
                  return (
                    <div key={plan.id} className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/50">
                      <span className="text-[9px] font-black uppercase tracking-tight text-slate-400 mb-2">{plan.name.split(" ")[0]}</span>
                      {included ? (
                        <CheckCircle size={20} weight="fill" className={visual.checkColor} />
                      ) : (
                        <XCircle size={20} className="text-slate-200" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── In-Depth Plan Explanations ── */}
      <section className="container mx-auto px-4 sm:px-6 mt-32 space-y-16 max-w-4xl pb-16">
        {PLANS.map((plan) => {
          const detail = PLAN_FULL_DETAILS[plan.id];
          const visual = VISUALS[plan.id];

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              key={plan.id}
              ref={(el) => (refs.current[plan.id] = el)}
              className={`bg-white rounded-[2rem] border shadow-xl p-8 md:p-12 overflow-hidden relative ${visual.borderAccent} border-opacity-30`}
            >
              {/* Decorative side accent blur */}
              <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none ${visual.bgAccent}`}></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border shadow-inner ${visual.bgAccent} ${visual.accent} ${visual.borderAccent} border-opacity-40`}>
                  {visual.icon}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">{detail.title}</h3>
                      <p className="text-slate-500 font-medium">{detail.subtitle}</p>
                    </div>
                    
                    <div className="text-left md:text-right shrink-0">
                      {plan.id === "premium" ? (
                        <div>
                          <p className="text-2xl font-black text-slate-300 line-through decoration-slate-300 decoration-2 mb-1">₹499</p>
                          <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase tracking-wide">
                            FREE till March 🎉
                          </p>
                        </div>
                      ) : (
                        <p className={`text-4xl font-black tracking-tight ${visual.accent}`}>{visual.price}</p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 text-slate-700 leading-relaxed font-medium mb-10">
                    {detail.points.map((point, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <CheckCircle size={22} weight="fill" className={`shrink-0 mt-0.5 opacity-90 ${visual.accent}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => window.open("https://forms.gle/j79LRuzWo5q7CxJL8", "_blank")}
                    className={`w-full md:w-auto px-10 py-4 rounded-2xl text-white font-black text-lg tracking-wide shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 ${visual.cardBg}`}
                  >
                    Proceed with {plan.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}

