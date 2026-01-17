












// Dashboard.jsx - Updated to include Settings route
"use client";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiBell, FiSettings } from "react-icons/fi";
import { Lock, Unlock, CheckCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";
import { courses } from "./data";

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Filtered courses for search
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Could navigate or just show overlay
      console.log("Searching for:", searchQuery);
    }
  };

  const clearSearch = () => setSearchQuery("");

  const notifications = [
    { id: 1, text: "New assignment in AI Introduction", time: "5 min ago", read: false },
    { id: 2, text: "Your progress in Prompt Crafting reached 45%", time: "1 hour ago", read: true },
    { id: 3, text: "Course completion certificate available", time: "2 days ago", read: true },
    { id: 4, text: "Live session starting in 30 minutes", time: "3 days ago", read: false },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;

  const cardBg = theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-900";

  return (
    <div className={`flex w-full min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
    } overflow-hidden`}>
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 md:ml-[260px] lg:ml-[290px] transition-all duration-300">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className={`flex-shrink-0 ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
            <h1 className="text-lg sm:text-xl font-semibold">Welcome Peter Josh</h1>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Student</p>
          </div>

          {/* SEARCH */}
          <div className="flex-1 mx-4 sm:mx-6 relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className={`w-full pl-10 pr-10 py-2 rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 ${
                theme === "dark" 
                  ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-gray-100 placeholder-gray-400" 
                  : "bg-blue-50 border-gray-200 focus:ring-blue-300 text-gray-800 placeholder-gray-500"
              }`}
            />
            <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${
              theme === "dark" ? "text-blue-400" : "text-blue-500"
            }`} />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                }`}
              >×</button>
            )}
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-blue-50 hover:bg-blue-100 text-gray-700"
              }`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full hover:scale-105 ${
                  theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-blue-100 text-gray-600"
                }`}
              >
                <FiBell className="text-lg" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
            </div>

            {/* Settings button that navigates to settings */}
            <button 
              onClick={() => navigate('/dashboard/settings')}
              className={`p-2 rounded-full hover:scale-105 ${
                theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-blue-100 text-gray-600"
              }`}
            >
              <FiSettings className="text-lg" />
            </button>

            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer
              hover:scale-105 transition-all duration-300 ${theme === "dark" ? "border-2 border-blue-700 hover:border-blue-600" : "border-2 border-blue-200 hover:border-blue-300"}`}>
              <FiUser className={`text-lg sm:text-xl ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className={`text-sm mb-6 flex items-center gap-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <span 
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </span>
          {location.pathname !== "/dashboard" && (
            <>
              <span>/</span>
              <span className="capitalize">{location.pathname.split("/").pop()}</span>
            </>
          )}
        </div>
                    
{showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl border z-50 ${
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border-gray-200"
                  }`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Notifications</h3>
                        <button className={`text-sm ${
                          theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                        }`}>
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            !notification.read ? (theme === "dark" ? "bg-gray-700/50" : "bg-blue-50/50") : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${notification.read ? "bg-gray-400" : "bg-blue-500"}`} />
                            <div className="flex-1">
                              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                {notification.text}
                              </p>
                              <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className={`w-full text-center py-2 rounded-lg text-sm font-medium ${
                        theme === "dark" 
                          ? "hover:bg-gray-700 text-gray-400" 
                          : "hover:bg-gray-100 text-gray-600"
                      }`}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            


        <Outlet />

        {/* SEARCH RESULTS OVERLAY */}
        {searchQuery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-20 p-4">
            <div className={`w-full max-w-4xl rounded-xl shadow-2xl overflow-y-auto max-h-[80vh] ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    Search Results for "{searchQuery}"
                  </h3>
                  <button onClick={clearSearch} className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>×</button>
                </div>

                {filteredCourses.length === 0 ? (
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>No courses found.</p>
                ) : (
                  filteredCourses.map(course => (
                    <div
                      key={course.title}
                      className={`${cardBg} rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition`}
                      onClick={() => {
                        navigate(`/dashboard/courses/${encodeURIComponent(course.title)}`);
                        clearSearch();
                      }}
                    >
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-xs text-gray-400">{course.tech} • {course.sections} Sections</p>
                      </div>
                      <div>
                        {course.locked ? <Lock className="w-5 h-5 text-gray-400" /> : course.progress === 100 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Unlock className="w-5 h-5 text-blue-500" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}