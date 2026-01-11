import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Crown, RocketLaunch, Check } from "phosphor-react";

const plans = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    period: "/session",
    icon: Star,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Access to EduDarshi webinars",
      "Limited exam solutions",
      "Weekly exam alerts",
      "Starter study resources",
      "Basic community access",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Basic Plan",
    price: "₹499",
    period: "/session",
    icon: Crown,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Unlimited webinars + workshops",
      "Complete solutions library",
      "Personalized weekly alerts",
      "Focused notes & guides",
      "Adaptive mock tests",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Personalised Plan",
    price: "₹999",
    period: "/session",
    icon: RocketLaunch,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    features: [
      "All-access webinars & workshops",
      "On-demand expert discussions",
      "1:1 application guidance",
      "Dedicated mentor support",
      "Career portfolio development",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Our Services
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your academic journey
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-purple-500" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-4 mb-6 shadow-lg`}
                >
                  <Icon size={32} weight="fill" className="text-white" />
                </motion.div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>

             {/* Price */}
<div className="mb-6">
  {plan.id === "premium" ? (
    <>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-400 line-through">
          ₹499
        </span>
        <span className="text-slate-500 text-sm">{plan.period}</span>
      </div>

      <div className="mt-1">
        <span className="inline-block px-3 py-1 rounded-full
          bg-gradient-to-r from-purple-500 to-pink-500
          text-white text-xs font-semibold shadow-md">
          🎉 Registration FREE till March
        </span>
      </div>
    </>
  ) : (
    <>
      <span className="text-4xl font-bold text-slate-900">
        {plan.price}
      </span>
      <span className="text-slate-500 text-sm">{plan.period}</span>
    </>
  )}
</div>


                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5`}>
                        <Check size={12} weight="bold" className="text-white" />
                      </div>
                      <span className="text-slate-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => navigate(`/plans/${plan.id}`)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
