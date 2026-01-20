"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";

export default function TeamCarousel() {
  const { theme } = useTheme();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const itemRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const teamMembers = [
    { id: 1, name: "Billy Coster", role: "AI Developer", avatar: "/assets/team1.png", offset: "-20px" },
    { id: 2, name: "Gorgia Anna", role: "Lead Designer", avatar: "/assets/team2.png", offset: "30px" },
    { id: 3, name: "Ema Stones", role: "Data Analyst", avatar: "/assets/team3.png", offset: "-25px" },
    { id: 4, name: "Jonathan Mark", role: "Product Lead", avatar: "/assets/team4.png", offset: "35px" },
    { id: 5, name: "Sophia Turner", role: "Machine Learning Engineer", avatar: "/assets/team5.png", offset: "-15px" },
    { id: 6, name: "Michael Lee", role: "Backend Engineer", avatar: "/assets/team6.png", offset: "25px" },
    { id: 7, name: "Isabella Curtis", role: "Marketing Strategist", avatar: "/assets/team7.png", offset: "-30px" },
    { id: 8, name: "Daniel Craig", role: "Full-Stack Developer", avatar: "/assets/wee.jpg", offset: "20px" },
    { id: 9, name: "Victoria Miles", role: "Business Analyst", avatar: "/assets/team9.png", offset: "-18px" },
    { id: 10, name: "Chris O’Connor", role: "Cybersecurity Expert", avatar: "/assets/team10.png", offset: "28px" },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [itemWidth, setItemWidth] = useState(360);

  const GAP = 96; // gap-24

  // Measure card width dynamically
  useEffect(() => {
    if (!itemRef.current) return;
    const resize = () => {
      setItemWidth(itemRef.current.offsetWidth);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const next = () =>
    setIndex((i) => (i + 1) % teamMembers.length);

  const prev = () =>
    setIndex((i) => (i - 1 + teamMembers.length) % teamMembers.length);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, index]);

  const bgMain =
    theme === "dark"
      ? "bg-slate-950 text-gray-200"
      : "bg-gradient-to-r from-white to-blue-200";

  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 transition-colors duration-500 ${bgMain}`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-14"
        >
          <h1 className="text-5xl font-bold">
            Our <span className="text-blue-500">Team</span>
          </h1>
          <p className="text-sm mt-2 text-gray-500 max-w-xl">
            The passionate individuals building the future of learning, one innovation at a time.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden h-[520px] md:h-[450px] flex justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-24 items-center will-change-transform"
            animate={{
              x: `-${index * (itemWidth + GAP) - itemWidth / 2}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 22,
            }}
          >
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.id}
                ref={i === 0 ? itemRef : null}
                className="flex flex-col items-center text-center"
                style={{ marginTop: m.offset }}
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-64 h-64 md:w-72 md:h-72 rounded-full
                  object-cover
                  shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)]
                  border-b-4 border-blue-500"
                />
                <h3 className={`text-xl font-semibold mt-6 ${textColor}`}>
                  {m.name}
                </h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm ${subText}`}
                >
                  {m.role}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2
            bg-white/90 dark:bg-slate-100
            shadow-lg w-12 h-12 rounded-full
            flex items-center justify-center
            hover:scale-110 transition"
          >
            <FaChevronLeft className={textColor} />
          </button>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2
            bg-white/90 dark:bg-slate-100
            shadow-lg w-12 h-12 rounded-full
            flex items-center justify-center
            hover:scale-110 transition"
          >
            <FaChevronRight className={textColor} />
          </button>
        </div>
      </div>
    </section>
  );
}
