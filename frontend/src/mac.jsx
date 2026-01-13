"use client";

import { motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

export default function EnhancedLogoMarquee() {
  const { theme } = useTheme();

  // Create an array of 5 logos
  const logos = Array(5).fill("/assets/logo.png");

  return (
    <motion.section
      className={`w-full py-20 transition-colors overflow-hidden ${
        theme === "dark" ? "bg-gradient-to-b from-slate-900 to-slate-950" : "bg-gradient-to-b from-blue-50 to-indigo-50"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text)]"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Top <span className=" text-blue-500">Institutions</span>
          </motion.h3>
          <motion.p 
            className="text-lg md:text-xl text-black dark:text-gray-500 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our platform is recognized and used by leading educational institutions worldwide
          </motion.p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden mb-20">
          {/* Gradient Overlays - Responsive */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 lg:w-32 z-10 bg-gradient-to-r from-[var(--card)] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 lg:w-32 z-10 bg-gradient-to-l from-[var(--card)] to-transparent" />

          {/* First Marquee - Scroll Left */}
          <motion.div
            className="flex gap-8 md:gap-16 mb-8"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-16 md:w-48 md:h-24 lg:w-56 lg:h-28 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Partner Logo"
                  className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>

          {/* Second Marquee - Scroll Right */}
          <motion.div
            className="flex gap-8 md:gap-16"
            animate={{
              x: ["-100%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-16 md:w-48 md:h-24 lg:w-56 lg:h-28 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Partner Logo"
                  className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}