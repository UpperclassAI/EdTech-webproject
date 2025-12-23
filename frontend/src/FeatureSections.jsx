"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const features = [
  {
    title: "Adaptive AI Learning",
    text: "AI-powered personalized learning paths that adjust to your pace and style.",
    icon: "🤖",
  },
  {
    title: "Global Community",
    text: "Connect with learners and mentors from around the world.",
    icon: "🌎",
  },
  {
    title: "Project-Based Skills",
    text: "Hands-on projects to build real-world experience and confidence.",
    icon: "🚀",
  },
  {
    title: "Flexible Learning",
    text: "Access content anytime, anywhere, on any device.",
    icon: "📱",
  },
];

export default function FeaturesSection() {
  const { theme } = useTheme();

  return (
    <motion.section
      className={`max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-4 gap-8 transition-colors ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-50"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className={`rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 ${
            theme === "dark"
              ? "bg-slate-800 text-gray-200 shadow-slate-900/50"
              : "bg-white text-gray-900 shadow-gray-300"
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {feature.text}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
