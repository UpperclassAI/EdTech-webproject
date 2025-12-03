

import Navbar from "./Navbar";
import Footer from "./Footer";
import WhyChoose from "./WhyChoose";
import StatsSection from "./StatsSection";
import OurCourses from "./OurCourses";
import OurTeam from "./OurTeam";
import TeamCarousel from "./TeamCarousel";


import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative w-full h-screen">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/assets/uhome.png"
          alt="students"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO CONTENT */}
      <div className="relative z-20 max-w-5xl px- mx-7 h-full flex flex-col justify-center">
        <p className="text-white text-lg mb-5">
          Smart, Personalized, Powerful.
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Empowering the <br />
          <span className="">
            Next Generation <br /> With AI
          </span>
        </h1>

        <p className="text-gray-200 text-lg mt-4 w-full md:w-[70%]">
          Learn Faster With Fully Adaptive<br/> AI Tools Built Around You
        </p>

        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow hover:bg-blue-700">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-black text-lg rounded-xl shadow hover:bg-gray-200">
            Why Us?
          </button>
        </div>
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/2348100000000" 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-blue-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
      <StatsSection />
<WhyChoose />
<OurCourses />
<OurTeam />
<TeamCarousel />

      <Footer />
    </div>
  );
}
