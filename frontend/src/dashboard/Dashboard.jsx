import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex w-full min-h-screen bg-white overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6 md:ml-[260px] lg:ml-[290px] transition-all duration-300">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

          {/* USER INFO (Left) */}
          <div className="text-gray-800 flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-semibold">Welcome Peter Josh</h1>
            <p className="text-sm text-gray-500">Student</p>
          </div>

          {/* SEARCH (Center) */}
          <div className="flex-1 mx-4 sm:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-100 border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            </div>
          </div>

          {/* AVATAR (Right) */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-200 
              flex items-center justify-center hover:scale-105 transition">
              <FiUser className="text-blue-600 text-lg sm:text-xl" />
            </div>
          </div>
        </div>

        {/* CHILD ROUTES */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
