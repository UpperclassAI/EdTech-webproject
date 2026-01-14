import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiBook,
  FiAward,
  FiUser,
  FiPower
} from "react-icons/fi";
import { FaAddressCard, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`
          hidden md:flex 
          w-64 lg:w-72 
          p-6 flex-col 
          border-r fixed left-0 top-0 bottom-0 z-30
          transition-colors duration-300
          ${theme === "dark" 
            ? "bg-gray-900 border-gray-800 text-gray-100" 
            : "bg-white border-gray-200 text-gray-800"
          }
        `}
      >
        {/* BRANDING */}
        <div className="flex items-center gap-3 mb-10">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${theme === "dark" 
              ? "bg-blue-700 text-white" 
              : "bg-blue-600 text-white"
            }
          `}>
            U
          </div>
          <div>
            <p className="text-sm font-semibold">Upperclass AI</p>
            <p className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              We see the future
            </p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4">
          <NavItem to="/dashboard" label="Overview" icon={<FaAddressCard />} theme={theme} />
          <NavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} theme={theme} />
          <NavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} theme={theme} />
          <NavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} theme={theme} />
        </nav>

        {/* THEME TOGGLE & LOGOUT */}
        <div className="mt-auto pt-10 space-y-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
              ${theme === "dark" 
                ? "hover:bg-gray-800 text-yellow-400" 
                : "hover:bg-blue-50 text-yellow-600"
              }
            `}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {theme === "dark" ? (
                <FiBook className="text-yellow-400" />
              ) : (
                <FiAward className="text-yellow-600" />
              )}
            </div>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {/* LOGOUT */}
          <button className={`
            w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
            ${theme === "dark" 
              ? "hover:bg-gray-800 text-red-400" 
              : "hover:bg-blue-50 text-red-600"
            }
          `}>
            <FiPower className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE FLOATING CIRCLE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`
          md:hidden fixed top-5 left-4 z-50
          w-12 h-12 rounded-full shadow-lg 
          flex items-center justify-center 
          active:scale-90 transition-all duration-300
          ${theme === "dark" 
            ? "bg-blue-800 text-white" 
            : "bg-blue-600 text-white"
          }
        `}
      >
        <FaBars size={22} />
      </button>

      {/* MOBILE SAFE AREA SPACER */}
      <div className="md:hidden h-4 pb-safe" />

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* SLIDE UP DRAWER */}
            <motion.div
              className={`
                fixed bottom-0 left-0 w-full 
                h-[85vh] sm:h-[80vh]
                text-white z-50 
                p-6 rounded-t-2xl shadow-2xl 
                overflow-y-auto backdrop-blur-md
                transition-colors duration-300
                ${theme === "dark" 
                  ? "bg-gray-900/95" 
                  : "bg-blue-900/95"
                }
              `}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <div className="flex items-center gap-4">
                  {/* THEME TOGGLE IN MOBILE */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${
                      theme === "dark" 
                        ? "bg-gray-800 text-yellow-400" 
                        : "bg-blue-800 text-yellow-300"
                    }`}
                  >
                    {theme === "dark" ? "☀️" : "🌙"}
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-3 active:scale-90 transition"
                  >
                    <FaTimes size={22} />
                  </button>
                </div>
              </div>

              {/* NAV */}
              <div className="flex flex-col gap-4">
                <MobileNavItem to="/dashboard" label="Overview" icon={<FaAddressCard />} theme={theme} />
                <MobileNavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} theme={theme} />
                <MobileNavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} theme={theme} />
                <MobileNavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} theme={theme} />
              </div>

              {/* LOGOUT */}
              <button className={`
                mt-10 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${theme === "dark" 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-blue-800 hover:bg-blue-700"
                }
              `}>
                <FiPower size={20} />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* DESKTOP NAV ITEM */
function NavItem({ to, icon, label, theme }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => {
        const baseClasses = "px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 text-sm";
        
        if (isActive) {
          return `${baseClasses} ${
            theme === "dark" 
              ? "bg-blue-800 text-white" 
              : "bg-blue-600 text-white"
          }`;
        }
        
        return `${baseClasses} ${
          theme === "dark" 
            ? "hover:bg-gray-800 hover:text-white text-gray-300" 
            : "hover:bg-blue-500 hover:text-white text-gray-700"
        }`;
      }}
    >
      <div className={`w-5 h-5 flex items-center justify-center ${
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      }`}>
        {icon}
      </div>
      {label}
    </NavLink>
  );
}

/* MOBILE NAV ITEM */
function MobileNavItem({ to, label, icon, theme }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => {
        const baseClasses = "flex items-center gap-4 px-4 py-3 rounded-lg text-lg";
        
        if (isActive) {
          return `${baseClasses} ${
            theme === "dark" 
              ? "bg-blue-700 text-white font-bold" 
              : "bg-white text-blue-900 font-bold"
          }`;
        }
        
        return `${baseClasses} ${
          theme === "dark" 
            ? "bg-gray-800/60 text-gray-200 border border-gray-700" 
            : "bg-blue-800/40 text-white border border-white/20"
        }`;
      }}
      onClick={() => {
        // Close drawer on mobile when a link is clicked
        if (window.innerWidth < 768) {
          document.body.style.overflow = "";
        }
      }}
    >
      <div className="text-xl">{icon}</div>
      {label}
    </NavLink>
  );
}