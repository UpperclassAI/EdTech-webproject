import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiAward,
  FiUser,
  FiPower,
  FiSettings,
  FiMoon,
  FiSun
} from "react-icons/fi";
import { FaAddressCard, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext"; // Add this

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings(); // Get settings
  const navigate = useNavigate(); // For navigation

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  // Handle logout
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    console.log("Logging out...");
    navigate("/auth");
    setSidebarOpen(false);
  };

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
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
            settings?.profileColor || "from-blue-500 to-blue-700"
          } flex items-center justify-center font-bold text-white`}>
            {settings?.profileInitials || "U"}
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
        <nav className="flex flex-col gap-2">
          <NavItem to="/dashboard" label="Overview" icon={<FaAddressCard />} theme={theme} />
          <NavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} theme={theme} />
          <NavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} theme={theme} />
          <NavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} theme={theme} />
          <NavItem to="/dashboard/settings" label="Settings" icon={<FiSettings />} theme={theme} />
        </nav>

        {/* THEME TOGGLE & LOGOUT */}
        <div className="mt-auto pt-10 space-y-4">
          {/* THEME TOGGLE */}
        

          {/* LOGOUT - Link to /auth */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${theme === "dark" 
                ? "bg-red-900/30 hover:bg-red-800/50 text-red-300" 
                : "bg-red-100 hover:bg-red-200 text-red-600"
              }
            `}
          >
            <FiPower className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE FLOATING CIRCLE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`
          md:hidden fixed top-5 right-4 z-50
          w-12 h-12 rounded-full shadow-lg 
          flex items-center justify-center 
          active:scale-90 transition-all duration-300
          ${theme === "dark" 
            ? "bg-blue-800/50 backdrop-blur-xl text-white" 
            : "bg-blue-600/80 backdrop-blur-xl text-white"
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

            {/* LEFT SIDE DRAWER */}
            <motion.div
              className={`
                fixed top-0 left-0 w-full max-w-xs
                h-full
                text-white z-50 
                p-6 shadow-2xl 
                overflow-y-auto backdrop-blur-md
                transition-colors duration-300
                ${theme === "dark" 
                  ? "bg-gray-900/95" 
                  : "bg-blue-900/95"
                }
              `}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    settings?.profileColor || "from-blue-500 to-blue-700"
                  } flex items-center justify-center font-bold text-white`}>
                    {settings?.profileInitials || "U"}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <p className="text-sm opacity-75">{settings?.displayName || "User"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-3 hover:bg-white/10 rounded-full transition active:scale-90"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* NAV */}
              <div className="flex flex-col gap-2">
                <MobileNavItem to="/dashboard/" label="Overview" icon={<FaAddressCard />} theme={theme} setSidebarOpen={setSidebarOpen} />
                <MobileNavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} theme={theme} setSidebarOpen={setSidebarOpen} />
                <MobileNavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} theme={theme} setSidebarOpen={setSidebarOpen} />
                <MobileNavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} theme={theme} setSidebarOpen={setSidebarOpen} />
               
              </div>

              {/* THEME TOGGLE */}
             

              {/* LOGOUT - Link to /auth */}
              <button
                onClick={handleLogout}
                className={`
                  mt-6 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${theme === "dark" 
                    ? "bg-red-900/30 hover:bg-red-800/50 text-red-300" 
                    : "bg-red-600 hover:bg-red-700 text-white"
                  }
                `}
              >
                <FiPower size={20} />
                Logout
              </button>

              {/* Quick Stats */}
              <div className="mt-8 p-4 rounded-lg bg-white/10">
                <h3 className="font-semibold mb-2 text-sm">Quick Stats</h3>
                <div className="text-sm opacity-75">
                  <p>Daily Goal: {settings?.studyGoals?.daily || 2}h</p>
                  <p>Weekly Goal: {settings?.studyGoals?.weekly || 14}h</p>
                </div>
              </div>
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
        const baseClasses = "px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 text-sm";
        
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
            : "hover:bg-blue-100 hover:text-blue-600 text-gray-700"
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
function MobileNavItem({ to, label, icon, theme, setSidebarOpen }) {
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
      onClick={() => setSidebarOpen(false)}
    >
      <div className="text-xl">{icon}</div>
      {label}
    </NavLink>
  );
}