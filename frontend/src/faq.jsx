







"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
  },
  {
    question: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    question: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
  },
  {
    question: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    answer:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  },
  {
    question: "Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
    answer:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  },
  {
    question: "Quis autem vel eum iure reprehenderit qui in ea voluptate.",
    answer:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

  const { theme } = useTheme(); // <- get current theme

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq"
      className={`relative w-full py-16 md:py-24 px-6 md:px-20 overflow-hidden transition-colors ${
        theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 rounded-full filter blur-3xl opacity-40 z-0"
        style={{ backgroundColor: theme === "dark" ? "rgba(79,70,229,0.3)" : "rgba(59,130,246,0.3)" }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], transition: { duration: 8, repeat: Infinity, repeatType: "mirror" } }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-40 z-0"
        style={{ backgroundColor: theme === "dark" ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.3)" }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0], transition: { duration: 10, repeat: Infinity, repeatType: "mirror" } }}
      />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
            FA<span className="text-blue-500">Qs</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Have questions? We've got answers. Explore our most common FAQs below.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="md:flex md:gap-12 items-start">
          {/* FAQs Left */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex  border-l-4 border-blue-500 justify-between items-center px-6 py-5 font-medium text-left transition ${
                    theme === "dark" ? "hover:bg-slate-700 text-gray-200" : "hover:bg-blue-50 text-gray-900"
                  }`}
                >
                  {faq.question}
                  <span
                    className={`ml-2 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-6 transition-all duration-500 overflow-hidden ${
                    openIndex === index
                      ? `max-h-40 py-4 opacity-100 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Right */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={isVisible ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="md:w-1/2 mt-8 md:mt-0 flex justify-center"
>
  <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
    
    <img
      src="/assets/faqq.png"
      alt="FAQ Illustration"
      className="w-full h-full object-cover"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/40 to-transparent" />

  </div>
</motion.div>

        </div>








        {/* Newsletter */}
        <div className={`mt-24 text-center py-16 rounded-2xl  border-b-4 border-blue-500 shadow-md transition-colors ${theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-900"}`}>
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Subscribe to get the latest updates directly in your inbox.
          </p>
          <button
            className="flex items-center justify-center mx-auto px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Subscribe <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
