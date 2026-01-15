"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeContext";
import FloatingSocialGlass from "../FloatingSocialGlass";


/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------------- PRICING DATA ---------------- */
const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for beginners exploring tech",
    price: { monthly: 49, annual: 39 },
    period: "/month",
    features: [
      "Access to 10+ beginner courses",
      "Basic AI mentor support",
      "Weekly community sessions",
      "Certificate of completion",
      "Limited project access",
    ],
    notIncluded: ["1-on-1 mentorship", "Advanced career guidance", "Custom learning paths"],
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    buttonText: "Start Learning",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious learners building skills",
    price: { monthly: 99, annual: 79 },
    period: "/month",
    popular: true,
    features: [
      "Unlimited course access",
      "Weekly 1-on-1 mentorship",
      "Personalized AI learning path",
      "Real-world project portfolio",
      "Career guidance sessions",
      "Job placement assistance",
      "Industry certification prep",
    ],
    notIncluded: ["Enterprise-level projects", "Direct company introductions"],
    icon: Sparkles,
    color: "from-red-500 to-red-600",
    buttonText: "Go Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams & institutions",
    price: { monthly: "Custom", annual: "Custom" },
    period: "",
    features: [
      "Everything in Pro plan",
      "Dedicated success manager",
      "Custom learning tracks",
      "Team progress analytics",
      "API access for integration",
      "White-label certification",
      "Priority support",
      "Onboarding workshops",
    ],
    notIncluded: [],
    icon: Crown,
    color: "from-gray-800 to-gray-900",
    buttonText: "Contact Sales",
  },
];

/* ---------------- FAQ DATA ---------------- */
const faqs = [
  { question: "Can I switch plans later?", answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately." },
  { question: "Is there a free trial?", answer: "We offer a 14-day free trial on our Starter plan. No credit card required to start." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans." },
  { question: "Do you offer student discounts?", answer: "Yes! Students get 50% off on all individual plans. Email us with your student ID for verification." },
  { question: "Can I get a refund?", answer: "We offer a 30-day money-back guarantee if you're not satisfied with our platform." },
  { question: "Are certificates recognized?", answer: "Our certificates are recognized by 100+ companies and institutions globally." },
];

/* ---------------- HELPER: ALL FEATURES ---------------- */
const allFeatures = Array.from(new Set(pricingTiers.flatMap(tier => tier.features)));

/* ---------------- MAIN COMPONENT ---------------- */
export default function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const [faqOpen, setFaqOpen] = useState(null);
  const { theme } = useTheme();

  const toggleBilling = () => setBilling(billing === "monthly" ? "annual" : "monthly");
  const toggleFaq = index => setFaqOpen(faqOpen === index ? null : index);

  const bgMain = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const cardHoverBg = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"; // Used for cards
  const tableRowHoverBg = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"; // Specific for table rows

  return (
    <div className={`w-full min-h-screen ${bgMain} transition-colors duration-300`}>
      <Navbar />

      {/* HERO */}
      <section className="relative py-40 bg-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center opacity-20" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Simple, Transparent Pricing</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the perfect plan for your learning journey. Everything you need to build in-demand tech skills.
          </p>
          <motion.div 
            variants={fadeUp} 
            className="mt-12 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer select-none"
            onClick={toggleBilling}
          >
            <span className="font-semibold">Billed {billing === "monthly" ? "Monthly" : "Annually"}</span>
            <div className="relative w-14 h-7 bg-blue-500 rounded-full">
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${billing === "monthly" ? "left-1" : "right-1"}`} />
            </div>
            <span className="font-semibold text-blue-200">
              {billing === "monthly" ? "Save 20% with Annual Billing" : "Billed Annually"}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* PRICING CARDS */}
      <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 py-24 -mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} billing={billing} cardBg={cardBg} hoverBg={cardHoverBg} />
          ))}
        </div>
      </motion.section>
 <FloatingSocialGlass />
      {/* COMPARISON TABLE */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Compare Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See exactly what each plan offers</p>
        </div>
      <div className="bg-black dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
  <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
    <div className="p-6 font-semibold bg-blue-100 dark:bg-gray-900 text-gray-900 dark:text-white">Feature</div>
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={`p-6 text-center font-semibold ${tier.popular ? "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900" : tier.id === "enterprise" ? "text-gray-800 dark:text-gray-100" : tier.id === "starter" ? "text-blue-600 dark:text-blue-400" : ""}`}>
                {tier.name}
              </div>
            ))}
          </div>
          {allFeatures.map((feature, idx) => (
            <div key={idx} className={`grid grid-cols-4 border-b ${tableRowHoverBg}`}>
              <div className="p-6 font-medium text-gray-700 dark:text-gray-300">{feature}</div>
              {pricingTiers.map((tier, i) => (
                <div key={i} className="p-6 text-center">
                  {tier.features.includes(feature) ? <Check className="w-6 h-6 text-green-500 mx-auto" /> : <X className="w-6 h-6 text-gray-300 dark:text-gray-500 mx-auto" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300">Get answers to common questions about our pricing</p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeIn} className={`${cardBg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer ${cardHoverBg}`} onClick={() => toggleFaq(index)}>
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              {faqOpen === index && <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

/* ---------------- PRICING CARD COMPONENT ---------------- */
function PricingCard({ tier, index, billing, cardBg, hoverBg }) {
  const Icon = tier.icon;
  const price = tier.price[billing] || tier.price.monthly || tier.price.annual;

  return (
    <motion.div variants={scaleUp} transition={{ delay: index * 0.1 }} className={`relative rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${cardBg} ${hoverBg}`}>
      {tier.popular && (
        <div className="absolute top-0 right-6 bg-red-500 to-blue-500 text-white px-6 py-2 rounded-b-lg font-semibold">
          MOST POPULAR
        </div>
      )}
      <div className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{tier.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{tier.description}</p>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{price}</span>
            <span className="text-gray-500 dark:text-gray-300">{tier.period}</span>
          </div>
          {tier.price !== "Custom" && <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">Billed {billing}</p>}
        </div>
        <button className={`w-full py-4 rounded-full font-semibold mb-8 transition ${tier.popular ? "bg-red-500 to-blue-500 text-white hover:from-purple-600 hover:to-indigo-600" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"}`}>
          {tier.buttonText}
        </button>
        <div className="space-y-4">
          <h4 className="font-semibold mb-2">What's included:</h4>
          {tier.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
          {tier.notIncluded.length > 0 && (
            <>
              <h4 className="font-semibold mt-6 mb-2">Not included:</h4>
              {tier.notIncluded.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 opacity-60">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}