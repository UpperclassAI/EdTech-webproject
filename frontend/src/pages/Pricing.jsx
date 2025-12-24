// "use client";

// import { motion } from "framer-motion";
// import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
// import Navbar from "../Navbar";
// import Footer from "../footer";

// /* ---------------- ANIMATIONS ---------------- */
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
// };

// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
// };

// /* ---------------- PRICING DATA ---------------- */
// const pricingTiers = [
//   {
//     id: "standard",
//     name: "Standard",
//     price: "$25",
//     description: "Perfect for beginners",
//     features: [
//       "Beginner courses access",
//       "Basic AI tutor",
//       "Standard progress tracking",
//       "Downloadable notes",
//       "Community forum",
//       "Beginner certificates",
//     ],
//     icon: Zap,
//   },
//   {
//     id: "plus",
//     name: "Plus",
//     price: "$72",
//     description: "Best for growing developers",
//     popular: true,
//     features: [
//       "Everything in Standard",
//       "Project workspace feedback",
//       "Advanced courses",
//       "Monthly mentorship",
//       "Priority email support",
//       "All certificates",
//     ],
//     icon: Sparkles,
//   },
//   {
//     id: "premium",
//     name: "Premium",
//     price: "$135",
//     description: "For professionals",
//     features: [
//       "Everything in Plus",
//       "Portfolio building",
//       "1-on-1 mentorship",
//       "Offline downloads",
//       "Weekly masterclasses",
//     ],
//     icon: Crown,
//   },
// ];

// /* ---------------- FAQ ---------------- */
// const faqs = [
//   {
//     q: "Can I switch plans later?",
//     a: "Yes, you can upgrade or downgrade anytime.",
//   },
//   {
//     q: "Is there a free trial?",
//     a: "Yes, we offer a 14-day free trial.",
//   },
//   {
//     q: "Do you offer refunds?",
//     a: "We provide a 30-day money-back guarantee.",
//   },
// ];

// export default function Pricing() {
//   return (
//     <div className="min-h-screen bg-[#050b18] text-white">
//       <Navbar />

//       {/* HERO */}
//       <section className="relative py-40 bg-gradient-to-br from-black via-blue-900 to-indigo-900 text-center">
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="max-w-5xl mx-auto px-6"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold">
//             Here is what our <span className="text-blue-400">Pricing</span> Looks like
//           </h1>
//           <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
//             Transparent and flexible pricing designed to fit your learning journey.
//           </p>
//         </motion.div>
//       </section>

//       {/* PRICING CARDS */}
//       <motion.section
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="-mt-32 max-w-7xl mx-auto px-6 pb-32"
//       >
//         <div className="grid md:grid-cols-3 gap-8">
//           {pricingTiers.map((tier, i) => (
//             <PricingCard key={tier.id} tier={tier} index={i} />
//           ))}
//         </div>
//       </motion.section>

//       {/* COMPARISON */}
//       <section className="max-w-6xl mx-auto px-6 py-24">
//         <h2 className="text-3xl font-bold text-center mb-12">Compare Features</h2>
//         <div className="overflow-hidden rounded-2xl border border-white/10">
//           {[
//             "Course Access",
//             "Mentorship",
//             "Projects",
//             "Certificates",
//             "Priority Support",
//           ].map((f, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-4 text-center border-b border-white/10"
//             >
//               <div className="p-5 text-left">{f}</div>
//               <Cell yes={i < 3} />
//               <Cell yes />
//               <Cell yes />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* VALUE */}
//       <section className="bg-gradient-to-br from-blue-600/20 to-indigo-900/10 py-32">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
//           <Value stat="10K+" label="Active Learners" />
//           <Value stat="92%" label="Job Placement" />
//           <Value stat="+65%" label="Salary Increase" />
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="max-w-4xl mx-auto px-6 py-24">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Frequently Asked Questions
//         </h2>
//         <div className="space-y-6">
//           {faqs.map((f, i) => (
//             <div
//               key={i}
//               className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-6"
//             >
//               <h4 className="font-semibold mb-2">{f.q}</h4>
//               <p className="text-blue-200 text-sm">{f.a}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-center">
//         <h2 className="text-4xl font-extrabold mb-6">
//           Ready to Transform Your Career?
//         </h2>
//         <p className="text-blue-200 mb-10">
//           Join thousands building real-world tech skills.
//         </p>
//         <div className="flex justify-center gap-6 flex-wrap">
//           <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:scale-105 transition">
//             Start Free Trial
//           </button>
//           <button className="border border-white px-10 py-4 rounded-full hover:bg-white/10 transition">
//             Schedule Demo
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */
// function PricingCard({ tier, index }) {
//   const Icon = tier.icon;

