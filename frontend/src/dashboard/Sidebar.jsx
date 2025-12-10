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

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex 
          w-64 lg:w-72 
          bg-white p-6 flex-col 
          border-r border-gray-200
          fixed left-0 top-0 bottom-0
          z-30
        "
      >
        {/* BRANDING */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-semibold">Upperclass AI</p>
            <p className="text-xs text-gray-400">We see the future</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4">
          <NavItem to="/dashboard" label="Overview" icon={<FaAddressCard />} />
          <NavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} />
          <NavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} />
          <NavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} />
        </nav>

        {/* LOGOUT */}
        <button className="mt-auto pt-10 flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors">
          <FiPower className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MOBILE FLOATING CIRCLE MENU */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="
          md:hidden fixed top-5 left-4 z-50
          w-12 h-12 bg-blue-600 text-white rounded-full 
          shadow-lg flex items-center justify-center 
          active:scale-90 transition-all
        "
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
              className="
                fixed bottom-0 left-0 w-full 
                h-[85vh] sm:h-[80vh]
                bg-blue-900/95 text-white z-50 
                p-6 rounded-t-2xl shadow-2xl 
                overflow-y-auto backdrop-blur-md
              "
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-3 active:scale-90 transition"
                >
                  <FaTimes size={22} />
                </button>
              </div>

              {/* NAV */}
              <div className="flex flex-col gap-4">
                <MobileNavItem to="/dashboard" label="Overview" icon={<FaAddressCard />} />
                <MobileNavItem to="/dashboard/courses" label="Courses" icon={<FiBook />} />
                <MobileNavItem to="/dashboard/achievements" label="Achievements" icon={<FiAward />} />
                <MobileNavItem to="/dashboard/avatar" label="Avatar" icon={<FiUser />} />
              </div>

              {/* LOGOUT */}
              <button className="mt-10 flex items-center gap-3 text-white hover:text-red-400 transition-colors">
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
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
          px-4 py-2 rounded-lg flex items-center gap-3 
          transition-all duration-300 text-sm
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"}
        `
      }
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      {label}
    </NavLink>
  );
}

/* MOBILE NAV ITEM */
function MobileNavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
          flex items-center gap-4 
          px-4 py-3 rounded-lg text-lg 
          border border-white/20
          ${isActive ? "bg-white text-blue-900 font-bold" : "bg-blue-800/40"}
        `
      }
    >
      <div className="text-xl">{icon}</div>
      {label}
    </NavLink>
  );
}
