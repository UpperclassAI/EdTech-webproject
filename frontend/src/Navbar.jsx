import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full absolute top-0 left-0 z-50 bg-transparent mt-6 text-xl">
      <div className="max-w-7xl mx-auto px-9 py-4 flex justify-between gap-9 items-center relative">

        {/* LEFT — Logo */}
        <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          Upperclass AI
        </h1>

        {/* CENTER — Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 mx-9">
          <div className="bg-white rounded-xl bold flex items-center px-4 py-2 gap-19 shadow-md">

            {[
              { path: "/", label: "Home" },
              { path: "/courses", label: "Courses" },
              { path: "/pricing", label: "Pricing" },
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-3 rounded-xl transition-all duration-300
                ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white scale-105 shadow"
                    : "text-black hover:bg-blue-600 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

          </div>
        </div>

        {/* RIGHT — Login */}
        <div className="hidden md:block">
          <Link
            to="/auth"
            className="px-9 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow 
            hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white text-4xl transition-all duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU — Animated */}
      <div
        className={`md:hidden bg-black/80 backdrop-blur-md text-white p-6 space-y-4 transform transition-all duration-300 origin-top 
        ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
      >
        <Link to="/" className="block text-lg hover:text-blue-400 transition">Home</Link>
        <Link to="/courses" className="block text-lg hover:text-blue-400 transition">Courses</Link>
        <Link to="/pricing" className="block text-lg hover:text-blue-400 transition">Pricing</Link>
        <Link to="/about" className="block text-lg hover:text-blue-400 transition">About</Link>

        <Link
          to="/auth"
          className="w-full mt-4 px-5 py-3 bg-white text-blue-700 rounded-xl shadow font-semibold block text-center 
          transition-all duration-300 hover:bg-blue-100"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