//   return (
//     <motion.div
//       variants={scaleUp}
//       transition={{ delay: index * 0.1 }}
//       className={`relative rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8
//       hover:-translate-y-2 transition
//       ${tier.popular ? "scale-105 border-blue-500" : "opacity-80"}`}
//     >
//       {tier.popular && (
//         <span className="absolute -top-4 right-6 bg-blue-600 px-4 py-1 rounded-full text-sm">
//           Recommended
//         </span>
//       )}

//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
//           <Icon className="text-white" />
//         </div>
//         <div>
//           <h3 className="font-bold text-xl">{tier.name}</h3>
//           <p className="text-blue-200 text-sm">{tier.description}</p>
//         </div>
//       </div>

//       <div className="text-4xl font-bold mb-6">{tier.price}</div>

//       <button
//         className={`w-full py-3 rounded-lg font-semibold mb-6
//         ${tier.popular ? "bg-blue-600" : "bg-white/20 hover:bg-white/30"}`}
//       >
//         Get it Now
//       </button>

//       <div className="space-y-3">
//         {tier.features.map((f, i) => (
//           <div key={i} className="flex gap-3 text-sm">
//             <Check className="text-blue-400 w-4 h-4 mt-1" />
//             {f}
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// function Cell({ yes }) {
//   return (
//     <div className="p-5 flex justify-center">
//       {yes ? (
//         <Check className="text-green-400" />
//       ) : (
//         <X className="text-white/30" />
//       )}
//     </div>
//   );
// }

// function Value({ stat, label }) {
//   return (
//     <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/10">
//       <div className="text-4xl font-bold text-blue-400 mb-2">{stat}</div>
//       <p className="text-blue-200">{label}</p>
//     </div>
//   );
// }

















// "use client";

// import { motion } from "framer-motion";
// import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
// import Navbar from "../Navbar";
// import Footer from "../footer";

// /* ---------------- ANIMATION VARIANTS ---------------- */
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.6 } },
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
// };

// /* ---------------- PRICING TIER DATA ---------------- */
// const pricingTiers = [
//   {
//     id: "starter",
//     name: "Starter",
//     description: "Perfect for beginners exploring tech",
//     price: "$49",
//     period: "/month",
//     features: [
//       "Access to 10+ beginner courses",
//       "Basic AI mentor support",
//       "Weekly community sessions",
//       "Certificate of completion",
//       "Limited project access",
//     ],
//     notIncluded: [
//       "1-on-1 mentorship",
//       "Advanced career guidance",
//       "Custom learning paths",
//     ],
//     icon: Zap,
//     color: "from-blue-500 to-blue-600",
//     buttonText: "Start Learning",
//   },
//   {
//     id: "pro",
//     name: "Pro",
//     description: "For serious learners building skills",
//     price: "$99",
//     period: "/month",
//     popular: true,
//     features: [
//       "Unlimited course access",
//       "Weekly 1-on-1 mentorship",
//       "Personalized AI learning path",
//       "Real-world project portfolio",
//       "Career guidance sessions",
//       "Job placement assistance",
//       "Industry certification prep",
//     ],
//     notIncluded: [
//       "Enterprise-level projects",
//       "Direct company introductions",
//     ],
//     icon: Sparkles,
//     color: "from-purple-500 to-indigo-600",
//     buttonText: "Go Pro",
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     description: "For teams & institutions",
//     price: "Custom",
//     period: "",
//     features: [
//       "Everything in Pro plan",
//       "Dedicated success manager",
//       "Custom learning tracks",
//       "Team progress analytics",
//       "API access for integration",
//       "White-label certification",
//       "Priority support",
//       "Onboarding workshops",
//     ],
//     notIncluded: [],
//     icon: Crown,
//     color: "from-gray-800 to-gray-900",
//     buttonText: "Contact Sales",
//   },
// ];

