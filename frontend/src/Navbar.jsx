import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /* 🌙 GLOBAL THEME */
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`w-full fixed xl:mt-6  lg:mt-3 sm:mt-1 top-0 left-0 z-50
        py-2  backdrop-blur-xs transition-colors duration-300
        ${
          theme === "light"
            ? "bg-transperent/20 text-black"
            : "bg-black/10 text-gray-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 py-4 flex justify-between items-center relative gap-4 sm:gap-6">

        {/* LOGO - Pushed to the left */}
        <Link to="/" className="flex items-center gap-3 -ml-2 sm:-ml-3 md:-ml-4">
          <img 
            src="/assets/logo.png" 
            alt="Upperclass AI Logo"
         className="w-40 h-12 sm:w-50 sm:h-14 md:w-60 md:h-16 lg:w-[10rem] lg:h-10 xl:w-[13rem] xl:h-12 mr-8"
          />
        </Link>

        {/* DESKTOP MENU (LG screens and above) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-8 font-bold rounded-xl px-4 py-2 shadow-md
            bg-[var(--card)] border border-[var(--border)]"
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
                className={`px-5 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white scale-105 shadow"
                      : "text-[var(--text)] hover:bg-blue-600 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* TABLET MENU (MD screens) - Adjusted for left-aligned logo */}
        <div className="hidden md:flex lg:hidden flex-1 justify-center ml-10">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 shadow-md
            bg-[var(--card)] border border-[var(--border)]"
          >
            {[
              { path: "/", label: "Home" },
              { path: "/course", label: "Courses" },
              { path: "/pricing", label: "Pricing" },
              { path: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm whitespace-nowrap
                  ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white shadow"
                      : "text-[var(--text)] hover:bg-blue-600 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* TABLET & DESKTOP LOGIN (hidden on mobile) */}
          <Link
            to="/auth"
            className="hidden sm:block px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--card)] text-[var(--text)]
            font-semibold rounded-xl shadow text-sm sm:text-base whitespace-nowrap
            hover:bg-blue-600 hover:text-white
            transition-all duration-300 hover:scale-105"
          >
            Log in
          </Link>

          {/* 🌙 THEME TOGGLE */}
{/* 🌙 THEME TOGGLE */}
<button
  onClick={toggleTheme}
  className="relative w-16 h-9 rounded-full p-1
  bg-gradient-to-br from-white to-gray-200
  dark:from-black dark:to-gray-900
  shadow-[0_8px_30px_rgba(0,0,0,0.15)]
  dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
  hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]
  dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
  transition-all duration-1000 ease-out
  group overflow-hidden"
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  {/* Main Track with Dramatic White/Black Change */}
  <div className={`absolute inset-0.5 rounded-full
    shadow-inner transition-all duration-1000
    ${theme === "dark" 
      ? 'bg-gradient-to-b from-black to-gray-900' 
      : 'bg-gradient-to-b from-white to-gray-100'
    }`}>
    <div className="relative w-full h-full">
      
      {/* Toggle Handle */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full
        shadow-lg flex items-center justify-center 
        transition-all duration-1000 ease-out
        ${theme === "dark" 
          ? 'left-[calc(100%-2rem)] bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-blue-500/30' 
          : 'left-[0.25rem] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-amber-500/30'
        }`}>
        
        {/* Icon with Glow Effect */}
        <div className="relative z-10">
          {theme === "dark" ? (
            <Moon className="w-3.5 h-3.5 text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-white drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          )}
        </div>
        
        {/* Handle Inner Glow */}
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-1000
          ${theme === "dark" 
            ? 'bg-gradient-to-br from-blue-400/30 to-transparent' 
            : 'bg-gradient-to-br from-amber-300/30 to-transparent'
          }`} />
      </div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5">
        <Sun className={`w-3 h-3 transition-all duration-1000
          ${theme === "dark" 
            ? 'text-amber-500/20 opacity-40' 
            : 'text-amber-500/80 opacity-100 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]'
          }`} />
        <Moon className={`w-3 h-3 transition-all duration-1000
          ${theme === "dark" 
            ? 'text-blue-400/80 opacity-100 drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]' 
            : 'text-blue-400/20 opacity-40'
          }`} />
      </div>
    </div>
  </div>
  
  {/* Outer Border Glow */}
  <div className={`absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100
    transition-opacity duration-1000 pointer-events-none
    ${theme === "dark" 
      ? 'bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20' 
      : 'bg-gradient-to-r from-amber-400/20 via-transparent to-orange-500/20'
    }`} />
  
  {/* Pulsing Animation on Hover */}
  <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-50
    transition-opacity duration-1000 pointer-events-none animate-pulse
    ${theme === "dark" 
      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
      : 'bg-gradient-to-r from-amber-400/10 to-orange-500/10'
    }`} />
</button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden bg-white/30 px-1 rounded-sm text-3xl sm:text-4xl text-[var(--text)]
            transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full bg-[var(--card)]
          text-[var(--text)] backdrop-blur-md p-6 flex flex-col gap-4
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
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
            onClick={() => setIsOpen(false)}
            className={`block text-lg transition-colors duration-300 py-2
              ${isActive(item.path) ? "text-white px-4 bg-blue-600 rounded-xl font-semibold" : "hover:text-blue-400"}`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          to="/auth"
          className="w-full mt-4 px-5 py-3 bg-blue-600 text-white
          rounded-xl shadow font-semibold block text-center
          transition-all duration-300 hover:bg-blue-700"
          onClick={() => setIsOpen(false)}
        >
          Log in
        </Link>

        {/* 🌙 MOBILE THEME TOGGLE */}
        <button
          onClick={() => {
            toggleTheme();
            setIsOpen(false);
          }}
          className="w-full mt-3 px-5 py-3 rounded-xl bg-[var(--border)] flex items-center justify-center gap-2"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
}