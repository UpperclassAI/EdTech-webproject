import { FaLightbulb, FaUserTie, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Generate random motion values
const randomMove = () => ({
  x: Math.random() * 80 - 40, // move left/right
  y: Math.random() * 80 - 40, // move up/down
  transition: {
    duration: Math.random() * 4 + 3, // between 3–7 seconds
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
});

export default function WhyChoose() {
  return (
    <div className="w-full   bg-white py-20 px-10 md:px-20 flex flex-col md:flex-row justify-between items-start gap-10">

      {/* LEFT CONTENT */}
      <div className="flex-1 text-3xl">
        <h2 className="text-5xl font-bold mb-15">
          Why Choose <span className="text-blue-500">Upperclass AI</span>
        </h2>

        <div className="space-y-10">

          {/* UNIQUE LEARNING */}
          <div className="flex items-start gap-5">
            <FaLightbulb className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-4xl font-semibold text-blue-500 mb-7">Unique Learning</h3>
              <p className="text-gray-700 text-2xl">
                We stand out by offering simple, high-quality<br /> AI-powered tech training 
                that helps you learn y<br />faster and easier.
              </p>
            </div>
          </div>

          {/* PROFESSIONAL */}
          <div className="flex items-start gap-5">
            <FaUserTie className="text-blue-600 text-3xl" />
            <div>
              <h3 className=" font-semibold text-blue-500 text-4xl mb-7">Professional</h3>
              <p className="text-gray-700 text-2xl">
                At Upperclass AI, we provide quality AI-powered lessons y<br />to help you learn fast and grow with y<br />confidence.
              </p>
            </div>
          </div>

          {/* RELIABLE */}
          <div className="flex items-start gap-5">
            <FaShieldAlt className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-4xl font-semibold text-blue-500 mb-7">Reliable</h3>
              <p className="text-gray-700 text-2xl">
                You get consistent, accurate, and easy-to-understandy<br /> learning you can trust every time.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT ANIMATED PATTERN */}
      <div className="hidden md:block flex-1 relative h-[500px]">

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