// /* ---------------- FAQ DATA ---------------- */
// const faqs = [
//   {
//     question: "Can I switch plans later?",
//     answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
//   },
//   {
//     question: "Is there a free trial?",
//     answer: "We offer a 14-day free trial on our Starter plan. No credit card required to start.",
//   },
//   {
//     question: "What payment methods do you accept?",
//     answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
//   },
//   {
//     question: "Do you offer student discounts?",
//     answer: "Yes! Students get 50% off on all individual plans. Email us with your student ID for verification.",
//   },
//   {
//     question: "Can I get a refund?",
//     answer: "We offer a 30-day money-back guarantee if you're not satisfied with our platform.",
//   },
//   {
//     question: "Are certificates recognized?",
//     answer: "Our certificates are recognized by 100+ companies and institutions globally.",
//   },
// ];

// export default function Pricing() {
//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="relative text-white py-40 bg-blue-900 ">
//         <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center opacity-20" />
        
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="relative z-10 max-w-6xl mx-auto px-6 text-center"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             Simple, Transparent Pricing
//           </h1>
          
//           <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
//             Choose the perfect plan for your learning journey. 
//             Everything you need to build in-demand tech skills.
//           </p>
          
//           <motion.div 
//             variants={fadeUp}
//             className="mt-12 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
//           >
//             <span className="font-semibold">Billed Monthly</span>
//             <div className="relative w-14 h-7 bg-blue-500 rounded-full cursor-pointer">
//               <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
//             </div>
//             <span className="font-semibold text-blue-200">
//               Save 20% with Annual Billing
//             </span>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* PRICING CARDS */}
//       <motion.section
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="max-w-7xl mx-auto px-6 py-24 -mt-20"
//       >
//         <div className="grid md:grid-cols-3 gap-8 ">
//           {pricingTiers.map((tier, index) => (
//             <PricingCard key={tier.id} tier={tier} index={index} />
//           ))}
//         </div>
//       </motion.section>

//       {/* COMPARISON TABLE */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="max-w-6xl mx-auto px-6 py-20"
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Compare Features
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             See exactly what each plan offers to make the right choice
//           </p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="grid grid-cols-4 border-b">
//             <div className="p-6 font-semibold bg-blue-100 text-black">Feature</div>
//             <div className="p-6 text-center font-semibold text-blue-600">Starter</div>
//             <div className="p-6 text-center font-semibold text-purple-600 bg-purple-50">Pro</div>
//             <div className="p-6 text-center font-semibold text-gray-800">Enterprise</div>
//           </div>

//           {[
//             "Course Access",
//             "1-on-1 Mentorship",
//             "AI Learning Path",
//             "Real Projects",
//             "Career Support",
//             "Certification",
//             "API Access",
//             "Priority Support",
//           ].map((feature, idx) => (
//             <div key={idx} className="grid grid-cols-4 border-b hover:bg-gray-50">
//               <div className="p-6 font-medium text-gray-700">{feature}</div>
//               <div className="p-6 text-center">
//                 {idx < 4 ? <Check className="w-6 h-6 text-green-500 mx-auto" /> : <X className="w-6 h-6 text-gray-300 mx-auto" />}
//               </div>
//               <div className="p-6 text-center bg-purple-50">
//                 {idx < 6 ? <Check className="w-6 h-6 text-green-500 mx-auto" /> : <X className="w-6 h-6 text-gray-300 mx-auto" />}
//               </div>
//               <div className="p-6 text-center">
//                 <Check className="w-6 h-6 text-green-500 mx-auto" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.section>

