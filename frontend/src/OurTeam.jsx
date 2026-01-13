import { motion } from "framer-motion";

export default function OurTeam() {
  return (
    <div className="w-full">

      {/* Top-left Heading */}
      <div className="px-6 md:px-16 py-12">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-00 mb-6 leading-tight">
          Lots of AI Avatars to
          <br />
          <span className="text-blue-500">choose from</span>
        </h2>
      </div>

      {/* Full-width Image */}
      <div className="w-full  relative overflow-hidden">
        <img
          src="/assets/ai.png"
          alt="AI Avatars"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}
