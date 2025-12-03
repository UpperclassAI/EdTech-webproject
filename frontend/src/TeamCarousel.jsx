import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function TeamCarousel() {
  const teamMembers = [
    {
      id: 1,
      name: "Google Anna",
      role: "AI Research Lead",
      company: "Google",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleAnna",
      description: "Leading AI research at Google with focus on machine learning applications",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Jonatja",
      role: "UX Director",
      company: "Meta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jonatja",
      description: "Former UX director at Meta, specializing in AI interface design",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Billy Center",
      role: "Tech Lead",
      company: "Microsoft",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BillyCenter",
      description: "Tech lead at Microsoft, expert in cloud computing and AI integration",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Ema Sipnes",
      role: "Product Manager",
      company: "Apple",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmaSipnes",
      description: "Product manager at Apple, focusing on AI-powered product development",
      color: "from-red-500 to-red-600"
    },
    {
      id: 5,
      name: "Alex Morgan",
      role: "Data Scientist",
      company: "Amazon",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMorgan",
      description: "Senior data scientist at Amazon AWS, specializing in predictive analytics",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      name: "Sarah Chen",
      role: "AI Ethics Lead",
      company: "OpenAI",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
      description: "Leading AI ethics and responsible AI development at OpenAI",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Our <span className="text-blue-500">Team</span>
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">
            Meet the experts behind our AI-powered learning platform
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative h-[600px] md:h-[700px] overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

          {/* Carousel Slides */}
          <div className="relative h-full">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-12 ${
                  index === currentIndex ? 'z-20' : 'z-10'
                }`}
                initial={false}
                animate={{
                  x: `${(index - currentIndex) * 100}%`,
                  scale: index === currentIndex ? 1 : 0.9,
                  opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                {/* Left Side - Avatar */}
                <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r ${member.color} p-1`}>
                        <div className="w-full h-full rounded-full bg-white overflow-hidden">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Company Badge */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white px-6 py-2 rounded-full shadow-lg">
                          <span className="text-gray-700 font-bold text-lg">{member.company}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                      {member.name}
                    </h2>
                    
                    <div className="inline-block">
                      <span className={`text-2xl md:text-3xl font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                        {member.role}
                      </span>
                      <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2" />
                    </div>
                    
                    <p className="text-gray-600 text-xl md:text-2xl mt-8 mb-10 leading-relaxed">
                      {member.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                      <motion.a
                        href="#"
                        whileHover={{ y: -3 }}
                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <FaLinkedin className="text-xl" />
                      </motion.a>
                      <motion.a
                        href="#"
                        whileHover={{ y: -3 }}
                        className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                      >
                        <FaTwitter className="text-xl" />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-xl md:text-2xl" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-xl md:text-2xl" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Current Slide Indicator */}
          <div className="absolute top-8 right-8 z-30">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-gray-700 font-semibold">
                <span className="text-blue-600 text-xl">{currentIndex + 1}</span>
                <span className="text-gray-400"> / {teamMembers.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Team Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Our Expert Team Members
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, index) => (
              <motion.button
                key={member.id}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200' 
                    : 'bg-white hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full mb-3 bg-gradient-to-r ${member.color}`} />
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {member.name.split(' ')[0]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}