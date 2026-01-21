"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaRobot, 
  FaPalette, 
  FaBullhorn, 
  FaCode, 
  FaMobileAlt, 
  FaBrain,
  FaArrowRight
} from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";

export default function OurCourses() {
  const { theme } = useTheme();

  const courses = [
    { 
      id: 1, 
      title: "Machine Learning", 
      icon: <FaRobot className="text-3xl" />, 
      description: "Learn AI algorithms and data science",
      summary: "Master neural networks, predictive modeling, and data analysis techniques used in industry today."
    },
    { 
      id: 2, 
      title: "UI/UX", 
      icon: <FaPalette className="text-3xl" />, 
      description: "Design beautiful user interfaces",
      summary: "Learn user-centered design principles, wireframing, prototyping, and usability testing."
    },
    { 
      id: 3, 
      title: "Digital Marketing", 
      icon: <FaBullhorn className="text-3xl" />, 
      description: "Master online marketing strategies",
      summary: "Explore SEO, social media marketing, content strategy, and analytics to grow businesses online."
    },
    { 
      id: 4, 
      title: "Web Development", 
      icon: <FaCode className="text-3xl" />, 
      description: "Build modern web applications",
      summary: "Full-stack development with React, Node.js, databases, and deployment strategies for modern web apps."
    },
    { 
      id: 5, 
      title: "App Development", 
      icon: <FaMobileAlt className="text-3xl" />, 
      description: "Create mobile applications",
      summary: "Build native and cross-platform mobile apps for iOS and Android using industry-standard tools."
    },
    { 
      id: 6, 
      title: "AI Prompt", 
      icon: <FaBrain className="text-3xl" />, 
      description: "Master AI prompt engineering",
      summary: "Learn advanced techniques for crafting effective prompts to maximize AI model performance."
    }
  ];

  return (
    <div className={`relative w-full py-16 md:py-24 px-6 md:px-20 overflow-hidden transition-colors ${
      theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-white text-black"
    }`}>

      {/* Animated Blur Circle */}
      <motion.div
        className={`absolute top-0 right-0 w-172 h-172 rounded-full filter blur-3xl opacity-40 z-1 ${
          theme === "dark" ? "bg-blue-900/50" : "bg-blue-400/50"
        }`}
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          transition: { duration: 6, repeat: Infinity, repeatType: "mirror" }
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            Our <span className="text-blue-500">Courses</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Discover our comprehensive range of courses designed to help you master 
            the most in-demand skills in today's digital world.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg flex flex-col items-center text-center px-4 py-6 sm:px-6 sm:py-8 transition-all duration-300 cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-900 shadow-slate-900/50 text-gray-200 border border-slate-700"
                  : "bg-blue-500 shadow-lg text-white"
              }`}
            >
              {/* Icon */}
              <div className={`mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-blue-900 text-blue-400" : "bg-white text-blue-500"
              }`}>
                {course.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">{course.title}</h3>

              {/* Description */}
              <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${theme === "dark" ? "text-gray-300" : "text-white"}`}>
                {course.description}
              </p>

              {/* Hover Summary */}
              <div className={`
                absolute inset-0 rounded-2xl p-6 flex flex-col justify-center items-center
                transition-all duration-300 transform
                opacity-0 group-hover:opacity-100
                ${theme === "dark" 
                  ? "bg-slate-800/95 backdrop-blur-sm" 
                  : "bg-white/95 backdrop-blur-sm text-black"
                }
              `}>
                <h4 className="text-xl font-bold mb-4">Course Overview</h4>
                <p className="text-sm md:text-base leading-relaxed px-4">
                  {course.summary}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                theme === "dark" ? "bg-blue-600" : "bg-blue-700"
              }`} />
            </motion.div>
          ))}
        </div>

        {/* More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/course">
            <button className={`group relative px-10 py-4 text-lg font-semibold rounded-full shadow-lg overflow-hidden transition-all duration-300 ${
              theme === "dark"
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-red-600 text-white hover:bg-blue-700"
            }`}>
              <span className="relative z-10 flex items-center justify-center">
                More Courses
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </Link>

          <p className={`mt-6 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
            Explore our complete course catalog
          </p>
        </motion.div>
      </div>
    </div>
  );
}