//       {/* VALUE PROPOSITION */}
//       <section className="relative py-32 bg-gradient-to-br from-blue-500/70 to-indigo-50">
//         <div className="absolute inset-0 bg-[url('/assets/ghj.png')] bg-cover bg-center opacity-10" />
        
//         <motion.div
//           variants={stagger}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="relative z-10 max-w-6xl mx-auto px-6"
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               More Than Just a Price Tag
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Your investment in learning comes with lifelong benefits
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <ValueCard
//               title="Community Access"
//               description="Join 10,000+ learners, mentors, and industry experts"
//               stat="10K+"
//             />
//             <ValueCard
//               title="Job Placement Rate"
//               description="of our Pro graduates land jobs within 3 months"
//               stat="92%"
//             />
//             <ValueCard
//               title="Average Salary Increase"
//               description="reported by graduates after completing our programs"
//               stat="+65%"
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* FAQ SECTION */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="max-w-4xl mx-auto px-6 py-24"
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-gray-600">
//             Get answers to common questions about our pricing
//           </p>
//         </div>

//         <div className="space-y-6">
//           {faqs.map((faq, index) => (
//             <motion.div
//               key={index}
//               variants={fadeIn}
//               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                 {faq.question}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {faq.answer}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* FINAL CTA */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
//       >
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-extrabold mb-6">
//             Ready to Transform Your Career?
//           </h2>
          
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
//             Join thousands of learners who have accelerated their careers with Upperclass AI.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:scale-105 transition">
//               Start 14-Day Free Trial
//             </button>
            
//             <button className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition">
//               Schedule a Demo
//             </button>
//           </div>
          
//           <p className="mt-8 text-blue-200">
//             Need help choosing? <a href="#" className="underline font-semibold">Chat with our team</a>
//           </p>
//         </div>
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }

// /* ---------------- PRICING CARD COMPONENT ---------------- */
// function PricingCard({ tier, index }) {
//   const Icon = tier.icon;
  
//   return (
//     <motion.div
//       variants={scaleUp}
//       transition={{ delay: index * 0.1 }}
//       className={`relative rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${
//         tier.popular ? "ring-2 ring-purple-500" : ""
//       }`}
//     >
//       {tier.popular && (
//         <div className="absolute top-0 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-b-lg font-semibold">
//           MOST POPULAR
//         </div>
//       )}
      
//       <div className="p-10 bg-white">
//         <div className="flex items-center gap-4 mb-6">
//           <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
//             <Icon className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
//             <p className="text-gray-600 text-sm">{tier.description}</p>
//           </div>
//         </div>

//         <div className="mb-8">
//           <div className="flex items-baseline gap-2">
//             <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
//             <span className="text-gray-500">{tier.period}</span>
//           </div>
//           {tier.price !== "Custom" && (
//             <p className="text-gray-500 text-sm mt-2">Billed monthly</p>
//           )}
//         </div>

//         <button
//           className={`w-full py-4 rounded-full font-semibold mb-8 transition ${
//             tier.popular
//               ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
//               : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
//           }`}
//         >
//           {tier.buttonText}
//         </button>

//         <div className="space-y-4">
//           <h4 className="font-semibold text-gray-900">What's included:</h4>
//           {tier.features.map((feature, idx) => (
//             <div key={idx} className="flex items-start gap-3">
//               <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//               <span className="text-gray-700">{feature}</span>
//             </div>
//           ))}
          
//           {tier.notIncluded.length > 0 && (
//             <>
//               <h4 className="font-semibold text-gray-900 mt-6">Not included:</h4>
//               {tier.notIncluded.map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-3 opacity-60">
//                   <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
//                   <span className="text-gray-600">{feature}</span>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ---------------- VALUE CARD COMPONENT ---------------- */
// function ValueCard({ title, description, stat }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       className="bg-white rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow"
//     >
//       <div className="text-5xl font-bold text-blue-600 mb-4">{stat}</div>
//       <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </motion.div>
//   );
// }










// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
// import Navbar from "../Navbar";
// import Footer from "../footer";
// import { useTheme } from "../context/ThemeContext";

// /* ---------------- ANIMATION VARIANTS ---------------- */
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.6 } },
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
// };

// /* ---------------- PRICING TIER DATA ---------------- */
// const pricingTiers = [
//   {
//     id: "starter",
//     name: "Starter",
//     description: "Perfect for beginners exploring tech",
//     price: { monthly: 49, annual: 39 },
//     period: "/month",
//     features: [
//       "Access to 10+ beginner courses",
//       "Basic AI mentor support",
//       "Weekly community sessions",
//       "Certificate of completion",
//       "Limited project access",
//     ],
//     notIncluded: [
//       "1-on-1 mentorship",
//       "Advanced career guidance",
//       "Custom learning paths",
//     ],
//     icon: Zap,
//     color: "from-blue-500 to-blue-600",
//     buttonText: "Start Learning",
//   },
//   {
//     id: "pro",
//     name: "Pro",
//     description: "For serious learners building skills",
//     price: { monthly: 99, annual: 79 },
//     period: "/month",
//     popular: true,
//     features: [
//       "Unlimited course access",
//       "Weekly 1-on-1 mentorship",
//       "Personalized AI learning path",
//       "Real-world project portfolio",
//       "Career guidance sessions",
//       "Job placement assistance",
//       "Industry certification prep",
//     ],
//     notIncluded: [
//       "Enterprise-level projects",
//       "Direct company introductions",
//     ],
//     icon: Sparkles,
//     color: "from-purple-500 to-indigo-600",
//     buttonText: "Go Pro",
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     description: "For teams & institutions",
//     price: { monthly: "Custom", annual: "Custom" },
//     period: "",
//     features: [
//       "Everything in Pro plan",
//       "Dedicated success manager",
//       "Custom learning tracks",
//       "Team progress analytics",
//       "API access for integration",
//       "White-label certification",
//       "Priority support",
//       "Onboarding workshops",
//     ],
//     notIncluded: [],
//     icon: Crown,
//     color: "from-gray-800 to-gray-900",
//     buttonText: "Contact Sales",
//   },
// ];

// /* ---------------- FAQ DATA ---------------- */
// const faqs = [
//   {
//     question: "Can I switch plans later?",
//     answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
//   },
//   {
//     question: "Is there a free trial?",
//     answer: "We offer a 14-day free trial on our Starter plan. No credit card required to start.",
//   },
//   {
//     question: "What payment methods do you accept?",
//     answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
//   },
//   {
//     question: "Do you offer student discounts?",
//     answer: "Yes! Students get 50% off on all individual plans. Email us with your student ID for verification.",
//   },
//   {
//     question: "Can I get a refund?",
//     answer: "We offer a 30-day money-back guarantee if you're not satisfied with our platform.",
//   },
//   {
//     question: "Are certificates recognized?",
//     answer: "Our certificates are recognized by 100+ companies and institutions globally.",
//   },
// ];

// /* ---------------- HELPER: GET ALL UNIQUE FEATURES ---------------- */
// const allFeatures = Array.from(
//   new Set(pricingTiers.flatMap(tier => tier.features))
// );

// /* ---------------- MAIN COMPONENT ---------------- */
// export default function Pricing() {
//   const [billing, setBilling] = useState("monthly"); // monthly / annual
//   const [faqOpen, setFaqOpen] = useState(null);
//   const { theme } = useTheme();

//   const toggleBilling = () => setBilling(billing === "monthly" ? "annual" : "monthly");
//   const toggleFaq = (index) => setFaqOpen(faqOpen === index ? null : index);

