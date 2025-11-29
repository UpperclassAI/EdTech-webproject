import Navbar from "./Navbar";
import Footer from "./Footer";




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
      <div className="relative z-20 max-w-5xl px-12 mx-auto h-full flex flex-col justify-center">
        <p className="text-white text-lg mb-5">
          Smart, Personalized, Powerful.
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Empowering the <br />
          <span className="text-blue-400">
            Next Generation <br /> With AI
          </span>
        </h1>

        <p className="text-gray-200 text-lg mt-4 w-full md:w-[70%]">
          Enables smarter learning through intelligent, personalized tools.
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
       <Footer />
    </div>
  );
}
