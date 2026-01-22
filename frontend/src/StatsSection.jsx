"use client";

import { motion, useInView } from "framer-motion";
import { FaClock, FaUserGraduate, FaSchool } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplayValue(current);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { theme } = useTheme();

  const stats = [
    {
      icon: <FaClock className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: 20,
      suffix: "K+",
      label: "Screen Time",
      description: "Hours of quality AI-powered learning",
    },
    {
      icon: <FaUserGraduate className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: 2,
      suffix: "K+",
      label: "Students Globally",
      description: "From 50+ countries worldwide",
    },
    {
      icon: <FaSchool className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: 50,
      suffix: "+",
      label: "Schools",
      description: "Partner institutions using our platform",
    },
  ];

  return (
    <section
      className={`w-full py-20 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-slate-900 to-slate-950"
          : "bg-gradient-to-r from-blue-50 to-indigo-50"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -10 }}
            className={`flex flex-col items-center text-center p-8 md:p-10 rounded-2xl border backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all ${
              theme === "dark"
                ? "bg-slate-900/80 border-slate-700"
                : "bg-white/80 border-blue-100"
            }`}
          >
            {/* Icon */}
            <div className={`mb-6 p-4 rounded-full ${
              theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
            }`}>
              {stat.icon}
            </div>

            {/* Animated Number */}
            <div
              className={`text-5xl md:text-6xl font-extrabold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>

            {/* Label */}
            <h3
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {stat.label}
            </h3>

            {/* Description */}
            <p
              className={`text-base md:text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stat.description}
            </p>

            {/* Accent */}
            <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
