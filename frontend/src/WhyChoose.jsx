"use client";

import { FaLightbulb, FaUserTie, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext"; // assuming you have this context

// Generate random motion values
const randomMove = () => ({
  x: Math.random() * 80 - 40,
  y: Math.random() * 80 - 40,
  transition: {
    duration: Math.random() * 4 + 3,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
});

export default function WhyChoose() {
  const { theme } = useTheme(); // get current theme

  const steps = [
    {
      icon: <FaLightbulb className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} text-3xl`} />,
      title: "Unique Learning",
      description: [
        "We stand out by offering simple, high-quality AI-powered",
        "tech training that helps you learn faster and easier.",
      ],
    },
    {
      icon: <FaUserTie className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} text-3xl`} />,
      title: "Professional",
      description: [
        "At Upperclass AI, we provide quality AI-powered lessons",
        "to help you learn fast and grow with confidence.",
      ],
    },
    {
      icon: <FaShieldAlt className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} text-3xl`} />,
      title: "Reliable",
      description: [
        "You get consistent, accurate, and easy-to-understand learning",
        "you can trust every time.",
      ],
    },
  ];

  return (
    <div className={`w-full py-20 px-6 md:px-20 flex flex-col md:flex-row justify-between items-start gap-10 relative transition-colors ${
      theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-white text-gray-900"
    }`}>

      {/* LEFT CONTENT */}
      <div className="flex-1 relative">
        <h2 className={`text-5xl md:text-6xl font-bold mb-36 transition-colors`}>
          Why Choose <span className={`${theme === "dark" ? "text-blue-400" : "text-blue-500"}`}>Upperclass AI</span>
        </h2>

        {/* Vertical Line */}
        <div className={`absolute top-61 left-1 md:left-10 w-1 h-[calc(22rem)] hidden md:block transition-colors ${theme === "dark" ? "bg-blue-700" : "bg-blue-200"}`}></div>

        {/* Steps */}
        <div className="flex flex-col gap-16 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-5 relative">
              {/* Icon with circle */}
              <div className={`p-3 rounded-full border-2 z-10 flex-shrink-0 transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 border-blue-400"
                  : "bg-white border-blue-500"
              }`}>
                {step.icon}
              </div>

              {/* Text content */}
              <div className="flex-1">
                <h3 className={`text-3xl md:text-4xl font-semibold mb-3 transition-colors ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm md:text-base font-semibold leading-relaxed transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  {step.description.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ANIMATED PATTERN */}
      <div className="hidden md:block flex-1 relative h-[500px]">
        {/* Your squares remain unchanged */}
        <motion.div
          className="absolute border-2 border-blue-500 w-24 h-24 top-0 right-20"
          animate={randomMove()}
        />
        <motion.div
          className="absolute border-2 border-blue-500 w-32 h-32 top-20 right-4"
          animate={randomMove()}
        />
        <motion.div
          className="absolute border-2 border-blue-500 w-28 h-28 top-40 right-24"
          animate={randomMove()}
        />
      
        {/* Square 1 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-24 h-24 top-0 right-20"
          animate={randomMove()}
        />

        {/* Square 2 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-32 h-32 top-20 right-4"
          animate={randomMove()}
        />

        {/* Square 3 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-28 h-28 top-40 right-24"
          animate={randomMove()}
        />

        {/* Square 4 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-40 h-40 top-52 right-6"
          animate={randomMove()}
        />

        {/* Square 5 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-24 h-24 top-80 right-28"
          animate={randomMove()}
        />


        {/* Square 6 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-10 right-44"
  animate={randomMove()}
/>

{/* Square 7 */}
<motion.div
  className="absolute border-2 border-blue-500 w-28 h-28 top-32 right-56"
  animate={randomMove()}
/>

{/* Square 8 */}
<motion.div
  className="absolute border-2 border-blue-500 w-16 h-16 top-60 right-44"
  animate={randomMove()}
/>

{/* Square 9 */}
<motion.div
  className="absolute border-2 border-blue-500 w-36 h-36 top-96 right-16"
  animate={randomMove()}
/>

{/* Square 10 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-72 right-10"
  animate={randomMove()}
/>

{/* Square 11 */}
<motion.div
  className="absolute border-2 border-blue-500 w-32 h-32 top-5 right-64"
  animate={randomMove()}
/>

{/* Square 12 */}
<motion.div
  className="absolute border-2 border-blue-500 w-24 h-24 top-44 right-72"
  animate={randomMove()}
/>

{/* Square 13 */}
<motion.div
  className="absolute border-2 border-blue-500 w-16 h-16 top-80 right-56"
  animate={randomMove()}
/>

{/* Square 14 */}
<motion.div
  className="absolute border-2 border-blue-500 w-40 h-40 top-20 right-80"
  animate={randomMove()}
/>













        {/* Square 1 */}
        <motion.div
          className="absolute border-2 border-blue-500 w-24 h-24 top-0 right-90"
          animate={randomMove()}
        />

     
    

        {/* Square 6 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-10 right-44"
  animate={randomMove()}
/>

{/* Square 7 */}
<motion.div
  className="absolute border-2 border-blue-500 w-28 h-28 top-32 right-56"
  animate={randomMove()}
/>

{/* Square 8 */}
<motion.div
  className="absolute border-2 border-blue-500 w-16 h-16 top-60 right-44"
  animate={randomMove()}
/>

{/* Square 9 */}
<motion.div
  className="absolute border-2 border-blue-500 w-66 h-66 top-16 left-86"
  animate={randomMove()}
/>

{/* Square 10 */}
<motion.div
  className="absolute border-2 border-blue-500 w-30 h-30 top-52 right-20"
  animate={randomMove()}
/>

{/* Square 11 */}
<motion.div
  className="absolute border-2 border-blue-500  w-52 h-52 bottom-5 left-64"
  animate={randomMove()}
/>

{/* Square 12 */}
<motion.div
  className="absolute border-2 border-blue-500 w-44 h-44 bottom-44 left-72"
  animate={randomMove()}
/>

{/* Square 13 */}
<motion.div
  className="absolute border-2 border-blue-500 w-26 h-26 top-70 right-76"
  animate={randomMove()}
/>

{/* Square 14 */}
<motion.div
  className="absolute border-2 border-blue-500 w-70 h-70 top-70 left-80"
  animate={randomMove()}
/>
















{/* Square 15 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-96 right-40"
  animate={randomMove()}
/>

{/* Square 16 */}
<motion.div
  className="absolute border-2 border-blue-500 w-28 h-28 top-64 right-72"
  animate={randomMove()}
/>

{/* Square 17 */}
<motion.div
  className="absolute border-2 border-blue-500 w-24 h-24 top-0 right-96"
  animate={randomMove()}
/>

{/* Square 6 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-10 right-40"
  animate={randomMove()}
/>

{/* Square 7 */}
<motion.div
  className="absolute border-2 border-blue-500 w-36 h-36 top-32 right-52"
  animate={randomMove()}
/>

{/* Square 8 */}
<motion.div
  className="absolute border-2 border-blue-500 w-16 h-16 top-64 right-12"
  animate={randomMove()}
/>

{/* Square 9 */}
<motion.div
  className="absolute border-2 border-blue-500 w-28 h-28 top-96 right-32"
  animate={randomMove()}
/>

{/* Square 10 */}
<motion.div
  className="absolute border-2 border-blue-500 w-14 h-14 top-[420px] right-0"
  animate={randomMove()}
/>

{/* Square 11 */}
<motion.div
  className="absolute border-2 border-blue-500 w-32 h-32 top-[350px] right-[150px]"
  animate={randomMove()}
/>

{/* Square 12 */}
<motion.div
  className="absolute border-2 border-blue-500 w-24 h-24 top-[500px] right-[80px]"
  animate={randomMove()}
/>

{/* Square 13 */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 top-[450px] right-[200px]"
  animate={randomMove()}
/>

{/* Square 14 */}
<motion.div
  className="absolute border-2 border-blue-500 w-40 h-40 top-[300px] right-[260px]"
  animate={randomMove()}
/>

{/* Square 15 */}
<motion.div
  className="absolute border-2 border-blue-500 w-[90px] h-[90px] top-[150px] right-[300px]"
  animate={randomMove()}
/>

{/* Square 16 */}
<motion.div
  className="absolute border-2 border-blue-500 w-[70px] h-[70px] top-[30px] right-[250px]"
  animate={randomMove()}
/>























<div className="hidden md:block flex-1 relative h-[500px] overflow-hidden">

  {[
    // BIG squares
    { size: 96, top: 30, right: 250 },
    { size: 70, top: 150, right: 300 },
    { size: 72, top: 70, left: 80 },
   
   
    // MEDIUM squares
    { size: 56, top: 32, right: 52 },
    { size: 48, top: 6, right: 10 },
    { size: 44, top: 72, right: 44 },
    { size: 36, top: 32, right: 56 },

    // SMALL squares
    { size: 32, top: 5, right: 64 },
   
    { size: 28, top: 96, right: 32 },

    { size: 28, top: 24, right: 96 },
    { size: 24, top: 0, right: 20 },

    { size: 20, top: 10, right: 40 },
    { size: 16, top: 64, right: 12 },
  ].map((sq, i) => (
    <motion.div
      key={i}
      className="absolute border-2 border-blue-500"
      style={{
        width: `${sq.size}px`,
        height: `${sq.size}px`,
        top: sq.top !== undefined ? sq.top : "auto",
        bottom: sq.bottom !== undefined ? sq.bottom : "auto",
        left: sq.left !== undefined ? sq.left : "auto",
        right: sq.right !== undefined ? sq.right : "auto",
      }}
      animate={randomMove()}
    />
  ))}
</div>





























{/* Square 17 */}
<motion.div
  className="absolute border-2 border-blue-500 w-24 h-24 top-[380px] right-[20px]"
  animate={randomMove()}
/>
{/* Bottom-Left Square A */}
<motion.div
  className="absolute border-2 border-blue-500 w-32 h-32 bottom-10 left-10"
  animate={randomMove()}
/>

{/* Bottom-Left Square B */}
<motion.div
  className="absolute border-2 border-blue-500 w-20 h-20 bottom-32 left-4"
  animate={randomMove()}
/>

{/* Bottom-Left Square C */}
<motion.div
  className="absolute border-2 border-blue-500 w-28 h-28 bottom-20 left-40"
  animate={randomMove()}
/>

{/* Bottom-Left Square D */}
<motion.div
  className="absolute border-2 border-blue-500 w-16 h-16 bottom-[120px] left-[90px]"
  animate={randomMove()}
/>

{/* Bottom-Left Square E */}
<motion.div
  className="absolute border-2 border-blue-500 w-40 h-40 bottom-[180px] left-[150px]"
  animate={randomMove()}
/>

      </div>

    </div>
  );
}
