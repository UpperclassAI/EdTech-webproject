"use client";

import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../footer";
import TeamCarousel from "../TeamCarousel";
import { Brain, Globe, Rocket } from "lucide-react";

/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

/* ---------------- REUSABLE MOTION WRAPPERS ---------------- */
const MotionSection = ({ children, variants = fadeUp, className }) => (
  <motion.section
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.section>
);

const MotionCard = ({ children, variants = fadeUp, className }) => (
  <motion.div variants={variants} className={className}>
    {children}
  </motion.div>
);

/* ---------------- PAGE COMPONENT ---------------- */
export default function About() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/course", label: "Courses" },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="relative text-white py-32 md:py-40 bg-[url('/assets/abt.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm" />

        <MotionSection className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Building the Future of Learning
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Upperclass AI blends technology, mentorship, and community to help
            learners build real-world skills with confidence.
          </p>
        </MotionSection>
      </section>

      {/* ABOUT CARD */}
      <MotionSection className="-mt-20 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10 sm:p-16 md:p-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
            About Upperclass AI
          </h2>
          <p className="text-black max-w-3xl px-4 sm:px-8 mx-auto">
            Upperclass AI is a modern learning platform that blends tech education,
            mentorship, and community to help students build real-world skills with
            confidence.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-8 mt-10"
          >
            <Stat value="2K+" label="Students Globally" />
            <Stat value="50+" label="Schools" />
          </motion.div>
        </div>
      </MotionSection>

      {/* PRIMARY CTA */}
      <MotionSection className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to start your journey?</h3>

          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold transition transform hover:scale-105">
              Join as a Student
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold transition transform hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>
      </MotionSection>

      {/* MISSION / VISION / VALUES */}
      <MotionSection className="max-w-6xl mx-auto px-6 md:px-9 py-20 grid sm:grid-cols-3 gap-8">
        <InfoCard title="Mission" text="Making quality tech education accessible to everyone." />
        <InfoCard title="Vision" active text="Raising the next generation of innovators." />
        <InfoCard title="Values" text="Innovation, integrity, collaboration, growth." />
      </MotionSection>

      {/* WHAT MAKES US UNIQUE */}
      <section className="relative py-28 md:py-32 text-white bg-[url('/assets/ghj.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-black/80" />
        <MotionSection className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h3 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 md:mb-16">
            What Makes Us Unique
          </motion.h3>

          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            <UniqueCard
              icon={<Brain size={40} />}
              title="AI-First Learning"
              text="Personalized learning paths powered by intelligent systems that adapt to every student."
            />
            <UniqueCard
              icon={<Globe size={40} />}
              title="Global Community"
              text="Students, mentors, and innovators connected across borders, cultures, and industries."
            />
            <UniqueCard
              icon={<Rocket size={40} />}
              title="Outcome Driven Education"
              text="We focus on real skills, real projects, and real confidence — not just certificates."
            />
          </div>
        </MotionSection>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-24 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT */}
          <MotionSection variants={fadeLeft} className="">
            <h3 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-blue-600 mb-8 md:mb-12">
              Our Journey
            </h3>
            <div className="relative border-l-4 border-blue-200 pl-8 sm:pl-10 space-y-10 md:space-y-16">
              <JourneyStep year="2022" title="The Spark" />
              <JourneyStep year="2023" title="Community Growth" />
              <JourneyStep year="2024" title="AI Integration" />
              <JourneyStep year="2025" title="Global Expansion" />
            </div>
          </MotionSection>

          {/* RIGHT IMAGE */}
          <MotionSection variants={fadeRight} className="relative h-[360px] sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
            <div className="relative z-10 h-full flex items-end p-6 sm:p-8">
              <p className="text-white text-base sm:text-lg md:text-lg font-semibold max-w-sm">
                From a bold idea to a global learning movement.
              </p>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* SECONDARY CTA */}
      <MotionSection className="py-20 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-4 md:mb-6">This is just the beginning.</h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6 md:mb-10 text-base sm:text-lg">
            Whether you’re a learner, mentor, or institution — there’s a place for you in the Upperclass AI story.
          </p>
          <button className="bg-white text-blue-900 px-10 sm:px-12 py-3 sm:py-4 rounded-full font-semibold hover:scale-105 transition transform">
            Get Started
          </button>
        </div>
      </MotionSection>

      {/* TEAM */}
      <MotionSection className="bg-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center mb-8 md:mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-600">Meet Our Team</h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">The people building the future of learning</p>
        </div>
        <TeamCarousel />
      </MotionSection>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function UniqueCard({ icon, title, text }) {
  return (
    <MotionCard
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 text-center shadow-xl border-r-2 hover:-translate-y-2 transition transform duration-300"
    >
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-white/20 mb-4 sm:mb-6">
        {icon}
      </div>
      <h4 className="text-xl sm:text-2xl font-bold mb-2">{title}</h4>
      <p className="text-sm sm:text-base text-blue-100">{text}</p>
    </MotionCard>
  );
}

function JourneyStep({ year, title }) {
  return (
    <MotionCard className="relative">
      <div className="absolute -left-8 sm:-left-[42px] top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white" />
      <span className="text-sm font-bold text-blue-500">{year}</span>
      <h4 className="text-lg sm:text-xl font-semibold mt-1">{title}</h4>
    </MotionCard>
  );
}

function Stat({ value, label }) {
  return (
    <MotionCard>
      <p className="text-2xl sm:text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-gray-500 text-sm sm:text-base">{label}</p>
    </MotionCard>
  );
}

function InfoCard({ title, text, active }) {
  return (
    <MotionCard
      className={`rounded-3xl p-6 sm:p-10 min-h-[260px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
        active ? "bg-blue-600 text-white" : "bg-white"
      }`}
    >
      <h3 className="font-extrabold text-xl sm:text-2xl mb-4">{title}</h3>
      <p className={`text-sm sm:text-base leading-relaxed ${active ? "text-blue-100" : "text-gray-600"}`}>
        {text}
      </p>
    </MotionCard>
  );
}
