import { NavLink } from "react-router-dom";
import { FiLogOut, FiBook, FiAward, FiUser, FiPhoneOff, FiPower } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside 
      className="w-72 bg-white p-6 flex flex-col 
      animate-slideInLeft"
    >

      {/* BRANDING */}
      <div className="flex items-center gap-3 mb-10 animate-fadeInSlow">
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
      <button 
        className="mt-auto pt-10 flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors animate-fadeInSlow"
      >
        <div className="w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
          <FiPower className="w-5 h-5" />
        </div>
        Logout
      </button>
    </aside>
  );
}

/* COMPONENT FOR CLEANER CODE */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 
        animate-fadeIn
        ${isActive ? "bg-blue-600 text-white animate-pulseSoft" : "hover:bg-blue-500 hover:text-white"}
        `
      }
    >
      <div 
        className="w-6 h-6 flex items-center justify-center 
        transition-transform duration-300 hover:scale-110 hover:rotate-3"
      >
        {icon}
      </div>
      {label}
    </NavLink>
  );
}
