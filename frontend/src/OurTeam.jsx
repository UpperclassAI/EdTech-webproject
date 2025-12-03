import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function OurTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "AI Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Expert in machine learning with 10+ years experience",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UX Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Passionate about creating intuitive user experiences",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 3,
      name: "Marcus Lee",
      role: "Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      bio: "Full-stack developer focused on scalable solutions",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Marketing Head",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      bio: "Digital marketing strategist with proven track record",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 5,
      name: "David Kim",
      role: "Data Scientist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      bio: "Transforming data into actionable insights",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      id: 6,
      name: "Elena Rossi",
      role: "Content Creator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      bio: "Making complex topics simple and engaging",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Decorative AI Avatars */}
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
              />
            ))}
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Lots of AI Avatars to
            <br />
            <span className="text-blue-500">choose from</span>
          </h2>
          
          <div className="inline-block mt-8">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 bg-gradient-to-r from-blue-100 to-purple-100 px-8 py-3 rounded-full">
              Our Team
            </h3>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300">
                {/* Avatar */}
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={member.social.linkedin}
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <FaLinkedin />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                    >
                      <FaTwitter />
                    </motion.a>
                    <motion.a
                      href={member.social.github}
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <FaGithub />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating AI Avatars */}
        <div className="relative mt-20">
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}