//   return (
//     <div className={`w-full min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="relative text-white py-40 bg-blue-900">
//         <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center opacity-20" />
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="relative z-10 max-w-6xl mx-auto px-6 text-center"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             Simple, Transparent Pricing
//           </h1>
//           <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
//             Choose the perfect plan for your learning journey. Everything you need to build in-demand tech skills.
//           </p>
//           <motion.div 
//             variants={fadeUp}
//             className="mt-12 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 cursor-pointer select-none"
//             onClick={toggleBilling}
//           >
//             <span className="font-semibold">Billed {billing === "monthly" ? "Monthly" : "Annually"}</span>
//             <div className="relative w-14 h-7 bg-blue-500 rounded-full">
//               <div
//                 className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
//                   billing === "monthly" ? "left-1" : "right-1"
//                 }`}
//               />
//             </div>
//             <span className="font-semibold text-blue-200">
//               {billing === "monthly" ? "Save 20% with Annual Billing" : "Billed Annually"}
//             </span>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* PRICING CARDS */}
//       <motion.section
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="max-w-7xl mx-auto px-6 py-24 -mt-20"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {pricingTiers.map((tier, index) => (
//             <PricingCard
//               key={tier.id}
//               tier={tier}
//               index={index}
//               billing={billing}
//             />
//           ))}
//         </div>
//       </motion.section>

//       {/* COMPARISON TABLE */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="max-w-6xl mx-auto px-6 py-20"
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Features</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">See exactly what each plan offers</p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <div className="grid grid-cols-4 border-b">
//             <div className="p-6 font-semibold bg-blue-100 text-black">Feature</div>
//             {pricingTiers.map((tier, idx) => (
//               <div
//                 key={idx}
//                 className={`p-6 text-center font-semibold ${
//                   tier.popular ? "text-purple-600 bg-purple-50" : tier.id === "enterprise" ? "text-gray-800" : tier.id === "starter" ? "text-blue-600" : ""
//                 }`}
//               >
//                 {tier.name}
//               </div>
//             ))}
//           </div>

//           {allFeatures.map((feature, idx) => (
//             <div key={idx} className="grid grid-cols-4 border-b hover:bg-gray-50">
//               <div className="p-6 font-medium text-gray-700">{feature}</div>
//               {pricingTiers.map((tier, i) => (
//                 <div key={i} className="p-6 text-center">
//                   {tier.features.includes(feature) ? (
//                     <Check className="w-6 h-6 text-green-500 mx-auto" />
//                   ) : (
//                     <X className="w-6 h-6 text-gray-300 mx-auto" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </motion.section>

//       {/* VALUE PROPOSITION */}
//       <section className="relative py-32 bg-gradient-to-br from-blue-500/70 to-indigo-50">
//         <div className="absolute inset-0 bg-[url('/assets/ghj.png')] bg-cover bg-center opacity-10" />
//         <motion.div
//           variants={stagger}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="relative z-10 max-w-6xl mx-auto px-6"
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">More Than Just a Price Tag</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Your investment in learning comes with lifelong benefits</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <ValueCard
//               title="Community Access"
//               description="Join 10,000+ learners, mentors, and industry experts"
//               stat="10K+"
//             />
//             <ValueCard
//               title="Job Placement Rate"
//               description="of our Pro graduates land jobs within 3 months"
//               stat="92%"
//             />
//             <ValueCard
//               title="Average Salary Increase"
//               description="reported by graduates after completing our programs"
//               stat="+65%"
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* FAQ SECTION */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="max-w-4xl mx-auto px-6 py-24"
//       >
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
//           <p className="text-gray-600">Get answers to common questions about our pricing</p>
//         </div>

//         <div className="space-y-6">
//           {faqs.map((faq, index) => (
//             <motion.div
//               key={index}
//               variants={fadeIn}
//               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//               onClick={() => toggleFaq(index)}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
//                 <span>{faqOpen === index ? "-" : "+"}</span>
//               </div>
//               <AnimatePresence>
//                 {faqOpen === index && (
//                   <motion.p
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } }}
//                     exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
//                     className="text-gray-600 mt-4 overflow-hidden"
//                   >
//                     {faq.answer}
//                   </motion.p>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* FINAL CTA */}
//       <motion.section
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
//       >
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-extrabold mb-6">Ready to Transform Your Career?</h2>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
//             Join thousands of learners who have accelerated their careers with Upperclass AI.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold transition-transform"
//             >
//               Start 14-Day Free Trial
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-transform"
//             >
//               Schedule a Demo
//             </motion.button>
//           </div>

