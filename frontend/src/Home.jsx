"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhyChoose from "./WhyChoose";
import StatsSection from "./StatsSection";
import OurCourses from "./OurCourses";
import OurTeam from "./OurTeam";
import TeamCarousel from "./TeamCarousel";
import LogoMarquee from "./mac";
import FAQSection from "./faq";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "./context/ThemeContext";
import FloatingSocialGlass from "./FloatingSocialGlass";

export default function Home() {
  const whyChooseRef = useRef(null); // Ref for scrolling
  const { theme } = useTheme(); // Get current theme

  return (
    <div className="relative w-full h-screen overflow-x-hidden">
      {/* BACKGROUND IMAGE – Fade In */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <img 
          src="/assets/uhome.png"
          alt="students"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* NAVBAR – Slide Down */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative z-20 max-w-5xl mx-6 sm:mx-10 md:mx-16 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 text-center lg:text-left">
        <motion.p
          className={`text-sm sm:text-xl lg:text-xl mb-7 ${
            theme === "dark" ? "text-gray-200" : "text-white"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Smart, Personalized, Powerful.
        </motion.p>

        <motion.h1
          className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-snug md:leading-tight ${
            theme === "dark" ? "text-white" : "text-gray-100"
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          Empowering the <br />
          <span>Next Generation <br /> With AI</span>
        </motion.h1>

        <motion.p
          className={`mt-4 w-full md:w-3/4 lg:w-2/3 mx-auto lg:mx-0 text-base sm:text-xl lg:text-2xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-200"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          Learn Faster With Fully Adaptive<br /> AI Tools Built Around You
        </motion.p>

        {/* Buttons – Fade Up */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <Link
            to="/auth"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 sm:px-12 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          <button
            onClick={() => whyChooseRef.current?.scrollIntoView({ behavior: "smooth" })}
            className={`px-6 py-2 sm:px-6 sm:py-3 rounded-xl shadow flex items-center justify-center transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Why Us?
          </button>
        </motion.div>
      </div>
 <FloatingSocialGlass />
      {/* WHATSAPP FLOATING BUTTON */}
      <motion.a
        href=" https://wa.link/ujeev2"
        target="_blank"
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform ${
          theme === "dark" ? "bg-green-600" : "bg-blue-500"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      >
        <FaWhatsapp className="text-white text-3xl" />
      </motion.a>

      {/* PAGE SECTIONS WITH FADE-IN */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <LogoMarquee/>
      </motion.div>


      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <StatsSection />
      </motion.div>

      <motion.div ref={whyChooseRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <WhyChoose />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <OurCourses />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <OurTeam />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <TeamCarousel />
      </motion.div>
     

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <FAQSection />
      </motion.div>

      <Footer />
    </div>
  );
}
