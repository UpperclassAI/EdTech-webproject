"use client";

import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TeamCarousel from "../TeamCarousel";
import { Brain, Globe, Rocket, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import FloatingSocialGlass from "../FloatingSocialGlass";
import { Link } from "react-router-dom";
import ChatBot from "../CB";


/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = { 
  hidden: { opacity: 0, y: 40 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut",
      staggerChildren: 0.1 
    } 
  } 
};

const fadeLeft = { 
  hidden: { opacity: 0, x: -60 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  } 
};

const fadeRight = { 
  hidden: { opacity: 0, x: 60 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  } 
};

const stagger = { 
  hidden: {}, 
  visible: { 
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.15 
    } 
  } 
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "backOut"
    }
  }
};

/* ---------------- REUSABLE MOTION WRAPPERS ---------------- */
const MotionSection = ({ children, variants = fadeUp, className = "" }) => (
  <motion.section 
    variants={variants} 
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: true, margin: "-50px" }} 
    className={className}
  >
    {children}
  </motion.section>
);

const MotionCard = ({ children, variants = fadeUp, className = "" }) => (
  <motion.div 
    variants={variants} 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ---------------- PAGE COMPONENT ---------------- */
export default function About() {
  const { theme } = useTheme();

  const bgMain = theme === "dark" ? "bg-gradient-to-b from-slate-950 to-slate-900 text-gray-200" : "bg-gradient-to-b from-gray-50 to-white text-gray-900";
  const cardBg = theme === "dark" ? "bg-gradient-to-br from-slate-900 to-slate-800 text-gray-200" : "bg-gradient-to-br from-white to-gray-50 text-gray-900";
  const overlayHero = theme === "dark" ? "bg-gradient-to-b from-black/80 via-slate-900/70 to-black/80" : "bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-blue-900/80";
  const overlayUnique = theme === "dark" ? "bg-gradient-to-br from-gray-900/90 via-slate-800/80 to-black/90" : "bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-black/90";

  return (
    <div className={`w-full min-h-screen transition-all duration-500 ${bgMain} overflow-x-hidden`}>
      <Navbar />
      <FloatingSocialGlass />

      {/* HERO SECTION - Enhanced with gradient overlay */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center bg-no-repeat scale-105 animate-zoomSlow" />
        <div className={`absolute inset-0 ${overlayHero} backdrop-blur-sm`} />
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400/20"
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build the Future of <span className="text-blue-500">Learning</span>
          </motion.h1>
          <motion.p 
            className={`mt-6 text-md md:text-lg lg:text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-blue-100"} leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Upperclass AI blends cutting-edge technology, expert mentorship, and a vibrant community to help learners build real-world skills with confidence.
          </motion.p>
        </div>
      </section>

      {/* ABOUT CARD - Elevated with glass effect */}
      <MotionSection className="-mt-12 md:-mt-20 relative z-20 px-4 sm:px-6">
        <div className={`max-w-6xl mx-auto rounded-3xl border-b-[6px] border-blue-600 shadow-2xl p-8 sm:p-12 md:p-16 text-center ${cardBg} border border-t-white/10 border-l-white/10 border-r-white/10 backdrop-blur-lg`}>
          <motion.h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${theme === "dark" ? "from-blue-400 to-blue-400" : "from-blue-600 to-blue-600"} bg-clip-text text-transparent`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Upperclass AI
          </motion.h2>
          <p className={`max-w-3xl mx-auto text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-10`}>
            We're revolutionizing education by combining AI-powered personalized learning with human mentorship, creating a platform where every learner can achieve their full potential through real-world projects and community support.
          </p>

          <motion.div 
            variants={stagger} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <Stat value="2K+" label="Students Globally" theme={theme} />
            <Stat value="50+" label="Partner Schools" theme={theme} />
            <Stat value="40+" label="AI Tutors" theme={theme} />
            <Stat value="98%" label="Satisfaction Rate" theme={theme} />
          </motion.div>
        </div>
      </MotionSection>

      <ChatBot />

      {/* MISSION / VISION / VALUES - Enhanced with icons */}
      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 md:px-9 py-20 md:py-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <InfoCard 
          title="Mission" 
          text="Making quality tech education accessible and personalized for everyone through AI-driven learning." 
          icon="🎯"
          theme={theme} 
        />
        <InfoCard 
          title="Vision" 
          text="Raising the next generation of innovators who will shape the future of technology and society." 
          icon="🚀"
          active 
          theme={theme} 
        />
        <InfoCard 
          title="Values" 
          text="Innovation, integrity, collaboration, and continuous growth drive everything we do." 
          icon="❤️"
          theme={theme} 
        />
      </MotionSection>

      {/* WHAT MAKES US UNIQUE - Enhanced with hover effects */}
      <section className="relative py-28 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-zoomExtraSlow"
          style={{ backgroundImage: "url('/assets/ghj.png')" }}
        />
        <div className={`absolute inset-0 ${overlayUnique} backdrop-blur-sm`} />
        
        <MotionSection className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h3 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-16 text-white"
          >
            What Makes Us <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">Unique</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <UniqueCard 
              icon={<Brain size={48} />} 
              title="AI-First Learning" 
              text="Personalized learning paths powered by intelligent systems that adapt to every student's pace, style, and goals in real-time." 
              theme={theme} 
            />
            <UniqueCard 
              icon={<Globe size={48} />} 
              title="Global Community" 
              text="Students, mentors, and innovators connected across borders, cultures, and industries, fostering collaboration and diverse perspectives." 
              theme={theme} 
            />
            <UniqueCard 
              icon={<Rocket size={48} />} 
              title="Outcome Driven" 
              text="We focus on real skills, real projects, and real confidence — not just certificates. Every lesson leads to tangible results." 
              theme={theme} 
            />
          </div>
        </MotionSection>
      </section>

      {/* OUR JOURNEY - Enhanced timeline */}
      <section className={`py-24 md:py-28 ${theme === "dark" ? "bg-gradient-to-b from-slate-950 to-slate-900" : "bg-gradient-to-b from-gray-50 to-white"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <MotionSection variants={fadeLeft} className="relative">
            <h3 className={`text-3xl sm:text-4xl md:text-4xl font-extrabold mb-10 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Our <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent">Journey</span>
            </h3>
            <div className="relative space-y-8">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-500 rounded-full" />
              <JourneyStep year="2022" title="The Spark" description="Founded with a vision to democratize tech education" theme={theme} />
              <JourneyStep year="2023" title="Community Growth" description="Expanded to 50+ schools and 2,000+ students globally" theme={theme} />
              <JourneyStep year="2024" title="AI Integration" description="Launched personalized AI tutors and adaptive learning paths" theme={theme} />
              <JourneyStep year="2025" title="Global Expansion" description="Scaling to reach 100,000+ learners worldwide" theme={theme} />
            </div>
          </MotionSection>

          <MotionSection variants={fadeRight} className="relative h-[300px] sm:h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center transition-transform duration-7000 group-hover:scale-110 hover:duration-7000" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
              <div className="bg-gradient-to-r from-blue-600/90 to-blue-600/90 backdrop-blur-sm rounded-2xl p-6 max-w-md">
                <p className="text-white text-lg md:text-xl font-semibold mb-4">
                  From a bold idea to a global learning movement that's transforming education.
                </p>
                <div className="flex items-center gap-2 text-blue-200">
                  <ArrowRight className="w-5 h-5" />
                  <span className="text-sm font-medium">Join our story</span>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* CALL TO ACTION - Enhanced */}
      <MotionSection className="py-20 md:py-24 bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.h3 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            This is just the <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">beginning</span>.
          </motion.h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
            Whether you're a learner, mentor, or institution — there's a place for you in the Upperclass AI story.
          </p>
          <Link
            to="/auth"
            className="group inline-flex items-center justify-center gap-3 bg-white text-blue-900 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </MotionSection>

      {/* TEAM SECTION */}
      <MotionSection className={`py-20 md:py-24 ${cardBg} rounded-t-3xl`}>
      
        <TeamCarousel />
      </MotionSection>

      <Footer />
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes zoomSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes zoomExtraSlow {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
        .animate-zoomSlow {
          animation: zoomSlow 20s ease-in-out infinite;
        }
        .animate-zoomExtraSlow {
          animation: zoomExtraSlow 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function UniqueCard({ icon, title, text, theme }) {
  return (
    <MotionCard 
      variants={scaleUp}
      className={`relative rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden
        ${theme === "dark" 
          ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-200 hover:-translate-y-2" 
          : "bg-gradient-to-br from-white to-gray-50 text-gray-900 hover:-translate-y-2"
        } border border-white/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      <div className="relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-500 group-hover:from-blue-400 group-hover:to-blue-400 transition-all duration-500 mb-6">
          <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">{title}</h4>
        <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{text}</p>
      </div>
    </MotionCard>
  );
}

function JourneyStep({ year, title, description, theme }) {
  return (
    <MotionCard 
      variants={fadeUp}
      className={`relative ml-6 pl-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2
        ${theme === "dark" 
          ? "bg-gradient-to-r from-slate-800/80 to-slate-900/80 text-gray-200" 
          : "bg-gradient-to-r from-white/80 to-gray-50/80 text-gray-900"
        } backdrop-blur-sm`}
    >
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-lg border-4 border-white dark:border-slate-900" />
      <span className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2 block">{year}</span>
      <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
      {description && (
        <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
      )}
    </MotionCard>
  );
}

function Stat({ value, label, theme }) {
  return (
    <MotionCard 
      variants={fadeUp}
      className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${theme === "dark" 
          ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-200" 
          : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
        } border border-white/10`}
    >
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent mb-2">
        {value}
      </p>
      <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{label}</p>
    </MotionCard>
  );
}

function InfoCard({ title, text, icon, active = false, theme }) {
  return (
    <MotionCard 
      variants={scaleUp}
      className={`relative rounded-3xl p-6 sm:p-8 min-h-[240px] sm:min-h-[280px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group
        ${active 
          ? "bg-gradient-to-br from-blue-600 to-blue-600 text-white" 
          : theme === "dark" 
            ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-200" 
            : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
        } border border-white/10`}
    >
      {/* Background icon/pattern */}
      <div className="absolute -right-6 -top-6 sm:-right-8 sm:-top-8 text-6xl sm:text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        {icon}
      </div>
      
      <h3 className="font-extrabold text-xl sm:text-2xl mb-4 sm:mb-6 relative z-10">{title}</h3>
      <p className={`leading-relaxed text-sm sm:text-base relative z-10 ${active ? "text-blue-100" : ""}`}>
        {text}
      </p>
      
      {/* Hover effect line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${active ? "from-blue-400 to-blue-400" : "from-blue-500 to-blue-500"} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </MotionCard>
  );
}