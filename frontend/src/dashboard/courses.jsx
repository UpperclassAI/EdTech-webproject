import Navbar from "../Navbar";
import { Users, Zap, Sparkles, ShieldCheck, GraduationCap, Globe, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50 animate-fadeInSlow">
      <Navbar />

      {/* HERO */}
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-10 mb-12 animate-fadeUp">
            <Feature icon={<Sparkles size={34} />} title="AI Packed" />
            <Feature icon={<Users size={34} />} title="Community Driven" />
            <Feature icon={<Zap size={34} />} title="Swift Performance" />
          </div>

          <button className="bg-red-600 hover:bg-red-700 transition px-10 py-3 rounded-full font-semibold animate-pulseSoft">
            Get Started
          </button>
        </div>
      </section>

      {/* ABOUT OVERVIEW */}
      <section className="-mt-20 relative z-10 animate-fadeUp delay-200">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">About Upperclass AI</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Upperclass AI is a modern learning platform combining AI-powered tools,
            structured learning, and a strong community to help students gain
            real-world, future-ready skills.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <Stat value="2K+" label="Students Globally" />
            <Stat value="50+" label="Schools" />
          </div>

          <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold">
            Get Started
          </button>
        </div>
      </section>

      {/* WHY UPPERCLASS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-bold text-center mb-12">Why Upperclass AI?</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <Reason icon={<ShieldCheck />} title="Secure Learning" text="Safe, guided, and trusted learning environment." />
          <Reason icon={<GraduationCap />} title="Career Focused" text="Skills designed for real-world impact." />
          <Reason icon={<Globe />} title="Global Reach" text="Learn from anywhere, compete globally." />
          <Reason icon={<HeartHandshake />} title="Supportive Community" text="Mentors, peers, and collaboration." />
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <InfoCard
          title="Mission"
          text="Making quality tech education accessible to everyone, regardless of location or background."
          delay="delay-100"
        />
        <InfoCard
          title="Vision"
          active
          text="To raise the next generation of skilled innovators solving global problems."
          delay="delay-200"
        />
        <InfoCard
          title="Values"
          text="Innovation, integrity, collaboration, and continuous growth."
          delay="delay-300"
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Step step="01" title="Learn" text="Follow structured AI-powered courses." />
            <Step step="02" title="Practice" text="Build projects and solve real problems." />
            <Step step="03" title="Grow" text="Track progress and unlock opportunities." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to build your future?</h3>
        <p className="text-blue-100 mb-6">Join thousands learning with Upperclass AI.</p>
        <button className="bg-red-600 hover:bg-red-700 px-10 py-3 rounded-full font-semibold">
          Get Started Now
        </button>
      </section>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex flex-col items-center gap-3 animate-fadeUp">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="animate-fadeUp">
      <p className="text-3xl font-bold text-blue-600">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
}

function InfoCard({ title, text, active, delay }) {
  return (
    <div className={`rounded-xl p-6 shadow-sm animate-fadeUp ${delay} ${active ? "bg-blue-600 text-white" : "bg-white"}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className={`text-sm ${active ? "text-blue-100" : "text-gray-600"}`}>{text}</p>
    </div>
  );
}

function Reason({ icon, title, text }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm text-center animate-fadeUp">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
        {icon}
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

function Step({ step, title, text }) {
  return (
    <div className="bg-blue-50 rounded-xl p-6 animate-fadeUp">
      <p className="text-blue-600 font-bold text-sm">{step}</p>
      <h4 className="font-semibold mt-2 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
