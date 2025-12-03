import { motion } from "framer-motion";
import { FaClock, FaUserGraduate, FaSchool } from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      icon: <FaClock className="text-3xl md:text-4xl text-blue-500" />,
      value: "20K+",
      label: "Screen Time",
      description: "Hours of quality AI-powered learning"
    },
    {
      icon: <FaUserGraduate className="text-3xl md:text-4xl text-blue-500" />,
      value: "2K+",
      label: "Students Globally",
      description: "From 50+ countries worldwide"
    },
    {
      icon: <FaSchool className="text-3xl md:text-4xl text-blue-500" />,
      value: "50+",
      label: "Schools",
      description: "Partner institutions using our platform"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
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
              className="rounded-2xl p-8 md:p-10   flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="mb-6 p-4 bg-blue-50 rounded-full">
                {stat.icon}
              </div>
              
              {/* Animated Number */}
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              
              {/* Label */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg">
                {stat.description}
              </p>
              
              {/* Decorative line */}
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Info Section */}
       
      </div>
    </div>
  );
}