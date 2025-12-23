"use client";

import { motion } from "framer-motion";
import { FaClock, FaUserGraduate, FaSchool } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";

export default function StatsSection() {
  const { theme } = useTheme(); // get current theme

  const stats = [
    {
      icon: <FaClock className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: "20K+",
      label: "Screen Time",
      description: "Hours of quality AI-powered learning",
    },
    {
      icon: <FaUserGraduate className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: "2K+",
      label: "Students Globally",
      description: "From 50+ countries worldwide",
    },
    {
      icon: <FaSchool className={`text-3xl md:text-4xl ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />,
      value: "50+",
      label: "Schools",
      description: "Partner institutions using our platform",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={`w-full py-16 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-slate-900 to-slate-950"
          : "bg-gradient-to-r from-blue-50 to-indigo-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`flex flex-col items-center text-center p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-slate-900/80 border-slate-700"
                  : "bg-white/80 border-blue-100"
              } backdrop-blur-xl`}
            >
              {/* Icon */}
              <div
                className={`mb-6 p-4 rounded-full shadow-md transition-colors duration-300 ${
                  theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <motion.div
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <h3
                className={`text-xl md:text-2xl font-semibold mb-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {stat.label}
              </h3>

              {/* Description */}
              <p
                className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>

              {/* Accent Line */}
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
