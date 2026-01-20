"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";

export default function Testimonial() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const testimonials = [
    {
      name: "Adewale Johnson",
      role: "Frontend Developer",
      image: "/assets/user1.jpg",
      quote:
        "Upperclass AI didn’t just teach me skills — it reshaped how I think about technology and problem-solving.",
    },
    {
      name: "Sarah Mitchell",
      role: "Product Designer",
      image: "/assets/user2.jpg",
      quote:
        "The structure, clarity, and confidence this platform gives you is rare. It feels premium and intentional.",
    },
    {
      name: "Daniel Okorie",
      role: "Data Analyst",
      image: "/assets/user3.jpg",
      quote:
        "Every lesson feels deliberate. You’re not guessing — you’re growing with direction and purpose.",
    },
    {
      name: "Grace Williams",
      role: "AI Research Student",
      image: "/assets/user4.jpg",
      quote:
        "Upperclass AI makes complex ideas feel simple. It’s the most focused learning experience I’ve had.",
    },
  ];

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(timer);
  }, [paused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % testimonials.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const bg =
    theme === "dark"
      ? "bg-slate-950 text-gray-200"
      : "bg-gradient-to-b from-white to-blue-50";

  const card =
    theme === "dark"
      ? "bg-white/5 border-white/10"
      : "bg-white border-blue-100";

  return (
    <section className={`relative w-full py-28 px-6 overflow-hidden ${bg}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[620px] h-[620px] bg-blue-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-20"
        >
          Trusted by <span className="text-blue-500">Learners</span>
        </motion.h2>

        {/* Card stack */}
        <div
          className="relative flex justify-center items-center h-[420px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Depth cards */}
          {[1, 2].map((layer) => (
            <div
              key={layer}
              className={`absolute w-[90%] md:w-[70%] h-[85%] rounded-3xl ${card}`}
              style={{
                transform: `translateY(${layer * 18}px) scale(${1 - layer * 0.05})`,
                opacity: 0.22,
              }}
            />
          ))}

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag={!reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80)
                  setIndex((i) => (i + 1) % testimonials.length);
                if (info.offset.x > 80)
                  setIndex(
                    (i) => (i - 1 + testimonials.length) % testimonials.length
                  );
              }}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className={`relative w-[95%] md:w-[70%] p-12 rounded-3xl 
                backdrop-blur-xl shadow-2xl 
                border border-b-4 border-blue-500 ${card}`}
            >
              {/* Opening quote */}
              <FaQuoteLeft className="absolute top-6 left-6 text-blue-500/80 text-3xl" />

              {/* Quote */}
              <p className="text-lg md:text-2xl font-medium leading-relaxed mb-12 px-6">
                “{testimonials[index].quote}”
              </p>

              {/* User */}
              <div className="flex items-center justify-center gap-5">
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">
                    {testimonials[index].name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {testimonials[index].role}
                  </span>
                </div>
              </div>

              {/* Closing quote */}
              <FaQuoteRight className="absolute bottom-6 right-6 text-blue-500/80 text-3xl" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-8 bg-blue-500"
                  : "w-3 bg-blue-300/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
