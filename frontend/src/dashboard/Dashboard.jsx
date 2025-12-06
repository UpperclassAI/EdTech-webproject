import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex w-full min-h-screen bg-white">

      {/* SIDEBAR stays fixed for all dashboard pages */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-800">
            <h1 className="text-xl font-semibold">Welcome Peter Josh</h1>
            <p className="text-sm text-gray-500">Student</p>
          </div>

          {/* SEARCH + AVATAR */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-80 pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="w-12 h-12 rounded-full border-2 border-blue-200 flex items-center justify-center">
              <FiUser className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* ALL CHILD PAGES LOAD HERE */}
        <Outlet />
      </div>
    </div>
  );
}
