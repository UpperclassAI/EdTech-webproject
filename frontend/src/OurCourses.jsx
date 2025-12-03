import { motion } from "framer-motion";
import { 
  FaRobot, 
  FaPalette, 
  FaBullhorn, 
  FaCode, 
  FaMobileAlt, 
  FaBrain,
  FaArrowRight
} from "react-icons/fa";

export default function OurCourses() {
  const courses = [
    { id: 1, title: "Machine Learning", icon: <FaRobot className="text-3xl" />, description: "Learn AI algorithms and data science" },
    { id: 2, title: "UI/UX", icon: <FaPalette className="text-3xl" />, description: "Design beautiful user interfaces" },
    { id: 3, title: "Digital Marketing", icon: <FaBullhorn className="text-3xl" />, description: "Master online marketing strategies" },
    { id: 4, title: "Web Development", icon: <FaCode className="text-3xl" />, description: "Build modern web applications" },
    { id: 5, title: "App Development", icon: <FaMobileAlt className="text-3xl" />, description: "Create mobile applications" },
    { id: 6, title: "AI Prompt", icon: <FaBrain className="text-3xl" />, description: "Master AI prompt engineering" }
  ];

  return (
    <div className="w-full bg-white py-16 md:py-24 px-6 md:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl  md:text-5xl text-black lg:text-6xl font-bold mb-4">
            Our <span className="  text-blue-500"> Courses</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
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
              className="group relative overflow-hidden bg-blue-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white flex flex-col items-center text-center"
            >
              {/* Content */}
              <div className="relative p-8 flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-6 w-16 h-16 rounded-xl bg-white flex items-center justify-center text-blue-500">
                  {course.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="mb-6">
                  {course.description}
                </p>
                
                {/* View Details Button */}
                <button className="flex items-center justify-center text-lg font-semibold bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  View Details
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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
          <button className="group relative px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              More Courses
              <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
          
          <p className="mt-6 text-white/80">
            Explore our complete course catalog
          </p>
        </motion.div>
      </div>
    </div>
  );
}
