import { motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

export default function OurTeam() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="w-full">

      {/* Top-left Heading */}
      <motion.div 
        className="px-6 md:px-16 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
          Lots of AI Avatars to
          <br />
          <span className="text-blue-500">choose from</span>
        </h2>
      </motion.div>

      {/* Full-width Image */}
      <div className="w-full relative overflow-hidden">
        <div className="relative">
          <motion.img
            src="/assets/ai.png"
            alt="AI Avatars"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          
          {/* Animated dark mode overlay */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            initial={false}
            animate={{ opacity: isDarkMode ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

    </div>
  );
}
