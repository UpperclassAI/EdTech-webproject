import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full fixed mt-6 top-0 left-0 z-50 bg-transparent text-xl font-mono bg-black/80 backdrop-blur-xs py-10">
      <div className="max-w-7xl mx-auto px-9 py-4 flex justify-between items-center relative gap-9  ">

        {/* LEFT — Logo */}
        <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          Upperclass AI
        </h1>

        {/* CENTER — Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-15 rounded-xl px-4 py-2 shadow-md bg-white">
            {[
              { path: "/", label: "Home" },
              { path: "/course", label: "Courses" },
              { path: "/pricing", label: "Pricing" },
                { path: "/contact", label: "Contact" },
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
            className="px-9 py-4 bg-white text-black font-semibold rounded-xl shadow hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
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
        {[
            { path: "/", label: "Home" },
              { path: "/course", label: "Courses" },
              { path: "/pricing", label: "Pricing" },
                { path: "/contact", label: "Contact" },
              { path: "/about", label: "About" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block text-lg transition-colors duration-300 ${
              isActive(item.path) ? "text-blue-500" : "hover:text-blue-400"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          to="/auth"
          className="w-full mt-4 px-5 py-3 bg-white text-black rounded-xl shadow font-semibold block text-center
          transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
