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
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Jonatja",
      role: "UX Director",
      company: "Meta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jonatja",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Billy Center",
      role: "Tech Lead",
      company: "Microsoft",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BillyCenter",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Ema Sipnes",
      role: "Product Manager",
      company: "Apple",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmaSipnes",
      color: "from-red-500 to-red-600"
    },
    {
      id: 5,
      name: "Alex Morgan",
      role: "Data Scientist",
      company: "Amazon",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMorgan",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      name: "Sarah Chen",
      role: "AI Ethics Lead",
      company: "OpenAI",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % teamMembers.length);
  const prev = () => setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => next(), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
          Our <span className="text-blue-500">Team</span>
        </h1>

        {/* MAIN FULL ROW SLIDER */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-10"
            animate={{
              x: `-${index * 350}px`, // card width
              y: index % 2 === 0 ? -30 : 30 // zigzag up/down
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18
            }}
          >
            {teamMembers.map((m) => (
              <motion.div
                key={m.id}
                className="w-[320px] bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                {/* avatar */}
                <div className={`w-40 h-40 rounded-full bg-gradient-to-r ${m.color} p-1`}>
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-full h-full rounded-full bg-white p-1"
                  />
                </div>

                <h2 className="text-2xl font-bold mt-6">{m.name}</h2>
                <p className="text-lg text-gray-600">{m.role}</p>
                <p className="text-sm mt-2 text-gray-500">{m.company}</p>

                <p className="text-gray-600 mt-4 text-center">
                  {m.description}
                </p>

                <div className="flex gap-4 mt-6">
                  <a className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaLinkedin />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                    <FaTwitter />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* buttons */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110"
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
}
