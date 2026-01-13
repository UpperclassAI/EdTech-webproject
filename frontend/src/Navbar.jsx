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
      className={`w-full fixed mt-6 top-0 left-0 z-50
        py-4 font-mono backdrop-blur-xs transition-colors duration-300
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
            className="flex items-center gap-4 rounded-xl px-4 py-2 shadow-md
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
            hover:bg-blue-500 hover:text-white
            transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2.5 sm:p-3 rounded-xl bg-[var(--card)] shadow
            hover:scale-110 transition-all duration-300"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            )}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl sm:text-4xl text-[var(--text)]
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
              ${isActive(item.path) ? "text-blue-500 font-semibold" : "hover:text-blue-400"}`}
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
          Login
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