//           <p className="mt-8 text-blue-200">
//             Need help choosing? <a href="#" className="underline font-semibold">Chat with our team</a>
//           </p>
//         </div>
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }

// /* ---------------- PRICING CARD ---------------- */
// function PricingCard({ tier, index, billing }) {
//   const Icon = tier.icon;
//   const price = tier.price[billing] ?? tier.price.monthly;

//   return (
//     <motion.div
//       variants={scaleUp}
//       transition={{ delay: index * 0.1 }}
//       className={`relative rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 hover:shadow-3xl transition-all duration-300 ${
//         tier.popular ? "ring-2 ring-purple-500 scale-105" : ""
//       }`}
//     >
//       {tier.popular && (
//         <div className="absolute top-0 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-b-lg font-semibold">
//           MOST POPULAR
//         </div>
//       )}

//       <div className="p-10 bg-white">
//         <div className="flex items-center gap-4 mb-6">
//           <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
//             <Icon className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
//             <p className="text-gray-600 text-sm">{tier.description}</p>
//           </div>
//         </div>

//         <div className="mb-8">
//           <div className="flex items-baseline gap-2">
//             <span className="text-5xl font-bold text-gray-900">{price}</span>
//             <span className="text-gray-500">{tier.period}</span>
//           </div>
//           {price !== "Custom" && (
//             <p className="text-gray-500 text-sm mt-2">Billed {billing}</p>
//           )}
//         </div>

//         <button
//           className={`w-full py-4 rounded-full font-semibold mb-8 transition ${
//             tier.popular
//               ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
//               : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
//           }`}
//         >
//           {tier.buttonText}
//         </button>

//         <div className="space-y-4">
//           <h4 className="font-semibold text-gray-900">What's included:</h4>
//           {tier.features.map((feature, idx) => (
//             <div key={idx} className="flex items-start gap-3">
//               <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//               <span className="text-gray-700">{feature}</span>
//             </div>
//           ))}

//           {tier.notIncluded.length > 0 && (
//             <>
//               <h4 className="font-semibold text-gray-900 mt-6">Not included:</h4>
//               {tier.notIncluded.map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-3 opacity-60">
//                   <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
//                   <span className="text-gray-600">{feature}</span>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ---------------- VALUE CARD ---------------- */
// function ValueCard({ title, description, stat }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       className="bg-white rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow"
//     >
//       <div className="text-5xl font-bold text-blue-600 mb-4">{stat}</div>
//       <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </motion.div>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Crown } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeContext";

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
    color: "from-purple-500 to-indigo-600",
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
  const hoverBg = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";

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
            <PricingCard key={tier.id} tier={tier} index={index} billing={billing} cardBg={cardBg} hoverBg={hoverBg} />
          ))}
        </div>
      </motion.section>

      {/* COMPARISON TABLE */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Compare Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See exactly what each plan offers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-4 border-b">
            <div className="p-6 font-semibold bg-blue-100 text-black dark:bg-gray-700 dark:text-white">Feature</div>
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={`p-6 text-center font-semibold ${tier.popular ? "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900" : tier.id === "enterprise" ? "text-gray-800 dark:text-gray-100" : tier.id === "starter" ? "text-blue-600 dark:text-blue-400" : ""}`}>
                {tier.name}
              </div>
            ))}
          </div>
          {allFeatures.map((feature, idx) => (
            <div key={idx} className={`grid grid-cols-4 border-b ${hoverBg}`}>
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
            <motion.div key={index} variants={fadeIn} className={`${cardBg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer`} onClick={() => toggleFaq(index)}>
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
        <div className="absolute top-0 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-b-lg font-semibold">
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
        <button className={`w-full py-4 rounded-full font-semibold mb-8 transition ${tier.popular ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"}`}>
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
